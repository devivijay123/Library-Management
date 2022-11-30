const Book = require("../models/bookModel");

//Get All Book Data

const getBooks = async (req, res) => {
  const studentid = req.student._id;
  const isvalue = req.params.isReturn;
  try {
   

    const bookData = await Book.find({
      student_id: studentid,
      isReturn: isvalue,
    });

    res.status(200).json(bookData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getRetunedBooks = async (req, res) => {
  try {
    const isvalue = req.params.isReturn;
    const studentId = req.params.studentId;
    const bookData = await Book.find(
      { isReturn: isvalue },
      { student_id: studentId }
    ).sort({ createdAt: -1 });
    res.status(200).json(bookData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//Get a single Book Data
const getBook = async (req, res) => {
  try {
    const id = req.params.id;
    const bookData = await Book.findById({ _id: id });
    res.status(200).json(bookData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//Create Book Data
const createBook = async (req, res) => {
  const { bookname, date, author } = req.body;
  const student_id = req.student._id;
  const isReturn = false;
  const returnDate = "";
  try {
    const newBook = new Book({
      bookname,
      date,
      author,
      student_id,
      isReturn,
      returnDate,
    });
    const book = await newBook.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//Update Book Data
const editBook = async (req, res) => {
  try {
    const id = req.params.id;
    const bookData = await Book.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(bookData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Delete Book Data
const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const bookReturn = true;
    // new Date object
    //const datereturn= new Date(null).getUTCDate();

    const bookData = await Book.findByIdAndUpdate(
      { _id: id },
      { isReturn: bookReturn }
    );
    //bookData = await Book.findByIdAndUpdate({_id:id},{returnDate:datereturn})

    res.status(200).json(bookData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  editBook,
  deleteBook,
  getRetunedBooks,
};
