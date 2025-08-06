import React, { useState } from 'react';
import '../css/gallery.css';
import '../css/font.css';

const imageFiles = [
  { file: '250709.jpg', title: '환영해', text: '시루와의 첫 만남!' },
  { file: '250710.jpg', title: '첫째날 아침', text: '귀여운 표정으로 올려다보기' },
  { file: '250712.jpg', title: '침대가 생겼어요', text: '아늑하게 잠자는 중' },
  { file: '250713.jpg', title: '추억 4', text: '솜털 가득했던 시절<br />세상 귀여운 시루' },
  { file: '250714.jpg', title: '추억 5', text: '장난감들과 한 컷<br />이게 바로 시루의 보물창고' },
  { file: '250715.jpg', title: '추억 6', text: '자고 있는 모습도 천사같은 시루' },
  { file: '250717.jpg', title: '추억 7', text: '처음 가본 동물병원<br />겁먹은 눈빛' },
  { file: '250719.jpg', title: '추억 8', text: '산책 중 만난 고양이와 인사' },
  { file: '250720_1.jpg', title: '추억 9', text: '이불에 파묻혀서 쉬는 중' },
  { file: '250720_2.jpg', title: '추억 10', text: '비 오는 날 창밖 구경' },
  { file: '250722.jpg', title: '추억 11', text: '시루의 첫 생일<br />작은 케이크 파티 🎂' },
  { file: '250724.jpg', title: '추억 12', text: '엄마 무릎에 누워있는 시루' },
  { file: '250725.jpg', title: '추억 13', text: '비행기 인형과 한 컷 📸' },
  { file: '250725_2.jpg', title: '추억 14', text: '옷 입은 시루<br />귀엽다 귀여워~' },
  { file: '250725_3.jpg', title: '추억 15', text: '소파 위의 귀염둥이' },
  { file: '250727.jpg', title: '추억 16', text: '아빠랑 산책 중 찰칵' },
  { file: '250728.jpg', title: '추억 16', text: '아빠랑 산책 중 찰칵' },
  { file: '250731.jpg', title: '추억 17', text: '꼬리 흔드는 시루 🐾' },
  { file: '250731_2.jpg', title: '추억 18', text: '장난감 고르기 힘들어요~' },
  { file: '250801.jpg', title: '추억 19', text: '카페에서 얌전히 기다리는 중' },
  { file: '250801_2.jpg', title: '추억 20', text: '새해 맞이 산책 복장' },
  { file: '250803.jpg', title: '추억 22', text: '파우치 속 시루?!' },
  { file: '250806_1.jpg', title: '추억 23', text: '웃고 있는 표정 포착 😁' },
  { file: '250806_2.jpg', title: '추억 24', text: '물 마시는 찰나 📷' },
];

const bgClasses = ['gallery-card1', 'gallery-card2', 'gallery-card3'];

const galleryData = imageFiles.map(({ file, title, text }) => {
  const raw = file.slice(0, 6);
  const year = `20${raw.slice(0, 2)}`;
  const month = raw.slice(2, 4);
  const day = raw.slice(4, 6);
  const date = `${year}-${month}-${day}`;
  const img = require(`../images/gallery/${file}`);

  const jsDate = new Date(`${year}-${month}-${day}`);
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = dayNames[jsDate.getDay()];
  const dateLabel = `${year}년 ${parseInt(month)}월 ${parseInt(day)}일 (${weekday})`;

  return { title, img, text, date, year, month, dateLabel };
});

const Gallery = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedMonth, setSelectedMonth] = useState('');

  const filteredData = galleryData.filter(item =>
    item.year === selectedYear && (selectedMonth === '' || item.month === selectedMonth)
  );

  return (
    <main className="gallery-page">
      <div className="gallery-header">
        <span className="gallery-icon">🖼</span>
        <h2 className="gallery-title">GALLERY</h2>
      </div>
      <p className="gallery-description">시루의 소중한 순간들을 담았습니다!</p>

      <div className="gallery-filter">
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="2025">2025년</option>
        </select>
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value="">전체 월</option>
          <option value="07">7월</option>
          <option value="08">8월</option>
        </select>
      </div>

      <div className="gallery-gallery">
        {filteredData.slice().reverse().map((item, index) => (
          <div key={index} className={`gallery-card ${bgClasses[index % bgClasses.length]}`}>
            <strong className="gallery-title-card">{item.title}</strong>
            <img src={item.img} alt={item.title} className="gallery-image" />
            <div className="gallery-date">{item.dateLabel}</div>
            <div
              className="gallery-text"
              dangerouslySetInnerHTML={{ __html: item.text }}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Gallery;
