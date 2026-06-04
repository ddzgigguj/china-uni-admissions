"use client";

import { UseFormReturn } from "react-hook-form";
import { CalculatorFormData } from "@/types";

interface Props {
form: UseFormReturn<CalculatorFormData>;
}

const hskLevels = [
{ value: 1, label: "HSK 1", desc: "Basic — ~150 words" },
{ value: 2, label: "HSK 2", desc: "Elementary — ~300 words" },
{ value: 3, label: "HSK 3", desc: "Intermediate — ~600 words" },
{ value: 4, label: "HSK 4", desc: "Upper-Intermediate — ~1,200 words" },
{ value: 5, label: "HSK 5", desc: "Advanced — ~2,500 words" },
{ value: 6, label: "HSK 6", desc: "Proficient — ~5,000+ words" },
];

export default function StepLanguage({ form }: Props) {
const langType = form.watch("languageType");
const hskLevel = form.watch("hskLevel");
const ielts = form.watch("ieltsScore");
const toefl = form.watch("toeflScore");

return (
  <div className="space-y-5">
    {/* Language type toggle */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Which language test have you taken?
      </label>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => form.setValue("languageType", "chinese")}
          className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
            langType === "chinese"
              ? "border-[#c0392b] bg-red-50 text-[#c0392b]"
              : "border-gray-200 text-gray-600 hover:border-gray-300"
          }`}
        >
          🇨🇳 Chinese (HSK)
        </button>
        <button
          type="button"
          onClick={() => form.setValue("languageType", "english")}
          className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
            langType === "english"
              ? "border-[#1a3a6b] bg-blue-50 text-[#1a3a6b]"
              : "border-gray-200 text-gray-600 hover:border-gray-300"
          }`}
        >
          🇬🇧 English (IELTS/TOEFL)
        </button>
      </div>
    </div>

    {/* HSK Level */}
    {langType === "chinese" && (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select your HSK level
        </label>
        <div className="grid grid-cols-2 gap-2">
          {hskLevels.map((level) => (
            <button
              key={level.value}
              type="button"
              onClick={() => form.setValue("hskLevel", level.value)}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                hskLevel === level.value
                  ? "border-[#c0392b] bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <p
                className={`font-semibold text-sm ${
                  hskLevel === level.value ? "text-[#c0392b]" : "text-gray-800"
                }`}
              >
                {level.label}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{level.desc}</p>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">
          No HSK? Select the level you&apos;re preparing for or your estimated level.
        </p>
      </div>
    )}

    {/* English scores */}
    {langType === "english" && (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            IELTS Score (0 if not taken)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={9}
              step={0.5}
              value={ielts}
              onChange={(e) =>
                form.setValue("ieltsScore", parseFloat(e.target.value))
              }
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1a3a6b]"
            />
            <span className="w-12 text-center font-bold text-[#1a3a6b] text-lg">
              {ielts === 0 ? "N/A" : ielts.toFixed(1)}
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0 (N/A)</span>
            <span>4.5</span>
            <span>9.0</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            TOEFL Score (0 if not taken)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={120}
              step={1}
              value={toefl}
              onChange={(e) =>
                form.setValue("toeflScore", parseInt(e.target.value))
              }
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1a3a6b]"
            />
            <span className="w-12 text-center font-bold text-[#1a3a6b] text-lg">
              {toefl === 0 ? "N/A" : toefl}
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0 (N/A)</span>
            <span>60</span>
            <span>120</span>
          </div>
        </div>

        <p className="text-xs text-gray-400 bg-blue-50 p-3 rounded-lg">
          💡 Set both to 0 if you haven&apos;t taken any English test yet. We&apos;ll still show you options.
        </p>
      </div>
    )}
  </div>
);
}