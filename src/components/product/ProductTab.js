import { useState } from "react";
import './ProductTab.css';

export default function ProductTab({ product }) {
  const [activeTab, setActiveTab] = useState('detail');

  return (
    <section className="product-tab">
      <div className="tab-buttons">
        <button
          className={activeTab === 'detail' ? 'active' : ''}
          onClick={() => setActiveTab('detail')}
        >
          상세 설명
        </button>
        <button
          className={activeTab === 'ingredients' ? 'active' : ''}
          onClick={() => setActiveTab('ingredients')}
        >
          원재료
        </button>
        <button
          className={activeTab === 'review' ? 'active' : ''}
          onClick={() => setActiveTab('review')}
        >
          리뷰
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'detail' && (
          <div>
            <p>{product.content}</p>
          </div>
        )}
        {activeTab === 'ingredients' && (
          <div>
            <p>{product.materials}</p>
          </div>
        )}
        {activeTab === 'review' && (
          <div>
            {product.reviewDtos?.length > 0 ? (
              product.reviewDtos.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-stars">
                    {Array.from({ length: 5 }, (_, i) =>
                      i < review.rating ? "⭐" : "☆"
                    ).join("")}
                  </div>
                  <p className="review-content">{review.content}</p>
                </div>
              ))
            ) : (
              <p>아직 리뷰가 없습니다</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
