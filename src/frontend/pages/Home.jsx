import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import React from "react";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black overflow-x-hidden">
      <Navbar />

      {/* Main content takes up all available space, pushing the footer down */}
      <main className="flex-grow w-full flex flex-col items-center">
        <div className="w-full max-w-4xl mx-auto px-4 pt-24 text-center">
          <h1 className="text-black font-['Inter'] text-6xl md:text-7xl lg:text-[80px] font-bold leading-tight md:leading-normal tracking-tight">
            Discover All Upcoming <br /> Scaler Events
          </h1>
          <p className="mt-4 text-gray-500 font-['Inter'] font-normal text-base md:text-lg">
            Featuring over all the occurring events in the scaler - <br />
            New content Weekly
          </p>

          {/* Discover More Occasions */}
          <section className="mt-20 flex flex-col items-center w-full">
            <h2 className="text-black font-['Inter'] text-4xl md:text-[40px] font-bold leading-tight md:leading-normal">
              Discover More Occasions
            </h2>
            <div className="grid grid-cols-2 gap-6 mt-10 w-full max-w-2xl">
              <Link
                to="/townhall"
                className="px-8 py-5 bg-black text-white rounded-full font-semibold text-xl text-center hover:opacity-80 transition-opacity"
              >
                TownHall
              </Link>
              <Link
                to="/fest"
                className="px-8 py-5 bg-[#EFEFEF] text-black rounded-full font-semibold text-xl text-center hover:bg-[#E0E0E0] transition-colors"
              >
                Fest
              </Link>
              <Link
                to="/hackathon"
                className="px-8 py-5 bg-[#EFEFEF] text-black rounded-full font-semibold text-xl text-center hover:bg-[#E0E0E0] transition-colors"
              >
                Hackathon
              </Link>
              <Link
                to="/cultural"
                className="px-8 py-5 bg-black text-white rounded-full font-semibold text-xl text-center hover:opacity-80 transition-opacity"
              >
                Cultural
              </Link>
            </div>
          </section>

          {/* Tagline */}
          <p className="mt-20 mb-20 text-black font-['Inter'] text-lg md:text-2xl font-normal leading-normal text-center">
            Progress happens when you stay consistent.
          </p>
        </div>
      </main>

      <Footer className="mt-12"/>
    </div>
  );
}
