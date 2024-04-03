import React from "react";
import './Navbar.css'


import logo from '../public/images/logo.png'
export function Navbar(){
    return(
        <>
            <div className="navbar">
                <a href="/"><div className="logo"><img src={logo} alt="" /></div></a>
                <a href="/"><div className="profile"></div></a>
            </div>  
        </>
    )
}
