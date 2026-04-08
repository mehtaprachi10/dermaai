import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ConsentRecord {
    timestamp: bigint;
    camera: boolean;
    location: boolean;
    dataUsage: boolean;
}
export interface AnalysisRecord {
    duration: string;
    explanation: string;
    lifestyleTips: Array<string>;
    imageUrl: string;
    predictedDisease: string;
    analysisId: string;
    userPrincipal: Principal;
    timestamp: bigint;
    doctorAdvice: string;
    symptoms: Array<string>;
    causes: Array<string>;
    treatments: Array<string>;
    confidence: number;
    ageGroup: string;
}
export interface backendInterface {
    getAnalyses(): Promise<Array<AnalysisRecord>>;
    getAnalysis(analysisId: string): Promise<AnalysisRecord | null>;
    getConsent(): Promise<ConsentRecord | null>;
    saveAnalysis(analysis: AnalysisRecord): Promise<string>;
    saveConsent(camera: boolean, location: boolean, dataUsage: boolean): Promise<void>;
}
