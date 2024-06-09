import "./Landing.css";
import vectorlanding from "../public/images/vector-landing.png";
import loGo from "../public/images/logo.png";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, Element, animateScroll as scroll } from 'react-scroll';
import axios from "axios";
import { Icon } from '@iconify/react';


import logo from "../public/images/logo.png";
import footer from "../public/landingprop/footer.png";
import propsignup from "../public/landingprop/signup.png";
import proplogin from "../public/landingprop/login.png";
import propcircle from "../public/landingprop/propcircle.png";
import img1 from "../public/landingprop/img1.png";
import img2 from "../public/landingprop/img2.png";
import img3 from "../public/landingprop/img3.png";
import img4 from "../public/landingprop/img4.png";
import img5 from "../public/landingprop/img5.png";
import img6 from "../public/landingprop/img6.png";
import img7 from "../public/landingprop/img7.png";
import img8 from "../public/landingprop/img8.png";
import img9 from "../public/landingprop/img9.png";
import img10 from "../public/landingprop/img10.png";
import img11 from "../public/landingprop/img11.png";
import img12 from "../public/landingprop/img12.png";
import img13 from "../public/landingprop/img13.png";
import img14 from "../public/landingprop/img14.png";








axios.defaults.withCredentials = true;
function Landing() {
  
  const [stagePage, setstagePage] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const Checklogin = async () => {
      try {
        await axios.get("http://localhost:8000/api/checklogin")
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

    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const parallaxElement = document.querySelector(".parallax");
        parallaxElement.style.transform = `translateX(-${1000-2*(scrollPosition/8)}px) translateY(${scrollPosition * 0.6-500}px)`;

        console.log('-=]-=]',scrollPosition , 400-2*(scrollPosition/10), scrollPosition * 0.6-400)

        if( scrollPosition > 3500){
          parallaxElement.style.transform = `translateX(-${1000-2*(3500/8)}px) translateY(${3500 * 0.6-500}px)`;
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);


    const handleScrollTop = () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  };


  return (
    <>
      <style>
        {`body {
            overflow-x: hidden;
        }`}
      </style>
        
      <div className="landing">
        <div className="box-vector-landing">
          <img className="vector-landing" src={vectorlanding} alt="" />
        </div>

        <div className="container">
          <nav className="nav">
            <div onClick={()=>navigate('/')}>
              <img className="logo" src={loGo} alt="" />
            </div>
            {stagePage ? (
              <div 
              onClick={()=>navigate('/login')}>
                <div className="bt-login">Login</div>
              </div>
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
          <section className="flex w-full mt-[400px]">
            <div className="flex w-1/2 justify-center items-center flex-col">
              <h2 className="flex text-4xl text-white ">Let's get to know Agenda.</h2>
              <div className="flex text-2xl text-white w-[500px] mt-10 leading-10 text-center">
              adenda is a web application 
              For planning various plans and being able to share duties 
              and work with teammates comfortably.
              </div>
              <Link 
              to="secondSection" 
              smooth={true} 
              duration={1800}
              className="flex w-44 justify-center items-center h-10 text-xl text-col1 mt-8 bg-col2 rounded-full cursor-pointer duration-300 active:scale-95">
                start
              </Link>
            </div>
            <div className="flex w-1/2 justify-center items-center">
              <div className="flex flex-col p-10 max-w-[800px] bg-glass rounded-3xl shadow-lg">
                <img className="w- mx-auto rounded-t-3xl" src={propsignup} alt="" />
                <img className="w- mx-auto rounded-b-3xl" src={proplogin} alt="" />
              </div>
            </div>
          </section>
          <Element name="secondSection">
          <section className="flex w-full mt-32 relative items-center">
            <img className="parallax w- mx-auto rounded-t-3xl absolute left-0 top-0 w-[1200px]" src={propcircle} alt="" />
            <div className="flex w-1/2 justify-center items-center z-10">
              <div className="flex flex-col max-w-[800px] bg-glass rounded-3xl shadow-lg mt-20">
              <img className="w- mx-auto rounded-3xl w-[800px]" src={img1} alt="" />
              </div>
            </div>
            <div className="flex w-1/2 justify-center items-center flex-col">
              <h2 className="flex text-4xl text-white ">Log in and let's get started.</h2>
              <div className="flex text-2xl text-white w-[450px] mt-10 leading-10 text-center items-center">
              Let's start your planning with agenda.
              Start by managing your profile.
              </div>
              <Link 
              to="3Section" 
              smooth={true} 
              duration={1800} 
              className="flex w-44 justify-center items-center h-10 text-xl text-white mt-8 bg-col2 rounded-full cursor-pointer duration-300 active:scale-95">next
              </Link>
            </div>
          </section>
          </Element>
          <Element name="3Section">
          <section className="flex w-full mt-52 pt-20">
            <div className="flex w-1/2 justify-center items-center flex-col z-10 -translate-x-8">
              <div className="flex text-2xl text-col1 w-[500px] mt-10 leading-10 text-center">
              Let's start creating your work by pressing the create button.
              </div>
              <Link 
              to="4Section" 
              smooth={true}  
              duration={1800} 
              className="flex w-44 justify-center items-center h-10 text-xl text-white mt-8 bg-col1 rounded-full cursor-pointer duration-300 active:scale-95">next
              </Link>
            </div>
            <div className="flex w-1/2 justify-center items-center z-10 relative">
              <div className=" absolute w-[300] h-[300] bg-glass top-0 right-0"></div>
              <div className="flex flex-col max-w-[800px] rounded-3xl">
                <img className=" mx-auto rounded-3xl shadow-lg mb-12" src={img2} alt="" />
                <Icon className="mx-auto text-glass" icon="icon-park-solid:down-two" width="40" height="40" />
                <img className=" mx-auto rounded-3xl shadow-lg mt-12" src={img3} alt="" />
              </div>
            </div>
          </section>
          </Element>
          <Element name="4Section">
          <section className="flex w-full mt-5 pt-80">
            <div className="flex w-1/2 justify-center items-center flex-col z-10">
              <div className="flex text-2xl text-col1 w-[500px] mt-10 leading-10 text-center justify-center">
              Start by setting up your project.
              </div>
              <Link 
              to="5Section" 
              smooth={true}  
              duration={1800} 
              className="flex w-44 justify-center items-center h-10 text-xl text-white mt-8 bg-col1 rounded-full cursor-pointer duration-300 active:scale-95">next
              </Link>
            </div>
            <div className="flex w-1/2 justify-center items-center z-10">
              <div className="flex flex-col max-w-[800px] rounded-3xl">
                <img className=" mx-auto rounded-3xl shadow-lg" src={img4} alt="" />
              </div>
            </div>
          </section>
          </Element>
          <Element name="5Section">
          <section className="flex w-full mt-52 pt-60">
            <div className="flex w-1/2 justify-center items-center z-10 relative">
              <div className="flex flex-col max-w-[800px] rounded-3xl bg-glass p-5 py-14">
                <img className=" mx-auto rounded-xl shadow-lg mb-12" src={img5} alt="" />
                <Icon className="mx-auto text-glass" icon="icon-park-solid:down-two" width="40" height="40" />
                <img className=" mx-auto rounded-xl shadow-lg mt-12" src={img6} alt="" />
              </div>
            </div>
            <div className="flex w-1/2 justify-around items-center flex-col z-10 -translate-x-8">
              <div className="flex text-2xl text-white w-[500px] leading-10 text-center justify-center">
              Multitasking can be done by inviting your teammates.
              </div>
              <div className="flex text-2xl text-white w-[500px] leading-10 text-center justify-center">
              Your friends will be able to join.
              </div>
              
            </div>
            
          </section>
          <Link 
              to="6Section" 
              smooth={true}  
              duration={1800} 
              className="flex w-48 mx-auto mt-32 justify-center items-center h-10 text-xl text-white bg-col1 rounded-full cursor-pointer duration-300 active:scale-95">next
              </Link>
          </Element>
          <Element name="6Section">
          <section className="flex w-full mt-5 pt-60 flex-col">
            <div className="flex w-full justify-center items-center z-10">
              <div className="flex w-full justify-around items-center rounded-3xl mx-suto">
                <img className=" w-[700px] rounded shadow-lg" src={img7} alt="" />
                <img className=" w-[700px] rounded shadow-lg" src={img8} alt="" />
              </div>
            </div>
            <div className="flex w-full justify-around items-center z-10 mt-5">
              <div className="flex text-2xl text-white w-[500px] mt-10 leading-10 text-center justify-center">
              Able to manage various roles
              </div>
              <div className="flex text-2xl text-white w-[500px] mt-10 leading-10 text-center justify-center">
              Allocate a role for each person.
              </div>
              
            </div>
            <Link 
              to="7Section" 
              duration={1800} 
              smooth={true}  
              className="flex w-48 mx-auto mt-20 justify-center items-center h-10 text-xl text-white bg-col1 rounded-full cursor-pointer duration-300 active:scale-95">next
              </Link>
          </section>
          </Element>
          <Element name="7Section">
          <section className="flex w-full mt-32 pt-32 relative items-center">
            <div className="flex w-1/2 justify-center items-center z-10">
              <div className="flex flex-col max-w-[800px] bg-glass rounded-3xl shadow-lg mt-20 p-5 py-10">
                <img className="w- mx-auto rounded-xl w-[800px]" src={img9} alt="" />
              </div>
            </div>
            <div className="flex w-1/2 justify-center items-center flex-col">
              <div className="flex text-2xl text-white w-[450px] mt-10 leading-10 text-center items-center justify-center">
              ...
              </div>
              <Link 
              to="8Section" 
              smooth={true} 
              duration={1800} 
              className="flex w-44 justify-center items-center h-10 text-xl text-white mt-8 bg-col1 rounded-full cursor-pointer duration-300 active:scale-95">next
              </Link>
            </div>
          </section>
          </Element>
          <Element name="8Section">
          <section className="flex w-full mt-32 pt-52 relative items-center">
            <div className="flex w-1/2 justify-center items-center flex-col mt-32">
              <div className="flex text-2xl text-white w-[600px] mt-10 leading-10 text-center items-center justify-center">
              You can edit various tasks and view your own work.
              </div>
              <div className="flex text-2xl text-white w-[450px] mt-10 leading-10 text-center items-center justify-center">
              You can filter jobs according to status.
              </div>
              <Link 
              to="9Section" 
              smooth={true} 
              duration={1800} 
              className="flex w-44 justify-center items-center h-10 text-xl text-white mt-8 bg-col1 rounded-full cursor-pointer duration-300 active:scale-95">next
              </Link>
            </div>
            <div className="flex w-1/2 justify-center items-center z-10">
              <div className="flex flex-col max-w-[800px] rounded-3xl mt-20 relative">
                <img className=" mx-auto rounded-xl w-[800px] translate-x-10 -translate-y-14  shadow-xl" src={img10} alt="" />
                <img className=" absolute mx-auto rounded-xl w-[600px]  shadow-xl top-32 right-60" src={img11} alt="" />
                <img className=" absolute mx-auto rounded-xl w-[600px]  shadow-xl top-96 left-52 translate-y-16" src={img12} alt="" />
              </div>
            </div>
          </section>
          </Element>
          <Element name="9Section">
          <section className="flex w-full mt-32 pt-52 relative items-center">
            <div className="flex w-1/2 justify-center items-center z-10">
              <div className="flex flex-col max-w-[800px] bg-glass rounded-3xl shadow-lg mt-20">
                <img className="w- mx-auto rounded-xl w-[800px] translate-x-5 translate-y-5" src={img13} alt="" />
              </div>
            </div>
            <div className="flex w-1/2 justify-center items-center flex-col">
              <div className="flex text-2xl text-white w-[450px] mt-10 leading-10 text-center items-center justify-center">
              Work is divided into roles for ease of use.
              </div>
              <Link 
                to="10Section" 
                smooth={true} 
                duration={1800} 
                className="flex w-44 justify-center items-center h-10 text-xl text-white mt-8 bg-col1 rounded-full cursor-pointer duration-300 active:scale-95">next
              </Link>
            </div>
          </section>
          </Element>
          <Element name="10Section">
          <section className="flex w-full mt-10 pt-32 relative items-center">
            <div className="flex w-1/2 justify-center items-center flex-col mt-32">
              <div className="flex text-2xl text-white w-[600px] mt-10 leading-10 text-center items-center justify-center">
              There is a calendar for convenience in event planning.
              </div>
            </div>
            <div className="flex w-1/2 justify-center items-center z-10">
              <div className="flex flex-col max-w-[800px] bg-glass rounded-xl shadow-lg mt-20">
                <img className=" mx-auto rounded-xl w-[800px] -translate-x-5 translate-y-5 shadow-xl" src={img14} alt="" />
              </div>
            </div>
          </section>
          </Element>


















        </div>
        <footer className="footer">
          <div className="flex relative">
            <img className="footer-bg z-0" src={footer} alt="" />
            <div className="flex w-full justify-around z-10 absolute bottom-0 h-[300px]">
              <div className="flex flex-col ml-10 justify-center mb-10">
                <img 
                onClick={()=>navigate('/')}
                className="w-60 h-20 cursor-pointer object-contain" src={logo} alt="" />
                <div className="flex text-col1 text-xl pl-3">Manage your task with Agenda.</div>
                <div className="flex text-col1 text mt-5 pl-3">Connect with Agenda</div>
                <div className="flex w-full items-center pl-3 gap-5 mt-2">
                    <Icon icon="logos:facebook" width="30" height="30" 
                    className=' cursor-pointer '/>
                    <Icon icon="logos:youtube-icon" width="35" height="35" 
                    className=' cursor-pointer '/>
                </div> 
                
              </div>
              <div className="flex">
              </div>
              <div className="flex">
                <div className="flex flex-col text-gray-400 mr-20 items-start justify-center gap-3  mb-10">
                  <div className="flex text-xl cursor-pointer hover:text-col1">Learn More</div>
                  <div className="flex text-sm cursor-pointer hover:text-col1">About</div>
                  <div className="flex text-sm cursor-pointer hover:text-col1">FAQ</div>
                  <div className="flex text-sm cursor-pointer hover:text-col1">Teams</div>
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={handleScrollTop} 
            className="group flex items-center justify-center absolute w-14 shadow translate-y-14 h-14 bg-white rounded-full p-0 top-0 cursor-pointer hover:bg-col1 right-40 duration-300">
            <Icon icon="mingcute:up-line" width="40" height="40" 
              className='text-black group-hover:text-white'/>
          </button>
        </footer>
      </div>
    </>
  );
}

export default Landing;
