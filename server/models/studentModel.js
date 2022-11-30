 const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

 const studentSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
     
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    student_ID: {
      type: Number,
      required: true,
    },
    contact_number: {
      type: Number,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    year: {
      type: Date,
      required: true,
    },
    admission: {
      type: String,
      default:"",
    },
    gender: {
      type: String,
      default:"",
    },
    bgroup: {
      type: String,
      default:"",
    },
    emergencyno:{
     type: Number,
     default:"",
    },
    address:{
     type: String,
     default:"",
    },
    profile : {
     type:String
  },
  student_id:{
    type: String
  }
  },
  { timestamp: true }
);

//Static registration function
studentSchema.statics.registration = async (
  fullname,
  email,
  password,
  student_ID,
  contact_number,
  department,
  year,
  
) => {
  const exists = await Student.findOne({ email });
  if (exists) {
    throw Error("Email already exists!");
  }
  const salt = await bcrypt.genSalt(10);
  const passwordtostr = password.toString();
  const hash = await bcrypt.hash(passwordtostr, parseInt(salt));

  const student = await Student.create({
    fullname,
    email,
    student_ID,
    contact_number,
    department,
    year,

    password :hash
  });
  return student;
};

//Static login functiion

studentSchema.statics.login = async (email, password) => {
  const student = await Student.findOne({ email });
  if (!student) {
    throw Error("Incorrect Email!");
  }
  const match = await bcrypt.compare(password, student.password);
  if (!match) {
    throw Error("Incorrect Password");
  }
  return student;
};

const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;
