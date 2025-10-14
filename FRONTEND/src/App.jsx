import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Townhall from "./pages/Townhall.jsx";
import Fest from "./pages/Fest.jsx";
import Cultural from "./pages/Cultural.jsx";
import Hackathon from "./pages/Hackathon.jsx";
import React from 'react';
import LeaderboardPage from './pages/LeaderboardPage.jsx';
import AuthSuccess from './pages/AuthSuccess.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PublicRoute from './components/PublicRoute.jsx';

function App() {

  return (
    <Routes>
      {/* Public routes - redirect to /home if logged in */}
      <Route 
        path="/" 
        element={
          <PublicRoute>
            <Landing />
          </PublicRoute>
        } 
      />
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route path="/auth/success" element={<AuthSuccess />} />
      
      {/* Home route - protected */}
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
      
      {/* Protected Routes */}
      <Route 
        path="/townhall" 
        element={
          <ProtectedRoute>
            <Townhall />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/fest" 
        element={
          <ProtectedRoute>
            <Fest />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/cultural" 
        element={
          <ProtectedRoute>
            <Cultural />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/hackathon" 
        element={
          <ProtectedRoute>
            <Hackathon />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/leaderboard" 
        element={
          <ProtectedRoute>
            <LeaderboardPage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

// Component to handle authentication state and redirection for protected routes


export default App;