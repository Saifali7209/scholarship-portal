"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "../../context/AppContext";
import {
  GraduationCap,
  Bell,
  User,
  LogOut,
  FileText,
  CheckCircle2,
  Clock,
  Video,
  Menu,
  X,
  ChevronDown,
  Globe
} from "lucide-react";

export const StudentNavbar: React.FC = () => {
  const { studentApplication, notifications, logout } = useApp();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const unreadCount = notifications.filter((n) => !n.read && n.targetRole === "student").length;

  const links = [
    { name: "Dashboard", href: "/student/dashboard", icon: GraduationCap },
    { name: "Application", href: "/student/application", icon: FileText },
    { name: "Documents", href: "/student/application/documents", icon: CheckCircle2 },
    { name: "Status Tracker", href: "/student/status", icon: Clock },
    ...(studentApplication.status === "Shortlisted" || studentApplication.status === "Final Verification"
      ? [{ name: "Final Verification", href: "/student/final-verification", icon: Video }]
      : [])
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-[36px] z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group" title="Return to Public Home">
              <div className="w-9 h-9 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-105">
                <GraduationCap className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="text-sm font-extrabold text-slate-900 block leading-tight">
                  SCHOLARSHIP IIC
                </span>
                <span className="text-[10px] text-navy-800 font-bold uppercase tracking-wider block">
                  Student Portal
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                      isActive
                        ? "bg-navy-50 text-navy-900 border border-navy-200/70 font-bold shadow-xs"
                        : "text-slate-600 hover:text-navy-900 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-navy-900" : "text-slate-400"}`} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Header: Public Website Link, Notifications & Profile */}
          <div className="flex items-center gap-2.5">
            {/* Quick link to return to Public Website */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-navy-900 bg-white hover:bg-slate-50 transition border border-slate-200/90 shadow-2xs"
              title="Return to Public Website"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Public Website</span>
              <span className="sm:hidden">Home</span>
            </Link>

            <Link
              href="/student/notifications"
              className="relative p-2 rounded-lg text-slate-600 hover:text-navy-900 hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
              title="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition"
              >
                <div className="w-7 h-7 rounded-full bg-navy-900 text-amber-300 font-bold text-xs flex items-center justify-center shadow-xs">
                  {studentApplication.personalDetails.fullName.charAt(0)}
                </div>
                <div className="text-left hidden sm:block">
                  <span className="text-xs font-bold text-slate-800 block leading-tight">
                    {studentApplication.personalDetails.fullName}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono block leading-tight">
                    {studentApplication.applicationNumber}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-1.5 w-60 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
                  <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/50">
                    <p className="font-bold text-slate-900">
                      {studentApplication.personalDetails.fullName}
                    </p>
                    <p className="text-slate-500 text-[11px] truncate">
                      {studentApplication.personalDetails.email}
                    </p>
                    <div className="mt-1.5 inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-200/80 text-slate-700">
                      Ref: {studentApplication.applicationNumber}
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/student/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-navy-900 transition font-medium"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      href="/student/status"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-navy-900 transition font-medium"
                    >
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>Application Status</span>
                    </Link>
                    <Link
                      href="/"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-navy-900 transition font-medium border-t border-slate-100"
                    >
                      <Globe className="w-4 h-4 text-slate-400" />
                      <span>Public Website</span>
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50 transition text-left font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 py-3 space-y-1 shadow-lg">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold ${
                  isActive ? "bg-navy-50 text-navy-900 font-bold" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-4 h-4 text-slate-500" />
                <span>{link.name}</span>
              </Link>
            );
          })}
          <div className="pt-2 mt-2 border-t border-slate-100">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-navy-900 bg-slate-50 hover:bg-slate-100"
            >
              <Globe className="w-4 h-4 text-slate-500" />
              <span>Public Website</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
