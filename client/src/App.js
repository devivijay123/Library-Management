
import './App.css';
import {BrowserRouter as Router , Routes ,Route,Navigate} from "react-router-dom";
import { useAuthContext } from './Hooks/useAuthContext';

import Header from "./Pages/Header/Header";
import Home from "./Pages/Home/Home";
import Registration from './Pages/Registration/Registration';
import  Login from "./Pages/Login/Login";
import BookSection from "./Pages/BookSection/BookSection";
import ReturnSection from "./Pages/ReturnSection/ReturnSection";



function App() {
  const { student } = useAuthContext() 
  return (
    <div className="App">
     
     <Router>
        
        <Routes>
        <Route path="/" element={<Header/>}/>
          <Route path="/registration" element={!student ? <Registration/> : <Navigate to="/login"/>}/>
          <Route path="/login" element={!student ? <Login/> : <Navigate to="/home"/>}/>
          <Route path="/home" element={student ? <Home/> : <Navigate to="/login"/>}/>
        <Route path="/booksection" element={student ? <BookSection/>:<Navigate to="/login"/>}/>
        <Route path="/returnsection" element={student ? <ReturnSection/>:<Navigate to="/login"/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
