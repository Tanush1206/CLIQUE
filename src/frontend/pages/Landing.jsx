import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import React from "react";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 text-white overflow-x-hidden">
      <Navbar />

      {/* Main content takes up all available space, pushing the footer down */}
      <main className="flex-grow w-full flex flex-col items-center">
        <div className="w-full max-w-4xl mx-auto px-4 pt-24 text-center">
          <h1 className="text-white font-['Inter'] text-6xl md:text-7xl lg:text-[80px] font-bold leading-tight md:leading-normal tracking-tight">
            Discover All Upcoming <br /> Scaler Events
          </h1>
          <p className="mt-4 text-blue-200 font-['Inter'] font-normal text-base md:text-lg">
            Featuring over all the occurring events in the scaler - <br />
            New content Weekly
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Link 
              to="/login" 
              className="px-8 py-4 bg-blue-600/80 backdrop-blur-sm text-white rounded-full font-semibold text-lg hover:bg-blue-500/80 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30 border border-blue-400/30"
            >
              Log In
            </Link>
          </div>

          {/* Discover More Occasions */}
          <section className="mt-20 flex flex-col items-center w-full">
            <h2 className="text-white font-['Inter'] text-4xl md:text-[40px] font-bold leading-tight md:leading-normal">
              Discover More Occasions
            </h2>
            <div className="grid grid-cols-2 gap-6 mt-10 w-full max-w-2xl">
              <Link
                to="/townhall"
                className="px-8 py-5 bg-blue-600/80 backdrop-blur-sm text-white rounded-full font-semibold text-xl text-center hover:bg-blue-500/80 transition-all duration-300 transform hover:scale-105 shadow-lg border border-blue-400/30"
              >
                TownHall
              </Link>
              <Link
                to="/fest"
                className="px-8 py-5 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-xl text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20"
              >
                Fest
              </Link>
              <Link
                to="/hackathon"
                className="px-8 py-5 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-xl text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20"
              >
                Hackathon
              </Link>
              <Link
                to="/cultural"
                className="px-8 py-5 bg-blue-600/80 backdrop-blur-sm text-white rounded-full font-semibold text-xl text-center hover:bg-blue-500/80 transition-all duration-300 transform hover:scale-105 shadow-lg border border-blue-400/30"
              >
                Cultural
              </Link>
            </div>
          </section>

          {/* Tagline */}
          <p className="mt-20 mb-20 text-blue-200 font-['Inter'] text-lg md:text-2xl font-normal leading-normal text-center">
            Progress happens when you stay consistent.
          </p>
        </div>
      </main>

      <Footer className="mt-12"/>
    </div>
  );
}