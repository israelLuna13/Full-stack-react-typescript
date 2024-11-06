import axios, { isAxiosError } from "axios";
import { authShemaForm } from "../types";
import { safeParse } from "valibot";

type ProductData = {
    [k:string]:FormDataEntryValue
}
const url = `${import.meta.env.VITE_API_URL}/auth`

export async function createAccount(data:ProductData)
{
   try {

    const result = safeParse(authShemaForm,{
        name:data.name,
        email:data.email,
        password:data.password,
        password_confirmation:data.password_confirmation
    })
    console.log(result);
    
    if(result.success){
        const {data} = await axios.post<string>(`${url}/create-account`,
            {
                name:result.output.name,
                email:result.output.email,
                password:result.output.password,
                password_confirmation:result.output.password_confirmation
            })
            console.log(data)

    }else{
        throw new Error('Datos no validos')
    }
    
   } catch (error) {
    if (isAxiosError(error) && error.message) 
        throw new Error(error.response?.data.error);
   }

}

export async function confirmAccount(formData:ProductData)
{
    try {
        const {data} = await axios.post(`${url}/confirm-account`,formData)
        if(data.error)
        {
            console.log(data.error);
            
        }else{
            throw new Error('Datos no validos')
        }
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.message) 
            throw new Error(error.response?.data.error);
    }
}