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

app.get("/feed",async (req,res)=>{
    //now i want all user in one go
    try{
        const users = await User.find({});//just pass empty filter it will fetch all the data in one time
        if(users.length === 0){
            throw new Error("Nothing exists in the database!!!!!!!");
        }else{
            res.status(200).send(users);
        }
    }catch(err){
        res.status(400).send(err);
    }
})
app.get("/findUser",async (req,res)=>{
    //now i want to find one user 
    // const userEmail = req.body.emailID;
    try{
        // there are many ways to find the user document
        //method 1:
        // const users = await User.find({emailID : userEmail}); // it will return an array of users that match the email id
        // if(users.length === 0){
        //     res.status(404).send("Nothing found!!!!!!");
        // }else{
        //     res.status(200).send(users);
        // }

        //method 2 :  findOne(), it gives you the single document

        // const user = await User.findOne({emailID : userEmail}); //it returns only one document 
        // if(!user){
        //     res.status(404).send("Nothing found in database!!!!!!!!");
        // }else{
        //     res.status(200).send(user);
        // }

        //method 3 :  if we have id then we can fetch the document using id
        const id = req.body.id;
        const user = await User.findById({_id : id})
        if(!user){
            throw new Error("User not found!!!!!");
        }else{
            res.status(200).send(user);
        }

    }catch(err){
        res.status(400).send(err);
    }
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

