import React, { useState } from "react";
import "./CartPage.css";

export default function CartPage() {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "고디바 다크 초콜릿 컬렉션",
            price: 32000,
            quantity: 1,
            image: "/image/best1.png"
        },
        {
            id: 2,
            name: "린트 밀크 초콜릿 트러플",
            price: 28000,
            quantity: 2,
            image: "/image/best2.png"
        },
        {
            id: 3,
            name: "뇌하우스 화이트 초콜릿 프랄린",
            price: 35000,
            quantity: 1,
            image: "/image/best3.png"
        }
    ]);

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleIncrease = (id) => {
        setCartItems(prev =>
            prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
        );
    };

    const handleDecrease = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const handleRemove = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <div className="cart-wrapper">
            <h2 className="cart-title">장바구니</h2>

            <div className="cart-content">
                {/* 왼쪽: 장바구니 상품 */}
                <div className="cart-items">
                    <h3 className="cart-subtitle">장바구니 상품 ({cartItems.length})</h3>

                    {cartItems.length > 0 ? cartItems.map(item => (
                        <div key={item.id} className="cart-item-card">
                            <img src={process.env.PUBLIC_URL + item.image} alt={item.name} />
                            <div className="item-info">
                                <div className="item-name">{item.name}</div>
                                <div className="item-price">단가: {item.price.toLocaleString()}원</div>
                                <div className="quantity-controls">
                                    <button className="quantity-btn" onClick={() => handleIncrease(item.id)}>+</button>
                                    <div className="quantity-display">{item.quantity}</div>
                                    <button className="quantity-btn" onClick={() => handleDecrease(item.id)}>-</button>
                                </div>
                                <button className="remove-btn" onClick={() => handleRemove(item.id)}>삭제</button>
                            </div>
                            <div className="item-total">
                                {(item.price * item.quantity).toLocaleString()}원
                            </div>
                        </div>
                    )) : <p>장바구니가 비어 있습니다.</p>}

                    {cartItems.length > 0 && (
                        <button className="clear-cart-btn" onClick={clearCart}>
                            장바구니 비우기
                        </button>
                    )}
                </div>

                {/* 오른쪽: 요약 및 결제 */}
                <div className="cart-summary">
                    <h3>주문 요약</h3>

                    <div className="summary-item">
                        <span>상품 금액</span>
                        <span>{totalPrice.toLocaleString()}원</span>
                    </div>
                    <div className="summary-item">
                        <span>배송비</span>
                        <span>무료</span>
                    </div>

                    <hr />
                    <div className="summary-total">
                        <strong>총 결제 금액</strong>
                        <strong>{totalPrice.toLocaleString()}원</strong>
                    </div>
                    <button className="order-button">주문하기</button>
                </div>
            </div>
        </div>
    );
}
