import React, { useEffect, useState } from "react";
import "./CartPage.css";

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(stored);
    }, []);

    const updateLocalStorage = (items) => {
        localStorage.setItem("cart", JSON.stringify(items));
        setCartItems(items);
    };

    const handleIncrease = (id) => {
        const updated = cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        updateLocalStorage(updated);
    };

    const handleDecrease = (id) => {
        const updated = cartItems.map(item =>
            item.id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        updateLocalStorage(updated);
    };

    const handleRemove = (id) => {
        const updated = cartItems.filter(item => item.id !== id);
        updateLocalStorage(updated);
    };

    const clearCart = () => {
        localStorage.removeItem("cart");
        setCartItems([]);
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="cart-wrapper">
            <h2 className="cart-title">장바구니</h2>

            <div className="cart-content">
                <div className="cart-items">
                    <h3 className="cart-subtitle">장바구니 상품 ({cartItems.length})</h3>

                    {cartItems.length > 0 ? cartItems.map(item => (
                        <div key={item.id} className="cart-item-card">
                            <img
                                src={item.imageDtos?.[0]?.fileUrl || "/image/noimg.png"}
                                alt={item.title}
                            />
                            <div className="item-info">
                                <div className="item-name">{item.title}</div>
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
