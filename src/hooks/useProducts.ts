import { CanceledError, AxiosError } from "axios";
import { useState, useEffect } from "react";
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

const useProducts = (selectedCategory: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get<FetchPrductResponse>(
        `/products${selectedCategory && "/category/" + selectedCategory}`,
        {
          signal: controller.signal,
        }
      )
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
  }, [selectedCategory]);

  return { products, error, isLoading, setProducts, setError };
};

export default useProducts;
