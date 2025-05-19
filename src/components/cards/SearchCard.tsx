import { useNavigate } from "react-router";
import { Product } from "../../types/product";
import { Dispatch, SetStateAction } from "react";
import { useIsMenuOpenStore } from "../../store/useIsMenuOpenStore";

interface SearchCardProps {
  product: Product;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
  setSearchTerm: Dispatch<SetStateAction<string>>;
}

const SearchCard = ({
  product,
  setIsSearching,
  setSearchTerm,
}: SearchCardProps) => {
  const navigate = useNavigate();

  const closeMenu = useIsMenuOpenStore((state) => state.closeMenu);

  const handleClick = () => {
    navigate(`/product/${product.id}`); // loads product page
    setIsSearching(false); //closes search
    setSearchTerm(""); //clears input
    closeMenu(); //closes menu if on mobile and open
  };

  return (
    <div
      role="link"
      aria-label="Open product page"
      className="hover:bg-seashell flex h-[50vh] cursor-pointer flex-col items-center"
      onClick={handleClick}
    >
      <img
        src={product?.images[0]}
        alt={product?.title}
        className="bg-seashell h-[45vh] w-full object-cover"
      />
      <h1 className="h-[5vh] py-[1vh] text-center text-sm leading-4 xl:text-base">
        {product?.title.toUpperCase()}
      </h1>
    </div>
  );
};

export default SearchCard;
