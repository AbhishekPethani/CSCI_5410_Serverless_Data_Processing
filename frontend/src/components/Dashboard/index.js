/* 
  authorName : Sanjuna Konda 
  email : sn493898@dal.ca
*/

import React, {  useEffect } from "react";
import { useNavigate } from "react-router";

function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
  }, []);


  const token = localStorage.getItem("token");

  if (token == null) {
    navigate("/sign-in");
  }

  return (
   "Hello From Dashboard"
  );
}

export default Dashboard;
