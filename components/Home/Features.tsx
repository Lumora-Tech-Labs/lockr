"use client";

import { motion } from "framer-motion";
import { Shield, Cloud, FileText, Fingerprint } from "lucide-react";

export default function Features() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need. Nothing you don&apos;t.</h2>
        <p className="text-slate-400">A minimal, high-contrast experience engineered for security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
        {/* Feature 1 - Large */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="md:col-span-2 bg-slate-900 border border-white/10 rounded-2xl p-8 flex flex-col justify-end relative overflow-hidden group hover:border-cyan-500/50 transition-colors"
        >
          <Shield className="absolute top-8 right-8 w-16 h-16 text-white/5 group-hover:text-cyan-500/10 transition-colors" />
          <h3 className="text-2xl font-bold mb-2">End-to-End Encryption</h3>
          <p className="text-slate-400 max-w-md">Your files are encrypted at rest and in transit. Only your authenticated session holds the key to view your confidential data.</p>
        </motion.div>

        {/* Feature 2 */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="bg-slate-900 border border-white/10 rounded-2xl p-8 flex flex-col justify-end group hover:border-cyan-500/50 transition-colors"
        >
          <Cloud className="mb-4 w-8 h-8 text-cyan-400" />
          <h3 className="text-xl font-bold mb-2">Always Synced</h3>
          <p className="text-slate-400 text-sm">Access your vault from anywhere in the world.</p>
        </motion.div>

        {/* Feature 3 */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="bg-slate-900 border border-white/10 rounded-2xl p-8 flex flex-col justify-end group hover:border-cyan-500/50 transition-colors"
        >
          <FileText className="mb-4 w-8 h-8 text-cyan-400" />
          <h3 className="text-xl font-bold mb-2">Smart Organization</h3>
          <p className="text-slate-400 text-sm">Categorize IDs, passports, and medical records easily.</p>
        </motion.div>

        {/* Feature 4 - Large */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="md:col-span-2 bg-slate-900 border border-white/10 rounded-2xl p-8 flex flex-col justify-end relative overflow-hidden group hover:border-cyan-500/50 transition-colors"
        >
           <Fingerprint className="absolute top-8 right-8 w-16 h-16 text-white/5 group-hover:text-cyan-500/10 transition-colors" />
          <h3 className="text-2xl font-bold mb-2">Next-Gen Authentication</h3>
          <p className="text-slate-400 max-w-md">Powered by Clerk, ensuring that passwordless logins, MFA, and session management keep intruders permanently locked out.</p>
        </motion.div>
      </div>
    </section>
  );
}