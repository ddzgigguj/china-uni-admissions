import { CalculatorFormData, University, UniversityMatch, MatchProbability } from "@/types";

/**
* Normalizes a GPA to a 4.0 scale.
*/
function normalizeGPA(gpa: number, scale: 4.0 | 5.0): number {
 if (scale === 4.0) return gpa;
 // Convert 5.0 scale to 4.0 scale
 return (gpa / 5.0) * 4.0;
}

/**
* Gets the age limit for a given education level.
*/
function getAgeLimit(university: University, level: string): number {
 switch (level) {
   case "Bachelor":
     return university.ageLimit.bachelor;
   case "Master":
     return university.ageLimit.master;
   case "PhD":
     return university.ageLimit.phd;
   default:
     return 25;
 }
}

/**
* Gets the tuition for a given education level.
*/
function getTuition(university: University, level: string): number {
 switch (level) {
   case "Bachelor":
     return university.tuitionUSD.bachelor;
   case "Master":
     return university.tuitionUSD.master;
   case "PhD":
     return university.tuitionUSD.phd;
   default:
     return 0;
 }
}

/**
* Calculates a match score (0-100) and probability for a university.
*/
export function calculateMatch(
 formData: CalculatorFormData,
 university: University
): UniversityMatch | null {
 const reasons: string[] = [];
 let score = 0;
 const maxScore = 100;

 // 1. Check if the program is offered
 if (!university.programs.includes(formData.educationLevel)) {
   return null;
 }

 // 2. Normalize GPA to 4.0 scale
 const normalizedGPA = normalizeGPA(formData.gpa, formData.gpaScale);
 const gpaRatio = normalizedGPA / university.minGPA;

 if (normalizedGPA < university.minGPA) {
   // GPA below minimum — still show but with low score
   score += 5;
   reasons.push(`GPA below minimum (need ${university.minGPA.toFixed(1)}/4.0)`);
 } else if (gpaRatio >= 1.2) {
   score += 35;
   reasons.push("GPA exceeds requirements");
 } else if (gpaRatio >= 1.0) {
   score += 25;
   reasons.push("GPA meets requirements");
 } else {
   score += 10;
 }

 // 3. Language requirements
 if (formData.languageType === "chinese") {
   const hskRequired = university.languageRequirements.chinese.hsk;
   if (formData.hskLevel >= hskRequired + 1) {
     score += 30;
     reasons.push(`HSK ${formData.hskLevel} exceeds requirement (HSK ${hskRequired})`);
   } else if (formData.hskLevel >= hskRequired) {
     score += 22;
     reasons.push(`HSK ${formData.hskLevel} meets requirement`);
   } else if (formData.hskLevel >= hskRequired - 1) {
     score += 10;
     reasons.push(`HSK ${formData.hskLevel} slightly below requirement (HSK ${hskRequired})`);
   } else {
     score += 2;
     reasons.push(`HSK ${formData.hskLevel} below requirement (need HSK ${hskRequired})`);
   }
 } else {
   // English (IELTS or TOEFL)
   const ieltsRequired = university.languageRequirements.english.ielts;
   const toeflRequired = university.languageRequirements.english.toefl;

   if (formData.ieltsScore > 0) {
     if (formData.ieltsScore >= ieltsRequired + 0.5) {
       score += 30;
       reasons.push(`IELTS ${formData.ieltsScore} exceeds requirement (${ieltsRequired})`);
     } else if (formData.ieltsScore >= ieltsRequired) {
       score += 22;
       reasons.push(`IELTS ${formData.ieltsScore} meets requirement`);
     } else {
       score += 5;
       reasons.push(`IELTS ${formData.ieltsScore} below requirement (need ${ieltsRequired})`);
     }
   } else if (formData.toeflScore > 0) {
     if (formData.toeflScore >= toeflRequired + 5) {
       score += 30;
       reasons.push(`TOEFL ${formData.toeflScore} exceeds requirement (${toeflRequired})`);
     } else if (formData.toeflScore >= toeflRequired) {
       score += 22;
       reasons.push(`TOEFL ${formData.toeflScore} meets requirement`);
     } else {
       score += 5;
       reasons.push(`TOEFL ${formData.toeflScore} below requirement (need ${toeflRequired})`);
     }
   }
 }

 // 4. Age check
 const ageLimit = getAgeLimit(university, formData.educationLevel);
 if (formData.age <= ageLimit) {
   score += 20;
   reasons.push("Age within limit");
 } else {
   score += 0;
   reasons.push(`Age exceeds limit (max ${ageLimit})`);
 }

 // 5. Budget check
 const tuition = getTuition(university, formData.educationLevel);
 if (tuition === 0) {
   score += 15;
 } else if (formData.budgetUSD >= tuition * 1.2) {
   score += 15;
   reasons.push("Budget comfortably covers tuition");
 } else if (formData.budgetUSD >= tuition) {
   score += 10;
   reasons.push("Budget covers tuition");
 } else if (formData.budgetUSD >= tuition * 0.7 && university.scholarshipAvailable) {
   score += 8;
   reasons.push("Scholarship available to cover gap");
 } else {
   score += 2;
   reasons.push(`Budget below tuition ($${tuition.toLocaleString()}/year)`);
 }

 // Normalize score
 const normalizedScore = Math.min(Math.round((score / maxScore) * 100), 100);

 // Determine match probability
 let matchProbability: MatchProbability;
 if (normalizedScore >= 70) {
   matchProbability = "High";
 } else if (normalizedScore >= 40) {
   matchProbability = "Medium";
 } else {
   matchProbability = "Low";
 }

 return {
   university,
   matchProbability,
   matchScore: normalizedScore,
   reasons,
 };
}

/**
* Filters and ranks universities based on form data.
*/
export function getUniversityMatches(
 formData: CalculatorFormData,
 universities: University[]
): UniversityMatch[] {
 const matches: UniversityMatch[] = [];

 for (const university of universities) {
   const match = calculateMatch(formData, university);
   if (match) {
     matches.push(match);
   }
 }

 // Sort by match score descending
 matches.sort((a, b) => b.matchScore - a.matchScore);

 return matches;
}
