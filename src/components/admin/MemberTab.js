import React, { useEffect, useState } from "react";
import "./MemberTab.css";

export default function MemberTab() {
  const [members, setMembers] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // 예시 데이터
    setMembers([
      { id: 1, name: "김초코", email: "kim@choco.com", role: "USER", joined: "2024-12-01" },
      { id: 2, name: "이달콤", email: "lee@sweet.com", role: "ADMIN", joined: "2025-01-15" },
      { id: 3, name: "박단맛", email: "park@candy.com", role: "USER", joined: "2025-02-02" },
      { id: 4, name: "최고소", email: "choi@bitter.com", role: "USER", joined: "2025-03-20" },
    ]);
  }, []);

  const filtered = members.filter((member) =>
    [member.name, member.email, member.role].some((v) =>
      v.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="member-admin-page">
      <h2>회원 관리</h2>

      <div className="top-bar">
        <input
          type="text"
          placeholder="이름, 이메일, 등급 검색"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="filter-btn">필터</button>
        <button className="add-btn">+ 회원 추가</button>
      </div>

      <table className="member-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>이메일</th>
            <th>등급</th>
            <th>가입일</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.role}</td>
              <td>{member.joined}</td>
              <td>
                <button className="action-btn" title="수정">✏</button>
                <button className="action-btn" title="삭제">🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
