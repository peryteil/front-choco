import React, { useState, useEffect } from "react";
import "./BestPage.css";
import axios from "axios";

export default function BestPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/product/bestReview`)
      .then(res => setAllProducts(res.data))
      .catch(err => console.error("상품 불러오기 실패:", err));
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  const visibleProducts = allProducts.slice(0, visibleCount);

  return (
    <div className="best-product-wrapper">
      <h2 className="best-title">🔥 실시간 베스트</h2>

      <div className="best-product-grid">
        {visibleProducts.map((item) => (
          <div key={item.id} className="best-product-card">
            <div className="rank-badge">{item.rank}</div>
            {item.discount && <div className="discount-badge">{item.discount}%</div>}
            <img src={item.imageDtos?.[0]?.fileUrl} alt={item.name} />
            <div className="brand">{item.category}</div>
            <div className="product-name">{item.title}</div>
            <div className="price">
              {item.originalPrice && (
                <span className="original">{item.originalPrice.toLocaleString()}원</span>
              )}
              <span className="final">{item.price.toLocaleString()}원</span>
            </div>
            <div className="rating">
              {"★".repeat(Math.round(item.averageRating))}
              {"☆".repeat(5 - Math.round(item.averageRating))} ({item.reviewCount})
            </div>
          </div>
        ))}
      </div>

      {visibleCount < allProducts.length && (
        <div className="load-more-box">
          <button className="load-more-button" onClick={handleLoadMore}>
            더보기
          </button>
        </div>
      )}
    </div>
  );
}
