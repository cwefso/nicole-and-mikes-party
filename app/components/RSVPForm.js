"use client";

import React, { useState } from "react";
import { supabase } from "../../supabaseClient";

const RSVPForm = ({setSubmitted}) => {
  const [names, setNames] = useState("");
  const [numGuests, setNumGuests] = useState(1);
  const [notes, setNotes] = useState("");
  const [email, setEmail] = useState("")

  console.log("set", setSubmitted)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("rsvps")
      .insert([{ names, num_guests: numGuests, notes, email }]);

    if (error) {
      console.error("Error submitting RSVP:", error);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto  rounded-lg font-body"
    >
      <h1 className="text-[#84456E] text-3xl md:text-4xl font-bold font-heading mb-6">RSVP</h1>
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

      {/* Number of Guests Field */}
      <label className="block mb-4">
        <span className="text-[#84456E] font-semibold">Number of Guests:</span>
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
        <span className="text-[#84456E] font-semibold">Notes:</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Please include any dietary restrictions, accommodations, or questions here."
          className="mt-1 block w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </label>

      {/* Notes Field */}
      <label className="block mb-4">
        <span className="text-[#84456E] font-semibold">Email</span>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#FBE46C] text-[#84456E] font-bold py-2 px-4 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      >
        Submit
      </button>
    </form>
  );
};

export default RSVPForm;