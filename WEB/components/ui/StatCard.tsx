import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  highlightColor?: "blue" | "indigo" | "emerald" | "amber" | "rose" | "purple";
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  highlightColor = "blue",
  onClick
}) => {
  const barColors = {
    blue: "before:bg-blue-600",
    indigo: "before:bg-indigo-600",
    emerald: "before:bg-emerald-600",
    amber: "before:bg-amber-500",
    rose: "before:bg-rose-500",
    purple: "before:bg-purple-600"
  }[highlightColor];

  const iconColors = {
    blue: "bg-blue-50 text-blue-700 border-blue-200/80",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    amber: "bg-amber-50 text-amber-800 border-amber-200/80",
    rose: "bg-rose-50 text-rose-700 border-rose-200/80",
    purple: "bg-purple-50 text-purple-700 border-purple-200/80"
  }[highlightColor];

  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3.5px] ${barColors} ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">
            {title}
          </p>
          <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1.5 tracking-tight font-mono tabular-nums leading-tight">
            {value}
          </h4>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-1 truncate">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1.5 mt-2.5">
              <span
                className={`inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  trend.isPositive
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-rose-50 text-rose-700 border border-rose-200"
                }`}
              >
                {trend.isPositive ? "↑" : "↓"} {trend.value}
              </span>
              <span className="text-[10.5px] text-slate-400">vs target</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 shadow-2xs ${iconColors}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};
