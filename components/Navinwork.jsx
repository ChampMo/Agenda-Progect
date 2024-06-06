import React from "react";
import "./Navinwork.css";
import loGoW from "../public/images/logo-white.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function Navinwork({loadInfoname}) {
  
  const [userInfo, setUserInfo] = useState({});


  useEffect(() => {
      const fetchAllWork = async () => {
          axios.get("http://localhost:8000/api/profileInfo",{ withCredentials: true })
              .then((response) => {
              setUserInfo(response.data.userInfo);
              })
              .catch((error) => {
              console.error(error);
              });
      }
      fetchAllWork();
  }, [loadInfoname]);

  return (
    <>
      <div className="navinwork">
        <Link to="/allwork">
          <img className="logoinwork" src={loGoW} alt="" />
        </Link>
        <div className="bg-logout-profile">
            <div className="userNav">{userInfo.username} </div>
            <img 
            className="profile" 
            src={userInfo.picture} 
            alt="profile"/>
        </div>
      </div>
    </>
  );
}
export default Navinwork;
