import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import "./ReturnSection.css";
import { useAuthContext } from "../../Hooks/useAuthContext";

const ReturnSection = () => {
  const { student } = useAuthContext();
  //State for getting data
  const [book, setBook] = useState(null);
  //get request function
  const getBook = async () => {
    const _isReturn = true;
    const response = await axios.get(`https://library-lms-project.herokuapp.com/api/book/${_isReturn}`, {
      headers: {
        Authorization: `Bearer ${student.token}`,
      },
    });

    const data = response.data;
    setBook(data);
  };
  useEffect(() => {
    if (student) {
      getBook();
    }
  }, [student, getBook]);
  return (
    <div>
      <Navbar />
      <div className="history">
        <h3>Book Name</h3>
        <h3>Author Name</h3>
        <h3>Received Date</h3>
        <h3>Returned Date</h3>
    
      </div>
      <div className="bookdetail">
        {book &&
          book.map((item) => {
            return (
              <div key={item.id} className="bookrecord">
                <div className="bookrec">
                  <p>{item.bookname}</p>
                  <p>{item.author}</p>
                  <p>{item.date.slice(0,10)}</p>
                  <p>{item.updatedAt.slice(0,10)}</p>
                  
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ReturnSection;