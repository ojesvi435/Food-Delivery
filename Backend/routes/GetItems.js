const express=require('express');
const { ExpressValidator } = require('express-validator');
const router=express.Router();

router.post('/getItems',async(req,res)=>{
    try{
        res.send([global.food_items,global.food_category])
    }
    catch(error){
        console.log(error)
        res.send("server error")
    }
})

module.exports=router