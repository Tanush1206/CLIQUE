import React from "react";

function LoginPopup({ onClose, onLogin }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Popup container */}
      <div className="relative z-10 w-[28rem] rounded-[28px] p-8 
                      bg-white/10 backdrop-blur-2xl border border-white/20 
                      shadow-[0_10px_40px_rgba(0,0,0,0.25)] text-center">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-4">Login Required</h2>
        <p className="text-gray-200 mb-6">
          Please login to continue and access this page.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onLogin}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 
                       text-white font-medium hover:opacity-90 transition shadow-lg"
          >
            Login
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-white/20 border border-white/30 
                       text-white hover:bg-white/30 transition shadow-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;
