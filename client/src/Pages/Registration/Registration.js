import React, { useContext } from 'react'
import "./RegistrationStyle.css"
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useRegistration } from '../../Hooks/useRegistration';
import logo from "../../assets/logo.png";
import character from "../../assets/Character.png";
import bubble from "../../assets/bubble.png";
import plant from "../../assets/Plant.png";
import phone from "../../assets/phone.png";
import user from "../../assets/user.png";
import envolope from "../../assets/envolope.png";
import password from "../../assets/password.png";
// import {RegisterContext} from '../../Context/RegisterContext';

const Registration = () => {
  // const {form,setForm} =useContext(RegisterContext)
  const[form,setForm] = useState({
    fullname: "",
    email: "",
    password:"",
    student_ID: "",
    contact_number:"",
    department: "",
    year: "",
    admission:"",
    gender:"",
    bgroup:"",
    emergencyno:"",
    address:"",

  });

  const {registration,error} = useRegistration();
  const updateFormField = (e)=>{
    const {name,value} = e.target;
    setForm({
      ...form,
      [name] : value,
    })
  }

   const handleSubmit = async(e) =>{
    e.preventDefault();
    await registration(form.fullname,form.email,form.password,form.student_ID,form.contact_number,form.department,form.year);
    
   setForm({
    fullname: "",
    email: "",
    password:"",
    student_ID: "",
    contact_number:"",
    department: "",
    year: "",

   }) ;
  }
  return (
    <div className='reg'>
       <div className='regmain'>
         <img src={logo} alt="logo"/>
          <h1>LIBRARY MANAGEMENT SOFTWARE</h1>
         </div>
  <div className='regcenter'>
      <div className='regleft'>
        <button className='btn1'><Link to="/registration">STUDENT REGISTRATION</Link></button>
            <button className='btn2'><Link to="/login">STUDENT LOGIN</Link></button></div>
      
      <div className='regright'>
      <div className='main-form'>
        <h6>STUDENT REGISTRATION</h6>
        <form onSubmit={handleSubmit}>
          <input type="text" name="fullname" value={form.fullname} placeholder='Full Name' onChange={updateFormField}/><br/>
          <input type="email" name="email" value={form.email} placeholder='Email' onChange={updateFormField}/><br/>
          <input type="password" name="password" value={form.password} placeholder='Password' onChange={updateFormField}/><br/>
          <input type="number" name="student_ID" value={form.student_ID} placeholder='Student ID' onChange={updateFormField}/><br/>
          <input type="tel" name="contact_number" value={form.contact_number} placeholder='Contact Number' onChange={updateFormField}/><br/>
          <input type="text" name="department" value={form.department} placeholder='Department' onChange={updateFormField}/><br/>
          <input type="date" name="year" value={form.year} placeholder='Year' onChange={updateFormField}/><br/>
           <p>Already a Student?<Link to="/login">  Log in</Link></p>
           <button>Register</button>
           {error && <p>email already exists</p>}
        </form>
      </div>
      <img className='character' src={character} alt="character"/>
      <img  className="bubble" src={bubble} alt="bubble"/>
      <img className='plant' src={plant} alt="plant"/>
      <img className='password' src={password} alt="password"/>
      <img className='envolope' src={envolope} alt="envolope"/>
      <img className='phone' src={phone} alt="phone"/>
      <img className='user' src={user} alt="user"/>
      </div>
      </div>
    </div>
  )
};

export default Registration;