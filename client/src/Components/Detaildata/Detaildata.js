import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Detaildata.css";

const Detaildata = () => {
  const fetchStudent = JSON.parse(localStorage.getItem("student"));
  const student_id = fetchStudent.student._id;
  // console.log(student_id)

  const [readInput, setReadInput] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [students, setStudents] = useState("");
  //Get Request function

  const getDetails = async () => {
    await axios
      .get(`https://library-lms-project.herokuapp.com/api/student/login/${student_id}`)
      .then((res) => {
        setStudents(res.data);
      
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getDetails();
  }, []);

  //updated additional details
  const [newDetail, setnewDetail] = useState({
    _id: null,
    admission:"",
    gender:"",
    bgroup:"",
    emergencyno:"",
    address:"",
  });
  const formField = (e) => {
    const { name, value } = e.target;
    setnewDetail({
      ...newDetail,
      [name]: value,
    });
    setStudents(e.target.value);
  };
  const handleformSubmit = () => {
    setTimeout(() => {
      setReadInput(true);
      setIsDisabled(true);
    }, 200);
    alert("Data is saved")
  };
  const handleformUpdate = () => {
    if (readInput === true) {
      setReadInput(false);
    }
    setIsDisabled(false);
    alert("Data is editable");
  };
  const formSubmit = async (e) => {
   
    e.preventDefault();
    await axios
      .patch(
        `https://library-lms-project.herokuapp.com/api/student/login/${student_id}`,
        newDetail
      )
      .then((res) => {
        console.log(res.data.message);
        console.log(newDetail);
      });
    getDetails();
    
  };

  return (
    <div>
      <form className="admission" onSubmit={formSubmit}>
        <input
          type="text"
          name="admission"
          value={students.admission || newDetail.admission}
          placeholder=
          "Admission"
          onChange={formField}
          readOnly={readInput}
        />
        <br />
        <input
          type="text"
          name="gender"
          value={students.gender || newDetail.gender}
          placeholder="Gender"
          onChange={formField}
          readOnly={readInput}
          
        />
        <br />
        <input
          type="text"
          name="bgroup"
          value={students.bgroup || newDetail.bgroup}
          placeholder="Blood Group"
          onChange={formField}
          readOnly={readInput}
        />
        <br />
        <input
          type="tel"
          name="emergencyno"
          value={students.emergencyno || newDetail.emergencyno}
          placeholder="Emergency Contact No"
          onChange={formField}
          readOnly={readInput}
        />
        <br />
        <input
          className="address"
          type="text"
          name="address"
          value={students.address || newDetail.address}
          placeholder="Address"
          onChange={formField}
          readOnly={readInput}
        />
        <br />
        <div className="admission-button">
          <button type="" onClick={handleformUpdate}>
            EDIT
          </button>
          <button
            type="submit"
            disabled={isDisabled}
            onClick={handleformSubmit}
          >
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
};

export default Detaildata;
