import React, { useState } from "react";
import axiosPath from "../lib/axiosPath";
import axios from "axios";
  // axios.defaults.withCredentials = true;
function FromSignup(props) {

  const { change } = props;
  const submitData = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/signup",{ 
          withCredentials: true,
          email,
          password,
        });
        console.log(response)
      if (response.data.success) {
        alert("Sign Up Success");
        change();
      } else {
        alert("Email already exists.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === repassword || password.length > 6) {
      submitData();
    } else {
      console.log("Password not match.");
    }
  };

  return (
    <>
      {/* ไม่ใช้ onSubmit ใช้แล้วหน้า login */}
      <form className="login-form">
        <div className="text-insignup">Sign Up</div>
        <label htmlFor="email" className="text-email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="input-emailsignup"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="text-passlogin">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="input-passsignup"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password" className="text-passlogin">
          Confirm-Password
        </label>
        <input
          type="password"
          id="repassword"
          name="repassword"
          className="input-repasssignup"
          value={repassword}
          onChange={(e) => setRepassword(e.target.value)}
        />
        {password !== repassword ? (
          <div className="invalidlogin">Password not match.</div>
        ) : (
          <div className="invalidlogin"></div>
        )}
        {password.length < 6 ? (
          <div className="invalidlogin">Password more than 6 characters.</div>
        ) : (
          <div className="invalidlogin"></div>
        )}
        <div className="bg-button-loginsi">
          <div className="button-goto-signup">
            Have account? &nbsp;<a onClick={change}>Login!</a>
          </div>
          <button className="button-signin" onClick={handleSubmit}>
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}

export default FromSignup;
