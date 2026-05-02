"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Upload, 
  Plus, 
  Folder, 
  File as FileIcon, 
  ShieldCheck, 
  X,
  FileText
} from "lucide-react";

export default function DashboardPage() {
  // Category State
  const [categories, setCategories] = useState(["Passports", "ID Cards", "Visas"]);
  const [newCategory, setNewCategory] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // Form & File State
  const [docName, setDocName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // --- File Handling Logic ---
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the file click
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // --- Submission ---
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    // Supabase storage upload logic goes here
    console.log("Uploading:", { docName, category: selectedCategory, file: selectedFile });
    
    // Reset form after mock upload
    setDocName("");
    setSelectedFile(null);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setSelectedCategory(newCategory.trim());
      setNewCategory("");
      setIsCreatingCategory(false);
    }
  };

  // Validation
  const isFormValid = docName.trim() !== "" && selectedFile !== null;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to your Vault</h1>
        <p className="text-slate-400">Manage and secure your confidential documents.</p>
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
                initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: i * 0.1 }}
                className="bg-slate-950 border border-white/10 rounded-xl p-6 hover:border-cyan-500/30 transition-colors group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-cyan-500/10 transition-colors">
                    <FileIcon className="w-6 h-6 text-slate-300 group-hover:text-cyan-400" />
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
          initial="hidden" animate="visible" variants={fadeUp}
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
              <label className="block text-sm font-medium text-slate-400 mb-1">Document Name</label>
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
              <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
              {!isCreatingCategory ? (
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 appearance-none cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
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
                    placeholder="New Category"
                    className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500"
                    autoFocus
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

            {/* Interactive File Dropzone */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Document File</label>
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-35
                  ${isDragging 
                    ? "border-cyan-500 bg-cyan-500/10" 
                    : selectedFile 
                      ? "border-cyan-500/50 bg-slate-900/80" 
                      : "border-white/10 bg-slate-900/50 hover:border-cyan-500/30 hover:bg-slate-900/80"
                  }`}
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
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="bg-cyan-500/20 p-2 rounded-md">
                        <FileText className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div className="text-left overflow-hidden">
                        <p className="text-sm font-medium text-slate-200 truncate max-w-37.5 sm:max-w-50">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-slate-500">{formatFileSize(selectedFile.size)}</p>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={clearFile}
                      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="pointer-events-none">
                    <Upload className={`w-8 h-8 mx-auto mb-3 transition-colors ${isDragging ? "text-cyan-400" : "text-slate-500"}`} />
                    <p className="text-sm text-slate-300 font-medium">
                      {isDragging ? "Drop file to upload" : "Click to upload or drag & drop"}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">PNG, JPG, PDF (Max. 10MB)</p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full flex items-center justify-center gap-2 font-bold px-4 py-3 rounded-lg transition-all mt-4
                ${isFormValid 
                  ? "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]" 
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
                }`}
            >
              {isFormValid ? <ShieldCheck className="w-5 h-5" /> : <Upload className="w-5 h-5" />} 
              Encrypt & Save
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}