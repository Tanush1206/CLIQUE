import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-xl rounded-full py-3 px-8 flex justify-between items-center w-[45%] z-50 border border-white/20 transition-all duration-300 hover:bg-white/15 hover:border-white/30" 
         style={{
           boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
         }}>
      <div className="text-xl font-bold flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src="/src/frontend/assets/sst.png" className="h-10 w-auto transition-transform duration-300 hover:scale-110" alt="Logo" />
          <div className="text-white font-extrabold text-2xl tracking-wide font-[calibri] drop-shadow-lg">
            Clique
          </div>
        </Link>
      </div>

      <div className="flex items-center">
        <Link
          to="/leaderboard"
          className="text-white/90 font-semibold hover:text-white transition-all duration-300 px-4 py-2 rounded-full hover:bg-white/10 backdrop-blur-sm"
        >
          Leaderboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;