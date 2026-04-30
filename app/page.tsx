import Navbar from "@/components/Home/Navbar";
import Hero from "@/components/Home/Hero";
import About from "@/components/Home/About";
import Features from "@/components/Home/Features";
import HowItWorks from "@/components/Home/HowItWorks";
import CTA from "@/components/Home/CTA";
import Footer from '@/components/Home/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500/30">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}