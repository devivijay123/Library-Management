const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
    profile : {
        data : Buffer,
        contentType : String
    }
})
 const uploadModel = new mongoose.model('profile',imageSchema);

 module.exports = uploadModel
 