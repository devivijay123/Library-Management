import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);

    const response = await fetch("https://library-lms-project.herokuapp.com/api/student/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

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
  return { login, error };
};
