"use client";

import React, { useState } from "react";
import { supabase } from "../../supabaseClient";

const RSVPForm = () => {
  const [names, setNames] = useState("");
  const [numGuests, setNumGuests] = useState(1);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("rsvps")
      .insert([{ names, num_guests: numGuests, notes }]);

    if (error) {
      console.error("Error submitting RSVP:", error);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <p className="mt-8 text-xl text-[#C4ABD5]700 text-center">
        Thank you for RSVPing! We look forward to seeing you.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-6 rounded-lg"
    >
      {/* Names Field */}
      <label className="block mb-4">
        <span className="text-[#C4ABD5]700 font-semibold">Names:</span>
        <input
          type="text"
          value={names}
          onChange={(e) => setNames(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </label>

      {/* Number of Guests Field */}
      <label className="block mb-4">
        <span className="text-[#C4ABD5]700 font-semibold">Number of Guests:</span>
        <input
          type="number"
          value={numGuests}
          onChange={(e) => setNumGuests(e.target.value)}
          min="1"
          className="mt-1 block w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </label>

      {/* Notes Field */}
      <label className="block mb-4">
        <span className="text-[#C4ABD5]700 font-semibold">Notes:</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Please include any dietary restrictions, accommodations, or questions here."
          className="mt-1 block w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#FBE46C] text-[#9D67C3] font-bold py-2 px-4 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      >
        Submit
      </button>
    </form>
  );
};

export default RSVPForm;