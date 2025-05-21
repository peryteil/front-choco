import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function OrderInfoPage() {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  const simplifiedCartItems = cartItems.map(item => ({
  productId: item.productDto.id,   // productDto에서 id 추출
  count: item.count
}));

  const [buyerInfo, setBuyerInfo] = useState({
    name: "",
    tel: "",
    addr: "",
    postcode: "",
  });

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.productDto.price * item.count,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo({ ...buyerInfo, [name]: value });
  };

  const handlePayment = () => {
    console.log("📦 cartItems 확인: ", cartItems);  // ✅ 이 줄 추가

    if (!window.IMP) return alert("아임포트 라이브러리가 로드되지 않았습니다.");
    const IMP = window.IMP;
    IMP.init("imp04333337");

    const merchant_uid = `order_${new Date().getTime()}`;
    const email = localStorage.getItem("user_email"); // 또는 JWT에서 추출

    IMP.request_pay(
      {
        pg: "html5_inicis",
        pay_method: "card",
        merchant_uid,
        name: cartItems.map((item) => item.productDto.title).join(", "),
        amount: totalPrice,
        buyer_email: email || "unknown@example.com",
        buyer_name: buyerInfo.name,
        buyer_tel: buyerInfo.tel,
        buyer_addr: buyerInfo.addr,
        buyer_postcode: buyerInfo.postcode,
      },
      function (rsp) {
        if (rsp.success) {
          alert("결제 성공");

          axios
            .post(
              `${process.env.REACT_APP_API_URL}/api/payment/verify`,
              {
                imp_uid: rsp.imp_uid,
                merchant_uid: rsp.merchant_uid,
                amount: totalPrice,
                name: buyerInfo.name,
                tel: buyerInfo.tel,
                addr: buyerInfo.addr,
                postcode: buyerInfo.postcode,
                cartItems: simplifiedCartItems,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                  )}`,
                },
              }
            )
            .then(() => {
              alert("결제 정보가 서버에 저장되었습니다.");
            })
            .catch((err) => {
              console.error("서버 전송 실패", err);
              alert("서버 전송 실패");
            });
        } else {
          alert("결제 실패: " + rsp.error_msg);
        }
      }
    );
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>주문자 정보 입력</h2>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={buyerInfo.name}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="tel"
          placeholder="전화번호"
          value={buyerInfo.tel}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="addr"
          placeholder="주소"
          value={buyerInfo.addr}
          onChange={handleInputChange}
        />
        <br />
        <input
          type="text"
          name="postcode"
          placeholder="우편번호"
          value={buyerInfo.postcode}
          onChange={handleInputChange}
        />
      </div>

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
      <button onClick={handlePayment}>결제하기</button>
    </div>
  );
}
