import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// A small slide-in toast from the right prompting user to login
export default function LoginToast({ onDismiss, onLogin }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  // Auto close after 6s
  useEffect(() => {
    const t = setTimeout(() => setOpen(false), 6000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) {
      onDismiss?.();
    }
  }, [open, onDismiss]);

  return (
    <div
      className={`fixed top-6 right-6 z-50 transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="w-80 rounded-2xl p-4 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
        <div className="text-white font-semibold mb-1">Login required</div>
        <div className="text-blue-100 text-sm mb-3">Please login to continue.</div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => setOpen(false)}
            className="px-3 py-1.5 rounded-full text-white/80 hover:text-white border border-white/20 hover:border-white/40"
          >
            Dismiss
          </button>
          <button
            onClick={() => {
              if (onLogin) onLogin();
              else navigate("/login");
            }}
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
