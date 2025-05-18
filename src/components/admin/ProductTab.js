import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductTab.css";

export default function ProductTab() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 더미 대신 실제 API 연결 가능
    setProducts([
      { id: 1, name: "다크 초콜릿 컬렉션", brand: "고디바", category: "다크", price: 32000, stock: 45 },
      { id: 2, name: "밀크 초콜릿 트러플", brand: "린트", category: "트러플", price: 28000, stock: 32 },
      { id: 3, name: "화이트 초콜릿 프랄린", brand: "뇌하우스", category: "프랄린", price: 35000, stock: 18 },
      { id: 4, name: "밀크 초콜릿 바", brand: "토블론", category: "밀크", price: 18000, stock: 0 },
      { id: 5, name: "다크 초콜릿 셀렉션", brand: "발로나", category: "다크", price: 42000, stock: 27 },
    ]);
  }, []);

  const filtered = products.filter((p) =>
    [p.name, p.brand, p.category].some((v) => v.includes(searchText))
  );

  const handleAddProduct = () => {
    navigate("/admin/add-product"); // 등록 페이지로 이동
  };

  return (
    <div className="product-admin-page">
      <h2>상품 관리</h2>

      <div className="top-bar">
        <input
          type="text"
          placeholder="상품명, 브랜드, 카테고리 검색"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="filter-btn">필터</button>
        <button className="add-btn" onClick={handleAddProduct}>+ 상품 추가</button>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>상품명</th>
            <th>브랜드</th>
            <th>카테고리</th>
            <th>가격</th>
            <th>재고</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>{product.price.toLocaleString()}원</td>
              <td>{product.stock}</td>
              <td>{product.stock > 0 ? "판매중" : "품절"}</td>
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
