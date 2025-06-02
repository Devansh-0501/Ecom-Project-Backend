const express = require('express');
const router = express();

router.get("/login",async (req,res)=>{
    let {name,email,password}=req.body()
})
