import { FormEvent, useRef } from "react";
import useProductCategoryList from "../hooks/useProductCategoryList";

interface Props {
  onSelectCategory: (category: string) => void;
}

const ProductCategoryList = ({ onSelectCategory }: Props) => {
  const { categories } = useProductCategoryList();
  const inputRef = useRef<HTMLSelectElement>(null);

  const handleSelectChange = (event: FormEvent) => {
    event.preventDefault();
    if (inputRef.current && inputRef.current.value)
      onSelectCategory(inputRef.current.value);
  };
  return (
    <select
      ref={inputRef}
      onChange={handleSelectChange}
      value={inputRef.current ? inputRef.current.value : ""}
      className="block w-[100%] p-1 border-1 border-gray-500 rounded-md text-gray-700 outline-0 text-2xl"
    >
      <option value="" className="text-green-700 outline-0">
        Select category...
      </option>
      {categories &&
        categories.map((category, index) => (
          <option
            className="text-green-700 outline-0"
            key={index}
            value={category}
          >
            {category}
          </option>
        ))}
    </select>
  );
};

export default ProductCategoryList;
