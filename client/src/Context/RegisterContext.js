import React from 'react';
import { createContext,useState } from 'react';
export  const RegisterContext = createContext()



const RegisterContextProvider = ({children}) => {
    
  const[form,setForm] = useState({
    fullname: "",
    email: "",
    password:"",
    student_ID: "",
    contact_number:"",
    department: "",
    year: "",

  });
  return (
    <>
    <RegisterContext.Provider value={{form,setForm}}>
        {
          children
        }
    </RegisterContext.Provider>
    </>
  )
}

export default RegisterContextProvider;