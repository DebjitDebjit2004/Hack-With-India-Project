// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Home';  // Ensure this page exists
import WildTalk from './Pages/WildTalk';
import NationalParkInfo from './Pages/NationalParkInfo';
function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wildtalk" element={<WildTalk />} />
        <Route path="/nationalparkinfo" element={<NationalParkInfo />} />
      </Routes>
  );
}

export default App;
