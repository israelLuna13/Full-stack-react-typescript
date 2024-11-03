import {Link,Form,useActionData,ActionFunctionArgs, redirect} from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import { addProduct } from '../service/ProductService'

//handle data form
export async function action({request}:ActionFunctionArgs)
{
    //get data form
    const data = Object.fromEntries(await request.formData())
    let error=''

    console.log(data);
    
    //check that if there is not input empty
    if(Object.values(data).includes(''))
    {
        error = 'All input is required'
    }
    if(error.length)
        return error

   await  addProduct(data)
    return redirect('/')
}

export default function NewProduct() {
    //get data that action give we
    const error = useActionData() as string
  return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-500'>
                    Register product
                </h2>
                <Link to={'/'} className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500">
                  get back
                </Link>
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage> }

            <Form className='mt-10' method='POST'>
                <div>
                    <label htmlFor="name" className='text-gray-800'>
                        Product name
                    </label>
                    <input type="text" id='name'
                            className='mt-2 block w-full p-3 bg-gray-50'
                            placeholder='Product name'
                            name='name'
                    />
                </div>
                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="price">
                        Precio:
                    </label>
                    <input
                        id="price"
                        type="number"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Precio Producto. ej. 200, 300"
                        name="price"
                    />
                </div>
                <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />


            </Form>

        </>
  )
}
