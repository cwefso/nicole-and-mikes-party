import nodemailer from 'nodemailer';

// Create a transporter object using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USER,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
  },
});

// Debugging: Log environment variables to ensure they're loaded correctly
console.log('Email User:', process.env.NEXT_PUBLIC_EMAIL_USER);
console.log('Email Password:', process.env.NEXT_PUBLIC_EMAIL_PASSWORD ? '***' : 'Not set'); // Mask password for security

/**
 * Sends an email with RSVP details.
 * @param {Object} rsvpData - The RSVP data containing names, number of guests, and notes.
 */
export const sendEmail = async (rsvpData) => {
  // Validate RSVP data
  if (!rsvpData || !rsvpData.names || !rsvpData.num_guests) {
    console.error('Invalid RSVP data:', rsvpData);
    throw new Error('Invalid RSVP data');
  }

  // Define email options
  const mailOptions = {
    from: process.env.NEXT_PUBLIC_EMAIL_USER,
    to: process.env.NEXT_PUBLIC_EMAIL_USER,
    subject: 'New RSVP Received',
    text: `New RSVP Details:
           Names: ${rsvpData.names}
           Guests: ${rsvpData.num_guests}
           Notes: ${rsvpData.notes || 'No notes provided'}`,
  };

  try {
    // Send the email using async/await
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return info; // Return the result for further processing if needed
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw the error for handling upstream
  }
};