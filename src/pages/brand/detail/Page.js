import { useParams, useNavigate } from "react-router-dom";
import "./BrandDetailPage.css";
import { useState } from "react";

const brandData = {
    1: {
        id: 1,
        name: "고디바",
        founded: 1926,
        country: "벨기에",
        headquarter: "브뤼셀, 벨기에",
        products: "다크 초콜릿 컬렉션, 트러플 어쏘트먼트, 골드 발로틴",
        website: "https://www.godiva.com",
        image: "/image/godivang.png",
        desc: "1926년 설립된 벨기에의 대표적인 초콜릿 브랜드로, 고급스러운 맛과 품질로 유명합니다.",
        intro: `고디바는 1926년 벨기에 브뤼셀에서 초콜릿 장인 피에르 드라프스에 의해 설립되었습니다. 이후 고디바는 최고급 초콜릿의 대명사로 자리매김했으며, 특히 프랄린과 트러플로 유명합니다. 전 세계 100여 개국에 매장을 운영하고 있으며, 엄선된 카카오 원두와 전통 제조 방식으로 만든 초콜릿을 제공합니다.`,
        history: `고디바는 벨기에의 대표 브랜드로, 1926년에 설립되어 왕실 공식 초콜릿 공급업체로도 선정된 바 있습니다. 국제 초콜릿 어워드 수상 이력도 많고, 고급 패키지와 마케팅으로 프리미엄 이미지를 유지하고 있습니다.`,
        productsDetail: `대표 제품은 다크 초콜릿 컬렉션, 트러플 어쏘트먼트, 골드 발로틴 등이며, 최근에는 아이스크림, 커피 등으로도 확장하고 있습니다.`
    },
    2: {
        id: 2,
        name: "뇌하우스",
        founded: 1857,
        country: "벨기에",
        headquarter: "브뤼셀, 벨기에",
        products: "프랄린, 벨지안 셀렉션",
        website: "https://www.neuhauschocolates.com",
        image: "/image/brand_neuhaus.png",
        desc: "프랄린을 만든 벨기에 전통 초콜릿 브랜드입니다."
    },
    3: {
        id: 3,
        name: "레오니다스",
        founded: 1913,
        country: "벨기에",
        headquarter: "브뤼셀, 벨기에",
        products: "아쌈 다크, 밀크 셀렉션",
        website: "https://www.leonidas.com",
        image: "/image/brand_leonidas.png",
        desc: "합리적인 가격의 고품질 벨기에 초콜릿 브랜드입니다."
    }
};

export default function BrandDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tab, setTab] = useState("intro");

    const brand = brandData[id];
    if (!brand) return <p>존재하지 않는 브랜드입니다.</p>;

    const otherBrands = Object.values(brandData).filter(
        b => b.country === brand.country && b.id !== brand.id
    );

    return (
        <div className="brand-detail-wrapper">
            <button className="back-btn" onClick={() => navigate(-1)}>〈 브랜드 목록으로 돌아가기</button>

            <div className="brand-detail-content">
                <div className="brand-detail-left">
                    <img src={process.env.PUBLIC_URL + brand.image} alt={brand.name} />
                </div>
                <div className="brand-detail-right">
                    <span className="badge">{brand.country}</span>
                    <h2>{brand.name}</h2>
                    <p className="desc">{brand.desc}</p>
                    <ul className="brand-info">
                        <li><strong>설립연도:</strong> {brand.founded}</li>
                        <li><strong>본사:</strong> {brand.headquarter}</li>
                        <li><strong>대표 제품:</strong> {brand.products}</li>
                        <li><strong>웹사이트:</strong> <a href={brand.website} target="_blank" rel="noreferrer">{brand.website}</a></li>
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
                    {tab === "intro" && <p>{brand.intro}</p>}
                    {tab === "history" && <p>{brand.history}</p>}
                    {tab === "products" && <p>{brand.productsDetail}</p>}
                </div>
            </div>
            <h3 className="related-title">같은 나라의 다른 브랜드</h3>
            <div className="related-brand-list">
                {otherBrands.length > 0 && (
                    <div className="other-brand-section">
                        <h3>같은 나라의 다른 브랜드</h3>
                        <div className="brand-grid">
                            {otherBrands.map(ob => (
                                <div key={ob.id} className="brand-card" onClick={() => navigate(`/brand/${ob.id}`)}>
                                    <img src={process.env.PUBLIC_URL + ob.image} alt={ob.name} />
                                    <h4>{ob.name}</h4>
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
