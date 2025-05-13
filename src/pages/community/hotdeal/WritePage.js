import { useState, useEffect } from "react";
import "./HotdealWritePage.css";

export default function HotdealWritePage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("초콜릿");
  const [link, setLink] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (price && salePrice) {
      const origin = parseFloat(price);
      const sale = parseFloat(salePrice);
      if (!isNaN(origin) && !isNaN(sale) && origin > 0) {
        setDiscount(((1 - sale / origin) * 100).toFixed(1));
      }
    }
  }, [price, salePrice]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <div className="write-form-container">
      <h2>핫딜 입력</h2>
      <form className="write-form">

        <label>제목</label>
        <input type="text" placeholder="핫딜 제목을 입력하세요" value={title} onChange={e => setTitle(e.target.value)} />

        <div className="form-row">
          <div>
            <label>카테고리</label>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="초콜릿">초콜릿</option>
              <option value="사탕">사탕</option>
              <option value="쿠키">쿠키</option>
            </select>
          </div>

          <div>
            <label>구매 링크</label>
            <input type="text" placeholder="구매 링크를 입력하세요" value={link} onChange={e => setLink(e.target.value)} />
          </div>
        </div>

        <div className="form-row">
          <div>
            <label>원가</label>
            <input type="number" placeholder="원가를 입력하세요" value={price} onChange={e => setPrice(e.target.value)} />
          </div>
          <div>
            <label>할인가</label>
            <input type="number" placeholder="할인가를 입력하세요" value={salePrice} onChange={e => setSalePrice(e.target.value)} />
          </div>
          <div>
            <label>할인율 (%)</label>
            <input type="text" value={discount ? `${discount}%` : ""} readOnly placeholder="할인율이 자동 계산됩니다" />
          </div>
        </div>

        <label>이미지 업로드</label>
        <div className="upload-box">
          {image ? (
            <img src={image} alt="preview" />
          ) : (
            <label className="upload-placeholder">
              📁 이미지 추가
              <input type="file" accept="image/*" onChange={handleImage} hidden />
            </label>
          )}
        </div>

        <label>내용</label>
        <textarea rows="8" placeholder="핫딜 내용을 자세히 입력하세요" value={content} onChange={e => setContent(e.target.value)} />

        <button type="submit">등록하기</button>
      </form>
    </div>
  );
}
