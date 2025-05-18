import React, { useEffect, useState } from "react";
import "./CartPage.css";
import axios from "axios";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("access_token");

  const fetchCart = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/cart/find`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => setCartItems(res.data))
      .catch((err) => {
        console.error("장바구니 불러오기 실패", err);
        alert("로그인이 필요합니다.");
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateCount = (productId, amount) => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/api/cart/update/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { status: amount },
          withCredentials: true,
        }
      )
      .then(() => fetchCart())
      .catch((err) => {
        console.error("수량 변경 실패", err);
        alert("변경 실패");
      });
  };

  const handleDelete = (cartId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/cart/delete/${cartId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then(() => fetchCart())
      .catch((err) => {
        console.error("장바구니 삭제 실패", err);
        alert("삭제 실패");
      });
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.productDto.price * item.count,
    0
  );

  return (
    <div className="cart-wrapper">
      <h2 className="cart-title">장바구니</h2>

      <div className="cart-content">
        <div className="cart-items">
          <h3 className="cart-subtitle">장바구니 상품 ({cartItems.length})</h3>

          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">
                <img
                  src={item.productDto?.imageDtos?.[0]?.fileUrl || "/image/noimg.png"}
                  alt={item.productDto?.title}
                />
                <div className="item-info">
                  <div className="item-name">{item.productDto?.title}</div>
                  <div className="item-price">
                    단가: {item.productDto?.price.toLocaleString()}원
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => updateCount(item.productDto.id, -1)}>-</button>
                    <div className="quantity-display">{item.count}</div>
                    <button onClick={() => updateCount(item.productDto.id, 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => handleDelete(item.id)}>
                    삭제
                  </button>
                </div>
                <div className="item-total">
                  {(item.productDto?.price * item.count).toLocaleString()}원
                </div>
              </div>
            ))
          ) : (
            <p>장바구니가 비어 있습니다.</p>
          )}
        </div>

        <div className="cart-summary">
          <h3>주문 요약</h3>
          <div className="summary-item">
            <span>상품 금액</span>
            <span>{totalPrice.toLocaleString()}원</span>
          </div>
          <div className="summary-item">
            <span>배송비</span>
            <span>무료</span>
          </div>
          <hr />
          <div className="summary-total">
            <strong>총 결제 금액</strong>
            <strong>{totalPrice.toLocaleString()}원</strong>
          </div>
          <button className="order-button">주문하기</button>
        </div>
      </div>
    </div>
  );
}
