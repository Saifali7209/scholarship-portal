"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "../../../context/AppContext";
import { Shield, ArrowRight, Lock, Mail, Sparkles, Building } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@scholarship.demo");
  const [password, setPassword] = useState("Admin@123");
  const { loginAs } = useApp();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs("admin");
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#f4f6fa] text-slate-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex flex-col items-center justify-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0c182b] to-[#162744] border border-amber-500/30 flex items-center justify-center text-amber-300 shadow-md mb-3">
            <Building className="w-7 h-7 text-amber-400" />
          </div>
          <span className="text-xl font-black text-navy-950 tracking-tight font-serif">
            INDIA ISLAMIC CULTURAL CENTRE
          </span>
          <span className="text-[11px] text-amber-700 font-bold uppercase tracking-wider mt-1">
            Scholarship Governance & Operations Console
          </span>
        </div>
        <h2 className="text-center text-2xl font-black tracking-tight text-navy-950">
          Institutional Officer Access
        </h2>
        <p className="mt-1 text-center text-xs text-slate-500">
          Enter authorized administrative credentials to access the central review queue.
        </p>
      </div>

      <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xs rounded-3xl border border-slate-200/90 sm:px-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-navy-900 via-amber-500 to-navy-800" />

          {/* Demo Credentials Box */}
          <div className="mb-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-xs text-slate-700">
            <div className="flex items-center gap-1.5 font-black text-amber-950 uppercase tracking-wider text-[10px] mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Demo Officer Credentials</span>
            </div>
            <div className="font-mono text-[11px] space-y-1">
              <div>Email: <strong className="text-navy-950 font-bold">admin@scholarship.demo</strong></div>
              <div>Password: <strong className="text-navy-950 font-bold">Admin@123</strong></div>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Administrator Email Address
              </label>
              <div className="relative rounded-xl">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 focus:outline-none placeholder-slate-400 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative rounded-xl">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 focus:outline-none placeholder-slate-400 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-navy-950 hover:bg-navy-900 text-white text-xs font-black shadow-xs hover:shadow transition active:scale-98 cursor-pointer mt-2"
            >
              <span>Sign In to Admin Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => {
                loginAs("admin");
                router.push("/admin/dashboard");
              }}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-bold border border-slate-200 transition cursor-pointer"
            >
              ⚡ 1-Click Fast Access as Super Admin
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-navy-950 transition inline-flex items-center gap-1">
            <span>← Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
