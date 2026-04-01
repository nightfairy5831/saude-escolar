"use client";

import Link from "next/link";
import { useState } from "react";
import { HeartIcon } from "./Icons";

const navLinks = [
  { label: "Para Pais", href: "/dashboard/parent" },
  { label: "Para Medicos", href: "/dashboard/doctor" },
  { label: "Para Escolas", href: "/dashboard/school" },
  { label: "Agendar Consulta", href: "/appointments" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container-max px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <HeartIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">SaudeEscolar</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">{link.label}</Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-primary-600">Entrar</Link>
            <Link href="/register" className="gradient-btn-sm">Criar Conta</Link>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" /> : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
            </svg>
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-lg" onClick={() => setMobileOpen(false)}>{link.label}</Link>
            ))}
            <div className="flex gap-3 px-4 pt-2">
              <Link href="/login" className="text-sm font-medium text-gray-600">Entrar</Link>
              <Link href="/register" className="gradient-btn-sm">Criar Conta</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
