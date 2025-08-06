import React, { useState, useEffect } from 'react';
import '../css/guestbook.css';
import '../css/font.css';
import '../css/responsive.css';

const Guestbook = () => {
  const [formData, setFormData] = useState({ name: '', password: '', message: '' });
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('guestbook')) || [];
    setEntries(saved);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, password, message } = formData;

    if (!name.trim() || !password.trim() || !message.trim()) {
      alert('모든 항목을 입력해주세요!');
      return;
    }

    const newEntry = {
      name: name.trim(),
      password: password.trim(),
      message: message.trim(),
      date: new Date().toLocaleString()
    };

    const updated = [newEntry, ...entries];
    localStorage.setItem('guestbook', JSON.stringify(updated));
    setEntries(updated);
    setFormData({ name: '', password: '', message: '' });
  };

  const confirmPasswordForDelete = (index) => {
    const confirmPw = prompt('비밀번호를 입력해주세요');
    if (confirmPw === entries[index].password) {
      deleteEntry(index);
      alert('✅ 삭제되었습니다!');
    } else {
      alert('❌ 비밀번호가 틀렸습니다!');
    }
  };

  const deleteEntry = (index) => {
    const updated = [...entries];
    updated.splice(index, 1);
    localStorage.setItem('guestbook', JSON.stringify(updated));
    setEntries(updated);
  };

  return (
    <main className="guestbook-page">
      <div className="guestbook-header">
        <div className="diary-title-line"></div>
        <span className="guestbook-icon">📖</span>
        <h2 className="guestbook-title">GUEST BOOK</h2>
      </div>

      <p className="guestbook-description">
        시루에게 따뜻한 메시지를 남겨주세요 💬<br />
        <small>※ 메시지를 삭제하려면 비밀번호가 필요합니다.</small>
      </p>

      <form className="guestbook-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="4자리 비밀번호"
          maxLength="4"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="시루에게 응원의 한마디!"
          maxLength="200"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">💌 등록!</button>
      </form>

      <div className="guestbook-list">
        {entries.map((entry, i) => (
          <div key={i} className="guestbook-entry-box">
            <div className="entry-top">
              <div className="entry-meta">
                <span className="entry-name"><strong>{entry.name}</strong></span>
                <span className="entry-date">{entry.date}</span>
              </div>
              <div className="entry-action">
                <button className="delete-btn" onClick={() => confirmPasswordForDelete(i)}>
                  🗑️
                </button>
              </div>
            </div>
            <p className="entry-message" dangerouslySetInnerHTML={{
              __html: entry.message.replace(/\n/g, '<br>')
            }} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Guestbook;
