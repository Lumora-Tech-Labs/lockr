"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Lock } from "lucide-react";

export default function Hero() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-medium mb-8">
          <Shield className="w-4 h-4" /> Military-grade encryption standard
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
          The ultimate vault for your identity.
        </h1>
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          Securely store your passport, ID cards, and confidential documents in a single, heavily encrypted digital locker. Accessible only by you, exactly when you need it.
        </p>
        <Link 
          href="/auth/sign-up"
          className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-lg font-bold px-8 py-4 rounded-xl transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] hover:-translate-y-1"
        >
          Create Your Lockr <Lock className="w-5 h-5" />
        </Link>
      </motion.div>
    </section>
  );
}