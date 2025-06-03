const userModel = require("../models/user.model")



const getAllUsers = async (req,res) => {
    try {
        const users = await userModel.find({})
        res.json({message:"All Users",users})
        
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users" ,error});
    }
}

module.exports = getAllUsers;