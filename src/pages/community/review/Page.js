import React, { useState, useEffect } from "react";
import "./ReviewPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [reviewview, setReviewView] = useState([]);
  const [reviewCreate, setCteate] = useState([]);
  const navigate = useNavigate();
// like 많은순서
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/review/top`)
    .then(res=>{
      setReviews(res.data)
    })
    .catch(err=>{
      console.log("리뷰 불러오기 싫패",err)
    })
  },[])
  // view제일 많은순
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/review/topLike`)
    .then(res=>{
      setReviewView(res.data)
    })
    .catch(err=>{
      console.log("리뷰 불러오기 싫패",err)
    })
  },[])
  // 최신
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/review/latest`)
    .then(res=>{
      setCteate(res.data)
    })
    .catch(err=>{
      console.log("리뷰 불러오기 싫패",err)
    })
  },[])

  const goToDetail = (productId) => {
    navigate(`/market/${productId}`);
  };

  return (
    <div className="review-page">
      <div className="review-top">
        <h2>월간 리뷰 TOP6</h2>
      </div>

      <div className="review-list">
        {reviews.map(review => (
          <div key={review.id} className="review-card" onClick={()=>goToDetail(review.productId)}>
            <div className="review-header">
              {/* <span className="user">{review.user}</span> */}
              <span className="stars">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
            </div>
            <div className="review-body">
              <img src={review.imageUrl} alt={review.product} />
              <div className="review-info">
                <h4>{review.productName}</h4>
                <p className="date">{review.createdAt.split("T")[0]}</p>
                <p className="content">{review.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="trending-section">
        <div className="trending-header">
          <h2>지금 떠오르는 후기</h2>
        </div>
        <div className="trending-list">
          {reviewview.map((item) => (
            <div key={item.id} className="trending-card" onClick={()=>goToDetail(item.productId)}>
              <img src={item.imageUrl} alt={item.productName} />
              <p className="trending-title">{item.productName}</p>
              <div className="trending-stats">
                <span>👍 {item.likeCount}</span>
                <span>💬 {item.content}</span>
                <span>👁 {item.viewCount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="review-list-page">
        <h2>초콜릿 구매를 리뷰로 공유해요</h2>
        <div className="search-box">
          {/* <input
            type="text"
            placeholder="브랜드명, 제목, 국가 등 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          /> */}
        </div>
        {reviewCreate.map((r) => (
          <div key={r.id} className="review-box" >
            <div className="review-top">
              <div>
                {/* <div className="user">{r.user}</div> */}
                <div className="stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
              </div>
              <div className="date">{r.createdAt.split("T")[0]}</div>
            </div>

            <div className="review-body">
              <img src={r.imageUrl} alt="review" />
              <div className="review-info">
                <h3>{r.productName}</h3>
                {/* <p className="meta">
                  브랜드: {r.brand} &nbsp;&nbsp;|&nbsp;&nbsp; 국가: {r.country} &nbsp;&nbsp;|&nbsp;&nbsp; 가격: {r.price.toLocaleString()}원
                </p> */}
                <p className="content">{r.content}</p>
                <div className="review-bottom">
                  <div className="stats">
                    <span>👍 좋아요 {r.likeCount}</span>
                    <span>💬 댓글 {r.content}</span>
                  </div>
                  <button className="detail-button" onClick={()=>goToDetail(r.productId)}>자세히 보기</button>
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
