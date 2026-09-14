"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Ritual: Friday Oct 16, 2026, 12:00 noon Eastern (EDT = UTC-4) — a fixed
// instant, so the countdown is identical in every viewer's time zone
const RITUAL = new Date(Date.UTC(2026, 9, 16, 16, 0, 0));
// Hide the banner after the weekend wraps (end of Sun Oct 18, Eastern)
const WEEKEND_END = new Date(Date.UTC(2026, 9, 19, 4, 0, 0));

// Styled after the Clark Hall Pub logo: bright yellow, white, heavy black italic type
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
    <div className="border-b-4 border-[#ffe100] bg-black px-6 py-5 text-center text-[#ffe100]">
      {ms > 0 ? (
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex flex-wrap items-end justify-center gap-x-4 gap-y-2 sm:gap-x-6">
            <CountUnit value={Math.floor(ms / 86400000)} label="days" />
            <Sep />
            <CountUnit value={Math.floor((ms % 86400000) / 3600000)} label="hours" />
            <Sep />
            <div className="flex items-end gap-x-4 sm:gap-x-6">
              <CountUnit value={Math.floor((ms % 3600000) / 60000)} label="minutes" />
              <span className="pb-4 text-3xl font-black italic tracking-tight sm:pb-5 sm:text-5xl">
                until&nbsp;Ritual!
              </span>
            </div>
          </div>
          <p className="flex items-center justify-center gap-3 text-base font-bold italic sm:text-lg">
            <span>Friday Oct 16 · 12 noon ·</span>
            <Image
              src="/clark-hall-pub.jpg"
              alt="Clark Hall Pub"
              width={48}
              height={48}
              className="h-12 w-12 rounded-md"
            />
          </p>
        </div>
      ) : (
        <p className="text-2xl font-black italic sm:text-3xl">
          Ritual is ON — see you at Clark! 🍻
        </p>
      )}
    </div>
  );
}

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-6xl font-black italic leading-none tracking-tight tabular-nums sm:text-8xl">
        {value}
      </span>
      <span className="mt-1 text-xs font-black uppercase italic tracking-[0.2em] sm:text-sm">
        {label}
      </span>
    </div>
  );
}

function Sep() {
  return (
    <span className="pb-5 text-4xl font-black italic opacity-30 sm:pb-7 sm:text-6xl">:</span>
  );
}
