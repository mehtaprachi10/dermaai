import { c as createLucideIcon, u as useInternetIdentity, a as useNavigate, j as jsxRuntimeExports, B as Button, S as ScanSearch, A as Activity, L as Link, r as reactExports } from "./index-BFQ1Vwrd.js";
import { B as Badge } from "./badge-9qD7lR0E.js";
import { C as Clock, S as Skeleton, u as useDoctors, a as Star, P as Phone, N as Navigation, E as ExternalLink } from "./use-doctors-uKlla83Y.js";
import { b as useGetAnalyses } from "./use-backend-Dp7m45z-.js";
import { T as TrendingUp, C as ChevronRight } from "./trending-up-CEdPMd2z.js";
import { M as MapPin } from "./map-pin-Cf8odOGV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCheck = createLucideIcon("user-check", __iconNode);
function shortPrincipal(id) {
  if (id.length <= 12) return id;
  return `${id.slice(0, 5)}…${id.slice(-5)}`;
}
function formatDate(ts) {
  return new Date(ts).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function confidenceCls(c) {
  if (c >= 75)
    return "bg-destructive/10 text-destructive border-destructive/20";
  if (c >= 50) return "bg-warning/15 text-foreground border-warning/30";
  return "bg-accent/10 text-accent border-accent/20";
}
function AnalysisCard({ analysis }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-medical p-4 flex gap-3 items-start",
      "data-ocid": "analysis-list-item",
      children: [
        analysis.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: analysis.imageUrl,
            alt: "Skin scan",
            className: "w-16 h-16 rounded-lg object-cover shrink-0 bg-muted"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-lg bg-primary/5 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 22, className: "text-primary/40" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground truncate", children: analysis.predictedDisease }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                className: `shrink-0 text-xs font-bold border ${confidenceCls(analysis.confidence)}`,
                "data-ocid": "confidence-badge",
                children: [
                  analysis.confidence,
                  "%"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 10 }),
            formatDate(analysis.timestamp)
          ] }),
          analysis.symptoms.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-1", children: analysis.symptoms.slice(0, 3).join(", ") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/analysis/$id",
              params: { id: analysis.analysisId },
              className: "mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline",
              "data-ocid": "view-report-btn",
              children: [
                "View Report ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 12 })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function AnalysisCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-medical p-4 flex gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-16 h-16 rounded-lg shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-36" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-44" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16 mt-1" })
    ] })
  ] });
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-16 gap-5 text-center",
      "data-ocid": "empty-state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-primary/5 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScanSearch, { size: 36, className: "text-primary/40" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-base mb-1.5", children: "No analyses yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs leading-relaxed", children: "Start your first skin scan to receive an AI-powered diagnosis and personalised care advice." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/new-analysis", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", "data-ocid": "start-first-scan-btn", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
          "Start Your First Analysis"
        ] }) })
      ]
    }
  );
}
function DoctorCard({ doctor }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${doctor.address}, ${doctor.city}`
  )}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-medical p-4", "data-ocid": "doctor-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { size: 16, className: "text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground truncate", children: doctor.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mt-0.5 text-xs bg-accent/10 text-accent border-accent/20 border", children: doctor.specialty })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 11, className: "text-warning fill-warning" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: doctor.rating })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-start gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 11, className: "mt-0.5 shrink-0 text-primary/60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          doctor.address,
          ", ",
          doctor.city,
          doctor.distanceKm !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 font-medium text-primary", children: [
            "· ",
            doctor.distanceKm,
            " km"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 11, className: "shrink-0 text-primary/60" }),
        doctor.phone
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: mapsUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline",
        "data-ocid": "get-directions-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { size: 12 }),
          "Get Directions",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 10 })
        ]
      }
    )
  ] });
}
function NearbyDoctorsSection() {
  const [locationState, setLocationState] = reactExports.useState({
    status: "idle"
  });
  const { getNearbyDoctors } = useDoctors();
  reactExports.useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocationState({ status: "denied" });
      return;
    }
    setLocationState({ status: "loading" });
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocationState({
        status: "ready",
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }),
      () => setLocationState({ status: "denied" }),
      { timeout: 8e3 }
    );
  }, []);
  const doctors = locationState.status === "ready" ? getNearbyDoctors(locationState.lat, locationState.lon, 5) : locationState.status === "denied" ? getNearbyDoctors(void 0, void 0, 5) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8", "data-ocid": "doctors-section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16, className: "text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Find Dermatologists Near You" })
    ] }),
    locationState.status === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-medical p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-9 h-9 rounded-full shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full mb-1.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-28" })
    ] }, i)) }),
    locationState.status === "denied" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-lg border border-border bg-muted/40 p-6 flex flex-col items-center gap-3 text-center mb-4",
        "data-ocid": "location-denied-msg",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 22, className: "text-primary/40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Enable location to see nearby dermatologists.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Showing top-rated doctors in your region instead."
          ] })
        ]
      }
    ),
    (locationState.status === "ready" || locationState.status === "denied") && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", "data-ocid": "doctors-list", children: doctors.map((doctor) => /* @__PURE__ */ jsxRuntimeExports.jsx(DoctorCard, { doctor }, doctor.id)) })
  ] });
}
function StatCard({
  icon: Icon,
  label,
  value,
  isLoading,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `card-medical p-3 flex flex-col gap-1 ${accent ? "border-primary/30 bg-primary/5" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Icon,
          {
            size: 15,
            className: accent ? "text-primary" : "text-muted-foreground"
          }
        ),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-12 mt-0.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-foreground leading-none", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-tight", children: label })
      ]
    }
  );
}
function DashboardPage() {
  const { identity } = useInternetIdentity();
  const { data: analyses, isLoading } = useGetAnalyses();
  const navigate = useNavigate();
  const recentAnalyses = (analyses ?? []).slice(0, 20);
  const totalScans = recentAnalyses.length;
  const latest = recentAnalyses[0];
  const latestDisease = (latest == null ? void 0 : latest.predictedDisease) ?? "–";
  const lastDate = latest ? formatDate(latest.timestamp) : "–";
  const principalText = identity ? shortPrincipal(identity.getPrincipal().toText()) : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-6 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Welcome back" }),
        principalText && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 font-mono", children: principalText }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Your skin health overview" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => navigate({ to: "/new-analysis" }),
          className: "gap-1.5 shrink-0",
          "data-ocid": "new-scan-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15 }),
            "New Scan"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: ScanSearch,
          label: "Total Analyses",
          value: totalScans,
          isLoading,
          accent: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: Activity,
          label: "Recent Finding",
          value: isLoading ? "–" : totalScans ? latestDisease.split(" ")[0] : "–",
          isLoading
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          icon: TrendingUp,
          label: "Last Analysis",
          value: isLoading ? "–" : totalScans ? lastDate : "–",
          isLoading
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "history-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-base text-foreground mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 15, className: "text-muted-foreground" }),
        "Analysis History"
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnalysisCardSkeleton, {}, i)) }) : recentAnalyses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", "data-ocid": "analyses-list", children: recentAnalyses.map((analysis) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnalysisCard, { analysis }, analysis.analysisId)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NearbyDoctorsSection, {})
  ] });
}
export {
  DashboardPage as default
};
