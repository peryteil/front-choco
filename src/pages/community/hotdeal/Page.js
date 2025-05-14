import { useNavigate } from "react-router-dom";
import HotdealHeader from "../../../components/hotdealHeader/HotdealHeader";
import { Outlet } from "react-router-dom";
import "./HotdealPage.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HotdealPage() {
  const [hotDeals , setHotdeals] = useState([]);

  useEffect(()=>{
    axios.get(`http://localhost:8080/hotDeal/findAllList`)
    .then(res=>setHotdeals(res.data))
    .catch(err=>console.log("핫딜 데이터 불러오기 실패",err))
  },[])
  

  return (
    <div className="hotdeal-page">
      <HotdealHeader  hotDeals = {hotDeals}/>
      <Outlet context={{hotDeals}} />
    </div>
    
  );
}

