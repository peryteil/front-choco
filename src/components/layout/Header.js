import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, User, Menu, X } from "lucide-react";
import "./Header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token); // 토큰 존재 여부로 로그인 상태 판단
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top">
          {/* 햄버거 메뉴 */}
          <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* 로고 */}
          <div className="logo">
            <Link to="/">
              <img src="/image/decadent-chocolate-swirl.png" alt="초콜릿 월드 로고" />
              <div className="logo-text">
                <h1>초콜릿 월드</h1>
                <p>The World of Chocolates</p>
              </div>
            </Link>
          </div>

          {/* 네비게이션 (PC용) */}
          <nav className="nav-desktop">
            <Link to="/">홈</Link>
            <Link to="/market">마켓</Link>
            <Link to="/community">커뮤니티</Link>
            <Link to="/brand">브랜드</Link>
          </nav>

          {/* 검색 / 마이페이지 / 장바구니 */}
          <div className="action-buttons">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search size={20} />
            </button>

            <Link to={isLoggedIn ? "/mypage" : "/login"} className="mypage-button">
              <User size={20} />
            </Link>

            {/* 로그인/회원가입 버튼은 로그인 안한 경우만 표시 */}
            {!isLoggedIn && (
              <div className="auth-buttons">
                <Link to="/login" className="login-btn">로그인</Link>
                <Link to="/signup" className="signup-btn">회원가입</Link>
              </div>
            )}

            <Link to="/cart" className="cart-button">
              <ShoppingCart size={20} />
              <span className="cart-count"></span>
            </Link>
          </div>
        </div>

        {/* 검색창 */}
        {isSearchOpen && (
          <div className="search-dialog">
            <div className="search-box">
              <div className="search-header">
                <h2>초콜릿 검색</h2>
                <button onClick={() => setIsSearchOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <div className="search-input">
                <Search size={16} />
                <input type="text" placeholder="브랜드, 제품명, 종류 등을 검색하세요" autoFocus />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
