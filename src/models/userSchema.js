const mongoose = require("mongoose");
const validator = require("validator");// to some extra check , using a library
//till now we were just putting anything in our database but we can't put everything in our database and we cann't trust the user , he can send anything
//that is why we will put schema level validations
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required:true,//makes it a required field
        minLength : 4, // minimum length of firstname should be 4 and max should be 20
        maxLength:20,
    },
    lastName:{
        type : String,
        minLength:4,
        maxLength:20
    },
    emailID : {
        type : String,
        unique:true,//makes it a unique parameter means you can not register twice , duplicate emails are not allowed
        lowercase:true,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please! enter a valid Email ID!!");
            }
        }
    },
    password :{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please!! Enter a Strong password!!!!!!!")
            }
        }

    },
    age :{
        type:Number,
        min:18
    },
    gender :{
        type : String,
        //we can add custom validate functions as gender can be male , female and others
        validate(value){
            const arr = ["male","female","others"];
            if(!arr.includes(value)){
                throw new Error("Gender is not valid!!!!!!");
            }
        }//but it will run only when you would insert the new document if you want it to run on updation, make runValidators:true in options object in update API
    },
    skills:{
        type : [String],
        validate(arr){
            if(arr.length > 10){
                throw new Error("Too many skills!!!!!");
            }
        }
    },
    photoURL :{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY89DdxakHMYOYW6EfZVKzBa1ZZWn-Umm1icw_1MhSjA&s=10",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Please provide a valid url!!!!!");
            }
        }
    },
    about:{
        type:String,
        default:"I am a Software Engineer!!!",

    }
},{
    timestamps:true,// this will add when you inserted new document and when you last updated the document
});

//Schema is like a blueprint of a class , it not a actual class, now model is like a class and whenever we save or fetch , we require this class
const User = mongoose.model("User",userSchema);
module.exports = {User};