'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Plus, Folder, File, ShieldCheck } from 'lucide-react';

export default function DashboardPage() {
  // Mock data - eventually fetched from Supabase
  const [categories, setCategories] = useState([
    'Passports',
    'ID Cards',
    'Visas',
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // Form State
  const [docName, setDocName] = useState('');

  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you will handle the Supabase storage upload and database insert
    console.log('Uploading:', { docName, category: selectedCategory });
    setDocName(''); // Reset
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setSelectedCategory(newCategory.trim());
      setNewCategory('');
      setIsCreatingCategory(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Welcome to your Vault
        </h1>
        <p className="text-slate-400">
          Manage and secure your confidential documents.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Dynamic Categories */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Folder className="w-5 h-5 text-cyan-400" /> Your Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-950 border border-white/10 rounded-xl p-6 hover:border-cyan-500/30 transition-colors group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-cyan-500/10 transition-colors">
                    <File className="w-6 h-6 text-slate-300 group-hover:text-cyan-400" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg">{cat}</h3>
                <p className="text-slate-500 text-sm mt-1">View documents →</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Secure Upload Form */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="bg-slate-950 border border-white/10 rounded-2xl p-6 relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] -z-10" />

          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Upload className="w-5 h-5 text-cyan-400" /> Secure Upload
          </h2>

          <form onSubmit={handleUpload} className="space-y-5">
            {/* Document Name */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Document Name
              </label>
              <input
                type="text"
                required
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                placeholder="e.g., US Passport 2026"
                className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Category
              </label>

              {!isCreatingCategory ? (
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 appearance-none"
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
                    className="bg-white/5 border border-white/10 hover:bg-white/10 p-2.5 rounded-lg transition-colors flex items-center justify-center text-cyan-400"
                    title="Create new category"
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
                    placeholder="New Category Name"
                    className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-medium px-4 py-2.5 rounded-lg transition-colors"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreatingCategory(false)}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* File Dropzone UI */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Document File
              </label>
              <div className="border-2 border-dashed border-white/10 hover:border-cyan-500/50 rounded-xl p-8 text-center transition-colors cursor-pointer group bg-slate-900/50">
                <Upload className="w-8 h-8 text-slate-500 group-hover:text-cyan-400 mx-auto mb-3 transition-colors" />
                <p className="text-sm text-slate-300 font-medium">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  PNG, JPG, PDF (Max. 10MB)
                </p>
                <input type="file" className="hidden" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-3 rounded-lg transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] mt-4"
            >
              <ShieldCheck className="w-5 h-5" /> Encrypt & Save
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
