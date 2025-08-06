import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import Diary from './pages/diary';
import Favorites from './pages/favorites';
import Gallery from './pages/gallery';
import Guestbook from './pages/guestbook';
import Footer from './components/footer';

// ❗ GitHub Pages용 basename 설정
const basename = process.env.NODE_ENV === 'production' ? '/imsiru' : '';

function App() {
  return (
    <Router basename={basename}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/favorite" element={<Favorites />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/guestbook" element={<Guestbook />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
