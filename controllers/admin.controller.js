const userModel = require("../models/user.model")



const getAllUsers = async (req,res) => {
    try {
       
        const allUsers = await userModel.find()
        res.json({message:"All Users",allUsers})
        
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users" ,error});
    }
}
const deleteUser = async (req,res)=>{
    try {
        let { id }=req.params;
        const deletedUser = await userModel.findByIdAndDelete(id)
        console.log(deletedUser)
        res.status(200).json({message:"User Deleted",deletedUser})

        
    } catch (error) {
         res.status(404).json({message : "Internal server error",error})
        
    }
}

module.exports = {getAllUsers,deleteUser};