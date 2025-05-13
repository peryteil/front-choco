// src/components/product/RelatedProducts.jsx
import './Relate.css';

export default function Relate() {
  // 임시 데이터
  const related = [
    { id: "5", name: "발로나 다크 초콜릿 셀렉션", price: 42000, image: "/image/dark2.png" },
    { id: "6", name: "린트 화이트 초콜릿", price: 30000, image: "/image/white1.png" },
  ];

  return (
    <section className="related-products">
      <h2>관련 제품</h2>
      <div className="related-grid">
        {related.map((item) => (
          <div key={item.id} className="related-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price.toLocaleString()}원</p>
          </div>
        ))}
      </div>
    </section>
  );
}
