import React from "react";
import Link from "next/link";
import { GraduationCap, ShieldCheck, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export const PublicFooter: React.FC = () => {
  return (
    <footer className="relative z-10 bg-slate-50 text-slate-600 border-t border-slate-200 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Institutional Authority */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-navy-900 border border-navy-800 flex items-center justify-center text-white shadow-xs">
                <GraduationCap className="w-4.5 h-4.5 text-amber-400" />
              </div>
              <span className="text-sm font-extrabold text-navy-950 tracking-tight">
                IICC SCHOLARSHIPS
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              India Islamic Cultural Centre (IICC) • Education Committee. Offering 200 merit-cum-means awards across school, diploma, undergraduate, and postgraduate professional courses for meritorious regular Indian students.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-700 font-medium p-2 bg-white rounded-lg border border-slate-200/90 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Dr. Khwaja M. Shahid, Convener (Education)</span>
            </div>
          </div>

          {/* Col 2: 5 Award Streams */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
              Award Streams (200 Seats)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/scholarships" className="text-slate-600 hover:text-navy-950 transition flex items-center justify-between">
                  <span>UG Professional</span>
                  <span className="font-mono text-[11px] text-amber-800 font-semibold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">50 Seats</span>
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="text-slate-600 hover:text-navy-950 transition flex items-center justify-between">
                  <span>Senior Secondary (XI–XII)</span>
                  <span className="font-mono text-[11px] text-amber-800 font-semibold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">50 Seats</span>
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="text-slate-600 hover:text-navy-950 transition flex items-center justify-between">
                  <span>PG Professional</span>
                  <span className="font-mono text-[11px] text-amber-800 font-semibold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">40 Seats</span>
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="text-slate-600 hover:text-navy-950 transition flex items-center justify-between">
                  <span>School Level (IX–X)</span>
                  <span className="font-mono text-[11px] text-amber-800 font-semibold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">20 Seats</span>
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="text-slate-600 hover:text-navy-950 transition flex items-center justify-between">
                  <span>Diploma Courses</span>
                  <span className="font-mono text-[11px] text-amber-800 font-semibold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">15 Seats</span>
                </Link>
              </li>
              <li>
                <span className="text-slate-600 flex items-center justify-between pt-1 border-t border-slate-200 text-[11px]">
                  <span>IICC Staff Children Quota</span>
                  <span className="font-mono text-emerald-800 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">25 Seats</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Guidelines */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
              Mandatory Conditions
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="font-mono text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-800 font-bold">C1</span>
                <span>Indian citizen residing in India</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-800 font-bold">C2</span>
                <span>Regular full-time student in recognized institute</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-800 font-bold">C3</span>
                <span>Min. 60% aggregate marks in last exam</span>
              </li>
              <li className="pt-2 border-t border-slate-200">
                <Link href="/eligibility" className="text-blue-900 hover:underline font-semibold flex items-center gap-1">
                  <span>Check Instant Eligibility Engine</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Headquarters */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
              Headquarters & Enquiries
            </h4>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>India Islamic Cultural Centre, 87-88, Lodhi Road, New Delhi – 110003</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800">
                <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <span className="font-mono">+91 11 4353 5353 / 2469 0884</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800">
                <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <span className="font-mono">scholarship@iiccentre.org</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 India Islamic Cultural Centre (IICC). All rights reserved. Official Scholarship Platform.
          </div>
          <div className="flex items-center gap-6">
            <span>87-88, Lodhi Road, New Delhi-110003</span>
            <span>Education Committee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
