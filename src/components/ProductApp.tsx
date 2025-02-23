import { useState } from "react";
import ProductList from "./ProductList";
import InputForm, { Product } from "./InputForm";
import useProducts from "../hooks/useProducts";
import { ProductService } from "../services/ProductService";
import { AxiosError } from "axios";
import ProductCategoryList from "./ProductCategoryList";

function ProductApp() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { products, setProducts, error, setError, isLoading } =
    useProducts(selectedCategory);
  const onSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const onAdd = (product: Product) => {
    const originalProduct = products;
    const newProduct = { ...product, id: products.length + 1 };
    setProducts([newProduct, ...products]);
    const service = new ProductService();
    service
      .createProduct(newProduct)
      .then(({ data }) => {
        setProducts([data, ...products]);
      })
      .catch((error) => {
        setError((error as AxiosError).message);
        setProducts(originalProduct);
      });
  };
  return (
    <div className="p-2">
      <InputForm onAdd={onAdd} />
      <ProductCategoryList onSelectCategory={onSelectCategory} />
      <ProductList products={products} isLoading={isLoading} error={error} />
    </div>
  );
}

export default ProductApp;
