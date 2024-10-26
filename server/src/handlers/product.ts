import { Request,Response} from 'express'
import {check,validationResult} from 'express-validator'
import Product from '../models/Product.model.js'
export class ProductHandler{
     static createProduct = async(req:Request,res:Response) :Promise<Response | void>=>{
        //check input
        await check("name").notEmpty().withMessage("Product name is required").run(req)
        await check('price').isNumeric().withMessage('incorrect value').notEmpty().withMessage('Price is required').custom(value => value > 0).run(req)
    
        let errors = validationResult(req)
    
        if(!errors.isEmpty())
            return res.status(400).json({errors:errors.array()})
        const product = await Product.create(req.body)
        res.json({data:product})
     }
}
