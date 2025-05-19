import { useProductModalStore } from "../../store/useProductModalStore";
import { useCartStore } from "../../store/useCartStore";
import { useIsCartOpenStore } from "../../store/useIsCartOpenStore";
import { Product } from "../../types/product";
import ProductDetails from "../pages/product/singleProductDisplay/ProductDetails";
import { AnimatePresence, motion } from "framer-motion";

const AddProductModal = () => {
  const { isOpen, product, closeModal } = useProductModalStore();
  const setProduct = useCartStore((state) => state.setProduct);
  const { isCartOpen, openCart } = useIsCartOpenStore();

  const handleAddProduct = (product: Product | null) => {
    if (!product) return;
    setProduct(product);
    closeModal();
    openCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          initial={{
            right: "-100vw",
          }}
          animate={{
            right: "0",
          }}
          exit={{ right: "-100vw" }}
          transition={{
            ease: "circInOut",
            duration: 0.15,
          }}
          id="product-modal"
          role="dialog"
          className="fixed top-0 z-100 flex h-[100vh] w-full"
        >
          {/* CLOSE MODAL OVERLAY */}
          <div
            className="h-full bg-black/20 backdrop-blur-sm md:w-1/2 lg:w-2/3 xl:w-4/5"
            onClick={closeModal}
          ></div>
          {/* PRODUCT MODAL */}
          <div className="flex h-full w-full flex-col items-end md:w-1/2 lg:w-1/3 xl:w-1/5">
            <div className="flex h-[5vh] w-full items-center justify-end border-l bg-white text-black">
              <button
                onClick={closeModal}
                className="cursor-pointer pr-5 text-sm"
              >
                [ CLOSE ]
              </button>
            </div>
            <div className="flex h-full w-full justify-end text-black lg:w-2/1">
              {/* ABOUT PRODUCT */}
              <ProductDetails product={product} />
            </div>
            <button
              aria-haspopup={true}
              aria-expanded={isCartOpen}
              aria-controls="shopping-cart"
              className="flex h-[9vh] w-full cursor-pointer items-center justify-center bg-black text-white"
              onClick={() => handleAddProduct(product)}
            >
              ADD TO CART
            </button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default AddProductModal;
