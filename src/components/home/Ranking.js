import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Ranking.css";

export default function Ranking() {
  const [rankingItems, setRankingItems] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/product/bestReview`)
      .then((res) => {
        // 상위 5개만 추려서 저장
        const top5 = res.data.slice(0, 5);
        setRankingItems(top5);
      })
      .catch((err) => console.error("랭킹 데이터 불러오기 실패", err));
  }, []);

  return (
    <section className="ranking-section">
      <div className="ranking-top">
        <h2 className="ranking-title">실시간 구매 랭킹</h2>
        <a href="/market/ranking" className="more-link">더보기 &gt;</a>
      </div>

      <div className="ranking-grid">
        {rankingItems.map((item, index) => (
          <div key={item.id} className="ranking-card">
            <div className="ranking-badge">{index + 1}</div>
            <div className="ranking-image">
              <img src={item.imageDtos?.[0]?.fileUrl} alt={item.title} />
            </div>
            <div className="ranking-info">
              <h3>{item.title}</h3>
              <div className="ranking-bottom">
                <strong>{item.price.toLocaleString()}원</strong>
                <div className="ranking-star">
                  ⭐ {item.averageRating.toFixed(1)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
