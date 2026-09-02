export const SITE_URL = "https://www.ashleybradshaw.co.uk";

export const AVAILABILITY_HASH = "availability";
export const CAL_BOOKING_PATH = "ashley-bradshaw-58q0ny/30min";
export const CAL_BOOKING_URL = `https://cal.com/${CAL_BOOKING_PATH}`;

export function isAvailabilityHref(href: string) {
  if (href === `#${AVAILABILITY_HASH}` || href === `/#${AVAILABILITY_HASH}`) {
    return true;
  }

  try {
    return new URL(href, SITE_URL).hash === `#${AVAILABILITY_HASH}`;
  } catch {
    return false;
  }
}
