import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { axiosinstant } from "../lib/axiosinstant";
import { Icon } from '@iconify/react';


function FormLogin(props) {
  
  const { change } = props;
  const navigate = useNavigate();
  const [typePasswordlog, setTypePasswordlog] = useState('password');

  const submitData = async () => {
    try {
      const response = await axiosinstant.post(
        "/api/login/",{
          withCredentials: true,
          email,
          password,
        }
        
      );
      if (response.data.success) {
        console.log(response.data.success);
        navigate('/allwork');
      } else {
        console.log(response.data.success);
        setStatusEmailPass("Invalid Email or Password");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusEmailPass, setStatusEmailPass] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior



    submitData();

    // Optionally, clear form fields after submission

    setPassword("");
    setStatusEmailPass("");
  };
  return (
    <>
      <form className="login-form">
        <div className="text-inlogin">Login</div>
        <label htmlFor="email" className="text-email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="input-email"
          value={email}
          onChange={handleChange}
        />
        <label htmlFor="password" className="text-passlogin">
          Password
        </label>
        
        <div className="bg-input-login">
          <input
            type={typePasswordlog}
            id="password"
            name="password"
            className="input-passlogin"
            value={password}
            onChange={handleChange}
          />
          {typePasswordlog === "password" 
            ? <Icon 
                onClick={() => setTypePasswordlog("text")}
                icon="majesticons:eye-line" width="25" height="25" 
                className="eye-close"/>
            :<Icon 
                onClick={() => setTypePasswordlog("password")}
                icon="iconamoon:eye-off" width="25" height="25" 
                className="eye-open"/>}
        </div>

        <div className="invalidlogin">{statusEmailPass}</div>
        <div className="bg-button-login">
          <div className="button-goto-signup">
            No account? &nbsp;<a onClick={change}>Sign Up!</a>
          </div>
          <button className="button-login" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </form>
    </>
  );
}

export default FormLogin;