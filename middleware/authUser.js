const userModel = require("../models/user.model")

const jwt = require("jsonwebtoken")




const authenticateUser = async (req,res,next) =>{
   try {
    
    let token = req.cookies.token;
    console.log(token , req.cookie);

    if(!token) res.status(401).json({message:"User not authenticated"})
    
    const decrypt = jwt.verify(token,"secretKey");

    const user = await userModel.findOne({email:decrypt.email});

    if(!user) res.status(404).json({message :"user not found"});

    req.user = user;
    next();
    
   } catch (error) {
    return res.status(401).json({ message: "Invalid token",error });
    
   } 



}

module.exports = authenticateUser; 