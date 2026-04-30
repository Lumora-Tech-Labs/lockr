'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTA() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-32 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-cyan-500/5 blur-[150px] rounded-full max-w-3xl mx-auto -z-10" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Stop leaving your data exposed.
        </h2>
        <p className="text-slate-400 text-lg mb-10">
          Join Lockr today and carry your most important documents with zero
          anxiety.
        </p>
        <Link
          href="/auth/sign-up"
          className="inline-flex items-center gap-2 bg-white text-slate-950 hover:bg-slate-200 text-lg font-bold px-8 py-4 rounded-xl transition-all"
        >
          Create Free Account
        </Link>
      </motion.div>
    </section>
  );
}
