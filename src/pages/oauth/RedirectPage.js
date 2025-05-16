import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OauthRedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    console.log("리디렉션에서 받은 토큰:", token);
    console.log("기존 토큰:", localStorage.getItem("access_token"));

    if (token) {
      localStorage.setItem("access_token", token);

      window.dispatchEvent(new Event("login")); // ✅ 추가
      navigate("/");


      window.dispatchEvent(new Event("login")); // ✅ 추가
      navigate("/");


      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate("/");
    } else {
      alert("로그인 토큰 없음 (token query 누락)");
      navigate("/login");

    }
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
}

export default OauthRedirectPage;