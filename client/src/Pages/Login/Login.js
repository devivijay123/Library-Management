import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../../Hooks/useLogin";
import character from "../../assets/Character.png";
import bubble from "../../assets/bubble.png";
import plant from "../../assets/Plant.png";
import envolope from "../../assets/envolope.png";

import pin from "../../assets/password.png";
import "./LoginStyle.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useLogin();


  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    setEmail("");
    setPassword("");
   
  };

  return (
    <div>
      <div className="logmain">
        <img src={logo} alt="logo" />
        <h1>LIBRARY MANAGEMENT SOFTWARE</h1>
      </div>

      <div className="logcenter">
        <div className="logleft">
          <button className="btn1">
            <Link to="/registration">STUDENT REGISTRATION</Link>
          </button>

          <button className="btn2">
            <Link to="/login">STUDENT LOGIN</Link>
          </button>
        </div>

        <div className="login">
          <div className="main-form">
            <h6>STUDENT LOGIN</h6>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <br />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <br />

              <p>
                New Student ? <Link to="/registration"> Register</Link> 
              </p>
              <div className="login-error">
              <button>Login</button>
             {error && <p>{error}</p>}
              </div>

            </form>
          </div>
          <img className="character" src={character} alt="character" />
          <img className="bubble" src={bubble} alt="bubble" />
          <img className="plant" src={plant} alt="plant" />
         <img className="password"  src={pin} alt="password"/>
           <img className='envolope' src={envolope} alt="envolope"/>
        </div>
      </div>
    </div>
  );
};

export default Login;
