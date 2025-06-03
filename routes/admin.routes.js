const express = require("express");
const isAdmin = require("../middleware/isAdmin");
const getAllUsers = require("../controllers/admin.controller");
const authenticateUser = require("../middleware/authUser");

const router = express.Router();



router.get("/admin", authenticateUser, isAdmin , getAllUsers )


module.exports = router;