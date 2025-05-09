// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Home';  // Ensure this page exists
import WildTalk from './Pages/WildTalk';
import NationalParkInfo from './Pages/NationalParkInfo';
import GalleryPage from './Pages/Gallary'// Ensure this page exists
import AdminPage from './Pages/Admin'
function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wildtalk" element={<WildTalk />} />
        <Route path="/national-park-info/:stateName" element={<NationalParkInfo />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/admin" element = {<AdminPage/>} />
      </Routes>
  );
}

export default App;
