"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "../../context/AppContext";
import {
  Menu,
  Bell,
  Search,
  Shield,
  LogOut,
  ChevronDown,
  Settings,
  History
} from "lucide-react";

export const AdminNavbar: React.FC<{
  onToggleSidebar: () => void;
  isCollapsed?: boolean;
}> = ({ onToggleSidebar, isCollapsed }) => {
  const { notifications, logout } = useApp();
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();

  const unreadCount = notifications.filter((n) => !n.read && n.targetRole === "admin").length;

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-[36px] z-30 shadow-xs">
      {/* Left side: Hamburger & Quick search */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-600 hover:text-navy-950 hover:bg-slate-100 border border-slate-200 transition cursor-pointer"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative hidden sm:block w-72 md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search applications, candidates, ref ID..."
            className="w-full pl-9 pr-14 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-navy-900/15 focus:border-navy-900 focus:bg-white transition"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                router.push("/admin/applications");
              }
            }}
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">
            Ctrl K
          </span>
        </div>
      </div>

      {/* Center: Live Academic Cycle Badge (HRMS-inspired operational status) */}
      <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-600">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Academic Year <strong>2026-27</strong> • 200 Award Quota Active</span>
      </div>

      {/* Right side: Notifications & Super Admin Profile */}
      <div className="flex items-center gap-2.5">
        <Link
          href="/admin/notifications"
          className="relative p-2.5 rounded-xl text-slate-600 hover:text-navy-950 hover:bg-slate-50 transition border border-slate-200/80 hover:border-slate-300"
          title="Admin Alerts"
        >
          <Bell className="w-4.5 h-4.5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
              {unreadCount}
            </span>
          )}
        </Link>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-navy-900 text-amber-300 font-bold text-xs flex items-center justify-center shadow-xs">
              <Shield className="w-4 h-4" />
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-xs font-bold text-slate-900 block leading-tight">
                Dr. Rajeshwar Rao
              </span>
              <span className="text-[10px] text-slate-500 font-medium block leading-tight">
                Super Administrator
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/60">
                <p className="font-bold text-slate-900 text-sm">Dr. Rajeshwar Rao</p>
                <p className="text-slate-500 text-[11px] font-mono">admin@scholarship.demo</p>
                <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Officer Level: Super Admin
                </span>
              </div>

              <div className="py-1.5">
                <Link
                  href="/admin/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-navy-950 transition font-medium"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Platform Settings</span>
                </Link>
                <Link
                  href="/admin/audit-logs"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-navy-950 transition font-medium"
                >
                  <History className="w-4 h-4 text-slate-400" />
                  <span>Audit Trail</span>
                </Link>
              </div>

              <div className="pt-1.5 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-600 hover:bg-rose-50 transition text-left font-semibold cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
