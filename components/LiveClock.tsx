"use client";

import { useEffect, useState } from "react";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function formatGmtStamp(date: Date) {
  const day = pad(date.getUTCDate());
  const month = pad(date.getUTCMonth() + 1);
  const year = date.getUTCFullYear();
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());

  return `${day}/${month}/${year} • GMT • ${hours}:${minutes}:${seconds}`;
}

export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const stamp = now ? formatGmtStamp(now) : "DD/MM/YYYY • GMT • 00:00:00";

  return (
    <time
      dateTime={now ? now.toISOString() : undefined}
      aria-label="Current date and time in GMT"
      suppressHydrationWarning
    >
      {stamp}
    </time>
  );
}
