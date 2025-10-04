import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";



export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // No side-effect redirect; let Router handle it synchronously with <Navigate />
  useEffect(() => {}, []); // keep hook balance

  if (loading)
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center text-white/80">
        <div className="animate-pulse">Checking authentication…</div>
      </div>
    );

  // If authenticated, render the protected content
  if (user) return children;

  // If not authenticated, navigate to landing with a small toast
  const from = location.pathname + location.search + location.hash;
  return <Navigate to="/" replace state={{ loginRequired: true, from }} />;
}

