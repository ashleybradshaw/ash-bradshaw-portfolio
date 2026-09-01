"use client";

import { useEffect, useState } from "react";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function formatGmtStamp(
  date: Date,
  location: string,
  timezone: string,
) {
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());

  return `${location} • ${timezone} • ${hours}:${minutes}`;
}

export function LiveClock({
  location,
  timezone,
}: {
  location: string;
  timezone: string;
}) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const stamp = now
    ? formatGmtStamp(now, location, timezone)
    : `${location} • ${timezone} • 00:00`;

  return (
    <time
      dateTime={now ? now.toISOString() : undefined}
      aria-label={`Current time in ${location} (${timezone})`}
      suppressHydrationWarning
    >
      {stamp}
    </time>
  );
}
