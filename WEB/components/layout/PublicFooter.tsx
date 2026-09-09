import React from "react";
import Link from "next/link";
import { GraduationCap, ShieldCheck, ChevronRight, Lock } from "lucide-react";

export const PublicFooter: React.FC = () => {
  return (
    <footer className="relative z-10 bg-[#091524] text-slate-300 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
          {/* Col 1: Institutional Authority & Contact */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#142842] border border-[#1e3a5f] flex items-center justify-center text-white shadow-xs">
                <GraduationCap className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="text-base font-black text-white tracking-tight block">
                  IICC Scholarships
                </span>
                <span className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase block">
                  India Islamic Cultural Centre, New Delhi
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-md">
              Statutory Public Welfare and Merit Fellowship Portal established to support talented students of all communities under the charter of the Education Committee.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <p>
                <strong className="text-slate-200">Headquarters:</strong> 87–88, Lodhi Road, New Delhi – 110003, India
              </p>
              <p>
                <strong className="text-slate-200">Helpdesk:</strong> +91 11 4353 5353 / 2469 0884 &nbsp;|&nbsp; <strong className="text-slate-200">Email:</strong> scholarship@iiccentre.org
              </p>
              <p>
                <strong className="text-slate-200">Education Committee Convener:</strong> Dr. Khwaja M. Shahid
              </p>
            </div>
          </div>

          {/* Col 2: Official Governance Directory */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              Official Governance
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {[
                { name: "Mandatory Statutory Guidelines", href: "/scholarships" },
                { name: "Terms of Award", href: "/scholarships" },
                { name: "Right to Information (RTI)", href: "/#faq" },
                { name: "Education Committee Directory", href: "/#faq" },
                { name: "Direct Benefit Transfer (DBT) Protocol", href: "/#how-it-works" },
                { name: "Privacy Policy", href: "/#faq" }
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 hover:text-white transition group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Portal Integrity Card */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              Portal Integrity
            </h4>
            <div className="bg-[#102035] border border-slate-700/70 rounded-2xl p-5 text-xs shadow-md">
              <div className="flex items-center gap-2 font-bold text-amber-400 mb-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-white text-xs font-bold">Secure Application Gateway</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Submissions are audited under the direct supervision of the statutory Education Committee. False representations are liable for disqualification under relevant statutory provisions.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 India Islamic Cultural Centre (IICC). All rights reserved. Statutory Scholarship Portal.
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <span>87–88, Lodhi Road, New Delhi – 110003</span>
            <span>Education Committee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
