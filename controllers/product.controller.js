//const mongoose=require('mongoose')
const productModel=require('../models/products.model.js')




const searchProduct = async (req, res) => {
  try {
    const { search,category } = req.query;

    const filter = {};

    // 🔍 Search by product name (case-insensitive)
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    

    // 📦 Filter by category if provided
    if (category) {
      filter.category = category;
    }

    const products = await productModel.find(filter);

    res.status(200).json({ product: products });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Error fetching products" });
  }
};


const createProduct = async (req,res)=>{
    let product = req.body;
    if(!product.name || !product.image || !product.price || !product.desc)
    {
        return res.status(400).json({message:"provide all fields"})
    }

    try{
        let createdProduct = await productModel.create({
            name: product.name, 
            price: product.price, 
            image: product.image,
            desc: product.desc,
            category : product.category
        })
        console.log(createdProduct)
         res.status(201).json({ message: "Product created", createdProduct });
    }
    catch(error)
    {
        console.error("error in creating product",error.message)
        res.status(500).json({message:"error in server"})
    }

}

const getProduct = async (req,res)=>{
    try{
    let product = await productModel.find();
    res.status(200).json({message:"Product viewed successfully",product})
    }
    catch(error)
    {
        console.error("Error in viewing Products", error.message)
        res.status(500).json({message:"error in server"})
    }
}

const deleteProduct = async (req,res) => {
    try {
        const {id} = req.params;
        console.log(id);
        let deletedProduct = await productModel.findByIdAndDelete(id)
        res.status(200).json({message:"Product deleted successfully" , deletedProduct})
        
    } catch (error) {
        res.status(404).json({message : "Internal server error"})
        
    }
}

const updateProduct = async (req,res) => {
    try {
        const {id}=req.params;
        const {name,price,image,desc,category}= req.body;
        let updatedProduct = await productModel.findByIdAndUpdate(id,{name,price,image,desc,category})
        res.status(200).json({message:"Product Updated Successfully",updatedProduct})
        
    } catch (error) {
         res.status(404).json({message : "Internal server error"})
 
        
    }
}

const singleProduct = async (req,res) => {
    const {id} =req.params;
    try {
        let product = await productModel.findById(id)
        res.status(200).json({message:"Product fetched successfully" , product})
    } catch (error) {
         res.status(404).json({message : "Internal server error"})
    }

}
module.exports = { createProduct, getProduct,deleteProduct,updateProduct,singleProduct,searchProduct };