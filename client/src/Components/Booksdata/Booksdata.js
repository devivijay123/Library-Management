
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../Hooks/useAuthContext";
import "./Booksdata.css"

const Booksdata = () =>  {
    const {student} = useAuthContext()
     //State for getting data
     const [book, setBook] = useState(null);
      //get request function
  const getBook = async ()=>{
    
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
      
      
    }, [student,getBook]);

       //Delete request
  const deleteBook = async (_id)=>{
    await axios.delete(`https://library-lms-project.herokuapp.com/api/book/${_id}`,{
      headers:{
        "Authorization": `Bearer ${student.token}`
      }
    });
    getBook();
   }
    return (
  
    <div>
        
        <div className="book-details">
  <h2>Books in your Account</h2>
  <div className="book">
{book &&
        book.map((item) => {
          return (
            <div key={item.id} className="book-record">
             
             <div className="book-rec">
           <div>  <p>{item.bookname}</p>
              <p>{item.date.slice(0,10)}</p>
              <p>{item.author}</p></div>
              <button onClick={()=>deleteBook(item._id)}>return</button>
             </div>
            </div>
          );
        })}
        </div>
</div>
    </div>
  )
}

export default Booksdata