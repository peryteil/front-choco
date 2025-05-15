import React, { useEffect, useState } from "react";
import MarketBanner from "../../components/market/MarketBanner";
import "./BrandPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const countries = ["전체", "벨기에", "스위스", "프랑스", "이탈리아", "독일", "영국", "미국", "일본"];

export default function BrandPage() {
  const [brand, setBrand] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("전체");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        let url =
          selectedCountry === "전체"
            ? `${process.env.REACT_APP_API_URL}/brand/findAllList`
            : `${process.env.REACT_APP_API_URL}/brand/findByCountry/${encodeURIComponent(selectedCountry)}`;

        const res = await axios.get(url);
        setBrand(res.data);
      } catch (err) {
        console.error("브랜드 데이터 불러오기 실패", err);
      }
    };

    fetchBrands();
  }, [selectedCountry]); // 나라가 바뀔 때마다 요청

  return (
    <div className="brand-wrapper">
      <MarketBanner />
      <div className="brand-inner">
        <h2 className="brand-main-title">모든 브랜드</h2>
        <div className="brand-tab-menu">
          {countries.map((cty) => (
            <button
              key={cty}
              className={`brand-category-button ${selectedCountry === cty ? "active" : ""}`}
              onClick={() => setSelectedCountry(cty)}
            >
              {cty}
            </button>
          ))}
        </div>
        <div className="brand-grid" >
          {brand.map((brand) => (
            <div className="brand-card" key={brand.id} onClick={() => navigate(`/brand/${brand.id}`)}>
              <img src={brand.images[0]?.fileUrl} alt={brand.title} />
              <h4>{brand.title}</h4>
              <p className="founded">설립: {brand.founded}년</p>
              <p className="desc">{brand.introduction}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
