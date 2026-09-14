"use client";

import { useEffect, useState } from "react";

// Homecoming Friday: Oct 16, 2026 (local time)
const TARGET_YEAR = 2026;
const TARGET_MONTH = 9; // October (0-indexed)
const TARGET_DAY = 16;

export default function CountdownBanner() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(TARGET_YEAR, TARGET_MONTH, TARGET_DAY);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    setDays(Math.round((target.getTime() - today.getTime()) / 86400000));
  }, []);

  // Nothing during SSR/first paint; hide once the weekend is over (Sun Oct 18)
  if (days === null || days < -2) return null;

  return (
    <div className="border-b border-black/10 bg-[var(--queens-red)] px-6 py-3 text-center text-white">
      {days > 0 ? (
        <p className="text-lg font-bold tracking-tight sm:text-xl">
          <span className="align-baseline text-[7.5rem] font-extrabold leading-none tabular-nums sm:text-[9rem]">
            {days}
          </span>{" "}
          day{days === 1 ? "" : "s"} until Homecoming!
        </p>
      ) : (
        <p className="text-lg font-bold sm:text-xl">It&rsquo;s Homecoming weekend! 🎉</p>
      )}
    </div>
  );
}
