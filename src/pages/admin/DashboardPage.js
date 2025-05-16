import React, { useState } from "react";
import SalesTab from "../../components/admin/SalesTab";
import ProductTab from "../../components/admin/ProductTab";
import OrderTab from "../../components/admin/OrderTab";
import MemberTab from "../../components/admin/MemberTab";
import PostTab from "../../components/admin/PostTab";
import SettingsTab from "../../components/admin/SettingsTab";
import "./Dashboard.css"

export default function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("매출 관리");

  const tabs = [
    { label: "매출 관리", icon: "📊" },
    { label: "상품 관리", icon: "📦" },
    { label: "주문 관리", icon: "🧾" },
    { label: "회원 관리", icon: "👤" },
    { label: "게시글 관리", icon: "📄" },
    { label: "설정", icon: "⚙️" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "매출 관리":
        return <SalesTab />;
      case "상품 관리":
        return <ProductTab />;
      case "주문 관리":
        return <OrderTab />;
      case "회원 관리":
        return <MemberTab />;
      case "게시글 관리":
        return <PostTab />;
      case "설정":
        return <SettingsTab />;
      default:
        return <p>콘텐츠 없음</p>;
    }
  };

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2 className="sidebar-title">관리자 페이지</h2>
        <ul className="menu-list">
          {tabs.map((tab) => (
            <li
              key={tab.label}
              className={`menu-item ${activeTab === tab.label ? "active" : ""}`}
              onClick={() => setActiveTab(tab.label)}
            >
              <span>{tab.icon}</span> {tab.label}
            </li>
          ))}
        </ul>
      </aside>

      <main className="dashboard-container">
        <h1 className="dashboard-title">{activeTab}</h1>
        {renderContent()}
      </main>
    </div>
  );
}
