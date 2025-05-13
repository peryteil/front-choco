import CommuHeader from "../../../components/commuheader/Commuheader";
import { Outlet } from "react-router-dom";

export default function CommunityLayout() {
  return (
    <div>
      <CommuHeader />
      <Outlet />
    </div>
  );
}