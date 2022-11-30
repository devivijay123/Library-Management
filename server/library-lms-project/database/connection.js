const mongoose = require ("mongoose")

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
 .then(()=>{
console.log("Connection is Established");
 })
 .catch((err)=>{
    console.log(`Error is : ${err}` )
 })