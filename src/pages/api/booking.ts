import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { supabase } from '../../lib/supabase';

// Initialiser Resend avec votre clé API
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  console.log('API booking called');
  
  try {
    const bookingData = await request.json();
    console.log('Received booking data:', bookingData);
    
    // Test de connexion Supabase
    const { data: testData, error: testError } = await supabase
      .from('bookings')
      .select('count')
      .limit(1);
    
    if (testError) {
      console.error('Supabase connection error:', testError);
      return new Response(JSON.stringify({ 
        error: 'Database connection failed',
        details: testError.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    console.log('Supabase connection OK');

    // Validation des données
    if (!bookingData.name || !bookingData.email || !bookingData.tour) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Sauvegarder la réservation en base de données
    const { data: booking, error: dbError } = await supabase
      .from('bookings')
      .insert([{
        tour: bookingData.tour,
        participants: bookingData.participants,
        tour_type: bookingData.tourType,
        date: bookingData.date,
        time: bookingData.time,
        session_id: bookingData.sessionId, // null pour les tours privés
        price: bookingData.price, // en centimes
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone || null,
        status: bookingData.tourType === 'regular' ? 'confirmed' : 'pending'
      }])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(JSON.stringify({ 
        error: 'Failed to save booking',
        details: dbError.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Booking saved successfully:', booking.id);

    // Email de confirmation adapté selon le type de tour
    const clientEmailHtml = `
      <h2>Booking ${bookingData.tourType === 'regular' ? 'Payment' : 'Confirmation'} - Paris History Tours</h2>
      <p>Dear ${bookingData.name},</p>
      <p>Thank you for your booking ${bookingData.tourType === 'regular' ? 'and payment' : 'request'}! Here are the details:</p>
      <ul>
        <li><strong>Tour:</strong> ${bookingData.tour === 'left-bank' ? 'Left Bank Tour' : 'Right Bank Tour'}</li>
        <li><strong>Participants:</strong> ${bookingData.participants} ${bookingData.participants === 1 ? 'person' : 'people'}</li>
        <li><strong>Type:</strong> ${bookingData.tourType === 'regular' ? 'Regular Tour' : 'Private Tour'}</li>
        <li><strong>Date:</strong> ${new Date(bookingData.date).toLocaleDateString()}</li>
        <li><strong>Time:</strong> ${bookingData.time}</li>
        ${bookingData.price ? `<li><strong>Total Paid:</strong> €${bookingData.price}</li>` : ''}
      </ul>
      <p>${bookingData.tourType === 'regular' 
        ? 'Your booking is confirmed! We will send you meeting point details 24 hours before the tour.' 
        : 'We will confirm availability and contact you within 24 hours.'
      }</p>
      <p>Best regards,<br>Paris History Tours Team</p>
    `;

    try {
      // Email au client
      await resend.emails.send({
        from: 'bookings@parishistorytours.com',
        to: bookingData.email,
        subject: 'Booking Confirmation - Paris History Tours',
        html: clientEmailHtml,
      });
      
      console.log('Email sent successfully to:', bookingData.email);
    } catch (emailError) {
      console.log('Email failed (DNS validation pending):', emailError);
      // Ne pas bloquer le processus de réservation pour les erreurs d'email
    }

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
      bookingId: booking.id,
      message: bookingData.tourType === 'private' 
        ? 'Private tour request submitted successfully'
        : 'Regular tour booking confirmed'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Booking error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
