import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import logo from "../public/images/logo.png";
import { useNavigate } from "react-router-dom";


export function Navbar() {
    const navigate = useNavigate();

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
    }, []);
console.log('userInfouserInfo',userInfo.picture)


    return (
        <>
        <div className="navbar">
            <Link to="/">
            <div className="logo-href">
                <img className="logonav" src={logo} alt="" />
            </div>
            </Link>
            <div 
            onClick={()=>navigate('/setting')}
            className="bg-profile">
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
