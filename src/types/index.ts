export type EducationLevel = "Bachelor" | "Master" | "PhD";

export type MatchProbability = "High" | "Medium" | "Low";

export interface University {
id: number;
name: string;
city: string;
province: string;
ranking: number;
logo: string;
programs: EducationLevel[];
minGPA: number;
gpaScale: number;
languageRequirements: {
  chinese: { hsk: number; label: string };
  english: { ielts: number; toefl: number; label: string };
};
ageLimit: {
  bachelor: number;
  master: number;
  phd: number;
};
tuitionUSD: {
  bachelor: number;
  master: number;
  phd: number;
};
scholarshipAvailable: boolean;
description: string;
website: string;
tags: string[];
}

export interface CalculatorFormData {
educationLevel: EducationLevel;
gpa: number;
gpaScale: 4.0 | 5.0;
languageType: "chinese" | "english";
hskLevel: number;
ieltsScore: number;
toeflScore: number;
age: number;
nationality: string;
budgetUSD: number;
}

export interface UniversityMatch {
university: University;
matchProbability: MatchProbability;
matchScore: number;
reasons: string[];
}

export type ApplicationStatus =
| "Documents Pending"
| "Under Review"
| "Submitted to University"
| "Interview Scheduled"
| "Admission Issued"
| "Payment Received";

export interface Document {
id: string;
name: string;
type: DocumentType;
url: string;
uploadedAt: string;
status: "pending" | "approved" | "rejected";
}

export type DocumentType =
| "passport"
| "diploma"
| "transcripts"
| "medical_exam"
| "criminal_record"
| "bank_statement";

export interface Application {
id: string;
userId: string;
status: ApplicationStatus;
documents: Document[];
createdAt: string;
updatedAt: string;
targetUniversities: number[];
}