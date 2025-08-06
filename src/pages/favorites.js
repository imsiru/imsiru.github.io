import React from 'react';
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

const favoritesData = [
  { title: '형광이', img: fav1, text: '누더기 아님 주의!<br />시루의 첫 장난감.' },
  { title: '🧸 핑크 팬서', img: fav2, text: '팔, 다리, 꼬리까지 작은 시루 입에 딱!' },
  { title: '🌳 펭귄', img: fav3, text: 'feat. 엄마표 땜빵' },
  { title: '🌳 하트 든 강아지', img: fav4, text: '본인과 똑 닮았죠' },
  { title: '🐶 바스락 뱀', img: fav5, text: '바스락거리면 숨어있던 시루가 나타나요' },
  { title: '🐶 삑삑이 토끼', img: fav6, text: '시루가 직접 삑삑 소리를 낼 수 없다는 건 함정' },
  { title: '🐶 숀더 쉽', img: fav7, text: '짝 맞춰병에 걸린 언니가 사온 인형<br />시루가 물 수 있는 곳이 많아 아주 좋아해요' },
  { title: '🐶 커피나무 막대기', img: fav8, text: '입질 막기 위한 도구로 산 막대기<br />00쌤 추천 장난감!' },
  { title: '🐶 운동화끈 꽈배기', img: fav9, text: '엄마가 손수 꼬아준 꽈배기' },
  { title: '🐶 장미 노즈워크', img: fav10, text: '안 속 깊숙히 넣은 사료는 못 먹으니<br />화 내지 않게 얕게 넣어주기!' },
  { title: '🐶 쿠키 노즈워크', img: fav11, text: '바스락 + 사료 = 말티푸타임' },
];

const bgClasses = [
  'favorites-card1', // 분홍
  'favorites-card2', // 주황
  'favorites-card3', // 보라
  'favorites-card4', // 녹색
  'favorites-card5', // 하늘
];

const Favorites = () => {
  return (
    <main className="favorites-page">
      <div className="favorites-header">
        <span className="favorites-icon">❤️</span>
        <h2 className="favorites-title">FAVORITES</h2>
      </div>
      <p className="favorites-description">시루가 좋아하는 모든 것을 소개합니다!</p>

      <div className="favorites-gallery">
        {favoritesData.map((item, index) => (
          <div key={index} className={`favorites-card ${bgClasses[index % bgClasses.length]}`}>
            <strong className="favorites-title-card">{item.title}</strong>
            <img src={item.img} alt={item.title} className="favorites-image" />
            <div
              className="favorites-text"
              dangerouslySetInnerHTML={{ __html: item.text }}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Favorites;
