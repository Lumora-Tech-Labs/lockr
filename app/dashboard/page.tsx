'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  Plus,
  Folder,
  File as FileIcon,
  ShieldCheck,
  X,
  FileText,
  Loader2,
} from 'lucide-react';
import {
  uploadSecureDocument,
  getUserCategories,
} from '@/app/actions/documentActions';
import { toast } from 'sonner';

export default function DashboardPage() {
  // --- State ---
  const [categories, setCategories] = useState<string[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [newCategory, setNewCategory] = useState('');
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [docName, setDocName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // --- Effects ---
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getUserCategories();
        // Fallback to defaults if none found in DB
        const fetchedCats =
          data.length > 0 ? data : ['Passports', 'ID Cards', 'Visas'];
        setCategories(fetchedCats);
        setSelectedCategory(fetchedCats[0]);
      } catch (error) {
        toast.error('Failed to load categories');
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  // --- Animations ---
  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // --- File Logic ---
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) setSelectedFile(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setSelectedFile(e.target.files[0]);
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (
      (bytes / Math.pow(1024, i)).toFixed(2) +
      ' ' +
      ['Bytes', 'KB', 'MB', 'GB'][i]
    );
  };

  // --- Handlers ---
  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories([...categories, trimmed]);
      setSelectedCategory(trimmed);
      setNewCategory('');
      setIsCreatingCategory(false);
      toast.success(`Category "${trimmed}" added`);
    }
  };

  async function clientAction(formData: FormData) {
    if (!selectedFile) return;

    setIsUploading(true);
    formData.set('file', selectedFile);
    formData.set('category', selectedCategory);

    try {
      const result = await uploadSecureDocument(formData);
      if (result.success) {
        toast.success(result.message);
        setDocName('');
        setSelectedFile(null);
        formRef.current?.reset();
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error('An unexpected error occurred.');
    } finally {
      setIsUploading(false);
    }
  }

  const isFormValid =
    docName.trim() !== '' && selectedFile !== null && !isUploading;

  return (
    <div className="p-8 max-w-6xl mx-auto text-white">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Welcome to your Vault
        </h1>
        <p className="text-slate-400">
          Manage and secure your confidential documents.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Categories Grid */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Folder className="w-5 h-5 text-cyan-400" /> Your Categories
          </h2>

          {loadingCategories ? (
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading categories...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-950 border border-white/10 rounded-xl p-6 hover:border-cyan-500/30 transition-colors group cursor-pointer relative"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-white/5 rounded-lg group-hover:bg-cyan-500/10">
                      <FileIcon className="w-6 h-6 text-slate-300 group-hover:text-cyan-400" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg">{cat}</h3>
                  <p className="text-slate-500 text-sm mt-1">
                    View documents →
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Upload Form */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="bg-slate-950 border border-white/10 rounded-2xl p-6 relative h-fit top-8"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] -z-10" />
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Upload className="w-5 h-5 text-cyan-400" /> Secure Upload
          </h2>

          <form ref={formRef} action={clientAction} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Document Name
              </label>
              <input
                type="text"
                name="docName"
                required
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                placeholder="e.g., Passport 2026"
                className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:border-cyan-500 transition-all text-white placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Category
              </label>
              {!isCreatingCategory ? (
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 appearance-none cursor-pointer focus:border-cyan-500 outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setIsCreatingCategory(true)}
                    className="bg-white/5 border border-white/10 hover:bg-white/10 p-2.5 rounded-lg text-cyan-400 transition-colors"
                    title="Add Category"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Category name"
                    className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 outline-none focus:border-cyan-500"
                    autoFocus
                    onKeyDown={(e) =>
                      e.key === 'Enter' &&
                      (e.preventDefault(), handleAddCategory())
                    }
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="bg-cyan-500 text-slate-950 px-3 rounded-lg font-medium text-sm"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreatingCategory(false)}
                    className="bg-slate-800 hover:bg-slate-700 px-3 rounded-lg text-sm transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Document File
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[140px]
                  ${isDragging ? 'border-cyan-500 bg-cyan-500/10' : selectedFile ? 'border-cyan-500/50 bg-slate-900/80' : 'border-white/10 bg-slate-900/50 hover:border-cyan-500/30'}
                `}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf, .png, .jpg, .jpeg"
                />
                {selectedFile ? (
                  <div className="w-full flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-white/5">
                    <div className="flex items-center gap-3 overflow-hidden text-left">
                      <div className="bg-cyan-500/20 p-2 rounded-md">
                        <FileText className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-medium truncate max-w-[120px]">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatFileSize(selectedFile.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={clearFile}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="pointer-events-none">
                    <Upload
                      className={`w-8 h-8 mx-auto mb-3 ${isDragging ? 'text-cyan-400' : 'text-slate-500'}`}
                    />
                    <p className="text-sm text-slate-300">
                      Click or drag & drop
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      PDF, PNG, JPG up to 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full flex items-center justify-center gap-2 font-bold px-4 py-3 rounded-lg transition-all
                ${isFormValid ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.02] active:scale-[0.98]' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
              `}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Encrypting...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Encrypt & Save</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
