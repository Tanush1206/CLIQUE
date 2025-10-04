import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HouseLeaderboard from '../components/HouseLeaderboard';

const Leaderboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0c2a77] via-[#0a2a84] to-[#0b1e52]">
      {/* Liquid glass background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-[32rem] h-[32rem] rounded-full bg-[#4f7cff]/15 blur-3xl"></div>
        <div className="absolute -bottom-32 -right-24 w-[36rem] h-[36rem] rounded-full bg-[#2ad4ff]/10 blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Top bar with back */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/15 backdrop-blur-2xl transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-wider">HOUSE LEADERBOARD</h1>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-2xl border border-white/15 rounded-[32px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
          <HouseLeaderboard />
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;