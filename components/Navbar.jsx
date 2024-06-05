import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

import logo from "../public/images/logo.png";
export function Navbar() {
    return (
        <>
        <div className="navbar">
            <Link to="/">
            <div className="logo-href">
                <img className="logonav" src={logo} alt="" />
            </div>
            </Link>
            <div className="bg-logout-profile">
                <div className="profile"></div>
            </div>
        </div>
        </>
    );
}
