import { Router } from "express";
import { ProductHandler } from "../handlers/product.js";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation.js";
const router = Router()
router.get('/',(req,res)=>{
    res.json('DESDE GET')
})
router.post('/',body("name").notEmpty().withMessage("Product name is required"),
                body('price').isNumeric().withMessage('incorrect value').notEmpty().withMessage('Price is required').custom(value => value > 0),
                handleInputErrors,
                ProductHandler.createProduct)

router.put('/',(req,res)=>{
    res.json('DESDE PUT')
})

router.delete('/',(req,res)=>{
    res.json('DESDE DELETE')
})

export default router