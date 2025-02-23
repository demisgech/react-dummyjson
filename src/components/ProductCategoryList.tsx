import useProductCategoryList from "../hooks/useProductCategoryList";
import Spinner from "./Spinner";

const ProductCategoryList = () => {
  const { categories, error, isLoading } = useProductCategoryList();

  if (isLoading) return <Spinner isLoading={isLoading} />;
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
