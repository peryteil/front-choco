import { useParams } from "react-router-dom";
import './Product.css';
import Relate from "../../components/product/Relate"; // ★ 추가!
import ProductTab from "../../components/product/ProductTab";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null)
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/product/findById/${id}`)
            .then((res) => {
                setProduct(res.data)
            })
            .catch((err) => {
                console.log("상품조회실패", err)
            })

    }, [])



    if (!product) {
        return <div className="empty-message">상품을 불러오는 중입니다...</div>;
    }

    return (
        <div className="product-page">
            <section className="product-detail-top">
                <div className="image-wrapper">
                    <img src={product.imageDtos?.[0]?.fileUrl} alt={product.title} />
                </div>
                <div className="info-wrapper">
                    <p className="brand-origin">{product.brand} · {product.origin}</p>
                    <h1 className="product-title">{product.title}</h1>
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
                        <div><strong>종류:</strong> {product.category}</div>
                        <div><strong>원산지:</strong> {product.origin}</div>
                        <div><strong>중량:</strong> {product.weight}</div>
                        <div><strong>유통기한:</strong> {product.explamationDate}</div>
                    </div>
                </div>
            </section>
            {/* 상세 설명 , 원재료 , 리뷰 */}
            <ProductTab product={product} />

            {/* 🔥 탭 컴포넌트 추가 */}
            <Relate />
        </div>
    );
}
