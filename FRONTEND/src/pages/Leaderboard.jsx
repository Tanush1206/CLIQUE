import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HouseLeaderboard from '../components/HouseLeaderboard';

const Leaderboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-x-hidden">
      <Navbar />

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
                    Track Your House's Progress and Standings
                  </p>
                </div>
              </div>
              
              {/* Right pill - Leaderboard */}
              <div className="relative px-8 py-6 rounded-full backdrop-blur-xl bg-gradient-to-r from-blue-500/30 to-indigo-500/30 border border-white/30 shadow-2xl hover:from-blue-500/40 hover:to-indigo-500/40 transition-all duration-300 -ml-6 group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/30 to-indigo-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative mx-auto flex items-center justify-center min-w-[400px] ml-6">
                  <h1 className="text-white text-2xl font-bold tracking-wide drop-shadow-lg">Leaderboard</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard content */}
          <div className="px-4 py-8">
            <div className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-2xl">
              <HouseLeaderboard />
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

export default Leaderboard;