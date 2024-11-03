import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { getProductById, updateProduct } from "../service/ProductService";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";

//get product by id from API and recovery id params of url
export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductById(+params.id);
    if (!product) return redirect("/");
    return product;
  }
}
//action -> get data from form and update a product
export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData()); //data from form
  let error = "";
  if (Object.values(data).includes("")) {
    error = "All inputs is required";
  }
  if (error.length) {
    return error;
  }
  if (params.id !== undefined) {
    await updateProduct(data, +params.id);
    return redirect("/");
  }
}
const availabilityOptions = [
  { name: "Available", value: true },
  { name: "Not available", value: false },
];

export default function EditProduct() {
  // we use UseAction when We used forms
  const error = useActionData() as string;
  const product = useLoaderData() as Product;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Edit product</h2>
        <Link
          to="/"
          className="rounded-md bg-blue-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-blue-500"
        >
          Return to products
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form className="mt-10" method="POST">
        
        <ProductForm product={product} />

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Availability:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-blue-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Edit Product"
        />
      </Form>
    </>
  );
}
