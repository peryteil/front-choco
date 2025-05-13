import { useState } from "react";
import './ProductTab.css';

export default function ProductTab() {
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
            <p>초콜릿에 대한 상세한 설명입니다.</p>
            <p>엄선된 재료로 최고의 맛을 구현했습니다.</p>
          </div>
        )}
        {activeTab === 'ingredients' && (
          <div>
            <p>카카오매스, 코코아버터, 설탕, 바닐라 추출물</p>
          </div>
        )}
        {activeTab === 'review' && (
          <div>
            <p>⭐️⭐️⭐️⭐️☆ - 정말 맛있어요!</p>
            <p>⭐️⭐️⭐️⭐️⭐️ - 선물용으로 최고입니다!</p>
          </div>
        )}
      </div>
    </section>
  );
}
