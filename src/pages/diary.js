import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import '../css/diary.css';
import '../css/font.css';
import '../css/responsive.css';
import arrowImg from '../images/arrow.png';

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
const DOW = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const DIARY_SHEET_CSV =
  'https://docs.google.com/spreadsheets/d/1PuoIeNiUoQyI_n8hNhjf1oYPNgGyndHohcpz6q1I_W4/export?format=csv';

const Diary = () => {
  const [current, setCurrent] = useState(new Date());
  const [diary, setDiary] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // CSV 로드 (date, memo, text 컬럼)
  useEffect(() => {
    Papa.parse(DIARY_SHEET_CSV, {
      download: true,
      header: true,
      complete: (results) => {
        const map = {};
        results.data.forEach((row) => {
          if (row?.date) {
            map[row.date.trim()] = {
              memo: row.memo?.trim() || '',
              extra: row.text?.trim() || '',
            };
          }
        });
        setDiary(map);
      },
      error: (err) => console.error('CSV parse error:', err),
    });
  }, []);

  // 현재 월 파생값
  const y = current.getFullYear();
  const m = current.getMonth();
  const firstDay = new Date(y, m, 1).getDay();
  const totalDays = new Date(y, m + 1, 0).getDate();
  const today = new Date();

  // 요일 헤더
  const dayHeaders = DOW.map((d, i) => (
    <div key={d} className={`cal-day ${i === 0 ? 'sun' : i === 6 ? 'sat' : ''}`}>
      {d}
    </div>
  ));

  // 앞쪽 빈칸
  const leadingEmpties = Array.from({ length: firstDay }, (_, i) => (
    <div key={`empty-${i}`} />
  ));

  // 날짜 셀
  const dateCells = [];
  for (let d = 1; d <= totalDays; d++) {
    const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const row = diary[dateStr] || {};
    const memo = row.memo || '';
    const isToday = d === today.getDate() && m === today.getMonth() && y === today.getFullYear();
    const dow = new Date(y, m, d).getDay();
    const dayClass = dow === 0 ? 'sun' : dow === 6 ? 'sat' : '';

    dateCells.push(
      <div
        key={d}
        className={`cal-date ${isToday ? 'today' : ''} ${dayClass}`}
        onClick={() => {
          setSelectedDate({ date: dateStr, ...row });
          setIsPopupOpen(true);
        }}
      >
        <div className="date-top">
          {d}
          {memo && <span className="memo-star">🌟</span>}
        </div>
        <div
          className="memo-preview"
          // \n 또는 \\n 모두 <br>로
          dangerouslySetInnerHTML={{
            __html: (memo || '').replace(/\\n|\r?\n/g, '<br>'),
          }}
        />
      </div>
    );
  }

  return (
    <main className="diary-page">
      {/* 헤더 */}
      <div className="diary-header">
        <div className="diary-title-line">
          <span className="diary-icon">📅</span>
          <h2 className="diary-title">DIARY</h2>
        </div>
      </div>
      <p className="diary-description">시루의 하루 기록</p>

      {/* 월 이동 */}
      <div className="diary-bottom">
        <img
          src={arrowImg}
          alt="Prev"
          className="left-arrow"
          onClick={() => setCurrent(new Date(y, m - 1))}
        />
        <span id="monthLabel" className="small-month-label">
          {MONTHS[m]} {y}
        </span>
        <img
          src={arrowImg}
          alt="Next"
          className="arrow-btn"
          onClick={() => setCurrent(new Date(y, m + 1))}
        />
      </div>

      {/* 달력 */}
      <div className="calendar">
        {dayHeaders}
        {leadingEmpties}
        {dateCells}
      </div>

      {/* 팝업 */}
      {isPopupOpen && selectedDate && (
        <div className="popup-overlay" onClick={() => setIsPopupOpen(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setIsPopupOpen(false)}>
              ❌
            </button>
            <div className="popup-content">
              <h3 className="popup-date">{selectedDate.date}</h3>
              <p
                className="popup-memo"
                dangerouslySetInnerHTML={{
                  __html: (selectedDate.memo || '메모 없음 🐾').replace(/\\n|\r?\n/g, '<br>'),
                }}
              />
              <p
                className="popup-extra"
                dangerouslySetInnerHTML={{
                  __html: (selectedDate.extra || '').replace(/\\n|\r?\n/g, '<br>'),
                }}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Diary;
