import { safeParse } from "valibot"
import { DraftProductShema } from "../types"
import axios from "axios"

type ProductData = {
    [k:string]:FormDataEntryValue
}
export async function addProduct(data:ProductData)
{
    try {
        const result = safeParse(DraftProductShema,{
            name:data.name,
            price:+data.price
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/products`
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