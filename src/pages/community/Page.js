import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommuHeader from "../../components/commuheader/Commuheader";
import "./CommunityPage.css";
import axios from "axios";

export default function CommunityPage() {
  const navigate = useNavigate();
  const [proBest, setProBest] = useState([]);
  const [hotdeals, setHotdeals] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/product/findBest`)
      .then(res => {
        setProBest(res.data)
      })
      .catch(err => {
        console.log("없엉", err)
      })
  }, [])
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/review/top`)
      .then(res => {
        setReviews(res.data)
      })
      .catch(err => {
        console.log("없어용", err)
      })
  }, [])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/hotDeal/top`)
    .then(res=>{
      setHotdeals(res.data)
    })
    .catch(err=>{
      console.log("없어용",err)
    })
  }, []);
  return (
    <div className="community-wrapper">
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
                    <div className="card-sub">{deal.shopName}</div>
                    <div className="card-meta">👍 {deal.likeCount}　👓 {deal.viewCount}</div>
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
            {proBest.map((item) => (
              <div key={item.id} className="card" onClick={() => navigate(`/market/${item.id}`)}>
                <img src={item.imageDtos?.[0]?.fileUrl} alt={item.name} className="card-img" />
                <div className="card-content">
                  <div className="card-title">{item.title}</div>
                  <div className="card-sub">{item.category}</div>
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
              <div key={review.id} className="card" onClick={() => navigate(`/market/${review.productId}`)}>
                <img
                  src={review.imageUrl}
                  alt={review.product}
                  className="card-img"
                />
                <div className="card-content">
                  <div className="card-title">{review.productName}</div>
                  <div className="review-stars">
                    {Array.from({ length: 5 }, (_, i) =>
                      i < review.rating ? "⭐" : "☆"
                    ).join("")}
                  </div>
                  {/* <div className="card-sub">{review.user} ・ {review.date}</div> */}
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
