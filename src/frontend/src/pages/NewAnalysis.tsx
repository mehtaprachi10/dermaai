import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  AlertTriangle,
  Camera,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Droplets,
  FlipHorizontal,
  Heart,
  ImagePlus,
  Loader2,
  Printer,
  RefreshCw,
  RotateCcw,
  Save,
  Sparkles,
  Square,
  TrendingUp,
  Upload,
  X,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useSaveAnalysis } from "../hooks/use-backend";
import { useSkinPrediction } from "../hooks/use-skin-prediction";
import type { AnalysisStep, DiseaseResult, SymptomData } from "../types";
import { AGE_GROUP_OPTIONS, DURATION_OPTIONS } from "../types";

const STEP_LABELS: Record<AnalysisStep, string> = {
  permissions: "Permissions",
  upload: "Upload Image",
  symptoms: "Symptoms",
  results: "Results",
  doctors: "Doctors",
};

const SYMPTOM_FIELDS: {
  key: keyof Omit<SymptomData, "duration" | "ageGroup">;
  label: string;
  Icon: React.FC<{ size?: number; className?: string }>;
}[] = [
  { key: "itching", label: "Itching", Icon: Zap },
  { key: "pain", label: "Pain", Icon: AlertCircle },
  { key: "redness", label: "Redness", Icon: Heart },
  { key: "swelling", label: "Swelling", Icon: TrendingUp },
  { key: "drySkin", label: "Dry Skin", Icon: Droplets },
];

function StepIndicator({ current }: { current: AnalysisStep }) {
  const activeSteps: AnalysisStep[] = ["upload", "symptoms", "results"];
  const currentIdx = activeSteps.indexOf(current);

  return (
    <div className="flex items-center gap-2 justify-center mb-8">
      {activeSteps.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-smooth ${
              i === currentIdx
                ? "bg-primary text-primary-foreground"
                : i < currentIdx
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {i < currentIdx ? "✓" : i + 1}
          </div>
          <span
            className={`text-xs font-medium hidden sm:block ${
              i === currentIdx ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {STEP_LABELS[step]}
          </span>
          {i < activeSteps.length - 1 && (
            <div
              className={`w-8 h-0.5 ${i < currentIdx ? "bg-accent" : "bg-border"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Native camera hook (browser getUserMedia) ────────────────────────────────
interface NativeCameraState {
  isActive: boolean;
  isLoading: boolean;
  error: string | null;
}

// ─── Camera live-preview panel ────────────────────────────────────────────────
function CameraPanel({
  onCapture,
  onClose,
}: {
  onCapture: (file: File) => void;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [camState, setCamState] = useState<NativeCameraState>({
    isActive: false,
    isLoading: false,
    error: null,
  });
  const [facingMode, setFacingMode] = useState<"environment" | "user">(
    "environment",
  );

  const startCamera = async (mode: "environment" | "user" = facingMode) => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCamState({
        isActive: false,
        isLoading: false,
        error: "Camera is not supported in this browser.",
      });
      return;
    }
    setCamState({ isActive: false, isLoading: true, error: null });
    try {
      if (streamRef.current) {
        for (const track of streamRef.current.getTracks()) track.stop();
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: mode }, width: { ideal: 1280 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCamState({ isActive: true, isLoading: false, error: null });
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Could not access camera. Check permissions.";
      setCamState({ isActive: false, isLoading: false, error: msg });
    }
  };

  const stopStream = () => {
    if (streamRef.current) {
      for (const track of streamRef.current.getTracks()) track.stop();
      streamRef.current = null;
    }
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          toast.error("Failed to capture photo. Please try again.");
          return;
        }
        const file = new File([blob], `skin-capture-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });
        stopStream();
        onCapture(file);
      },
      "image/jpeg",
      0.92,
    );
  };

  const handleSwitchCamera = () => {
    const next = facingMode === "environment" ? "user" : "environment";
    setFacingMode(next);
    startCamera(next);
  };

  const handleClose = () => {
    stopStream();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-background/98 flex flex-col"
      data-ocid="camera-panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border shadow-sm">
        <h3 className="font-display font-bold text-foreground text-base">
          Camera
        </h3>
        <button
          type="button"
          onClick={handleClose}
          className="p-2 rounded-full hover:bg-muted transition-smooth"
          aria-label="Close camera"
          data-ocid="camera-close-btn"
        >
          <X size={20} className="text-foreground" />
        </button>
      </div>

      {/* Viewport */}
      <div className="flex-1 relative flex items-center justify-center bg-foreground/5 overflow-hidden">
        {camState.error ? (
          <div className="text-center p-6">
            <Camera size={40} className="mx-auto mb-3 text-destructive" />
            <p className="font-semibold text-foreground mb-1">Camera error</p>
            <p className="text-sm text-muted-foreground mb-4">
              {camState.error}
            </p>
            <Button
              variant="outline"
              onClick={() => startCamera()}
              className="gap-2"
            >
              <RefreshCw size={14} />
              Retry
            </Button>
          </div>
        ) : (
          <>
            {camState.isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                  <p className="text-sm text-muted-foreground">
                    Starting camera…
                  </p>
                </div>
              </div>
            )}
            <video
              ref={videoRef}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              playsInline
              muted
            />
            <canvas ref={canvasRef} className="hidden" />
            {/* Framing guide overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-56 h-56 border-2 border-primary/60 rounded-2xl" />
            </div>
            {camState.isActive && (
              <p className="absolute bottom-2 left-0 right-0 text-center text-xs text-primary-foreground/90 bg-primary/60 mx-auto w-fit px-3 py-1 rounded-full pointer-events-none">
                Center the affected area
              </p>
            )}
          </>
        )}
      </div>

      {/* Controls */}
      {!camState.error && (
        <div className="bg-card border-t border-border px-6 py-5 flex items-center justify-between gap-4">
          {!camState.isActive ? (
            <div className="w-full flex justify-center">
              <Button
                onClick={() => startCamera()}
                disabled={camState.isLoading}
                className="gap-2 min-w-[160px]"
                data-ocid="start-camera-btn"
              >
                {camState.isLoading ? (
                  <span className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                ) : (
                  <Camera size={16} />
                )}
                Start Camera
              </Button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={handleSwitchCamera}
                disabled={camState.isLoading}
                className="w-11 h-11 rounded-full bg-muted flex items-center justify-center transition-smooth hover:bg-muted/80 disabled:opacity-40"
                aria-label="Switch camera"
                data-ocid="switch-camera-btn"
              >
                <FlipHorizontal size={18} className="text-foreground" />
              </button>

              {/* Large 80px+ capture button */}
              <button
                type="button"
                onClick={handleCapture}
                disabled={camState.isLoading || !camState.isActive}
                className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg transition-smooth hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Capture photo"
                data-ocid="capture-photo-btn"
              >
                <Camera size={32} className="text-primary-foreground" />
              </button>

              <div className="w-11" aria-hidden="true" />
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Upload progress ──────────────────────────────────────────────────────────
function UploadProgressBar({ progress }: { progress: number }) {
  return (
    <div
      className="w-full"
      aria-label={`Upload progress: ${Math.round(progress)}%`}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-muted-foreground">Uploading image…</span>
        <span className="text-xs font-semibold text-primary">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

// ─── Step 1: Image Capture ────────────────────────────────────────────────────
function UploadStep({
  imagePreview,
  onImageSelected,
  onNext,
}: {
  imagePreview: string | null;
  onImageSelected: (url: string) => void;
  onNext: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    setIsUploading(true);
    setUploadProgress(0);

    // Read file as data URL for local preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) onImageSelected(e.target.result as string);
    };
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        setUploadProgress(Math.round((e.loaded / e.total) * 100));
      }
    };
    reader.onloadend = () => {
      setIsUploading(false);
      setUploadProgress(null);
    };
    reader.onerror = () => {
      toast.error("Failed to read image file.");
      setIsUploading(false);
      setUploadProgress(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  return (
    <>
      {showCamera && (
        <CameraPanel
          onCapture={(file) => {
            setShowCamera(false);
            uploadFile(file);
          }}
          onClose={() => setShowCamera(false)}
        />
      )}

      <div className="flex flex-col gap-6">
        {/* Heading */}
        <div>
          <h2 className="font-display text-xl font-bold text-foreground mb-1">
            Capture Skin Image
          </h2>
          <p className="text-sm text-muted-foreground">
            Take a clear photo of the affected area in good lighting.
          </p>
        </div>

        {/* Upload progress */}
        {isUploading && uploadProgress !== null && (
          <UploadProgressBar progress={uploadProgress} />
        )}

        {/* Image preview */}
        {imagePreview ? (
          <div className="relative rounded-2xl overflow-hidden border-2 border-accent/40 shadow-clinical">
            <img
              src={imagePreview}
              alt="Selected skin area"
              className="w-full h-64 object-cover"
            />
            {!isUploading && (
              <button
                type="button"
                onClick={() => onImageSelected("")}
                className="absolute top-3 right-3 p-2 bg-card/90 rounded-full shadow-sm hover:bg-destructive/10 transition-smooth"
                aria-label="Remove image"
                data-ocid="remove-image-btn"
              >
                <RotateCcw size={16} className="text-foreground" />
              </button>
            )}
            {isUploading && (
              <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                <Loader2 size={28} className="animate-spin text-primary" />
              </div>
            )}
          </div>
        ) : !isUploading ? (
          /* Drop zone */
          <button
            type="button"
            className="border-2 border-dashed border-border rounded-2xl p-8 w-full flex flex-col items-center gap-4 bg-muted/20 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-smooth"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            data-ocid="image-drop-zone"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <ImagePlus size={28} className="text-primary" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground text-sm">
                Drop image here or tap to browse
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG, HEIC · Up to 10 MB
              </p>
            </div>
          </button>
        ) : (
          /* Upload skeleton while no preview yet */
          <div className="rounded-2xl border border-border bg-muted/20 h-64 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              <p className="text-sm text-muted-foreground">Processing…</p>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadFile(file);
            e.target.value = "";
          }}
          data-ocid="image-file-input"
        />

        {/* Camera + Gallery action row */}
        <div className="flex gap-5 items-center justify-center py-2">
          {/* Large circular camera button (80px) */}
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => setShowCamera(true)}
              disabled={isUploading}
              className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-smooth hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Open camera"
              data-ocid="open-camera-btn"
            >
              <Camera size={34} />
            </button>
            <span className="text-xs text-muted-foreground font-medium">
              Camera
            </span>
          </div>

          <div className="w-px h-14 bg-border" aria-hidden="true" />

          {/* Upload from gallery */}
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-20 h-20 rounded-2xl border-2 border-border bg-card text-foreground flex items-center justify-center shadow-sm transition-smooth hover:border-primary/50 hover:bg-primary/5 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Upload from gallery"
              data-ocid="upload-gallery-btn"
            >
              <Upload size={28} />
            </button>
            <span className="text-xs text-muted-foreground font-medium">
              Gallery
            </span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          💡 Center the affected area and ensure good lighting for best AI
          results
        </p>

        <Button
          onClick={onNext}
          disabled={!imagePreview || isUploading}
          className="w-full gap-2"
          data-ocid="upload-next-btn"
        >
          Continue to Symptoms
          <ChevronRight size={16} />
        </Button>
      </div>
    </>
  );
}

// ─── Step 2: Symptoms ────────────────────────────────────────────────────────
function SymptomsStep({
  symptoms,
  onChange,
  onNext,
  onBack,
  isAnalyzing,
}: {
  symptoms: SymptomData;
  onChange: (s: SymptomData) => void;
  onNext: () => void;
  onBack: () => void;
  isAnalyzing: boolean;
}) {
  const toggle = (key: keyof Omit<SymptomData, "duration" | "ageGroup">) => {
    onChange({ ...symptoms, [key]: !symptoms[key] });
  };

  const hasSymptom =
    symptoms.itching ||
    symptoms.pain ||
    symptoms.redness ||
    symptoms.swelling ||
    symptoms.drySkin;

  const canContinue = hasSymptom && symptoms.duration && symptoms.ageGroup;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground mb-1">
          Describe Your Symptoms
        </h2>
        <p className="text-sm text-muted-foreground">
          Select all symptoms that apply. At least one required.
        </p>
      </div>

      {/* Symptom checkboxes */}
      <div className="grid grid-cols-2 gap-3" data-ocid="symptoms-grid">
        {SYMPTOM_FIELDS.map(({ key, label, Icon }) => (
          <button
            type="button"
            key={key}
            onClick={() => toggle(key)}
            className={`flex items-center gap-2.5 p-3 rounded-xl border text-sm font-medium transition-smooth text-left ${
              symptoms[key]
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-primary/5"
            }`}
            data-ocid={`symptom-${key}`}
          >
            {symptoms[key] ? (
              <CheckSquare size={18} className="shrink-0 text-primary" />
            ) : (
              <Square size={18} className="shrink-0 text-muted-foreground" />
            )}
            <Icon size={15} className="shrink-0 opacity-70" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {!hasSymptom && (
        <p className="text-xs text-destructive flex items-center gap-1.5">
          <AlertTriangle size={12} />
          Please select at least one symptom to continue.
        </p>
      )}

      {/* Duration and age group */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="duration" className="text-sm font-medium">
            Duration of Symptoms
          </Label>
          <Select
            value={symptoms.duration}
            onValueChange={(v) => onChange({ ...symptoms, duration: v })}
          >
            <SelectTrigger id="duration" data-ocid="duration-select">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {DURATION_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="age-group" className="text-sm font-medium">
            Age Group
          </Label>
          <Select
            value={symptoms.ageGroup}
            onValueChange={(v) => onChange({ ...symptoms, ageGroup: v })}
          >
            <SelectTrigger id="age-group" data-ocid="age-group-select">
              <SelectValue placeholder="Select age group" />
            </SelectTrigger>
            <SelectContent>
              {AGE_GROUP_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="gap-2"
          disabled={isAnalyzing}
          data-ocid="symptoms-back-btn"
        >
          <ChevronLeft size={16} />
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!canContinue || isAnalyzing}
          className="flex-1 gap-2"
          data-ocid="analyze-btn"
        >
          {isAnalyzing ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Analyzing…
            </>
          ) : (
            <>
              <Sparkles size={16} />
              Analyze Skin
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// ─── Confidence Bar ──────────────────────────────────────────────────────────
function ConfidenceBar({
  disease,
  confidence,
  isTop,
}: {
  disease: string;
  confidence: number;
  isTop: boolean;
}) {
  return (
    <div className="flex flex-col gap-1" data-ocid="confidence-bar-row">
      <div className="flex items-center justify-between gap-2">
        <span
          className={`text-sm truncate min-w-0 ${isTop ? "font-semibold text-foreground" : "text-muted-foreground"}`}
        >
          {disease}
        </span>
        <span
          className={`text-xs font-bold shrink-0 ${isTop ? "text-primary" : "text-muted-foreground"}`}
        >
          {confidence}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${isTop ? "bg-primary" : "bg-muted-foreground/40"}`}
          style={{ width: `${confidence}%` }}
        />
      </div>
    </div>
  );
}

// ─── Step 3: Results ─────────────────────────────────────────────────────────
function ResultsStep({
  results,
  symptoms,
  imagePreview,
  onBack,
  onSave,
  isSaving,
  savedId,
  onNavigateToReport,
}: {
  results: DiseaseResult[];
  symptoms: SymptomData;
  imagePreview: string | null;
  onBack: () => void;
  onSave: () => void;
  isSaving: boolean;
  savedId: string | null;
  onNavigateToReport: () => void;
}) {
  const top = results[0];

  const symptomsSelected = [
    symptoms.itching && "Itching",
    symptoms.pain && "Pain",
    symptoms.redness && "Redness",
    symptoms.swelling && "Swelling",
    symptoms.drySkin && "Dry Skin",
  ].filter(Boolean) as string[];

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-display text-xl font-bold text-foreground mb-1">
          AI Analysis Results
        </h2>
        <p className="text-xs text-muted-foreground">
          Based on your image and reported symptoms.
        </p>
      </div>

      {/* AI Disclaimer — prominent */}
      <div
        className="flex gap-3 p-4 rounded-xl border-2 border-warning/40 bg-warning/8"
        role="alert"
        data-ocid="ai-disclaimer"
      >
        <AlertTriangle
          size={20}
          className="text-warning-foreground shrink-0 mt-0.5"
        />
        <div>
          <p className="text-sm font-semibold text-foreground mb-0.5">
            AI Disclaimer
          </p>
          <p className="text-xs text-foreground/80 leading-relaxed">
            This result is generated by an AI system and may not always be
            accurate. It should not replace professional medical diagnosis.
            Please consult a certified dermatologist for confirmation.
          </p>
        </div>
      </div>

      {/* Primary prediction card */}
      <div className="card-medical p-5">
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Analyzed skin area"
            className="w-full h-40 object-cover rounded-lg mb-4 bg-muted"
          />
        )}

        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
              Possible condition
            </p>
            <h3 className="font-display text-2xl font-bold text-foreground leading-tight">
              {top.disease}
            </h3>
          </div>
          <div className="text-center shrink-0">
            <div className="bg-accent/15 border border-accent/30 rounded-xl px-3 py-2">
              <span className="text-accent text-2xl font-bold font-display block">
                {top.confidence}%
              </span>
              <span className="text-accent/80 text-[10px] font-medium uppercase tracking-wide">
                AI Confidence
              </span>
            </div>
          </div>
        </div>

        {symptomsSelected.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {symptomsSelected.map((s) => (
              <Badge
                key={s}
                variant="secondary"
                className="text-xs px-2 py-0.5"
              >
                {s}
              </Badge>
            ))}
          </div>
        )}

        <p className="text-sm text-foreground/80 leading-relaxed">
          {top.explanation}
        </p>
      </div>

      {/* Possible causes */}
      <div className="card-medical p-4">
        <h4 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
          Possible Causes
        </h4>
        <ul className="flex flex-col gap-2">
          {top.causes.map((cause) => (
            <li
              key={cause}
              className="text-sm text-foreground/80 flex items-start gap-2"
            >
              <span className="text-primary mt-1 shrink-0 text-xs">●</span>
              {cause}
            </li>
          ))}
        </ul>
      </div>

      {/* Treatment & Care */}
      <div className="card-medical p-4">
        <h4 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          Treatment &amp; Care Suggestions
        </h4>
        <ul className="flex flex-col gap-2">
          {top.treatments.map((t) => (
            <li
              key={t}
              className="text-sm text-foreground/80 flex items-start gap-2"
            >
              <span className="text-accent mt-0.5 shrink-0 font-bold">✓</span>
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* Lifestyle tips */}
      <div className="card-medical p-4">
        <h4 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 inline-block" />
          Lifestyle Suggestions
        </h4>
        <ul className="flex flex-col gap-2">
          {top.lifestyleTips.map((tip) => (
            <li
              key={tip}
              className="text-sm text-foreground/80 flex items-start gap-2"
            >
              <span className="text-primary/70 mt-0.5 shrink-0">→</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* When to consult */}
      <div className="p-4 rounded-xl bg-warning/8 border border-warning/30">
        <h4 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
          <AlertCircle size={14} className="text-warning-foreground shrink-0" />
          When to Consult a Doctor
        </h4>
        <p className="text-sm text-foreground/80 leading-relaxed">
          {top.doctorAdvice}
        </p>
      </div>

      {/* All confidence scores */}
      <div className="card-medical p-4">
        <h4 className="font-semibold text-foreground text-sm mb-4">
          All Condition Probabilities
        </h4>
        <div className="flex flex-col gap-3" data-ocid="confidence-bars">
          {results.map((r, i) => (
            <ConfidenceBar
              key={r.disease}
              disease={r.disease}
              confidence={r.confidence}
              isTop={i === 0}
            />
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-2.5">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onBack}
            className="gap-2"
            data-ocid="results-back-btn"
          >
            <ChevronLeft size={16} />
            Back
          </Button>
          <Button
            onClick={onSave}
            disabled={isSaving || !!savedId}
            className="flex-1 gap-2"
            data-ocid="save-analysis-btn"
          >
            {isSaving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving…
              </>
            ) : savedId ? (
              <>✓ Saved</>
            ) : (
              <>
                <Save size={16} />
                Save Analysis
              </>
            )}
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={() => window.print()}
            data-ocid="print-report-btn"
          >
            <Printer size={16} />
            Print Report
          </Button>
          {savedId && (
            <Button
              variant="outline"
              className="flex-1 gap-2 border-primary/30 text-primary hover:bg-primary/5"
              onClick={onNavigateToReport}
              data-ocid="view-report-btn"
            >
              View Full Report
              <ChevronRight size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function NewAnalysisPage() {
  const navigate = useNavigate();
  const { predict } = useSkinPrediction();
  const saveAnalysis = useSaveAnalysis();

  const [step, setStep] = useState<AnalysisStep>("upload");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState<SymptomData>({
    itching: false,
    pain: false,
    redness: false,
    swelling: false,
    drySkin: false,
    duration: "",
    ageGroup: "",
  });
  const [results, setResults] = useState<DiseaseResult[]>([]);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate brief analysis delay for UX feedback
    setTimeout(() => {
      const preds = predict(symptoms);
      setResults(preds);
      setIsAnalyzing(false);
      setStep("results");
    }, 1400);
  };

  const handleSave = async () => {
    if (!results.length) return;
    const top = results[0];
    const symptomLabels = [
      symptoms.itching && "Itching",
      symptoms.pain && "Pain",
      symptoms.redness && "Redness",
      symptoms.swelling && "Swelling",
      symptoms.drySkin && "Dry Skin",
    ].filter(Boolean) as string[];

    try {
      const analysisId = await saveAnalysis.mutateAsync({
        imageUrl: imagePreview ?? "",
        symptoms: symptomLabels,
        duration: symptoms.duration,
        ageGroup: symptoms.ageGroup,
        predictedDisease: top.disease,
        confidence: top.confidence,
        explanation: top.explanation,
        causes: top.causes,
        treatments: top.treatments,
        lifestyleTips: top.lifestyleTips,
        doctorAdvice: top.doctorAdvice,
      });
      setSavedId(analysisId);
      toast.success("Analysis saved to your dashboard!");
    } catch {
      toast.error("Could not save — please try again.");
    }
  };

  const handleNavigateToReport = () => {
    if (savedId) navigate({ to: "/analysis/$id", params: { id: savedId } });
    else navigate({ to: "/dashboard" });
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <StepIndicator current={step} />

      {step === "upload" && (
        <UploadStep
          imagePreview={imagePreview}
          onImageSelected={setImagePreview}
          onNext={() => setStep("symptoms")}
        />
      )}

      {step === "symptoms" && (
        <SymptomsStep
          symptoms={symptoms}
          onChange={setSymptoms}
          onNext={handleAnalyze}
          onBack={() => setStep("upload")}
          isAnalyzing={isAnalyzing}
        />
      )}

      {step === "results" && results.length > 0 && (
        <ResultsStep
          results={results}
          symptoms={symptoms}
          imagePreview={imagePreview}
          onBack={() => setStep("symptoms")}
          onSave={handleSave}
          isSaving={saveAnalysis.isPending}
          savedId={savedId}
          onNavigateToReport={handleNavigateToReport}
        />
      )}
    </div>
  );
}
