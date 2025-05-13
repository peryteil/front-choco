import "./Ranking.css";

export default function Ranking() {
  const rankingItems = [
    {
      id: 1,
      title: "고디바 다크 초콜릿 컬렉션",
      price: "32,000원",
      rating: 4.8,
      image: "/image/dark-chocolate.jpg",
    },
    {
      id: 2,
      title: "린트 밀크 초콜릿 트러플",
      price: "28,000원",
      rating: 4.5,
      image: "/image/milk-truffle.jpg",
    },
    {
      id: 3,
      title: "뇌하우스 화이트 초콜릿 프랄린",
      price: "35,000원",
      rating: 4.7,
      image: "/image/white-praline.jpg",
    },
    {
      id: 4,
      title: "토블론 밀크 초콜릿 바",
      price: "18,000원",
      rating: 4.6,
      image: "/image/hazelnut-bar.jpg",
    },
    {
      id: 5,
      title: "발로나 다크 초콜릿 셀렉션",
      price: "42,000원",
      rating: 4.9,
      image: "/image/valrhona-dark.jpg",
    },
  ];

  return (
    <section className="ranking-section">
      <div className="ranking-top">
        <h2 className="ranking-title">실시간 구매 랭킹</h2>
        <a href="/market/ranking" className="more-link">더보기 &gt;</a>
      </div>

      <div className="ranking-grid">
        {rankingItems.map(item => (
          <div key={item.id} className="ranking-card">
            <div className="ranking-badge">{item.id}</div>
            <div className="ranking-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="ranking-info">
              <h3>{item.title}</h3>
              <div className="ranking-bottom">
                <strong>{item.price}</strong>
                <div className="ranking-star">
                  ⭐ {item.rating}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
