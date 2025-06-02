const express = require('express');

const {loginUser,createUser, logoutUser} = require("../controllers/user.controller")

const router = express();


router.post("/login", loginUser);
router.post("/signUp", createUser);
router.get("/logout",logoutUser)


module.exports = router;