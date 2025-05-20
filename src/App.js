import { Routes, Route, BrowserRouter } from "react-router-dom";
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
import CommunityPage from "./pages/community/Page";
// import AdminPage from "./pages/admin/Page";
import AdminDashboard from "./pages/admin/DashboardPage";
import AddProductPage from "./pages/admin/AddProductPage";
import ChatbotButton from "./components/chatbot/ChatbotButton";
import ChatbotWindow from "./components/chatbot/ChatbotWindow";
import AddBrandPage from "./pages/admin/AddBrandPage";
import { useState } from "react";
import OrderInfoPage from "./pages/cart/OrderInfoPage";


function App() {
  
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot((prev) => !prev);
  };

  const token = localStorage.getItem("access_token");
  console.log("access_token", token);
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
          <Route index element={<CommunityPage />} />
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
        <Route path="/order" element={<OrderInfoPage />} />

        {/* 회원 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/oauth2/redirect" element={<OauthRedirectPage />} />
        {/* 관리자 페이지 */}
        {/* <Route path="/admin" element={<AdminPage />} /> */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AddProductPage />} />
        <Route path="/admin/add-brand" element={<AddBrandPage/>} />
      </Routes>
      <ChatbotButton onClick={toggleChatbot} />
      {showChatbot && <ChatbotWindow onClose={toggleChatbot} />}
      <Footer />

    </div>
  );
}

export default App;
