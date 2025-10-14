import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";

const Townhall = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTownhallEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:4000/api/events?category=townhall&limit=50');
        const data = await response.json();
        
        if (data.success) {
          setEvents(data.events || []);
        } else {
          setError('Failed to fetch events');
        }
      } catch (err) {
        console.error('Error fetching townhall events:', err);
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchTownhallEvents();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchTownhallEvents, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-x-hidden">
      <Navbar />

      <main className="flex-grow w-full flex flex-col items-center">
        <div className="w-full max-w-6xl mx-auto px-4 pt-24 text-center">
          {/* Liquid Glass Pills */}
          <div className="pt-32 flex justify-center px-4 py-8">
            <div className="relative flex items-center">
              {/* Left pill - TownHall */}
              <div className="relative px-8 py-6 rounded-full backdrop-blur-xl bg-gradient-to-r from-blue-500/30 to-indigo-500/30 border border-white/30 shadow-2xl hover:from-blue-500/40 hover:to-indigo-500/40 transition-all duration-300 z-10 group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/30 to-indigo-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative mx-auto flex items-center justify-center min-w-[400px]">
                  <h1 className="text-white text-2xl font-bold tracking-wide drop-shadow-lg">TownHall</h1>
                </div>
              </div>

              {/* Right pill - Description */}
              <div className="relative px-8 py-6 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 -ml-6 group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative text-center min-w-[400px] ml-6">
                  <p className="text-white text-lg font-medium leading-tight drop-shadow-lg">
                    updates, opportunities, and answers <br/>
                    to your most pressing questions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Events grid */}
          <div className="px-4 py-8 text-left">
            <div className="w-full max-w-4xl mx-auto space-y-6">
              {loading ? (
                <div className="text-white/80 text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mb-2"></div>
                  <p>Loading townhall events...</p>
                </div>
              ) : error ? (
                <div className="text-red-400 text-center py-8">
                  <p>{error}</p>
                  <p className="text-sm mt-2 text-white/60">Make sure the backend server is running on port 4000</p>
                </div>
              ) : events.length > 0 ? (
                events.map((event) => (
                  <EventCard
                    key={event._id}
                    id={event._id}
                    title={event.title}
                    description={event.description}
                    startAt={event.startAt}
                    location={event.location}
                    registrationLink={event.registrationLink}
                    eventType="TownHall"
                    color="blue"
                    statusText={event.statusText || 'Join us for important announcements and discussions'}
                  />
                ))
              ) : (
                <div className="text-white/80 text-center py-8">
                  <p>No townhall events found</p>
                  <p className="text-sm mt-2 text-white/60">Create one using Postman at POST /api/events</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <div className="w-full">
        <Footer className="mt-12" />
      </div>
    </div>
  );
};

export default Townhall;