import { ActionFunctionArgs, Link,useLoaderData } from "react-router-dom"
import { getProducts, updateProductAvailability } from "../service/ProductService"
import { Product } from "../types"
import ProductDetails from "../components/ProductDetails"

//action -> get data from form and updateAvailability
export async function action({request}:ActionFunctionArgs)
{
  const data = Object.fromEntries(await request.formData())
  await updateProductAvailability(+data.id)
  return {}
}
//get all products from API
export async function loader(){
  const products = await getProducts()
  return products
}
export default function Products() {
  //Get data from us API with useLoaderData()
  const products = useLoaderData() as Product[]
  
  return (
    <>
    <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Products</h2>
        <Link to="products/new" 
              className="rounded-md bg-blue-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-blue-500">
            Add Product
        </Link>
    </div>
    <div className="p-2">
      <table className="w-full mt-5 table-auto">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="p-2">Product</th>
            <th className="p-2">Price</th>
            <th className="p-2">Availability</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(product =>(
              <ProductDetails
                key={product.id}
                product={product}
              />
            ))
          }
        </tbody>

      </table>

    </div>
    </>
  )
}