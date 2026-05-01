"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Files, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Shield
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navLinks = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "All Documents", icon: Files, href: "/dashboard/documents" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  return (
    <motion.aside 
      animate={{ width: isCollapsed ? 80 : 256 }}
      className="h-screen bg-slate-950 border-r border-white/10 flex flex-col sticky top-0 z-40 transition-all duration-300"
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
        {!isCollapsed && (
          <Link href="/dashboard" className="text-xl font-bold text-white flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <Shield className="w-5 h-5 text-cyan-400" /> Lockr
          </Link>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors mx-auto"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Links */}
      <div className="flex-1 py-6 flex flex-col gap-2 px-3 overflow-y-auto">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href}
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group"
          >
            <link.icon className="w-5 h-5 shrink-0 group-hover:text-cyan-400 transition-colors" />
            {!isCollapsed && <span className="font-medium whitespace-nowrap">{link.name}</span>}
          </Link>
        ))}
      </div>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-white/10">
        <SignOutButton>
          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors">
            <LogOut className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span className="font-medium whitespace-nowrap">Sign Out</span>}
          </button>
        </SignOutButton>
      </div>
    </motion.aside>
  );
}