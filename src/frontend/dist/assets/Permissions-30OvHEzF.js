import { c as createLucideIcon, a as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button, X } from "./index-BFQ1Vwrd.js";
import { a as useSaveConsent } from "./use-backend-Dp7m45z-.js";
import { m as motion } from "./proxy-BlNqbtJp.js";
import { C as Camera, a as Check } from "./check-BE8OpgLi.js";
import { M as MapPin } from "./map-pin-Cf8odOGV.js";
import { L as LoaderCircle } from "./loader-circle-BdclsKOB.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
];
const Database = createLucideIcon("database", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
const PERMISSIONS = [
  {
    key: "camera",
    icon: Camera,
    label: "Camera Access",
    description: "Capture photos of affected skin areas for AI analysis. Images are processed locally and never stored without your consent.",
    iconColor: "text-primary",
    iconBg: "bg-primary/10"
  },
  {
    key: "location",
    icon: MapPin,
    label: "Location Access",
    description: "Use your GPS location to find nearby certified dermatologists and skin specialists in your area.",
    iconColor: "text-accent",
    iconBg: "bg-accent/10"
  },
  {
    key: "dataUsage",
    icon: Database,
    label: "Data Usage for AI Analysis",
    description: "Allow AI to analyze your image and symptoms to predict possible skin conditions. Results are shown only to you.",
    iconColor: "text-primary",
    iconBg: "bg-primary/10"
  }
];
function PermissionsPage() {
  const navigate = useNavigate();
  const saveConsent = useSaveConsent();
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [permissions, setPermissions] = reactExports.useState({
    camera: false,
    location: false,
    dataUsage: false
  });
  function togglePermission(key) {
    if (isSaving) return;
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  }
  async function saveAndNavigate(consent) {
    setIsSaving(true);
    try {
      await saveConsent.mutateAsync(consent);
    } catch (_err) {
    } finally {
      setIsSaving(false);
      await navigate({ to: "/dashboard" });
    }
  }
  function handleAllowAll() {
    return saveAndNavigate({
      camera: true,
      location: true,
      dataUsage: true,
      timestamp: Date.now()
    });
  }
  function handleAllowSelected() {
    return saveAndNavigate({
      ...permissions,
      timestamp: Date.now()
    });
  }
  function handleDenyAll() {
    return saveAndNavigate({
      camera: false,
      location: false,
      dataUsage: false,
      timestamp: Date.now()
    });
  }
  const anyGranted = Object.values(permissions).some(Boolean);
  const allGranted = Object.values(permissions).every(Boolean);
  const isDisabled = isSaving || saveConsent.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden",
      style: {
        background: "linear-gradient(145deg, oklch(0.95 0.025 230) 0%, oklch(0.97 0.015 200) 50%, oklch(0.96 0.018 150) 100%)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-10 right-10 w-64 h-64 rounded-full opacity-25 blur-3xl pointer-events-none",
            style: { background: "oklch(0.78 0.1 150)" },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-10 left-10 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none",
            style: { background: "oklch(0.78 0.1 230)" },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            className: "relative w-full max-w-md",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-clinical overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-1.5 w-full",
                  style: {
                    background: "linear-gradient(90deg, oklch(0.57 0.12 230), oklch(0.6 0.12 150))"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-7 flex flex-col gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.57 0.12 230 / 0.12), oklch(0.6 0.12 150 / 0.12))",
                        border: "1px solid oklch(0.88 0.04 230)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-7 h-7 text-primary" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: "Your Privacy Matters" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 leading-relaxed", children: "Choose which permissions to allow for the best experience." })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-start gap-3 rounded-xl px-4 py-3 border",
                    style: {
                      background: "oklch(0.97 0.015 150 / 0.5)",
                      borderColor: "oklch(0.88 0.06 150)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 mt-0.5 shrink-0 text-accent" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
                        "Your image and symptom data will be used",
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "only for AI-based analysis" }),
                        ". Data will not be shared without your explicit permission."
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", "data-ocid": "permissions-list", children: PERMISSIONS.map((perm) => {
                  const Icon = perm.icon;
                  const isGranted = permissions[perm.key];
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => togglePermission(perm.key),
                      disabled: isDisabled,
                      className: "w-full text-left flex items-start gap-4 rounded-xl px-4 py-4 border transition-smooth cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60 disabled:cursor-not-allowed",
                      style: {
                        background: isGranted ? "oklch(0.97 0.018 150 / 0.5)" : "oklch(0.985 0.005 230)",
                        borderColor: isGranted ? "oklch(0.78 0.1 150)" : "oklch(0.92 0.006 230)"
                      },
                      "aria-label": `Toggle ${perm.label}`,
                      "aria-pressed": isGranted,
                      "data-ocid": `permission-toggle-${perm.key}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: `w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${perm.iconBg}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${perm.iconColor}` })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-semibold text-foreground", children: perm.label }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: perm.description })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "w-6 h-6 rounded-full shrink-0 mt-0.5 flex items-center justify-center border-2 transition-smooth",
                            style: {
                              background: isGranted ? "oklch(0.6 0.12 150)" : "transparent",
                              borderColor: isGranted ? "oklch(0.6 0.12 150)" : "oklch(0.78 0.008 230)"
                            },
                            children: isGranted && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-white" })
                          }
                        )
                      ]
                    },
                    perm.key
                  );
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      className: "w-full h-12 text-base font-display font-semibold rounded-xl transition-smooth text-white",
                      onClick: handleAllowAll,
                      disabled: isDisabled,
                      "data-ocid": "allow-all-btn",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.6 0.12 150), oklch(0.62 0.1 160))"
                      },
                      children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                        "Saving…"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 mr-2" }),
                        "Allow All Permissions"
                      ] })
                    }
                  ),
                  anyGranted && !allGranted && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      className: "w-full h-11 text-sm font-display font-medium rounded-xl transition-smooth border-primary/40 text-primary hover:bg-primary/5",
                      onClick: handleAllowSelected,
                      disabled: isDisabled,
                      "data-ocid": "allow-selected-btn",
                      children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                        "Saving…"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 mr-2" }),
                        "Allow Selected Only"
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      className: "w-full h-11 text-sm font-display font-medium rounded-xl transition-smooth",
                      onClick: handleDenyAll,
                      disabled: isDisabled,
                      "data-ocid": "deny-all-btn",
                      children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                        "Continuing…"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mr-2" }),
                        "Deny All & Continue with Limited Access"
                      ] })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground", children: "You can change these permissions anytime from your account settings." })
              ] })
            ] })
          }
        )
      ]
    }
  );
}
export {
  PermissionsPage as default
};
