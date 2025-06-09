const express = require('express');

const {loginUser,createUser, logoutUser, updateCart, getCart, clearCart} = require("../controllers/user.controller");
const { authenticateUser } = require('../middleware/authUser');

const router = express.Router();


router.post("/login", loginUser);
router.post("/signUp", createUser);
router.get("/logout",authenticateUser,logoutUser);
router.post("/cart",authenticateUser,updateCart);
router.get("/cart",authenticateUser,getCart);
router.get("/cart/clear",authenticateUser,clearCart);



module.exports = router;