import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import sst from "../assets/sst.png";
import { useAuth } from "./AuthProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

  // Deterministic liquid-glass color per user
  const glassPalettes = [
    // emerald
    "bg-emerald-400/20 border-emerald-300/30",
    // sky
    "bg-sky-400/20 border-sky-300/30",
    // violet
    "bg-violet-400/20 border-violet-300/30",
    // amber
    "bg-amber-400/20 border-amber-300/30",
    // rose
    "bg-rose-400/20 border-rose-300/30",
  ];

  const hashCode = (s = "guest") => {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = ((h << 5) - h) + s.charCodeAt(i) | 0;
    return h;
  };
  const colorIdx = Math.abs(hashCode(user?.email)) % glassPalettes.length;
  const colorClasses = glassPalettes[colorIdx];

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (e) {
      // ignore network error; proceed to clear state
    } finally {
      setUser(null);
      navigate('/', { replace: true, state: { loggedOut: true } });
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-xl rounded-full py-3 px-8 flex justify-between items-center w-[45%] z-50 border border-white/20 transition-all duration-300 hover:bg-white/15 hover:border-white/30" 
         style={{
           boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
         }}>
      <div className="text-xl font-bold flex items-center">
        <Link to={user ? "/home" : "/"} className="flex items-center gap-2">
          <img src={sst} className="h-10 w-auto transition-transform duration-300 hover:scale-110" alt="Logo" />
          <div className="text-white font-extrabold text-2xl tracking-wide font-[calibri] drop-shadow-lg">
            Clique
          </div>
        </Link>
      </div>

      <div className="ml-auto flex items-center gap-2 relative" ref={menuRef}>
        <Link
          to="/leaderboard"
          className="text-white/90 font-semibold hover:text-white transition-all duration-300 px-4 py-2 rounded-full hover:bg-white/10 backdrop-blur-sm"
        >
          Leaderboard
        </Link>
        {user && (
          <>
            <button
              aria-haspopup="menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={`ml-2 h-9 w-9 rounded-full backdrop-blur-xl border ${colorClasses} text-white font-bold flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/40 transition`}
              title={user.email}
            >
              {(user.email || '?').charAt(0).toUpperCase()}
            </button>
            {open && (
              <div
                role="menu"
                className="absolute right-[-0.5rem] top-14 min-w-40 rounded-xl bg-slate-900/90 text-white border border-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] overflow-hidden origin-top-right"
              >
                <div className="px-4 py-3 text-sm text-white/80 border-b border-white/10">
                  {user.email}
                </div>
                <button
                  onClick={handleLogout}
                  role="menuitem"
                  className="w-full text-left px-4 py-2 text-white/90 hover:bg-white/10 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;