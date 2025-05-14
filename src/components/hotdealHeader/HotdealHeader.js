import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 추가

function HotdealHeader({hotDeals=[]}) {
  const navigate = useNavigate(); // 네비게이터 생성


  return (
    <div>
      <div
        className="hotdeal-banner"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/image/hotdeal.png)`
        }}
      >
        <span className="badge">🍫 BEST HOT DEAL</span>
      </div>

      <div className="hotdeal-table">
        <h4>BEST HOT DEAL</h4>
        <ul>
          {(hotDeals || []).slice(0,5).map((deal, i) => (
            <li key={deal.id}>
              <span className="brand">{deal.category}</span>
              <span
                className="title clickable"
                onClick={() => navigate(`/community/hotdeal/${deal.id}`)}
              >
                {deal.title} <span className="label">HOTDEAL</span>
              </span>
              <span className="likes">👍 {deal.likeCount}</span>
              <span className="comments">💬 {deal.viewCount}</span>
              <span className="date">{deal.createdAt.split("T")[0]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HotdealHeader;
