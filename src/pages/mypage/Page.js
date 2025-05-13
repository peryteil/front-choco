import { useState, useEffect } from "react";
import "./MyPage.css";

export default function MyPage() {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser || {
            name: "초콜릿러버",
            email: "choco@example.com",
            membership: "골드 회원",
            orders: 12,
            reviews: 5,
            likes: 8,
        });
    }, []);
    const reviews = [
        {
            id: 1,
            product: "고디바 다크 초콜릿 컬렉션",
            date: "2023-04-19",
            rating: 5,
            content: "부드러운 텍스처와 깊은 풍미가 일품입니다. 특히 70% 다크 초콜릿은 쓴맛과 단맛의 밸런스가 완벽해요.",
        },
        {
            id: 2,
            product: "린트 밀크 초콜릿 트러플",
            date: "2023-03-15",
            rating: 5,
            content: "부드럽게 녹는 식감이 정말 좋습니다. 선물용으로도 좋고 개인 소장용으로도 추천해요!",
        },
        {
            id: 3,
            product: "뇌하우스 화이트 초콜릿 프랄린",
            date: "2023-02-20",
            rating: 4,
            content: "화이트 초콜릿과 헤이즐넛의 조화가 환상적입니다. 달콤하면서도 고소한 맛이 일품이에요.",
        },
        {
            id: 4,
            product: "토블론 밀크 초콜릿 바",
            date: "2023-01-10",
            rating: 4,
            content: "독특한 삼각형 모양과 꿀, 아몬드 누가의 조합이 특별한 맛을 만들어냅니다.",
        },
        {
            id: 5,
            product: "발로나 다크 초콜릿 셀렉션",
            date: "2022-12-25",
            rating: 5,
            content: "프랑스 최고의 초콜릿이라는 명성에 걸맞는 품질입니다. 다양한 원산지의 카카오 맛을 경험할 수 있어요.",
        },
    ];
    
    const orders = [
        {
            id: "ORD-1234",
            product: "고디바 다크 초콜릿 세트",
            date: "2023-04-25",
            price: 32000,
            status: "배송완료",
        },
        {
            id: "ORD-1233",
            product: "린트 트러플 어소트먼트",
            date: "2023-04-10",
            price: 28000,
            status: "배송중",
        },
        {
            id: "ORD-1232",
            product: "뇌하우스 프랄린 세트",
            date: "2023-03-15",
            price: 35000,
            status: "배송완료",
        },
        {
            id: "ORD-1231",
            product: "토블론 밀크 초콜릿",
            date: "2023-02-28",
            price: 18000,
            status: "배송완료",
        },
        {
            id: "ORD-1230",
            product: "발로나 다크 초콜릿 셀렉션",
            date: "2023-02-10",
            price: 42000,
            status: "배송완료",
        },
    ];

    return (
        <div className="mypage-container">
            {user ? (
                <>
                    <div className="mypage-sidebar">
                        <div className="profile-card">
                            <div className="profile-image">초콜</div>
                            <h3>{user.name}</h3>
                            <p>{user.email}</p>
                            <span className="badge">{user.membership}</span>
                            <div className="counts">
                                <div><strong>{user.orders}</strong><span>주문</span></div>
                                <div><strong>{user.reviews}</strong><span>리뷰</span></div>
                                <div><strong>{user.likes}</strong><span>찜</span></div>
                            </div>
                            <button className="edit-profile">프로필 수정</button>
                            <ul className="menu-list">
                                <li>🛒 주문 내역</li>
                                <li>❤️ 찜 목록</li>
                                <li>💬 내 리뷰</li>
                                <li>👤 회원 정보</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mypage-content">
                        {/* 나머지 콘텐츠 (개요, 최근 주문 등) 그대로 */}
                        <div className="tabs">
                            <button
                                className={activeTab === "overview" ? "active" : ""}
                                onClick={() => setActiveTab("overview")}
                            >
                                개요
                            </button>
                            <button
                                className={activeTab === "orders" ? "active" : ""}
                                onClick={() => setActiveTab("orders")}
                            >
                                주문 내역
                            </button>
                            <button
                                className={activeTab === "reviews" ? "active" : ""}
                                onClick={() => setActiveTab("reviews")}
                            >
                                내 리뷰
                            </button>
                        </div>

                        {activeTab === "overview" && (
                            <div className="overview">
                                <div className="recent-orders">
                                    <h4>최근 주문</h4>
                                    <div className="order-item">
                                        <div>
                                            <p>고디바 다크 초콜릿 세트</p>
                                            <span>ORD-1234 • 2023-04-25</span>
                                        </div>
                                        <span className="status done">배송완료</span>
                                    </div>
                                    <div className="order-item">
                                        <div>
                                            <p>린트 트러플 어소트먼트</p>
                                            <span>ORD-1233 • 2023-04-10</span>
                                        </div>
                                        <span className="status shipping">배송중</span>
                                    </div>
                                    <button className="view-all" onClick={() => setActiveTab("orders")}>
                                        모든 주문 보기
                                    </button>
                                </div>

                                <div className="recent-reviews">
                                    <h4>최근 리뷰</h4>
                                    <div className="review-item">
                                        <div>
                                            <p>고디바 다크 초콜릿 컬렉션</p>
                                            <span>⭐⭐⭐⭐⭐ • 2023-04-19</span>
                                        </div>
                                    </div>
                                    <div className="review-item">
                                        <div>
                                            <p>린트 밀크 초콜릿 트러플</p>
                                            <span>⭐⭐⭐⭐⭐ • 2023-03-15</span>
                                        </div>
                                    </div>
                                    <button className="view-all" onClick={() => setActiveTab("reviews")}>
                                        모든 리뷰 보기
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === "orders" && (
                            <div className="orders-tab">
                                <h4>주문 내역</h4>
                                <p>모든 주문 내역을 확인하세요.</p>
                                <div className="order-list">
                                    {orders.map((order) => (
                                        <div className="order-item" key={order.id}>
                                            <div className="order-info">
                                                <p className="product-name">{order.product}</p>
                                                <span className="order-meta">{order.id} • {order.date}</span>
                                            </div>
                                            <div className="order-details">
                                                <span className="order-price">{order.price.toLocaleString()}원</span>
                                                <span className={`status ${order.status === "배송중" ? "shipping" : "done"}`}>
                                                    {order.status}
                                                </span>
                                                <button className="view-button">상세보기</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "reviews" && (
                            <div className="reviews-tab">
                                <h4>내 리뷰</h4>
                                <p>내가 작성한 모든 리뷰를 확인하세요.</p>
                                <div className="review-list">
                                    {reviews.map((review) => (
                                        <div className="review-item" key={review.id}>
                                            <div className="review-header">
                                                <div>
                                                    <p className="product-name">{review.product}</p>
                                                    <span className="stars">{"⭐".repeat(review.rating)} • {review.date}</span>
                                                </div>
                                                <button className="edit-button">수정</button>
                                            </div>
                                            <p className="review-content">{review.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </>
            ) : (
                <p>로딩 중입니다...</p>
            )}
        </div>
    );

}
