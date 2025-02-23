import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosError, CanceledError } from "axios";

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
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get<FetchPrductResponse>("/products", {
        signal: controller.signal,
      })
      .then(({ data }) => {
        // console.log(response.data);
        setLoading(false);
        setProducts(data.products);
      })
      .catch((error) => {
        // console.error(error);
        if (error instanceof CanceledError) return;
        setError((error as AxiosError).message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  if (isLoading)
    return (
      <div className="w-3 h-3 p-4 rounded-full border-3 border-green-400 border-t-0 animate-spin" />
    );

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-2">
      <ul className="list-none outline-0 border-gray-500 border-1 rounded-md overflow-hidden last:border-b-0">
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
