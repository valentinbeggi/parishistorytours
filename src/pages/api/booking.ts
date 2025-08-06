import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  console.log('=== API Booking Called ===');
  
  try {
    const bookingData = await request.json();
    console.log('Data received:', bookingData);
    
    const { data: booking, error: dbError } = await supabase
      .from('bookings')
      .insert({
        tour: bookingData.tour,
        participants: bookingData.participants || 1,
        tour_type: bookingData.tourType || 'private',
        date_booking: bookingData.date,
        time_booking: bookingData.time,
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone || null
      })
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

    console.log('SUCCESS! Booking saved:', booking);

    return new Response(JSON.stringify({ 
      success: true, 
      bookingId: booking.id,
      message: 'Booking saved successfully!'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Server error',
      details: String(error)
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
