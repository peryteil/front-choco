
import { useEffect, useState } from "react";
import "./CommunityHighlight.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CommunityHighlight() {
  const [hotDeal, setHotDeal] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/hotDeal/topmain`)
      .then(res => {
        setHotDeal(res.data)
      })
      .catch(err => {
        console.log("없어어어엉", err)
      })
  }, [])
  return (
    <section className="community-section">
      <h2 className="community-title">커뮤니티 하이라이트</h2>

      <div className="highlight-top">
        <h3 className="highlight-title">베스트 핫 딜</h3>
        <a href="/community/hotdeals" className="more-link">더보기 &gt;</a>
      </div>

      <div className="highlight-grid">
        {hotDeal.map((item) => (
          <div className="highlight-card" key={item.id} onClick={()=>navigate(`/community/hotdeal/${item.id}`)}>
            <div className="highlight-image">
              <img
                src={item.imageDtos[0]?.fileUrl || "/image/placeholder.png"}
                alt={item.title}
              />
              <span className="discount-badge">{item.discountPercent}% OFF</span>
            </div>
            <div className="highlight-info">
              <h4>{item.title}</h4>
              <div className="highlight-meta">
                {item.shopName} · 조회 {item.viewCount} · 댓글 {item.commentCount}
              </div>
              <div className="highlight-price">
                <strong>{item.price?.toLocaleString()}원</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
