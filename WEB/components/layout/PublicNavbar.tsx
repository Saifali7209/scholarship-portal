"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Menu, X, ChevronRight, User, Shield } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const PublicNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { role } = useApp();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Scholarships", href: "/scholarships" },
    { name: "Check Eligibility", href: "/eligibility" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "FAQ", href: "/#faq" },
    { name: "Archive", href: "/scholarships" }
  ];

  return (
    <nav className="bg-white border-b border-slate-200/90 sticky top-[38px] z-40 transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & National Seal Embellishment */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-xl bg-[#0f2544] border border-[#09172c] flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
              <GraduationCap className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <span className="text-base font-black text-slate-950 tracking-tight block leading-none">
                IICC SCHOLARSHIPS
              </span>
              <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase block mt-1">
                India Islamic Cultural Centre • New Delhi
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium py-1 transition relative ${
                    isActive
                      ? "text-slate-950 font-bold border-b-2 border-slate-900"
                      : "text-slate-600 hover:text-slate-950"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/student/login"
              className="text-sm font-semibold text-slate-700 hover:text-slate-950 px-2 py-1 transition"
            >
              Sign In
            </Link>
            <Link
              href="/student/application"
              className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#0f2544] hover:bg-[#1a3964] border border-[#09172c] px-4 py-2.5 rounded-lg shadow-sm transition duration-150 active:scale-95 cursor-pointer"
            >
              <span>Apply Now</span>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition border border-slate-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-navy-900"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/student/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Sign In
            </Link>
            <Link
              href="/student/application"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-lg bg-navy-900 text-white text-xs font-bold shadow-sm"
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
