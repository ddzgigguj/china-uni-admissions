"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

type DocType =
| "passport"
| "diploma"
| "transcripts"
| "medical"
| "personal_statement"
| "recommendation";

interface DocStatus {
type: DocType;
label: string;
required: boolean;
icon: string;
fileName?: string;
status: "pending" | "uploaded" | "approved" | "rejected";
uploadedAt?: string;
}

const INITIAL_DOCS: DocStatus[] = [
{ type: "passport", label: "Passport Copy", required: true, icon: "🛂", status: "pending" },
{ type: "diploma", label: "Diploma / Degree Certificate", required: true, icon: "🎓", status: "pending" },
{ type: "transcripts", label: "Academic Transcripts", required: true, icon: "📄", status: "pending" },
{ type: "medical", label: "Physical Examination Form", required: true, icon: "🏥", status: "pending" },
{ type: "personal_statement", label: "Personal Statement", required: false, icon: "✍️", status: "pending" },
{ type: "recommendation", label: "Recommendation Letters", required: false, icon: "📝", status: "pending" },
];

const STATUS_CONFIG = {
pending: { label: "Not Uploaded", color: "text-gray-400", bg: "bg-gray-100", border: "border-gray-200" },
uploaded: { label: "Under Review", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" },
approved: { label: "Approved ✓", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
rejected: { label: "Rejected — Re-upload", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
};

export default function DocumentsPage() {
const [docs, setDocs] = useState<DocStatus[]>(INITIAL_DOCS);
const [uploading, setUploading] = useState<DocType | null>(null);
const [userId, setUserId] = useState<string>("");
const fileInputRef = useRef<HTMLInputElement>(null);
const [activeDocType, setActiveDocType] = useState<DocType | null>(null);

useEffect(() => {
  supabase.auth.getUser().then(({ data: { user } }) => {
    if (user) setUserId(user.id);
  });
}, []);

const triggerUpload = (docType: DocType) => {
  setActiveDocType(docType);
  fileInputRef.current?.click();
};

const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file || !activeDocType || !userId) return;

  setUploading(activeDocType);

  const filePath = `${userId}/${activeDocType}/${file.name}`;
  const { error } = await supabase.storage
    .from("documents")
    .upload(filePath, file, { upsert: true });

  if (!error) {
    setDocs((prev) =>
      prev.map((d) =>
        d.type === activeDocType
          ? {
              ...d,
              status: "uploaded",
              fileName: file.name,
              uploadedAt: new Date().toLocaleDateString(),
            }
          : d
      )
    );
  }

  setUploading(null);
  setActiveDocType(null);
  // Reset input
  if (fileInputRef.current) fileInputRef.current.value = "";
};

const uploadedCount = docs.filter((d) => d.status !== "pending").length;
const requiredCount = docs.filter((d) => d.required).length;
const requiredUploaded = docs.filter((d) => d.required && d.status !== "pending").length;

return (
  <div>
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
      <p className="text-gray-500 mt-1">
        Upload your application documents. Accepted formats: PDF, JPG, PNG (max 10MB each).
      </p>
    </div>

    {/* Progress */}
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-semibold text-gray-800">Upload Progress</p>
          <p className="text-sm text-gray-500">
            {requiredUploaded}/{requiredCount} required documents uploaded
          </p>
        </div>
        <span className="text-2xl font-bold text-[#1a3a6b]">
          {Math.round((uploadedCount / docs.length) * 100)}%
        </span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#1a3a6b] to-[#2a5298] rounded-full transition-all duration-500"
          style={{ width: `${(uploadedCount / docs.length) * 100}%` }}
        />
      </div>
    </div>

    {/* Hidden file input */}
    <input
      ref={fileInputRef}
      type="file"
      accept=".pdf,.jpg,.jpeg,.png"
      className="hidden"
      onChange={handleFileChange}
    />

    {/* Document list */}
    <div className="space-y-3">
      {docs.map((doc) => {
        const config = STATUS_CONFIG[doc.status];
        const isUploading = uploading === doc.type;

        return (
          <div
            key={doc.type}
            className={`bg-white rounded-xl border-2 ${config.border} p-5 flex items-center gap-4 transition-all`}
          >
            <div className="text-3xl flex-shrink-0">{doc.icon}</div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-semibold text-gray-900 text-sm">{doc.label}</p>
                {doc.required && (
                  <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-medium">
                    Required
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium ${config.color}`}>
                  {config.label}
                </span>
                {doc.fileName && (
                  <span className="text-xs text-gray-400 truncate">· {doc.fileName}</span>
                )}
                {doc.uploadedAt && (
                  <span className="text-xs text-gray-400">· {doc.uploadedAt}</span>
                )}
              </div>
            </div>

            <button
              onClick={() => triggerUpload(doc.type)}
              disabled={isUploading || doc.status === "approved"}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                doc.status === "approved"
                  ? "bg-green-100 text-green-600 cursor-default"
                  : doc.status === "uploaded"
                  ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  : "bg-[#1a3a6b] text-white hover:bg-[#15305a]"
              } disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {isUploading ? (
                <span className="flex items-center gap-1.5">
                  <span className="animate-spin inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full" />
                  Uploading...
                </span>
              ) : doc.status === "approved" ? (
                "Approved"
              ) : doc.status === "uploaded" ? (
                "Re-upload"
              ) : (
                "Upload"
              )}
            </button>
          </div>
        );
      })}
    </div>

    {/* Info box */}
    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
      <p className="font-semibold mb-1">📌 Document Guidelines</p>
      <ul className="space-y-1 text-xs text-blue-600">
        <li>• All documents must be clear, legible scans or photos</li>
        <li>• Passport must be valid for at least 6 months beyond your intended study period</li>
        <li>• Transcripts and diplomas must be officially certified or notarized</li>
        <li>• Medical exam must be completed within 6 months of application</li>
      </ul>
    </div>
  </div>
);
}