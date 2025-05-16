import { useEffect, useState } from "react";
import axios from "axios";
import "./MyPage.css";

export default function MyPage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

<<<<<<< HEAD
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
=======
  useEffect(() => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    // 로그인 안 되어 있으면 로그인 페이지로 리디렉트
    window.location.href = "/login";
    return;
  }

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const fetchData = async () => {
    try {
      const userRes = await axios.get("http://localhost:8080/api/user");
      const orderRes = await axios.get("http://localhost:8080/api/orders");
      const reviewRes = await axios.get("http://localhost:8080/api/reviews");

      setUser(userRes.data);
      setOrders(orderRes.data);
      setReviews(reviewRes.data);
    } catch (err) {
      console.error("데이터 요청 실패", err);

      // 인증 실패시 로그인 페이지로 리디렉트
      if (err.response?.status === 401 || err.response?.status === 403) {
        window.location.href = "/login";
      }
    }
  };

  fetchData();
}, []);


  if (!user || !user.name) return <div>로딩 중...</div>;

  return (
    <div className="mypage-container">
      {/* 좌측 유저 정보 영역 */}
      <div className="mypage-sidebar">
        <div className="profile-card">
          <div className="profile-image">{user.name?.[0] || "?"}</div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <span className="badge">
            {user.role || user.membership || "일반회원"}
          </span>
          <ul className="menu-list">
            <li onClick={() => setActiveTab("orders")}>🛒 주문 내역</li>
            <li onClick={() => setActiveTab("reviews")}>💬 내 리뷰</li>
          </ul>
        </div>
      </div>

      {/* 우측 콘텐츠 영역 */}
      <div className="mypage-content">
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
            주문
          </button>
          <button
            className={activeTab === "reviews" ? "active" : ""}
            onClick={() => setActiveTab("reviews")}
          >
            리뷰
          </button>
        </div>

        {activeTab === "overview" && (
          <>
            <h4>최근 주문</h4>
            {orders.slice(0, 2).map((order) => (
              <div key={order.id}>
                {order.productName} - {order.status}
              </div>
            ))}
            <h4>최근 리뷰</h4>
            {reviews.slice(0, 2).map((review) => (
              <div key={review.id}>
                {review.productName} - {review.content}
              </div>
            ))}
          </>
        )}

        {activeTab === "orders" && (
          <>
            <h4>주문 내역</h4>
            {orders.map((order) => (
              <div key={order.id}>
                {order.productName} - {order.status}
              </div>
            ))}
          </>
        )}

        {activeTab === "reviews" && (
          <>
            <h4>내 리뷰</h4>
            {reviews.map((review) => (
              <div key={review.id}>
                {review.productName} - {review.content}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
>>>>>>> feature-you
