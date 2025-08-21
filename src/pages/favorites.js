import React, { useEffect, useRef } from 'react';
import '../css/favorites.css';
import fav1 from '../images/fav/1.png';
import fav2 from '../images/fav/2.png';
import fav3 from '../images/fav/3.png';
import fav4 from '../images/fav/4.png';
import fav5 from '../images/fav/5.png';
import fav6 from '../images/fav/6.png';
import fav7 from '../images/fav/7.png';
import fav8 from '../images/fav/8.png';
import fav9 from '../images/fav/9.png';
import fav10 from '../images/fav/10.png';
import fav11 from '../images/fav/11.png';
import fav12 from '../images/fav/12.png'; 
import fav13 from '../images/fav/13.png'; 
import fav14 from '../images/fav/14.png'; 

const favoritesData = [
  { title: '✨ 형광이 ✨', img: fav1, text: '누더기 아님 주의!<br />시루의 첫 장난감.' },
  { title: '🧸 핑크 팬서 🧸', img: fav2, text: '팔, 다리, 꼬리까지<br />시루의 작은 입에 딱!' },
  { title: '🐧 페더스 맥그로 🐧', img: fav3, text: 'feat. 엄마표 땜빵' },
  { title: '🐶 하트 든 그로밋 💖', img: fav4, text: '본인과 똑 닮았죠' },
  { title: '🐑 숀 더 쉽 🐑', img: fav7, text: '짝 맞춰 병에 걸린 언니가 사온 인형<br />시루가 물 수 있는 곳이 많아요' },
  { title: '🐍 바스락 뱀 🐍', img: fav5, text: '바스락거리면 숨어있던 시루가 나타나요', rotate: 120, scale: 1.2 },
  { title: '🐰 삑삑이 토끼 🎵', img: fav6, text: '시루가 직접 삑삑 소리를 낼 수 없다는 건 함정', rotate: 30, scale:1.2 },
  { title: '🌿 커피나무 막대기 🌿', img: fav8, text: '입질 막기 위한 도구로 산 막대기<br />효과는 과연...?', rotate: -60 },
  { title: '🌀 운동화끈 꽈배기 🌀', img: fav9, text: '엄마가 손수 꼬아준 꽈배기<br />딱딱한 부분을 특히 좋아해요', scale: 1.1 },
  { title: '🌹 장미 노즈워크 🌹', img: fav10, text: '안 속 깊숙히 넣은 사료는 못 먹으니<br />화 내지 않게 얕게 넣어주기!' },
  { title: '🍪 쿠키 노즈워크 🍪', img: fav11, text: '바스락 + 사료 = 말티푸타임' },
  { title: '⚖️ 밸런스 디스크 🧘‍♂️', img: fav12, text: '슬개골 건강을 위하여!<br />흔들흔들 잘 올라가 있어요', scale: 0.9 },
  { title: '🍼 혤 언니가 준 턱받이 🎀', img: fav13, text: '체리로 터그 놀이 하다가 뜯어질 뻔한 건 비밀!' },
  { title: '🫧 펄 언니가 준 펄 이름표 🐾', img: fav14, text: '산책 나갈 때 필수템!', scale: 0.9 },
];

const bgClasses = [
  'favorites-card1',
  'favorites-card2',
  'favorites-card3',
  'favorites-card4',
  'favorites-card5',
];

const Favorites = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="favorites-page">
      <div className="favorites-header">
        <div className="favorites-title-line">
          <span className="favorites-icon">❤️</span>
          <h2 className="favorites-title">FAVORITES</h2>
        </div>
      </div>
      <p className="favorites-description">시루가 좋아하는 모든 것을 소개합니다!</p>

      <div className="favorites-gallery">
        {favoritesData.map((item, index) => (
          <div
            key={index}
            ref={el => (cardsRef.current[index] = el)}
            className={`favorites-card ${bgClasses[index % bgClasses.length]}`}
          >
            <strong className="favorites-title-card">{item.title}</strong>
            <img
              src={item.img}
              alt={item.title}
              className="favorites-image"
              style={{ transform: `rotate(${item.rotate || 0}deg) scale(${item.scale || 1})` }}
            />
            <div
              className="favorites-description-card"
              dangerouslySetInnerHTML={{ __html: item.text }}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Favorites;
