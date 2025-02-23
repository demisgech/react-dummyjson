// import { CanceledError, AxiosError } from "axios";
// import { useState, useEffect } from "react";
// import apiClient from "../services/api-client";
import { getProductCategoryList } from "../data/getProductCategoryList";

// First Option
const useProductCategoryList = () => ({
  categories: getProductCategoryList(),
  error: null,
  isLoading: false,
});

// Second option
// interface FetchCategoryResponse {
//   (): string[];
// }

// const useProductCategoryList = () => {
//   const [categories, setCategories] = useState<string[]>([]);
//   const [error, setError] = useState("");
//   const [isLoading, setLoading] = useState(false);

//   useEffect(() => {
//     const controller = new AbortController();
//     setLoading(true);
//     apiClient
//       .get<FetchCategoryResponse>("/products/category-list", {
//         signal: controller.signal,
//       })
//       .then((respose) => {
//         // console.log(respose.data);
//         setLoading(false);
//         setCategories(respose.data);
//       })
//       .catch((error) => {
//         // console.log(error);
//         if (error instanceof CanceledError) return;
//         setLoading(false);
//         setError((error as AxiosError).message);
//       });

//     return () => controller.abort();
//   }, []);

//   return { categories, error, isLoading };
// };

export default useProductCategoryList;
