"use client";

import { useEffect } from "react";
import RSVPForm from "./components/RSVPForm";
import Image from "next/image";
import { EventDetails } from "./components/EventDetails";

export default function Home() {
  useEffect(() => {
    // Start the listener when the page loads
    fetch("/api/listen");
  }, []);

  return (
    <div className="min-h-screen text-[#9D67C3] text-center">
      {/* Header with Layered Design */}
      <section className="flex justify-center items-center h-[100vh] relative">
        {/* Background Image */}
        <Image
          src="/pansy.jpg"
          alt="Footer Background"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          fill
          style={{ objectFit: "cover" }}
          quality={75}
          priority
        />

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full md:max-w-[60vw] bg-white rounded-lg overflow-hidden  h-[80vh] md:h-[80vh] overflow-y-auto md:overflow-y-visible z-10 mx-4 md:mx-0">
          {/* Left Section */}
          <div className="flex justify-center items-center flex-col p-4 md:p-8 relative bg-[#C4ABD5] bg-opacity-50">
            {/* Overlay Text */}
            <div className="relative text-[#84456E] p-6 md:p-0">
              <h1 className="text-3xl md:text-4xl font-bold font-heading">
                Nicole and Mike&apos;s Party
              </h1>
              <p className="mt-4 text-base md:text-lg mx-auto text-body mt-12">
                Hi Everyone! Mike & Nicole eloped last July, and now it is time
                to throw a party! You are cordially invited to join us for a
                celebration of love with friends and family. All you need to do
                is arrive, eat, drink, and make merry. Admission to the Botanic
                Gardens is included with your invite, so you can always wander
                off and enjoy the flowers if you get bored with us! Please RSVP
                by June 19th, 2025, and please list any dietary or accommodation
                needs. We will send out updates with more info as we get closer
                to the day.
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex justify-center items-center flex-col p-4 md:p-8">
            {/* Event Details with Visual Enhancements */}
            <EventDetails />

            {/* RSVP Form */}

            <RSVPForm />
          </div>
        </div>
      </section>

      {/* Footer with Layered Design */}
      <footer className="fixed bottom-0 w-full text-white py-2 md:py-4">
        <div className="relative z-10">
          <p className="text-sm md:text-base">
            Questions?{" "}
            <a
              href="mailto:nicoleandmikesparty@gmail.com"
              className="text-[#FBE46C] underline"
            >
              Email Us
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
