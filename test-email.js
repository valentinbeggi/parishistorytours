// Fichier de test temporaire - à supprimer après test

const testBookingData = {
  tour: 'left-bank',
  participants: 2,
  tourType: 'private',
  date: '2024-01-15',
  time: '10:00',
  name: 'John Doe TEST',
  email: 'test@example.com',
  phone: '+33123456789'
};

async function testEmailAPI() {
  try {
    console.log('🧪 Testing email API...');
    console.log('📤 Sending test booking data:', testBookingData);
    
    const response = await fetch('http://localhost:4321/api/send-booking-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testBookingData),
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Email sent successfully!');
      console.log('📬 Message ID:', result.messageId);
      console.log('📧 Check your email at: clemdaguetschott@gmail.com');
    } else {
      console.log('❌ Error sending email:');
      console.log('Status:', response.status);
      console.log('Response:', result);
    }
  } catch (error) {
    console.error('❌ Network/Test error:', error.message);
    console.log('💡 Make sure your dev server is running with: npm run dev');
  }
}

// Run the test
testEmailAPI();
