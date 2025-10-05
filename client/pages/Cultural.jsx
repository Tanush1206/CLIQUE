import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Calendar, MapPin } from "lucide-react";
import { useEvents } from "../hooks/useEvents";
import EventCard from "../components/EventCard";

const Cultural = () => {
  const { data: events, loading, error } = useEvents({ category: 'cultural', limit: 12, page: 1 });
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-x-hidden">
      <Navbar />

      {/* Main content takes up all available space, pushing the footer down */}
      <main className="flex-grow w-full flex flex-col items-center">
        <div className="w-full max-w-6xl mx-auto px-4 pt-24 text-center">
          {/* Liquid Glass Pills */}
          <div className="pt-32 flex justify-center px-4 py-8">
            <div className="relative flex items-center">
              {/* Left pill - Description */}
              <div className="relative px-8 py-6 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 z-10 group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative text-center min-w-[400px]">
                  <p className="text-white text-lg font-medium leading-tight drop-shadow-lg">
                    Celebrating the Art of Being Together.
                  </p>
                </div>
              </div>
              
              {/* Right pill - Cultural */}
              <div className="relative px-8 py-6 rounded-full backdrop-blur-xl bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-white/30 shadow-2xl hover:from-purple-500/40 hover:to-pink-500/40 transition-all duration-300 -ml-6 group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative mx-auto flex items-center justify-center min-w-[400px] ml-6">
                  <h1 className="text-white text-2xl font-bold tracking-wide drop-shadow-lg">Cultural</h1>
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
                {events.map((event) => {
                  // For cultural events with house-based registration
                  if (event.registrationLinksByHouse) {
                    return (
                      <div key={event._id} className="relative bg-white/5 rounded-xl border border-gray-700/50 overflow-hidden shadow-lg w-full">
                        <div className="flex flex-col md:flex-row">
                          {/* Left side - 60% */}
                          <div className="p-6 w-full md:w-[60%]">
                            <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                            <p className="text-gray-300 text-sm mb-4">{event.description}</p>
                            
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                                  <Calendar className="w-4 h-4 text-purple-300" />
                                </div>
                                <div>
                                  <div className="text-white/60 text-xs">Date & Time</div>
                                  <div className="text-white font-medium">
                                    {event.startAt ? (
                                      <>
                                        {new Date(event.startAt).toLocaleDateString('en-US', {
                                          weekday: 'short',
                                          month: 'short',
                                          day: 'numeric',
                                        })}
                                        {' • '}
                                        {new Date(event.startAt).toLocaleTimeString('en-US', {
                                          hour: '2-digit',
                                          minute: '2-digit',
                                        })}
                                      </>
                                    ) : 'TBA'}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                                  <MapPin className="w-4 h-4 text-purple-300" />
                                </div>
                                <div>
                                  <div className="text-white/60 text-xs">Venue</div>
                                  <div className="text-white font-medium">{event.location || 'TBA'}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Right side - 40% with extended gradient */}
                          <div className="relative p-6 flex flex-col w-full md:w-[40%] overflow-hidden">
                            {/* Liquid glass background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg border-l border-white/10">
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-300/5 via-transparent to-transparent" style={{ '--tw-gradient-from-pos': '0% 0%', '--tw-gradient-to-pos': '100% 100%' }}></div>
                            </div>
                            
                            {/* Extended corner */}
                            <div className="absolute -left-6 top-0 bottom-0 w-6 bg-gradient-to-r from-purple-600/0 to-purple-600/30"></div>
                            
                            <div className="relative z-10">
                              <div className="text-white/90 text-sm mb-4">
                                <div className="font-medium mb-1 flex items-center">
                                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-2 animate-pulse"></span>
                                  Cultural Event
                                </div>
                                <div className="text-xs opacity-80">Houses Compete for Glory</div>
                              </div>
                              
                              <div className="space-y-3 flex-1 flex flex-col justify-center">
                                <div className="grid grid-cols-2 gap-2">
                                  {Object.entries(event.registrationLinksByHouse).map(([house, url]) => {
                                    const houseColors = {
                                      'PHOENIX': 'from-red-500/20 to-red-600/30',
                                      'TUSKER': 'from-blue-500/20 to-blue-600/30',
                                      'LEO': 'from-yellow-500/20 to-yellow-600/30',
                                      'KONG': 'from-green-500/20 to-green-600/30'
                                    };
                                    
                                    return (
                                      <a
                                        key={house}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`
                                          relative overflow-hidden group
                                          bg-white/5 hover:bg-white/10 backdrop-blur-sm
                                          border border-white/10 hover:border-white/20
                                          flex items-center justify-center px-2 py-1.5 text-xs font-medium rounded-md
                                          text-white transition-all duration-300
                                        `}
                                      >
                                        <span className="relative z-10 flex items-center">
                                          {house}
                                          <svg className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                          </svg>
                                        </span>
                                        <span className={`absolute inset-0 bg-gradient-to-r ${houseColors[house] || 'from-gray-500/20 to-gray-600/30'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></span>
                                      </a>
                                    );
                                  })}
                                </div>
                                
                                <div className="mt-2 text-center">
                                  <div className="text-white/60 text-xs tracking-wider">
                                    REGISTER WITH YOUR HOUSE
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Ticket perforation */}
                        <div className="absolute top-0 right-[40%] h-full w-0.5 bg-gradient-to-b from-transparent via-gray-500/50 to-transparent z-10">
                          <div className="absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full bg-gray-900 border border-gray-700"></div>
                          <div className="absolute -left-1.5 -bottom-1.5 w-3 h-3 rounded-full bg-gray-900 border border-gray-700"></div>
                        </div>
                      </div>
                    );
                  }
                  
                  // For regular cultural events
                  return (
                    <EventCard
                      key={event._id}
                      id={event._id}
                      title={event.title}
                      description={event.description}
                      startAt={event.startAt}
                      location={event.location}
                      registrationLink={event.registrationLink}
                      eventType="Cultural"
                      color="purple"
                      additionalInfo="Celebrate with your house!"
                      buttonText="Register Now"
                    />
                  );
                })}
                {events.length === 0 && (
                  <div className="text-white/80">No cultural events yet.</div>
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

export default Cultural;