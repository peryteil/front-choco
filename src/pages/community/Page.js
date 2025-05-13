import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommuHeader from "../../components/commuheader/Commuheader";
import "./CommunityPage.css";

export default function CommunityPage() {
  const navigate = useNavigate();

  const [hotdeals, setHotdeals] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // 핫딜 더미 데이터
    setHotdeals([
      { id: 1, brand: "스타벅스", title: "아메리카노 1+1", likes: 20, comments: 5, date: "2025-04-30" },
      { id: 2, brand: "이마트", title: "초콜릿 특가", likes: 15, comments: 3, date: "2025-04-29" }
    ]);

    // 베스트 상품 더미
    setVisibleProducts([
      {
        id: 1,
        rank: 1,
        brand: "초콜릿월드",
        name: "고디바 다크 초콜릿 컬렉션",
        image: "/image/cho1.png",
        price: 32000,
        originalPrice: 40000,
        discount: 20,
        rating: 4.8,
        reviews: 128
      }
    ]);

    // 리뷰 더미
    setReviews([
      {
        id: 1,
        user: "초콜릿리뷰러",
        product: "고디바 다크 초콜릿 컬렉션",
        date: "2023-04-15",
        rating: 5,
        content: "진짜 맛있어요!",
        image: "/image/cho1.png"
      }
    ]);
  }, []);
  return (
    <div className="community-wrapper">
      <CommuHeader />
      <div className="community-sections">
        {/* 🔸 HOT DEAL 컬럼 */}
        <div className="community-column">
          <h3>🍫 HOT DEAL</h3>
          <div className="hotdeal-table">
            <div className="hotdeal-list">
              {hotdeals.map((deal) => (
                <div key={deal.id} className="card" onClick={() => navigate(`/community/hotdeal/${deal.id}`)}>
                  <div className="card-content">
                    <div className="card-title">{deal.title}</div>
                    <div className="card-sub">{deal.brand} ・ {deal.date}</div>
                    <div className="card-meta">👍 {deal.likes}　💬 {deal.comments}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🔸 BEST 컬럼 */}
        <div className="community-column">
          <h3>🔥 실시간 베스트</h3>
          <div className="hotdeal-list">
            {visibleProducts.map((item) => (
              <div key={item.id} className="card">
                <img src={process.env.PUBLIC_URL + item.image} alt={item.name} className="card-img" />
                <div className="card-content">
                  <div className="card-title">{item.name}</div>
                  <div className="card-sub">{item.brand}</div>
                  <div className="card-meta">{item.price.toLocaleString()}원</div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* 🔸 REVIEW 컬럼 */}
        <div className="community-column">
          <h3>⭐ 월간 리뷰</h3>
          <div className="hotdeal-list">
            {reviews.map((review) => (
              <div key={review.id} className="card">
                <img
                  src={process.env.PUBLIC_URL + review.image}
                  alt={review.product}
                  className="card-img"
                />
                <div className="card-content">
                  <div className="card-title">{review.product}</div>
                  <div className="card-sub">{review.user} ・ {review.date}</div>
                  <div className="card-meta">{review.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
