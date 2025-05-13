import React, { useState } from "react";
import MarketBanner from "../../components/market/MarketBanner";
import "./BrandPage.css";
import { useNavigate } from "react-router-dom";

const allBrands = [
  { id: 1, name: "고디바", founded: 1926, country: "벨기에", image: "/image/godivang.png", desc: "1926년 설립된 벨기에의 대표 브랜드입니다." },
  { id: 2, name: "뇌하우스", founded: 1857, country: "벨기에", image: "/image/brand_neuhaus.png", desc: "프랄린을 만든 전통의 벨기에 브랜드입니다." },
  { id: 3, name: "레오니다스", founded: 1913, country: "벨기에", image: "/image/brand_leonidas.png", desc: "합리적인 가격의 벨기에 초콜릿." },
  { id: 4, name: "린트", founded: 1845, country: "스위스", image: "/image/brand_lindt.png", desc: "스위스의 대표 초콜릿 브랜드입니다." },
  { id: 5, name: "토블론", founded: 1908, country: "스위스", image: "/image/brand_toblerone.png", desc: "삼각형 모양의 초콜릿으로 유명한 스위스 브랜드." },
  { id: 6, name: "미쉘 클뤼젤", founded: 1948, country: "프랑스", image: "/image/brand_michel.png", desc: "프랑스 고급 수제 초콜릿 브랜드." },
  { id: 7, name: "라메종", founded: 1977, country: "프랑스", image: "/image/brand_lamaison.png", desc: "파리지앵 감성의 고급 브랜드." },
  { id: 8, name: "페레로로쉐", founded: 1946, country: "이탈리아", image: "/image/brand_ferrero.png", desc: "페레로 그룹의 대표 브랜드." },
  { id: 9, name: "비알디", founded: 1935, country: "이탈리아", image: "/image/brand_bialdi.png", desc: "견과류와 초콜릿의 조화로 유명." },
  { id: 10, name: "리터스포트", founded: 1912, country: "독일", image: "/image/brand_ritter.png", desc: "컬러풀한 포장과 다양한 맛으로 유명." },
  { id: 11, name: "밀카", founded: 1901, country: "독일", image: "/image/brand_milka.png", desc: "보라색 소가 상징인 독일 대표 초콜릿." },
  { id: 12, name: "캐드버리", founded: 1824, country: "영국", image: "/image/brand_cadbury.png", desc: "영국 왕실 인증을 받은 초콜릿 브랜드." },
  { id: 13, name: "그린앤블랙스", founded: 1991, country: "영국", image: "/image/brand_greenblack.png", desc: "유기농 재료로 만든 프리미엄 초콜릿." },
  { id: 14, name: "허쉬", founded: 1894, country: "미국", image: "/image/brand_hersheys.png", desc: "미국 대표 대중 브랜드." },
  { id: 15, name: "기라델리", founded: 1852, country: "미국", image: "/image/brand_ghirardelli.png", desc: "샌프란시스코에서 시작된 고급 초콜릿." },
  { id: 16, name: "로이스", founded: 1983, country: "일본", image: "/image/brand_royce.png", desc: "부드러운 생초콜릿으로 유명한 일본 브랜드." },
  { id: 17, name: "메이지", founded: 1916, country: "일본", image: "/image/brand_meiji.png", desc: "대중적인 일본 초콜릿 브랜드." }
];

const countries = ["전체", "벨기에", "스위스", "프랑스", "이탈리아", "독일", "영국", "미국", "일본"];

export default function BrandPage() {
    const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("전체");

  const filteredBrands = selectedCountry === "전체"
    ? allBrands
    : allBrands.filter(brand => brand.country === selectedCountry);

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
        <div className="brand-grid">
          {filteredBrands.map((brand) => (
            <div className="brand-card" key={brand.id} onClick={() => navigate(`/brand/${brand.id}`)}>
              <img src={process.env.PUBLIC_URL + brand.image} alt={brand.name} />
              <h4>{brand.name}</h4>
              <p className="founded">설립: {brand.founded}년</p>
              <p className="desc">{brand.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}