const express = require('express');
const {getProduct,createProduct, deleteProduct, updateProduct} = require('../controllers/product.controller');

const router = express.Router();






router.post("/",createProduct)

router.get("/",getProduct)

router.delete("/:id", deleteProduct)
router.put("/:id",updateProduct)

module.exports=router;