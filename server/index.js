require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

 //Port
 const port= process.env.PORT || 4000
//database connection
require("./database/connection")

//Require  Routes
const studentRoutes = require("./routes/studentRoutes");
const bookRoutes = require("./routes/bookRoutes");

//Middleware
app.use(express.json());
app.use(cors());

// app.get("/",(req,res)=>{
//     res.send("hello")
// })

//Routes
app.use("/api/student",studentRoutes);
app.use("/api/book",bookRoutes)

app.listen(port,()=>{
    console.log(`server running at PORT:${port}`)
})
