"use client";

import { UseFormReturn } from "react-hook-form";
import { CalculatorFormData } from "@/types";

interface Props {
form: UseFormReturn<CalculatorFormData>;
}

const NATIONALITIES = [
"Afghan", "Albanian", "Algerian", "American", "Angolan", "Argentine", "Armenian",
"Australian", "Austrian", "Azerbaijani", "Bahraini", "Bangladeshi", "Belarusian",
"Belgian", "Bolivian", "Bosnian", "Brazilian", "British", "Bulgarian", "Cambodian",
"Cameroonian", "Canadian", "Chilean", "Colombian", "Congolese", "Croatian", "Cuban",
"Czech", "Danish", "Dominican", "Dutch", "Ecuadorian", "Egyptian", "Emirati",
"Ethiopian", "Filipino", "Finnish", "French", "Georgian", "German", "Ghanaian",
"Greek", "Guatemalan", "Haitian", "Honduran", "Hungarian", "Indian", "Indonesian",
"Iranian", "Iraqi", "Irish", "Israeli", "Italian", "Ivorian", "Jamaican", "Japanese",
"Jordanian", "Kazakh", "Kenyan", "Korean", "Kuwaiti", "Kyrgyz", "Laotian", "Lebanese",
"Libyan", "Lithuanian", "Macedonian", "Malagasy", "Malaysian", "Malian", "Mauritanian",
"Mexican", "Moldovan", "Mongolian", "Moroccan", "Mozambican", "Myanmar", "Namibian",
"Nepalese", "New Zealander", "Nicaraguan", "Nigerian", "Norwegian", "Omani",
"Pakistani", "Palestinian", "Panamanian", "Paraguayan", "Peruvian", "Polish",
"Portuguese", "Qatari", "Romanian", "Russian", "Rwandan", "Saudi", "Senegalese",
"Serbian", "Sierra Leonean", "Singaporean", "Slovak", "Somali", "South African",
"Spanish", "Sri Lankan", "Sudanese", "Swedish", "Swiss", "Syrian", "Taiwanese",
"Tajik", "Tanzanian", "Thai", "Togolese", "Tunisian", "Turkish", "Turkmen",
"Ugandan", "Ukrainian", "Uruguayan", "Uzbek", "Venezuelan", "Vietnamese",
"Yemeni", "Zambian", "Zimbabwean",
];

const BUDGET_PRESETS = [
{ label: "< $2,000/yr", value: 2000 },
{ label: "$2,000–4,000", value: 3000 },
{ label: "$4,000–6,000", value: 5000 },
{ label: "$6,000–8,000", value: 7000 },
{ label: "$8,000+", value: 10000 },
];

export default function StepPersonal({ form }: Props) {
const age = form.watch("age");
const budget = form.watch("budgetUSD");
const nationality = form.watch("nationality");

const errors = form.formState.errors;

return (
  <div className="space-y-5">
    {/* Age */}
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700">Your Age</label>
        <span className="text-2xl font-bold text-[#1a3a6b]">{age}</span>
      </div>
      <input
        type="range"
        min={16}
        max={60}
        step={1}
        value={age}
        onChange={(e) => form.setValue("age", parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1a3a6b]"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>16</span>
        <span>38</span>
        <span>60</span>
      </div>
      {errors.age && (
        <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>
      )}
    </div>

    {/* Nationality */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Nationality
      </label>
      <select
        value={nationality}
        onChange={(e) => form.setValue("nationality", e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a6b] focus:border-transparent bg-white"
      >
        <option value="">Select your nationality...</option>
        {NATIONALITIES.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
      {errors.nationality && (
        <p className="text-red-500 text-xs mt-1">Please select your nationality</p>
      )}
    </div>

    {/* Budget */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Annual Budget (USD/year)
      </label>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {BUDGET_PRESETS.map((preset) => (
          <button
            key={preset.value}
            type="button"
            onClick={() => form.setValue("budgetUSD", preset.value)}
            className={`py-2 px-2 rounded-lg border-2 text-xs font-semibold transition-all ${
              budget === preset.value
                ? "border-[#1a3a6b] bg-blue-50 text-[#1a3a6b]"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-500 text-sm">$</span>
        <input
          type="number"
          min={0}
          step={500}
          value={budget}
          onChange={(e) =>
            form.setValue("budgetUSD", parseInt(e.target.value) || 0)
          }
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a3a6b] focus:border-transparent"
          placeholder="Custom amount"
        />
        <span className="text-gray-500 text-sm">/year</span>
      </div>
      <p className="text-xs text-gray-400 mt-1">
        Tuition only. Living costs in China average $3,000–6,000/year.
      </p>
    </div>
  </div>
);
}