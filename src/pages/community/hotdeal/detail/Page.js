import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./HotdealDetailPage.css";
import axios from "axios";

function HotdealDetailPage() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [newComment, setNewComment] = useState("");

  // 상세 조회 + 조회수 증가
  const fetchDetail = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/hotDeal/increaseViewCount/${id}`);
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/hotDeal/findById/${id}`);
      setDetail(res.data);
    } catch (err) {
      console.error("상세 데이터 불러오기 실패", err);
      setDetail(null);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const handleLike = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/hotDeal/increaseLikeCount/${id}`);
      setDetail(prev => ({ ...prev, likeCount: prev.likeCount + 1 }));
    } catch (err) {
      console.error("좋아요 실패", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    try {
      const params = new URLSearchParams();
      params.append("comment", newComment);

      await axios.post(`${process.env.REACT_APP_API_URL}/comment/create/${id}`, params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      setNewComment("");
      fetchDetail(); // 댓글 등록 후 다시 불러오기
    } catch (err) {
      console.error("댓글 등록 실패", err);
    }
  };

  if (!detail) return <div className="not-found">해당 핫딜을 찾을 수 없습니다.</div>;

  return (
    <div className="deal-detail-container">
      <h2 className="deal-title">핫딜정보 보기</h2>
      <table className="deal-table">
        <tbody>
          <tr><th>작성자</th><td>{detail.userDto?.nickname || "익명"}</td></tr>
          <tr><th>타이틀</th><td>{detail.title}</td></tr>
          <tr><th>핫딜 정보</th><td>{detail.content}</td></tr>
          <tr><th>분류</th><td>{detail.category}</td></tr>
          <tr><th>등록일</th><td>{detail.createdAt.split("T")[0]}</td></tr>
          <tr><th>쇼핑몰</th><td>{detail.shopName}</td></tr>
          <tr><th>URL 링크</th><td><a href={detail.shopLink} target="_blank" rel="noopener noreferrer">{detail.shopLink}</a></td></tr>
          <tr><th>금액</th><td style={{ color: "#0070c0" }}>{detail.price}원</td></tr>
          <tr>
            <th>추천</th>
            <td>
              👍 {detail.likeCount} 명
              <button onClick={handleLike} style={{ marginLeft: "10px" }}>좋아요</button>
            </td>
          </tr>
          <tr><th>조회수</th><td>👁 {detail.viewCount}</td></tr>
          <tr>
            <th>사진</th>
            <td>
              {detail.imageDtos?.length > 0 ? (
                detail.imageDtos.map((img, i) => (
                  <img key={i} src={img.fileUrl} alt={`deal-${i}`} className="deal-image" />
                ))
              ) : (
                <span>이미지가 없습니다.</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      {/* 댓글 영역 */}
      <div className="comment-section">
        <h3>댓글 {detail.dtos?.length || 0}개</h3>
        <ul className="comment-list">
          {detail.dtos?.map(comment => (
            <li key={comment.id}>
              <div className="comment-author">{comment.userDto?.nickname || "익명"}</div>
              <div className="comment-content">{comment.content}</div>
              <div className="comment-date">{comment.createdAt?.split("T")[0]}</div>
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
