const express = require("express");
const {connectDB} = require("./config/database");
const app = express();
const {User} = require("./models/userSchema");

//let's create a signup api , which is saving some kind of data into the database
app.post("/signup",async (req,res)=>{
    try{
        const data={
            firstName : "Ajay",
            lastName : "Chaudhary",
            emailID : "ajy@gmail.com",
            password : "ajay@123"
        };
        const user = new User(data);
        await user.save(); //this is a db operation which returns promise , how to handle them using async and await
        res.status(200).send("Data saved successfully!!!!");
    }catch(err){
        res.status(400).send("Something went wrong!!!! "+err.message);
    }
});

connectDB().then(()=>{
    console.log("Connected to Database Successfully!!!!!!");
    app.listen(3000,()=>{
    console.log("Server is listening on port 3000!!!");
    });
})
.catch((err)=>{
    console.error("Some Error Ocurred!!!! " + err);
})

