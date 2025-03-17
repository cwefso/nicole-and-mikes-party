import { supabase } from '../../../supabaseClient';
import { NextResponse } from 'next/server';
import { sendEmail } from '../../lib/sendEmail';

export async function GET() {
  // Set up the Realtime listener
  const channel = supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'rsvps',
      },
      (payload) => {
        console.log('New RSVP:', payload.new);
        sendEmail(payload.new); // Call your email-sending function
      }
    )
    .subscribe();

 console.log(channel)

  return NextResponse.json({ message: 'Listening for RSVPs...' });
}