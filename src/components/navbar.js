import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import menuIcon from '../images/menu.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dayCount, setDayCount] = useState(0);

  useEffect(() => {
    const targetDate = new Date('2025-07-08');
    const today = new Date();
    targetDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    const diffTime = today - targetDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setDayCount(diffDays);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">SIRUPAN O+{dayCount}</Link>
        <div className="hamburger">
          <button className="menu-button" onClick={toggleMenu} aria-label="메뉴 열기">
           <img src={menuIcon} alt="메뉴 버튼" style={{ width: '100%', transform: 'scale(1.3)' }} />
          </button>
        </div>
      </nav>

      <div className={`overlay ${isMenuOpen ? '' : 'hidden'}`} onClick={closeMenu}>
        <div className="menu-panel" onClick={(e) => e.stopPropagation()}>
          <Link to="/favorite" onClick={closeMenu}>FAVORITE</Link>
          <Link to="/diary" onClick={closeMenu}>DIARY</Link>
          <Link to="/gallery" onClick={closeMenu}>GALLERY</Link>
          <Link to="/guestbook" onClick={closeMenu}>GUEST BOOK</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
