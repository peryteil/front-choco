import React, { useState } from "react";
import "./SettingsTab.css";

export default function SettingsTab() {
  const [siteInfo, setSiteInfo] = useState({
    name: "초콜릿 월드",
    description: "세계 각국의 프리미엄 초콜릿 브랜드를 소개하고 초콜릿 종류별로 선택할 수 있는 플랫폼",
    email: "contact@chocolateworld.com",
    phone: "02-123-4567",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSiteInfo({ ...siteInfo, [name]: value });
  };

  return (
    <div className="settings-page">
      <div className="settings-box">
        <h3>사이트 설정</h3>
        <p className="description">사이트의 기본 정보를 설정합니다.</p>

        <label>사이트 이름</label>
        <input
          type="text"
          name="name"
          value={siteInfo.name}
          onChange={handleChange}
        />

        <label>사이트 설명</label>
        <input
          type="text"
          name="description"
          value={siteInfo.description}
          onChange={handleChange}
        />

        <label>연락처 이메일</label>
        <input
          type="email"
          name="email"
          value={siteInfo.email}
          onChange={handleChange}
        />

        <label>연락처 전화번호</label>
        <input
          type="text"
          name="phone"
          value={siteInfo.phone}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
