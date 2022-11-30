import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useRegistration = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const registration = async (
    fullname,
    email,
    password,
    student_ID,
    contact_number,
    department,
    year
  ) => {
    setError(null);

    const response = await fetch(
      "https://library-lms-project.herokuapp.com/api/student/registration",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          fullname,
          email,
          password,
          student_ID,
          contact_number,
          department,
          year
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    }
    if (response.ok) {
      //save student data in local storage
      localStorage.setItem("student", JSON.stringify(data));
      //update student context
      dispatch({ type: "LOGIN", payload: data });
    }
  }; 
  return{registration,error}
};
