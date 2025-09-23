import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch('http://localhost:4000/api/auth/me', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (!mounted) return;
        setIsAuthed(!!data.user);
      })
      .catch(() => {
        if (!mounted) return;
        setIsAuthed(false);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  if (loading) return null;
  return isAuthed ? children : <Navigate to="/login" />;
}
