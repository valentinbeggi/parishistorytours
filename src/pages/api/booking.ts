import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { supabase } from '../../lib/supabase';

// Initialiser Resend avec votre clé API
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const bookingData = await request.json();
    
    // Sauvegarder la réservation en base de données
    const { data: booking, error: dbError } = await supabase
      .from('bookings')
      .insert([{
        tour: bookingData.tour,
        participants: bookingData.participants,
        tour_type: bookingData.tourType,
        date: bookingData.date,
        time: bookingData.time,
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        status: 'pending',
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(JSON.stringify({ error: 'Failed to save booking' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Envoyer email de confirmation au client
    const clientEmailHtml = `
      <h2>Booking Confirmation - Paris History Tours</h2>
      <p>Dear ${bookingData.name},</p>
      <p>Thank you for your booking request! Here are the details:</p>
      <ul>
        <li><strong>Tour:</strong> ${bookingData.tour === 'left-bank' ? 'Left Bank Tour' : 'Right Bank Tour'}</li>
        <li><strong>Participants:</strong> ${bookingData.participants} ${bookingData.participants === 1 ? 'person' : 'people'}</li>
        <li><strong>Type:</strong> ${bookingData.tourType === 'regular' ? 'Regular Tour' : 'Private Tour'}</li>
        <li><strong>Date:</strong> ${new Date(bookingData.date).toLocaleDateString()}</li>
        <li><strong>Time:</strong> ${bookingData.time}</li>
      </ul>
      <p>We will confirm availability and contact you within 24 hours.</p>
      <p>Best regards,<br>Paris History Tours Team</p>
    `;

    // Email au client
    await resend.emails.send({
      from: 'bookings@parishistorytours.com', // Votre domaine vérifié
      to: bookingData.email,
      subject: 'Booking Confirmation - Paris History Tours',
      html: clientEmailHtml,
    });

    // Envoyer email de notification à l'équipe
    const adminEmailHtml = `
      <h2>New Booking Request</h2>
      <p><strong>Customer:</strong> ${bookingData.name} (${bookingData.email})</p>
      <p><strong>Phone:</strong> ${bookingData.phone || 'Not provided'}</p>
      <p><strong>Tour:</strong> ${bookingData.tour === 'left-bank' ? 'Left Bank Tour' : 'Right Bank Tour'}</p>
      <p><strong>Participants:</strong> ${bookingData.participants}</p>
      <p><strong>Type:</strong> ${bookingData.tourType}</p>
      <p><strong>Date:</strong> ${new Date(bookingData.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> ${bookingData.time}</p>
      <p><strong>Booking ID:</strong> ${booking.id}</p>
    `;

    // Email à l'admin
    await resend.emails.send({
      from: 'bookings@parishistorytours.com',
      to: 'admin@parishistorytours.com', // Votre email d'administration
      subject: 'New Booking Request',
      html: adminEmailHtml,
    });

    return new Response(JSON.stringify({ 
      success: true, 
      bookingId: booking.id 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Booking error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
