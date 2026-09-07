"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, ArrowRight, ShieldCheck, Building } from "lucide-react";

export default function StudentRegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "Mohd Zama",
    email: "mohdzama92@gmail.com",
    mobile: "9876543210",
    password: "Password@123",
    confirmPassword: "Password@123"
  });

  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("sch_pending_registration", JSON.stringify(formData));
    router.push("/student/verify");
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
          Create Applicant Account
        </h2>
        <p className="mt-1 text-center text-xs text-slate-500">
          Step 1 of 2: Register your primary candidate profile.
        </p>
      </div>

      <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-7 px-6 shadow-xs rounded-xl border border-slate-200/90 sm:px-8">
          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Legal Name (as per Class 10th / Aadhaar)
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 bg-white transition shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 bg-white transition shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mobile Number (10 digits)
              </label>
              <div className="flex rounded-lg shadow-2xs">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-xs font-mono font-medium">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 bg-white transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 bg-white transition shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 bg-white transition shadow-2xs"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold shadow-xs hover:shadow transition active:scale-98 cursor-pointer"
              >
                <span>Continue to OTP Verification</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-5 text-center text-xs text-slate-500">
            Already registered?{" "}
            <Link href="/student/login" className="font-semibold text-navy-900 hover:underline">
              Sign In Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
