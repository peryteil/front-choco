import MainBanner from "../../components/home/MainBanner";
import BrandSection from "../../components/home/BrandSection";
import Popular from "../../components/home/Popular";
import CommunityHighlight from "../../components/home/CommunityHighlight";
import Ranking from "../../components/home/Ranking";
import Review from "../../components/home/Review";

function HomePage() {
  return (
    <div>
      {/* 메인 베너 */}
      <MainBanner />
      {/* 나라별 브랜드 */}
      <BrandSection />
      {/* 인기있는 초콜릿 */}
      <Popular />
      {/* 커뮤니티 하이라이트 */}
      <CommunityHighlight />
      {/* 랭킹 */}
      <Ranking />
      {/* 리뷰 */}
      <Review />
    </div>
  );
}

export default HomePage;
