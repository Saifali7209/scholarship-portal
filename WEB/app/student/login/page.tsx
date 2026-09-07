"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "../../../context/AppContext";
import { GraduationCap, ArrowRight, User, Sparkles, ShieldCheck, Building } from "lucide-react";

export default function StudentLoginPage() {
  const [email, setEmail] = useState("mohdzama92@gmail.com");
  const [password, setPassword] = useState("password123");
  const { loginAs, switchPersona } = useApp();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs("student", "draft");
    router.push("/student/dashboard");
  };

  const handleQuickPersona = (personaKey: string) => {
    loginAs("student", personaKey);
    router.push("/student/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex flex-col items-center justify-center text-center mb-6 group">
          <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center text-amber-400 shadow-sm border border-navy-800 mb-3 group-hover:bg-navy-800 transition-colors">
            <Building className="w-6 h-6 text-amber-400" />
          </div>
          <span className="text-xl font-extrabold text-navy-950 tracking-tight font-serif">
            INDIA ISLAMIC CULTURAL CENTRE
          </span>
          <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
            National Higher Education Scholarship Portal
          </span>
        </Link>
        <h2 className="text-center text-2xl font-bold tracking-tight text-navy-950">
          Applicant Portal Sign In
        </h2>
        <p className="mt-1 text-center text-xs text-slate-500">
          Access your application dossier, upload documents, and track selection status.
        </p>
      </div>

      <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-7 px-6 shadow-xs rounded-xl border border-slate-200/90 sm:px-8">
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Registered Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 bg-white transition shadow-2xs"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <span className="text-[11px] text-navy-800 hover:text-navy-950 hover:underline cursor-pointer">
                  Forgot Password?
                </span>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 bg-white transition shadow-2xs"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold shadow-xs hover:shadow transition active:scale-98 cursor-pointer"
            >
              <span>Sign In to Student Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Prototype Demo Fast Track Personas */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>1-Click Demo Evaluation Personas:</span>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleQuickPersona("draft")}
                className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-navy-300 hover:bg-slate-50 text-left transition cursor-pointer"
              >
                <div>
                  <div className="text-xs font-semibold text-navy-950">Mohd Zama</div>
                  <div className="text-[10px] text-slate-500">Draft / In-Progress Application</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Draft
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickPersona("shortlisted")}
                className="w-full flex items-center justify-between p-2.5 rounded-lg border border-emerald-200 hover:bg-emerald-50/50 text-left transition cursor-pointer"
              >
                <div>
                  <div className="text-xs font-semibold text-navy-950">Priya Sharma</div>
                  <div className="text-[10px] text-emerald-800 font-medium">
                    Shortlisted • Ready for Video KYC
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">
                  Shortlisted
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickPersona("waitlisted")}
                className="w-full flex items-center justify-between p-2.5 rounded-lg border border-amber-200 hover:bg-amber-50/50 text-left transition cursor-pointer"
              >
                <div>
                  <div className="text-xs font-semibold text-navy-950">Rahul Verma</div>
                  <div className="text-[10px] text-amber-800 font-medium">
                    Waitlist Position #12
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                  Waitlist
                </span>
              </button>
            </div>
          </div>

          <div className="mt-5 text-center text-xs text-slate-500">
            Don't have an applicant account yet?{" "}
            <Link href="/student/register" className="font-semibold text-navy-900 hover:underline">
              Register New Application
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
