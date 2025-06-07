const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authenticateUser = async (req, res, next) => {
  try {
    
    const token = req.cookies.token;

    if (!token) {
      console.log("authUser: No token found");
      return res.status(401).json({ message: "User not authenticated" });
    }

   
    const decrypt = jwt.verify(token, "secretKey");
   

    const user = await userModel.findOne({ email: decrypt.email });

    if (!user) {
      console.log("authUser: User not found");
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    console.log("authUser: User authenticated", user.email);

    return next();  // Continue to the next middleware

  } catch (error) {
    console.log("authUser: Error", error);
    return res.status(401).json({ message: "Invalid token", error });
  }
};

const isAdmin = (req ,res ,next) =>{
   
    if (req.user && req.user.role === "admin") {
      console.log("isADmin hit")
    return next();
   
  } else {
    res.status(403).json({ message: "Access denied. Admin only." });
  }
};

module.exports = {authenticateUser,isAdmin};
