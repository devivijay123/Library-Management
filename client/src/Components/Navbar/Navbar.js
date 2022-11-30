import React from 'react';
import {Link} from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import {useLogout} from "../../Hooks/useLogout"
// import { useAuthContext } from '../../Hooks/useAuthContext';
const Navbar = () => {
  // const { student} = useAuthContext();
  const { logout} = useLogout();

  const handleClick = ()=>{
    logout();
  }
  return (
    <nav>
        <div className='navmain'>
<Link to="/home"><img src={logo} alt="logo"/></Link>
            <div className='navright'>
            <Link to="/home">Home</Link> 
            <Link to="/booksection">Books Section</Link>
            <Link to="/returnsection">Return Section</Link>
        
            <button onClick={handleClick}>Signout</button>
          
            </div>
        </div>
    </nav>
  )
}

export default Navbar