const   mongoose  = require("mongoose");
const Student = require("../models/studentModel");

const createToken = require("../utils/token");

//Login student
const loginStudent = async (req, res) => {
  const {  email, password } = req.body;
  try {
    const student = await Student.login(email, password);
    //create token
    const token = createToken(student._id);
    res.status(200).json({ student :student, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Registration student

const registrationStudent = async (req, res) => {
  const {
  
    fullname,
    email,
    password,
    student_ID,
    contact_number,
    department,
    year,
    
  } = req.body;
  try {
    const student = await Student.registration(
      fullname,
      email,
      password,
      student_ID,
      contact_number,
      department,
      year,
    );
    //create token
    const token = createToken(student._id);
    res
      .status(200)
      .json({
        // email,
        // fullname,
        // password,
        // student_ID,
        // contact_number,
        // department,
        // year,
        student : student,
        token,
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// get single student
const getSingleStudent = async(req,res)=>{
  const { id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error:"No such student found."});
  }
  const singleStudent = await Student.findById(id);
  if(!singleStudent){
    return res.status(400).json({error: "student not available"});
  }
  res.status(200).json(singleStudent)
}
//get all student
const getstudents = async(req,res)=>{
  try{
    const studentsdata = await Student.find()
    res.status(200).json(studentsdata)

  }catch(err){
    res.status(400).json({error:err.message})
  } 
}
//get single student
const getstudent = async(req,res)=>{
  try{
    const id = req.params.id;
    const studentsdata = await Student.findById({ _id: id });
     res.status(200).json(studentsdata);
  }catch(err){
    res.status(400).json({error:err.message})
  }
}


//update student 
const editstudent = async (req,res)=>{
  try{
    const id = req.params.id;
    const studentsadata = await Student.findByIdAndUpdate({_id:id},res.body,{new:true});
    res.status(200).json(studentsadata)
  }catch(err){
    res.status(400).json({error : err.message})
  }
};
//additional details
const additionalinfo = async(req,res)=>{
  const { id } = req.params;
  const { admission, gender, bgroup, emergencyno, address}= req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({ error: "No additional information." });
  }
  const updateInfo = await Student.findOneAndUpdate(
    { _id: id },
    { admission, gender, bgroup, emergencyno, address},
    { new: true }
  );
  if(!updateInfo){
    return res.status(400).json({ error: "No previous info available."});
  }
  res.status(200).json(updateInfo);
}

module.exports = {
  loginStudent,
  registrationStudent,
  getstudents,
  getstudent,
  editstudent,
  additionalinfo,getSingleStudent
};
