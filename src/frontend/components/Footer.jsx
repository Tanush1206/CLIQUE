import { Link } from "react-router-dom";
import React from "react";

const Footer = () => {
    return (
    <footer className="w-full bg-white/5 backdrop-blur-xl text-white pt-8 pb-4 rounded-tl-[40px] rounded-tr-[40px] mt-auto border-t border-white/10 relative overflow-hidden"
            style={{
              boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none"></div>
        
        <div className="container mx-auto px-2">
          <div className="flex flex-col items-start text-center relative z-10">
            <div className="flex items-start gap-3 mb-4 transition-all duration-300 hover:scale-105">
              <img src="/src/frontend/assets/sst.png" alt="logo" className="h-10 w-10 transition-transform duration-300 hover:rotate-12" />
              <span className="font-semibold text-lg text-white drop-shadow-lg">Scaler School Of Technology</span>
            </div>
            <p className="text-base text-blue-200/80 italic font-light">"Become 1% better every day"</p>
          </div>
        </div>
        
        {/* Subtle animated elements */}
        <div className="absolute bottom-2 right-4 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-4 right-8 w-1 h-1 bg-purple-400/40 rounded-full animate-ping"></div>
      </footer>
    )
}

export default Footer ; 