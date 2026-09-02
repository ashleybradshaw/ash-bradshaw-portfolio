"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { CAL_BOOKING_PATH } from "@/lib/site";

const CAL_NAMESPACE = "discovery";

const darkThemeVars = {
  "cal-brand": "#FFF9E6",
  "cal-brand-emphasis": "#E1DBC8",
  "cal-brand-text": "#0A0127",
  "cal-brand-subtle": "#A59F8A",
  "cal-brand-accent": "#0A0127",
  "cal-text": "#FFF9E6",
  "cal-text-emphasis": "#FFFFFF",
  "cal-text-subtle": "#E1DBC8",
  "cal-text-muted": "#A59F8A",
  "cal-text-inverted": "#0A0127",
  "cal-bg": "#0A0127",
  "cal-bg-emphasis": "#20086B",
  "cal-bg-subtle": "#13014C",
  "cal-bg-muted": "#0A0127",
  "cal-bg-inverted": "#FFF9E6",
  "cal-border": "rgba(255, 249, 230, 0.28)",
  "cal-border-emphasis": "rgba(255, 249, 230, 0.55)",
  "cal-border-subtle": "rgba(255, 249, 230, 0.18)",
  "cal-border-muted": "rgba(255, 249, 230, 0.1)",
  "cal-border-booker": "transparent",
  "cal-border-booker-width": "0px",
  radius: "0.25rem",
} as const;

export function AvailabilityEmbed() {
  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      if (cancelled) {
        return;
      }

      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        cssVarsPerTheme: {
          dark: darkThemeVars,
          light: darkThemeVars,
        },
      });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Cal
      namespace={CAL_NAMESPACE}
      calLink={CAL_BOOKING_PATH}
      className="h-full min-h-[640px] w-full"
      style={{
        width: "100%",
        height: "100%",
        minHeight: "640px",
        overflow: "auto",
      }}
      config={{
        layout: "month_view",
        theme: "dark",
        useSlotsViewOnSmallScreen: "true",
      }}
    />
  );
}
