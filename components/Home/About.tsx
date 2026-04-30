"use client";

import { motion } from "framer-motion";

export default function About() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="py-24 px-6 border-t border-white/5 bg-slate-900/50">
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Built for absolute peace of mind.</h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          We realized that our most critical documents—the ones that prove who we are—were often scattered across email drafts, unencrypted photo albums, and physical drawers. Lockr was engineered to solve this. Utilizing Next.js performance, Clerk&apos;s robust authentication, and Supabase&apos;s secure infrastructure, we&apos;ve built a singular, impenetrable hub for your life&apos;s most confidential files.
        </p>
      </motion.div>
    </section>
  );
}