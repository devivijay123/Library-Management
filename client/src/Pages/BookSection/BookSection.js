import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookSection.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useAuthContext } from "../../Hooks/useAuthContext";

const BookSection = () => {
  const {student} = useAuthContext()
  let gettinguser= JSON.parse(localStorage.getItem("student"));
  let studentinfo=gettinguser.student;
  //State for getting data
  const [book, setBook] = useState(null);

  //get request function
  const getBook = async () => {
    const _isReturn=false;
    const response = await axios.get(`https://library-lms-project.herokuapp.com/api/book/${_isReturn}`,{
      headers:{
        "Authorization": `Bearer ${student.token}`
      }
    });

    const data = response.data;
    setBook(data);
  };
  useEffect(() => {
    if(student){
      getBook();
      
    }
    
  },[student,getBook]);

  //Post Request
  const[bookform, setBookform] = useState({
    bookname:"",
    date:"",
    author:"",
    isReturn:false,
    returnDate:""
  })

  const updateField = (e)=>{
   const{name, value}=e.target;
   setBookform({
    ...bookform,[name]: value,
   })
   getBook();
  };

 

  const createBook = async (e)=>{
    e.preventDefault();
    const response = await axios.post("https://library-lms-project.herokuapp.com/api/book",bookform,{
      headers:{
        "Authorization": `Bearer ${student.token}`
      }
    });
    setBook([...book,response.data])
    setBookform({
        bookname:"",
        date:"",
        author:"",
        isReturn:false,
        returnDate:"",
    })
  };
//Delete request
 const retunBook = async (_id)=>{
  await axios.delete(`https://library-lms-project.herokuapp.com/api/book/${_id}`,{
    headers:{
      "Authorization": `Bearer ${student.token}`
    }
  });
  getBook();
 }
  return (
    
    <div>
      <Navbar/>
      <div className="studentname"><pre>StudentName:{studentinfo.fullname}</pre></div>
      <div className="book-section">
        <div className="book-sectionleft">
        <form onSubmit={createBook} className="book-form">
          <h6>Enter Book Details</h6>
          <input type="text" name="bookname" value={bookform.bookname} placeholder="Enter Book Name" onChange={updateField}/><br/>
          <input type="date" name="date" value={bookform.date.slice(0,10)} placeholder="date" onChange={updateField}/><br/>
          <input type="text" name="author" value={bookform.author} placeholder="Author Name" onChange={updateField}/><br/>
          <button>Add</button>
        </form>
        </div>
      <div className="book-detail">
      {book &&
        book.map((item) => {
          return (
            <div key={item.id} className="book-record">
             <div className="book-rec">
           <div>  <p>{item.bookname}</p>
              <p>{item.date.slice(0,10)}</p>
              <p>{item.author}</p></div>
              <button onClick={()=>retunBook(item._id)}>return</button>
             </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
};

export default BookSection;
