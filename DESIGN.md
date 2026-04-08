# Design Brief

## Direction

**DermaAI** — Medical AI skin disease detection platform that feels trustworthy and human, not sterile.

## Tone

Clean clinical with warm approachability — minimal modern interface that communicates professional healthcare without cold institutional sterility.

## Differentiation

Large oversized circular camera button (80px+) as primary interaction focal point; bold AI disclaimer banner with warning color creates visual responsibility.

## Color Palette

| Token        | OKLCH            | Role                           |
| ------------ | ---------------- | ------------------------------ |
| background   | 0.98 0.008 230   | Off-white, cool undertone      |
| foreground   | 0.18 0.015 230   | Clinical dark, high contrast   |
| card         | 1.0 0.004 230    | Pure white, subtle depth       |
| primary      | 0.57 0.12 230    | Soft medical blue              |
| accent       | 0.60 0.12 150    | Soft healthcare green          |
| warning      | 0.75 0.12 75     | Soft orange (AI disclaimer)    |
| destructive  | 0.55 0.22 25     | Calm alert red                 |
| success      | 0.60 0.12 150    | Trust green                    |

## Typography

- Display: **Space Grotesk** — modern confidence for headers, clinical authority
- Body: **Figtree** — clean readable, friendly approachable tone
- Scale: hero `text-4xl md:text-6xl font-bold`, h2 `text-2xl md:text-4xl font-bold`, label `text-sm font-semibold`, body `text-base md:text-lg`

## Elevation & Depth

Subtle clinical shadows (`0 1px 3px 0 rgba(0,0,0,0.08)`) with card hierarchy; white cards on off-white background create clear surface distinction without drama.

## Structural Zones

| Zone    | Background             | Border              | Notes                                      |
| ------- | ---------------------- | ------------------- | ------------------------------------------ |
| Header  | `bg-card` with `border-b` | `border-border`     | Logo, nav, subtle divider                  |
| Content | `bg-background`        | —                   | Off-white spacious sections                |
| Cards   | `bg-card` rounded-lg    | `border-border`     | Results, predictions, doctors, analyses    |
| Footer  | `bg-secondary/30`      | `border-t`          | Light subtle footer with border            |
| Warning | `bg-warning/10`        | `border-l-4 warning` | AI disclaimer banner, prominent left edge  |

## Spacing & Rhythm

Spacious 2rem section gaps (mobile-first), tight 0.5rem rounded corners (8px), generous padding inside cards (1.5rem–2rem), single-column mobile with 2-column grid on md breakpoint.

## Component Patterns

- Buttons: **Primary** `bg-primary text-primary-foreground rounded-lg py-2.5 px-4`, **Secondary** `border border-border text-foreground`, hover `opacity-90`, active `scale-95`
- Cards: `card-medical` utility — white background, subtle shadow, border, hover lift
- Camera Button: `btn-camera` — large circular 80px, primary color, touch-friendly, scale-down on active
- Badge/Label: `bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-semibold`

## Motion

- **Entrance**: fade-in + slide-in (0.4s ease-out) on card load, results stagger
- **Hover**: `opacity-90`, shadow lift to `shadow-elevated`, scale buttons `hover:scale-105`
- **Active**: buttons `active:scale-95` for immediate tactile feedback

## Constraints

- No gradient backgrounds or decorative elements — clinical clarity demands restraint
- No multi-color UI elements — 1 accent per component max
- Buttons always 44px+ touch target (mobile) — large accessible interaction zones
- AI disclaimer always visible above fold on results page
- Lucide icons 24px standard size for symptom checkboxes, inline labels

## Signature Detail

Oversized circular camera capture button serves dual purpose: primary UI focal point for mobile UX and signature visual anchor. Icon-only, framed in primary blue, scales down on press for haptic feedback illusion.
