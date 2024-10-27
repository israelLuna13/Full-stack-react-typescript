import { Request,Response} from 'express'
import Product from '../models/Product.model.js'
export class ProductHandler{
     static createProduct = async(req:Request,res:Response) :Promise<Response | void>=>{
        const product = await Product.create(req.body)
        res.json({data:product})
     }
}
