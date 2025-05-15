import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      const { accessToken } = response.data;
      if (accessToken) {
        localStorage.setItem("access_token", accessToken);
        window.dispatchEvent(new Event("login")); // 선택적: 로그인된 상태 처리
        navigate("/mypage"); // ✅ 로그인 후 마이페이지 이동
      }
    } catch (error) {
      alert("로그인 실패: " + (error.response?.data || "알 수 없는 오류"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">로그인</h2>
        <p className="login-subtitle">초콜릿 월드에 오신 것을 환영합니다!</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>이메일</label>
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-button">
            로그인
          </button>
        </form>

        <div className="login-divider">또는</div>

        <div className="social-login">
          <button
            className="social"
            onClick={() =>
              (window.location.href =
                "http://localhost:8080/oauth2/authorization/google")
            }
          >
            <img src="/icon/google.png" alt="Google" />
            Google로 계속하기
          </button>
          <button
            className="social"
            onClick={() =>
              (window.location.href =
                "http://localhost:8080/oauth2/authorization/naver")
            }
          >
            <img src="/icon/naver.png" alt="Naver" />
            Naver로 계속하기
          </button>
          <button
            className="social"
            onClick={() =>
              (window.location.href =
                "http://localhost:8080/oauth2/authorization/kakao")
            }
          >
            <img src="/icon/kakao.png" alt="Kakao" />
            Kakao로 계속하기
          </button>
        </div>

        <div className="login-footer">
          계정이 없으신가요? <a href="/signup">회원가입</a>
        </div>
      </div>
    </div>
  );
}
