const userModel = require("../models/user.model.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: "Error comparing passwords" });
      }

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Successful login
        let token = jwt.sign({email:user.email},"secretKey")
        res.cookie("token", token, {
  httpOnly: true,
  secure: true, // required for cookies to be sent over HTTPS (which Render uses)
  sameSite: "None", // allow cross-site cookies from localhost to Render
  maxAge: 24 * 60 * 60 * 1000
});

        console.log("Login Successful")
      return res.json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email, role:user.role } });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};



const createUser = async (req,res)=>{
    let {name,password,email,role} = req.body;

    const hashedPassword = await bcrypt.hash(password,10)


    try {
        const createdUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
            role
        })

        res.status(201).json({message:"User Created Successfully", createdUser})
        
    } catch (error) {
           console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error while creating User" });
  
        
    }
}

const logoutUser =  (req,res)=>{
    try {
     
        res.clearCookie("token",{
            httpOnly:true,
            secure:true,
            sameSite:"None"
        })

        res.json({ message: "Logged out successfully" });
        
    } catch (error) {
        res.status(500).json({message:"Logging Out Failed"})
        console.log(error)
    }
}

module.exports = {createUser,loginUser,logoutUser}