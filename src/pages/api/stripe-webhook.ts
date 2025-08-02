import type { APIRoute } from "astro";
import Stripe from "stripe";
import { supabaseServer } from "../../lib/supabase-server";
import { fetchActivePrice } from "./stripe-price";

export const prerender = false;

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export const POST: APIRoute = async ({ request }) => {
  const sig = request.headers.get("stripe-signature")!;
  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      import.meta.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return new Response("Bad signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.booking_id!;
    const slotId = session.metadata?.slot_id!;

    // 1. Confirm booking
    await supabaseServer
      .from("bookings")
      .update({ status: "paid" })
      .eq("id", bookingId);

    // 2. Increment "booked" counter
    const price = await fetchActivePrice();
    const incrementValue = session.amount_total! / price.unit_amount!;

    // First, get the current booked value
    const { data: slotData, error: fetchError } = await supabaseServer
      .from("time_slots")
      .select("booked")
      .eq("id", slotId)
      .single();

    if (fetchError || !slotData) {
      console.error("Error fetching slot:", fetchError);
      return new Response("Failed to fetch slot", { status: 500 });
    }

    // Then update with the new value
    const { error: updateError } = await supabaseServer
      .from("time_slots")
      .update({ booked: slotData.booked + incrementValue })
      .eq("id", slotId);

    if (updateError) {
      console.error("Error updating booked counter:", updateError);
      return new Response("Failed to update slot", { status: 500 });
    }
  }

  return new Response("ok", { status: 200 });
};
