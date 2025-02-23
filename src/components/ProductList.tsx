import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
}

interface FetchPrductResponse {
  products: Product[];
}
const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    apiClient
      .get<FetchPrductResponse>("/products")
      .then(({ data }) => {
        // console.log(response.data);
        setProducts(data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="p-2">
      <ul className="list-none py-2 outline-0 border-gray-500 border-1 rounded-md overflow-hidden">
        {products.map((product) => (
          <li
            key={product.id}
            className="p-2 text-2xl m-0 outline-0 border-b-1 border-b-gray-400"
          >
            <h3 className="text-teal-300">{product.title}</h3>
            <p className="text-md">{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
