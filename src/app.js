const express = require("express");
const {connectDB} = require("./config/database");
const app = express();
const {User} = require("./models/userSchema");

app.use(express.json()); //it will convert the json data into js objects so that our server is able to read what is being sent


//let's create a signup api , which is saving some kind of data into the database
app.post("/signup",async (req,res)=>{

    //now we want this api dynamic: means data should be sent by external frontend app
    const data = req.body;
    
    try{
        const user = new User(data);
        await user.save();
        res.status(200).send("Data Saved Successfully!!!!");
    }catch(err){
        res.status(400).send("Something went wrong!!!!!!!  "+err.message);
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

