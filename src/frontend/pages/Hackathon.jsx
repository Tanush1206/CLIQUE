import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  MapPin as MapPinIcon,
} from "lucide-react";

const Hackathon = () => {
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

          {/* Liquid Glass Ticket */}
          <div className="flex justify-center px-4 py-8">
            <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 max-w-3xl w-full shadow-2xl hover:bg-white/15 transition-all duration-300 group">
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Top decorative element */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 shadow-lg"></div>
              </div>

              {/* Top section with title and date */}
              <div className="relative flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-white text-4xl font-bold mb-2 drop-shadow-lg">OSC Hackathon</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"></div>
                </div>
                <div className="text-right backdrop-blur-sm bg-white/10 rounded-xl px-4 py-2 border border-white/20">
                  <div className="text-white/80 text-sm font-medium mb-1">Event ID</div>
                  <div className="text-white text-lg font-bold">05.27.2050</div>
                </div>
              </div>

              {/* Event details with glass cards */}
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center text-white">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-red-400/20 to-pink-400/20 mr-3">
                      <CalendarIcon className="w-5 h-5 text-red-300" />
                    </div>
                    <div>
                      <div className="text-white/60 text-xs font-medium">Date</div>
                      <div className="text-white text-sm font-semibold">August 21, 2025</div>
                    </div>
                  </div>
                </div>
                
                <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center text-white">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-orange-400/20 to-yellow-400/20 mr-3">
                      <ClockIcon className="w-5 h-5 text-orange-300" />
                    </div>
                    <div>
                      <div className="text-white/60 text-xs font-medium">Time</div>
                      <div className="text-white text-sm font-semibold">2:00PM-4:00PM</div>
                    </div>
                  </div>
                  </div>
                
                <div className="backdrop-blur-sm bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center text-white">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-400/20 to-cyan-400/20 mr-3">
                      <MapPinIcon className="w-5 h-5 text-blue-300" />
                    </div>
                    <div>
                      <div className="text-white/60 text-xs font-medium">Venue</div>
                      <div className="text-white text-sm font-semibold">Classroom A (2nd Floor)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative barcode section */}
              <div className="relative flex justify-between items-center">
                <div className="flex space-x-1">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-b from-white/40 to-white/20 rounded-sm"
                      style={{
                        width: `${Math.random() * 3 + 1}px`,
                        height: `${Math.random() * 30 + 20}px`,
                      }}
                    />
                  ))}
                </div>
                
                <div className="backdrop-blur-sm bg-white/10 rounded-xl px-6 py-3 border border-white/20">
                  <div className="text-white/60 text-xs font-medium mb-1">End Time</div>
                  <div className="text-white text-xl font-bold">5:00 PM</div>
                </div>
              </div>

              {/* Bottom decorative element */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 shadow-lg"></div>
              </div>
              {/* Participation Button */}
              <div className="relative mt-6 flex justify-center">
                <a
                  href="https://forms.google.com/fest-participation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-4 rounded-full backdrop-blur-xl bg-gradient-to-r from-orange-500/30 to-red-500/30 border border-white/30 shadow-2xl hover:from-orange-500/40 hover:to-red-500/40 transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/30 to-red-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-3">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white font-semibold text-lg drop-shadow-lg">Register Now</span>
                  </div>
                </a>
              </div>
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

export default Hackathon;