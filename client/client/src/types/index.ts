import {string,object,number, boolean, array, InferOutput} from 'valibot'

export const DraftProductShema = object({
    name:string(),
    price:number()
})

//shema of product that we going get 
//this shema is to object
export const ProductShema = object({
    id:number(),
    name:string(),
    price:number(),
    availability:boolean()
})

export const ProductSchemaEntry = object({
    name:string(),
    price:number(),
    availability:boolean()
});//shema to answer of us API
export const ProductsShema = array(ProductShema)
export type Product = InferOutput<typeof ProductShema>
export type ProductEntry = InferOutput<typeof ProductSchemaEntry>

//auth

export const authShemaForm = object({
    name:string(),
    email:string(),
    password:string(),
    password_confirmation:string()
})
export type userRegistrationForm = InferOutput<typeof authShemaForm>