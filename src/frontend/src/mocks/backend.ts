import type { AnalysisRecord, backendInterface } from "../backend";

const sampleAnalysis = {
  analysisId: "DA19482",
  userPrincipal: { toText: () => "sample-principal" } as any,
  timestamp: BigInt(1698278400000000000),
  imageUrl: "https://placehold.co/200x200?text=Skin+Image",
  predictedDisease: "Dermatitis (Contact)",
  confidence: 0.89,
  explanation:
    "An inflammatory skin reaction triggered by direct contact with an irritant or allergen, causing localized redness, itching, and blistering at the site of exposure.",
  symptoms: ["Itching", "Redness", "Swelling"],
  causes: [
    "Contact with irritants (soaps, detergents)",
    "Allergic reaction to metals or plants",
    "Chemical exposure",
  ],
  treatments: [
    "Topical corticosteroid cream",
    "Antihistamines for itching relief",
    "Avoid known irritants",
  ],
  lifestyleTips: [
    "Use fragrance-free soaps and detergents",
    "Wear protective gloves when handling chemicals",
    "Keep the affected area moisturized",
  ],
  doctorAdvice:
    "Consult a dermatologist if symptoms persist beyond 2 weeks or worsen.",
  duration: "1 week",
  ageGroup: "25-34",
};

const sampleAnalysis2 = {
  analysisId: "DA19481",
  userPrincipal: { toText: () => "sample-principal" } as any,
  timestamp: BigInt(1697500000000000000),
  imageUrl: "https://placehold.co/200x200?text=Skin+Image+2",
  predictedDisease: "Eczema",
  confidence: 0.76,
  explanation:
    "A chronic inflammatory skin condition characterized by dry, itchy, and inflamed skin patches.",
  symptoms: ["Dry skin", "Itching", "Redness"],
  causes: [
    "Genetic factors",
    "Environmental triggers",
    "Immune system dysfunction",
  ],
  treatments: [
    "Emollients and moisturizers",
    "Topical steroids for flare-ups",
    "Avoid triggers like dust mites and pet dander",
  ],
  lifestyleTips: [
    "Take short, lukewarm showers",
    "Use hypoallergenic laundry detergent",
    "Humidify your living space in dry weather",
  ],
  doctorAdvice:
    "Consider allergy testing to identify specific triggers. A dermatologist can recommend prescription treatments.",
  duration: "3 months",
  ageGroup: "25-34",
};

export const mockBackend: backendInterface = {
  getAnalyses: async () => [sampleAnalysis, sampleAnalysis2],
  getAnalysis: async (analysisId: string) => {
    if (analysisId === "DA19482") return sampleAnalysis;
    if (analysisId === "DA19481") return sampleAnalysis2;
    return null;
  },
  getConsent: async () => ({
    timestamp: BigInt(1698278400000000000),
    camera: true,
    location: true,
    dataUsage: true,
  }),
  saveAnalysis: async (analysis: AnalysisRecord) => analysis.analysisId,
  saveConsent: async () => undefined,
};
