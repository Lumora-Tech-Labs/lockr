import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  try {
    const evt = await verifyWebhook(req);
    // Get event type
    const eventType = evt.type;

    // Check if event is "user.created"
    if(eventType === "user.created"){
      // Get ud and email address from the data received
      const { id, email_addresses } = evt.data;
      const email = email_addresses[0].email_address;
      // If both email and id exist then insert data into database
      if (email && id) {

        const { error } = await supabase.from('users').insert({
          id: id,
          email: email,
        });

        if (error) {
          console.error(error);
          return new Response('Database error', { status: 500 });
        }
      } else{
        return new Response('email/id not found', { status: 400 });
      }
    }

    // For debugging
    // console.log(
    //   `Received webhook with ID ${id} and event type of ${eventType}`
    // );
    // console.log('Webhook payload:', evt.data);
    return new Response('Webhook received', { status: 200 });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}
