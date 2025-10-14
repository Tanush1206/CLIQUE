import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  // If no user, redirect to landing page with login required state
  if (!user) {
    const message = getMessageForRoute(location.pathname);
    
    return (
      <Navigate
        to="/"
        state={{
          loginRequired: true,
          message: message,
          from: location.pathname
        }}
        replace
      />
    );
  }

  // User is authenticated, render the protected content
  return children;
}

// Helper function to get appropriate message for each route
function getMessageForRoute(pathname) {
  if (pathname.includes('/leaderboard')) {
    return 'Please login to view the leaderboard';
  }
  if (pathname.includes('/townhall')) {
    return 'Please login to view TownHall events';
  }
  if (pathname.includes('/fest')) {
    return 'Please login to view Fest events';
  }
  if (pathname.includes('/hackathon')) {
    return 'Please login to view Hackathon events';
  }
  if (pathname.includes('/cultural')) {
    return 'Please login to view Cultural events';
  }
  return 'Please login to access this page';
}
