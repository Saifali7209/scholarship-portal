import React from "react";

export const ApplicationFunnelChart: React.FC = () => {
  const steps = [
    { label: "Total Received", count: "10,248", pct: 100, color: "bg-navy-900" },
    { label: "Submitted Complete", count: "9,842", pct: 96, color: "bg-navy-700" },
    { label: "Document Verified", count: "6,210", pct: 60, color: "bg-navy-500" },
    { label: "Merit Shortlisted", count: "325", pct: 3.1, color: "bg-purple-600" },
    { label: "Final Verification (KYC)", count: "287", pct: 2.8, color: "bg-teal-600" },
    { label: "Final Approved & Disbursed", count: "198", pct: 1.9, color: "bg-emerald-600" }
  ];

  return (
    <div className="space-y-3.5">
      {steps.map((step) => (
        <div key={step.label}>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-slate-800">{step.label}</span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-slate-900">{step.count}</span>
              <span className="text-slate-500 font-mono text-[11px]">({step.pct}%)</span>
            </div>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
            <div
              className={`h-full ${step.color} rounded-full transition-all duration-500`}
              style={{ width: `${Math.max(step.pct, 4)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export const StatusDistributionChart: React.FC = () => {
  const items = [
    { status: "Under Review", count: 3421, color: "bg-indigo-600" },
    { status: "Shortlisted", count: 325, color: "bg-purple-600" },
    { status: "Final KYC", count: 287, color: "bg-sky-600" },
    { status: "Approved", count: 198, color: "bg-emerald-600" },
    { status: "Waitlisted", count: 100, color: "bg-amber-500" },
    { status: "Rejected", count: 1224, color: "bg-rose-500" }
  ];

  const total = items.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div>
      {/* Multi-segment bar */}
      <div className="h-3.5 rounded-full overflow-hidden flex w-full bg-slate-100 border border-slate-200/60 mb-4 shadow-2xs">
        {items.map((it) => (
          <div
            key={it.status}
            className={`${it.color} transition-all duration-300`}
            style={{ width: `${(it.count / total) * 100}%` }}
            title={`${it.status}: ${it.count}`}
          />
        ))}
      </div>

      {/* Legend list */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
        {items.map((it) => (
          <div key={it.status} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200/60">
            <span className={`w-2.5 h-2.5 rounded-full ${it.color} flex-shrink-0`} />
            <div className="flex flex-col min-w-0">
              <span className="text-slate-600 text-[10px] font-semibold uppercase tracking-wider truncate">{it.status}</span>
              <span className="font-bold text-slate-900 font-mono text-xs">
                {it.count.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const TimelineVolumeChart: React.FC = () => {
  const weeks = [
    { week: "Week 1", count: 420 },
    { week: "Week 2", count: 890 },
    { week: "Week 3", count: 1650 },
    { week: "Week 4", count: 2840 },
    { week: "Week 5", count: 3120 },
    { week: "Week 6 (Peak)", count: 4200 },
    { week: "Current", count: 1024 }
  ];

  const max = 4200;

  return (
    <div className="h-44 flex items-end justify-between gap-2.5 pt-6">
      {weeks.map((w) => {
        const heightPct = (w.count / max) * 100;
        return (
          <div key={w.week} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
            <span className="text-[10px] font-mono font-bold text-slate-600 tabular-nums">{w.count}</span>
            <div
              className="w-full bg-navy-800 hover:bg-navy-900 rounded-t-sm transition-all duration-200 group-hover:shadow-xs"
              style={{ height: `${heightPct}%` }}
            />
            <span className="text-[10px] font-medium text-slate-500 truncate text-center block w-full">
              {w.week}
            </span>
          </div>
        );
      })}
    </div>
  );
};
