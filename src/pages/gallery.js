import React, { useState } from 'react';
import '../css/gallery.css';
import '../css/font.css';

const imageFiles = [
  { file: '250709.jpg', title: '환영해 🎉', text: '시루와의 첫 만남!' },
  { file: '250710.jpg', title: '첫째 날 아침 ☀️', text: '귀여운 표정으로 올려다보기' },
  { file: '250712.jpg', title: '침대가 생겼어요 🛏️', text: '아늑하게 자는 중' },
  { file: '250713.jpg', title: '귀여운 옆모습 📸', text: '5대5 가르마가 매력적이죠.' },
  { file: '250714.jpg', title: '기절했시루 😴', text: '새로운 환경에 드디어 적응한 시루<br />널브렁~' },
  { file: '250715.jpg', title: '아련한 눈빛 🥺', text: '밥 먹을 때까지만 기다려줘.' },
  { file: '250717.jpg', title: '너 수박 먹었잖아 🍉', text: '잔뜩 먹어 놓고 아빠 수박 탐내는 중.' },
  { file: '250719.jpg', title: '퇴근 후 풍경 🌆', text: '두 발 서기 개인기 연습 중' },
  { file: '250720_1.jpg', title: '출근 전 풍경 🌅', text: '내 간식값 벌어 와라, 인간' },
  { file: '250720_2.jpg', title: '갸우뚱 🤔', text: '자다 일어나서 멍한 눈빛' },
  { file: '250722.jpg', title: '멍실신 😵', text: '왜 침대 위에서 못 자니' },
  { file: '250724.jpg', title: '애미야 눈부시다 😎', text: '선글라스 사줘야겠어요' },
  { file: '250725.jpg', title: '토끼 귀 펄럭 🐰', text: '순간 포착 성공!' },
  { file: '250725_2.jpg', title: '날 꺼내줘라 🧺', text: '포대기 타고 병원 나들이' },
  { file: '250725_3.jpg', title: '라부부 발 댕박살. 😏', text: '귀여우니 봐줄게' },
  { file: '250727.jpg', title: '아련한 눈빛 22 🥺✨', text: '얌전히 기다리는 중' },
  { file: '250728.jpg', title: '멍 때리는 중 🫠', text: '목욕은 힘들어…' },
  { file: '250731.jpg', title: '장거리 여행 가요 🚗', text: '멀미도 안 하고 드라이브~' },
  { file: '250731_2.jpg', title: '여행 날 밤 🌙', text: '바깥 세상 구경하다 진 빠져 기절' },
  { file: '250801.jpg', title: '어서 와, 계곡은 처음이지 🏞️', text: '처음 보는 광경에 얼음이 돼버린 시루' },
  { file: '250801_2.jpg', title: '꽃을 든 시루 🌼', text: '견생샷 득템!' },
  { file: '250803.jpg', title: '훗 😼', text: '아주 절묘하게 찍힌 썩소' },
  { file: '250805_1.jpg', title: '드르렁 💤', text: '신호 기다리는 잠깐 사이에 잠든 시루' },
  { file: '250805_2.jpg', title: '밤거리 구경 중 🌃', text: '야경이 신기하지?' },
  { file: '250806.jpg', title: '흔들흔들 🌀', text: '디스크 위에서 간식 기다리는 중' },
  { file: '250807.jpg', title: '언니들이 많이 와서 신난 시루 🎊', text: '2시간동안 재롱잔치 열렸어요' },
  { file: '250808.jpg', title: '지각하는 이유 ⏰', text: '아시겠죠?' },
  { file: '250809.jpg',  title: '체리 케이프 두르고 🍒', text: '엄마랑 작은 언니 마중 나왔어요' },
  { file: '250810.jpg',  title: '첫 프로필 ✨',          text: '귀여워서 심쿵사!' },
  { file: '250810_1.jpg', title: '토끼 귀 쫑긋 🐰',        text: '모자도 사 주고 싶다…' },
  { file: '250813.jpg',   title: '언니2 구경 중 👀',       text: '눈 떙글' },
  { file: '250815.jpg',   title: '견생 첫 펫페어 인증샷 📸', text: '침대 사주세오' },
  { file: '250815_1.jpg', title: '산책 중 휴식 🌿',        text: '펫페어에서 산 하네스 개시!' },
  { file: '250817.jpg',   title: '베개 베고 댕 뻗음 💤',    text: '누가 업어가도 모르겠어요' },
  { file: '250818.jpg',   title: '언니1 뭐해 🤔',          text: '컨셉샷 찍는동안 얌전히 기다리는 중' },
  { file: '250818_1.jpg', title: '납짝쿵 🫓',             text: '시루_이름이_쿵이가_될뻔한_이유.png' },
  { file: '250819.jpg',   title: '납짝쿵2 🍑',            text: '통통하게 살 오른 옹동이' },
  { file: '250820.jpg',   title: '가방안시루 👜',          text: '산책 10분하고 더워서 카페로 피신' },
  { file: '250823.jpg', title: '무아지경 🤩',             text: '새로운 장난감은 늘 짜릿해' },
  { file: '250824.jpg',   title: '간식 주세오 🍪',            text: '귀여운 앙 다문 입술' },
];
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

  return { title, img, text, date, year, month, dateLabel, key: file };
});

const Gallery = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedMonth, setSelectedMonth] = useState('');

  const filteredData = galleryData.filter(
    (item) => item.year === selectedYear && (selectedMonth === '' || item.month === selectedMonth)
  );

  return (
    <main className="gallery-page">
      <div className="gallery-header">
        <div className="gallery-title-line">
          <span className="gallery-icon">🖼</span>
          <h2 className="gallery-title">GALLERY</h2>
        </div>
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
        {filteredData.slice().reverse().map((item) => (
          <div className="gallery-card" key={item.key}>
            <strong className="gallery-title-card">{item.title}</strong>

            {/* 날짜를 사진 위로(오버레이 아님) */}
            <div className="gallery-media">
              <div className="gallery-date">{item.dateLabel}</div>
              <img src={item.img} alt={item.title} className="gallery-image" />
            </div>

            {/* 텍스트는 사진 아래 */}
            <div className="gallery-body">
              <div
                className="gallery-text"
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Gallery;
