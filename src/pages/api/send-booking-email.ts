import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const bookingData = await request.json();
    
    const emailContent = `
New Booking Request - Paris History Tours

Tour: ${bookingData.tour === 'left-bank' ? 'Left Bank Tour' : 'Right Bank Tour'}
Participants: ${bookingData.participants}
Tour Type: ${bookingData.tourType === 'regular' ? 'Regular Tour' : 'Private Tour'}
Date: ${bookingData.date}
Time: ${bookingData.time}

Please contact the client to confirm this booking.
    `;

    // Utiliser un service comme Resend ou EmailJS
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'bookings@parishistorytours.com',
        to: ['clemdaguetschott@gmail.com'],
        subject: 'New Booking Request - Paris History Tours',
        text: emailContent,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
