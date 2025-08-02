import type { APIRoute } from "astro";
import Stripe from "stripe";
import { supabaseServer } from "../../lib/supabase-server";
import { fetchActivePrice } from "./stripe-price";

// Ensure this runs as a server endpoint, not prerendered
export const prerender = false;

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export const POST: APIRoute = async ({ request }) => {
  const { slotId, participants, email, name, phone } = await request.json();

  // 1. sanity-check slot
  const { data: slot, error: slotError } = await supabaseServer
    .from("v_available_slots")
    .select("free,start_time,end_time,tour")
    .eq("id", slotId)
    .single();

  if (slotError || !slot || participants > slot.free) {
    return new Response("Not enough seats or invalid slot", { status: 400 });
  }

  // 2. draft booking (status=pending)
  const { data: booking, error: bookingError } = await supabaseServer
    .from("bookings")
    .insert({
      slot_id: slotId,
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
      participants,
      total_amount_cents: participants * 5000,
    })
    .select()
    .single();

  if (bookingError || !booking) {
    console.error("Error creating booking:", bookingError);
    return new Response("Failed to create booking", { status: 500 });
  }

  // 3. Fetch the latest price for the product
  const price = await fetchActivePrice();

  // 4. Create Stripe Checkout session
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: price.id, // Dynamically fetched price ID
        quantity: participants,
      },
    ],
    mode: "payment",
    metadata: { booking_id: booking.id, slot_id: slotId },
    customer_email: email,
    success_url: `${request.headers.get("origin")}/success?bid=${booking.id}`,
    cancel_url: `${request.headers.get("origin")}/tours/${slot.tour}`,
  });

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { "Content-Type": "application/json" },
  });
};
