const mongoose = require("mongoose");



const bookSchema = mongoose.Schema({
    bookname: {
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    student_id:{
        type: String,
        required: true,
    },
    isReturn:{
    type: Boolean
    },
    returnDate:{
        type: Date
    }
},{timestamps: true});
 const Book = new mongoose.model("Book",bookSchema);
 module.exports = Book;