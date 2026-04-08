import { Activity } from "lucide-react";
import React from "react";

interface DermaLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const sizeMap = {
  sm: { icon: 18, text: "text-base", wrapper: "gap-1.5" },
  md: { icon: 24, text: "text-xl", wrapper: "gap-2" },
  lg: { icon: 32, text: "text-2xl", wrapper: "gap-2.5" },
};

export function DermaLogo({ size = "md", showText = true }: DermaLogoProps) {
  const s = sizeMap[size];

  return (
    <div
      className={`flex items-center ${s.wrapper} select-none`}
      aria-label="DermaAI"
    >
      {/* Logo icon — stethoscope/pulse icon in a rounded medical badge */}
      <div
        className="flex items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm"
        style={{
          width: s.icon + 12,
          height: s.icon + 12,
          minWidth: s.icon + 12,
        }}
      >
        <Activity size={s.icon - 4} strokeWidth={2.5} />
      </div>

      {showText && (
        <span
          className={`font-display font-bold ${s.text} leading-none tracking-tight`}
        >
          <span className="text-foreground">Derma</span>
          <span className="text-primary">AI</span>
        </span>
      )}
    </div>
  );
}
