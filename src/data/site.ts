// Single source of truth for site-wide facts reused across JSON-LD blocks.
// Review figures come from the Google Business Profile — update here (only)
// when the live count meaningfully changes.
export const GOOGLE_REVIEWS = {
  ratingValue: "4.9",
  bestRating: "5",
  ratingCount: "51",
} as const;

// Public Google Business Profile — target of every "read our reviews" link.
export const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/AGYuzh8jHA9KXv9h8";

// Public starting prices (EUR), as displayed in the booking UI ("From €…").
// Keep in sync with the active Stripe prices.
export const TOUR_PRICES: Record<string, string> = {
  "left-bank": "59",
  "right-bank": "59",
  "general-history": "59",
  "food-wine": "119",
};
