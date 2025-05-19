import { useNavigate } from "react-router";
import { useCartStore } from "../../store/useCartStore";
import { Product } from "../../types/product";
import { useIsCartOpenStore } from "../../store/useIsCartOpenStore";

interface CartProductCardProps {
  product: Product;
  qty: number;
}

const CartProductCard = ({ product, qty }: CartProductCardProps) => {
  const navigate = useNavigate();
  const { removeProduct, incrementProductQty, decrementProductQty } =
    useCartStore();
  const closeCart = useIsCartOpenStore((state) => state.closeCart);

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
    closeCart();
  };

  return (
    <div aria-label="Product" className="flex h-1/3 border-b" key={product.id}>
      <img
        role="link"
        aria-label="Open product page"
        src={product?.images[0]}
        alt={product.title}
        className="bg-seashell w-3/7 cursor-pointer border-r object-contain"
        onClick={handleProductClick}
      />
      <div className="flex w-4/7 flex-col">
        <div className="flex h-2/3 flex-col items-center justify-center gap-2">
          <h1 className="text-center">{product?.title}</h1>
          <p>{(product?.price * qty).toFixed(2)}$</p>
        </div>
        <div className="flex h-1/3 items-center justify-around">
          <div className="flex items-center gap-3 border">
            <button
              aria-label="Decrease product amount"
              onClick={() => decrementProductQty(product.id)}
              className="w-1/3 cursor-pointer pl-2"
            >
              -
            </button>
            <p aria-label="Product quantity" className="text-sm">
              {qty}
            </p>
            <button
              aria-label="Increase product amount"
              onClick={() => incrementProductQty(product.id)}
              className="w-1/3 cursor-pointer pr-2"
            >
              +
            </button>
          </div>
          <button
            className="cursor-pointer text-sm underline"
            onClick={() => removeProduct(product.id)}
          >
            REMOVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
