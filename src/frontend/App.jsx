import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Townhall from "./pages/Townhall";
import Fest from "./pages/Fest";
import Cultural from "./pages/Cultural";
import Hackathon from "./pages/Hackathon";
import React from 'react';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/townhall" element={<Townhall />} />
      <Route path="/fest" element={<Fest />} />
      <Route path="/cultural" element={<Cultural />} />
      <Route path="/hackathon" element={<Hackathon />} />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
