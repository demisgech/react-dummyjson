import { useState } from "react";
import ProductCategoryList from "./ProductCategoryList";
import ProductList from "./ProductList";

function ProductApp() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const onSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };
  return (
    <div className="p-2">
      <ProductCategoryList onSelectCategory={onSelectCategory} />
      <ProductList selectedCategory={selectedCategory} />
    </div>
  );
}

export default ProductApp;
