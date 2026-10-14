const express = require("express");
const app = express();

// app.use("/user",(req,res,next)=>{
//     //this is route handler 
//     res.send("this is response!!!!");
//     next();
// },(req,res)=>{
//     res.send("this is second route!!!");
// });

app.use("/user",[(req,res,next)=>{
    console.log("Handling the request1!!!!!!");
    next();
},(req,res,next)=>{
    console.log("Handling the request2!!!!!!");
    next();
},(req,res,next)=>{
    console.log("Handling the request3!!!!!!");
    next();
},(req,res,next)=>{
    console.log("Handling the request4!!!!!!");
    res.send("Hello Chaudhary Saab.");
}]);

app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
});