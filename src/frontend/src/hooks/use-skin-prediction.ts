import type { DiseaseResult, SymptomData } from "../types";

const DISEASE_PROFILES: Omit<DiseaseResult, "confidence">[] = [
  {
    disease: "Acne Vulgaris",
    explanation:
      "Acne is a chronic inflammatory skin condition affecting hair follicles and sebaceous glands. It is driven by follicular plugging (comedones — blackheads and whiteheads), excess sebum, and overgrowth of Cutibacterium acnes (C. acnes) bacteria, leading to inflammatory papules, pustules, and in severe cases, nodules or cysts. It is most common in adolescents and young adults but can affect all ages.",
    causes: [
      "Follicular hyperkeratosis (abnormal skin cell shedding blocking the pore)",
      "Excess sebum production driven by androgens",
      "Cutibacterium acnes (C. acnes) bacterial overgrowth",
      "Hormonal fluctuations (puberty, menstrual cycle, polycystic ovary syndrome)",
    ],
    treatments: [
      "Topical benzoyl peroxide or salicylic acid cleanser for mild comedonal acne",
      "Topical retinoids (tretinoin, adapalene) for comedones and inflammatory lesions",
      "Oral antibiotics (doxycycline) for moderate inflammatory acne",
      "Isotretinoin (Accutane) for severe nodular or cystic acne — prescription required",
    ],
    lifestyleTips: [
      "Wash face twice daily with a mild, non-comedogenic cleanser",
      "Avoid high-glycemic foods and excess dairy, which can worsen breakouts",
      "Avoid oil-based makeup and hair products that can block pores",
      "Change pillowcases every 2–3 days and manage stress through regular exercise",
    ],
    doctorAdvice:
      "Consult a dermatologist if acne is severe, cystic, or not responding to over-the-counter treatments within 6–8 weeks. Early prescription treatment prevents permanent scarring.",
  },
  {
    disease: "Eczema (Atopic Dermatitis)",
    explanation:
      "Eczema (atopic dermatitis) is a chronic, relapsing inflammatory skin condition characterized by dry, rough, intensely itchy, and inflamed skin. It results from impaired skin barrier function combined with an overactive immune response, allowing irritants and allergens to penetrate the skin more easily. It commonly begins in childhood but can persist into or first develop in adulthood.",
    causes: [
      "Impaired skin barrier due to low filaggrin protein expression (FLG gene mutations)",
      "Genetic predisposition and family history of atopy (asthma, hay fever)",
      "Immune system overreaction (Th2-skewed immune response)",
      "Environmental allergens (dust mites, pollen, pet dander) and irritants",
    ],
    treatments: [
      "Emollient-rich moisturizers applied immediately after bathing to lock in moisture",
      "Topical corticosteroids for active flare-ups (first-line prescription therapy)",
      "Calcineurin inhibitors (tacrolimus, pimecrolimus) as steroid-sparing options for sensitive areas",
      "Dupilumab (Dupixent) — biologic injection for moderate-to-severe cases not responding to topicals",
    ],
    lifestyleTips: [
      "Keep skin moisturized throughout the day with fragrance-free emollients",
      "Take short warm baths (under 10 minutes) or showers — avoid prolonged hot water",
      "Wear soft, breathable cotton clothing and avoid wool or synthetic fabrics",
      "Identify and avoid personal triggers (specific soaps, detergents, foods, or environmental factors)",
    ],
    doctorAdvice:
      "Seek medical attention if the skin becomes infected (warm, weeping, or crusted with yellow discharge), blisters, or if itching is severe enough to disrupt sleep regularly.",
  },
  {
    disease: "Psoriasis",
    explanation:
      "Psoriasis is a chronic autoimmune disease in which T-cell-mediated immune dysregulation triggers an inflammatory cytokine cascade (involving TNF-α, IL-17, and IL-23), dramatically accelerating skin cell turnover from the normal 28-day cycle to as few as 3–4 days. This causes a rapid buildup of thick, silvery-white, scaly plaques on a red base — classically on elbows, knees, scalp, and lower back.",
    causes: [
      "T-cell-mediated immune dysregulation and inflammatory cytokine cascade (TNF-α, IL-17, IL-23)",
      "Genetic factors (HLA-Cw6 allele and multiple susceptibility genes)",
      "Triggers: physical or emotional stress, skin injury (Koebner phenomenon), streptococcal throat infection",
      "Medications (lithium, beta-blockers, antimalarials) and alcohol or smoking",
    ],
    treatments: [
      "Topical corticosteroids and vitamin D analogues (calcipotriene) for mild-to-moderate plaques",
      "Coal tar or salicylic acid preparations to reduce scaling",
      "Phototherapy (narrowband UVB) — first-line for moderate disease",
      "Biologics (adalimumab, secukinumab, ixekizumab, risankizumab) for moderate-to-severe psoriasis — current standard of care",
    ],
    lifestyleTips: [
      "Avoid known triggers: stress, skin injuries, smoking, and excessive alcohol",
      "Moisturize regularly to reduce plaque buildup and maintain skin barrier",
      "Phototherapy (narrowband UVB) is a first-line option for moderate disease — ask your dermatologist",
      "Maintain a healthy weight, as obesity is associated with more severe psoriasis",
    ],
    doctorAdvice:
      "Psoriasis requires long-term management. See a dermatologist for prescription treatments including biologics if topical or light therapies are insufficient — psoriatic arthritis affects up to 30% of patients and requires early treatment.",
  },
  {
    disease: "Ringworm (Tinea)",
    explanation:
      "Ringworm (tinea) is a common superficial fungal infection caused by dermatophytes — fungi that invade and digest keratin in the outer skin layer. It produces characteristic ring-shaped patches with a red, scaly, raised border and a clearer or scaling center, typically with itching. Despite the name, no worm is involved — the ring shape gives it its common name.",
    causes: [
      "Dermatophyte fungi from three genera: Trichophyton, Microsporum, and Epidermophyton",
      "Direct contact with an infected person, animal (especially cats and dogs), or soil",
      "Shared use of contaminated clothing, towels, or sports equipment",
      "Warm, moist environments that promote fungal growth",
    ],
    treatments: [
      "Topical terbinafine (most effective) or clotrimazole/miconazole antifungal cream — continue for 2–4 weeks even if symptoms resolve early",
      "Keep affected area clean and dry during treatment",
      "Avoid sharing towels or clothing until cleared",
      "Oral antifungals (terbinafine, griseofulvin) for resistant, widespread, or scalp/nail involvement",
    ],
    lifestyleTips: [
      "Keep skin dry, especially between toes and in skin folds",
      "Wear breathable, moisture-wicking fabrics during exercise",
      "Wash workout clothes and towels after every use",
      "Avoid walking barefoot in communal showers, gyms, or pool areas",
    ],
    doctorAdvice:
      "If the infection spreads, doesn't improve after 2–4 weeks of topical antifungal treatment, or affects the nails or scalp, consult a doctor — oral antifungals will be needed.",
  },
  {
    disease: "Hives (Urticaria)",
    explanation:
      "Hives (urticaria) are raised, intensely itchy welts (wheals) that appear suddenly on the skin due to histamine release from mast cells triggered by an allergen or immune stimulus. Individual hives typically resolve within 24 hours, though new ones may continue to appear. Acute urticaria lasts under 6 weeks; chronic urticaria persists beyond 6 weeks and often has no identifiable trigger.",
    causes: [
      "Allergic reaction to food (nuts, shellfish), medications (penicillin, NSAIDs), or insect stings",
      "Infections (viral, bacterial, or parasitic) — common trigger especially in children",
      "Idiopathic (no identifiable cause) — accounts for up to 50% of chronic urticaria cases",
      "Physical triggers: pressure, cold, heat, or exercise (physical urticaria)",
      "Autoimmune conditions (autoimmune urticaria) and emotional stress",
    ],
    treatments: [
      "Non-sedating oral antihistamines (cetirizine, loratadine, fexofenadine) — first-line treatment",
      "Higher-dose antihistamines or second-generation H1-blockers for inadequate response",
      "Omalizumab (Xolair) — approved for chronic spontaneous urticaria not responding to antihistamines",
      "Short course of oral corticosteroids for severe acute flares",
      "Epinephrine auto-injector (EpiPen) if accompanied by throat swelling or anaphylaxis",
    ],
    lifestyleTips: [
      "Keep a trigger diary to identify foods, substances, or situations that cause flares",
      "Wear loose, soft clothing to reduce friction and skin irritation",
      "Take cool showers rather than hot baths to avoid histamine release",
      "Manage stress with relaxation techniques — stress is a recognized trigger",
    ],
    doctorAdvice:
      "Seek emergency care immediately if hives are accompanied by throat swelling, difficulty breathing, dizziness, or rapid heartbeat — these are signs of life-threatening anaphylaxis. Carry an epinephrine auto-injector if you have a history of severe reactions.",
  },
  {
    disease: "Vitiligo",
    explanation:
      "Vitiligo is a chronic autoimmune condition in which the immune system attacks and destroys melanocytes — the cells responsible for skin pigmentation — resulting in smooth, well-defined white or light-colored patches on the skin. It can affect all skin tones (more visible on darker skin), and may also affect hair color and the mucous membranes. It is not contagious and does not cause physical discomfort, but can have significant psychological impact.",
    causes: [
      "Autoimmune destruction of melanocytes (T-cell mediated)",
      "Genetic predisposition (family history; associated with HLA genes)",
      "Oxidative stress causing melanocyte damage",
      "Neural hypothesis: neurochemicals released from nerve endings may damage local melanocytes",
      "Association with other autoimmune diseases (thyroid disease, type 1 diabetes, Addison's disease); two types: segmental (one side) and generalized (widespread)",
    ],
    treatments: [
      "Topical corticosteroids to slow depigmentation in early or active vitiligo",
      "Topical calcineurin inhibitors (tacrolimus, pimecrolimus) for sensitive areas (face, genitals)",
      "Narrowband UVB phototherapy — most effective evidence-based treatment for repigmentation",
      "Ruxolitinib (Opzelura) cream — FDA-approved 2022 JAK inhibitor specifically for vitiligo repigmentation",
      "Cosmetic camouflage products for visible patches; surgical melanocyte transplantation for stable cases",
    ],
    lifestyleTips: [
      "Apply broad-spectrum SPF 30+ sunscreen to depigmented patches daily — affected skin has no UV protection",
      "Avoid skin trauma that may trigger new patches (Koebner phenomenon)",
      "Eat a diet rich in antioxidants (fruits and vegetables) to reduce oxidative stress",
      "Join a support group or seek counseling to manage the emotional and psychological impact",
    ],
    doctorAdvice:
      "See a dermatologist for a confirmed diagnosis and to discuss repigmentation therapies. Early treatment may slow progression. Thyroid function should be tested, as thyroid disease co-occurs frequently with vitiligo.",
  },
  {
    disease: "Melanoma",
    explanation:
      "Melanoma is the most serious and aggressive form of skin cancer, arising from malignant transformation of melanocytes. It often appears as a new dark lesion or a pre-existing mole that changes in appearance. Clinicians use the ABCDE rule for detection: Asymmetry, Border irregularity, Color variation, Diameter >6 mm, and Evolution (any change over time). When detected at stage 1, the 5-year survival rate exceeds 95%; advanced melanoma is often fatal.",
    causes: [
      "UV radiation exposure from sun and tanning beds — the primary modifiable risk factor",
      "History of severe blistering sunburns, especially in childhood",
      "Genetic mutations: BRAF V600E (most common, ~50% of melanomas), CDKN2A, NRAS",
      "Fair skin, light hair, blue or green eyes, and freckling",
      "Large number of moles (>50) or atypical (dysplastic) mole syndrome",
    ],
    treatments: [
      "Surgical wide local excision — primary and curative treatment for early-stage melanoma",
      "Sentinel lymph node biopsy for staging (to determine if cancer has spread)",
      "Adjuvant immunotherapy (pembrolizumab, nivolumab) or targeted therapy (BRAF/MEK inhibitors) for high-risk resected or advanced disease",
      "Radiation therapy as adjunct for specific anatomical sites or lymph node involvement",
      "Regular full-body skin checks and dermoscopy surveillance after treatment",
    ],
    lifestyleTips: [
      "Apply broad-spectrum SPF 50+ sunscreen daily and reapply every 2 hours during outdoor exposure",
      "Perform monthly self-exams using the ABCDE rule — have a partner check hard-to-see areas (back, scalp)",
      "Avoid tanning beds entirely — they significantly increase melanoma risk",
      "Wear UV-protective clothing (UPF 50+), wide-brim hats, and UV-blocking sunglasses",
    ],
    doctorAdvice:
      "Any new or changing mole, dark irregular lesion, or spot that bleeds without injury must be evaluated URGENTLY — do not wait. Melanoma detected at stage 1 has >95% survival; stage 4 has very poor prognosis. Same-week dermatology review is warranted.",
  },
  {
    disease: "Impetigo",
    explanation:
      "Impetigo is a highly contagious superficial bacterial skin infection most common in children ages 2–5, caused by Staphylococcus aureus (most common) or Streptococcus pyogenes. Non-bullous impetigo (most common form) produces red sores that rupture and form the characteristic golden-yellow honey-colored crust. Bullous impetigo, caused by S. aureus toxins, produces larger, fragile, fluid-filled blisters. Secondary impetigo can develop on top of pre-existing skin conditions like eczema or insect bites.",
    causes: [
      "Staphylococcus aureus — primary cause of both non-bullous and bullous impetigo",
      "Streptococcus pyogenes (Group A beta-hemolytic streptococcus) — common in non-bullous impetigo",
      "Entry through skin breaks: cuts, insect bites, or underlying skin conditions (eczema, scabies)",
      "Close contact with an infected person in school, daycare, or household settings",
      "Warm, humid weather and poor hygiene facilitating bacterial spread",
    ],
    treatments: [
      "Topical mupirocin (Bactroban) or retapamulin ointment for mild localized cases — applied 2–3x daily for 5–7 days",
      "Oral antibiotics (amoxicillin-clavulanate, cephalexin, or clindamycin for MRSA) for widespread infection",
      "Gently remove crusts with warm soapy water before applying topical antibiotic",
      "Keep the area covered to prevent spreading to other body sites and other people",
    ],
    lifestyleTips: [
      "Wash hands frequently, especially before touching the face",
      "Keep child home from school or daycare until 24–48 hours after starting antibiotic treatment",
      "Keep fingernails short to prevent scratching and spreading to other skin areas",
      "Disinfect household surfaces and wash bedding, towels, and clothing in hot water daily",
    ],
    doctorAdvice:
      "See a doctor promptly — impetigo requires antibiotic treatment to clear the infection and prevent spreading to others. If untreated, rare complications include cellulitis or post-streptococcal glomerulonephritis (kidney inflammation). Keep children home from school until 24–48 hours after starting antibiotics.",
  },
  {
    disease: "Scabies",
    explanation:
      "Scabies is a contagious skin infestation caused by the microscopic mite Sarcoptes scabiei var. hominis, which burrows into the epidermis to lay eggs. The hallmark symptom is intense, relentless itching — characteristically worst at night — and a rash with small red bumps, blisters, and tiny visible burrow tracks (especially between fingers, wrists, and genitals). The itch is an allergic reaction to the mites' proteins, eggs, and feces — not direct mite damage.",
    causes: [
      "Infestation by Sarcoptes scabiei mite via prolonged direct skin-to-skin contact",
      "Sexual contact or sharing bedding and clothing with an infected person",
      "Crowded living conditions (nursing homes, prisons, dormitories)",
      "Crusted (Norwegian) scabies — occurs in immunocompromised patients and contains thousands of mites, highly contagious",
      "Indirect transmission via contaminated clothing or bedding (mites survive off-host up to 72 hours)",
    ],
    treatments: [
      "Prescription permethrin 5% cream applied from neck to toe for 8–14 hours, then washed off — repeat in 1 week",
      "Oral ivermectin (two doses, 1–2 weeks apart) for crusted scabies or treatment failure",
      "Antihistamines and emollients to relieve itch — itching may persist 2–4 weeks after successful treatment (allergic reaction to dead mites)",
      "Wash all bedding, clothing, and towels in hot water (60°C / 140°F) and dry on high heat",
      "All household members and close contacts must be treated simultaneously, even if asymptomatic",
    ],
    lifestyleTips: [
      "Bag items that cannot be washed and seal in plastic for 72 hours to kill mites",
      "Vacuum all furniture, carpets, and mattresses thoroughly and discard the bag",
      "Avoid skin-to-skin contact with others until treatment is complete and confirmed",
      "Inform all close contacts (household members and sexual partners) so they can be evaluated and treated",
    ],
    doctorAdvice:
      "Scabies requires prescription medication — see a doctor for a confirmed diagnosis and permethrin cream or ivermectin. All household members and sexual contacts should be treated simultaneously even if asymptomatic to prevent re-infestation. Itching after treatment is normal and does not mean treatment failed.",
  },
  {
    disease: "Rosacea",
    explanation:
      "Rosacea is a chronic inflammatory skin condition that primarily affects the central face — nose, cheeks, forehead, and chin. It is characterized by persistent facial redness (erythema), visible dilated blood vessels (telangiectasia), and in some subtypes, acne-like papules and pustules or skin thickening (rhinophyma). It tends to flare in response to external triggers. Four subtypes exist: erythematotelangiectatic, papulopustular, phymatous, and ocular rosacea.",
    causes: [
      "Abnormal facial neurovascular response causing exaggerated flushing and vessel dilation",
      "Immune dysregulation with increased cathelicidin antimicrobial peptide activity",
      "Demodex folliculorum mite overgrowth (potential contributor — more prevalent in rosacea patients)",
      "Genetic predisposition (predominantly affects fair-skinned individuals of Celtic/Northern European descent)",
      "Triggers: UV exposure, heat, alcohol, spicy foods, exercise, stress, and certain skincare products",
    ],
    treatments: [
      "Topical metronidazole or azelaic acid — first-line for papulopustular rosacea",
      "Ivermectin 1% cream (Soolantra) — highly effective for papulopustular rosacea, particularly targeting Demodex",
      "Oral doxycycline (low-dose anti-inflammatory, 40 mg) for moderate papulopustular rosacea",
      "Brimonidine gel or oxymetazoline cream for persistent background erythema (redness)",
      "Laser or IPL therapy to reduce visible blood vessels and long-term redness",
    ],
    lifestyleTips: [
      "Identify and strictly avoid personal triggers (heat, spicy foods, alcohol, harsh skincare products)",
      "Apply gentle, fragrance-free SPF 30+ broad-spectrum sunscreen every morning — protect face from sun, wind, and cold",
      "Use only gentle, non-irritating, fragrance-free skincare products — avoid alcohol-based toners",
      "Keep a trigger diary to track flare patterns and identify your specific sensitivities",
    ],
    doctorAdvice:
      "Consult a dermatologist for a confirmed diagnosis and subtype-specific treatment plan — untreated rosacea can progress and cause permanent skin changes, enlarged pores, and rhinophyma (nose thickening). Ocular rosacea affecting the eyes requires separate treatment.",
  },
  {
    disease: "Dermatitis (Contact)",
    explanation:
      "Contact dermatitis is an inflammatory skin reaction caused by direct contact with an external substance, producing a localized rash with redness, itching, and sometimes blistering at the site of exposure. There are two distinct mechanisms: irritant contact dermatitis (ICD) — direct toxic damage to skin cells from chemicals, acids, or repeated wet work; and allergic contact dermatitis (ACD) — a delayed Type IV hypersensitivity immune reaction requiring prior sensitization to the allergen.",
    causes: [
      "Allergic contact dermatitis: metals (nickel in jewelry/belt buckles), latex, fragrances, preservatives, hair dye (PPD)",
      "Irritant contact dermatitis: chemical irritants in soaps, detergents, solvents, bleach, and cleaning products",
      "Plants (poison ivy, poison oak, sumac) — classic cause of acute allergic contact dermatitis",
      "Repeated exposure to water (wet work) — common occupational cause in healthcare workers, hairdressers, cleaners",
      "Occupational exposures: epoxy resins, rubber chemicals, cement (chromate allergy)",
    ],
    treatments: [
      "Identify and remove the triggering substance immediately — this is the most critical step",
      "Apply cool, wet compresses to reduce acute inflammation and soothe the rash",
      "Topical corticosteroids (hydrocortisone OTC or prescription-strength for severe reactions)",
      "Tacrolimus ointment — non-steroidal alternative for facial or skin-fold contact dermatitis",
      "Oral antihistamines for itch relief; oral corticosteroids for extensive or severe reactions",
    ],
    lifestyleTips: [
      "Patch test new cosmetics or skincare products on a small area before full application",
      "Use hypoallergenic, fragrance-free, and preservative-free personal care products",
      "Wear protective nitrile or vinyl gloves (not latex) when using cleaning agents or handling chemicals",
      "Keep a diary to identify and avoid recurring triggers; barrier creams can protect occupational exposures",
    ],
    doctorAdvice:
      "Seek urgent care if the rash is near the eyes, mouth, or genitals, covers large body areas, or involves severe blistering and weeping. Formal patch testing by a dermatologist can identify the specific allergen causing allergic contact dermatitis.",
  },
  {
    disease: "Warts (HPV)",
    explanation:
      "Warts are benign epidermal growths caused by infection with human papillomavirus (HPV) — a DNA virus with over 100 strains. Different HPV types cause different wart types: HPV 1, 2 cause common and plantar (foot) warts; HPV 3 causes flat warts; HPV 6 and 11 cause genital warts. They appear as rough, raised, skin-colored or gray bumps and are spread through direct skin contact or contaminated surfaces. Most warts in immunocompetent individuals resolve spontaneously within 1–2 years.",
    causes: [
      "Human papillomavirus (HPV) infection — HPV types 1, 2 for common/plantar warts; HPV 3 for flat warts; HPV 6, 11 for genital warts",
      "Direct skin-to-skin contact with HPV-infected tissue",
      "Touching contaminated surfaces (pool decks, gym floors, communal showers)",
      "Cuts, abrasions, or compromised skin providing a HPV entry point",
      "Weakened immune system (HIV, immunosuppressive therapy) greatly increasing susceptibility and wart burden",
    ],
    treatments: [
      "Salicylic acid 17–40% topical solution — first-line over-the-counter; apply nightly after soaking and filing wart",
      "Cryotherapy (liquid nitrogen) — second-line office-based treatment; typically requires 2–4 sessions",
      "Prescription cantharidin (blistering agent) applied in-office for quick and effective results",
      "Intralesional immunotherapy (Candida antigen injection) — newer office-based treatment stimulating immune clearance of multiple warts",
      "Electrocautery or laser removal for stubborn or multiple warts; most warts resolve on their own within 1–2 years without treatment",
    ],
    lifestyleTips: [
      "Avoid picking, scratching, or shaving over warts to prevent auto-inoculation and spreading",
      "Cover warts with waterproof bandages to reduce contact transmission to others",
      "Wear flip-flops or water shoes in communal showers, locker rooms, and pool areas",
      "Wash hands thoroughly after touching any wart; keep wart area dry between treatments",
    ],
    doctorAdvice:
      "See a dermatologist if warts are painful, multiplying rapidly, located on the face or genitals, or if you are immunocompromised. Genital warts always require medical evaluation. The HPV vaccine (Gardasil 9) prevents the most common HPV strains and is recommended for adolescents and young adults.",
  },
];

function scoreDisease(symptoms: SymptomData, diseaseIndex: number): number {
  const { itching, pain, redness, swelling, drySkin, duration, ageGroup } =
    symptoms;
  const isLongDuration =
    duration === "2–4 weeks" || duration === "More than 1 month";
  const isShortDuration = duration === "Less than 1 week";
  const isYoung = ageGroup === "Under 18" || ageGroup === "18–30";

  switch (diseaseIndex) {
    case 0: // Acne Vulgaris
      return (
        (redness ? 30 : 0) +
        (pain ? 20 : 0) +
        (isYoung ? 30 : 0) +
        (swelling ? 10 : 0) +
        (itching ? 5 : 0)
      );
    case 1: // Eczema
      return (
        (itching ? 35 : 0) +
        (drySkin ? 30 : 0) +
        (isLongDuration ? 20 : 0) +
        (redness ? 10 : 0) +
        (swelling ? 5 : 0)
      );
    case 2: // Psoriasis
      return (
        (drySkin ? 35 : 0) +
        (swelling ? 25 : 0) +
        (isLongDuration ? 20 : 0) +
        (itching ? 15 : 0) +
        (pain ? 5 : 0)
      );
    case 3: // Ringworm (Tinea)
      return (
        (itching ? 40 : 0) +
        (!pain ? 20 : 0) +
        (redness ? 15 : 0) +
        (isLongDuration ? 15 : 0) +
        (drySkin ? 10 : 0)
      );
    case 4: // Hives (Urticaria) — removed pain (hives itch, not pain); added drySkin penalty to differentiate from eczema
      return (
        (itching ? 35 : 0) +
        (redness ? 30 : 0) +
        (isShortDuration ? 20 : 0) +
        (swelling ? 15 : 0) +
        (!drySkin ? 10 : 0)
      );
    case 5: // Vitiligo — scores on absence of symptoms (asymptomatic visual condition)
      return (
        (!itching ? 20 : 0) +
        (!pain ? 20 : 0) +
        (isLongDuration ? 15 : 0) +
        (!swelling ? 10 : 0) +
        (!drySkin ? 5 : 0)
      );
    case 6: // Melanoma — scores on absence of symptoms (typically asymptomatic early)
      return (
        (!itching ? 20 : 0) +
        (!pain ? 15 : 0) +
        (isLongDuration ? 20 : 0) +
        (!swelling ? 10 : 0) +
        (!redness ? 10 : 0)
      );
    case 7: // Impetigo
      return (
        (redness ? 35 : 0) +
        (swelling ? 25 : 0) +
        (itching ? 20 : 0) +
        (pain ? 15 : 0) +
        (isShortDuration ? 10 : 0)
      );
    case 8: // Scabies
      return (
        (itching ? 45 : 0) +
        (redness ? 20 : 0) +
        (swelling ? 15 : 0) +
        (isLongDuration ? 15 : 0) +
        (pain ? 5 : 0)
      );
    case 9: // Rosacea — removed pain (not a primary symptom); added drySkin penalty (rosacea skin is not typically dry)
      return (
        (redness ? 45 : 0) +
        (!drySkin ? 15 : 0) +
        (swelling ? 15 : 0) +
        (isLongDuration ? 15 : 0) +
        (!itching ? 10 : 0)
      );
    case 10: // Dermatitis (Contact)
      return (
        (itching ? 40 : 0) +
        (redness ? 35 : 0) +
        (drySkin ? 20 : 0) +
        (swelling ? 10 : 0) +
        (isShortDuration ? 10 : 0)
      );
    case 11: // Warts (HPV) — scores on absence of symptoms (benign, mostly asymptomatic)
      return (
        (!itching ? 20 : 0) +
        (!pain ? 20 : 0) +
        (!redness ? 15 : 0) +
        (!swelling ? 15 : 0) +
        (isLongDuration ? 10 : 0)
      );
    default:
      return 0;
  }
}

export function useSkinPrediction() {
  const predict = (symptoms: SymptomData): DiseaseResult[] => {
    const scores = DISEASE_PROFILES.map((_, i) => scoreDisease(symptoms, i));
    const totalScore = scores.reduce((acc, s) => acc + s, 0) || 1;

    const results: DiseaseResult[] = DISEASE_PROFILES.map((profile, i) => {
      const rawConfidence = scores[i] / totalScore;
      const confidence = Math.max(
        5,
        Math.min(97, Math.round(rawConfidence * 100)),
      );
      return { ...profile, confidence };
    });

    return results.sort((a, b) => b.confidence - a.confidence);
  };

  return { predict };
}
