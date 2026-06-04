"use client";

import { useState } from "react";
import { UniversityMatch, CalculatorFormData, MatchProbability } from "@/types";
import UniversityCard from "./UniversityCard";

interface Props {
results: UniversityMatch[];
formData: CalculatorFormData;
onReset: () => void;
}

type Filter = "All" | MatchProbability;

export default function ResultsPanel({ results, formData, onReset }: Props) {
const [filter, setFilter] = useState<Filter>("All");
const [showAll, setShowAll] = useState(false);

const highCount = results.filter((r) => r.matchProbability === "High").length;
const medCount = results.filter((r) => r.matchProbability === "Medium").length;
const lowCount = results.filter((r) => r.matchProbability === "Low").length;

const filtered =
  filter === "All" ? results : results.filter((r) => r.matchProbability === filter);

const displayed = showAll ? filtered : filtered.slice(0, 6);

return (
  <div className="w-full max-w-4xl mx-auto">
    {/* Header */}
    <div className="bg-gradient-to-r from-[#1a3a6b] to-[#2a5298] rounded-2xl p-6 mb-6 text-white">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Your Results</h2>
          <p className="text-blue-200 text-sm">
            Based on your profile — {formData.educationLevel} applicant, GPA {formData.gpa.toFixed(1)}/{formData.gpaScale.toFixed(1)}, age {formData.age}
          </p>
        </div>
        <button
          onClick={onReset}
          className="text-blue-200 hover:text-white text-sm underline underline-offset-2 transition-colors flex-shrink-0 ml-4"
        >
          ← Start Over
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3 mt-5">
        <div className="bg-white/10 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-green-300">{highCount}</p>
          <p className="text-xs text-blue-200 mt-0.5">High Match</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-yellow-300">{medCount}</p>
          <p className="text-xs text-blue-200 mt-0.5">Medium Match</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-red-300">{lowCount}</p>
          <p className="text-xs text-blue-200 mt-0.5">Low Match</p>
        </div>
      </div>
    </div>

    {/* Filter tabs */}
    <div className="flex gap-2 mb-5 flex-wrap">
      {(["All", "High", "Medium", "Low"] as Filter[]).map((f) => (
        <button
          key={f}
          onClick={() => { setFilter(f); setShowAll(false); }}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
            filter === f
              ? f === "High"
                ? "bg-green-500 border-green-500 text-white"
                : f === "Medium"
                ? "bg-yellow-400 border-yellow-400 text-white"
                : f === "Low"
                ? "bg-red-500 border-red-500 text-white"
                : "bg-[#1a3a6b] border-[#1a3a6b] text-white"
              : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
          }`}
        >
          {f}
          {f !== "All" && (
            <span className="ml-1.5 opacity-80">
              ({f === "High" ? highCount : f === "Medium" ? medCount : lowCount})
            </span>
          )}
        </button>
      ))}
    </div>

    {/* Results grid */}
    {filtered.length === 0 ? (
      <div className="text-center py-12 text-gray-400">
        <p className="text-4xl mb-3">🔍</p>
        <p className="font-medium">No universities in this category</p>
        <p className="text-sm mt-1">Try a different filter or adjust your profile</p>
      </div>
    ) : (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayed.map((match) => (
            <UniversityCard key={match.university.id} match={match} />
          ))}
        </div>

        {filtered.length > 6 && !showAll && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-2.5 rounded-lg border-2 border-[#1a3a6b] text-[#1a3a6b] font-semibold text-sm hover:bg-blue-50 transition-all"
            >
              Show All {filtered.length} Universities
            </button>
          </div>
        )}
      </>
    )}

    {/* CTA */}
    <div className="mt-8 bg-gradient-to-r from-[#c0392b] to-[#e74c3c] rounded-2xl p-6 text-white text-center">
      <h3 className="text-xl font-bold mb-2">Ready to Apply?</h3>
      <p className="text-red-100 text-sm mb-4">
        Create an account to track your application, upload documents, and get expert guidance.
      </p>
      <a
        href="/register"
        className="inline-block bg-white text-[#c0392b] font-bold px-8 py-3 rounded-xl hover:bg-red-50 transition-all shadow-lg"
      >
        Start Your Application →
      </a>
    </div>
  </div>
);
}