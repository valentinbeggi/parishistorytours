import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  console.log('=== Email API Called ===');
  
  try {
    const bookingData = await request.json();
    console.log('Email data received:', bookingData);

    // Email au client
    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Booking ${bookingData.tourType === 'regular' ? 'Confirmation' : 'Request'} - Paris History Tours</h2>
        <p>Dear ${bookingData.name},</p>
        <p>Thank you for your booking ${bookingData.tourType === 'regular' ? 'and payment' : 'request'}! Here are the details:</p>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Tour:</strong> ${bookingData.tour === 'left-bank' ? 'Left Bank Tour' : 'Right Bank Tour'}</p>
          <p><strong>Participants:</strong> ${bookingData.participants} ${bookingData.participants === 1 ? 'person' : 'people'}</p>
          <p><strong>Type:</strong> ${bookingData.tourType === 'regular' ? 'Regular Tour' : 'Private Tour'}</p>
          <p><strong>Date:</strong> ${new Date(bookingData.date).toLocaleDateString('en-GB')}</p>
          <p><strong>Time:</strong> ${bookingData.time}</p>
          ${bookingData.price ? `<p><strong>Total:</strong> €${bookingData.price}</p>` : ''}
        </div>
        <p>${bookingData.tourType === 'regular' 
          ? 'Your booking is confirmed! We will send you meeting point details 24 hours before the tour.' 
          : 'We will confirm availability and contact you within 24 hours.'
        }</p>
        <p>Best regards,<br><strong>Clément - Paris History Tours</strong></p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="font-size: 12px; color: #6b7280;">
          Paris History Tours | Email: clemdaguetschott@gmail.com | WhatsApp: +33620622480
        </p>
      </div>
    `;

    const clientEmailResult = await resend.emails.send({
      from: 'Paris History Tours <bookings@parishistorytours.com>',
      to: bookingData.email,
      subject: `Booking ${bookingData.tourType === 'regular' ? 'Confirmation' : 'Request'} - Paris History Tours`,
      html: clientEmailHtml,
    });

    console.log('Client email sent:', clientEmailResult);

    // Email à vous (admin)
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">New Booking ${bookingData.tourType === 'regular' ? '(PAID)' : 'Request'}</h2>
        <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626;">
          <p><strong>Customer:</strong> ${bookingData.name}</p>
          <p><strong>Email:</strong> ${bookingData.email}</p>
          <p><strong>Phone:</strong> ${bookingData.phone || 'Not provided'}</p>
          <p><strong>Tour:</strong> ${bookingData.tour === 'left-bank' ? 'Left Bank Tour' : 'Right Bank Tour'}</p>
          <p><strong>Participants:</strong> ${bookingData.participants}</p>
          <p><strong>Type:</strong> ${bookingData.tourType}</p>
          <p><strong>Date:</strong> ${new Date(bookingData.date).toLocaleDateString('en-GB')}</p>
          <p><strong>Time:</strong> ${bookingData.time}</p>
          ${bookingData.price ? `<p><strong>Amount Paid:</strong> €${bookingData.price}</p>` : ''}
        </div>
        <p style="color: ${bookingData.tourType === 'regular' ? '#059669' : '#d97706'};">
          ${bookingData.tourType === 'regular' ? 'PAYMENT CONFIRMED - Tour booked!' : 'Action required: Contact client within 24h'}
        </p>
      </div>
    `;

    const adminEmailResult = await resend.emails.send({
      from: 'Paris History Tours <bookings@parishistorytours.com>',
      to: 'clemdaguetschott@gmail.com',
      subject: `🔔 New ${bookingData.tourType === 'regular' ? 'PAID' : 'Private'} Booking - ${bookingData.name}`,
      html: adminEmailHtml,
    });

    console.log('Admin email sent:', adminEmailResult);

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Emails sent successfully',
      clientEmailId: clientEmailResult.data?.id,
      adminEmailId: adminEmailResult.data?.id
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Email error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to send emails',
      details: String(error)
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
