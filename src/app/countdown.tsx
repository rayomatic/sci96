"use client";

import { useEffect, useState } from "react";

// Ritual: Friday Oct 16, 2026, 12:00 noon (local time)
const RITUAL = new Date(2026, 9, 16, 12, 0, 0);
// Hide the banner after the weekend wraps (end of Sun Oct 18)
const WEEKEND_END = new Date(2026, 9, 19, 0, 0, 0);

export default function CountdownBanner() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  if (now === null || now >= WEEKEND_END) return null;

  const ms = RITUAL.getTime() - now.getTime();

  return (
    <div className="border-b border-black/10 bg-[var(--queens-gold)] px-6 py-5 text-center text-[var(--queens-blue)]">
      {ms > 0 ? (
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-end justify-center gap-4 sm:gap-7">
            <CountUnit value={Math.floor(ms / 86400000)} label="days" />
            <Sep />
            <CountUnit value={Math.floor((ms % 86400000) / 3600000)} label="hours" />
            <Sep />
            <CountUnit value={Math.floor((ms % 3600000) / 60000)} label="minutes" />
          </div>
          <p className="text-lg font-bold tracking-tight sm:text-xl">
            until Ritual! 🍻 Friday Oct 16 · 12 noon · Clark Hall Pub
          </p>
        </div>
      ) : (
        <p className="text-2xl font-extrabold sm:text-3xl">
          Ritual is ON — see you at Clark! 🍻
        </p>
      )}
    </div>
  );
}

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-6xl font-extrabold leading-none tabular-nums sm:text-8xl">
        {value}
      </span>
      <span className="mt-1 text-xs font-bold uppercase tracking-[0.2em] sm:text-sm">
        {label}
      </span>
    </div>
  );
}

function Sep() {
  return (
    <span className="pb-5 text-4xl font-extrabold opacity-40 sm:pb-7 sm:text-6xl">:</span>
  );
}
