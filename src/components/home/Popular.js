import { useEffect, useState } from "react";
import "./Popular.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Popular() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/product/findByMain`)
      .then(res => {
        setProduct(res.data);
      })
      .catch(err => {
        console.log("없음", err);
      });
  }, []);

  return (
    <section className="popular-section">
      <div className="pop">
        <h2 className="section-title">인기 초콜릿</h2>
        <div className="popular-grid">
          {product.map((item) => (
            <div className="popular-card" key={item.id} onClick={()=>navigate(`/market/${item.id}`)}>
              <div className="popular-image">
                <img
                  src={item.imageDtos[0]?.fileUrl || "/image/placeholder.png"}
                  alt={item.title}
                />
                <span className="badge">NEW</span>
              </div>
              <div className="popular-info">
                <div className="popular-header">
                  <h3>{item.title}</h3>
                  <span className="price">
                    {item.price.toLocaleString()}원
                  </span>
                </div>
                <p className="brand-info">{item.brand}</p>
                <p className="product-type">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
