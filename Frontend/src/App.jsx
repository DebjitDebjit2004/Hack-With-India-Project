// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Home';  // Ensure this page exists
import WildTalk from './Pages/WildTalk';

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wildtalk" element={<WildTalk />} />
      </Routes>
  );
}

export default App;
