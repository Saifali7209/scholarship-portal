"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "../../context/AppContext";
import {
  Sparkles,
  User,
  Shield,
  RotateCcw,
  CheckCircle,
  Clock,
  Award,
  ChevronDown,
  Eye,
  GraduationCap,
  Scale
} from "lucide-react";

export const DemoBanner: React.FC = () => {
  const {
    role,
    activePersonaKey,
    switchPersona,
    loginAs,
    resetDemoData,
    studentApplication
  } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSelectPersona = (key: string) => {
    switchPersona(key);
    setIsOpen(false);
    if (!pathname.startsWith("/student")) {
      router.push("/student/dashboard");
    }
  };

  const handleAdminJump = () => {
    loginAs("admin");
    setIsOpen(false);
    router.push("/admin/dashboard");
  };

  const handleStudentJump = () => {
    loginAs("student", activePersonaKey);
    setIsOpen(false);
    router.push("/student/dashboard");
  };

  return (
    <div className="bg-[#f8fafc] text-slate-700 text-xs border-b border-slate-200/90 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-1.5 sm:py-2 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
        {/* Badge & Notice */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full font-semibold bg-amber-100/90 text-amber-900 border border-amber-300 text-[10px] sm:text-[11px] shadow-2xs">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>Prototype / Demo</span>
          </span>
          <span className="text-slate-500 font-medium text-[11px] hidden md:inline">
            Simulated frontend workflows • Academic Session 2026–27 Intake Open
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap">
          {/* Persona Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-2xs transition font-medium text-[11px] sm:text-xs cursor-pointer"
              title="Switch demo persona"
            >
              <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-700 flex-shrink-0" />
              <span>
                <span className="hidden sm:inline">Persona: </span>
                <strong className="text-slate-900 capitalize">
                  {activePersonaKey === "draft"
                    ? "Mohd (Draft)"
                    : activePersonaKey === "shortlisted"
                    ? "Priya (Shortlisted)"
                    : activePersonaKey === "waitlisted"
                    ? "Rahul (Waitlist)"
                    : activePersonaKey === "approved"
                    ? "Ananya (Approved)"
                    : "Vikram (Correction)"}
                </strong>
              </span>
              <ChevronDown className="w-3 h-3 text-slate-500 ml-0.5" />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-slate-800">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Select Applicant Scenario
                </div>

                <button
                  onClick={() => handleSelectPersona("draft")}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition ${
                    activePersonaKey === "draft" ? "text-blue-900 bg-blue-50/70 font-semibold" : ""
                  }`}
                >
                  <div>
                    <div className="font-medium text-slate-900">Mohd Zama</div>
                    <div className="text-[11px] text-slate-500">Draft / New Applicant</div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">Draft</span>
                </button>

                <button
                  onClick={() => handleSelectPersona("shortlisted")}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition ${
                    activePersonaKey === "shortlisted" ? "text-blue-900 bg-blue-50/70 font-semibold" : ""
                  }`}
                >
                  <div>
                    <div className="font-medium text-slate-900">Priya Sharma</div>
                    <div className="text-[11px] text-emerald-700 font-medium">Shortlisted for Video KYC</div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                    KYC Ready
                  </span>
                </button>

                <button
                  onClick={() => handleSelectPersona("waitlisted")}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition ${
                    activePersonaKey === "waitlisted" ? "text-blue-900 bg-blue-50/70 font-semibold" : ""
                  }`}
                >
                  <div>
                    <div className="font-medium text-slate-900">Rahul Verma</div>
                    <div className="text-[11px] text-amber-700 font-medium">Waitlist Position #12</div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                    Waitlist
                  </span>
                </button>

                <button
                  onClick={() => handleSelectPersona("approved")}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition ${
                    activePersonaKey === "approved" ? "text-blue-900 bg-blue-50/70 font-semibold" : ""
                  }`}
                >
                  <div>
                    <div className="font-medium text-slate-900">Ananya Patel</div>
                    <div className="text-[11px] text-cyan-700 font-medium">Awarded & Disbursement Ready</div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-50 text-cyan-800 border border-cyan-200 font-semibold">
                    Approved
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Portal Switch */}
          <button
            onClick={handleStudentJump}
            className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-[#0f2544] hover:bg-[#1a3964] text-white border border-[#0f2544] transition font-semibold text-[11px] sm:text-xs shadow-2xs cursor-pointer"
            title="Open Student Portal"
          >
            <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
            <span className="hidden xs:inline sm:inline">Student</span>
            <span className="hidden sm:inline">Portal</span>
          </button>

          <button
            onClick={handleAdminJump}
            className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 transition font-semibold text-[11px] sm:text-xs shadow-2xs cursor-pointer"
            title="Open Admin Portal"
          >
            <Scale className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-700" />
            <span className="hidden xs:inline sm:inline">Admin</span>
            <span className="hidden sm:inline">Portal</span>
          </button>

          {/* Reset Demo Button */}
          <button
            onClick={() => {
              if (confirm("Reset all prototype data back to fresh demo defaults?")) {
                resetDemoData();
                router.push("/");
              }
            }}
            className="p-1 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition border border-transparent hover:border-rose-200 cursor-pointer"
            title="Reset demo data to initial state"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
