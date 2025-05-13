import { Link } from "react-router-dom";
import "./CommuHeader.css";  // CSS 추가!

export default function CommuHeader() {
    return (
        <div className="commu-header">
            <nav className="nav-bar">
                <Link to="/community/hotdeal" className="nav-link">핫딜</Link>
                <Link to="/community/best" className="nav-link">베스트</Link>
                <Link to="/community/review" className="nav-link">후기</Link>
            </nav>
        </div>
    );
}
