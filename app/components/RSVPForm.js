"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import emailjs from '@emailjs/browser';

const RSVPForm = () => {
  const [names, setNames] = useState("");
  const [numGuests, setNumGuests] = useState(1);
  const [notes, setNotes] = useState("");
  const [email, setEmail] = useState("");
  const [attendance, setAttendance] = useState("both");
  const [submitted, setSubmitted] = useState(false);
  const [isAttending, setIsAttending] = useState(false);
  const [sending, setSending] = useState(false);

  // Initialize EmailJS once when component mounts
  useEffect(() => {
    // Check if key exists and log it
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    
    console.log("Environment variables check:");
    console.log("Public Key exists:", !!publicKey);
    console.log("Service ID:", serviceId);
    console.log("Template ID:", templateId);
    
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    
    // Log before sending
    console.log("Starting form submission...");
    
    // Determine which events are being attended
    const attendingParty = attendance === "party" || attendance === "both";
    const attendingMovie = attendance === "movie" || attendance === "both";
    const declined = attendance === "declined";

    try {
      // First, save to database
      console.log("Saving to database...");
      const { error } = await supabase
        .from("rsvps")
        .insert([{ 
          names, 
          num_guests: numGuests, 
          notes, 
          email,
          party: attendingParty,
          movie: attendingMovie,
          declined: declined
        }]);

      if (error) {
        console.error("Error submitting RSVP:", error);
        setSending(false);
        return;
      }
      
      console.log("Database save successful!");

      // Then, send email with EmailJS
      const templateParams = {
        email: email,  // This should match the parameter name in your EmailJS template
        from_name: "Nicole & Mike",
        names: names,
        party: attendingParty,
        movie: attendingMovie,
        declined: declined,
        notes: notes,
        numGuests: numGuests
      };

      console.log("Sending email with params:", templateParams);
      
      // FIXED ORDER: service_id first, then template_id
      const emailResult = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,  // Service ID comes first
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, // Template ID comes second
        templateParams
      );
      
      console.log("Email sent successfully:", emailResult);

      // Update state to show success message
      setIsAttending(!declined);
      setSubmitted(true);
    } catch (error) {
      console.error("Error in submission process:", error);
      alert("There was an error sending your RSVP. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="w-full mx-auto rounded-lg font-body text-center py-8">
        <h1 className="text-[#84456E] text-3xl md:text-4xl font-bold font-heading mb-6">
          {isAttending ? "Hooray!" : "We'll Miss You!"}
        </h1>
        <p className="text-lg mb-6">
          {isAttending 
            ? "Thank you for attending! Stay tuned to your inbox for more information as we get closer to the day. Don't hesitate to ask if you have any questions. We love you, and we can't wait to see you!"
            : "We're sorry you can't make it, but we understand. We love you, and hope to see you soon!"}
        </p>
        <p className="text-[#84456E] font-semibold">- Nicole & Mike</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto rounded-lg font-body">
      <h1 className="text-[#84456E] text-3xl md:text-4xl font-bold font-heading mb-6">
        RSVP
      </h1>    
      {/* Attendance Radio Buttons */}
      <div className="mb-4">
        <span className="text-[#84456E] font-semibold block mb-2">Will you be attending?</span>
        <div className="grid grid-cols-2 gap-4">
          <label className="inline-flex items-center justify-center">
            <input
              type="radio"
              className="text-purple-500"
              checked={attendance === "party"}
              onChange={() => setAttendance("party")}
            />
            <span className="ml-2">Party Only</span>
          </label>
          <label className="inline-flex items-center justify-center">
            <input
              type="radio"
              className="text-purple-500"
              checked={attendance === "movie"}
              onChange={() => setAttendance("movie")}
            />
            <span className="ml-2">Movie Only</span>
          </label>
          <label className="inline-flex items-center justify-center">
            <input
              type="radio"
              className="text-purple-500"
              checked={attendance === "both"}
              onChange={() => setAttendance("both")}
            />
            <span className="ml-2">Both Events</span>
          </label>
          <label className="inline-flex items-center justify-center">
            <input
              type="radio"
              className="text-purple-500"
              checked={attendance === "declined"}
              onChange={() => setAttendance("declined")}
            />
            <span className="ml-2">Can&apos;t Attend</span>
          </label>
        </div>
      </div>

      {/* Names Field */}
      <label className="block mb-4">
        <span className="text-[#84456E] font-semibold">Names:</span>
        <input
          type="text"
          value={names}
          onChange={(e) => setNames(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </label>

      {/* Number of Guests Field - Only show if attending */}
      {attendance !== "declined" && (
        <label className="block mb-4">
          <span className="text-[#84456E] font-semibold">Number of Guests:</span>
          <input
            type="number"
            value={numGuests}
            onChange={(e) => setNumGuests(e.target.value)}
            min="1"
            className="mt-1 block w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required={attendance !== "declined"}
          />
        </label>
      )}

      {/* Notes Field */}
      <label className="block mb-4">
        <span className="text-[#84456E] font-semibold">Notes:</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Please include any dietary restrictions, accommodations, or questions here, and if you are attending the party, the movie, or both."
          className="mt-1 block w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </label>

      {/* Email Field */}
      <label className="block mb-4">
        <span className="text-[#84456E] font-semibold">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={sending}
        className="w-full bg-[#FBE46C] text-[#84456E] font-bold py-2 px-4 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      >
        Submit
      </button>
    </form>
  );
};

export default RSVPForm;