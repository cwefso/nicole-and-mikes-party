"use client";

import { useEffect } from "react";
import RSVPForm from "./components/RSVPForm";
import Image from "next/image";
import { EventDetails } from "./components/EventDetails";
import { content } from "./content";

export default function Home() {
  useEffect(() => {
    fetch("/api/listen");
  }, []);

  return (
    <div className="min-h-screen text-[#9D67C3] text-center font-body">
      <section className="flex justify-center items-center h-[100vh] relative">
        <Image
          src="/mike-and-nicole.jpg"
          alt="Footer Background"
          className="opacity-70"
          fill
          style={{ objectFit: "cover" }}
          priority
        />

        <div className="grid grid-cols-1 md:grid-cols-2 w-full md:max-w-[60vw] bg-white rounded-lg overflow-hidden bg-opacity-90 h-[80vh] md:h-[80vh] overflow-y-auto md:overflow-y-visible z-10 mx-4 md:mx-0 animate-fadeIn">
          <div className="flex justify-center items-center flex-col p-4 md:p-8 relative bg-[#C4ABD5] bg-opacity-50">
            <div className="relative text-[#84456E] p-6 md:p-0">
              <h1 className="text-3xl md:text-4xl font-bold font-heading">
                {content.title}
              </h1>
              <p className="text-base md:text-lg mx-auto text-body mt-12 font-body">
                {content.description}
              </p>
              {content.secondEvent && (
                <>
                  <p className="text-base font-heading md:text-2xl mx-auto text-body mt-12 italic">
                    {content.secondEventDay}
                  </p>
                  <p className="text-base font-heading md:text-lg mx-auto text-body mt-2 italic">
                    {content.secondEvent}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-center items-center flex-col p-4 md:p-8">
            <EventDetails />

            <RSVPForm />
          </div>
        </div>
      </section>

      <footer className="fixed bottom-0 w-full text-white py-2 md:py-4">
        <div className="relative z-10">
          <p className="text-sm md:text-base">
            Questions?{" "}
            <a
              href={`mailto:${content.contactEmail}`}
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
