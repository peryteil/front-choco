import React, { useEffect, useState } from "react";
import "./OrderTab.css"; // 스타일 파일

export default function OrderTab() {
  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // 더미 데이터
    setOrders([
      { id: "ORD-1001", customer: "김초콜릿", product: "다크 초콜릿 컬렉션", price: 32000, status: "배송완료", date: "2025-05-10" },
      { id: "ORD-1002", customer: "이달콤", product: "밀크 초콜릿 트러플", price: 28000, status: "결제완료", date: "2025-05-11" },
      { id: "ORD-1003", customer: "박맛있", product: "화이트 초콜릿", price: 35000, status: "배송중", date: "2025-05-12" },
      { id: "ORD-1004", customer: "최고소", product: "트러플 믹스팩", price: 18000, status: "주문확인중", date: "2025-05-13" },
    ]);
  }, []);

  const filtered = orders.filter((order) =>
    [order.id, order.customer, order.product, order.status].some((v) =>
      v.includes(searchText)
    )
  );

  return (
    <div className="order-admin-page">
      <h2>주문 관리</h2>

      <div className="top-bar">
        <input
          type="text"
          placeholder="주문번호, 고객명, 상품, 상태 검색"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="filter-btn">필터</button>
        <button className="add-btn">+ 주문 추가</button>
      </div>

      <table className="order-table">
        <thead>
          <tr>
            <th>주문번호</th>
            <th>고객명</th>
            <th>상품</th>
            <th>금액</th>
            <th>상태</th>
            <th>주문일</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>{order.price.toLocaleString()}원</td>
              <td>{order.status}</td>
              <td>{order.date}</td>
              <td>
                <button className="action-btn" title="수정">상세보기</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
