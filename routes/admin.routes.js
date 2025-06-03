const express = require("express");
const isAdmin = require("../middleware/isAdmin");
const {getAllUsers,deleteUser} = require("../controllers/admin.controller");
const authenticateUser = require("../middleware/authUser");

const router = express.Router();



router.get("/admin", authenticateUser, isAdmin , getAllUsers )
router.delete("/admin", authenticateUser, isAdmin, deleteUser)


module.exports = router;