import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  MapPin as MapPinIcon,
} from "lucide-react";

const Townhall = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black overflow-x-hidden">
      <Navbar />

      {/* Main content takes up all available space, pushing the footer down */}
      <main className="flex-grow w-full flex flex-col items-center">
        <div className="w-full max-w-4xl mx-auto px-4 pt-24 text-center">
          {/* Add padding below the Navbar */}
          <div className="pt-32 flex justify-center px-4 py-8">
            <div className="relative flex items-center">
              {/* Left pill - TownHall */}
              <div
                className="px-12 py-6 rounded-full z-10 flex items-center justify-center"
                style={{
                  backgroundColor: "#292929",
                  border: "5px solid #D9D9D9",
                  width: "500px",
                  height: "80px",
                }}
              >
                <h1 className="text-white text-2xl font-bold tracking-wide">
                  TownHall
                </h1>
              </div>

              {/* Right pill - overlapped by left pill */}
              <div
                className="px-12 py-6 rounded-full -ml-6 flex items-center"
                style={{
                  backgroundColor: "#D9D9D9",
                  border: "5px solid #292929",
                  width: "500px",
                  height: "80px",
                }}
              >
                <div className="ml-8 text-center">
                  <p className="text-gray-800 text-lg font-medium leading-tight">
                  updates, opportunities, and answers <br/>
                  to your most pressing questions.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center px-4 py-8">
            <div className="relative bg-gray-700 rounded-2xl p-8 max-w-2xl w-full ">
              {/* Top arrow */}
              <div className="absolute top-0 left-[75%] transform -translate-x-1/2 -translate-y-1/2">
                <div
                  className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[15px] 
                  border-l-transparent border-r-transparent border-t-white"
                ></div>
              </div>

              {/* Top section with title and date */}
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-white text-3xl font-bold">Yugaantar</h2>
                <div className="text-right">
                  <div className="text-gray-300 text-lg font-medium">
                    05.27.2050
                  </div>
                </div>
              </div>

              {/* Event details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-white">
                  <CalendarIcon className="w-5 h-5 mr-3 text-red-400" />
                  <span className="text-lg">Date: August 21, 2025</span>
                </div>
                <div className="flex items-center text-white">
                  <ClockIcon className="w-5 h-5 mr-3 text-orange-400" />
                  <span className="text-lg">Time: 2:00PM-4:00PM</span>
                </div>
                <div className="flex items-center text-white">
                  <MapPinIcon className="w-5 h-5 mr-4 text-red-400" />
                  <span className="text-lg">
                    Venue: Classroom A (2nd Floor)
                  </span>
                </div>
              </div>

              {/* Vertical striped line between arrows */}
              <div className="absolute left-[75%] top-0 bottom-0 transform -translate-x-1/2">
                <div 
                  className="w-0.5 h-full" 
                  style={{ background: 'repeating-linear-gradient(to bottom, white 0px 2px, transparent 2px 8px)' }}
                ></div>
              </div>

              {/* Barcode section */}
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                <div className="flex space-x-1">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-black"
                      style={{
                        width: `${Math.random() * 3 + 1}px`,
                        height: "120px",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom time */}
              <div className="absolute bottom-8 right-8">
                <div className="text-white text-xl font-medium">5:00 PM</div>
              </div>

              {/* Bottom arrow */}
              <div className="absolute bottom-0 left-[75%] transform -translate-x-1/2 translate-y-1/2">
                <div
                  className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[15px] 
                  border-l-transparent border-r-transparent border-b-white"
                ></div>
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

export default Townhall;
