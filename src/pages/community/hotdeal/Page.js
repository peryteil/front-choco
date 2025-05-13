import { useNavigate } from "react-router-dom";
import HotdealHeader from "../../../components/hotdealHeader/HotdealHeader";
import { Outlet } from "react-router-dom";
import "./HotdealPage.css";

export default function HotdealPage() {
  

  return (
    <div className="hotdeal-page">
      <HotdealHeader />
      <Outlet />
    </div>
    
  );
}

