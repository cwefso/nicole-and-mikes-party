export async function POST(request) {
    try {
      const { email, names, attendingParty, attendingMovie, declined, notes } = await request.json();
  
      // Prepare template parameters
      const templateParams = {
        to_email: email,
        names: names,
        party: attendingParty,
        movie: attendingMovie,
        declined: declined,
        notes: notes
      };
  
      // Make direct REST API call to EmailJS
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,  // Your EmailJS user ID (public key)
          template_params: templateParams,
          accessToken: process.env.NEXT_PUBLIC_EMAILJS_PRIVATE_KEY // Optional if you're using user_id
        })
      });
  
      if (response.ok) {
        return Response.json({ success: true });
      } else {
        const errorText = await response.text();
        console.error('EmailJS API error:', errorText);
        return Response.json({ error: errorText }, { status: 500 });
      }
    } catch (error) {
      console.error('Request error:', error);
      return Response.json({ 
        error: error.message || 'An error occurred while sending the email' 
      }, { status: 500 });
    }
  }