import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';  // Import the arrow icon
import HouseLeaderboard from '../components/HouseLeaderboard';

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto pt-24 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="flex items-center justify-center mb-10 relative">
          <Link
            to="/home"
            className="absolute left-0 group inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-xl text-white rounded-full text-sm hover:bg-white/20 transition-all duration-300 border border-white/20 shadow-lg hover:shadow-white/10"
            style={{
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            }}
          >
            <FiArrowLeft className="mr-1.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span className="text-sm">Back</span>
          </Link>

          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-300 text-center">
            House Points Leaderboard
          </h1>
        </div>
        <HouseLeaderboard />
      </div>
    </div>
  );
};

export default LeaderboardPage;