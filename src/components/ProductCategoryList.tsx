import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { AxiosError, CanceledError } from "axios";

interface FetchCategoryResponse {
  (): string[];
}
const ProductCategoryList = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get<FetchCategoryResponse>("/products/category-list", {
        signal: controller.signal,
      })
      .then((respose) => {
        console.log(respose.data);
        setLoading(false);
        setCategories(respose.data);
      })
      .catch((error) => {
        // console.log(error);
        if (error instanceof CanceledError) return;
        setError((error as AxiosError).message);
      });

    return () => controller.abort();
  }, []);

  if (isLoading)
    return (
      <div className="w-3 h-3 p-4 rounded-full border-3 border-green-400 border-t-0 border-l-0 animate-spin" />
    );

  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <select className="block w-[100%] p-1 border-1 border-gray-500 rounded-md text-gray-700 outline-0 text-2xl">
      <option value="" className="text-green-700 outline-0">
        Select category...
      </option>
      {categories &&
        categories.map((category) => (
          <option className="text-green-700 outline-0" value={category}>
            {" "}
            {category}
          </option>
        ))}
    </select>
  );
};

export default ProductCategoryList;
