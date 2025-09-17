import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-lg rounded-full py-2 px-6 flex justify-between items-center w-[40%] z-50 shadow-lg border border-gray-200">
      <div className="text-xl font-bold flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src="/src/frontend/assets/sst.png" className="h-10 w-auto" alt="Logo" />
          <div className="text-[#000000] font-extrabold text-2xl tracking-wide font-[calibri]">
            Clique
          </div>
        </Link>
      </div>

      <div className="flex items-center">
        <Link
          to="/leaderboard"
          className="text-black font-semibold hover:text-gray-600 transition-colors duration-200"
        >
          Leaderboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;