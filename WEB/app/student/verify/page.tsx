"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "../../../context/AppContext";
import { GraduationCap, Mail, Phone, CheckCircle2, ArrowRight, RotateCw, AlertCircle, Building } from "lucide-react";

export default function StudentOtpVerificationPage() {
  const [currentOtpStage, setCurrentOtpStage] = useState<"email" | "mobile">("email");
  const [emailOtp, setEmailOtp] = useState(["1", "2", "3", "4", "5", "6"]);
  const [mobileOtp, setMobileOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(45);
  const [error, setError] = useState("");
  const { loginAs, saveDraft } = useApp();
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (
    val: string,
    index: number,
    type: "email" | "mobile"
  ) => {
    if (val.length > 1) val = val.slice(-1);
    const arr = type === "email" ? [...emailOtp] : [...mobileOtp];
    arr[index] = val;
    if (type === "email") setEmailOtp(arr);
    else setMobileOtp(arr);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-${type}-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = emailOtp.join("");
    if (entered === "123456") {
      setError("");
      setCurrentOtpStage("mobile");
      setMobileOtp(["1", "2", "3", "4", "5", "6"]); // Pre-fill for easy testing
      setTimer(45);
    } else {
      setError("Invalid OTP. For prototype demo, enter 123456.");
    }
  };

  const handleVerifyMobile = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = mobileOtp.join("");
    if (entered === "123456") {
      setError("");
      // Successfully authenticated
      loginAs("student", "draft");
      router.push("/student/dashboard");
    } else {
      setError("Invalid Mobile OTP. For prototype demo, enter 123456.");
    }
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
          Two-Factor Authentication
        </h2>
        <p className="mt-1 text-center text-xs text-slate-500">
          Step 2 of 2: Authenticate your contact credentials via secure one-time passcode.
        </p>
      </div>

      <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-7 px-6 shadow-xs rounded-xl border border-slate-200/90 sm:px-8">
          {/* Progress Pill */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                  currentOtpStage === "email"
                    ? "bg-navy-900 text-white"
                    : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                }`}
              >
                {currentOtpStage === "mobile" ? "✓" : "1"}
              </span>
              <span
                className={
                  currentOtpStage === "email"
                    ? "font-bold text-navy-950"
                    : "text-slate-500"
                }
              >
                Email OTP
              </span>
            </div>

            <span className="text-slate-300">➔</span>

            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                  currentOtpStage === "mobile"
                    ? "bg-navy-900 text-white"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                2
              </span>
              <span
                className={
                  currentOtpStage === "mobile"
                    ? "font-bold text-navy-950"
                    : "text-slate-500"
                }
              >
                Mobile SMS OTP
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Email OTP Stage */}
          {currentOtpStage === "email" ? (
            <form onSubmit={handleVerifyEmail} className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-navy-50 text-navy-900 border border-navy-200 flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-navy-950">
                  Verify Registered Email Address
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  We've sent a 6-digit passcode to{" "}
                  <strong className="text-slate-800">mohdzama92@gmail.com</strong>
                </p>
              </div>

              {/* 6 Inputs */}
              <div className="flex justify-center gap-2">
                {emailOtp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-email-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, idx, "email")}
                    className="w-10 h-12 text-center text-lg font-bold font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 focus:outline-none bg-white shadow-2xs text-navy-950"
                  />
                ))}
              </div>

              {/* Subtle Demo Notice */}
              <div className="text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-navy-50 text-navy-900 text-xs font-mono font-semibold border border-navy-200">
                  Demo Passcode: 123456
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Resend code in: 00:{timer < 10 ? `0${timer}` : timer}</span>
                <button
                  type="button"
                  disabled={timer > 0}
                  onClick={() => setTimer(45)}
                  className="font-semibold text-navy-900 disabled:opacity-40 disabled:cursor-not-allowed hover:underline cursor-pointer"
                >
                  Resend OTP
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold shadow-xs hover:shadow transition active:scale-98 cursor-pointer"
              >
                Verify Email & Continue
              </button>
            </form>
          ) : (
            /* Mobile OTP Stage */
            <form onSubmit={handleVerifyMobile} className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-navy-50 text-navy-900 border border-navy-200 flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-navy-950">
                  Verify Mobile Number
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  We've dispatched a 6-digit SMS passcode to{" "}
                  <strong className="text-slate-800">+91 98765 43210</strong>
                </p>
              </div>

              {/* 6 Inputs */}
              <div className="flex justify-center gap-2">
                {mobileOtp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-mobile-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, idx, "mobile")}
                    className="w-10 h-12 text-center text-lg font-bold font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 focus:outline-none bg-white shadow-2xs text-navy-950"
                  />
                ))}
              </div>

              {/* Subtle Demo Notice */}
              <div className="text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-navy-50 text-navy-900 text-xs font-mono font-semibold border border-navy-200">
                  Demo Passcode: 123456
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Resend SMS in: 00:{timer < 10 ? `0${timer}` : timer}</span>
                <button
                  type="button"
                  disabled={timer > 0}
                  onClick={() => setTimer(45)}
                  className="font-semibold text-navy-900 disabled:opacity-40 disabled:cursor-not-allowed hover:underline cursor-pointer"
                >
                  Resend SMS
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold shadow-xs hover:shadow transition active:scale-98 cursor-pointer"
              >
                Complete Verification & Open Dashboard
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
