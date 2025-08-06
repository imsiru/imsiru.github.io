import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import '../css/diary.css';
import '../css/font.css';
import '../css/responsive.css';
import arrowImg from '../images/arrow.png'; // ✅ 이미지 경로

const Diary = () => {
  const [current, setCurrent] = useState(new Date());
  const [diary, setDiary] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const spreadsheetCsvUrl = 'https://docs.google.com/spreadsheets/d/1PuoIeNiUoQyI_n8hNhjf1oYPNgGyndHohcpz6q1I_W4/export?format=csv';

  useEffect(() => {
    Papa.parse(spreadsheetCsvUrl, {
      download: true,
      header: true,
      complete: (results) => {
        const diaryData = {};
        results.data.forEach(row => {
          if (row.date) {
            diaryData[row.date.trim()] = {
              memo: row.memo?.trim() || '',
              extra: row.text?.trim() || ''
            };
          }
        });
        setDiary(diaryData);
      },
      error: (err) => console.error('CSV parse error:', err)
    });
  }, []);

  const renderCalendar = () => {
    const y = current.getFullYear();
    const m = current.getMonth();
    const firstDay = new Date(y, m, 1).getDay();
    const totalDays = new Date(y, m + 1, 0).getDate();
    const now = new Date();
    const monthNames = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d, i) => (
      <div key={d} className={`cal-day ${i === 0 ? 'sun' : i === 6 ? 'sat' : ''}`}>
        {d}
      </div>
    ));

    const emptyDays = Array(firstDay).fill(null).map((_, i) => <div key={`empty-${i}`}></div>);

    const dateCells = [];
    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const row = diary[dateStr] || {};
      const memo = row.memo || '';
      const isToday = (d === now.getDate() && m === now.getMonth() && y === now.getFullYear());
      const dayOfWeek = new Date(y, m, d).getDay(); // 요일 인덱스

      const dayClass = dayOfWeek === 0 ? 'sun' : dayOfWeek === 6 ? 'sat' : '';

      dateCells.push(
        <div
          key={d}
          className={`cal-date ${isToday ? 'today' : ''} ${dayClass}`}
          onClick={() => handleDateClick(dateStr, row)}
        >
          <div className="date-top">
            {d}
            {memo && <span className="memo-star">🌟</span>}
          </div>
          <div
            className="memo-preview"
            dangerouslySetInnerHTML={{
              __html: (memo || '').replace(/\\n|\n/g, '<br>')
            }}
          />
        </div>
      );
    }

    return (
      <>
          <div className="diary-header">
            <div className="diary-title-line">
              <span className="calendar-icon">📅</span>
              <h2 className="diary-title">DIARY</h2>
            </div>
            <p className="diary-description">시루의 하루 기록</p>
          <div className="diary-bottom">
            <img
              src={arrowImg}
              alt="Prev"
              className="arrow-btn small-arrow left-arrow"
              onClick={() => setCurrent(new Date(y, m - 1))}
            />
            <span id="monthLabel" className="small-month-label">
              {monthNames[m]} {y}
            </span>
            <img
              src={arrowImg}
              alt="Next"
              className="arrow-btn small-arrow"
              onClick={() => setCurrent(new Date(y, m + 1))}
            />
          </div>
        </div>
        <div className="calendar">
          {days}
          {emptyDays}
          {dateCells}
        </div>
      </>
    );
  };

  const handleDateClick = (dateStr, row) => {
    setSelectedDate({ date: dateStr, ...row });
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedDate(null);
  };

  return (
    <main className="diary-page">
      {renderCalendar()}

      {isPopupOpen && selectedDate && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>❌</button>
            <div className="popup-content">
              <h3 className="popup-date">{selectedDate.date}</h3>
              <p className="popup-memo" dangerouslySetInnerHTML={{
                __html: (selectedDate.memo || '메모 없음 🐾').replace(/\\n/g, '<br>')
              }}></p>
              <p
                className="popup-extra"
                dangerouslySetInnerHTML={{
                  __html: (selectedDate.extra || '').replace(/\\n|\n/g, '<br>')
                }}
              ></p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Diary;
