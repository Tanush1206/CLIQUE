import { Link } from "react-router-dom";
import React from "react";

const Footer = () => {
    return (
    <footer className="w-full bg-[#242424] text-white pt-8 pb-3 rounded-tl-[40px] rounded-tr-[40px] mt-auto ">
        <div className="container mx-auto px-2">
          <div className="flex flex-col items-start text-center">
            <div className="flex items-start gap-3 mb-4">
              <img src="/src/frontend/assets/sst.png" alt="logo" className="h-10 w-10" />
              <span className="font-semibold text-lg text-white">Scaler School Of Technology</span>
            </div>
            <p className="text-base text-gray-300">"Become 1% better every day"</p>
          </div>
        </div>
      </footer>
    )
}

export default Footer ; 