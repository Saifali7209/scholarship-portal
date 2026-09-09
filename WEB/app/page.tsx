"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PublicNavbar } from "../components/layout/PublicNavbar";
import { PublicFooter } from "../components/layout/PublicFooter";
import { MOCK_SCHOLARSHIPS } from "../data/mock-scholarships";
import {
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Users,
  Award,
  ShieldCheck,
  FileText,
  Search,
  ChevronDown,
  HelpCircle,
  Clock,
  Sparkles,
  Building,
  Check,
  ChevronRight,
  Calculator,
  ExternalLink,
  Landmark,
  TrendingUp,
  Shield,
  MapPin,
  ClipboardCheck,
  Zap,
  BookOpen
} from "lucide-react";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredScholarships = useMemo(() => {
    if (selectedCategory === "All") {
      return MOCK_SCHOLARSHIPS;
    }
    return MOCK_SCHOLARSHIPS.filter((sch) => {
      if (selectedCategory === "Undergraduate") {
        return sch.category.includes("Undergraduate") || sch.educationLevel === "Undergraduate";
      }
      if (selectedCategory === "Postgraduate") {
        return sch.category.includes("Postgraduate") || sch.educationLevel === "Postgraduate";
      }
      if (selectedCategory === "Senior Secondary") {
        return sch.category.includes("Senior Secondary") || sch.educationLevel === "Senior Secondary";
      }
      if (selectedCategory === "School") {
        return sch.category.includes("School") || sch.educationLevel === "School Level";
      }
      if (selectedCategory === "Diploma") {
        return sch.category.includes("Diploma") || sch.educationLevel === "Diploma";
      }
      return true;
    });
  }, [selectedCategory]);

  const faqs = [
    {
      q: "What are the 3 baseline conditions for the IICC Scholarship?",
      a: "As per official guidelines: 1. Must be a citizen of India residing in India. 2. Must be a regular full-time student in a recognized institution/school/college (distance/correspondence courses are not eligible). 3. Must have secured at least 60% aggregate marks in the last qualifying examination (CGPA converted via Percentage = CGPA × 9.5)."
    },
    {
      q: "How many total scholarships are awarded under the IICC programme?",
      a: "A total of 200 awards are granted annually: 175 awards distributed across 5 categories (UG Professional: 50, Senior Secondary: 50, PG Professional: 40, School Level: 20, Diploma: 15) plus 25 awards reserved for children of IICC employees and management staff."
    },
    {
      q: "How is the 100-mark merit score calculated?",
      a: "Marks are calculated strictly out of 100: Academic Performance carries up to 60 marks (based on % bracket), Annual Family Income carries up to 35 marks (lower income slabs receive higher marks), and Special Categories carry up to 5 marks capped (Orphan: 5, Single Parent/Widow: 4, PwD: 3, Girl Student: 2)."
    },
    {
      q: "What is the tie-breaking policy if two candidates have the same score?",
      a: "Ranking resolution follows a strict sequential hierarchy: 1. Candidate with lower family income receives priority. 2. Higher qualifying examination percentage. 3. Special category seniority. 4. Date of birth (younger candidate priority)."
    },
    {
      q: "What documents are mandatory for submission (Q41–Q45)?",
      a: "Self-attested copy of Aadhaar Card (Q41), PAN Card if available (Q42), Bonafide Certificate / Enrolment proof from Head of Institution (Q43), Disability/Special category certificate if claimed (Q44), and Income Certificate or Notarized Affidavit on ₹10 non-judicial stamp paper (Q45)."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfcfd] font-sans text-slate-900 relative">
      <PublicNavbar />

      <main className="relative z-10 flex-1">
        {/* ==========================================================================
            HERO SECTION (Two-Column Layout matching Screenshot 1)
           ========================================================================== */}
        <section className="relative py-12 lg:py-16 border-b border-slate-200/90 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Typography, Patronage & CTAs */}
              <div className="lg:col-span-7 space-y-6">
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdf8ee] border border-[#f5deae] text-[#85530f] text-xs font-bold tracking-wide shadow-2xs">
                  <Shield className="w-3.5 h-3.5 text-amber-600" />
                  <span>INDIA ISLAMIC CULTURAL CENTRE (IICC) • SESSION 2026–27</span>
                </div>

                {/* Main Heading with Serif Font and Golden Accent Underline */}
                <div className="relative">
                  <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-serif font-bold text-slate-950 tracking-tight leading-[1.15]">
                    IICC Merit-cum-Means{" "}
                    <span className="relative inline-block">
                      Scholarship Programme
                      <span className="absolute -bottom-1 left-0 w-44 sm:w-56 h-1.5 bg-amber-400/90 rounded-full" />
                    </span>
                  </h1>
                </div>

                {/* Subtitle / Patronage Paragraph */}
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
                  Under the formal patronage of the Education Committee (Convener:{" "}
                  <strong className="text-slate-900 font-semibold">Dr. Khwaja M. Shahid</strong>). Awarding{" "}
                  <strong className="text-slate-900 font-semibold">200 structured fellowships</strong> (175 General + 25 Staff Quota) spanning School, Senior Secondary, Technical Diploma, Undergraduate, and Postgraduate Professional degrees for talented Indian students across the nation.
                </p>

                {/* CTAs Row */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/eligibility"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0f2544] hover:bg-[#1a3964] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow transition active:scale-98 tracking-wide cursor-pointer"
                  >
                    <ClipboardCheck className="w-4 h-4 text-amber-400" />
                    <span>Check 3-Step Eligibility</span>
                  </Link>

                  <Link
                    href="/scholarships"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-xs sm:text-sm shadow-2xs hover:shadow-xs transition"
                  >
                    <span>Explore 5 Award Streams</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>
                </div>

                {/* Statutory Gazette Link */}
                <div className="pt-1">
                  <Link
                    href="/scholarships"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-amber-900 hover:text-amber-950 transition"
                  >
                    <FileText className="w-4 h-4 text-amber-600" />
                    <span className="underline decoration-amber-400/70 underline-offset-4">
                      Statutory Gazette (PDF)
                    </span>
                  </Link>
                </div>

                {/* Feature Micro-Stats Row */}
                <div className="pt-6 border-t border-slate-200/90 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 flex-shrink-0">
                      <Landmark className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 leading-tight">100% DBT Direct</div>
                      <div className="text-[11px] text-slate-500">To Bank Account</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 flex-shrink-0">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 leading-tight">Statutory Audit</div>
                      <div className="text-[11px] text-slate-500">Committee Monitored</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 flex-shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 leading-tight">Zero Bias Quota</div>
                      <div className="text-[11px] text-slate-500">100–Marks Matrix</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Image Frame & Floating Card */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Card Container with golden/amber border frame */}
                  <div className="relative rounded-3xl p-3 bg-white border-2 border-amber-300/80 shadow-xl overflow-hidden">
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
                      <img
                        src="/hero-students.jpg"
                        alt="Indian university students studying in an academic library"
                        className="w-full h-full object-cover object-center"
                      />
                      {/* Gradient overlay for contrast at bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Floating Grant Banner Overlay at bottom */}
                    <div className="mt-3 bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 flex-shrink-0">
                          <Award className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                            Max Statutory Grant
                          </span>
                          <span className="text-xl font-black text-emerald-600 font-mono tracking-tight">
                            ₹60,000 <span className="text-xs font-medium text-slate-500">/ Year</span>
                          </span>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold">
                        200 Scholars
                      </span>
                    </div>
                  </div>

                  {/* Address sub-caption */}
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium mt-3 text-center">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span>87–88, Lodhi Road, New Delhi – 110003 • Statutory Central Secretariat</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ==========================================================================
            KEY METRICS BAR (4 Columns matching Screenshot 2)
           ========================================================================== */}
        <section className="relative py-8 bg-white border-b border-slate-200/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200/90">
              
              {/* Stat 1 */}
              <div className="px-4 py-2 text-left">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Total Scholarships
                </span>
                <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono">
                  200 <span className="text-sm font-normal text-slate-600">Seats</span>
                </div>
                <span className="text-xs text-slate-500 mt-1 block">
                  Across 5 academic levels
                </span>
              </div>

              {/* Stat 2 */}
              <div className="px-4 py-2 text-left">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Allocation Formula
                </span>
                <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono">
                  175 + 25
                </div>
                <span className="text-xs text-slate-500 mt-1 block">
                  175 General + 25 Staff Quota
                </span>
              </div>

              {/* Stat 3 */}
              <div className="px-4 py-2 text-left">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Scoring Evaluation
                </span>
                <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono">
                  100 Marks
                </div>
                <span className="text-xs text-slate-500 mt-1 block">
                  Merit (70%) + Means (30%)
                </span>
              </div>

              {/* Stat 4 */}
              <div className="px-4 py-2 text-left">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Application Closes
                </span>
                <div className="text-2xl sm:text-3xl font-black text-red-600 font-mono">
                  31 Oct 2026
                </div>
                <span className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Portal closes at 23:59 IST
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* ==========================================================================
            MANDATORY BASELINE ELIGIBILITY ENGINE (Card with gold top border - Screenshot 2)
           ========================================================================== */}
        <section className="relative py-14 bg-[#fbfcfd] border-b border-slate-200/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
              {/* Golden accent bar on top edge */}
              <div className="h-1.5 bg-amber-500 w-full" />

              <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#0f2544] flex-shrink-0 mt-0.5">
                      <ShieldCheck className="w-5 h-5 text-blue-800" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                        Mandatory Baseline Eligibility Engine
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                        All 3 conditions are strictly statutory; failure to satisfy any one renders applicant ineligible.
                      </p>
                    </div>
                  </div>

                  <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200/80 text-xs font-bold tracking-wide uppercase">
                    Statutory Criteria 2026–27
                  </span>
                </div>

                {/* 3 Condition Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                  {/* Condition 1 */}
                  <div className="bg-[#f8fafc] rounded-xl border border-slate-200/90 p-5 flex flex-col justify-between hover:border-slate-300 transition shadow-2xs">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="font-mono text-[11px] font-bold text-slate-400">
                          RULE § 2.1
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-950 mb-2">
                        Condition 1: Indian Citizen
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        Must be a verified citizen of the Republic of India residing within national borders. Government-issued photo proof is mandatory.
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/70 flex items-center gap-1.5 text-[11px] font-medium text-amber-900">
                      <FileText className="w-3.5 h-3.5 text-amber-600" />
                      <span>Valid Aadhaar / Passport / Voter Card</span>
                    </div>
                  </div>

                  {/* Condition 2 */}
                  <div className="bg-[#f8fafc] rounded-xl border border-slate-200/90 p-5 flex flex-col justify-between hover:border-slate-300 transition shadow-2xs">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="font-mono text-[11px] font-bold text-slate-400">
                          RULE § 2.2
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-950 mb-2">
                        Condition 2: Regular Enrolment
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        Must be enrolled full-time in a regular recognized school, college, polytechnic, or UGC/AICTE approved university for Session 2026–27.
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/70 flex items-center gap-1.5 text-[11px] font-medium text-amber-900">
                      <Building className="w-3.5 h-3.5 text-amber-600" />
                      <span>Full-Time Regular Enrolment Certificate</span>
                    </div>
                  </div>

                  {/* Condition 3 */}
                  <div className="bg-[#f8fafc] rounded-xl border border-slate-200/90 p-5 flex flex-col justify-between hover:border-slate-300 transition shadow-2xs">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="font-mono text-[11px] font-bold text-slate-400">
                          RULE § 2.3
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-950 mb-2">
                        Condition 3: Academic Merit
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        Must have secured minimum 60% aggregate marks (or equivalent CGPA x 9.5 conversion) in the immediate previous examination board.
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/70 flex items-center gap-1.5 text-[11px] font-medium text-amber-900">
                      <FileText className="w-3.5 h-3.5 text-amber-600" />
                      <span>Official Marksheet Attestation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            AUTOMATED 100-MARKS COMPOSITE MATRIX BANNER (Screenshot 3)
           ========================================================================== */}
        <section className="relative py-8 bg-[#fbfcfd]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0c1e36] text-white rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-[#142d50]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Automated 100–Marks Merit &amp; Means Composite Matrix
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Calculate your score: Academic Score (up to 70 pts) + Family Income Factor (up to 30 pts).
                  </p>
                </div>
              </div>

              <Link
                href="/eligibility"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#fef3c7] hover:bg-[#fde68a] text-slate-950 font-bold text-xs sm:text-sm transition shadow-sm active:scale-98 flex-shrink-0 cursor-pointer"
              >
                <span>Launch Score Simulator</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            OFFICIAL 2026-27 SCHEMES / IICC SCHOLARSHIP STREAMS (Screenshot 3 & 4)
           ========================================================================== */}
        <section className="relative py-14 bg-white border-b border-slate-200/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header with Filter Dropdown */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-[11px] font-bold text-amber-900 tracking-widest uppercase block mb-1">
                  Official 2026–27 Schemes
                </span>
                <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
                  IICC Scholarship Streams
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  200 merit-cum-means awards distributed across 5 education categories plus staff ward quota.
                </p>
              </div>

              {/* Filter by Stage Dropdown */}
              <div className="flex items-center gap-2">
                <label htmlFor="stage-filter" className="text-xs font-semibold text-slate-600">
                  Filter by Stage:
                </label>
                <div className="relative">
                  <select
                    id="stage-filter"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none bg-white border border-slate-300 text-slate-800 text-xs font-medium rounded-lg px-3.5 py-2 pr-8 shadow-2xs hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-navy-900 cursor-pointer"
                  >
                    <option value="All">All 5 Categories</option>
                    <option value="Undergraduate">Undergraduate Professional</option>
                    <option value="Postgraduate">Postgraduate Professional</option>
                    <option value="Senior Secondary">Senior Secondary (XI–XII)</option>
                    <option value="School">School Level (IX–X)</option>
                    <option value="Diploma">Diploma Courses</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* 3-Column Scholarship Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScholarships.map((sch) => (
                <div
                  key={sch.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between gap-5"
                >
                  <div className="space-y-4">
                    {/* Category & Deadline Badges */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-900 border border-blue-200/80 font-bold text-[10px] tracking-wide uppercase">
                        {sch.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-rose-50 text-rose-800 border border-rose-200/80 font-semibold text-[10px] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-rose-600" />
                        <span>31 Oct 2026</span>
                      </span>
                    </div>

                    {/* Card Title */}
                    <h3 className="text-lg font-bold text-slate-950 leading-snug">
                      <Link href={`/scholarships/${sch.id}`} className="hover:text-blue-900 transition">
                        {sch.name.replace("IICC Merit-cum-Means ", "")}
                      </Link>
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {sch.description}
                    </p>

                    {/* Eligibility Norm Container */}
                    <div className="bg-[#f8fafc] rounded-xl p-3.5 border border-slate-200/80 text-xs">
                      <div className="text-slate-800 font-bold mb-1 flex items-center gap-1.5 text-[11px]">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Eligibility Norm:</span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        {sch.eligibilitySummary}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Grant & Actions Row */}
                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                          Grant Amount
                        </span>
                        <span className="text-lg font-black text-emerald-600 font-mono tracking-tight">
                          {sch.amount}
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 border border-amber-300/70 text-xs font-bold">
                        {sch.totalAwards} Seats
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/scholarships/${sch.id}`}
                        className="w-full text-center px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-xs shadow-2xs transition"
                      >
                        Details
                      </Link>
                      <Link
                        href="/student/application"
                        className="w-full inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-[#0f2544] hover:bg-[#1a3964] text-white font-bold text-xs shadow-2xs transition active:scale-95 cursor-pointer"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================================================
            HOW IT WORKS & SELECTION WORKFLOW
           ========================================================================== */}
        <section id="how-it-works" className="relative py-16 bg-[#fbfcfd] border-b border-slate-200/90">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold text-navy-900 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
                IICC Merit Workflow
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-2 tracking-tight">
                How Selection Works
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                From online eligibility verification to 100-mark scoring formula and merit-ranked award disbursement.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="relative bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs hover:border-slate-300 transition">
                <div className="w-9 h-9 rounded-lg bg-[#0f2544] text-white font-bold text-sm flex items-center justify-center mb-3.5 shadow-2xs">
                  1
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">Check Eligibility</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Answer simple questions about your nationality, ongoing course, past marks, and family income to find matching schemes.
                </p>
              </div>

              <div className="relative bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs hover:border-slate-300 transition">
                <div className="w-9 h-9 rounded-lg bg-[#0f2544] text-white font-bold text-sm flex items-center justify-center mb-3.5 shadow-2xs">
                  2
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">Submit Application</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fill the 5-step form, upload your marksheets and certificates, and save drafts at any time before final confirmation.
                </p>
              </div>

              <div className="relative bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs hover:border-slate-300 transition">
                <div className="w-9 h-9 rounded-lg bg-[#0f2544] text-white font-bold text-sm flex items-center justify-center mb-3.5 shadow-2xs">
                  3
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">Merit Shortlisting</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Transparent ranking of all applicants with live waiting list positions. Shortlisted candidates are invited for Video KYC.
                </p>
              </div>

              <div className="relative bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs hover:border-slate-300 transition">
                <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white font-bold text-sm flex items-center justify-center mb-3.5 shadow-2xs">
                  4
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">Final Award &amp; DBT</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Once biometric verification completes, award letters are issued and funds are disbursed directly to your bank account.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            CALL TO ACTION BANNER (Dark Navy with Watermark - Screenshot 5)
           ========================================================================== */}
        <section className="relative py-14 sm:py-18 bg-[#fbfcfd]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-[#0d1e35] text-white rounded-3xl p-8 sm:p-14 overflow-hidden shadow-xl border border-slate-800">
              {/* Subtle Mortarboard Watermark in background */}
              <GraduationCap
                className="absolute -right-8 -bottom-10 w-72 h-72 text-slate-700/20 pointer-events-none select-none"
                strokeWidth={1}
              />

              <div className="relative z-10 max-w-2xl space-y-4">
                {/* Applications Live Pill */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Applications Live For Academic Year 2026–27</span>
                </div>

                {/* Serif Heading */}
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                  Ready to secure your educational grant?
                </h2>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Complete the 3-minute preliminary eligibility check and start your journey toward joining the 200 honored scholars of the India Islamic Cultural Centre.
                </p>

                {/* Buttons Row */}
                <div className="flex flex-wrap items-center gap-3.5 pt-4">
                  <Link
                    href="/eligibility"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-bold text-xs sm:text-sm shadow-md transition active:scale-98 cursor-pointer"
                  >
                    <span>Start Free Eligibility Check</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/student/register"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-xs sm:text-sm transition cursor-pointer"
                  >
                    <span>Create Student Account</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            FREQUENTLY ASKED QUESTIONS (FAQ)
           ========================================================================== */}
        <section id="faq" className="relative py-14 sm:py-18 bg-white border-t border-slate-200/90">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-xs font-bold text-navy-900 uppercase tracking-widest bg-slate-50 px-2.5 py-0.5 rounded border border-slate-200 shadow-2xs">
                Guidance &amp; Queries
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-2 tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={faq.q}
                  className="relative bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs transition"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-slate-900 bg-white hover:bg-slate-50 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        openFaq === idx ? "rotate-180 text-navy-900" : ""
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed bg-[#f8fafc] border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
