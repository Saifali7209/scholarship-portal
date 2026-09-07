"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileCheck2,
  Sparkles,
  Award,
  ListOrdered,
  Video,
  BarChart3,
  Bell,
  History,
  Settings,
  GraduationCap,
  ChevronLeft
} from "lucide-react";

export const AdminSidebar: React.FC<{
  isOpen: boolean;
  isCollapsed: boolean;
  onClose?: () => void;
  onToggleCollapse?: () => void;
}> = ({ isOpen, isCollapsed, onClose, onToggleCollapse }) => {
  const pathname = usePathname();

  const navSections = [
    {
      title: "Core Operations",
      items: [
        { name: "Executive Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Applications Queue", href: "/admin/applications", icon: Users },
        { name: "Document Verification", href: "/admin/documents", icon: FileCheck2 },
        { name: "AI Assistance Layer", href: "/admin/verification", icon: Sparkles }
      ]
    },
    {
      title: "Merit & Selection",
      items: [
        { name: "Shortlist & Ranking", href: "/admin/shortlist", icon: Award },
        { name: "Waitlist Management", href: "/admin/waitlist", icon: ListOrdered },
        { name: "Final Video KYC Queue", href: "/admin/final-verification", icon: Video }
      ]
    },
    {
      title: "Governance & Audit",
      items: [
        { name: "Reports & Analytics", href: "/admin/reports", icon: BarChart3 },
        { name: "Notification Center", href: "/admin/notifications", icon: Bell },
        { name: "Audit Trail", href: "/admin/audit-logs", icon: History },
        { name: "Platform Settings", href: "/admin/settings", icon: Settings }
      ]
    }
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 bg-[#0c182b] text-slate-300 border-r border-slate-800/80 flex flex-col transition-all duration-200 shadow-lg ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 ${isCollapsed ? "lg:w-20" : "lg:w-64"} w-64`}
    >
      {/* Sidebar Header */}
      <div
        className={`h-16 flex items-center border-b border-slate-800/80 bg-[#0c182b] transition-all duration-200 ${
          isCollapsed ? "justify-center px-2" : "justify-between px-5"
        }`}
      >
        <Link
          href="/admin/dashboard"
          className={`flex items-center gap-3 group min-w-0 ${
            isCollapsed ? "justify-center" : ""
          }`}
          title={isCollapsed ? "IICC Scholarships - Admin Console" : undefined}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-navy-800 to-navy-950 border border-amber-500/30 flex items-center justify-center text-white shadow-xs group-hover:border-amber-400/60 transition flex-shrink-0">
            <GraduationCap className="w-5 h-5 text-amber-400" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <span className="text-xs font-extrabold text-white tracking-tight block leading-tight font-sans truncate">
                IICC SCHOLARSHIPS
              </span>
              <span className="text-[10px] text-amber-400/90 font-bold uppercase tracking-wider block font-mono truncate">
                Admin Console
              </span>
            </div>
          )}
        </Link>

        {/* Desktop Collapse Button when Expanded */}
        {!isCollapsed && onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition cursor-pointer"
            title="Collapse sidebar"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Sections */}
      <div className={`flex-1 overflow-y-auto py-4 space-y-4 custom-scrollbar ${isCollapsed ? "px-2" : "px-3"}`}>
        {navSections.map((section) => (
          <div key={section.title}>
            {!isCollapsed ? (
              <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 opacity-75 truncate">
                {section.title}
              </div>
            ) : (
              <div className="my-2 border-t border-slate-800/60 mx-2" />
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    title={isCollapsed ? item.name : undefined}
                    className={`relative flex items-center rounded-xl text-xs font-medium transition duration-150 ${
                      isCollapsed
                        ? "justify-center w-11 h-11 mx-auto"
                        : "gap-2.5 px-3 py-2"
                    } ${
                      isActive
                        ? isCollapsed
                          ? "bg-[#1c2b46] text-white font-bold shadow-xs border border-amber-400/40"
                          : "bg-[#1c2b46] text-white font-bold shadow-xs before:content-[''] before:absolute before:left-[-12px] before:top-2 before:bottom-2 before:w-[3.5px] before:bg-amber-400 before:rounded-r"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 transition-colors ${
                        isActive ? "text-amber-400" : "text-slate-400"
                      }`}
                    />
                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer / System Status & Officer Profile */}
      <div
        className={`border-t border-slate-800/80 bg-[#091322] text-xs transition-all duration-200 ${
          isCollapsed ? "p-2.5" : "p-3.5"
        }`}
      >
        {!isCollapsed ? (
          <>
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-medium">Platform Status:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Operational
              </span>
            </div>
            <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-300 font-bold text-[11px] flex items-center justify-center border border-amber-400/30 flex-shrink-0">
                RR
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-bold text-white truncate leading-tight">
                  Dr. Rajeshwar Rao
                </div>
                <div className="text-[10px] text-slate-400 truncate leading-tight">
                  Super Administrator
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 py-1">
            <div
              className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs flex items-center justify-center border border-amber-400/30 shadow-xs"
              title="Dr. Rajeshwar Rao (Super Administrator)"
            >
              RR
            </div>
            <span
              className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
              title="Platform Status: Operational"
            />
          </div>
        )}
      </div>
    </aside>
  );
};
