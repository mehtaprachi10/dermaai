import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as cn, k as useParams, a as useNavigate, A as Activity, L as Link, B as Button, i as ue } from "./index-BFQ1Vwrd.js";
import { B as Badge } from "./badge-9qD7lR0E.js";
import { P as Primitive, a as Printer, T as TriangleAlert, C as CircleAlert } from "./index-DqW92HHB.js";
import { S as Skeleton, C as Clock, u as useDoctors, a as Star, P as Phone, N as Navigation, E as ExternalLink } from "./use-doctors-uKlla83Y.js";
import { b as useGetAnalyses } from "./use-backend-Dp7m45z-.js";
import { M as MapPin } from "./map-pin-Cf8odOGV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function DoctorCard({ doctor }) {
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${doctor.address}, ${doctor.city}`
  )}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-medical p-4", "data-ocid": "doctor-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 18, className: "text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm truncate", children: doctor.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: doctor.specialty })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0.5 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Star,
          {
            size: 12,
            className: "text-warning-foreground fill-warning-foreground"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: doctor.rating })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 12, className: "shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
          doctor.address,
          ", ",
          doctor.city
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 12, className: "shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: doctor.phone })
      ] }),
      doctor.distanceKm !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-accent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { size: 12, className: "shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          doctor.distanceKm,
          " km away"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        href: mapsUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex",
        "data-ocid": "get-directions-btn",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "gap-1.5 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 12 }),
          "Get Directions"
        ] })
      }
    )
  ] });
}
function SectionHeading({
  icon: Icon,
  title
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground text-sm mb-3 flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 14, className: "text-primary shrink-0" }),
    title
  ] });
}
function AnalysisDetailPage() {
  const { id } = useParams({ from: "/analysis/$id" });
  const navigate = useNavigate();
  const { data: analyses, isLoading } = useGetAnalyses();
  const { getNearbyDoctors } = useDoctors();
  const [userCoords, setUserCoords] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        }),
        () => setUserCoords(null)
      );
    }
  }, []);
  const analysis = analyses == null ? void 0 : analyses.find((a) => a.analysisId === id);
  const nearbyDoctors = getNearbyDoctors(userCoords == null ? void 0 : userCoords.lat, userCoords == null ? void 0 : userCoords.lon, 5);
  const handleShare = async () => {
    const shareData = {
      title: `DermaAI Analysis – ${(analysis == null ? void 0 : analysis.predictedDisease) ?? ""}`,
      text: `AI skin analysis result: ${analysis == null ? void 0 : analysis.predictedDisease} (${analysis == null ? void 0 : analysis.confidence}% confidence). Generated by DermaAI.`,
      url: window.location.href
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        ue.success("Report link copied to clipboard!");
      }
    } catch {
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-8 flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 w-full rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-xl" })
    ] });
  }
  if (!analysis) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-16 flex flex-col items-center gap-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 28, className: "text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Analysis not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This report may have been deleted or the link is incorrect." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 }),
        "Back to Dashboard"
      ] }) })
    ] });
  }
  const dateObj = new Date(analysis.timestamp);
  const dateFormatted = dateObj.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const timeFormatted = dateObj.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-6 print:max-w-none print:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6 print:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/dashboard" }),
          className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth",
          "data-ocid": "back-to-dashboard",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 }),
            "Dashboard"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "gap-1.5",
            onClick: handleShare,
            "data-ocid": "share-report-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 14 }),
              "Share"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "gap-1.5",
            onClick: () => window.print(),
            "data-ocid": "print-report-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { size: 14 }),
              "Print"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden print:block mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "DermaAI — Skin Analysis Report" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Generated by DermaAI" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex gap-3 p-4 rounded-xl border-2 border-warning/40 bg-warning/8 mb-5",
        role: "alert",
        "data-ocid": "ai-disclaimer",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TriangleAlert,
            {
              size: 20,
              className: "text-warning-foreground shrink-0 mt-0.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-0.5", children: "AI Disclaimer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/80 leading-relaxed", children: "This result is generated by an AI system and may not always be accurate. It should not replace professional medical diagnosis. Please consult a certified dermatologist for confirmation." })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-medical p-5 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-start mb-4", children: [
        analysis.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: analysis.imageUrl,
            alt: "Skin analysis",
            className: "w-24 h-24 rounded-xl object-cover bg-muted shrink-0 border border-border"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-xl bg-muted flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 28, className: "text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-1", children: "Possible Condition" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground leading-tight mb-2", children: analysis.predictedDisease }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-accent/15 border border-accent/20 rounded-lg px-3 py-1.5 inline-flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-accent font-bold text-lg font-display", children: [
              analysis.confidence,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent/80 text-xs uppercase tracking-wide", children: "AI Confidence" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 12, className: "shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: dateFormatted })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12, className: "shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: timeFormatted })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 12, className: "shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Age: ",
            analysis.ageGroup
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12, className: "shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Duration: ",
            analysis.duration
          ] })
        ] })
      ] }),
      analysis.symptoms.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mt-3", children: analysis.symptoms.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: s }, s)) }),
      analysis.explanation && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed mt-3", children: analysis.explanation })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-medical p-4 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { icon: CircleAlert, title: "Possible Causes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-2", children: analysis.causes.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          className: "text-sm text-foreground/80 flex items-start gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-1 shrink-0 text-xs", children: "●" }),
            c
          ]
        },
        c
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-medical p-4 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { icon: CircleCheck, title: "Treatment & Care" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-2", children: analysis.treatments.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          className: "text-sm text-foreground/80 flex items-start gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent mt-0.5 shrink-0 font-bold", children: "✓" }),
            t
          ]
        },
        t
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-medical p-4 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { icon: Activity, title: "Lifestyle Tips" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-2", children: analysis.lifestyleTips.map((tip) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          className: "text-sm text-foreground/80 flex items-start gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary/70 mt-0.5 shrink-0", children: "→" }),
            tip
          ]
        },
        tip
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-xl bg-warning/8 border border-warning/30 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-foreground text-sm mb-2 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TriangleAlert,
          {
            size: 14,
            className: "text-warning-foreground shrink-0"
          }
        ),
        "When to See a Doctor"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: analysis.doctorAdvice })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 print:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-base text-foreground mb-1 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16, className: "text-primary" }),
        "Nearby Dermatologists"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: userCoords ? "Sorted by distance from your current location." : "Enable location access for distance-sorted results." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
          "data-ocid": "doctors-list",
          children: nearbyDoctors.map((doctor) => /* @__PURE__ */ jsxRuntimeExports.jsx(DoctorCard, { doctor }, doctor.id))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-center print:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: () => navigate({ to: "/dashboard" }),
          className: "gap-2",
          "data-ocid": "back-dashboard-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 16 }),
            "Back to Dashboard"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: handleShare,
          className: "gap-2",
          "data-ocid": "share-report-bottom-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 16 }),
            "Share"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: () => window.print(),
          className: "gap-2",
          "data-ocid": "print-report-bottom-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { size: 16 }),
            "Print"
          ]
        }
      )
    ] })
  ] });
}
export {
  AnalysisDetailPage as default
};
