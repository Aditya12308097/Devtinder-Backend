const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String
    },
    lastName:{
        type : String
    },
    emailID : {
        type : String
    },
    password :{
        type:String
    },
    age :{
        type:Number
    },
    gender :{
        type : String
    }
});

//Schema is like a blueprint of a class , it not a actual class, now model is like a class and whenever we save or fetch , we require this class
const User = mongoose.model("User",userSchema);
module.exports = {User};