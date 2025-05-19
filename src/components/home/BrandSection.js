import { useEffect, useState } from "react";
import "./BrandSection.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BrandSection() {
  const [brand, setBrand] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/brand/findByMain`)
      .then(res => {
        setBrand(res.data)
      })
      .catch(err => {
        console.log("데이터 못부름", err)
      })
  }, [])

  return (
    <section className="brand-section">
      <h2>나라별 초콜릿 브랜드</h2>
      <div className="brand-grid">

        {brand.map((item) => (
          <div className="brand-card"
          onClick={()=>navigate(`/brand/${item.id}`)}>
            <img src={item.images[0]?.fileUrl} alt="Godiva" />
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        ))}
      </div>

    </section>

  );
}
