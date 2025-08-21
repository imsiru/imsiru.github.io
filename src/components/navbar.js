import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import menuIcon from '../images/menu.png';
import '../css/font.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dayCount, setDayCount] = useState(0);
  const menuRef = useRef(null);

  // 날짜 계산
  useEffect(() => {
    const targetDate = new Date('2025-07-08');
    const today = new Date();
    targetDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = today - targetDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setDayCount(diffDays);
  }, []);

  // 외부 클릭/ESC로 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // 메뉴 토글 시: 열릴 때 바로 맨 위로 스크롤 + 백그라운드 스크롤 잠금
  useEffect(() => {
    if (isMenuOpen) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const closeMenu = () => setIsMenuOpen(false);

  // 링크 클릭 시도 항상 맨 위에서 시작
  const handleNavClick = () => {
    closeMenu();
    // 라우트 전환 직전에 위로 올림 - 여러 방법 사용
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // 약간의 지연을 둬서 확실히 적용되도록
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo" onClick={handleNavClick}>SIRUPAN O+{dayCount}</Link>
        <div className="hamburger">
          <button className="menu-button" onClick={toggleMenu} aria-label="메뉴 열기">
            <img src={menuIcon} alt="메뉴 버튼" />
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fullscreen-overlay">
          <div className="centered-menu" ref={menuRef} style={{ fontFamily: 'S-CoreDream-6Bold' }}>
            <button className="close-button" onClick={closeMenu}>✕</button>
            <Link to="/diary" onClick={handleNavClick}>DIARY</Link>
            <Link to="/favorites" onClick={handleNavClick}>FAVORITE</Link>
            <Link to="/gallery" onClick={handleNavClick}>GALLERY</Link>
            <Link to="/guestbook" onClick={handleNavClick}>GUEST BOOK</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
