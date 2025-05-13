// src/components/market/MarketBanner.js

export default function MarketBanner() {
    return (
      <section
        className="market-banner"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/image/martketbanner.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "400px",
        }}
      >
      </section>
    );
  }
  