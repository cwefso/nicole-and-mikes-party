import RSVPForm from "./components/RSVPForm";
import { EventDetails } from "./components/EventDetails";
import { content } from "./content";

export default function Home() {
  return (
    <div className="min-h-screen text-[#9D67C3] text-center font-body">
      <section className="flex justify-center items-center h-[100vh] relative">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full md:max-w-[80vw] bg-white rounded-lg overflow-hidden h-[80vh] h-[90vh] overflow-y-auto md:overflow-y-visible z-10 mx-4 md:mx-0 animate-fadeIn">
          <div className="flex justify-center items-center flex-col p-4 md:p-8 relative bg-[#dbcce5]">
            <div className="relative text-[#84456E] p-6 md:p-0">
              <h1 className="text-3xl md:text-4xl font-bold font-heading my-8">
                {content.title}
              </h1>
              <h2 className="text-lg md:text-xl my-4 font-bold font-heading">
                {content.subtitle}
              </h2>
              <p className="text-base md:text-lg mx-auto text-body font-body">
                {content.description}
              </p>
              <p className="text-base md:text-lg mx-auto text-body font-body my-4 italic">
                {`*${content.note}`}
              </p>
              {content.secondEvent && (
                <>
                  <h2 className="text-lg md:text-xl mb-4 mt-8 font-bold font-heading">
                    {content.secondEventDay}
                  </h2>
                  <p className="text-base font-heading md:text-lg mx-auto text-body mt-2 ">
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
