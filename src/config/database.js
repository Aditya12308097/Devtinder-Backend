const mongoose = require("mongoose");
const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://adityateotia59_db_user:AjayJaat123@namastenode.iaci2vl.mongodb.net/DevTinder");
}

module.exports = { connectDB };