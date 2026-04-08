import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import { Activity, Loader2, Shield, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useGetConsent } from "../hooks/use-backend";

export default function LoginPage() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: consent } = useGetConsent();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (identity) {
      if (
        consent &&
        (consent.camera || consent.location || consent.dataUsage)
      ) {
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

  const isAuthenticating =
    isLoading || loginStatus === "logging-in" || loginStatus === "initializing";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, oklch(0.95 0.025 230) 0%, oklch(0.97 0.015 200) 50%, oklch(0.96 0.018 150) 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.8 0.08 230)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.82 0.1 150)" }}
        aria-hidden="true"
      />

      {/* Single entrance animation on the card — no nested y-shifts to prevent shaking */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full max-w-sm"
      >
        <div className="bg-card rounded-2xl border border-border shadow-clinical overflow-hidden">
          {/* Top accent strip */}
          <div
            className="h-1.5 w-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.57 0.12 230), oklch(0.6 0.12 150))",
            }}
          />

          <div className="px-8 py-8 flex flex-col items-center gap-6">
            {/* Logo + Brand */}
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.57 0.12 230), oklch(0.6 0.12 150))",
                }}
              >
                <Activity className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-display font-bold text-foreground tracking-tight">
                  Derma<span className="text-primary">AI</span>
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Your AI-Powered Skin Health Assistant
                </p>
              </div>
            </div>

            {/* Sparkle divider */}
            <div className="w-full flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <Sparkles className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Welcome copy */}
            <div className="text-center space-y-1.5">
              <h2 className="text-lg font-display font-semibold text-foreground">
                Welcome back
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sign in to access your skin health dashboard, past analyses, and
                personalised doctor recommendations.
              </p>
            </div>

            {/* Login button */}
            <div className="w-full">
              <Button
                type="button"
                className="w-full h-12 text-base font-display font-semibold rounded-xl transition-smooth text-white"
                onClick={handleLogin}
                disabled={isAuthenticating}
                data-ocid="login-btn"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.57 0.12 230), oklch(0.62 0.1 220))",
                }}
              >
                {isAuthenticating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  "Sign in with Internet Identity"
                )}
              </Button>
            </div>

            {/* Security reassurance */}
            <div
              className="flex items-start gap-3 rounded-xl px-4 py-3 border w-full"
              style={{
                background: "oklch(0.97 0.015 230 / 0.6)",
                borderColor: "oklch(0.88 0.04 230)",
              }}
            >
              <Shield className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground">
                  Secure login with Internet Identity
                </span>{" "}
                — no password needed. Your identity is protected by
                cryptographic authentication.
              </p>
            </div>
          </div>

          {/* Footer note */}
          <div
            className="px-8 py-4 border-t border-border text-center"
            style={{ background: "oklch(0.97 0.006 230)" }}
          >
            <p className="text-xs text-muted-foreground">
              By signing in, you agree to our Privacy Policy and Terms of Use.
            </p>
          </div>
        </div>

        {/* Tagline below card */}
        <p className="text-center text-xs text-muted-foreground mt-5">
          AI-powered dermatology analysis · Always private · Never shared
        </p>
      </motion.div>
    </div>
  );
}
