const validator = require("validator");

const validateSignupData = (req)=>{
    const {firstName, lastName, emailID, password} = req.body;

    if(firstName.length == 0 || lastName == 0){
        throw new Error("Please enter valid firstName and lastName!!!!!");
    }else if(firstName.length < 4 || firstName.length > 20 || lastName.length > 20 || lastName.length < 4){
        throw new Error("Please enter firstname and lastname of length in between 4 and 20!!!!");
    }else if(!validator.isAlpha(firstName)){
        throw new Error("FirstName could not contain special and numeric character!!!!!");
    }else if(!validator.isAlpha(lastName)){
        throw new Error("LastName could not contain special and numeric character!!!!!");
    }else if(!validator.isEmail(emailID)){
        throw new Error("Please enter a valid email Id!!!!!");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password!!!!!!");
    }
}

module.exports = {
    validateSignupData,
}