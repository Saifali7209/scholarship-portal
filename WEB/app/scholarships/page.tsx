"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PublicNavbar } from "../../components/layout/PublicNavbar";
import { PublicFooter } from "../../components/layout/PublicFooter";
import { MOCK_SCHOLARSHIPS } from "../../data/mock-scholarships";
import { Search, Filter, Calendar, Award, ArrowRight, BookOpen } from "lucide-react";

export default function ScholarshipsListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const categories = [
    "All",
    "Higher Education",
    "Senior Secondary",
    "Postgraduate",
    "Secondary School",
    "Technical Education"
  ];
  const levels = [
    "All",
    "School Level (Class IX–X)",
    "Senior Secondary (Class XI–XII)",
    "Diploma",
    "Undergraduate",
    "Postgraduate"
  ];

  const filtered = MOCK_SCHOLARSHIPS.filter((sch) => {
    const matchesSearch =
      sch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sch.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sch.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || sch.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "All" || sch.educationLevel === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-navy-800 uppercase tracking-widest bg-navy-50 px-2.5 py-0.5 rounded border border-navy-200">
              India Islamic Cultural Centre
            </span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              200 Total Awards (175 General + 25 Staff)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
            IICC Scholarship Schemes 2026-27
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            87-88, Lodhi Road, New Delhi-110003 • Convener (Education): Dr. Khwaja M. Shahid • Evaluated via 100-Mark Merit Formula.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by scholarship name or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="gov-input pl-9 text-xs"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Category */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold">
              <span>Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="gov-select text-xs font-medium w-auto"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Level */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold">
              <span>Level:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="gov-select text-xs font-medium w-auto"
              >
                {levels.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((sch) => (
              <div
                key={sch.id}
                className="gov-card p-5 sm:p-6 shadow-xs hover:border-slate-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-navy-50 text-navy-800 border border-navy-200/80">
                        {sch.category}
                      </span>
                      <span className="text-xs text-slate-500 font-mono font-semibold">
                        {sch.code}
                      </span>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                        sch.status === "Open"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}
                    >
                      {sch.status}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 tracking-tight">
                    <Link href={`/scholarships/${sch.id}`} className="hover:text-navy-800">
                      {sch.name}
                    </Link>
                  </h3>

                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    {sch.description}
                  </p>

                  <div className="space-y-2 mb-5 p-3 bg-slate-50 rounded-lg border border-slate-200/70 text-xs">
                    <div className="text-slate-700 flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span><strong>{sch.totalAwards} Total Awards</strong> this Academic Year</span>
                    </div>
                    <div className="text-slate-700 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-navy-700 flex-shrink-0" />
                      <span>{sch.educationLevel} Degree Programs</span>
                    </div>
                    <div className="text-slate-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-500 flex-shrink-0" />
                      <span>Deadline: <strong className="text-rose-700 font-mono">{sch.deadline}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                      Disbursement Amount
                    </span>
                    <span className="text-lg font-extrabold text-emerald-700 font-mono tabular-nums">
                      {sch.amount}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/scholarships/${sch.id}`}
                      className="px-3.5 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs transition"
                    >
                      View Details
                    </Link>
                    <Link
                      href="/student/application"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold shadow-xs transition active:scale-95"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
            <h3 className="text-sm font-bold text-slate-800">No scholarships match your filters</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Try clearing your search query or selecting "All".</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedLevel("All");
              }}
              className="text-xs font-bold text-navy-800 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}
