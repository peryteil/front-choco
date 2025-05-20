import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddBrandPage.css";

export default function AddBrandPage() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    founded: "",
    office: "",
    representative: "",
    webSite: "",
    country: "",
    introduction: "",
    history: "",
  });

  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const dto = { ...form };
      formData.append("dto", new Blob([JSON.stringify(dto)], { type: "application/json" }));
      if (image) {
        formData.append("files", image);
      }

      await axios.post(`${process.env.REACT_APP_API_URL}/api/brand/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("브랜드가 등록되었습니다.");
      navigate("/admin/add-product");
    } catch (err) {
      alert("브랜드 등록 실패");
      console.error(err);
    }
  };

  return (
    <div className="add-brand-page">
      <h2>브랜드 추가</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="브랜드명" value={form.title} onChange={handleChange} required />
        <input name="content" placeholder="브랜드 설명" value={form.content} onChange={handleChange} />
        <input name="founded" placeholder="설립년도 (예: 1999)" value={form.founded} onChange={handleChange} />
        <input name="office" placeholder="본사 위치" value={form.office} onChange={handleChange} />
        <input name="representative" placeholder="대표 제품" value={form.representative} onChange={handleChange} />
        <input name="webSite" placeholder="웹사이트 URL" value={form.webSite} onChange={handleChange} />
        <input name="country" placeholder="국가" value={form.country} onChange={handleChange} />
        <input name="introduction" placeholder="브랜드 소개" value={form.introduction} onChange={handleChange} />
        <textarea name="history" placeholder="브랜드 역사" value={form.history} onChange={handleChange} />
        <label>브랜드 이미지 (선택)</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">브랜드 등록</button>
      </form>
    </div>
  );
}
