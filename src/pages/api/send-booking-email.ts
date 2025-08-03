import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const bookingData = await request.json();
    
    // Format the date for better readability
    const formattedDate = new Date(bookingData.date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const emailContent = `
New Booking Request - Paris History Tours

TOUR DETAILS:
Tour: ${bookingData.tour === 'left-bank' ? 'Left Bank Tour (Resistance & Liberation)' : 'Right Bank Tour (Occupation & Collaboration)'}
Participants: ${bookingData.participants} ${bookingData.participants === 1 ? 'person' : 'people'}
Tour Type: ${bookingData.tourType === 'regular' ? 'Regular Tour' : 'Private Tour'}
Date: ${formattedDate}
Time: ${bookingData.time}

CLIENT INFORMATION:
Name: ${bookingData.name}
Email: ${bookingData.email}
Phone: ${bookingData.phone || 'Not provided'}

Please contact the client within 12 hours to confirm availability and finalize the booking.

Reply to this email or contact the client directly at: ${bookingData.email}
    `;

    // Log pour debug (enlever en production)
    console.log('Sending booking email with data:', bookingData);

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'bookings@parishistorytours.com',
        to: ['clemdaguetschott@gmail.com'],
        reply_to: bookingData.email,
        subject: `New Booking Request - ${bookingData.name} - ${bookingData.tour === 'left-bank' ? 'Left Bank' : 'Right Bank'} Tour`,
        text: emailContent,
      }),
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      console.error('Resend API error:', responseData);
      throw new Error(`Failed to send email: ${responseData.message || 'Unknown error'}`);
    }

    console.log('Email sent successfully:', responseData);

    return new Response(JSON.stringify({ 
      success: true, 
      messageId: responseData.id 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
