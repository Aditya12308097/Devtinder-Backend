const express = require("express");
const app = express();

// app.use(function(req,res){
//     res.send("Hello from the Server");
// });
// other way to define a request handler
app.use("/hello",(req,res)=>{
    res.send("Hello Chaudhary Saab");
});
app.use("/test",(req,res)=>{
    res.send(`Hello from the Server!!!!!!`);
});
app.use("/",(req,res)=>{
    res.send("Hello From the dashboard!!!!!!!!!");
});
app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
});