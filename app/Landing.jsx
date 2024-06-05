import "./Landing.css";
import vectorlanding from "../public/images/vector-landing.png";
import loGo from "../public/images/logo.png";
import { Link,useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
axios.defaults.withCredentials = true;
function Landing() {
  
  const [stagePage, setstagePage] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const Checklogin = async () => {
      try {
        await axios
          .get("http://localhost:8000/api/checklogin")
          .then((response) => {
            console.log(response.data.success);
            if (response.data.success) {
              setstagePage(false);
            } else {
              setstagePage(true);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    };
    Checklogin();
  }, [stagePage]);
  
  console.log('stagePage',stagePage)
  

  const HandleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/logout")
      console.log('Logout successfully!')
      setstagePage(true);
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="landing">
      <div className="box-vector-landing">
        <img className="vector-landing" src={vectorlanding} alt="" />
      </div>

      <div className="container">
        <nav className="nav">
          <Link to="/">
            <img className="logo" src={loGo} alt="" />
          </Link>
          {stagePage ? (
            <Link to="/login">
              <div className="bt-login">Login</div>
            </Link>
          ) : (
            <>
              <div className="bt-logout" onClick={HandleLogout}>
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  style={{ color: "#12419C" }}
                />
                Log out
              </div>
            </>
          )}
        </nav>
        <header className="header">
          <h1>Welcome to Agenda </h1>
          <p>
            Agenda is a platform that allows you to create and manage your
            events
          </p>
          <div 
          onClick={stagePage ? ()=>(navigate('/login')):()=>(navigate('/allwork'))}>
            <div className="button-st">Start your plan!</div>
          </div>
        </header>
      </div>
      <footer className="footer"></footer>
    </div>
  );
}

export default Landing;
