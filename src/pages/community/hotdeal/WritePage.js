import { useState, useEffect } from "react";
import "./HotdealWritePage.css";
import { useNavigate } from "react-router-dom";

export default function HotdealWritePage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopLink, setShopLink] = useState("");
  const [price, setPrice] = useState(""); // 실제 판매가
  const [originPrice, setOriginPrice] = useState(""); // 원가
  const [discount, setDiscount] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (originPrice && price) {
      const o = parseFloat(originPrice);
      const p = parseFloat(price);
      if (!isNaN(o) && !isNaN(p) && o > 0) {
        setDiscount(((1 - p / o) * 100).toFixed(1));
      }
    }
  }, [originPrice, price]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dto = {
      title,
      shopName,
      shopLink,
      price: parseInt(price),
      category,
      content
    };

    const formData = new FormData();
    formData.append("dto", new Blob([JSON.stringify(dto)], { type: "application/json" }));
    if (imageFile) {
      formData.append("files", imageFile);
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/hotDeal/create`, 
        {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("핫딜 등록 성공!");
        navigate(`/community/hotdeal`);
      } else {
        alert("등록 실패");
      }
    } catch (err) {
      console.error("등록 에러:", err);
      alert("서버 오류 발생");
    }
  };

  return (
    <div className="write-form-container">
      <h2>핫딜 등록</h2>
      <form className="write-form" onSubmit={handleSubmit}>
        <label>제목</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="핫딜 제목" />

        <div className="form-row">
          <div>
            <label>카테고리</label>
            <input type="text" value={category} onChange={e => setCategory(e.target.value)} />
          </div>
          <div>
            <label>쇼핑몰 이름</label>
            <input type="text" value={shopName} onChange={e => setShopName(e.target.value)} placeholder="예: 쿠팡" />
          </div>
          <div>
            <label>쇼핑몰 링크</label>
            <input type="text" value={shopLink} onChange={e => setShopLink(e.target.value)} placeholder="구매 링크" />
          </div>
        </div>

        <div className="form-row">
          <div>
            <label>원가</label>
            <input type="number" value={originPrice} onChange={e => setOriginPrice(e.target.value)} placeholder="정가" />
          </div>
          <div>
            <label>판매가</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="할인가" />
          </div>
          <div>
            <label>할인율</label>
            <input type="text" readOnly value={discount ? `${discount}%` : ""} placeholder="자동 계산" />
          </div>
        </div>

        <label>이미지 업로드</label>
        <div className="upload-box">
          {imagePreview ? (
            <img src={imagePreview} alt="preview" />
          ) : (
            <label className="upload-placeholder">
              📁 이미지 추가
              <input type="file" accept="image/*" onChange={handleImage} hidden />
            </label>
          )}
        </div>

        <label>내용</label>
        <textarea rows="8" value={content} onChange={e => setContent(e.target.value)} placeholder="핫딜 상세 내용 입력" />

        <button type="submit">등록하기</button>
      </form>
    </div>
  );
}
