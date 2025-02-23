import { FormEvent, useRef, useState } from "react";
import { getProductCategoryList } from "../data/getProductCategoryList";

export interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
}
interface Props {
  onAdd: (product: Product) => void;
}
const InputForm = ({ onAdd }: Props) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const [product, setProduct] = useState({
    id: 0,
    title: "",
    category: "",
    description: "",
    price: 0,
  });
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const products = {
      id: 0,
      title: "",
      category: "",
      description: "",
      price: 0,
    };

    if (titleRef.current && titleRef.current.value)
      products.title = titleRef.current.value;

    if (descriptionRef.current && descriptionRef.current.value)
      products.description = descriptionRef.current.value;

    if (priceRef.current && priceRef.current.value)
      products.price = parseFloat(priceRef.current.value);

    if (categoryRef.current && categoryRef.current.value)
      products.category = categoryRef.current.value;

    setProduct(products);
    onAdd(product);
    console.log(product);
  };

  return (
    <form className="flex flex-col text-lg" onSubmit={onSubmit}>
      <div className="mb-3 flex flex-col ">
        <label htmlFor="title" className="py-2 pl-3 text-lg">
          Title
        </label>
        <input
          onChange={(event) => {
            setProduct({ ...product, title: event.target?.value });
          }}
          ref={titleRef}
          type="text"
          id="title"
          name="title"
          className="outline-0 border-1 border-cyan-300 rounded-md px-2 py-1 text-lg"
        />
      </div>
      <div className="mb-3 flex flex-col">
        <label htmlFor="description" className="py-2 pl-3 text-lg">
          Description
        </label>
        <input
          onChange={(event) => {
            setProduct({ ...product, description: event.target?.value });
          }}
          ref={descriptionRef}
          type="text"
          id="description"
          name="description"
          className="outline-0 border-1 border-cyan-300 rounded-md px-2 py-1 text-lg"
        />
      </div>
      <div className="mb-3 flex flex-col">
        <label htmlFor="price" className="py-2 pl-3 text-lg">
          Price
        </label>
        <input
          onChange={(event) => {
            setProduct({ ...product, price: parseFloat(event.target?.value) });
          }}
          ref={descriptionRef}
          type="number"
          id="price"
          name="price"
          min={0}
          className="outline-0 border-1 border-cyan-300 rounded-md px-2 py-1 text-lg"
        />
      </div>
      <div className="mb-3 flex flex-col">
        <label htmlFor="category" className="py-2 pl-3 text-lg">
          Category
        </label>
        <select
          onChange={(event) => {
            setProduct({ ...product, category: event.target?.value });
          }}
          name="category"
          id="category"
          ref={categoryRef}
          className="outline-0 border-1 border-cyan-300 rounded-md px-2 py-1 text-lg"
        >
          {getProductCategoryList().map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="outline-0 cursor-pointer rounded-2xl bg-green-400 text-white px-3 py-2 m-3 text-lg"
      >
        Add
      </button>
    </form>
  );
};

export default InputForm;
