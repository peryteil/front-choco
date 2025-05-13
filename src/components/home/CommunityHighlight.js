
import "./CommunityHighlight.css";

export default function CommunityHighlight() {
  return (
    <section className="community-section">
      <h2 className="community-title">커뮤니티 하이라이트</h2>

      <div className="highlight-top">
        <h3 className="highlight-title">베스트 핫 딜</h3>
        <a href="/community/hotdeals" className="more-link">더보기 &gt;</a>
      </div>

      <div className="highlight-grid">

        {/* 카드 1 */}
        <div className="highlight-card">
          <div className="highlight-image">
            <img src="/image/dark-chocolate.jpg" alt="다크 초콜릿" />
            <span className="discount-badge">50% OFF</span>
          </div>
          <div className="highlight-info">
            <h4>고디바 초콜릿 50% 할인 이벤트</h4>
            <div className="highlight-meta">
              초콜릿월드 · 조회 1245 · 댓글 32
            </div>
            <div className="highlight-price">
              <del>32,000원</del>
              <strong>16,000원</strong>
            </div>
          </div>
        </div>

        {/* 카드 2 */}
        <div className="highlight-card">
          <div className="highlight-image">
            <img src="/image/milk-truffle.jpg" alt="트러플 초콜릿" />
            <span className="discount-badge">50% OFF</span>
          </div>
          <div className="highlight-info">
            <h4>린트 트러플 어쏘트먼트 특가</h4>
            <div className="highlight-meta">
              초콜릿월드 · 조회 987 · 댓글 24
            </div>
            <div className="highlight-price">
              <del>45,000원</del>
              <strong>22,500원</strong>
            </div>
          </div>
        </div>

        {/* 카드 3 */}
        <div className="highlight-card">
          <div className="highlight-image">
            <img src="/image/white-praline.jpg" alt="화이트 초콜릿" />
            <span className="discount-badge">50% OFF</span>
          </div>
          <div className="highlight-info">
            <h4>벨기에 초콜릿 선물세트 한정 할인</h4>
            <div className="highlight-meta">
              초콜릿월드 · 조회 756 · 댓글 18
            </div>
            <div className="highlight-price">
              <del>68,000원</del>
              <strong>34,000원</strong>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
