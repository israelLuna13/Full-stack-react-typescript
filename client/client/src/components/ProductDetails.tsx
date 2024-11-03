//import { useNavigate } from "react-router-dom"
import { formatCurrency } from "../helpers"
import { deleteProduct } from "../service/ProductService"
import { Product } from "../types"
import {ActionFunctionArgs, Form,useNavigate,redirect, useFetcher}from 'react-router-dom'

type ProductDetailsProps = {
    product:Product
}
//action -> Get data from from and delete a product
export async function action({params}:ActionFunctionArgs) {
    if(params.id !== undefined){
        await deleteProduct(+params.id)
        return redirect('/')
    }
}

export default function ProductDetails({product}:ProductDetailsProps) 
{   
    const isAvailable = product.availability
    const  navigate = useNavigate()
    const fetcher = useFetcher()//update in the same page

  return (
        <tr className="border-b">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
             {/* we use fetcher for update availability in the same page*/}
             <td className="p-3 text-lg text-gray-800">

             <fetcher.Form method="POST">
                <button type="submit"
                        name="id"
                        value={product.id}
                        className={`${isAvailable ? 'text-black':'text-red-600'} 
                                    rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
                >
                        
                    {isAvailable ? 'Available':'Not available'}
                </button>
             </fetcher.Form>
             </td>
             <td className="p-3 text-lg text-gray-800">
                <div className="flex gap-2 items-center">
                    <button onClick={()=> navigate(`/products/${product.id}/edit`)}
                    className="bg-blue-700 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center">
                        Edit
                    </button>

                    <Form className="w-full" method="POST"
                            action={`products/${product.id}/delete`}
                            // message confirmation
                            onSubmit={(e)=>{
                                if(!confirm('Do you want Delete?')){
                                    e.preventDefault()
                                }
                            }}
                            >
                                <input type="submit"
                                    value='Delete'
                                    className="bg-red-700 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                                />
                    </Form>
                </div>
             </td>
        </tr>
  )
}
