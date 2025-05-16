import { useState, useEffect } from "react";
import "./MyPage.css";

export default function MyPage() {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(
            storedUser || {
                name: "초콜릿러버",
                email: "choco@example.com",
                membership: "비회원",
                orders: 0,
                reviews: 0,
                likes: 0,
            }
        );
    }, []);

    const reviews = []; // (리뷰 더미는 생략 가능)
    const orders = [];  // (주문 더미도 생략 가능)

    return (
        <div className="mypage-container">
            <div className="mypage-sidebar">
                <div className="profile-card">
                    <div className="profile-image">초콜</div>
                    <h3>{user?.name}</h3>
                    <p>{user?.email}</p>
                    <span className="badge">{user?.membership}</span>
                    <div className="counts">
                        <div><strong>{user?.orders}</strong><span>주문</span></div>
                        <div><strong>{user?.reviews}</strong><span>리뷰</span></div>
                        <div><strong>{user?.likes}</strong><span>찜</span></div>
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
                {/* 탭 선택 */}
                <div className="tabs">
                    <button className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>개요</button>
                    <button className={activeTab === "orders" ? "active" : ""} onClick={() => setActiveTab("orders")}>주문 내역</button>
                    <button className={activeTab === "reviews" ? "active" : ""} onClick={() => setActiveTab("reviews")}>내 리뷰</button>
                </div>

                {/* 이하 탭 콘텐츠는 기존 코드 유지 */}
                {/* ... */}
            </div>
        </div>
    );
}
