import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import "./Footer.css"; 

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>초콜릿 월드</h3>
            <p>세계 각국의 프리미엄 초콜릿 브랜드를 소개하고 초콜릿 종류별로 선택할 수 있는 플랫폼입니다.</p>
          </div>

          <div className="footer-section">
            <h3>마켓</h3>
            <ul>
              <li><Link to="/market/new">신상품</Link></li>
              <li><Link to="/market/bestsellers">베스트셀러</Link></li>
              <li><Link to="/market/gift">선물세트</Link></li>
              <li><Link to="/market/limited">한정판</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>커뮤니티</h3>
            <ul>
              <li><Link to="/community/hotdeals">핫딜</Link></li>
              <li><Link to="/community/best">베스트</Link></li>
              <li><Link to="/community/reviews">후기</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>고객센터</h3>
            <ul>
              <li><Link to="/support/faq">자주 묻는 질문</Link></li>
              <li><Link to="/support/contact">문의하기</Link></li>
              <li><Link to="/support/shipping">배송 안내</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} 초콜릿 월드. All rights reserved.</p>
          <div className="footer-icons">
            <Link to="#"><Facebook /></Link>
            <Link to="#"><Instagram /></Link>
            <Link to="#"><Twitter /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
