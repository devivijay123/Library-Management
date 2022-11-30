import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar";
import Booksdata from "../../Components/Booksdata/Booksdata";
import Detaildata from "../../Components/Detaildata/Detaildata";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../Hooks/useAuthContext";
// import { useState } from "react";

const Home = () => {
  const {student} = useAuthContext();

  // const[error, setError] = useState(null)
  let gettinguser= JSON.parse(localStorage.getItem("student"));
  let studentinfo=gettinguser.student;
  let userid=gettinguser.student._id;

 
    // getting data from database and updating to localstporage

    const [profilepic,setprofilepic]=useState("")
    const getuserdata = async () => {
      const response = await axios.get(
        // `http://localhost:4000/api/student/login/${userid}`
        `https://library-lms-project.herokuapp.com/api/student/login/${userid}`
      );
      const userdetail = response.data;

      setprofilepic(userdetail.profile)
    };
  
    useEffect(() => {
      getuserdata();
    }, []);

    


  // image uploading
  // saving file in state
  const [image,setimage]=useState("")

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setimage(
      {  profile:reader.result})
    };
  };

const getimage=(e)=>{
  let selectedfile=e.target.files[0]
    // setimage(selectedfile);
    previewFile(selectedfile)
    
}
console.log(image.profile)


const handlesubmit = async (e) => {
  e.preventDefault();
  await axios.patch(
    // `http://localhost:4000/api/student/upload/${userid}`,image
    `https://library-lms-project.herokuapp.com/api/student/upload/${userid}`,image
  )
  .then(
    ()=>getuserdata()
  )
};

  return (
    <div>
      <Navbar />
      <div className="home">
        <div className="info">
  <img className="profilepic" src={profilepic} alt=""></img>
  <form  className="img-input" onSubmit={handlesubmit}>
    <input type="file"  onChange={getimage}></input>
    <input type="submit"></input>
  </form>

         
          <div>
            <div className="studentinfo">
              <h6> STUDENT DETAILS</h6>

              <pre>StudentName:{studentinfo.fullname}</pre>
              <pre>Email      :{studentinfo.email}</pre>
              {/* <p>Password:<span>{studentinfo.password}</span></p> */}
              <pre>Student ID :{studentinfo.student_ID}</pre>
              <pre>Contact No :{studentinfo.contact_number}</pre>
              <pre>Department :{studentinfo.department}</pre>
              <pre>Year       :{studentinfo.year.slice(0,10)}</pre>
            </div>
          </div>
        </div>
        <div>
          <Detaildata />
        </div>

        <Booksdata />
      </div>
    </div>
  );
};

export default Home;
