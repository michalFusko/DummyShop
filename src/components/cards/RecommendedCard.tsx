import { FaPlus } from "react-icons/fa";
import { Product } from "../../types/product";
import { useNavigate } from "react-router";
import { useIsCartOpenStore } from "../../store/useIsCartOpenStore";
import { useCartStore } from "../../store/useCartStore";
interface RecommendedCardProps {
  product: Product;
  height: number;
}

const RecommendedCard = ({ product, height }: RecommendedCardProps) => {
  const navigate = useNavigate();

  const closeCart = useIsCartOpenStore((state) => state.closeCart);
  const setProduct = useCartStore((state) => state.setProduct);

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
    closeCart();
  };

  return (
    <div
      aria-label="Recommended product"
      className="flex w-1/3 flex-col items-center justify-center bg-white outline"
      style={{ height: `${height}vh` }}
    >
      <img
        role="link"
        aria-label="Open product page"
        src={product.images[0]}
        alt={product.title}
        className="bg-seashell h-4/5 cursor-pointer object-contain"
        onClick={handleProductClick}
      />
      <div className="flex h-1/5 w-full items-center justify-between border-t px-2 text-xs">
        <p>{product.price}$</p>
        <button
          aria-label="Add product to cart"
          className="cursor-pointer"
          onClick={() => setProduct(product)}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default RecommendedCard;
