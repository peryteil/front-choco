import "./Review.css";

export default function Review() {
  const reviews = [
    {
      id: 1,
      nickname: "초콜릿러버",
      product: "고디바 다크 초콜릿 컬렉션",
      date: "2023-04-15",
      content: "진짜 맛있어요! 다크 초콜릿인데도 쓴맛이 적당해서 좋았습니다.",
      rating: 5,
      profileImage: "/image/profile1.png",
      productImage: "/image/dark-chocolate.jpg",
    },
    {
      id: 2,
      nickname: "달콤한인생",
      product: "린트 수프림 시리즈 밀크 초콜릿 종합세트",
      date: "2023-04-18",
      content: "포장이 고급스럽고 맛도 좋아요! 선물용으로 딱입니다.",
      rating: 4,
      profileImage: "/image/profile2.png",
      productImage: "/image/milk-truffle.jpg",
    },
    {
      id: 3,
      nickname: "초코홀릭",
      product: "발로나 다크 초콜릿 70% 프로페셔널",
      date: "2023-04-20",
      content: "디저트용으로 구매했는데 베이킹에 쓰기 딱 좋아요! 다른 브랜드보다 맛 좋음!",
      rating: 5,
      profileImage: "/image/profile3.png",
      productImage: "/image/valrhona-dark.jpg",
    },
    {
      id: 4,
      nickname: "초콜릿매니아",
      product: "토블론 밀크 초콜릿 바",
      date: "2023-04-22",
      content: "독특한 삼각형 모양과 꿀, 아몬드 조합이 정말 좋아요.",
      rating: 5,
      profileImage: "/image/profile4.png",
      productImage: "/image/hazelnut-bar.jpg",
    },
    {
      id: 5,
      nickname: "달콤쌉싸름",
      product: "뇌하우스 화이트 초콜릿 프랄린",
      date: "2023-04-24",
      content: "화이트 초콜릿과 헤이즐넛의 조화가 환상적입니다.",
      rating: 5,
      profileImage: "/image/profile5.png",
      productImage: "/image/white-praline.jpg",
    },
    {
      id: 6,
      nickname: "초코사랑",
      product: "레오니다스 프랄린 어쏘트먼트",
      date: "2023-04-26",
      content: "벨기에 전통 방식으로 만든 다양한 프랄린 초콜릿을 맛볼 수 있어요.",
      rating: 4,
      profileImage: "/image/profile6.png",
      productImage: "/image/leonidas.jpg",
    },
  ];

  return (
    <section className="review-section">
      <div className="review-top">
        <h2 className="review-title">월간 리뷰 TOP6</h2>
        <a href="/community/reviews" className="more-link">더보기 &gt;</a>
      </div>

      <div className="review-grid">
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <img src={review.profileImage} alt="프로필" className="profile-image" />
              <span className="nickname">{review.nickname}</span>
              <div className="stars">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
            </div>
            <div className="review-body">
              <img src={review.productImage} alt="상품" className="product-image" />
              <div className="product-info">
                <h3>{review.product}</h3>
                <p className="date">{review.date}</p>
                <p className="content">{review.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
