import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderTab.css";

export default function OrderTab() {
  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/admin/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("주문 목록 조회 실패", err));
  }, []);

  const filtered = orders.filter((order) =>
    [order.orderId, order.userEmail, order.productName, order.status].some((v) =>
      String(v).toLowerCase().includes(searchText.toLowerCase())
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
      </div>

      <table className="order-table">
        <thead>
          <tr>
            <th>주문번호</th>
            <th>이메일</th>
            <th>상품</th>
            <th>금액</th>
            <th>상태</th>
            <th>주문일</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.userEmail}</td>
              <td>{order.productName}</td>
              <td>{parseInt(order.totalPrice).toLocaleString()}원</td>
              <td>{order.status}</td>
              <td>{order.createdAt || "-"}</td>
              <td>
                <button className="action-btn">상세보기</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
