const jwt = require("jsonwebtoken");
const { User } = require("../models/userSchema");

const userAuth = async (req,res,next)=>{
    try{
        const cookies = req.cookies;
        const {token} = cookies;
        if(!token){
            throw new Error("Invalid Token, Please Login Again!!!");
        }

        const decodeMessage = await jwt.verify(token,"DEV@Tinder$1234");

        const {id} = decodeMessage;
        const user = await User.findById(id);
        if(!user){
            throw new Error("User not found, register yourself!!!!!!");
        }

        req.user = user;
        next();


    }catch(err){
        res.status(400).send("Error: "+err.message);
    }
};

module.exports = {userAuth};