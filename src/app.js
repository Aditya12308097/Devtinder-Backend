const express = require("express");
const app = express();

app.use("/user",(req,res)=>{
    res.send("I am GOD!!!");
})

app.get('/user',(req,res)=>{
    const data = {
        name : "Aditya",
        course : "Btech"
    }
    res.send(data);

})
app.post('/user',(req,res)=>{
    res.send("Data saved successfully!!");
})
app.delete('/user',(req,res)=>{
    res.send("Data deleted successfully!!");
})
app.put("/user",(req,res)=>{
    res.send("Data updated successfully!!");
})

app.use("/test",(req,res)=>{
    res.send(`Hello from the Server!!!!!!`);
});
app.use("/",(req,res)=>{
    res.send("Hello From the dashboard!!!!!!!!!");
}); 
app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
});