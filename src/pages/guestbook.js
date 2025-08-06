import React, { useState, useEffect } from 'react';
import '../css/guestbook.css';
import '../css/font.css';
import '../css/responsive.css';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from 'firebase/firestore';

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyAcm71bwhgmASa8z8Wk2DN6C3a_NbbknV0",
  authDomain: "sirupan-guestbook.firebaseapp.com",
  projectId: "sirupan-guestbook",
  storageBucket: "sirupan-guestbook.firebasestorage.app",
  messagingSenderId: "412465451441",
  appId: "1:412465451441:web:bc7b204b12cb7cc22b6d90",
  measurementId: "G-JRRQQMRBZ0"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// 날짜 포맷
const formatDate = (timestamp) => {
  if (!timestamp) return '...';
  const date = timestamp.toDate();
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
};

const Guestbook = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "guestbook"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgList);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      alert("이름과 메시지를 모두 입력해주세요!");
      return;
    }

    try {
      await addDoc(collection(db, "guestbook"), {
        name,
        message,
        password,
        timestamp: serverTimestamp()
      });

      setName('');
      setMessage('');
      setPassword('');
    } catch (error) {
      console.error("저장 실패:", error);
      alert("메시지 저장 실패 😢");
    }
  };

  const handleDelete = async (id, savedPassword) => {
    const userInput = prompt("메시지를 삭제하려면 비밀번호를 입력하세요:");
    if (userInput !== savedPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await deleteDoc(doc(db, "guestbook", id));
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("메시지 삭제 실패 😭");
    }
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
        <small>※ 메시지 삭제를 원하면 비밀번호를 꼭 입력하세요.</small>
      </p>

      <form className="guestbook-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="메시지를 입력하세요"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="password"
          placeholder="삭제용 비밀번호 (선택)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">메시지 남기기</button>
      </form>

      <div className="guestbook-messages">
        {messages.map(msg => (
          <div key={msg.id} className="guestbook-message">
            <div className="guestbook-msg-header">
              <strong>{msg.name}</strong>
              <span className="meta-right">
                <span className="msg-timestamp">{formatDate(msg.timestamp)}</span>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(msg.id, msg.password)}
                >
                  🗑️
                </button>
              </span>
            </div>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Guestbook;
