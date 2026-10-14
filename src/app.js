const express = require("express");
const app = express();

// app.use("/admin",(req,res,next)=>{//this is a middleware which will be run for all /admin routes
//     const token = "xy1z";
//     const isAuthorized = token === "xyz";
//     if(!isAuthorized){
//         res.status(401).send("Unauthorized Access!!!");
//     }else{
//         next();
//     }

// });
//now the above middleware will run for all type of requests startig with /admin route , we could write above code in each and every single api but
// how bad our code would be , and how much data duplicacy would be there, that is why middleware exists

// app.get("/admin/getData",(req,res)=>{
//     res.send("This is the Data!!!");
// });
// app.delete("/admin/deleteData",(req,res)=>{
//     res.send("Deleted a User!!!!!!!!");
// });

//Another way to do it , just make a separate folder and whenever we need middleware , first export that and import here
const {adminAuth,userAuth} = require("./middlewares/auth.js");

app.use("/admin",adminAuth);
app.get("/admin/getData",(req,res)=>{
    res.send("This is the Data!!!");
});
app.delete("/admin/deleteData",(req,res)=>{
    res.send("Deleted a User!!!!!!!!");
});

app.post("/user/login/:name",(req,res)=>{
    const name = req.params.name;
    res.send("User is Logged In!!!!!"+name);
})
app.get("/userData",userAuth,(req,res)=>{ // here , it is same way to write different functions before actual route handler
    res.send("This is user Data!!!!!");
});




app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
});