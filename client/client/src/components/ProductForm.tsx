import { Product } from "../types";

// the component can have prop but also the component can not have propr
type ProductFormProps = {
  product?: Product;
};
export default function ProductForm({ product }: ProductFormProps) {
  return (
    <>
      <label className="text-gray-800" htmlFor="name">
        Product name:
      </label>
      <input
        id="name"
        type="text"
        className="mt-2 block w-full p-3 bg-gray-50"
        placeholder="Nombre del Producto"
        name="name"
        defaultValue={product?.name}
      />

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="price">
          Price:
        </label>
        <input
          id="price"
          type="number"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Precio Producto. ej. 200, 300"
          name="price"
          defaultValue={product?.price}
        />
      </div>
    </>
  );
}
