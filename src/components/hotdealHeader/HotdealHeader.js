import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 추가

function HotdealHeader() {
  const [hotdeals, setHotdeals] = useState([]);
  const navigate = useNavigate(); // 네비게이터 생성

  const dummyData = [
    {
      id: 1,
      brand: "스타벅스",
      title: "아메리카노 1+1 이벤트",
      likes: 23,
      comments: 5,
      date: "2025-04-30"
    },
    {
      id: 2,
      brand: "이마트",
      title: "초콜릿 특가 할인🔥",
      likes: 41,
      comments: 12,
      date: "2025-04-29"
    }
  ];

  useEffect(() => {
    setHotdeals(dummyData);
    // axios.get('/api/hotdeals').then(res => setHotdeals(res.data));
  }, []);

  return (
    <div>
      <div
        className="hotdeal-banner"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/image/hotdeal.png)`
        }}
      >
        <span className="badge">🍫 BEST HOT DEAL</span>
      </div>

      <div className="hotdeal-table">
        <h4>BEST HOT DEAL</h4>
        <ul>
          {hotdeals.map((deal, i) => (
            <li key={i}>
              <span className="brand">{deal.brand}</span>
              <span
                className="title clickable"
                onClick={() => navigate(`/community/hotdeal/${deal.id}`)}
              >
                {deal.title} <span className="label">HOTDEAL</span>
              </span>
              <span className="likes">👍 {deal.likes}</span>
              <span className="comments">💬 {deal.comments}</span>
              <span className="date">{deal.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HotdealHeader;
