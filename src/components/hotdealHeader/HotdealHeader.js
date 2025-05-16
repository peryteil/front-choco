import React from "react";
import { useNavigate } from "react-router-dom";

function HotdealHeader({ hotDeals = [] }) {
  const navigate = useNavigate();

  // 좋아요 수 기준 내림차순 정렬 후 상위 5개만 추출
  const topDeals = [...hotDeals]
    .filter((deal) => typeof deal.likeCount === "number")
    .sort((a, b) => b.likeCount - a.likeCount)
    .slice(0, 5); // ← 꼭 필요하신 부분입니다!

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
          {topDeals.map((deal) => (
            <li key={deal.id}>
              <span className="brand">{deal.category}</span>
              <span
                className="title clickable"
                onClick={() => navigate(`/community/hotdeal/${deal.id}`)}
              >
                {deal.title} <span className="label">HOTDEAL</span>
              </span>
              <span className="likes">👍 {deal.likeCount}</span>
              <span className="comments">👓 {deal.viewCount}</span>
              <span className="date">
                {deal.createdAt?.split("T")[0] || "날짜 없음"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HotdealHeader;
