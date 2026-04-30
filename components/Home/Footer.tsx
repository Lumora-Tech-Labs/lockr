import Link from "next/link";
import { Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
        <div className="text-center md:text-left">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-white flex items-center justify-center md:justify-start gap-2 mb-2"
          >
            <Lock className="w-5 h-5 text-cyan-400" /> Lockr
          </Link>
          <p className="text-slate-500 text-sm">
            Your digital vault for life&apos;s documents.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-400">
          <Link href="#about" className="hover:text-cyan-400 transition-colors">
            About
          </Link>
          <Link
            href="#features"
            className="hover:text-cyan-400 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="hover:text-cyan-400 transition-colors"
          >
            How it works
          </Link>
          <Link
            href="/contacts"
            className="hover:text-cyan-400 transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Lockr. All rights reserved.</p>
        <p className="flex items-center gap-1">
          A project by{' '}
          <Link
            href="https://lumora-tech-labs.vercel.app/"
            className="text-cyan-500 hover:text-cyan-400 font-semibold"
          >
            Lumora Tech Labs
          </Link>
        </p>
      </div>
    </footer>
  );
}