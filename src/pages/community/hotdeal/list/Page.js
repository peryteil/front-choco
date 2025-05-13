import React from "react";
import { useNavigate } from "react-router-dom";

const dummyList = [
    {
        id: 1,
        type: "쇼핑",
        shop: "쿠팡",
        title: "아이패드 할인🔥",
        likes: 32,
        comments: 10,
        views: 200,
        author: "admin",
        date: "2025-04-30"
    }
];

function HotdealListPage() {
    const navigate = useNavigate();

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
                        {dummyList.map((item, i) => (
                            <tr key={i} onClick={() => navigate(`/community/hotdeal/${item.id}`)}>
                                <td><span className="type-badge">{item.type}</span></td>
                                <td>{item.shop}</td>
                                <td>
                                    {item.title}
                                    {i < 3 && <span className="label">HOTDEAL</span>}
                                </td>
                                <td>👍 {item.likes} 💬 {item.comments}</td>
                                <td>{item.views}</td>
                                <td>{item.author}</td>
                                <td>{item.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <button>{"<"}</button>
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <button>{">"}</button>
            </div>

            <div className="write-button">
                <button onClick={() => navigate("/community/hotdeal/write")}>글쓰기</button>
            </div>
        </div>
    );
}

export default HotdealListPage;
