import "./Login.css";
import { useState } from "react";
import vectorlogin from "../public/images/vector-login.png";
import vectorsignup from "../public/images/vector-signup.png";
import bgproplogin from "../public/images/bgproplogin.png";
import logingrp from "../public/images/logingrp.png";
import bgpropsignup from "../public/images/bgpropsignup.png";
import signupgrp from "../public/images/signupgrp.png";
import FormLogin from "../components/FormLogin.jsx";
import FromSignup from "../components/FromSignup.jsx";

function Login() {
  const [stagePage, setstagePage] = useState("login");
  const [bgpage, setbgpage] = useState("login");
  const [vectorLogin, setvectorLogin] = useState("vector-login");
  const [bgpropContainer, setbgpropContainer] = useState("bgprop-container");

  const [bgBack, setbgBack] = useState("bg-back");
  const [bgMid, setbgMid] = useState("bg-mid");
  const [bgFront, setbgFront] = useState("bg-front");

  const change = () => {
    if (stagePage === "login") {
      setbgpage("login animation-change-bg-color");
      setvectorLogin("vector-login animation-vector-login");
      setbgpropContainer("bgprop-container animation-text-login");

      setbgBack("bg-back animation-bg-back");
      setbgMid("bg-mid animation-bg-mid");
      setbgFront("bg-front animation-bg-front");

      setTimeout(() => {
        setstagePage("signup");
      }, 1000);
    } else {
      setbgpage("login animation-change-bg-color-reverse");
      setvectorLogin("vector-login animation-vector-login-reverse");
      setbgpropContainer("bgprop-container animation-text-login-reverse");

      setbgBack("bg-back animation-bg-back-reverse");
      setbgMid("bg-mid animation-bg-mid-reverse");
      setbgFront("bg-front animation-bg-front-reverse");

      setTimeout(() => {
        setstagePage("login");
      }, 1000);
    }
  };

  return (
    <div className={bgpage}>
      <div className="box-vector-login">
        <Vector vectorLogin={vectorLogin} stagePage={stagePage} />
      </div>
      <div className="containerlogin">
        <div className={bgBack}>
          <div className={bgMid}></div>
          <form className={bgFront}>
            <Formlog change={change} stagePage={stagePage} />
          </form>
        </div>

        <BgpropContain
          bgpropContainer={bgpropContainer}
          stagePage={stagePage}
        />
      </div>
    </div>
  );
}

const Formlog = (props) => {
  const { change, stagePage } = props;

  if (stagePage === "login") {
    return (
      <>
        <FormLogin change={change} />
      </>
    );
  } else {
    return (
      <>
        <FromSignup change={change} />
      </>
    );
  }
};

const BgpropContain = (props) => {
  const { bgpropContainer, stagePage } = props;
  if (stagePage === "login") {
    return (
      <div className={bgpropContainer}>
        <div className="text-login">Login</div>
        <img className="bgproplogin" src={bgproplogin} alt="" />
        <img className="logingrp" src={logingrp} alt="" />
      </div>
    );
  } else {
    return (
      <div className={bgpropContainer}>
        <div className="text-signup">Sign Up</div>
        <img className="bgproplogin" src={bgpropsignup} alt="" />
        <img className="logingrp" src={signupgrp} alt="" />
      </div>
    );
  }
};

const Vector = (props) => {
  const { vectorLogin, stagePage } = props;
  if (stagePage === "login") {
    return <img className={vectorLogin} src={vectorlogin} alt="" />;
  } else {
    return <img className={vectorLogin} src={vectorsignup} alt="" />;
  }
};

export default Login;
