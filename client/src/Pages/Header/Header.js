import React from 'react';
import logo from "../../assets/logo.png";
import {Link} from "react-router-dom";
import "./HeaderStyle.css";
import library from "../../assets/library.png"
const Header = () => {
  return (
    <div className='header'>
         <div className='headermain'>
         <img src={logo} alt="logo"/>
          <h1>LIBRARY MANAGEMENT SOFTWARE</h1>
         </div>
        <div className='headercenter'>
          <div className='headerleft'>
        <button><Link to="/registration">STUDENT REGISTRATION</Link></button><br/>
          <button>  <Link to="/login">STUDENT LOGIN</Link></button>
          </div>  
          <div className='library'>
          <img  src={library} alt="library"/>
          </div>
        </div>
    </div>
  )
}

export default Header