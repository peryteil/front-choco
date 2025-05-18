import { useParams, useNavigate } from "react-router-dom";
import './Product.css';
import Relate from "../../components/product/Relate";
import ProductTab from "../../components/product/ProductTab";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/product/findById/${id}`)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                console.log("상품조회실패", err);
            });
    }, [id]);
    

    const handleAddToCart = () => {
        const token = localStorage.getItem("access_token");
      
        axios.post(
          `${process.env.REACT_APP_API_URL}/api/cart/add/${product.id}`,
          {
            count: 1,
            price: product.price,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        )
          .then(() => {
            alert("장바구니에 담겼습니다!");
            navigate("/cart");
          })
          .catch((err) => {
            console.error("장바구니 추가 실패", err);
            alert("로그인이 필요합니다.");
            navigate("/login");
          });
      };

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
                        {Array.from({ length: 5 }, (_, i) =>
                            i < Math.round(product.averageRating) ? "⭐" : "☆"
                        ).join("")}
                        <span style={{ marginLeft: "8px" }}>
                            ({product.averageRating.toFixed(1)} / 5.0 · 리뷰 {product.reviewCount}개)
                        </span>
                    </div>
                    <div className="price">{product.price.toLocaleString()}원</div>
                    <p className="description">{product.desc}</p>

                    <div className="button-group">
                        <button className="add-to-cart" onClick={handleAddToCart}>🛒 장바구니에 추가</button>
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

            <ProductTab product={product} />
            <Relate productId={id} />
        </div>
    );
}
