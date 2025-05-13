import React, { useState, useEffect } from "react";
import "./ReviewPage.css";

const dummyReviews = [
  {
    id: 1,
    user: "초콜릿리뷰러",
    product: "고디바 다크 초콜릿 컬렉션",
    date: "2023-04-15",
    rating: 5,
    content: "진짜 맛있어요! 다크 초콜릿인데도 쓴맛이 적당해서 좋았습니다.",
    image: "/image/review1.png"
  },
  {
    id: 2,
    user: "달콤한인생",
    product: "린트 수프림 시리즈 밀크 초콜릿 종합세트",
    date: "2023-04-18",
    rating: 4,
    content: "포장이 고급스럽고 맛도 좋아요! 선물용으로 딱입니다.",
    image: "/image/review2.png"
  },
  {
    id: 3,
    user: "초코홀릭",
    product: "발로나 다크 초콜릿 70% 프로페셔널",
    date: "2023-04-20",
    rating: 5,
    content: "디저트용으로 구매했는데 베이킹에 쓰기 딱 좋아요! 다른 브랜드보다 맛 좋음!",
    image: "/image/review3.png"
  }
];
const trendingReviews = [
  {
    id: 101,
    title: "고디바 다크 초콜릿 컬렉션",
    image: "/image/trend1.png",
    likes: 24,
    comments: 8,
    views: 156
  },
  {
    id: 102,
    title: "린트 밀크 초콜릿 트러플",
    image: "/image/trend2.png",
    likes: 18,
    comments: 5,
    views: 132
  },
  {
    id: 103,
    title: "뇌하우스 화이트 초콜릿 프랄린",
    image: "/image/trend3.png",
    likes: 15,
    comments: 4,
    views: 98
  },
  {
    id: 104,
    title: "토블론 밀크 초콜릿 바",
    image: "/image/trend4.png",
    likes: 12,
    comments: 3,
    views: 87
  },
  {
    id: 105,
    title: "발로나 다크 초콜릿 셀렉션",
    image: "/image/trend5.png",
    likes: 10,
    comments: 2,
    views: 76
  }
];
const dummyList = [
  {
    id: 1,
    user: "초콜릿러버",
    brand: "고디바",
    country: "벨기에",
    price: 32000,
    date: "2023-04-25",
    rating: 5,
    title: "가격이 저렴해요.",
    content: "벨기에 직구로 정품 구매했는데, 국내보다 저렴하게 구매했어요.",
    image: "/image/review1.png",
    likes: 15,
    comments: 3
  },
  {
    id: 2,
    user: "달콤한인생",
    brand: "린트",
    country: "스위스",
    price: 28000,
    date: "2023-04-24",
    rating: 5,
    title: "맛과 품질 다 만족합니다.",
    content: "밀크 초콜릿 중에서 고급스러운 맛이에요. 선물용/개인 소장용 둘 다 추천합니다.",
    image: "/image/review2.png",
    likes: 12,
    comments: 2
  }
];


function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setReviews(dummyReviews);
    // axios.get('/api/reviews').then(res => setReviews(res.data));
  }, []);
  useEffect(() => {
    setReviews(dummyList);
    // 나중에 API 연동 시 axios.get("/api/reviews").then(res => setReviews(res.data))
  }, []);

  return (
    <div className="review-page">
      <div className="review-top">
        <h2>월간 리뷰 TOP6</h2>
      </div>

      <div className="review-list">
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <span className="user">{review.user}</span>
              <span className="stars">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
            </div>
            <div className="review-body">
              <img src={process.env.PUBLIC_URL + review.image} alt={review.product} />
              <div className="review-info">
                <h4>{review.product}</h4>
                <p className="date">{review.date}</p>
                <p className="content">{review.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="trending-section">
        <div className="trending-header">
          <h2>지금 떠오르는 후기</h2>
          <a href="#" className="more-link">더보기 &gt;</a>
        </div>
        <div className="trending-list">
          {trendingReviews.map((item) => (
            <div key={item.id} className="trending-card">
              <img src={process.env.PUBLIC_URL + item.image} alt={item.title} />
              <p className="trending-title">{item.title}</p>
              <div className="trending-stats">
                <span>👍 {item.likes}</span>
                <span>💬 {item.comments}</span>
                <span>👁 {item.views}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="review-list-page">
        <h2>초콜릿 구매를 리뷰로 공유해요</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="브랜드명, 제목, 국가 등 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {reviews.map((r) => (
          <div key={r.id} className="review-box">
            <div className="review-top">
              <div>
                <div className="user">{r.user}</div>
                <div className="stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
              </div>
              <div className="date">{r.date}</div>
            </div>

            <div className="review-body">
              <img src={process.env.PUBLIC_URL + r.image} alt="review" />
              <div className="review-info">
                <h3>{r.title}</h3>
                <p className="meta">
                  브랜드: {r.brand} &nbsp;&nbsp;|&nbsp;&nbsp; 국가: {r.country} &nbsp;&nbsp;|&nbsp;&nbsp; 가격: {r.price.toLocaleString()}원
                </p>
                <p className="content">{r.content}</p>
                <div className="review-bottom">
                  <div className="stats">
                    <span>👍 좋아요 {r.likes}</span>
                    <span>💬 댓글 {r.comments}</span>
                  </div>
                  <button className="detail-button">자세히 보기</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewPage;
