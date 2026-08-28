"use client";

import { useEffect, useState } from "react";

function formatGmtStamp(date: Date) {
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds} - GMT`;
}

export function LiveClock() {
  const [stamp, setStamp] = useState("DD/MM/YYYY - 00:00:00 - GMT");

  useEffect(() => {
    const tick = () => setStamp(formatGmtStamp(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return <time suppressHydrationWarning>{stamp}</time>;
}
