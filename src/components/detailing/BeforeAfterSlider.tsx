"use client";

import { useState } from "react";

/**
 * Vorher/Nachher-Vergleichsslider. Solange keine echten Fotos vorliegen,
 * werden gestalterische Platzhalterflächen gezeigt (siehe VehiclePlaceholder-
 * Muster) – bei Bedarf durch echte Bilder (next/image, object-cover) ersetzen.
 */
export function BeforeAfterSlider({ label }: { label: string }) {
  const [percent, setPercent] = useState(50);

  return (
    <div>
      <div className="relative aspect-[4/3] w-full select-none overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 55%, #1a1a1a 100%)",
          }}
        >
          <span className="text-xs uppercase tracking-[0.35em] text-ink-foreground/40">Vorher</span>
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 20%, rgba(176,141,87,0.25), transparent 55%), linear-gradient(135deg, #f5f4f2 0%, #d8d5cf 55%, #b8b4ac 100%)",
            }}
          />
          <span className="relative text-xs uppercase tracking-[0.35em] text-ink/50">Nachher</span>
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-ink-foreground"
          style={{ left: `${percent}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink-foreground text-ink shadow-lg">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path d="M8 7l-4 5 4 5M16 7l4 5-4 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={percent}
          onChange={(e) => setPercent(Number(e.target.value))}
          aria-label={`Vorher/Nachher-Vergleich: ${label}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <span className="mt-3 block text-sm uppercase tracking-[0.15em] text-foreground/70">{label}</span>
    </div>
  );
}
