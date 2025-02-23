import useProducts from "../hooks/useProducts";
import Spinner from "./Spinner";

interface Props {
  selectedCategory: string;
}
const ProductList = ({ selectedCategory }: Props) => {
  const { products, error, isLoading } = useProducts(selectedCategory);

  if (isLoading) return <Spinner isLoading={isLoading} />;

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
