import { useParams, useNavigate } from "react-router-dom";
import "./BrandDetailPage.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BrandDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tab, setTab] = useState("intro");
    const [brand , setBrand] = useState(null);
    const [otherBrands, setOtherBrands] = useState([]);

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/brand/findById/${id}`)
        .then(res=>{
            setBrand(res.data);
            axios.get(`${process.env.REACT_APP_API_URL}/brand/findByCountry/${encodeURIComponent(res.data.country)}`)
                    .then(response => {
                        const others = response.data.filter(b => b.id !== res.data.id);
                        setOtherBrands(others);
                    });
        })
        .catch(err=>{
            console.log("브렌드 상세정보 불러오기 실패",err);
            
        })
    },[id])
    if (!brand) return <p>존재하지 않는 브랜드입니다.</p>;

    return (
        <div className="brand-detail-wrapper">
            <button className="back-btn" onClick={() => navigate(-1)}>〈 브랜드 목록으로 돌아가기</button>
            <div className="brand-detail-content">
                <div className="brand-detail-left">
                    <img src={brand.images[0].fileUrl} alt={brand.name} />
                </div>
                <div className="brand-detail-right">
                    <span className="badge">{brand.country}</span>
                    <h2>{brand.title}</h2>
                    <p className="desc">{brand.introduction}</p>
                    <ul className="brand-info">
                        <li><strong>설립연도:</strong> {brand.founded}</li>
                        <li><strong>본사:</strong> {brand.office}</li>
                        <li><strong>대표 제품:</strong> {brand.representative}</li>
                        <li><strong>웹사이트:</strong> <a href={brand.webSite} target="_blank" rel="noreferrer">{brand.webSite}</a></li>
                    </ul>
                </div>
            </div>

            {/* 🔽 탭 영역 */}
            <div className="brand-tab-section">
                <div className="brand-tab-buttons">
                    <button className={tab === "intro" ? "active" : ""} onClick={() => setTab("intro")}>브랜드 소개</button>
                    <button className={tab === "history" ? "active" : ""} onClick={() => setTab("history")}>역사</button>
                    <button className={tab === "products" ? "active" : ""} onClick={() => setTab("products")}>제품</button>
                </div>
                <div className="brand-tab-content">
                    {tab === "intro" && <p>{brand.introduction}</p>}
                    {tab === "history" && <p>{brand.history}</p>}
                    {tab === "products" && <p>{brand.representative}</p>}
                </div>
            </div>
            <div className="related-brand-list">
                {otherBrands.length > 0 && (
                    <div className="other-brand-section">
                        <h3>같은 나라의 다른 브랜드</h3>
                        <div className="brand-grid">
                            {otherBrands.map(ob => (
                                <div key={ob.id} className="brand-card" onClick={() => navigate(`/brand/${ob.id}`)}>
                                    <img src={ob.images[0].fileUrl} alt={ob.name} />
                                    <h4>{ob.title}</h4>
                                    <p>{ob.country}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}
