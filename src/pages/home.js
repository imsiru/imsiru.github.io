import { useEffect, useState } from 'react';
import '../css/responsive.css';
import '../css/font.css';
import img1 from '../images/home/1.png';

const Home = () => {
  const [animatedText, setAnimatedText] = useState("멍멍멍멍멍멍멍");
  const [isEnglish, setIsEnglish] = useState(false);

  useEffect(() => {
    const original = "멍멍멍멍멍멍멍".split("");
    const target = "WELCOME".split("");
    let index = 0;

    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (index < target.length) {
          original[index] = target[index];
          setAnimatedText([...original].join(""));
          index++;
        } else {
          clearInterval(intervalId);
          setIsEnglish(true);
        }
      }, 300);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="intro-section">
      <div className="intro-container">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <h1
              className={`subheading ${isEnglish ? 'font-english' : 'font-korean'}`}
              style={{ fontSize: '3rem' }}
            >
              {animatedText}
            </h1>
          </div>

          <div className="intro-text" style={{ marginLeft: '5rem', textAlign: 'left' }}>
            <h2 className="daily-title">
              <span style={{ color: '#000000ff' }}>시루의 하루:</span><br />{' '}
              <span style={{ color: '#eeb96aff' }}>자고, </span>{' '}
              <span style={{ color: '#89da81ff' }}>먹고, </span>{' '}
              <span style={{ color: '#46ddf8ff' }}>사고침.</span>
            </h2>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0,
              margin: 0,
            }}
          >
            <img
              src={img1}
              alt="시루 귀여운 사진"
              className="intro-banner"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>

          <div className="intro-text" style={{ margin: '0 auto' }}>
            <p>
              세상 제일 똑똑하고 제일 귀엽고 제일 말 안듣는<br />
              우리 집 댕댕이 <strong>시루</strong>를 소개합니다! 🐾
            </p>
            <table
              className="dog-specs"
              style={{ maxWidth: '450px', width: '100%', margin: '0 auto' }}
            >
              <tbody>
                <tr><th>이름</th><td>안시루</td></tr>
                <tr><th>견종</th><td>말티푸</td></tr>
                <tr><th>체고</th><td>15 cm</td></tr>
                <tr><th>체장</th><td>26 cm (유동적)</td></tr>
                <tr><th>꼬리길이 (털 포함)</th><td>10 cm</td></tr>
                <tr><th>몸무게</th><td>1.93 kg</td></tr>
                <tr><th>탄생일</th><td>2025.02.08</td></tr>
                <tr><th>안씨 합류일</th><td>2025.07.09</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <section className="instagram-section">
        <h4>Follow Me On Instagram</h4>
        <div className="instagram-link">
          <a
            href="https://www.instagram.com/siru_ahn_"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1384/1384031.png"
              alt="Instagram"
            />
            <span>siru_ahn_</span>
          </a>
        </div>
      </section>
    </section>
  );
};

export default Home;
