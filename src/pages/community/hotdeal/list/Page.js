import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import "./HotdealListPage.css";

function HotdealListPage() {
    const {hotDeals} = useOutletContext();
    const navigate = useNavigate();
    const [currentPage,setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil((hotDeals?.length||0) / itemsPerPage);

    const startIdex = (currentPage -1) *itemsPerPage;
    const currentItems = (hotDeals||[]).slice(startIdex , startIdex+itemsPerPage);

    return (
        <div>
            <div className="hotdeal-table">
                <table>
                    <thead>
                        <tr>
                            <th>구분</th>
                            <th>쇼핑몰</th>
                            <th>제목</th>
                            <th>추천/댓글</th>
                            <th>조회수</th>
                            <th>작성자</th>
                            <th>등록일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(currentItems||[]).map((item, i) => (
                            <tr key={item.id} >
                                <td><span className="type-badge">{item.category}</span></td>
                                <td>{item.shopName}</td>
                                <td 
                                className="clickable" 
                                onClick={() => navigate(`/community/hotdeal/${item.id}`)}>
                                    {item.title}
                                    </td>
                                <td>👍 {item.likeCount} 💬 {item.viewCount}</td>
                                <td>{item.viewCount}</td>
                                <td>{item.category}</td>
                                <td>{item.createdAt.split("T")[0]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 페이지네이션 */}
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    {"<"}
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={currentPage === i + 1 ? "active" : ""}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    {">"}
                </button>
            </div>

            <div className="write-button">
                <button onClick={() => navigate("/community/hotdeal/write")}>글쓰기</button>
            </div>
        </div>
    );
}

export default HotdealListPage;
