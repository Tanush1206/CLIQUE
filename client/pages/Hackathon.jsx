import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEvents } from "../hooks/useEvents";
import EventCard from "../components/EventCard";

const Hackathon = () => {
  const { data: events, loading, error } = useEvents({ category: 'hackathon', limit: 12, page: 1 });
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-x-hidden">
      <Navbar />

      {/* Main content takes up all available space, pushing the footer down */}
      <main className="flex-grow w-full flex flex-col items-center">
        <div className="w-full max-w-6xl mx-auto px-4 pt-24 text-center">
          {/* Liquid Glass Pills */}
          <div className="pt-32 flex justify-center px-4 py-8">
            <div className="relative flex items-center">
              {/* Left pill - Hackathon */}
              <div className="relative px-8 py-6 rounded-full backdrop-blur-xl bg-gradient-to-r from-green-500/30 to-cyan-500/30 border border-white/30 shadow-2xl hover:from-green-500/40 hover:to-cyan-500/40 transition-all duration-300 z-10 group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/30 to-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative mx-auto flex items-center justify-center min-w-[400px]">
                  <h1 className="text-white text-2xl font-bold tracking-wide drop-shadow-lg">Hackathon</h1>
                </div>
              </div>

              {/* Right pill - Description */}
              <div className="relative px-8 py-6 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 -ml-6 group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative text-center min-w-[400px] ml-6">
                  <p className="text-white text-lg font-medium leading-tight drop-shadow-lg">
                    Ctrl + Alt + Create
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Live events grid */}
          <div className="px-4 py-8 text-left">
            {loading && <div className="text-white/80">Loading events…</div>}
            {error && <div className="text-red-300">{error}</div>}
            {!loading && !error && (
              <div className="w-full max-w-4xl mx-auto space-y-6">
                {events.map((event) => (
                  <EventCard
                    key={event._id}
                    id={event._id}
                    title={event.title}
                    description={event.description}
                    startAt={event.startAt}
                    location={event.location}
                    registrationLink={event.registrationLink}
                    eventType="Hackathon"
                    color="green"
                    additionalInfo="Code • Build • Innovate"
                    statusText="PRIZES WORTH ₹50,000+"
                    buttonText="Register Now"
                  />
                ))}
                {events.length === 0 && (
                  <div className="text-white/80">No hackathon events yet.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <div className="w-full">
        <Footer className="mt-12" />
      </div>
    </div>
  );
};

export default Hackathon;