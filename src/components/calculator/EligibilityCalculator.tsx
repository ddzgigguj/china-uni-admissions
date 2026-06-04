"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalculatorFormData, UniversityMatch } from "@/types";
import { getUniversityMatches } from "@/lib/calculator";
import universitiesData from "@/data/universities.json";
import StepEducation from "./steps/StepEducation";
import StepGPA from "./steps/StepGPA";
import StepLanguage from "./steps/StepLanguage";
import StepPersonal from "./steps/StepPersonal";
import ResultsPanel from "./ResultsPanel";
import ProgressBar from "./ProgressBar";

const schema = z.object({
educationLevel: z.enum(["Bachelor", "Master", "PhD"]),
gpa: z.number().min(0).max(5),
gpaScale: z.union([z.literal(4.0), z.literal(5.0)]),
languageType: z.enum(["chinese", "english"]),
hskLevel: z.number().min(0).max(6),
ieltsScore: z.number().min(0).max(9),
toeflScore: z.number().min(0).max(120),
age: z.number().min(16).max(60),
nationality: z.string().min(1),
budgetUSD: z.number().min(0),
});

const TOTAL_STEPS = 4;

export default function EligibilityCalculator() {
const [currentStep, setCurrentStep] = useState(1);
const [results, setResults] = useState<UniversityMatch[] | null>(null);
const [isCalculating, setIsCalculating] = useState(false);

const form = useForm<CalculatorFormData>({
  resolver: zodResolver(schema),
  defaultValues: {
    educationLevel: "Bachelor",
    gpa: 3.0,
    gpaScale: 4.0,
    languageType: "english",
    hskLevel: 0,
    ieltsScore: 0,
    toeflScore: 0,
    age: 22,
    nationality: "",
    budgetUSD: 5000,
  },
  mode: "onChange",
});

const nextStep = async () => {
  let fieldsToValidate: (keyof CalculatorFormData)[] = [];

  if (currentStep === 1) fieldsToValidate = ["educationLevel"];
  if (currentStep === 2) fieldsToValidate = ["gpa", "gpaScale"];
  if (currentStep === 3) fieldsToValidate = ["languageType"];
  if (currentStep === 4) fieldsToValidate = ["age", "nationality", "budgetUSD"];

  const valid = await form.trigger(fieldsToValidate);
  if (!valid) return;

  if (currentStep < TOTAL_STEPS) {
    setCurrentStep((s) => s + 1);
  } else {
    handleSubmit();
  }
};

const prevStep = () => {
  if (currentStep > 1) setCurrentStep((s) => s - 1);
};

const handleSubmit = () => {
  setIsCalculating(true);
  const data = form.getValues();

  // Simulate a brief calculation delay for UX
  setTimeout(() => {
    const matches = getUniversityMatches(data, universitiesData as any);
    setResults(matches);
    setIsCalculating(false);
  }, 800);
};

const resetCalculator = () => {
  setResults(null);
  setCurrentStep(1);
  form.reset();
};

if (results !== null) {
  return (
    <ResultsPanel
      results={results}
      formData={form.getValues()}
      onReset={resetCalculator}
    />
  );
}

return (
  <div className="w-full max-w-2xl mx-auto">
    <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-[#1a3a6b] to-[#2a5298] px-6 py-5">
        <h2 className="text-white text-xl font-bold">
          {currentStep === 1 && "What level are you applying for?"}
          {currentStep === 2 && "What is your academic GPA?"}
          {currentStep === 3 && "What is your language proficiency?"}
          {currentStep === 4 && "A few more details"}
        </h2>
        <p className="text-blue-200 text-sm mt-1">
          Step {currentStep} of {TOTAL_STEPS}
        </p>
      </div>

      <div className="p-6 md:p-8">
        {currentStep === 1 && <StepEducation form={form} />}
        {currentStep === 2 && <StepGPA form={form} />}
        {currentStep === 3 && <StepLanguage form={form} />}
        {currentStep === 4 && <StepPersonal form={form} />}
      </div>

      <div className="px-6 pb-6 md:px-8 md:pb-8 flex justify-between items-center">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 font-medium text-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          ← Back
        </button>

        <button
          onClick={nextStep}
          disabled={isCalculating}
          className="px-6 py-2.5 rounded-lg bg-[#c0392b] hover:bg-[#a93226] text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isCalculating ? (
            <>
              <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              Calculating...
            </>
          ) : currentStep === TOTAL_STEPS ? (
            "Check My Eligibility →"
          ) : (
            "Next Step →"
          )}
        </button>
      </div>
    </div>
  </div>
);
}