import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "./MyPage.css";

export default function MyPage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const fetchData = async () => {
      try {
        const userRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/mypage/info`);
        const orderRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/mypage/orders`);
        const reviewRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/mypage/reviews`);

        setUser(userRes.data);
        setOrders(orderRes.data);
        setReviews(reviewRes.data);
      } catch (err) {
        console.error("데이터 요청 실패", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          window.location.href = "/login";
        }
      }
    };

    fetchData();
  }, []);

  if (!user || !user.nickname) return <div>로딩 중...</div>;

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

        {/* 개요 탭 */}
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

        {/* 주문 탭 */}
        {activeTab === "orders" && (
          <>
            <h4>주문 내역</h4>
            <div className="order-list">
              {orders.map((order) => (
                <div key={order.id} className="order-item">
                  <div>
                    <strong>주문일자:</strong>{" "}
                    {order.createdAt ? dayjs(order.createdAt).format("YYYY-MM-DD") : "날짜 없음"}
                  </div>
                  <div><strong>상품명:</strong> {order.productName}</div>
                  <div><strong>수량:</strong> {order.quantity || 1}</div>
                  <div><strong>총 금액:</strong> {order.totalPrice?.toLocaleString()}원</div>
                  <div><strong>주문 상태:</strong> {order.status}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 리뷰 탭 */}
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
