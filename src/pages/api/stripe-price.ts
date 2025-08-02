import type { APIRoute } from "astro";
import Stripe from "stripe";

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export const prerender = false;

export const fetchActivePrice = async () => {
  const productId = import.meta.env.STRIPE_PRODUCT_ID!;
  const prices = await stripe.prices.list({
    product: productId,
    active: true,
  });

  if (!prices.data.length) {
    throw new Error("No active prices found for the product");
  }

  return prices.data[0]; // Return the first active price
};

export const GET: APIRoute = async () => {
  try {
    const price = await fetchActivePrice();
    return new Response(JSON.stringify(price), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching price:", err);
    return new Response("Failed to fetch price", { status: 500 });
  }
};
