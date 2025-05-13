import { useParams } from "react-router-dom";
import './Product.css';
import Relate from "../../components/product/Relate"; // ★ 추가!
import ProductTab from "../../components/product/ProductTab";

export default function ProductPage() {
    const { id } = useParams();

    const products = [
        { id: "1", name: "고디바 다크 초콜릿", price: 32000, desc: "벨기에 명품 초콜릿입니다.", image: "/image/dark1.png" },
        { id: "2", name: "린트 밀크 초콜릿", price: 28000, desc: "스위스 부드러운 초콜릿입니다.", image: "/image/milk1.png" },
        { id: "3", name: "레오니다스 프랄린 어쏘트먼트", price: 38000, desc: "100년 전통 프랄린입니다.", image: "/image/praline1.png" },
        { id: "4", name: "페레로 트러플 초콜릿", price: 18000, desc: "트러플 속 초콜릿의 깊은 맛을 느껴보세요.", image: "/image/truffle1.png" },
    ];

    const product = products.find((p) => p.id === id);

    if (!product) {
        return <div>상품을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="product-page">
            <section className="product-detail-top">
                <div className="image-wrapper">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="info-wrapper">
                    <p className="brand-origin">{product.brand} · {product.origin}</p>
                    <h1 className="product-title">{product.name}</h1>
                    <div className="rating">
                        ⭐⭐⭐⭐☆ <span>({product.reviewCount} 리뷰)</span>
                    </div>
                    <div className="price">{product.price.toLocaleString()}원</div>
                    <p className="description">{product.desc}</p>

                    <div className="button-group">
                        <button className="add-to-cart">🛒 장바구니에 추가</button>
                        <button className="like-btn">♡</button>
                        <button className="share-btn">↗</button>
                    </div>

                    <div className="product-specs">
                        <div><strong>종류:</strong> {product.type || "다크 초콜릿"}</div>
                        <div><strong>원산지:</strong> {product.origin || "벨기에"}</div>
                        <div><strong>중량:</strong> {product.weight || "250g"}</div>
                        <div><strong>유통기한:</strong> {product.expiry || "제조일로부터 12개월"}</div>
                    </div>
                </div>
            </section>
            {/* 상세 설명 , 원재료 , 리뷰 */}
            <ProductTab/>

            {/* 🔥 탭 컴포넌트 추가 */}
            <Relate/>
        </div>
    );
}
