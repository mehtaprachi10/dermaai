import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  ChevronRight,
  Clock,
  ExternalLink,
  MapPin,
  Navigation,
  Phone,
  Plus,
  ScanSearch,
  Star,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useGetAnalyses } from "../hooks/use-backend";
import { useDoctors } from "../hooks/use-doctors";
import type { DoctorInfo, SkinAnalysis } from "../types";

/* ─── helpers ─────────────────────────────────────────────────── */

function shortPrincipal(id: string): string {
  if (id.length <= 12) return id;
  return `${id.slice(0, 5)}…${id.slice(-5)}`;
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function confidenceCls(c: number): string {
  if (c >= 75)
    return "bg-destructive/10 text-destructive border-destructive/20";
  if (c >= 50) return "bg-warning/15 text-foreground border-warning/30";
  return "bg-accent/10 text-accent border-accent/20";
}

/* ─── analysis card ────────────────────────────────────────────── */

function AnalysisCard({ analysis }: { analysis: SkinAnalysis }) {
  return (
    <div
      className="card-medical p-4 flex gap-3 items-start"
      data-ocid="analysis-list-item"
    >
      {analysis.imageUrl ? (
        <img
          src={analysis.imageUrl}
          alt="Skin scan"
          className="w-16 h-16 rounded-lg object-cover shrink-0 bg-muted"
        />
      ) : (
        <div className="w-16 h-16 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
          <Activity size={22} className="text-primary/40" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="font-display font-semibold text-sm text-foreground truncate">
            {analysis.predictedDisease}
          </p>
          <Badge
            className={`shrink-0 text-xs font-bold border ${confidenceCls(analysis.confidence)}`}
            data-ocid="confidence-badge"
          >
            {analysis.confidence}%
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
          <Clock size={10} />
          {formatDate(analysis.timestamp)}
        </p>
        {analysis.symptoms.length > 0 && (
          <p className="text-xs text-muted-foreground line-clamp-1">
            {analysis.symptoms.slice(0, 3).join(", ")}
          </p>
        )}
        <Link
          to="/analysis/$id"
          params={{ id: analysis.analysisId }}
          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          data-ocid="view-report-btn"
        >
          View Report <ChevronRight size={12} />
        </Link>
      </div>
    </div>
  );
}

/* ─── loading skeletons ─────────────────────────────────────────── */

function AnalysisCardSkeleton() {
  return (
    <div className="card-medical p-4 flex gap-3">
      <Skeleton className="w-16 h-16 rounded-lg shrink-0" />
      <div className="flex-1 flex flex-col gap-2 pt-1">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-44" />
        <Skeleton className="h-3 w-16 mt-1" />
      </div>
    </div>
  );
}

/* ─── empty state ───────────────────────────────────────────────── */

function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 gap-5 text-center"
      data-ocid="empty-state"
    >
      <div className="w-20 h-20 rounded-2xl bg-primary/5 flex items-center justify-center">
        <ScanSearch size={36} className="text-primary/40" />
      </div>
      <div>
        <p className="font-display font-semibold text-foreground text-base mb-1.5">
          No analyses yet
        </p>
        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
          Start your first skin scan to receive an AI-powered diagnosis and
          personalised care advice.
        </p>
      </div>
      <Link to="/new-analysis">
        <Button className="gap-2" data-ocid="start-first-scan-btn">
          <Plus size={16} />
          Start Your First Analysis
        </Button>
      </Link>
    </div>
  );
}

/* ─── doctor card ───────────────────────────────────────────────── */

function DoctorCard({ doctor }: { doctor: DoctorInfo }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${doctor.address}, ${doctor.city}`,
  )}`;

  return (
    <div className="card-medical p-4" data-ocid="doctor-card">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <UserCheck size={16} className="text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-display font-semibold text-sm text-foreground truncate">
              {doctor.name}
            </p>
            <Badge className="mt-0.5 text-xs bg-accent/10 text-accent border-accent/20 border">
              {doctor.specialty}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          <Star size={11} className="text-warning fill-warning" />
          <span className="text-xs font-medium text-foreground">
            {doctor.rating}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 mb-3">
        <p className="text-xs text-muted-foreground flex items-start gap-1.5">
          <MapPin size={11} className="mt-0.5 shrink-0 text-primary/60" />
          <span>
            {doctor.address}, {doctor.city}
            {doctor.distanceKm !== undefined && (
              <span className="ml-1.5 font-medium text-primary">
                · {doctor.distanceKm} km
              </span>
            )}
          </span>
        </p>
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Phone size={11} className="shrink-0 text-primary/60" />
          {doctor.phone}
        </p>
      </div>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
        data-ocid="get-directions-btn"
      >
        <Navigation size={12} />
        Get Directions
        <ExternalLink size={10} />
      </a>
    </div>
  );
}

/* ─── doctors section ───────────────────────────────────────────── */

type LocationState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "denied" }
  | { status: "ready"; lat: number; lon: number };

function NearbyDoctorsSection() {
  const [locationState, setLocationState] = useState<LocationState>({
    status: "idle",
  });
  const { getNearbyDoctors } = useDoctors();

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocationState({ status: "denied" });
      return;
    }
    setLocationState({ status: "loading" });
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setLocationState({
          status: "ready",
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        }),
      () => setLocationState({ status: "denied" }),
      { timeout: 8000 },
    );
  }, []);

  const doctors =
    locationState.status === "ready"
      ? getNearbyDoctors(locationState.lat, locationState.lon, 5)
      : locationState.status === "denied"
        ? getNearbyDoctors(undefined, undefined, 5)
        : [];

  return (
    <section className="mt-8" data-ocid="doctors-section">
      <div className="flex items-center gap-2 mb-4">
        <MapPin size={16} className="text-primary" />
        <h2 className="font-display font-semibold text-base text-foreground">
          Find Dermatologists Near You
        </h2>
      </div>

      {locationState.status === "loading" && (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card-medical p-4">
              <div className="flex gap-3 mb-3">
                <Skeleton className="w-9 h-9 rounded-full shrink-0" />
                <div className="flex-1 flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-3 w-full mb-1.5" />
              <Skeleton className="h-3 w-28" />
            </div>
          ))}
        </div>
      )}

      {locationState.status === "denied" && (
        <div
          className="rounded-lg border border-border bg-muted/40 p-6 flex flex-col items-center gap-3 text-center mb-4"
          data-ocid="location-denied-msg"
        >
          <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center">
            <MapPin size={22} className="text-primary/40" />
          </div>
          <p className="text-sm text-muted-foreground">
            Enable location to see nearby dermatologists.
            <br />
            Showing top-rated doctors in your region instead.
          </p>
        </div>
      )}

      {(locationState.status === "ready" ||
        locationState.status === "denied") && (
        <div className="grid gap-3 sm:grid-cols-2" data-ocid="doctors-list">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </section>
  );
}

/* ─── stat card ─────────────────────────────────────────────────── */

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  isLoading: boolean;
  accent?: boolean;
}

function StatCard({
  icon: Icon,
  label,
  value,
  isLoading,
  accent,
}: StatCardProps) {
  return (
    <div
      className={`card-medical p-3 flex flex-col gap-1 ${accent ? "border-primary/30 bg-primary/5" : ""}`}
    >
      <Icon
        size={15}
        className={accent ? "text-primary" : "text-muted-foreground"}
      />
      {isLoading ? (
        <Skeleton className="h-6 w-12 mt-0.5" />
      ) : (
        <p className="font-display font-bold text-xl text-foreground leading-none">
          {value}
        </p>
      )}
      <p className="text-xs text-muted-foreground leading-tight">{label}</p>
    </div>
  );
}

/* ─── main page ─────────────────────────────────────────────────── */

export default function DashboardPage() {
  const { identity } = useInternetIdentity();
  const { data: analyses, isLoading } = useGetAnalyses();
  const navigate = useNavigate();

  const recentAnalyses: SkinAnalysis[] = (analyses ?? []).slice(0, 20);
  const totalScans = recentAnalyses.length;
  const latest = recentAnalyses[0];
  const latestDisease = latest?.predictedDisease ?? "–";
  const lastDate = latest ? formatDate(latest.timestamp) : "–";

  const principalText = identity
    ? shortPrincipal(identity.getPrincipal().toText())
    : "";

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-12">
      {/* ── welcome header ── */}
      <div className="flex items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Welcome back
          </h1>
          {principalText && (
            <p className="text-xs text-muted-foreground mt-0.5 font-mono">
              {principalText}
            </p>
          )}
          <p className="text-sm text-muted-foreground mt-0.5">
            Your skin health overview
          </p>
        </div>
        <Button
          onClick={() => navigate({ to: "/new-analysis" })}
          className="gap-1.5 shrink-0"
          data-ocid="new-scan-btn"
        >
          <Plus size={15} />
          New Scan
        </Button>
      </div>

      {/* ── stats row ── */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <StatCard
          icon={ScanSearch}
          label="Total Analyses"
          value={totalScans}
          isLoading={isLoading}
          accent
        />
        <StatCard
          icon={Activity}
          label="Recent Finding"
          value={
            isLoading ? "–" : totalScans ? latestDisease.split(" ")[0] : "–"
          }
          isLoading={isLoading}
        />
        <StatCard
          icon={TrendingUp}
          label="Last Analysis"
          value={isLoading ? "–" : totalScans ? lastDate : "–"}
          isLoading={isLoading}
        />
      </div>

      {/* ── analysis history ── */}
      <section data-ocid="history-section">
        <h2 className="font-display font-semibold text-base text-foreground mb-3 flex items-center gap-2">
          <Clock size={15} className="text-muted-foreground" />
          Analysis History
        </h2>

        {isLoading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <AnalysisCardSkeleton key={i} />
            ))}
          </div>
        ) : recentAnalyses.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-3" data-ocid="analyses-list">
            {recentAnalyses.map((analysis) => (
              <AnalysisCard key={analysis.analysisId} analysis={analysis} />
            ))}
          </div>
        )}
      </section>

      {/* ── nearby doctors ── */}
      <NearbyDoctorsSection />
    </div>
  );
}
