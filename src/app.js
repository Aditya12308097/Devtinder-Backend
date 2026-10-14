const express = require("express");
const app = express();

//error handling , so handle errors always write the code in try catch block

app.get("/userData",(req,res)=>{
    try{
        const a =20;
        const b = 0;
        if(b == 0){
            throw new Error("0 can not be dividend!!!!!!!!!");
            
        }
        res.send(`Division of ${a} with ${b} would be ${a/b}`);
    }catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }finally{
        console.log("This is finally block!!!");//this will always run whether you get an error or not!
    }
});

//what if you do not use try catch block, simple write wildcard error handler , it will handle all errors if they come, it will
//handle only in case if you are not using try catch block 
app.use("/",(err,req,res,next)=>{
    if(err){
        console.log(err);
        res.status(500).send("Something went wrong!!!!");
    }
})



app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
});