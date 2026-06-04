"use client";

import { useState } from "react";
import { UniversityMatch, MatchProbability } from "@/types";

interface Props {
match: UniversityMatch;
}

const PROBABILITY_CONFIG: Record<
MatchProbability,
{ label: string; bg: string; text: string; bar: string; border: string }
> = {
High: {
  label: "High Match",
  bg: "bg-green-50",
  text: "text-green-700",
  bar: "bg-green-500",
  border: "border-green-200",
},
Medium: {
  label: "Medium Match",
  bg: "bg-yellow-50",
  text: "text-yellow-700",
  bar: "bg-yellow-400",
  border: "border-yellow-200",
},
Low: {
  label: "Low Match",
  bg: "bg-red-50",
  text: "text-red-700",
  bar: "bg-red-400",
  border: "border-red-200",
},
};

export default function UniversityCard({ match }: Props) {
const [expanded, setExpanded] = useState(false);
const { university, matchProbability, matchScore, reasons } = match;
const config = PROBABILITY_CONFIG[matchProbability];

return (
  <div
    className={`rounded-xl border-2 ${config.border} bg-white overflow-hidden transition-all duration-200 hover:shadow-md`}
  >
    {/* Header */}
    <div className={`${config.bg} px-4 py-3 flex items-center justify-between`}>
      <div className="flex items-center gap-2">
        <span className="text-2xl">{university.logo}</span>
        <div>
          <p className="font-bold text-gray-900 text-sm leading-tight">
            {university.name}
          </p>
          <p className="text-xs text-gray-500">
            {university.city}, {university.province} · Rank #{university.ranking}
          </p>
        </div>
      </div>
      <div className="text-right flex-shrink-0 ml-2">
        <span
          className={`text-xs font-bold px-2 py-1 rounded-full ${config.bg} ${config.text} border ${config.border}`}
        >
          {config.label}
        </span>
      </div>
    </div>

    {/* Score bar */}
    <div className="px-4 pt-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-500 font-medium">Match Score</span>
        <span className="text-sm font-bold text-gray-800">{matchScore}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${config.bar}`}
          style={{ width: `${matchScore}%` }}
        />
      </div>
    </div>

    {/* Key info */}
    <div className="px-4 py-3 grid grid-cols-2 gap-2 text-xs">
      <div className="bg-gray-50 rounded-lg p-2">
        <p className="text-gray-400 mb-0.5">Min GPA</p>
        <p className="font-semibold text-gray-800">{university.minGPA.toFixed(1)}/4.0</p>
      </div>
      <div className="bg-gray-50 rounded-lg p-2">
        <p className="text-gray-400 mb-0.5">Tuition/yr</p>
        <p className="font-semibold text-gray-800">
          ${Math.min(
            university.tuitionUSD.bachelor,
            university.tuitionUSD.master,
            university.tuitionUSD.phd || 99999
          ).toLocaleString()}+
        </p>
      </div>
      <div className="bg-gray-50 rounded-lg p-2">
        <p className="text-gray-400 mb-0.5">Language</p>
        <p className="font-semibold text-gray-800">
          {university.languageRequirements.chinese.label}
        </p>
      </div>
      <div className="bg-gray-50 rounded-lg p-2">
        <p className="text-gray-400 mb-0.5">Scholarship</p>
        <p className={`font-semibold ${university.scholarshipAvailable ? "text-green-600" : "text-gray-500"}`}>
          {university.scholarshipAvailable ? "✓ Available" : "Not offered"}
        </p>
      </div>
    </div>

    {/* Tags */}
    <div className="px-4 pb-2 flex flex-wrap gap-1">
      {university.tags.map((tag) => (
        <span
          key={tag}
          className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium"
        >
          {tag}
        </span>
      ))}
    </div>

    {/* Expand toggle */}
    <button
      onClick={() => setExpanded(!expanded)}
      className="w-full px-4 py-2 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100 flex items-center justify-center gap-1"
    >
      {expanded ? "Hide details ▲" : "Show match details ▼"}
    </button>

    {/* Expanded reasons */}
    {expanded && (
      <div className="px-4 pb-4 border-t border-gray-100 pt-3">
        <p className="text-xs font-semibold text-gray-600 mb-2">Why this score?</p>
        <ul className="space-y-1.5">
          {reasons.map((reason, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
              <span className="mt-0.5 flex-shrink-0">
                {reason.toLowerCase().includes("below") || reason.toLowerCase().includes("exceeds limit")
                  ? "⚠️"
                  : reason.toLowerCase().includes("exceeds") || reason.toLowerCase().includes("comfortably")
                  ? "✅"
                  : "ℹ️"}
              </span>
              {reason}
            </li>
          ))}
        </ul>
        <a
          href={university.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-xs text-[#1a3a6b] font-semibold hover:underline"
        >
          Visit official website →
        </a>
      </div>
    )}
  </div>
);
}