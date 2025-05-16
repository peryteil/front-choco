import React, { useEffect, useState } from "react";
import "./ProductTab.css"; // 스타일 재사용

export default function PostTab() {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // 예시용 게시글 데이터
    setPosts([
      { id: 1, title: "다크 초콜릿 할인 정보", author: "초코덕후", category: "이벤트", views: 123, createdAt: "2025-05-10" },
      { id: 2, title: "린트 신제품 후기", author: "맛잘알", category: "리뷰", views: 87, createdAt: "2025-05-11" },
      { id: 3, title: "초콜릿 어디서 사세요?", author: "쇼핑왕", category: "질문", views: 45, createdAt: "2025-05-12" },
      { id: 4, title: "화이트데이 선물 추천", author: "연인용", category: "추천", views: 99, createdAt: "2025-05-13" },
      { id: 5, title: "고디바 직구 후기", author: "해외파", category: "정보", views: 150, createdAt: "2025-05-14" },
    ]);
  }, []);

  const filtered = posts.filter((post) =>
    [post.title, post.author, post.category].some((v) => v.includes(searchText))
  );

  return (
    <div className="product-admin-page">
      <h2>게시글 관리</h2>

      <div className="top-bar">
        <input
          type="text"
          placeholder="제목, 작성자, 카테고리 검색"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="filter-btn">필터</button>
        <button className="add-btn">+ 게시글 추가</button>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>카테고리</th>
            <th>조회수</th>
            <th>작성일</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.category}</td>
              <td>{post.views}</td>
              <td>{post.createdAt}</td>
              <td>
                <button className="action-btn" title="삭제">🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
