import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  console.log('=== API Booking Called ===');
  
  try {
    const bookingData = await request.json();
    console.log('Data received:', bookingData);
    
    // Prepare data for insertion avec types explicites
    const insertData = {
      tour: String(bookingData.tour),
      participants: Number(bookingData.participants || 1),
      tour_type: String(bookingData.tourType || 'private'),
      date: bookingData.date, // Format YYYY-MM-DD
      time: bookingData.time, // Format HH:MM
      session_id: bookingData.sessionId || null,
      price: bookingData.price ? Number(bookingData.price) : null,
      name: String(bookingData.name),
      email: String(bookingData.email),
      phone: bookingData.phone ? String(bookingData.phone) : null,
      status: 'pending'
    };
    
    console.log('Inserting data with types:', insertData);
    
    // Test de connexion d'abord
    const { data: testData, error: testError } = await supabase
      .from('bookings')
      .select('count')
      .limit(1);
    
    if (testError) {
      console.error('Connection test failed:', testError);
      return new Response(JSON.stringify({ 
        error: 'Database connection failed',
        details: testError.message 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    console.log('Connection test passed');
    
    // Insertion dans la base de données
    const { data: booking, error: dbError } = await supabase
      .from('bookings')
      .insert([insertData])
      .select()
      .single();

    if (dbError) {
      console.error('Database insert error:', dbError);
      return new Response(JSON.stringify({ 
        error: 'Failed to save booking',
        details: dbError.message,
        code: dbError.code
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Booking saved successfully:', booking);

    // Tentative d'envoi d'email (peut échouer si DNS pas configuré)
    try {
      // Temporairement désactivé car Resend DNS pas prêt
      console.log('Skipping email send (DNS not ready)');
    } catch (emailError) {
      console.log('Email error (expected):', emailError);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      bookingId: booking.id,
      message: 'Booking saved successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: String(error)
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
