import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./HotdealDetailPage.css";
import axios from "axios";


function HotdealDetailPage() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  // 
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8080/hotDeal/findById/${id}`)
      .then(res => {
        setDetail(res.data);
      })
      .catch(err => {
        console.log("상세데이터 못가져옴", err);
        setDetail(null)
      })
  }, [id])

  if (!detail) return <div className="not-found">해당 핫딜을 찾을 수 없습니다.</div>;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    const newItem = {
      id: comments.length + 1,
      author: "익명",
      content: newComment,
      date: new Date().toISOString().split("T")[0]
    };

    setComments([...comments, newItem]);
    setNewComment("");
  };

  return (
    <div className="deal-detail-container">
      <h2 className="deal-title">핫딜정보 보기</h2>
      <table className="deal-table">
        <tbody>
          <tr><th>작성자</th><td>{detail.title}</td></tr>
          <tr><th>핫딜 정보</th><td>{detail.content}</td></tr>
          <tr><th>분류</th><td>{detail.category}</td></tr>
          <tr><th>등록일</th><td>{detail.createdAt.split("T")[0]}</td></tr>
          <tr><th>쇼핑몰</th><td>{detail.shopName}</td></tr>
          <tr>
            <th>URL 링크</th>
            <td>
              <div className="link-box">
                <a href={detail.shopLink} target="_blank" rel="noopener noreferrer">{detail.shopLink}</a>
              </div>
            </td>
          </tr>
          <tr><th>제목</th><td><a href={detail.link} target="_blank" rel="noopener noreferrer">{detail.title}</a></td></tr>
          <tr><th>금액</th><td style={{ color: "#0070c0" }}>{detail.price}</td></tr>
          <tr><th>추천</th><td>{detail.likeCount} 명</td></tr>
          <tr>
            <th>사진</th>
            <td>
              <div>
                {detail.imageDtos?.length > 0 ? (
                  detail.imageDtos.map((img, index) => (
                    <img
                      key={index}
                      src={img.fileUrl}
                      alt={`deal-${index}`}
                      className="deal-image"
                    />
                  ))
                ) : (
                  <span>이미지가 없습니다.</span>
                )}
              </div>
            </td>
          </tr>
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
