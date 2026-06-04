"use client";

import { UseFormReturn } from "react-hook-form";
import { CalculatorFormData } from "@/types";

interface Props {
form: UseFormReturn<CalculatorFormData>;
}

export default function StepGPA({ form }: Props) {
const gpa = form.watch("gpa");
const scale = form.watch("gpaScale");

const maxGPA = scale === 4.0 ? 4.0 : 5.0;
const percentage = (gpa / maxGPA) * 100;

const getGPALabel = () => {
  const ratio = gpa / maxGPA;
  if (ratio >= 0.9) return { label: "Excellent", color: "text-green-600" };
  if (ratio >= 0.75) return { label: "Good", color: "text-blue-600" };
  if (ratio >= 0.6) return { label: "Average", color: "text-yellow-600" };
  return { label: "Below Average", color: "text-red-500" };
};

const { label, color } = getGPALabel();

return (
  <div className="space-y-6">
    {/* Scale selector */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        GPA Scale
      </label>
      <div className="flex gap-3">
        {([4.0, 5.0] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              form.setValue("gpaScale", s);
              // Clamp GPA to new max
              if (s === 4.0 && gpa > 4.0) form.setValue("gpa", 4.0);
            }}
            className={`flex-1 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all ${
              scale === s
                ? "border-[#1a3a6b] bg-blue-50 text-[#1a3a6b]"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            {s.toFixed(1)} Scale
          </button>
        ))}
      </div>
    </div>

    {/* GPA Slider */}
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700">Your GPA</label>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-[#1a3a6b]">
            {gpa.toFixed(1)}
          </span>
          <span className="text-gray-400 text-sm">/ {maxGPA.toFixed(1)}</span>
          <span className={`text-xs font-semibold ${color} ml-1`}>{label}</span>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={maxGPA}
        step={0.1}
        value={gpa}
        onChange={(e) => form.setValue("gpa", parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1a3a6b]"
      />

      {/* Progress bar */}
      <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${percentage}%`,
            background:
              percentage >= 90
                ? "#22c55e"
                : percentage >= 75
                ? "#3b82f6"
                : percentage >= 60
                ? "#eab308"
                : "#ef4444",
          }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>0.0</span>
        <span>{(maxGPA / 2).toFixed(1)}</span>
        <span>{maxGPA.toFixed(1)}</span>
      </div>
    </div>

    {/* Manual input */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Or type your GPA directly
      </label>
      <input
        type="number"
        min={0}
        max={maxGPA}
        step={0.01}
        value={gpa}
        onChange={(e) => {
          const val = Math.min(parseFloat(e.target.value) || 0, maxGPA);
          form.setValue("gpa", val);
        }}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a6b] focus:border-transparent"
      />
    </div>
  </div>
);
}