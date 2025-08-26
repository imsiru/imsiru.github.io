// src/pages/home.js
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Mousewheel } from "swiper/modules";

import "../css/font.css";
import "../css/home.css";

import img1 from "../images/home/1.png";

export default function SirupanHomeSwiper() {
  const [animatedText, setAnimatedText] = useState("멍멍멍멍멍멍멍");
  const [isEnglish, setIsEnglish] = useState(false);
  const [showWeightChart, setShowWeightChart] = useState(false);

  // Timers with cleanup + reduced-motion
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const original = "멍멍멍멍멍멍멍".split("");
    const target = "WELCOME".split("");

    const shouldReduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (shouldReduce) {
      setAnimatedText("WELCOME");
      setIsEnglish(true);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      let index = 0;
      intervalRef.current = setInterval(() => {
        if (index < target.length) {
          original[index] = target[index];
          setAnimatedText([...original].join(""));
          index++;
        } else {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsEnglish(true);
        }
      }, 300);
    }, 3000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Weight data (keep newest last)
  const weightData = [
    { month: "25.02.08", weight: 0.5 },
    { month: "25.07.08", weight: 1.53 },
    { month: "25.07.10", weight: 1.6 }, 
    { month: "25.07.25", weight: 1.9 },
    { month: "25.08.07", weight: 2.1 },
    { month: "25.08.20", weight: 2.3 },
  ];
// ---- WeightChart (교체본) ----
const WeightChart = () => {
  const popupRef = useRef(null);      // ★ 추가
  const titleRef = useRef(null);      // ★ 추가
  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 800, height: 500 });

  // 컨테이너(패딩 제외) 기준으로 viewBox 계산
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const calc = () => {
      const cs = getComputedStyle(el);
      const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      const padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
      const w = Math.max(260, el.clientWidth  - padX);
      const h = Math.max(240, el.clientHeight - padY);
      setSize({ width: Math.round(w), height: Math.round(h) });
    };

    const ro = new ResizeObserver(calc);
    ro.observe(el);
    calc();
    return () => ro.disconnect();
  }, []);

  // 팝업 높이를 SVG(차트)에 맞춰 자동 조절
  useEffect(() => {
    const fitToSVG = () => {
      const popup = popupRef.current;
      const title = titleRef.current;
      const cont  = containerRef.current;
      if (!popup || !title || !cont) return;

      // 화면 높이(가능하면 visualViewport 사용)
      const vpH = (window.visualViewport && window.visualViewport.height) || window.innerHeight;
      const maxPopupH = Math.min(vpH * 0.88, 900);

      // 팝업 가로폭
      const popupW = popup.clientWidth;

      // 컨테이너 패딩
      const cs = getComputedStyle(cont);
      const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      const padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);

      // 차트 비율(width:height = 10:7)
      const CHART_AR = 10 / 7;
      let chartContentH = Math.round((popupW - padX) / CHART_AR);

      // 제목 + 패딩 포함한 프레임 높이
      const frameH = title.offsetHeight + padY + 20;

      // 화면을 넘지 않도록 제한
      chartContentH = Math.max(220, Math.min(chartContentH, maxPopupH - frameH));

      // 컨테이너 높이 설정 → SVG가 100%로 채움
      cont.style.height = `${chartContentH}px`;

      // 팝업은 내용 높이에 맞추기
      popup.style.height = "auto";
    };

    fitToSVG();
    const onResize = () => fitToSVG();
    window.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
    };
  }, []);

  const values = weightData.map((d) => d.weight);
  const minWeight = 0;
  const maxData = Math.max(...values);
  const headroom = Math.max(0.3, maxData * 0.15);
  const maxWeight = Math.ceil((maxData + headroom) * 2) / 2;

  const paddingTop = 14;
  const paddingBottom = 66; // X축 2줄 + 값 라벨 여유
  const paddingLeft = Math.max(72, Math.round(size.width * 0.09));
  const paddingRight = 26;

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
    .join(" ");

  const formatDate2Lines = (str) => {
    const [yy, mm, dd] = str.split(".");
    return { yy: `${yy}’`, md: `${mm}.${dd}` };
  };

  const yTicks = [];
  for (let w = minWeight; w <= maxWeight + 1e-9; w += 0.5) yTicks.push(+w.toFixed(1));

  const closeBtnRef = useRef(null);
  useEffect(() => { closeBtnRef.current?.focus(); }, []);

  const onKeyDown = (e) => { if (e.key === "Escape") setShowWeightChart(false); };

  return (
    <div className="popup-overlay" role="dialog" aria-modal="true"
         onClick={() => setShowWeightChart(false)} onKeyDown={onKeyDown}>
      <div className="popup popup-wide pink-theme"
           onClick={(e) => e.stopPropagation()}
           ref={popupRef}                      /* ★ 팝업 ref 연결 */
      >
        <button className="popup-close"   onClick={(e) => { 
                e.stopPropagation();          // ← 부모로 버블링 막기
                setShowWeightChart(false);    // ← 모달 닫기
              }}
                aria-label="Close" ref={closeBtnRef}>✕</button>

        <h3 className="popup-title" ref={titleRef}> 🦴시루 살 찌는 중🍖</h3> {/* ★ 제목 ref */}

        <div className="popup-chart-container" ref={containerRef}>
          <svg
            viewBox={`0 0 ${size.width} ${size.height}`}
            width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
          >
            <line x1={paddingLeft} y1={size.height - paddingBottom}
                  x2={size.width - paddingRight} y2={size.height - paddingBottom}
                  stroke="#f5c2d8" />
            <line x1={paddingLeft} y1={paddingTop}
                  x2={paddingLeft} y2={size.height - paddingBottom}
                  stroke="#f5c2d8" />

            {yTicks.map((w) => {
              const y = yAt(w);
              return (
                <g key={`y-${w}`}>
                  <line x1={paddingLeft} y1={y} x2={size.width - paddingRight} y2={y} stroke="#fde2e8" />
                  <text x={paddingLeft - 10} y={y + 4} fontSize="11" fill="#f28cb0" textAnchor="end">
                    {w.toFixed(1)}
                  </text>
                </g>
              );
            })}

            {weightData.map((d, idx) => {
              const x = xAtIdx(idx);
              const { yy, md } = formatDate2Lines(d.month);
              const labelY = size.height - paddingBottom + 16;
              return (
                <text key={`x-${idx}`} x={x} y={labelY} fontSize="10" fill="#f28cb0" textAnchor="middle">
                  <tspan x={x} dy="0">{yy}</tspan>
                  <tspan x={x} dy="12">{md}</tspan>
                </text>
              );
            })}

            <polyline points={linePoints} fill="none" stroke="#ff69b4"
                      strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
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
                    {/* 첫 번째 포인트(인덱스 0)는 값 라벨 숨김 */}
                    {i !== 0 && (
                      <text
                        x={x}
                        y={y - 10}
                        fontSize="10"
                        fill="#f28cb0"
                        textAnchor="middle"
                        style={{ pointerEvents: "none" }}
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
// ---- /WeightChart ----


  return (
    <>
      <Swiper
        direction="vertical"
        modules={[Pagination, Mousewheel]}
        mousewheel={{ forceToAxis: true, releaseOnEdges: true, sensitivity: 1 }}
        pagination={{ clickable: true }}
        className="sirupan-swiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <section className="page intro-section">
            <div className="intro-container">
              <div className="intro-hero">
                {/* 상단 묶음: WELCOME(센터) + 타이틀(좌측) */}
                <div className="intro-head">
                  <h1 className={`subheading ${isEnglish ? "font-english" : "font-korean"}`}>
                    {animatedText}
                  </h1>
                  <h2 className="intro-title" style={{ fontFamily: "S-CoreDream-6Bold, sans-serif" }}>
                    <span style={{ color: "#000000" }}>시루의 하루:</span><br />
                    <span style={{ color: "#FF8A65" }}>먹고, </span>
                    <span style={{ color: "#81C784" }}>자고, </span>
                    <span style={{ color: "#64B5F6" }}>사고침.</span>
                  </h2>
                </div>

                {/* 정중앙 배너 */}
                <div className="intro-banner-container">
                  <img src={img1} alt="시루 귀여운 사진" className="intro-banner" loading="lazy" />
                </div>

                {/* 하단 설명(센터) */}
                <p className="intro-desc">
                  세상 제일 똑똑하고 제일 귀엽고<br />
                  제일 잘 먹고 제일 말 안듣는<br />
                  우리 집 댕댕이 <strong>시루</strong>를 소개합니다! 🐾
                </p>
              </div>
            </div>
          </section>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <section className="page intro-section section-2">
            <div className="sec2-grid">
              <div className="sec2-center">
                <h3 className="dog-profile-title sec2-title">🐕 안시루 스펙.zip</h3>

                <div className="sec2-specs">
                  <table className="dog-specs pill-card" id="dog-specs">
                    <tbody>
                      <tr><th>이름</th><td>안시루</td></tr>
                      <tr><th>견종</th><td>말티푸</td></tr>
                      <tr><th>체고</th><td>15 cm</td></tr>
                      <tr><th>체장</th><td>26 cm (유동적)</td></tr>
                      <tr><th>꼬리길이 (털 포함)</th><td>10 cm</td></tr>
                      <tr>
                        <th>몸무게</th>
                        <td className="weight-cell">
                          <div className="weight-wrapper">
                            <button className="weight-btn" onClick={() => setShowWeightChart(true)} aria-label="Show weight chart">
                              <span aria-hidden>⚖️</span> 몰래보기
                            </button>
                            <span className="weight-value">2.3 kg</span>
                          </div>
                        </td>
                      </tr>
                      <tr><th>탄생일</th><td>2025.02.08</td></tr>
                      <tr><th>안씨 합류일</th><td>2025.07.09</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="footer-container">
                <div className="sec2-misc" id="instagram">
                  <div className="siru-speech-bubble">팔로팔로 미~ 🐾</div>
                  <div className="instagram-link-new">
                    <a href="https://www.instagram.com/siru_ahn_" target="_blank" rel="noopener noreferrer">
                      <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="instagram-icon" />
                      <span>@siru_ahn_</span>
                    </a>
                  </div>
                </div>
                <div className="sec2-footer" id="copyright">
                  <p>&copy; 2025 SIRU. All rights reserved 🐶</p>
                </div>
              </div>

            </div>
          </section>
        </SwiperSlide>
      </Swiper>

      {showWeightChart && <WeightChart />}
    </>
  );
}