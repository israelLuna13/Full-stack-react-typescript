import { number, pipe, safeParse, transform ,string, parse} from "valibot"
import { DraftProductShema, Product, ProductShema, ProductsShema } from "../types"
import axios from "axios"
import { toBoolean } from "../helpers"

type ProductData = {
    [k:string]:FormDataEntryValue
}
const url = `${import.meta.env.VITE_API_URL}/products`
export async function addProduct(data:ProductData)
{
    try {
        const result = safeParse(DraftProductShema,{
            name:data.name,
            price:+data.price
        })
        if(result.success){
            // const url = `${import.meta.env.VITE_API_URL}/products`
            const {data} = await axios.post(url,
                {
                    name:result.output.name,
                    price:result.output.price
                }
            )
            console.log(data);

        }else{
            throw new Error('Datos no validos')

        }
    } catch (error) {
        console.log(error);

    }
    
}
export async function getProducts(){
    try {
        const {data} = await axios(url)
        const result = safeParse(ProductsShema,data.data)        
        if(result.success){
            return result.output
        }else{
            throw new Error('There was error')
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getProductById(id:Product['id'])
{
    try {
        const {data} = await axios(`${url}/${id}`)

        const result = safeParse(ProductShema,data.data)
        console.log(result);
        if(result.success){
            return result.output
        }else{
            throw new Error('There was error')
        }
    } catch (error) {
        console.log(error);
    }
}

export async function updateProduct(data:ProductData,id:Product['id'])
{
    try {
        //convert string -> number
        const NumberShema = pipe(string(),transform(Number),number())
        const result = safeParse(ProductShema,{
            id,
            name:data.name,
            price:parse(NumberShema,data.price),
            availability:toBoolean(data.availability.toString())
        })
        if(result.success)
            await axios.put(`${url}/${id}`,result.output)
    } catch (error) {
        console.log(error);
    }
}

export async function deleteProduct(id:Product['id']){
    try {
        await axios.delete(`${url}/${id}`)
    } catch (error) {
        console.log(error);
    }
}

export async function updateProductAvailability(id:Product['id'])
 {
    try {
        await axios.patch(`${url}/${id}`)
    } catch (error) {
        console.log(error);
    }
}