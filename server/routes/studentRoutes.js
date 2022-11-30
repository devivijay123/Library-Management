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

router.patch("/login/:id",additionalinfo)

module.exports = router;
