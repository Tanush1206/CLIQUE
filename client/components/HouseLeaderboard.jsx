import React, { useState } from 'react';
import { useLeaderboard } from '../hooks/useLeaderboard';

// Live data will provide: [{ houseId, name, color, points }]

const logoSrcByName = {
  PHOENIX: "/house/Screenshot_2025-09-22_at_7.16.54_PM-removebg-preview.png", 
  TUSKER: "/house/Screenshot_2025-09-22_at_7.17.33_PM-removebg-preview.png", // Elephant
  LEO: "/house/Screenshot_2025-09-22_at_7.17.47_PM-removebg-preview.png", // Lion
  KONG: "/house/Screenshot_2025-09-22_at_7.17.18_PM-removebg-preview.png", // Gorilla
};

function Logo3D({ src, alt, sizeClass }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1
    const rotateY = (x - 0.5) * 25; 
    const rotateX = (0.5 - y) * 25; 
    setTilt({ x: rotateX, y: rotateY });
  };

  const onEnter = () => setIsHovered(true);
  const onLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`group relative inline-flex items-center justify-center ${sizeClass} cursor-pointer`}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glow effect background */}
      <div
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, rgba(255,165,0,0.4) 0%, transparent 70%)`,
          filter: 'blur(20px)',
          opacity: isHovered ? 0.8 : 0,
        }}
      />
      
      {/* Main logo */}
      <img
        src={src}
        alt={alt}
        className="relative object-contain transition-all duration-200 ease-out"
        style={{
          transform: `
            perspective(800px) 
            rotateX(${tilt.x}deg) 
            rotateY(${tilt.y}deg) 
            translateZ(${isHovered ? '30px' : '0px'})
            scale(${isHovered ? 1.1 : 1})
          `,
          filter: `
            drop-shadow(0 15px 35px rgba(0,0,0,0.6))
            drop-shadow(0 5px 15px rgba(255,165,0,0.3))
            ${isHovered ? 'brightness(1.2)' : 'brightness(1)'}
          `,
          width: '100%',
          height: '100%',
        }}
      />
      
      {/* Reflection effect */}
      <img
        src={src}
        alt={`${alt} reflection`}
        className="absolute object-contain pointer-events-none"
        style={{
          transform: `
            perspective(800px) 
            rotateX(${tilt.x}deg) 
            rotateY(${tilt.y}deg) 
            translateZ(${isHovered ? '25px' : '-5px'})
            scaleY(-0.3)
            translateY(120%)
            scale(${isHovered ? 1.1 : 1})
          `,
          filter: 'blur(1px)',
          opacity: 0.2,
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}

const HouseLeaderboard = () => {
  const { data, loading, error, isUsingDefaultData } = useLeaderboard();
  // Ensure we always have at least the default houses to prevent empty states
  const defaultHouses = [
    { _id: '68e14603e95fcf80200e6c4a', name: 'PHOENIX', points: 0, color: '#fb923c' },
    { _id: '68e14604e95fcf80200e6c4b', name: 'TUSKER', points: 0, color: '#9ca3af' },
    { _id: '68e14604e95fcf80200e6c4c', name: 'LEO', points: 0, color: '#f59e0b' },
    { _id: '68e14604e95fcf80200e6c4d', name: 'KONG', points: 0, color: '#6b7280' }
  ];
  
  // Merge default houses with actual data, preserving points from actual data
  const housesWithDefaults = defaultHouses.map(defaultHouse => {
    // First try to find by _id (for backward compatibility)
    let actualData = data?.find(h => h._id === defaultHouse._id);
    // If not found, try to find by houseId (from API response)
    if (!actualData) {
      actualData = data?.find(h => h.houseId === defaultHouse._id);
    }
    
    if (actualData) {
      return {
        _id: actualData.houseId || actualData._id,
        name: actualData.name,
        points: actualData.points,
        color: actualData.color || defaultHouse.color
      };
    }
    return defaultHouse;
  });
  
  const sortedHouses = [...housesWithDefaults].sort((a, b) => b.points - a.points);

  // Show loading skeleton if it's the initial load and we don't have data yet
  if (loading && isUsingDefaultData) {
    return (
      <div className="min-h-[50vh] w-full flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-48 bg-white/10 rounded mb-4"></div>
          <div className="flex space-x-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-32 h-32 bg-white/5 rounded-full mb-4"></div>
                <div className="h-8 w-8 bg-white/10 rounded-full mb-2"></div>
                <div className="h-6 w-24 bg-white/10 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] w-full flex items-center justify-center">
        <div className="text-center p-6 bg-red-500/10 rounded-xl border border-red-500/30 max-w-md">
          <div className="text-red-300 text-lg font-medium mb-2">Error Loading Leaderboard</div>
          <p className="text-white/80 text-sm">{error}</p>
          <p className="text-white/60 text-xs mt-2">Displaying cached data if available.</p>
        </div>
      </div>
    );
  }

  if (!sortedHouses || sortedHouses.length === 0) {
    return (
      <div className="min-h-[50vh] w-full flex items-center justify-center">
        <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10 max-w-md">
          <div className="text-white/90 text-lg font-medium mb-2">No Leaderboard Data</div>
          <p className="text-white/60 text-sm">The leaderboard is currently empty.</p>
        </div>
      </div>
    );
  }

  const podiumOrder = [sortedHouses[1], sortedHouses[0], sortedHouses[2]]; // 2nd, 1st, 3rd for podium display

  return (
    <div className="relative flex items-center justify-center overflow-hidden min-h-[70vh] w-full">
      {/* Background particles/stars effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative flex items-end justify-center space-x-12">
        {/* 2nd Place */}
        <div className="text-center transform hover:scale-105 transition-transform duration-300">
          <div className="mb-6">
            <Logo3D 
              src={logoSrcByName[podiumOrder[0].name]} 
              alt={podiumOrder[0].name} 
              sizeClass="w-32 h-32" 
            />
          </div>
           <div className="bg-gradient-to-br from-white/20 to-gray-200/20 backdrop-blur-2xl h-36 w-36 rounded-t-xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] flex items-end justify-center pb-4 border border-white/30 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-gray-600/20 to-transparent" />
             <span className="text-5xl font-bold text-white relative z-10 drop-shadow-lg">2</span>
           </div>
          <div className="mt-6">
            <h3 className="text-xl font-bold text-white tracking-wider">{podiumOrder[0].name}</h3>
            <p className="text-orange-400 font-semibold text-lg">{podiumOrder[0].points.toLocaleString()} pts</p>
          </div>
        </div>

        {/* 1st Place */}
        <div className="text-center transform hover:scale-105 transition-transform duration-300">
          <div className="mb-8">
            <Logo3D 
              src={logoSrcByName[podiumOrder[1].name]} 
              alt={podiumOrder[1].name} 
              sizeClass="w-40 h-40" 
            />
          </div>
           <div className="bg-gradient-to-br from-orange-500/25 to-red-600/25 backdrop-blur-2xl h-48 w-36 rounded-t-xl shadow-[0_15px_50px_rgba(0,0,0,0.3)] flex items-end justify-center pb-6 border border-orange-400/40 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-transparent" />
             <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
               <div className="w-8 h-8 bg-orange-400/30 backdrop-blur-xl rounded-full flex items-center justify-center border border-orange-300/50">
                 <div className="w-4 h-4 bg-orange-300/60 rounded-full" />
               </div>
             </div>
             <span className="text-6xl font-bold text-white relative z-10 drop-shadow-lg">1</span>
           </div>
          <div className="mt-6">
            <h3 className="text-2xl font-bold text-white tracking-wider">{podiumOrder[1].name}</h3>
            <p className="text-orange-400 font-semibold text-xl">{podiumOrder[1].points.toLocaleString()} pts</p>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="text-center transform hover:scale-105 transition-transform duration-300">
          <div className="mb-6">
            <Logo3D 
              src={logoSrcByName[podiumOrder[2].name]} 
              alt={podiumOrder[2].name} 
              sizeClass="w-32 h-32" 
            />
          </div>
           <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 backdrop-blur-2xl h-28 w-36 rounded-t-xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] flex items-end justify-center pb-4 border border-yellow-400/30 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/15 to-transparent" />
             <span className="text-4xl font-bold text-white relative z-10 drop-shadow-lg">3</span>
           </div>
          <div className="mt-6">
            <h3 className="text-xl font-bold text-white tracking-wider">{podiumOrder[2].name}</h3>
            <p className="text-orange-400 font-semibold text-lg">{podiumOrder[2].points.toLocaleString()} pts</p>
          </div>
        </div>
      </div>

       {/* 4th Place (Side display) */}
       <div className="absolute top-1/2 -translate-y-1/2 right-8 text-center transform hover:scale-110 transition-all duration-300">
         <div className="mb-4">
           <Logo3D 
             src={logoSrcByName[sortedHouses[3].name]} 
             alt={sortedHouses[3].name} 
             sizeClass="w-24 h-24" 
           />
         </div>
         <div className="bg-gradient-to-br from-gray-500/20 to-gray-700/20 backdrop-blur-2xl px-4 py-3 rounded-xl border border-gray-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
           <div className="flex items-center justify-center w-6 h-6 bg-gray-500/30 backdrop-blur-xl rounded-full mx-auto mb-2 border border-gray-400/40">
             <span className="text-xs font-bold text-white">4</span>
           </div>
           <h3 className="text-base font-bold text-white tracking-wider">{sortedHouses[3].name}</h3>
           <p className="text-orange-400 font-semibold text-sm">{sortedHouses[3].points.toLocaleString()} pts</p>
         </div>
       </div>
    </div>
  );
};

export default HouseLeaderboard;