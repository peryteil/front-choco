import "./BrandSection.css";

export default function BrandSection() {
  return (
    <section className="brand-section">
      <h2>나라별 초콜릿 브랜드</h2>
      <div className="brand-grid">
        <div className="brand-card">
          <img src="/image/godiva.png" alt="Godiva" />
          <h3>벨기에 (Godiva)</h3>
          <p>세계적으로 유명한 벨기에 초콜릿 브랜드</p>
        </div>
        <div className="brand-card">
          <img src="/image/lindt.png" alt="Lindt" />
          <h3>스위스 (Lindt)</h3>
          <p>알프스의 순수함을 담은 스위스 초콜릿</p>
        </div>
        <div className="brand-card">
          <img src="/image/leonidas.png" alt="Leonidas" />
          <h3>프랑스 (Leonidas)</h3>
          <p>예술적인 프랑스 초콜릿 장인정신</p>
        </div>
        <div className="brand-card">
          <img src="/image/leonidas.png" alt="Leonidas" />
          <h3>이탈리아 </h3>
          <p>지중해의 풍미가 담긴 이탈리아 초콜릿</p>
        </div>
      </div>
    </section>

  );
}
