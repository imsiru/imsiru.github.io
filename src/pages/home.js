// src/pages/Home.jsx
import { useEffect, useState, useRef } from 'react';
import '../css/font.css';
import '../css/home.css';
import '../css/diary.css'; // 팝업 기본 스타일

import img1 from '../images/home/1.png';

const Home = () => {
  const [animatedText, setAnimatedText] = useState('멍멍멍멍멍멍멍');
  const [isEnglish, setIsEnglish] = useState(false);
  const [showWeightChart, setShowWeightChart] = useState(false);

  useEffect(() => {
    const original = '멍멍멍멍멍멍멍'.split('');
    const target = 'WELCOME'.split('');
    let index = 0;

    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (index < target.length) {
          original[index] = target[index];
          setAnimatedText([...original].join(''));
          index++;
        } else {
          clearInterval(intervalId);
          setIsEnglish(true);
        }
      }, 300);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  // 체중 데이터
  const weightData = [
    { month: '25.02.08', weight: 0.5 },
    { month: '25.07.08', weight: 1.53 },
    { month: '25.07.10', weight: 1.6 },
    { month: '25.07.25', weight: 1.9 },
    { month: '25.08.07', weight: 2.1 },
    { month: '25.08.20', weight: 2.3 },
  ];

  // ✅ WeightChart (분홍 테마 적용)
  const WeightChart = () => {
    const containerRef = useRef(null);
    const [size, setSize] = useState({ width: 800, height: 500 });

    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      const ro = new ResizeObserver((entries) => {
        const cr = entries[0].contentRect;
        const availWidth = Math.max(320, cr.width - 32);
        const calcHeight = Math.max(220, Math.round(availWidth * 0.7));
        setSize({ width: Math.min(1100, availWidth), height: calcHeight });
      });

      ro.observe(el);
      return () => ro.disconnect();
    }, []);

    const maxWeight = 3.0;
    const minWeight = 0.0;

    const paddingTop = 10;
    const paddingBottom = 35;
    const paddingLeft = Math.max(60, Math.round(size.width * 0.08));
    const paddingRight = 20;

    const innerW = Math.max(10, size.width - paddingLeft - paddingRight);
    const innerH = Math.max(10, size.height - paddingTop - paddingBottom);

    const N = weightData.length;

    const xAtIdx = (idx) =>
      paddingLeft + (N > 1 ? (idx / (N - 1)) * innerW : innerW / 2);

    const yAt = (w) => {
      const range = maxWeight - minWeight;
      const stepHeight = innerH / range;
      return size.height - paddingBottom - (w - minWeight) * stepHeight;
    };

    const linePoints = weightData
      .map((d, idx) => `${xAtIdx(idx)},${yAt(d.weight)}`)
      .join(' ');

    const formatDate2Lines = (str) => {
      const [yy, mm, dd] = str.split('.');
      return { yy: `${yy}’`, md: `${mm}.${dd}` };
    };

    const yTicks = [];
    for (let w = minWeight; w <= maxWeight + 1e-9; w += 0.5)
      yTicks.push(+w.toFixed(1));

    return (
      <div className="popup-overlay" onClick={() => setShowWeightChart(false)}>
        <div
          className="popup popup-wide pink-theme"
          onClick={(e) => e.stopPropagation()}
          ref={containerRef}
        >
          <button
            className="popup-close"
            onClick={() => setShowWeightChart(false)}
            aria-label="Close"
          >
            ✕
          </button>

          <h3 className="popup-title"> 🦴시루 살 찌는 중🍖</h3>

          <div className="popup-chart-container">
            <svg
              viewBox={`0 0 ${size.width} ${size.height}`}
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* 축 */}
              <line
                x1={paddingLeft}
                y1={size.height - paddingBottom}
                x2={size.width - paddingRight}
                y2={size.height - paddingBottom}
                stroke="#f5c2d8"
              />
              <line
                x1={paddingLeft}
                y1={paddingTop}
                x2={paddingLeft}
                y2={size.height - paddingBottom}
                stroke="#f5c2d8"
              />

              {/* Y 그리드 & 라벨 */}
              {yTicks.map((w) => {
                const y = yAt(w);
                return (
                  <g key={`y-${w}`}>
                    <line
                      x1={paddingLeft}
                      y1={y}
                      x2={size.width - paddingRight}
                      y2={y}
                      stroke="#fde2e8"
                    />
                    <text
                      x={paddingLeft - 10}
                      y={y + 4}
                      fontSize="11"
                      fill="#f28cb0"  
                      textAnchor="end"
                    >
                      {w.toFixed(1)}
                    </text>
                  </g>
                );
              })}

              {/* X 라벨 */}
              {weightData.map((d, idx) => {
                const x = xAtIdx(idx);
                const { yy, md } = formatDate2Lines(d.month);
                const labelY = size.height - paddingBottom + 14;
                return (
                  <text
                    key={`x-${idx}`}
                    x={x}
                    y={labelY}
                    fontSize="10"
                    fill="#f28cb0" 
                    textAnchor="middle"
                  >
                    <tspan x={x} dy="0">
                      {yy}
                    </tspan>
                    <tspan x={x} dy="12">
                      {md}
                    </tspan>
                  </text>
                );
              })}

              {/* 꺾은선 */}
              <polyline
                points={linePoints}
                fill="none"
                stroke="#ff69b4"
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* 포인트 */}
              {weightData.map((d, i) => {
                const x = xAtIdx(i);
                const y = yAt(d.weight);
                return (
                  <g key={`p-${i}`}>
                    <circle
                      cx={x}
                      cy={y}
                      r={5}
                      fill="#ffb6c1"     
                      stroke="#f28cb0" 
                      strokeWidth="2"
                    />
                    {i > 0 && (
                      <text
                        x={x}
                        y={y - 10}
                        fontSize="10"
                        fill="#f28cb0" 
                        textAnchor="middle"
                        style={{ pointerEvents: 'none' }}
                      >
                        {d.weight}kg
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="fullpage-wrapper">
      {/* ✅ Intro Section */}
      <section className="page intro-section">
        <div className="intro-container">
          <div className="intro-hero">
            <h1
              className={`subheading ${
                isEnglish ? 'font-english' : 'font-korean'
              }`}
            >
              {animatedText}
            </h1>

            <h2
              className="intro-title"
              style={{ fontFamily: 'S-CoreDream-6Bold, sans-serif' }}
            >
              <span style={{ color: '#000000' }}>시루의 하루:</span>
              <br />
              <span style={{ color: '#FF8A65' }}>먹고, </span>
              <span style={{ color: '#81C784' }}>자고, </span>
              <span style={{ color: '#64B5F6' }}>사고침.</span>
            </h2>

            <div className="intro-banner-container">
              <img
                src={img1}
                alt="시루 귀여운 사진"
                className="intro-banner"
              />
            </div>

            <p className="intro-desc">
              세상 제일 똑똑하고 제일 귀엽고
              <br />
              제일 잘 먹고 제일 말 안듣는
              <br />
              우리 집 댕댕이 <strong>시루</strong>를 소개합니다! 🐾
            </p>
          </div>
        </div>
      </section>

      {/* ✅ Profile Section */}
      <section className="page intro-section section-2 section2-fixed">
        <div className="sec2-grid">
          <h3 className="dog-profile-title sec2-title">
            🐕 안시루 스펙.zip
          </h3>

          <div className="sec2-specs">
            <table
              className="dog-specs pretty pastel sky pill-card"
              id="dog-specs"
            >
              <tbody id="rows">
                <tr>
                  <th>이름</th>
                  <td>안시루</td>
                </tr>
                <tr>
                  <th>견종</th>
                  <td>말티푸</td>
                </tr>
                <tr>
                  <th>체고</th>
                  <td>15 cm</td>
                </tr>
                <tr>
                  <th>체장</th>
                  <td>26 cm (유동적)</td>
                </tr>
                <tr>
                  <th>꼬리길이 (털 포함)</th>
                  <td>10 cm</td>
                </tr>
                <tr>
  <th>몸무게</th>
  <td className="weight-cell">
    <div className="weight-wrapper">
      <button
        className="weight-btn"
        onClick={() => setShowWeightChart(true)}
        aria-label="Show weight chart"
      >
        <span>⚖️</span> 몰래보기
      </button>
      <span className="weight-value">2.3 kg</span>
    </div>
  </td>
</tr>
                <tr>
                  <th>탄생일</th>
                  <td>2025.02.08</td>
                </tr>
                <tr>
                  <th>안씨 합류일</th>
                  <td>2025.07.09</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="footer-container">
            <div className="sec2-misc" id="instagram">
              <div className="siru-speech-bubble">“팔로팔로 미~ 🐾”</div>
              <div className="instagram-link-new">
                <a
                  href="https://www.instagram.com/siru_ahn_"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                    alt="Instagram"
                    className="instagram-icon"
                  />
                  <span>@siru_ahn_</span>
                </a>
              </div>
            </div>

            <div className="footer sec2-footer" id="copyright">
              <p>&copy; 2025 SIRU. All rights reserved 🐶</p>
            </div>
          </div>
        </div>
      </section>

      {/* 체중 차트 팝업 */}
      {showWeightChart && <WeightChart />}
    </main>
  );
};

export default Home;
