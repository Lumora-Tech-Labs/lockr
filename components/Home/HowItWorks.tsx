'use client';

import { motion } from 'framer-motion';

export default function HowItWorks() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const steps = [
    {
      step: '01',
      title: 'Create Identity',
      desc: 'Sign up instantly using our secure auth system.',
    },
    {
      step: '02',
      title: 'Deposit Docs',
      desc: 'Upload clear pictures of your ID, passport, or visa.',
    },
    {
      step: '03',
      title: 'Lock it Down',
      desc: 'Your files are stored safely in your isolated Supabase vault.',
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 px-6 border-t border-white/5 bg-slate-900/30"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Three steps to total security.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-white/10 -z-10" />

          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full bg-slate-950 border border-cyan-500/30 flex items-center justify-center text-3xl font-bold text-cyan-400 mb-6 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
