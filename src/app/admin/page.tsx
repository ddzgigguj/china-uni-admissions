"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type AppStatus = "pending" | "reviewing" | "approved" | "rejected";

interface Applicant {
id: string;
email: string;
full_name: string;
created_at: string;
status: AppStatus;
docs_uploaded: number;
}

const STATUS_OPTIONS: AppStatus[] = ["pending", "reviewing", "approved", "rejected"];

const STATUS_STYLES: Record<AppStatus, { badge: string; label: string }> = {
pending: { badge: "bg-gray-100 text-gray-600", label: "Pending" },
reviewing: { badge: "bg-yellow-100 text-yellow-700", label: "Reviewing" },
approved: { badge: "bg-green-100 text-green-700", label: "Approved" },
rejected: { badge: "bg-red-100 text-red-700", label: "Rejected" },
};

// Mock data — replace with real Supabase queries once DB is set up
const MOCK_APPLICANTS: Applicant[] = [
{ id: "1", email: "ali.hassan@gmail.com", full_name: "Ali Hassan", created_at: "2024-01-15", status: "reviewing", docs_uploaded: 4 },
{ id: "2", email: "maria.garcia@outlook.com", full_name: "Maria Garcia", created_at: "2024-01-18", status: "pending", docs_uploaded: 2 },
{ id: "3", email: "nguyen.van@yahoo.com", full_name: "Nguyen Van Minh", created_at: "2024-01-20", status: "approved", docs_uploaded: 6 },
{ id: "4", email: "fatima.al@hotmail.com", full_name: "Fatima Al-Rashid", created_at: "2024-01-22", status: "pending", docs_uploaded: 1 },
{ id: "5", email: "john.smith@gmail.com", full_name: "John Smith", created_at: "2024-01-25", status: "rejected", docs_uploaded: 3 },
{ id: "6", email: "priya.sharma@gmail.com", full_name: "Priya Sharma", created_at: "2024-01-28", status: "reviewing", docs_uploaded: 5 },
];

export default function AdminPage() {
const [applicants, setApplicants] = useState<Applicant[]>(MOCK_APPLICANTS);
const [filterStatus, setFilterStatus] = useState<AppStatus | "all">("all");
const [search, setSearch] = useState("");
const [isAdmin, setIsAdmin] = useState(false);
const [loading, setLoading] = useState(true);

useEffect(() => {
  // In production: check if user has admin role in Supabase
  supabase.auth.getUser().then(({ data: { user } }) => {
    if (user) {
      // For demo: any logged-in user can access admin
      setIsAdmin(true);
    }
    setLoading(false);
  });
}, []);

const updateStatus = (id: string, newStatus: AppStatus) => {
  setApplicants((prev) =>
    prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
  );
};

const downloadDocs = (applicant: Applicant) => {
  // In production: generate signed ZIP URL from Supabase Storage
  alert(`Downloading documents for ${applicant.full_name}...

(In production, this triggers a ZIP download from Supabase Storage)`);
};

const filtered = applicants.filter((a) => {
  const matchesStatus = filterStatus === "all" || a.status === filterStatus;
  const matchesSearch =
    a.full_name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase());
  return matchesStatus && matchesSearch;
});

const counts = {
  all: applicants.length,
  pending: applicants.filter((a) => a.status === "pending").length,
  reviewing: applicants.filter((a) => a.status === "reviewing").length,
  approved: applicants.filter((a) => a.status === "approved").length,
  rejected: applicants.filter((a) => a.status === "rejected").length,
};

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-[#1a3a6b] border-t-transparent rounded-full" />
    </div>
  );
}

if (!isAdmin) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-4xl mb-4">🔒</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-500">You don&apos;t have permission to view this page.</p>
      </div>
    </div>
  );
}

return (
  <div className="min-h-screen bg-gray-50">
    {/* Admin nav */}
    <nav className="bg-[#1a3a6b] text-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🎓</span>
        <span className="font-bold text-lg">ChinaUni</span>
        <span className="text-blue-300 text-sm">· Admin Panel</span>
      </div>
      <span className="text-blue-200 text-sm">Admin Dashboard</span>
    </nav>

    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Applicant Management</h1>
        <p className="text-gray-500 mt-1">Review applications, update statuses, and download documents.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {(["all", ...STATUS_OPTIONS] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`rounded-xl p-4 text-center border-2 transition-all ${
              filterStatus === s
                ? "border-[#1a3a6b] bg-blue-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <p className="text-2xl font-bold text-gray-900">{counts[s]}</p>
            <p className="text-xs text-gray-500 capitalize mt-0.5">{s === "all" ? "Total" : s}</p>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a6b] focus:border-transparent"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Applicant</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Applied</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Docs</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Status</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400">
                    No applicants found
                  </td>
                </tr>
              ) : (
                filtered.map((applicant) => {
                  const style = STATUS_STYLES[applicant.status];
                  return (
                    <tr key={applicant.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{applicant.full_name}</p>
                        <p className="text-gray-400 text-xs">{applicant.email}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{applicant.created_at}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#1a3a6b] rounded-full"
                              style={{ width: `${(applicant.docs_uploaded / 6) * 100}%` }}
                            />
                          </div>
                          <span className="text-gray-600 text-xs">{applicant.docs_uploaded}/6</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={applicant.status}
                          onChange={(e) => updateStatus(applicant.id, e.target.value as AppStatus)}
                          className={`text-xs font-semibold px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1a3a6b] ${style.badge}`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s} className="bg-white text-gray-800">
                              {STATUS_STYLES[s].label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => downloadDocs(applicant)}
                          className="flex items-center gap-1.5 text-xs font-semibold text-[#1a3a6b] hover:text-[#15305a] bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-all"
                        >
                          📦 Download Docs
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
}