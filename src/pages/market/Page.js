import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MarketBanner from "../../components/market/MarketBanner";
import "./Market.css";
import axios from "axios";

export default function MarketPage() {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [products, setProduct] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState(200000);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/product/findAllSimple`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => console.error("상품불러오기 실패", err));
    }, []);

    const filteredProducts = products.filter((product) => {
        // ✅ 카테고리 필터 (null-safe 처리)
        const matchesCategory =
            selectedCategory === "전체" ||
            (product.category && product.category === selectedCategory);

        // ✅ 브랜드 필터 (상품명에서 추론)
        const inferredBrand = ["고디바", "린트", "레오니다스", "페레로"].find((b) =>
            product.title.includes(b)
        );
        const matchesBrand =
            selectedBrands.length === 0 || selectedBrands.includes(inferredBrand);

        // ✅ 가격 필터
        const matchesPrice = product.price <= priceRange;

        return matchesCategory && matchesBrand && matchesPrice;
    });
    const toggleBrand = (brand) => {
    setSelectedBrands((prev) => (prev[0] === brand ? [] : [brand]));
};
    // const toggleBrand = (brand) => {
    //     setSelectedBrands((prev) =>
    //         prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    //     );
    // };

    const toggleType = (type) => {
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

    const categories = ["전체", "다크 초콜릿", "밀크 초콜릿", "화이트 초콜릿", "트러플", "프랄린"];
    const brands = ["고디바", "린트", "레오니다스", "페레로"];

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

                    {/* 종류 (카테고리) */}
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
                                <p className="price">
                                    {product.price.toLocaleString()}원
                                </p>
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
