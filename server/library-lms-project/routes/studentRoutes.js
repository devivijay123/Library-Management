const express = require("express")
const router = express.Router();

const{updateimage} = require("../controllers/imageControllers")


    router.patch("/upload/:id",updateimage)
const {loginStudent, registrationStudent,getSingleStudent,additionalinfo} = require("../controllers/studentControllers")

//login student
 router.post("/login",loginStudent)

//Registration student
router.post("/Registration",registrationStudent);
// get single student
router.get("/login/:id",getSingleStudent)
// //get students
// router.get("/",getstudents);
// //get single student
// router.get("/:id",getstudent);
// //updatestudent
// router.patch("/:id",editstudent);
//additional info
router.patch("/login/:id",additionalinfo)

module.exports = router;
