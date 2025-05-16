// SalesTab.js
import React from "react";

const stats = [
  { title: "총 매출", value: "₩12,345,678", change: "+12% from last month" },
  { title: "총 주문", value: "1,234", change: "+8% from last month" },
  { title: "총 회원", value: "5,678", change: "+15% from last month" },
  { title: "총 상품", value: "432", change: "+5% from last month" },
];

export default function SalesTab() {
  return (
    <div className="dashboard-stats">
      {stats.map((stat, index) => (
        <div key={index} className="dashboard-card">
          <p className="card-title">{stat.title}</p>
          <p className="card-value">{stat.value}</p>
          <p className="card-change">{stat.change}</p>
        </div>
      ))}
    </div>
  );
}
