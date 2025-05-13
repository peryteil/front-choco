import "./Popular.css";

export default function Popular() {
  return (
    <section className="popular-section">
        <div className="pop">
      <h2 className="section-title">인기 초콜릿</h2>
      <div className="popular-grid">
        
        {/* 카드 1 */}
        <div className="popular-card">
          <div className="popular-image">
            <img src="/image/cho1.png" alt="다크 초콜릿 컬렉션" />
            <span className="badge">NEW</span>
          </div>
          <div className="popular-info">
            <div className="popular-header">
              <h3>다크 초콜릿 컬렉션</h3>
              <span className="price">32,000원</span>
            </div>
            <p className="brand-info">Godiva · 벨기에</p>
            <p className="product-type">다크 초콜릿</p>
          </div>
        </div>

        {/* 카드 2 */}
        <div className="popular-card">
          <div className="popular-image">
            <img src="/image/cho2.png" alt="밀크 초콜릿 트러플" />
          </div>
          <div className="popular-info">
            <div className="popular-header">
              <h3>밀크 초콜릿 트러플</h3>
              <span className="price">28,000원</span>
            </div>
            <p className="brand-info">Lindt · 스위스</p>
            <p className="product-type">밀크 초콜릿</p>
          </div>
        </div>

        {/* 카드 3 */}
        <div className="popular-card">
          <div className="popular-image">
            <img src="/image/cho3.png" alt="화이트 초콜릿 프랄린" />
          </div>
          <div className="popular-info">
            <div className="popular-header">
              <h3>화이트 초콜릿 프랄린</h3>
              <span className="price">35,000원</span>
            </div>
            <p className="brand-info">Neuhaus · 벨기에</p>
            <p className="product-type">화이트 초콜릿</p>
          </div>
        </div>

        {/* 카드 4 */}
        <div className="popular-card">
          <div className="popular-image">
            <img src="/image/cho4.png" alt="헤이즐넛 초콜릿 바" />
            <span className="badge">NEW</span>
          </div>
          <div className="popular-info">
            <div className="popular-header">
              <h3>헤이즐넛 초콜릿 바</h3>
              <span className="price">18,000원</span>
            </div>
            <p className="brand-info">Toblerone · 스위스</p>
            <p className="product-type">밀크 초콜릿</p>
          </div>
        </div>

      </div>
      </div>
    </section>
  );
}
