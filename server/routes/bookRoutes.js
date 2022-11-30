const express = require("express");
const authStudent = require("../middleware/studentMiddleware")
   

const Book = require("../models/bookModel");

const router = express.Router();

//Require Controllers
const {getBooks,getBook,createBook,editBook,deleteBook} = require("../controllers/bookControllers");

router.use(authStudent)

//Get entire bookrecords
 router.get("/:isReturn",getBooks);

 //Get single bookrecord
 router.get("/:id",getBook);

 //Create bookrecord
 router.post("/",createBook);

 //Update bookrecord
 router.patch("/:id",editBook);


 //Delete bookrecord
 router.delete("/:id",deleteBook);

 module.exports = router;