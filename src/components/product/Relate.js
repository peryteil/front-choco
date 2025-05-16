// src/components/product/RelatedProducts.jsx
import { useEffect, useState } from 'react';
import './Relate.css';
import { useNavigate } from 'react-router-dom';

export default function Relate({ productId }) {
  const [related, setRelated] = useState([]);
  const navigate = useNavigate();

  console.log(productId)
  useEffect(() => {
    if (productId) {
      fetch(`${process.env.REACT_APP_API_URL}/product/findRelate/${productId}`)
        .then((res) => {
          if (!res.ok) throw new Error('네트워크 오류');
          return res.json();
        })
        .then((data) => setRelated(data))
        .catch((err) => console.error('관련 상품 조회 실패:', err));
    }
  }, [productId]);

  return (
    <section className="related-products">
      <h2>관련 제품</h2>
      <div className="related-grid">
        {related.map((item) => (
          <div key={item.id} className="related-card" onClick={() => navigate(`/market/${item.id}`)} // ✅ 클릭시 이동
            style={{ cursor: 'pointer' }}>
            <img src={item.imageDtos[0]?.fileUrl} alt={item.name} />
            <h3>{item.title}</h3>
            <p>{item.price.toLocaleString()}원</p>
          </div>
        ))}
      </div>
    </section>
  );
}
