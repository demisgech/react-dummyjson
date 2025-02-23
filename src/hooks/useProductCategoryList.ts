import { CanceledError, AxiosError } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

interface FetchCategoryResponse {
  (): string[];
}

const useProductCategoryList = () => {
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

  return { categories, error, isLoading };
};

export default useProductCategoryList;
