import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { API_BASE } from "../lib/api";

const AuthContext = createContext({ user: null, loading: true, setUser: () => {} });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch(`${API_BASE}/api/auth/me`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : { user: null }))
      .then((data) => {
        if (!mounted) return;
        setUser(data.user || null);
      })
      .catch(() => {
        if (!mounted) return;
        setUser(null);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo(() => ({ user, loading, setUser }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
