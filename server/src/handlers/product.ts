import { Request,Response} from 'express'
import Product from '../models/Product.model.js'
export class ProductHandler{
   static getProducts=async(req:Request,res:Response)=>{
      try {
         const products = await Product.findAll({
            order:[
               ['price','DESC']
            ]
         })
         res.json({data:products})
      } catch (error) {
         console.log(error);
      }
   }

   static getProductById=async(req:Request,res:Response)=>{
      try {
         const {id} = req.params
         const product = await Product.findByPk(id)
         if(!product)
         {
            return res.status(404).json({
               error:'Product not found'
            })
         }
         res.json({data:product})
      } catch (error) {
         console.log(error);
      }
   }
     static createProduct = async(req:Request,res:Response) :Promise<Response | void>=>{
        const product = await Product.create(req.body)
        res.json({data:product})
     }
     static updateProduct= async(req:Request,res:Response)=>{
      const {id} = req.params
      const product = await Product.findByPk(id)
      if(!product)
      {
         return res.status(404).json({
            error:'Product not found'
         })
      }
      //update all product
      await product.update(req.body)
      await product.save()
      res.json({data:product})
     }

     static updateAvailable= async(req:Request,res:Response)=>{
      const {id} = req.params
      const product = await Product.findByPk(id)
      if(!product)
      {
         return res.status(404).json({
            error:'Product not found'
         })
      }
      //update state od product
      product.availability = !product.dataValues.availability
      await product.save()
      res.json({data:product})
     }
     static deleteProduct = async(req:Request,res:Response)=>{
      const {id} = req.params
      const product = await Product.findByPk(id)
      if(!product)
      {
         return res.status(404).json({
            error:'Product not found'
         })
      }
      await product.destroy()
      res.json({data:'product deleted'})
     }
}
