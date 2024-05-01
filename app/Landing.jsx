import './Landing.css'; 
import vectorlanding from '../public/images/vector-landing.png';
import loGo from '../public/images/logo.png';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

function Landing() {

  const [stagePage, setstagePage] = useState(true);
  const Checklogin = () => {
    try {
      axios.get('http://localhost:3000/api/checklogin')
        .then(response => {
          console.log(response.data.success);
          if(response.data.success){
            setstagePage(false)
          } else {
            setstagePage(true)
          }
        })
        .catch(error => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    Checklogin();
  }, []);
  const HandleLogout = () => {
    try {
      axios.get('http://localhost:3000/logout');
      setstagePage("");
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className='landing'>
      <div className='box-vector-landing'>
        <img className='vector-landing' src={vectorlanding} alt='' />
       
      </div>

      <div className='container'>
        <nav className='nav'>
          <Link to="/" ><img className='logo' src={loGo} alt='' /></Link>
          {stagePage
          ?<Link to="/login" ><div  className='bt-login'>Login</div></Link>
          :<>
            <div  className='bt-logout' onClick={HandleLogout}><FontAwesomeIcon icon={faRightFromBracket} style={{color: "#12419C",}} />Log out</div>
          </>
          }
          
        </nav>
        <header className='header'>
          <h1>Welcome to Agenda </h1>
          <p>Agenda is a platform that allows you to create and manage your events</p>
          <Link to="/allwork" ><div className='button-st'>Start your plan!</div></Link>
        </header>
        
      </div>
      <footer className='footer'>
          
      </footer>
      
    </div>
  );
}

export default Landing;
