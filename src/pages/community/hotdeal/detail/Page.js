import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./HotdealDetailPage.css";

const dummyList = [
  {
    id: 1,
    author: "데일리핫딜",
    category: "신발",
    type: "해외핫딜",
    shop: "Extra Butter",
    link: "https://extrabutterny.com/collections/spring-sale/products/new-balance-mens-made-in-usa-993-core-shoes",
    title: "Extra Butter) Made In USA 993 Core $200",
    price: "$200.00",
    likes: 493,
    date: "2025-04-30 10:38:22",
    image: process.env.PUBLIC_URL + "/image/cho1.png"
  }
];

const dummyComments = [
  { id: 1, author: "신발덕후", content: "이거 저번에 샀는데 진짜 좋아요!", date: "2025-04-30" },
  { id: 2, author: "abc123", content: "할인 기간이 언제까지인가요?", date: "2025-04-30" }
];

function HotdealDetailPage() {
  const { id } = useParams();
  const detail = dummyList.find(item => item.id === Number(id));
  const [comments, setComments] = useState(dummyComments);
  const [newComment, setNewComment] = useState("");

  if (!detail) return <div className="not-found">해당 핫딜을 찾을 수 없습니다.</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    const next = {
      id: comments.length + 1,
      author: "익명",
      content: newComment,
      date: new Date().toISOString().split("T")[0]
    };
    setComments([...comments, next]);
    setNewComment("");
  };

  return (
    <div className="deal-detail-container">
      <h2 className="deal-title">핫딜정보 보기</h2>
      <table className="deal-table">
        <tbody>
          <tr><th>작성자</th><td>{detail.author}</td></tr>
          <tr><th>핫딜 정보</th><td>{detail.type}</td></tr>
          <tr><th>분류</th><td>{detail.category}</td></tr>
          <tr><th>등록일</th><td>{detail.date}</td></tr>
          <tr><th>쇼핑몰</th><td>{detail.shop}</td></tr>
          <tr>
            <th>URL 링크</th>
            <td>
              <div className="link-box">
                <a href={detail.link} target="_blank" rel="noopener noreferrer">{detail.link}</a>
                <a href={detail.link} target="_blank" rel="noopener noreferrer" className="link-button">상세 바로가기 &gt;</a>
              </div>
            </td>
          </tr>
          <tr><th>제목</th><td><a href={detail.link} target="_blank" rel="noopener noreferrer">{detail.title}</a></td></tr>
          <tr><th>금액</th><td style={{ color: "#0070c0" }}>{detail.price}</td></tr>
          <tr><th>추천</th><td>{detail.likes} 명</td></tr>
          <tr><th>사진</th><td><img src={detail.image} alt="deal" className="deal-image" /></td></tr>
        </tbody>
      </table>

      {/* 댓글 영역 */}
      <div className="comment-section">
        <h3>댓글 {comments.length}개</h3>
        <ul className="comment-list">
          {comments.map(comment => (
            <li key={comment.id}>
              <div className="comment-author">{comment.author}</div>
              <div className="comment-content">{comment.content}</div>
              <div className="comment-date">{comment.date}</div>
            </li>
          ))}
        </ul>

        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            placeholder="댓글을 입력하세요"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            rows="3"
          />
          <button type="submit">댓글 작성</button>
        </form>
      </div>
    </div>
  );
}

export default HotdealDetailPage;
