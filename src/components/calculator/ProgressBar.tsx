"use client";

interface Props {
currentStep: number;
totalSteps: number;
}

const STEP_LABELS = ["Education", "GPA", "Language", "Personal"];

export default function ProgressBar({ currentStep, totalSteps }: Props) {
return (
  <div className="mb-6">
    <div className="flex items-center justify-between mb-2">
      {STEP_LABELS.map((label, index) => {
        const stepNum = index + 1;
        const isCompleted = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <div key={label} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              {/* Connector line left */}
              {index > 0 && (
                <div
                  className={`flex-1 h-0.5 transition-all duration-500 ${
                    isCompleted || isActive ? "bg-[#1a3a6b]" : "bg-gray-200"
                  }`}
                />
              )}

              {/* Step circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0 ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isActive
                    ? "bg-[#1a3a6b] text-white ring-4 ring-blue-100"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {isCompleted ? "✓" : stepNum}
              </div>

              {/* Connector line right */}
              {index < totalSteps - 1 && (
                <div
                  className={`flex-1 h-0.5 transition-all duration-500 ${
                    isCompleted ? "bg-[#1a3a6b]" : "bg-gray-200"
                  }`}
                />
              )}
            </div>

            {/* Label */}
            <span
              className={`text-xs mt-1.5 font-medium transition-colors ${
                isActive
                  ? "text-[#1a3a6b]"
                  : isCompleted
                  ? "text-green-600"
                  : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);
}