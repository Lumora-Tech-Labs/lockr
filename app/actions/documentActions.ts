'use server';

import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';

// Initialize Supabase client securely on the server
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function uploadSecureDocument(formData: FormData) {
  // 1. Verify the user securely via Clerk
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  // 2. Extract data from the frontend form
  const file = formData.get('file') as File;
  const docName = formData.get('docName') as string;
  const category = formData.get('category') as string;

  try {
    // 3. Upload the physical file to Supabase Storage Bucket
    const filePath = `${userId}/${crypto.randomUUID()}-${file.name}`;
    const { error: storageError } = await supabase.storage
      .from('secure_vault')
      .upload(filePath, file);

    if (storageError) throw storageError;

    // 4. Insert the metadata into our SQL `documents` table using the SDK
    // Notice how this looks like JavaScript, but translates to a REST POST request under the hood
    const { data, error: dbError } = await supabase.from('documents').insert([
      {
        user_id: userId,
        name: docName,
        category: category,
        storage_path: filePath,
        file_type: file.type,
        size_bytes: file.size,
      },
    ]);

    if (dbError) throw dbError;

    return { success: true, message: 'Document secured in vault.' };
  } catch (error) {
    console.error('Vault Error:', error);
    return { success: false, message: 'Failed to secure document.' };
  }
}

export async function getUserCategories() {
  const { userId } = await auth();
  if (!userId) return [];

  const { data, error } = await supabase
    .from('documents')
    .select('category')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  // Extract unique categories and provide defaults if the vault is empty
  const uniqueCategories = Array.from(new Set(data.map((d) => d.category)));

  // Return the unique list, or initial defaults if it's a brand new user
  return uniqueCategories.length > 0
    ? uniqueCategories
    : ['Passports', 'ID Cards', 'Visas'];
}