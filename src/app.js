const express = require("express");
const {connectDB} = require("./config/database");
const app = express();
const {User} = require("./models/userSchema");
const {validateSignupData} = require("./utils/validateData");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");

app.use(express.json()); //it will convert the json data into js objects so that our server is able to read what is being sent
app.use(cookieparser());

//let's create a signup api , which is saving some kind of data into the database
app.post("/signup",async (req,res)=>{

    //now we want this api dynamic: means data should be sent by external frontend app
   
    
    
    try{

        const {firstName,lastName, emailID,password} = req.body;
        //before saving data into the database , first validate the data , then encrypt the password then save the data into the database
        validateSignupData(req); // it will validate the data , now you have to encyrpt the password!!!

        //to encrypt the password
        const passwordHash = await bcrypt.hash(password,10);

        //now you have hash password , just save the data

        const user = new User({
            firstName,
            lastName,
            emailID,
            password : passwordHash
        });
        await user.save();
        res.status(200).send("Data Saved Successfully!!!!");
    }catch(err){
        res.status(400).send("Something went wrong!!!!!!!  "+err.message);
    }
});

app.post("/login",async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!validator.isEmail(email)){
            throw new Error("Please enter a valid Email ID!!!!!");
        }
        //check whether account exists
        const user = await User.findOne({emailID : email});
        if(!user){
            throw new Error("Register Yourself to proceed further!!!!!!");
        }

        const isValidPassword = await user.validatePassword(password);

        if(!isValidPassword){
            throw new Error("Invalid Email or Password!!!!");
        }

        //we want to introduce cookies here , so that we don't need to verify that you are the valid user or not again and again
        const token = await user.getJWT();
        res.cookie("token",token,{
            expires : new Date(Date.now() + 36000),
            httpOnly : true //it will work on http protocol only
        });
        res.status(200).send("Logged In Successfully!!!!!!!");


    }catch(err){
        res.status(400).send("Login Failed: "+err.message);
    }
});

app.get("/profile", userAuth, async (req,res)=>{
    try{
        const user = req.user;
        res.status(200).send(user);
    }catch(err){
        res.status(400).send("Error: "+err.message);
    }
})

app.post("/sendConnectionRequest", userAuth, async (req,res)=>{
    const user = req.user;

    res.status(200).send(user.firstName + " sent the connection request!!!!!!!!");
})




connectDB().then(()=>{
    console.log("Connected to Database Successfully!!!!!!");
    app.listen(3000,()=>{
    console.log("Server is listening on port 3000!!!");
    });
})
.catch((err)=>{
    console.error("Some Error Ocurred!!!! " + err);
})

