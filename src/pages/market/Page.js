import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MarketBanner from "../../components/market/MarketBanner";
import "./Market.css";
import axios from "axios";

export default function MarketPage() {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(200000);

  useEffect(() => {
    // 상품 데이터 가져오기
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/product/findAllSimple`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error("상품 불러오기 실패", err));

    // 브랜드 데이터 가져오기
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/brand/findAll`)
      .then((res) => {
        setBrands(res.data); // 예: [{ id: 1, title: "고디바" }, ...]
      })
      .catch((err) => console.error("브랜드 불러오기 실패", err));
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "전체" ||
      (product.category && product.category === selectedCategory);

    const inferredBrand = ["고디바", "린트", "레오니다스", "페레로"].find((b) =>
            product.title.includes(b)
        );

    const matchesBrand =
      selectedBrands.length === 0 ||
      (product.brand && selectedBrands.includes(product.brand));

    const matchesPrice = product.price <= priceRange;

    return matchesCategory && matchesBrand && matchesPrice;
  });

  const toggleBrand = (brandTitle) => {
    setSelectedBrands((prev) =>
      prev.includes(brandTitle)
        ? prev.filter((b) => b !== brandTitle)
        : [...prev, brandTitle]
    );
  };

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const categories = [
    "전체",
    "다크 초콜릿",
    "밀크 초콜릿",
    "화이트 초콜릿",
    "트러플",
    "프랄린",
  ];

  return (
    <section className="market-page">
      <MarketBanner />
      <div className="market-content">
        {/* 왼쪽 필터 */}
        <aside className="filter-sidebar">
          <h3>필터</h3>

          {/* 가격 */}
          <div className="filter-section">
            <h4>가격</h4>
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
            />
            <p>{priceRange.toLocaleString()}원 이하</p>
          </div>

          {/* 브랜드 */}
          <div className="filter-section">
            <h4>브랜드</h4>
            {brands.map((brand) => (
              <div key={brand.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand.title)}
                    onChange={() => toggleBrand(brand.title)}
                  />
                  {brand.title}
                </label>
              </div>
            ))}
          </div>

          {/* 종류 */}
          <div className="filter-section">
            <h4>종류</h4>
            {categories.map((type) => (
              <div key={type}>
                <label>
                  <input
                    type="checkbox"
                    name="category"
                    checked={selectedCategory === type}
                    onChange={() => setSelectedCategory(type)}
                  />
                  {type}
                </label>
              </div>
            ))}
          </div>
        </aside>

        {/* 오른쪽 상품 리스트 */}
        <section className="product-list">
          {filteredProducts.map((product) => (
            <Link
              to={`/market/${product.id}`}
              key={product.id}
              className="product-card"
            >
              <div className="product-image-wrapper">
                <img
                  src={product.imageDtos?.[0]?.fileUrl || "/image/noimg.png"}
                  alt={product.title}
                  className="product-image"
                />
              </div>
              <div className="product-info">
                <small className="brand">{product.brand}</small>
                <h4 className="name">{product.title}</h4>
                <p className="price">{product.price?.toLocaleString()}원</p>
                <span className="type">
                  {product.category || "카테고리 없음"}
                </span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </section>
  );
}
