"use client";

import React, { useState } from "react";
import { DocumentItem } from "../../types/scholarship";
import { DocumentStatusBadge } from "../ui/StatusBadge";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Loader2
} from "lucide-react";

interface DocumentUploaderProps {
  document: DocumentItem;
  onUploadSuccess: (docId: string, fileName: string, fileSize: string) => void;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  document,
  onUploadSuccess
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
            onUploadSuccess(document.id, file.name, sizeStr);
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const isUploaded = document.status === "Uploaded" || document.status === "Verified";

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 transition hover:border-slate-300 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Document Info */}
        <div className="flex items-start gap-3.5">
          <div
            className={`p-2.5 rounded-lg border flex-shrink-0 ${
              isUploaded
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-slate-50 text-slate-500 border-slate-200"
            }`}
          >
            <FileText className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">{document.name}</h4>
              {document.required && (
                <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200/80 px-1.5 py-0.2 rounded">
                  Mandatory
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Format: {document.type} • Allowed: PDF, JPG, PNG (Max 5MB)
            </p>

            {document.fileName && (
              <div className="flex flex-wrap items-center gap-2.5 mt-2 text-xs text-slate-600">
                <span className="font-semibold text-slate-800 font-mono">{document.fileName}</span>
                {document.fileSize && <span className="text-slate-400 font-mono">({document.fileSize})</span>}
                {document.uploadDate && (
                  <span className="text-[11px] text-slate-500">• Uploaded: {document.uploadDate}</span>
                )}
              </div>
            )}

            {document.remarks && (
              <div className="mt-2 text-xs text-amber-900 bg-amber-50 p-2.5 rounded-lg border border-amber-200 flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>{document.remarks}</span>
              </div>
            )}
          </div>
        </div>

        {/* Upload Controls & Status Badge */}
        <div className="flex items-center gap-3 self-end sm:self-center">
          <DocumentStatusBadge status={document.status} />

          {isUploading ? (
            <div className="w-28 flex flex-col gap-1">
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                <span>Uploading...</span>
                <span className="font-mono">{uploadProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-navy-900 transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : isUploaded ? (
            <label className="cursor-pointer text-xs font-semibold text-navy-800 hover:text-navy-900 bg-navy-50 hover:bg-navy-100 border border-navy-200 px-3 py-1.5 rounded-lg transition">
              Replace File
              <input
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleSimulatedUpload}
              />
            </label>
          ) : (
            <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold text-white bg-navy-900 hover:bg-navy-800 border border-navy-950 px-3.5 py-1.5 rounded-lg shadow-2xs transition active:scale-95">
              <UploadCloud className="w-3.5 h-3.5 text-amber-400" />
              <span>Upload Document</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleSimulatedUpload}
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
};
