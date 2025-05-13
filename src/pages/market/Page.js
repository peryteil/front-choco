import { useState } from "react";
import { Link } from "react-router-dom";
import MarketBanner from "../../components/market/MarketBanner";
import "./Market.css";

export default function MarketPage() {
    const [selectedTab, setSelectedTab] = useState("전체");
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [priceRange, setPriceRange] = useState(100000);

    const products = [
        { id: 1, name: "고디바 다크 초콜릿", category: "다크 초콜릿", brand: "고디바", type: "다크 초콜릿", price: 32000, image: "/image/dark1.png" },
        { id: 2, name: "린트 밀크 초콜릿", category: "밀크 초콜릿", brand: "린트", type: "밀크 초콜릿", price: 28000, image: "/image/milk1.png" },
        { id: 3, name: "레오니다스 프랄린 어쏘트먼트", category: "프랄린", brand: "레오니다스", type: "프랄린", price: 38000, image: "/image/praline1.png" },
        { id: 4, name: "페레로 트러플 초콜릿", category: "트러플", brand: "페레로", type: "트러플", price: 18000, image: "/image/truffle1.png" },
    ];

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedTab === "전체" || product.category === selectedTab;
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.type);
        const matchesPrice = product.price <= priceRange;
        return matchesCategory && matchesBrand && matchesType && matchesPrice;
    });

    const toggleBrand = (brand) => {
        setSelectedBrands((prev) =>
            prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
        );
    };

    const toggleType = (type) => {
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

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
                        {["고디바", "린트", "레오니다스", "페레로"].map((brand) => (
                            <div key={brand}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedBrands.includes(brand)}
                                        onChange={() => toggleBrand(brand)}
                                    />
                                    {brand}
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* 종류 */}
                    <div className="filter-section">
                        <h4>종류</h4>
                        {["다크 초콜릿", "밀크 초콜릿", "화이트 초콜릿", "트러플", "프랄린"].map((type) => (
                            <div key={type}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedTypes.includes(type)}
                                        onChange={() => toggleType(type)}
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
                        <Link to={`/market/${product.id}`} key={product.id} className="product-card">
                        <div className="product-image-wrapper">
                          <img src={product.image} alt={product.name} className="product-image" />
                        </div>
                        <div className="product-info">
                          <small className="brand">{product.brand}</small>
                          <h4 className="name">{product.name}</h4>
                          <p className="price">{product.price.toLocaleString()}원</p>
                          <span className="type">{product.type}</span>
                        </div>
                      </Link>
                    ))}
                </section>
            </div>
        </section>
    );
}
