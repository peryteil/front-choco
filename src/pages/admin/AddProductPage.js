import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddProductPage.css";

export default function AddProductPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    brandId: "",
    category: "",
    price: "",
    stock: "",
    materials: "",
    explamationDate: "",
    weight: "",
    origin: "",
    content: "",
  });

  const [image, setImage] = useState(null);
  const [brands, setBrands] = useState([]); // 브랜드 리스트

  useEffect(() => {
    // 브랜드 목록 가져오기
    axios.get(`${process.env.REACT_APP_API_URL}/api/brand/findTitle`)
      .then((res) => setBrands(res.data))
      .catch((err) => console.error("브랜드 목록 불러오기 실패", err));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["name", "brandId", "category", "price", "stock"];
    for (const field of requiredFields) {
      if (!form[field]) {
        alert("필수 항목을 모두 입력해주세요.");
        return;
      }
    }

    try {
      const formData = new FormData();
      const dto = {
        title: form.name,
        category: form.category,
        price: parseInt(form.price),
        stock: parseInt(form.stock),
        materials: form.materials,
        explamationDate: form.explamationDate,
        weight: form.weight,
        origin: form.origin,
        content: form.content,
      };

      formData.append("dto", new Blob([JSON.stringify(dto)], { type: "application/json" }));
      if (image) formData.append("files", image);

      // ✅ brandId를 URL 경로에 포함
      await axios.post(`${process.env.REACT_APP_API_URL}/api/product/create/${form.brandId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("상품이 등록되었습니다.");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("상품 등록 실패", error);
      alert("상품 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="add-product-page">
      <h2>상품 추가</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <label>상품명 *</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} />

        <div className="brand-select-wrapper">
          <label className="form-label">브랜드 *</label>
          <div className="brand-select-inline">
            <select
              name="brandId"
              value={form.brandId}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">브랜드 선택</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.title}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="add-brand-btn"
              onClick={() => navigate("/admin/add-brand")}
            >
              + 브랜드 추가
            </button>
          </div>
        </div>

        <label>카테고리 *</label>
        <input type="text" name="category" value={form.category} onChange={handleChange} />

        <label>가격 *</label>
        <input type="number" name="price" value={form.price} onChange={handleChange} />

        <label>재고 *</label>
        <input type="number" name="stock" value={form.stock} onChange={handleChange} />

        <label>재료</label>
        <input type="text" name="materials" value={form.materials} onChange={handleChange} />

        <label>유통기한</label>
        <input type="text" name="explamationDate" value={form.explamationDate} onChange={handleChange} />

        <label>중량</label>
        <input type="text" name="weight" value={form.weight} onChange={handleChange} />

        <label>원산지</label>
        <input type="text" name="origin" value={form.origin} onChange={handleChange} />

        <label>상세 설명</label>
        <textarea name="content" value={form.content} onChange={handleChange}></textarea>

        <label>상품 이미지</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button type="submit" className="submit-btn">상품 등록</button>
      </form>
    </div>
  );
}
