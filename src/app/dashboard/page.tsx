"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function DashboardOverview() {
const [userName, setUserName] = useState("");

useEffect(() => {
  supabase.auth.getUser().then(({ data: { user } }) => {
    if (user) {
      setUserName(user.user_metadata?.full_name || user.email?.split("@")[0] || "Student");
    }
  });
}, []);

const quickLinks = [
  {
    href: "/dashboard/documents",
    icon: "📋",
    title: "Upload Documents",
    desc: "Passport, diploma, transcripts, medical exam",
    color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    href: "/dashboard/status",
    icon: "📊",
    title: "Application Status",
    desc: "Track your application progress in real time",
    color: "bg-green-50 border-green-200 hover:bg-green-100",
    iconBg: "bg-green-100",
  },
  {
    href: "/",
    icon: "🎯",
    title: "Re-run Eligibility Check",
    desc: "Update your profile and see new matches",
    color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
    iconBg: "bg-purple-100",
  },
];

return (
  <div>
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome back, {userName} 👋
      </h1>
      <p className="text-gray-500 mt-1">
        Here&apos;s an overview of your application progress.
      </p>
    </div>

    {/* Status banner */}
    <div className="bg-gradient-to-r from-[#1a3a6b] to-[#2a5298] rounded-2xl p-6 text-white mb-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-blue-200 text-sm font-medium mb-1">Application Status</p>
          <p className="text-2xl font-bold">Documents Pending</p>
          <p className="text-blue-200 text-sm mt-1">
            Upload your required documents to proceed
          </p>
        </div>
        <div className="text-5xl opacity-80">📝</div>
      </div>
      <div className="mt-4 bg-white/20 rounded-full h-2">
        <div className="bg-white rounded-full h-2 w-1/4 transition-all" />
      </div>
      <p className="text-blue-200 text-xs mt-1">25% complete</p>
    </div>

    {/* Quick links */}
    <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {quickLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`border-2 rounded-xl p-5 transition-all ${link.color}`}
        >
          <div className={`w-10 h-10 rounded-lg ${link.iconBg} flex items-center justify-center text-xl mb-3`}>
            {link.icon}
          </div>
          <h3 className="font-bold text-gray-900 mb-1">{link.title}</h3>
          <p className="text-sm text-gray-600">{link.desc}</p>
        </Link>
      ))}
    </div>

    {/* Required docs checklist */}
    <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Required Documents Checklist</h2>
      <div className="space-y-3">
        {[
          { label: "Valid Passport (copy)", required: true },
          { label: "High School / University Diploma", required: true },
          { label: "Academic Transcripts", required: true },
          { label: "Physical Examination Form", required: true },
          { label: "Personal Statement", required: false },
          { label: "Recommendation Letters (2x)", required: false },
        ].map((doc) => (
          <div key={doc.label} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
            <div className="w-5 h-5 rounded border-2 border-gray-300 flex-shrink-0" />
            <span className="text-sm text-gray-700 flex-1">{doc.label}</span>
            {doc.required && (
              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                Required
              </span>
            )}
          </div>
        ))}
      </div>
      <Link
        href="/dashboard/documents"
        className="mt-4 inline-block bg-[#1a3a6b] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#15305a] transition-all"
      >
        Upload Documents →
      </Link>
    </div>
  </div>
);
}