const adminAuth = (req,res,next)=>{
    const token = "xyz";
    const isAuthorized  = token === "xyz";
    console.log("Authorizing the Admin!!!!!!");
    if(isAuthorized){
        next();
    }else{
        res.status(401).send("Unauthorized Access!!!!");
    }
};
const userAuth = (req,res,next)=>{
    const token = "abc";
    const isAuthorized = token === "abc";
    console.log("Handling the Authorization of User!!!");
    if(isAuthorized){
        next();
    }else{
        res.status(401).send("Unauthorized User!!!!!!");
    }
};

module.exports = {adminAuth,userAuth};