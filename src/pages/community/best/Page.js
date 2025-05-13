import React, { useState } from "react";
import "./BestPage.css";

const allProducts = [
  {
    id: 1,
    rank: 1,
    brand: "초콜릿월드",
    name: "고디바 다크 초콜릿 컬렉션",
    image: "/image/best1.png",
    price: 32000,
    originalPrice: 40000,
    discount: 20,
    rating: 4.8,
    reviews: 128
  },
  {
    id: 2,
    rank: 2,
    brand: "초콜릿월드",
    name: "린트 밀크 초콜릿 트러플",
    image: "/image/best2.png",
    price: 28000,
    originalPrice: 35000,
    discount: 20,
    rating: 4.6,
    reviews: 96
  },
  {
    id: 3,
    rank: 3,
    brand: "초콜릿월드",
    name: "뇌하우스 화이트 초콜릿 프랄린",
    image: "/image/best3.png",
    price: 35000,
    originalPrice: null,
    discount: null,
    rating: 4.3,
    reviews: 64
  },
  {
    id: 4,
    rank: 4,
    brand: "초콜릿월드",
    name: "토블론 밀크 초콜릿 바",
    image: "/image/best4.png",
    price: 18000,
    originalPrice: 22000,
    discount: 18,
    rating: 4.5,
    reviews: 112
  },
  {
    id: 5,
    rank: 5,
    brand: "초콜릿월드",
    name: "린트 헤이즐넛 초콜릿",
    image: "/image/best5.png",
    price: 30000,
    originalPrice: 35000,
    discount: 14,
    rating: 4.7,
    reviews: 85
  },
  {
    id: 6,
    rank: 6,
    brand: "초콜릿월드",
    name: "키트캣 화이트",
    image: "/image/best6.png",
    price: 22000,
    originalPrice: 26000,
    discount: 15,
    rating: 4.2,
    reviews: 53
  },
  {
    id: 7,
    rank: 7,
    brand: "초콜릿월드",
    name: "페레로 로쉐 컬렉션",
    image: "/image/best7.png",
    price: 25000,
    originalPrice: 30000,
    discount: 17,
    rating: 4.9,
    reviews: 210
  },
  {
    id: 8,
    rank: 8,
    brand: "초콜릿월드",
    name: "허쉬 다크 초콜릿",
    image: "/image/best8.png",
    price: 18000,
    originalPrice: 21000,
    discount: 14,
    rating: 4.0,
    reviews: 45
  },
  {
    id: 9,
    rank: 9,
    brand: "초콜릿월드",
    name: "가나 밀크 초콜릿",
    image: "/image/best9.png",
    price: 12000,
    originalPrice: 15000,
    discount: 20,
    rating: 4.1,
    reviews: 32
  },
  {
    id: 10,
    rank: 10,
    brand: "초콜릿월드",
    name: "크런키 민트초코",
    image: "/image/best10.png",
    price: 13000,
    originalPrice: 16000,
    discount: 18,
    rating: 4.4,
    reviews: 60
  }
];

export default function BestPage() {
  const [visibleCount, setVisibleCount] = useState(5);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
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
            <img src={process.env.PUBLIC_URL + item.image} alt={item.name} />
            <div className="brand">{item.brand}</div>
            <div className="product-name">{item.name}</div>
            <div className="price">
              {item.originalPrice && (
                <span className="original">{item.originalPrice.toLocaleString()}원</span>
              )}
              <span className="final">{item.price.toLocaleString()}원</span>
            </div>
            <div className="rating">
              {"★".repeat(Math.round(item.rating))}
              {"☆".repeat(5 - Math.round(item.rating))} ({item.reviews})
            </div>
            <div className="cart-icon">🛒</div>
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
