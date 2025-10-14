import { useState, useEffect, createContext, useContext } from 'react';
import { getAuthToken, getUser, verifyToken, logout } from '../utils/auth';

const AuthContext = createContext(null);

/**
 * Auth Provider Component
 * Wrap your app with this to provide auth context
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuth = async () => {
      const token = getAuthToken();
      const storedUser = getUser();

      if (token && storedUser) {
        // Verify token is still valid
        const isValid = await verifyToken();
        if (isValid) {
          setUser(storedUser);
        } else {
          // Token invalid, clear storage without redirecting
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  const value = {
    user,
    setUser,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth Hook
 * Access authentication state in any component
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default useAuth;
