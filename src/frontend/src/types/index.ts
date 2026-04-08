// Shared types for DermaAI application

export interface SkinAnalysis {
  analysisId: string;
  imageUrl: string;
  symptoms: string[];
  duration: string;
  ageGroup: string;
  predictedDisease: string;
  confidence: number;
  explanation: string;
  causes: string[];
  treatments: string[];
  lifestyleTips: string[];
  doctorAdvice: string;
  timestamp: number;
}

export interface ConsentState {
  camera: boolean;
  location: boolean;
  dataUsage: boolean;
  timestamp?: number;
}

export interface DiseaseResult {
  disease: string;
  confidence: number;
  explanation: string;
  causes: string[];
  treatments: string[];
  lifestyleTips: string[];
  doctorAdvice: string;
}

export interface DoctorInfo {
  id: string;
  name: string;
  specialty: string;
  address: string;
  city: string;
  phone: string;
  rating: number;
  lat: number;
  lon: number;
  distanceKm?: number;
}

export type AnalysisStep =
  | "permissions"
  | "upload"
  | "symptoms"
  | "results"
  | "doctors";

export interface SymptomData {
  itching: boolean;
  pain: boolean;
  redness: boolean;
  swelling: boolean;
  drySkin: boolean;
  duration: string;
  ageGroup: string;
}

export const DURATION_OPTIONS = [
  "Less than 1 week",
  "1–2 weeks",
  "2–4 weeks",
  "More than 1 month",
];

export const AGE_GROUP_OPTIONS = [
  "Under 18",
  "18–30",
  "31–45",
  "46–60",
  "Over 60",
];
