import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  Camera,
  Check,
  Database,
  Loader2,
  Lock,
  MapPin,
  ShieldCheck,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useSaveConsent } from "../hooks/use-backend";
import type { ConsentState } from "../types";

type ConsentKey = keyof Omit<ConsentState, "timestamp">;

interface PermissionItem {
  key: ConsentKey;
  icon: React.ElementType;
  label: string;
  description: string;
  iconColor: string;
  iconBg: string;
}

const PERMISSIONS: PermissionItem[] = [
  {
    key: "camera",
    icon: Camera,
    label: "Camera Access",
    description:
      "Capture photos of affected skin areas for AI analysis. Images are processed locally and never stored without your consent.",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    key: "location",
    icon: MapPin,
    label: "Location Access",
    description:
      "Use your GPS location to find nearby certified dermatologists and skin specialists in your area.",
    iconColor: "text-accent",
    iconBg: "bg-accent/10",
  },
  {
    key: "dataUsage",
    icon: Database,
    label: "Data Usage for AI Analysis",
    description:
      "Allow AI to analyze your image and symptoms to predict possible skin conditions. Results are shown only to you.",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
];

export default function PermissionsPage() {
  const navigate = useNavigate();
  const saveConsent = useSaveConsent();
  const [isSaving, setIsSaving] = useState(false);

  const [permissions, setPermissions] = useState<Record<ConsentKey, boolean>>({
    camera: false,
    location: false,
    dataUsage: false,
  });

  function togglePermission(key: ConsentKey) {
    if (isSaving) return;
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  async function saveAndNavigate(consent: ConsentState) {
    setIsSaving(true);
    try {
      // Best-effort save — navigation happens regardless of outcome
      await saveConsent.mutateAsync(consent);
    } catch (_err) {
      // Consent save failed (actor not ready, network error, etc.)
      // We still navigate forward so the user is never stuck.
      // The consent will be re-attempted or defaulted on next load.
    } finally {
      setIsSaving(false);
      // Always navigate — consent save is best-effort
      await navigate({ to: "/dashboard" });
    }
  }

  function handleAllowAll() {
    return saveAndNavigate({
      camera: true,
      location: true,
      dataUsage: true,
      timestamp: Date.now(),
    });
  }

  function handleAllowSelected() {
    return saveAndNavigate({
      ...permissions,
      timestamp: Date.now(),
    });
  }

  function handleDenyAll() {
    return saveAndNavigate({
      camera: false,
      location: false,
      dataUsage: false,
      timestamp: Date.now(),
    });
  }

  const anyGranted = Object.values(permissions).some(Boolean);
  const allGranted = Object.values(permissions).every(Boolean);
  const isDisabled = isSaving || saveConsent.isPending;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, oklch(0.95 0.025 230) 0%, oklch(0.97 0.015 200) 50%, oklch(0.96 0.018 150) 100%)",
      }}
    >
      {/* Background orbs */}
      <div
        className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.78 0.1 150)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-10 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.78 0.1 230)" }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full max-w-md"
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

          <div className="px-6 py-7 flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col items-center text-center gap-3">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.57 0.12 230 / 0.12), oklch(0.6 0.12 150 / 0.12))",
                  border: "1px solid oklch(0.88 0.04 230)",
                }}
              >
                <Lock className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-foreground">
                  Your Privacy Matters
                </h1>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Choose which permissions to allow for the best experience.
                </p>
              </div>
            </div>

            {/* Consent notice */}
            <div
              className="flex items-start gap-3 rounded-xl px-4 py-3 border"
              style={{
                background: "oklch(0.97 0.015 150 / 0.5)",
                borderColor: "oklch(0.88 0.06 150)",
              }}
            >
              <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your image and symptom data will be used{" "}
                <span className="font-medium text-foreground">
                  only for AI-based analysis
                </span>
                . Data will not be shared without your explicit permission.
              </p>
            </div>

            {/* Permission toggles */}
            <div className="flex flex-col gap-3" data-ocid="permissions-list">
              {PERMISSIONS.map((perm) => {
                const Icon = perm.icon;
                const isGranted = permissions[perm.key];
                return (
                  <button
                    key={perm.key}
                    type="button"
                    onClick={() => togglePermission(perm.key)}
                    disabled={isDisabled}
                    className="w-full text-left flex items-start gap-4 rounded-xl px-4 py-4 border transition-smooth cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background: isGranted
                        ? "oklch(0.97 0.018 150 / 0.5)"
                        : "oklch(0.985 0.005 230)",
                      borderColor: isGranted
                        ? "oklch(0.78 0.1 150)"
                        : "oklch(0.92 0.006 230)",
                    }}
                    aria-label={`Toggle ${perm.label}`}
                    aria-pressed={isGranted}
                    data-ocid={`permission-toggle-${perm.key}`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${perm.iconBg}`}
                    >
                      <Icon className={`w-5 h-5 ${perm.iconColor}`} />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-display font-semibold text-foreground">
                        {perm.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {perm.description}
                      </p>
                    </div>

                    {/* Toggle indicator */}
                    <div
                      className="w-6 h-6 rounded-full shrink-0 mt-0.5 flex items-center justify-center border-2 transition-smooth"
                      style={{
                        background: isGranted
                          ? "oklch(0.6 0.12 150)"
                          : "transparent",
                        borderColor: isGranted
                          ? "oklch(0.6 0.12 150)"
                          : "oklch(0.78 0.008 230)",
                      }}
                    >
                      {isGranted && (
                        <Check className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2.5">
              {/* Allow All */}
              <Button
                type="button"
                className="w-full h-12 text-base font-display font-semibold rounded-xl transition-smooth text-white"
                onClick={handleAllowAll}
                disabled={isDisabled}
                data-ocid="allow-all-btn"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.6 0.12 150), oklch(0.62 0.1 160))",
                }}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving…
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Allow All Permissions
                  </>
                )}
              </Button>

              {/* Allow Selected (shown when at least one toggled but not all) */}
              {anyGranted && !allGranted && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11 text-sm font-display font-medium rounded-xl transition-smooth border-primary/40 text-primary hover:bg-primary/5"
                  onClick={handleAllowSelected}
                  disabled={isDisabled}
                  data-ocid="allow-selected-btn"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving…
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Allow Selected Only
                    </>
                  )}
                </Button>
              )}

              {/* Deny All */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-11 text-sm font-display font-medium rounded-xl transition-smooth"
                onClick={handleDenyAll}
                disabled={isDisabled}
                data-ocid="deny-all-btn"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Continuing…
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4 mr-2" />
                    Deny All &amp; Continue with Limited Access
                  </>
                )}
              </Button>
            </div>

            {/* Fine print */}
            <p className="text-center text-xs text-muted-foreground">
              You can change these permissions anytime from your account
              settings.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
