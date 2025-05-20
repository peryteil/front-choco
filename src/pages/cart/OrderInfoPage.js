import React from "react";
import { useLocation } from "react-router-dom";


export default function OrderInfoPage() {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.productDto.price * item.count,
    0
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h2>주문 정보 확인</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.productDto.title} - {item.count}개 -{" "}
            {(item.productDto.price * item.count).toLocaleString()}원
          </li>
        ))}
      </ul>
      <h3>총 결제 금액: {totalPrice.toLocaleString()}원</h3>
      <button>결제하기</button>
    </div>
  );
}
