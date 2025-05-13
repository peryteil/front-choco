import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OauthRedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("accessToken", token);
      navigate("/");
    } else {
      alert("로그인 토큰 없음");
      navigate("/login");
    }
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
}

export default OauthRedirectPage;
