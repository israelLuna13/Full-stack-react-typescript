import { Request,Response} from 'express'
import Product from '../models/Product.model'
export class ProductHandler{
   static getProducts=async(req:Request,res:Response):Promise<void>=>{
      
      const products = await Product.findAll({
               order:[
                  ['price','DESC']
               ]
            })
            res.json({data:products})
            return
      // try {
      //    const products = await Product.findAll({
      //       order:[
      //          ['price','DESC']
      //       ]
      //    })
      //    res.json({data:products})
      // } catch (error) {
      //    console.log(error);
      // }
   }

   static getProductById=async(req:Request,res:Response):Promise<void>=>{
      
      const {id} = req.params
      const product = await Product.findByPk(id)
      if(!product)
      {
            res.status(404).json({
            error:'Product not found'
         })
         return;
      }
      res.json({data:product})
      // try {
      //    const {id} = req.params
      //    const product = await Product.findByPk(id)
      //    if(!product)
      //    {
      //          res.status(404).json({
      //          error:'Product not found'
      //       })
      //       return;
      //    }
      //    res.json({data:product})
      // } catch (error) {
      //    console.log(error);
      // }
   }
     static createProduct = async(req:Request,res:Response):Promise<void>=>{
        const product = await Product.create(req.body)
        res.status(201).json({data:product})
        return
     }
     static updateProduct= async(req:Request,res:Response)=>{
      const {id} = req.params
      const product = await Product.findByPk(id)
      if(!product)
      {
           res.status(404).json({
            error:'Product not found'
         })
         return;
      }
      //update all product
      await product.update(req.body)
      await product.save()
      res.json({data:product})
      return;
     }

     static updateAvailable= async(req:Request,res:Response):Promise<void>=>{
      const {id} = req.params
      const product = await Product.findByPk(id)
      if(!product)
      {
           res.status(404).json({
            error:'Product not found'
         })
         return;
      }
      //update state od product
      product.availability = !product.dataValues.availability
      await product.save()
      res.json({data:product})
      return
     }
     static deleteProduct = async(req:Request,res:Response):Promise<void>=>{
      const {id} = req.params
      const product = await Product.findByPk(id)
      if(!product)
      {
            res.status(404).json({
            error:'Product not found'
         })
         return;
      }
      await product.destroy()
      res.json({data:'product deleted'})
      return
     }
}
