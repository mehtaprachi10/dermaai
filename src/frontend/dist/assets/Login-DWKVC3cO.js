import { c as createLucideIcon, u as useInternetIdentity, a as useNavigate, r as reactExports, j as jsxRuntimeExports, A as Activity, B as Button } from "./index-BFQ1Vwrd.js";
import { u as useGetConsent } from "./use-backend-Dp7m45z-.js";
import { m as motion } from "./proxy-BlNqbtJp.js";
import { S as Sparkles } from "./sparkles-DzD8M2NI.js";
import { L as LoaderCircle } from "./loader-circle-BdclsKOB.js";
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
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
function LoginPage() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: consent } = useGetConsent();
  const [isLoading, setIsLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (identity) {
      if (consent && (consent.camera || consent.location || consent.dataUsage)) {
        navigate({ to: "/dashboard" });
      } else {
        navigate({ to: "/permissions" });
      }
    }
  }, [identity, consent, navigate]);
  async function handleLogin() {
    setIsLoading(true);
    try {
      await login();
    } finally {
      setIsLoading(false);
    }
  }
  const isAuthenticating = isLoading || loginStatus === "logging-in" || loginStatus === "initializing";
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
            className: "absolute top-0 left-0 w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none",
            style: { background: "oklch(0.8 0.08 230)" },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none",
            style: { background: "oklch(0.82 0.1 150)" },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
            className: "relative w-full max-w-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-clinical overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-1.5 w-full",
                    style: {
                      background: "linear-gradient(90deg, oklch(0.57 0.12 230), oklch(0.6 0.12 150))"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-8 py-8 flex flex-col items-center gap-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-16 h-16 rounded-2xl flex items-center justify-center shadow-md",
                        style: {
                          background: "linear-gradient(135deg, oklch(0.57 0.12 230), oklch(0.6 0.12 150))"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-8 h-8 text-primary-foreground" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold text-foreground tracking-tight", children: [
                        "Derma",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "AI" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Your AI-Powered Skin Health Assistant" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-muted-foreground" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-display font-semibold text-foreground", children: "Welcome back" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "Sign in to access your skin health dashboard, past analyses, and personalised doctor recommendations." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      className: "w-full h-12 text-base font-display font-semibold rounded-xl transition-smooth text-white",
                      onClick: handleLogin,
                      disabled: isAuthenticating,
                      "data-ocid": "login-btn",
                      style: {
                        background: "linear-gradient(135deg, oklch(0.57 0.12 230), oklch(0.62 0.1 220))"
                      },
                      children: isAuthenticating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                        "Signing in…"
                      ] }) : "Sign in with Internet Identity"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-start gap-3 rounded-xl px-4 py-3 border w-full",
                      style: {
                        background: "oklch(0.97 0.015 230 / 0.6)",
                        borderColor: "oklch(0.88 0.04 230)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 mt-0.5 shrink-0 text-primary" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Secure login with Internet Identity" }),
                          " ",
                          "— no password needed. Your identity is protected by cryptographic authentication."
                        ] })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "px-8 py-4 border-t border-border text-center",
                    style: { background: "oklch(0.97 0.006 230)" },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "By signing in, you agree to our Privacy Policy and Terms of Use." })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-5", children: "AI-powered dermatology analysis · Always private · Never shared" })
            ]
          }
        )
      ]
    }
  );
}
export {
  LoginPage as default
};
