import React, { useState } from "react";
import "./RegisterPage.css";

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreed: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.agreed) {
            alert("이용약관에 동의해주세요.");
            return;
        }
        if (form.password !== form.confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        console.log("회원가입 정보:", form);
        // 여기에 API 호출 등 가입 처리 로직
    };

    return (
        <div className="register-container">
            <button className="back-btn">← 뒤로가기</button>
            <form className="register-form" onSubmit={handleSubmit}>
                <h2 className="form-title">회원가입</h2>
                <p className="form-subtitle">초콜릿 월드의 회원이 되어 다양한 혜택을 누려보세요!</p>

                <label>이름</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required />

                <label>이메일</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required />

                <label>비밀번호</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} required />

                <label>비밀번호 확인</label>
                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />

                <div className="checkbox-area">
                    <input type="checkbox" name="agreed" checked={form.agreed} onChange={handleChange} />
                    <span>
                        <span className="required">이용약관</span> 및 <span className="required">개인정보처리방침</span>에 동의합니다.
                    </span>
                </div>

                <button type="submit" className="submit-btn">회원가입</button>

                <div className="divider">또는</div>

                <div className="social-login">
                    <button className="social">
                        <img src="/icon/google.png" alt="Google" />
                        Google로 계속하기
                    </button>
                    <button className="social">
                        <img src="/icon/microsoft.png" alt="Microsoft" />
                        Microsoft 계정으로 계속하기
                    </button>
                    <button className="social">
                        <img src="/icon/apple.png" alt="Apple" />
                        Apple로 계속하기
                    </button>
                </div>
                <p className="login-link">이미 회원이신가요? <span>로그인</span></p>
            </form>
        </div>
    );
}
