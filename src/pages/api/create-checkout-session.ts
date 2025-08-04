import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const { tour, participants, tourType } = await request.json();
    
    // Votre ID de prix Stripe
    const priceId = "price_1Rr41HJThLOSVS1SnHujpKYs";
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: participants,
        },
      ],
      mode: 'payment',
      success_url: `${new URL(request.url).origin}/booking-success?tour=${tour}&participants=${participants}`,
      cancel_url: `${new URL(request.url).origin}/book-tour`,
      metadata: {
        tour: tour,
        participants: participants.toString(),
        tourType: tourType
      }
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Stripe error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to create checkout session',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
