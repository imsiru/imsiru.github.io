import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/home';
import Diary from './pages/diary';
import Favorites from './pages/favorites';
import Gallery from './pages/gallery';
import Guestbook from './pages/guestbook';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/guestbook" element={<Guestbook />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
