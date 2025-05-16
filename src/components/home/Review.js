import { useEffect, useState } from "react";
import "./Review.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Review() {
  const [review , setReview] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/review/latest`)
    .then(res=>{
      setReview(res.data)
    })
    .catch(err=>{
      console.log("없어용",err)
    })
  },[])

  return (
    
    <section className="review-section">
      <div className="review-top">
        <h2 className="review-title">월간 리뷰 TOP6</h2>
        <a href="/community/reviews" className="more-link">더보기 &gt;</a>
      </div>

      <div className="review-grid">
        {review.map(item => (
          <div key={item.id} className="review-card" onClick={()=>navigate(`/market/${item.productId}`)}>
            <div className="review-header">
              <img src={item.imageUrl} alt="프로필" className="profile-image" />
              <div className="stars">
                {"★".repeat(item.rating)}
                {"☆".repeat(5 - item.rating)}
              </div>
            </div>
            <div className="review-body">
              <div className="product-info">
                <h3>{item.productName}</h3>
                <p className="date">{item.createdAt.split("T")[0]}</p>
                <p className="content">{item.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
