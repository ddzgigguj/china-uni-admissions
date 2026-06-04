"use client";

import { UseFormReturn } from "react-hook-form";
import { CalculatorFormData, EducationLevel } from "@/types";

interface Props {
form: UseFormReturn<CalculatorFormData>;
}

const levels: { value: EducationLevel; label: string; icon: string; desc: string }[] = [
{
  value: "Bachelor",
  label: "Bachelor's Degree",
  icon: "🎓",
  desc: "Undergraduate program, typically 4 years",
},
{
  value: "Master",
  label: "Master's Degree",
  icon: "📖",
  desc: "Postgraduate program, typically 2-3 years",
},
{
  value: "PhD",
  label: "PhD / Doctorate",
  icon: "🔬",
  desc: "Doctoral research program, typically 3-5 years",
},
];

export default function StepEducation({ form }: Props) {
const selected = form.watch("educationLevel");

return (
  <div className="space-y-3">
    {levels.map((level) => (
      <button
        key={level.value}
        type="button"
        onClick={() => form.setValue("educationLevel", level.value)}
        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
          selected === level.value
            ? "border-[#1a3a6b] bg-blue-50 shadow-sm"
            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
        }`}
      >
        <span className="text-3xl">{level.icon}</span>
        <div>
          <p
            className={`font-semibold text-sm ${
              selected === level.value ? "text-[#1a3a6b]" : "text-gray-800"
            }`}
          >
            {level.label}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">{level.desc}</p>
        </div>
        {selected === level.value && (
          <span className="ml-auto text-[#1a3a6b] text-lg">✓</span>
        )}
      </button>
    ))}
  </div>
);
}