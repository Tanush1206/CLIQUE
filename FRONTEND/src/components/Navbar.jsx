import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import sst from "../assets/sst.png";
import { useAuth } from "../hooks/useAuth.jsx";
import { logout } from "../utils/auth.js";

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generate unique color gradient based on user email
  const getGradientColors = (email) => {
    if (!email) return ['#3b82f6', '#8b5cf6']; // Default blue-purple
    
    const colorPalettes = [
      ['#f59e0b', '#ef4444'], // Orange-Red
      ['#10b981', '#06b6d4'], // Green-Cyan
      ['#8b5cf6', '#ec4899'], // Purple-Pink
      ['#3b82f6', '#06b6d4'], // Blue-Cyan
      ['#f59e0b', '#f97316'], // Orange
      ['#ef4444', '#dc2626'], // Red
      ['#10b981', '#059669'], // Green
      ['#8b5cf6', '#7c3aed'], // Purple
    ];

    // Use email to pick a consistent color
    const hash = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colorPalettes[hash % colorPalettes.length];
  };

  const gradientColors = user ? getGradientColors(user.email) : ['#3b82f6', '#8b5cf6'];

  // Get first letter of email
  const getInitial = (email) => {
    return email ? email.charAt(0).toUpperCase() : 'U';
  };

  const handleLogout = () => {
    setShowDropdown(false);
    logout();
  };

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-xl rounded-full py-3 px-8 flex justify-between items-center w-[45%] z-50 border border-white/20 transition-all duration-300 hover:bg-white/15 hover:border-white/30" 
         style={{
           boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
         }}>
      <div className="text-xl font-bold flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={sst} className="h-10 w-auto transition-transform duration-300 hover:scale-110" alt="Logo" />
          <div className="text-white font-extrabold text-2xl tracking-wide font-[calibri] drop-shadow-lg">
            Clique
          </div>
        </Link>
      </div>

      <div className="ml-auto flex items-center gap-4 relative">
        <Link
          to="/leaderboard"
          className="text-white/90 font-semibold hover:text-white transition-all duration-300 px-4 py-2 rounded-full hover:bg-white/10 backdrop-blur-sm"
        >
          Leaderboard
        </Link>
        
        {/* User Profile Dropdown */}
        {isAuthenticated && user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="relative group flex items-center"
            >
              {/* Avatar with textured gradient background showing first letter */}
              <div className="relative">
                {/* Outer glow ring */}
                <div 
                  className="absolute inset-0 rounded-full blur-md opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
                  }}
                />
                
                {/* Main avatar with textured effect */}
                <div 
                  className="relative w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm transition-all duration-300 group-hover:scale-110 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${gradientColors[0]} 0%, ${gradientColors[1]} 100%)`,
                    boxShadow: `
                      inset 0 1px 2px rgba(255, 255, 255, 0.3),
                      inset 0 -1px 2px rgba(0, 0, 0, 0.3),
                      0 4px 12px rgba(0, 0, 0, 0.4)
                    `,
                    border: '1.5px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  {/* Texture overlay */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `
                        repeating-linear-gradient(
                          45deg,
                          transparent,
                          transparent 2px,
                          rgba(255, 255, 255, 0.1) 2px,
                          rgba(255, 255, 255, 0.1) 4px
                        ),
                        linear-gradient(
                          180deg,
                          rgba(255, 255, 255, 0.15) 0%,
                          transparent 50%,
                          rgba(0, 0, 0, 0.15) 100%
                        )
                      `,
                    }}
                  />
                  
                  {/* Letter */}
                  <span className="relative z-10 drop-shadow-sm">
                    {getInitial(user.email)}
                  </span>
                </div>
                
                {/* Online indicator */}
                <div 
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-slate-900"
                  style={{
                    background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
                    boxShadow: '0 0 6px rgba(255, 255, 255, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
                  }}
                />
              </div>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-3 w-72 animate-fadeIn">
                <div className="relative bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-white/30 overflow-hidden shadow-2xl">
                  {/* Liquid effect background */}
                  <div 
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full filter blur-3xl opacity-40 animate-blob"
                    style={{ background: gradientColors[0] }}
                  />
                  <div 
                    className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-2000"
                    style={{ background: gradientColors[1] }}
                  />
                  
                  <div className="relative z-10 p-4">
                    {/* User Info */}
                    <div className="mb-4 pb-4 border-b border-white/20">
                      <div className="text-white font-semibold text-base mb-1">
                        {user.name}
                      </div>
                      <div className="text-blue-200 text-sm truncate">
                        {user.email}
                      </div>
                    </div>

                    {/* Logout Button with textured effect */}
                    <button
                      onClick={handleLogout}
                      className="relative w-full px-4 py-2.5 rounded-xl text-white font-medium transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${gradientColors[0]} 0%, ${gradientColors[1]} 100%)`,
                        boxShadow: `
                          inset 0 1px 2px rgba(255, 255, 255, 0.3),
                          inset 0 -1px 2px rgba(0, 0, 0, 0.3),
                          0 4px 12px rgba(0, 0, 0, 0.3)
                        `,
                        border: '1.5px solid rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      {/* Texture overlay */}
                      <div 
                        className="absolute inset-0 opacity-15"
                        style={{
                          background: `
                            repeating-linear-gradient(
                              45deg,
                              transparent,
                              transparent 2px,
                              rgba(255, 255, 255, 0.1) 2px,
                              rgba(255, 255, 255, 0.1) 4px
                            ),
                            linear-gradient(
                              180deg,
                              rgba(255, 255, 255, 0.15) 0%,
                              transparent 50%,
                              rgba(0, 0, 0, 0.15) 100%
                            )
                          `,
                        }}
                      />
                      <span className="relative z-10">Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;