import { Router } from "express";
import { ProductHandler } from "../handlers/product.js";
const router = Router()
router.get('/',(req,res)=>{
    res.json('DESDE GET')
})
router.post('/',ProductHandler.createProduct)

router.put('/',(req,res)=>{
    res.json('DESDE PUT')
})

router.delete('/',(req,res)=>{
    res.json('DESDE DELETE')
})

export default router