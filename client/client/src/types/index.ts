import {string,object,number} from 'valibot'

export const DraftProductShema = object({
    name:string(),
    price:number()
})