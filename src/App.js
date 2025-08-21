import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/home';
import Diary from './pages/diary';
import Favorites from './pages/favorites';
import Gallery from './pages/gallery';
import Guestbook from './pages/guestbook';

// ✅ 페이지 전환 시 스크롤을 맨 위로 올리는 컴포넌트
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // 여러 방법으로 스크롤을 맨 위로 이동
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // 약간의 지연을 둬서 확실히 적용되도록
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
  }, [pathname]);
  
  return null;
}

// ✅ 감싸주는 Layout 컴포넌트
function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/guestbook" element={<Guestbook />} />
      </Routes>
      {!isHome && <Footer />} {/* ✅ 홈이 아닐 때만 보여줌 */}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
