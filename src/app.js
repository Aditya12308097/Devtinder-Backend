const express = require("express");
const app = express();

// app.use("/user",(req,res)=>{ //it will match all the routes 
//     res.send("I am GOD!!!");
// })

//now some part of regex
// app.get(/a/,(req,res)=>{
//     res.send("If url contain a in it , it will be matched!!");
// })

app.get(/.*fly$/,(req,res)=>{
    res.send('if url contains fly at the end , it will be matched!!');
})
// app.get(/ab?c/,(req,res)=>{
//     res.send("Here b is optional , means ac and abc , both can work!");
// })
app.get(/ab*cd/,(req,res)=>{
    res.send("here ab should be at starting and cd at the end , and in middle can be anything");
})
app.get(/ab+c/,(req,res)=>{
    res.send("here , b can be present any number of times. like abc, abbc,abbbc ,etc");
})
app.get(/a(bc)+df/,(req,res)=>{
    res.send("here we have grouped the things , ,means those same rules would be applied on the given group");
})

app.get('/user',(req,res)=>{
    const data = {
        name : "Aditya",
        course : "Btech"
    }
    console.log(req.query);//this is for if we write url like this :-> localhost:2000/user?userid=100&password=testing&nickname=jaat
    res.send(req.query);
    // res.send(data);

})
app.get('/user/:userID/:password/:SecreatKey',(req,res)=>{
    //this is for if i write url like this :-> localhost:3000/user/101/testing/jaat
    console.log(req.params);
    res.send(req.params);
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

 
app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
});