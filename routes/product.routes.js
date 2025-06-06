const express = require('express');
const {getProduct,createProduct, deleteProduct, updateProduct, singleProduct} = require('../controllers/product.controller');
const authenticateUser = require('../middleware/authUser.js');
const isAdmin = require('../middleware/isAdmin');
const router = express.Router();






router.post("/",authenticateUser,isAdmin,createProduct)

router.get("/", getProduct)
router.get("/:id",authenticateUser, singleProduct)

router.delete("/:id",authenticateUser,isAdmin, deleteProduct)
router.put("/:id",authenticateUser,isAdmin,updateProduct)

module.exports=router;