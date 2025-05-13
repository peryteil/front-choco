import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// 페이지 import
import HomePage from "./pages/home/Page";
import MarketPage from "./pages/market/Page";
import ProductPage from "./pages/market/ProductPage";
import CommunityLayout from "./pages/community/layout/Page";
import HotdealPage from "./pages/community/hotdeal/Page";
import HotdealListPage from "./pages/community/hotdeal/list/Page";
import HotdealDetailPage from "./pages/community/hotdeal/detail/Page";
import HotWritePage from "./pages/community/hotdeal/WritePage";
import BestPage from "./pages/community/best/Page";
import ReviewPage from "./pages/community/review/Page";
import BrandPage from "./pages/brand/Page";
import BrandDetailPage from "./pages/brand/detail/Page";
import CartPage from "./pages/cart/Page";
import SignUpPage from "./pages/signup/Page";
import LoginPage from "./pages/login/Page";
import MyPage from "./pages/mypage/Page";
import OauthRedirectPage from "./pages/oauth/RedirectPage";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        {/* 홈 */}
        <Route path="/" element={<HomePage />} />

        {/* 마켓 */}
        <Route path="/market" element={<MarketPage />} />
        <Route path="/market/:id" element={<ProductPage />} />

        {/* 커뮤니티 레이아웃 */}
        <Route path="/community" element={<CommunityLayout />}>
          <Route path="hotdeal" element={<HotdealPage />}>
            <Route index element={<HotdealListPage />} />
            <Route path="write" element={<HotWritePage />} />
            <Route path=":id" element={<HotdealDetailPage />} />
          </Route>
          <Route path="best" element={<BestPage />} />
          <Route path="review" element={<ReviewPage />} />
        </Route>

        {/* 브랜드 */}
        <Route path="/brand" element={<BrandPage />} />
        <Route path="/brand/:id" element={<BrandDetailPage />} />

        {/* 장바구니 */}
        <Route path="/cart" element={<CartPage />} />

        {/* 회원 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/mypage" element={<MyPage />} />

        <Route path="/oauth2/redirect" element={<OauthRedirectPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
