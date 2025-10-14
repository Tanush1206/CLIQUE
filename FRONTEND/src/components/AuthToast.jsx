import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthToast({ message, onDismiss, onLogin, show = true }) {
  const navigate = useNavigate();

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    if (!show) return;
    
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000);

    return () => clearTimeout(timer);
  }, [show, onDismiss]);

  const [open, setOpen] = useState(true);

  const handleDismissClick = () => {
    setOpen(false);
    onDismiss();
  };

  const handleLogin = () => {
    setOpen(false);
    if (onLogin) {
      onLogin();
    } else {
      navigate('/login', { 
        state: { 
          from: window.location.pathname,
          loginRequired: true 
        },
        replace: true 
      });
    }
  };

  if (!show) return null;

  return (
    <div
      className={`fixed top-6 right-6 z-50 transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="relative w-80 rounded-2xl p-4 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.25)] overflow-hidden">
        {/* Liquid effect background */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/20 rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10">
          <div className="text-white font-semibold mb-1">Login required</div>
          <div className="text-blue-100 text-sm mb-3">{message || 'Please login to continue.'}</div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleDismissClick}
              className="px-3 py-1.5 rounded-full text-white/80 hover:text-white border border-white/20 hover:border-white/40 transition-colors"
            >
              Dismiss
            </button>
            <button
              onClick={handleLogin}
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90 transition-opacity"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
