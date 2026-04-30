import Link from 'next/link';
import { Lock } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex-1">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-white flex items-center gap-2"
          >
            <Lock className="w-6 h-6 text-cyan-400" />
            Lockr
          </Link>
        </div>

        <div className="hidden md:flex flex-1 justify-center space-x-8 text-sm font-medium text-slate-300">
          <Link 
          href="#about" 
          className="hover:text-cyan-400 transition-colors"
          >
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
        </div>

        <div className="flex-1 flex justify-end items-center space-x-4 text-sm font-medium">
          <Link
            href="/auth/sign-in"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/auth/sign-up"
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 rounded-lg font-semibold transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
