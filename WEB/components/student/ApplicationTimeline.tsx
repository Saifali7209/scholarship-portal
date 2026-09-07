import React from "react";
import { CheckCircle2, Clock, Circle } from "lucide-react";
import { ApplicationStatus } from "../../types/scholarship";

interface TimelineStep {
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
}

export const ApplicationTimeline: React.FC<{
  steps: TimelineStep[];
  currentStatus: ApplicationStatus;
}> = ({ steps }) => {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {steps.map((step, stepIdx) => {
          const isLast = stepIdx === steps.length - 1;

          return (
            <li key={step.title}>
              <div className="relative pb-8">
                {!isLast && (
                  <span
                    className={`absolute left-4 top-4 -ml-px h-full w-0.5 ${
                      step.completed ? "bg-emerald-500" : "bg-slate-200"
                    }`}
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex items-start space-x-3.5">
                  {/* Step icon */}
                  <div>
                    {step.completed ? (
                      <div className="h-8 w-8 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center ring-4 ring-white text-emerald-700 shadow-2xs">
                        <CheckCircle2 className="w-4.5 h-4.5" />
                      </div>
                    ) : step.current ? (
                      <div className="h-8 w-8 rounded-full bg-navy-50 border border-navy-300 flex items-center justify-center ring-4 ring-white text-navy-800 animate-pulse shadow-2xs">
                        <Clock className="w-4.5 h-4.5" />
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center ring-4 ring-white text-slate-400">
                        <Circle className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="min-w-0 flex-1 pt-1 flex justify-between space-x-4">
                    <div>
                      <p
                        className={`text-xs font-bold ${
                          step.current
                            ? "text-navy-900 font-extrabold"
                            : step.completed
                            ? "text-slate-900"
                            : "text-slate-500"
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{step.description}</p>
                    </div>
                    <div className="text-right text-[11px] whitespace-nowrap text-slate-400 font-mono">
                      <time>{step.timestamp}</time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
