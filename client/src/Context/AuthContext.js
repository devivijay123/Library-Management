import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action)=>{
    switch(action.type){
        case 'LOGIN':
            return{student:  action.payload};
         case "LOGOUT": 
         return {student: null}  
         default:
            return state
    }
}
const AuthContextProvider = ({children})=>{
const [state,dispatch] = useReducer(authReducer,{
    student : null
});
useEffect(()=>{
    const student = JSON.parse(localStorage.getItem("student"));
    if(student){
        dispatch({ type:"LOGIN",payload:student});
    }
},[])
console.log("AuthContext State: ",state);
return(
    <AuthContext.Provider value={{...state, dispatch}}>
        {children}
    </AuthContext.Provider>
)
}

export default AuthContextProvider;