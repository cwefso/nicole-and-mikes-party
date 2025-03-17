import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USER,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
  },
});

console.log('Email User:', process.env.NEXT_PUBLIC_EMAIL_USER);
console.log('Email Password:', process.env.NEXT_PUBLIC_EMAIL_PASSWORD);

export const sendEmail = (rsvpData) => {
  const mailOptions = {
    from: process.env.NEXT_PUBLIC_EMAIL_USER,
    to: process.env.NEXT_PUBLIC_EMAIL_USER,
    subject: 'New RSVP Received',
    text: `New RSVP Details:
           Names: ${rsvpData.names}
           Guests: ${rsvpData.num_guests}
           Notes: ${rsvpData.notes}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};