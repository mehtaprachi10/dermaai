// Backend hook wrappers — gracefully handle empty backend interface
// The backend methods return defaults until the backend implements them

import { useActor } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { AnalysisRecord } from "../backend";
import type { ConsentState, SkinAnalysis } from "../types";

type ActorWithMethods = {
  getAnalyses?: () => Promise<AnalysisRecord[]>;
  getAnalysis?: (id: string) => Promise<AnalysisRecord | null>;
  saveAnalysis?: (a: AnalysisRecord) => Promise<string>;
  getConsent?: () => Promise<ConsentState | null>;
  saveConsent?: (
    camera: boolean,
    location: boolean,
    dataUsage: boolean,
  ) => Promise<void>;
};

function recordToAnalysis(r: AnalysisRecord): SkinAnalysis {
  return {
    analysisId: r.analysisId,
    imageUrl: r.imageUrl,
    symptoms: r.symptoms,
    duration: r.duration,
    ageGroup: r.ageGroup,
    predictedDisease: r.predictedDisease,
    confidence: r.confidence,
    explanation: r.explanation,
    causes: r.causes,
    treatments: r.treatments,
    lifestyleTips: r.lifestyleTips,
    doctorAdvice: r.doctorAdvice,
    timestamp: Number(r.timestamp / BigInt(1_000_000)),
  };
}

export function useGetAnalyses() {
  const { actor, isFetching } = useActor(createActor);
  const typedActor = actor as ActorWithMethods | null;

  return useQuery<SkinAnalysis[]>({
    queryKey: ["analyses"],
    queryFn: async () => {
      if (!typedActor?.getAnalyses) return [];
      const records = await typedActor.getAnalyses();
      return records.map(recordToAnalysis);
    },
    enabled: !!typedActor && !isFetching,
    initialData: [],
  });
}

export function useSaveAnalysis() {
  const { actor } = useActor(createActor);
  const typedActor = actor as ActorWithMethods | null;
  const queryClient = useQueryClient();

  return useMutation<
    string,
    Error,
    Omit<SkinAnalysis, "timestamp" | "analysisId">
  >({
    mutationFn: async (analysis) => {
      if (!typedActor?.saveAnalysis) return "";
      const analysisId = crypto.randomUUID();
      const record: AnalysisRecord = {
        ...analysis,
        analysisId,
        timestamp: BigInt(Date.now()) * BigInt(1_000_000),
        userPrincipal: { toText: () => "anonymous" } as unknown as Principal,
      };
      return await typedActor.saveAnalysis(record);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analyses"] });
    },
  });
}

export function useGetConsent() {
  const { actor, isFetching } = useActor(createActor);
  const typedActor = actor as ActorWithMethods | null;

  return useQuery<ConsentState | null>({
    queryKey: ["consent"],
    queryFn: async () => {
      if (!typedActor?.getConsent) return null;
      return typedActor.getConsent();
    },
    enabled: !!typedActor && !isFetching,
    initialData: null,
  });
}

export function useSaveConsent() {
  const { actor } = useActor(createActor);
  const typedActor = actor as ActorWithMethods | null;
  const queryClient = useQueryClient();

  return useMutation<void, Error, ConsentState>({
    mutationFn: async (consent) => {
      if (!typedActor?.saveConsent) return;
      await typedActor.saveConsent(
        consent.camera,
        consent.location,
        consent.dataUsage,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consent"] });
    },
  });
}
