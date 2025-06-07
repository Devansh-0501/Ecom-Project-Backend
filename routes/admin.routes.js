const express = require("express");

const {getAllUsers,deleteUser} = require("../controllers/admin.controller");
const {authenticateUser,isAdmin} = require("../middleware/authUser");

const router = express.Router();



router.get("/admin/AllUsers" ,  authenticateUser ,isAdmin, getAllUsers )
router.delete("/admin/:id", authenticateUser, isAdmin, deleteUser)


module.exports = router;