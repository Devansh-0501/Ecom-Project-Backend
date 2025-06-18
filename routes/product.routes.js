const express = require('express');
const {getProduct,createProduct, deleteProduct, updateProduct, singleProduct, searchProduct} = require('../controllers/product.controller');
const {authenticateUser,isAdmin} = require('../middleware/authUser.js');

const router = express.Router();






router.post("/", authenticateUser,isAdmin,createProduct)
router.get("/product",searchProduct)
router.get("/", getProduct)
router.get("/:id",authenticateUser, singleProduct)

router.delete("/:id",authenticateUser,isAdmin, deleteProduct)
router.put("/:id",authenticateUser,isAdmin,updateProduct)

module.exports=router;