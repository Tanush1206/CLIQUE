import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Townhall from "./pages/Townhall";
import Fest from "./pages/Fest";
import Cultural from "./pages/Cultural";
import Hackathon from "./pages/Hackathon";
import React from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import LeaderboardPage from './pages/Leaderboard';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/townhall" element={<ProtectedRoute><Townhall /></ProtectedRoute>} />
      <Route path="/fest" element={<ProtectedRoute><Fest /></ProtectedRoute>} />
      <Route path="/cultural" element={<ProtectedRoute><Cultural /></ProtectedRoute>} />
      <Route path="/hackathon" element={<ProtectedRoute><Hackathon /></ProtectedRoute>} />
      <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
