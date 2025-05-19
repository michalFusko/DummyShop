import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCartStore } from "../../store/useCartStore";
import CartProductCard from "../cards/CartProductCard";
import { useMultipleCategoriesQuery } from "../../hooks/product/useMultipleCategoriesQuery";
import RecommendedCard from "../cards/RecommendedCard";
import { useIsCartOpenStore } from "../../store/useIsCartOpenStore";
import { Product } from "../../types/product";
import { useUserStore } from "../../store/useUserStore";
import { useGetUsersCartQuery } from "../../hooks/user/useGetUsersCartQuery";
import { useTransferCartStore } from "../../store/useTransferCartStore";
import SimpleLoader from "../common/SimpleLoader";
import { AnimatePresence, motion } from "framer-motion";

const CartModal = () => {
  //COMPONENT HAS
  // - cart management guest(main) / user(mergeable)
  // - recommended section
  // - navigation for login and shopping if cart is empty

  const navigate = useNavigate();
  // STATE
  const [userId, setUserId] = useState<number>(); //for fetching users cart
  const [productsToMerge, setProductsToMerge] = useState<Product[]>(); // users cart mergeable with default
  const [categoriesOfProducts, setCategoriesOfProducts] = useState<string[]>(
    [],
  ); //categories for recommended
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]); //filtered recommended

  // QUERY HOOKS
  const {
    data: productsRes,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useMultipleCategoriesQuery(categoriesOfProducts); // fetching by category for recommendations
  const { data: usersCart } = useGetUsersCartQuery(userId); // if logged in get users cart

  // GLOBAL STATE
  const { isCartOpen, closeCart } = useIsCartOpenStore();
  const { selectedProducts, setProductWithQty, clearCart } = useCartStore(); // guest/main cart
  const { keepItems, transferItems } = useTransferCartStore(); // transfering user cart to guest/main
  const user = useUserStore((state) => state.user);

  // emty cart
  const handleStartShopping = () => {
    closeCart();
    navigate("/shop");
  };
  // empty cart && not logged in
  const handleLogin = () => {
    closeCart();
    navigate("/login");
  };

  // get categories of selected products for recommended display
  useEffect(() => {
    // NEED UPDATE 1/2
    const categories = Array.from(
      new Set(selectedProducts.map(({ product }) => product.category)),
    );
    setCategoriesOfProducts(categories); //passed to query hook
  }, [selectedProducts]);

  //filtering so products from cart wont appear in recommended
  //shuffling filtered products so appearance is random from categories included in cart
  useEffect(() => {
    if (!productsRes || selectedProducts.length === 0) return;
    const cartProductsIds = new Set(
      selectedProducts.map(({ product }) => product.id),
    );
    const filteredProducts = productsRes.filter(
      (product) => !cartProductsIds.has(product.id),
    );

    const shuffledProducts = (array: Product[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    setRecommendedProducts(shuffledProducts(filteredProducts));
  }, [productsRes, selectedProducts]);

  // !!!usersCart provides incoplete object/unmergable with selectedProducts
  useEffect(() => {
    if (user?.id) {
      setUserId(user.id); // passed to query hook
    }
  }, [user]);

  // creating array of products by id with qty, so its mergable with selectedProducts / already existing cart - Product[]
  useEffect(() => {
    const fetchProducts = async () => {
      if (!usersCart || usersCart.length === 0) return;
      try {
        const requests = usersCart.map((item) =>
          fetch(`https://dummyjson.com/products/${item.id}`).then(
            // endpoint provides all product info
            async (res) => {
              if (!res.ok)
                throw new Error(`Failed to fetch item, id: ${item.id}`);
              const product = await res.json();
              const productQty = item.quantity;
              return { ...product, qty: productQty };
            },
          ),
        );
        const result = await Promise.all(requests); // final array of objects mergeable with main cart
        setProductsToMerge(result);
      } catch (error) {
        console.log(error);
      }
    };
    if (usersCart) {
      fetchProducts();
    }
  }, [usersCart]);

  // handling cart items after login
  useEffect(() => {
    if (!user) return;
    if (!keepItems && !transferItems && !productsToMerge) return;
    // user wants clean cart after login
    if (!keepItems && !transferItems) {
      clearCart();
    }
    // user wants users cart to merge with main
    if (keepItems && transferItems && productsToMerge) {
      productsToMerge?.forEach((product) => {
        setProductWithQty(product, (product as Product & { qty: number }).qty);
      });
    }
    // user wants to keep the guests/main cart(cart will stay as it is)
    if (keepItems && productsToMerge) return;
    // user wants only users cart -> clear main -> set users to main
    if (transferItems && productsToMerge) {
      clearCart();
      productsToMerge?.forEach((product) => {
        setProductWithQty(product, (product as Product & { qty: number }).qty);
      });
    }
  }, [
    user,
    productsToMerge,
    keepItems,
    transferItems,
    setProductWithQty,
    clearCart,
  ]);

  return (
    <AnimatePresence>
      {isCartOpen && (
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
          id="shopping-cart"
          role="dialog"
          className={`fixed top-0 z-100 flex h-screen w-full text-black outline`}
        >
          {/* CLOSE MODAL TRANSPARENT OVERLAY */}
          <div
            aria-label="Close cart"
            className="h-full w-full bg-black/50"
            onClick={() => closeCart()}
          ></div>
          {/* MODAL */}
          <div className="flex h-full w-full flex-col justify-between bg-white outline md:w-1/2 lg:w-2/7 xl:w-1/4 2xl:w-1/5">
            <div className="flex h-[4vh] w-full items-center justify-between border-b bg-white px-5 text-sm text-black">
              {selectedProducts.length ? <h1>YOUR BAG</h1> : <div></div>}
              <button onClick={() => closeCart()} className="cursor-pointer">
                [ CLOSE ]
              </button>
            </div>
            {/* CART CONTENT AND CHECKOUT BUTTON - IF PRODUCTS ARE IN CART */}
            {selectedProducts.length > 0 ? (
              <div className="flex h-[96vh] flex-col">
                <h1 className="flex h-[4vh] items-center justify-center border-b text-xs md:text-sm">
                  FREE SHIPPING ON ORDERS ABOVE 100$
                </h1>
                {/* CART ITEMS */}
                <section
                  aria-label="Your cart items"
                  className="h-[60vh] overflow-y-auto"
                >
                  {selectedProducts.map(({ product, qty }) => (
                    <CartProductCard
                      product={product}
                      key={product.id}
                      qty={qty}
                    />
                  ))}
                </section>
                {/* RECOMMENDED */}
                <section aria-label="Recommended items" className="h-[21vh]">
                  <h1 className="flex h-[3vh] items-center pl-2 text-sm">
                    MORE PRODUCTS YOU MIGHT LIKE
                  </h1>
                  <div className="flex h-full">
                    {loadingProducts && (
                      <div className="relative flex h-full w-full items-center justify-center bg-yellow-50">
                        <SimpleLoader loaderText="LOADING PRODUCTS" />
                      </div>
                    )}
                    {errorProducts && <div>{errorProducts.message}</div>}
                    {recommendedProducts
                      ?.slice(0, 3) // NEED UPDATE 2/2
                      .map((product) => (
                        <RecommendedCard
                          height={18} // passed in VH units
                          product={product}
                          key={product.id}
                        />
                      ))}
                  </div>
                </section>
                {/* TOTAL */}
                <div className="flex h-[3vh] items-center justify-center gap-2 border-t">
                  <h1 className="text-sm">YOUR TOTAL IS:</h1>
                  <span className="font-semibold">
                    {selectedProducts
                      .reduce((sum, item) => {
                        return sum + item.product.price * item.qty;
                      }, 0)
                      .toFixed(2)}
                    $
                  </span>
                </div>
                <button className="h-[8vh] w-full cursor-pointer bg-black/90 text-white">
                  <Link to={"/about"}>CHECK OUT</Link>
                </button>
              </div>
            ) : (
              // EMPTY CART
              <div className="flex h-full flex-col items-center justify-center gap-30">
                <div className="w-full text-center">
                  <p>YOUR CART IS EMPTY</p>
                  <button
                    className="mt-5 w-1/2 cursor-pointer rounded-lg bg-black py-2 text-white"
                    onClick={handleStartShopping}
                  >
                    START SHOPPING
                  </button>
                </div>
                {/* EMPTY CART && NOT LOGGED IN */}
                {!user && (
                  <div className="w-full text-center">
                    <p>
                      HAVE AN ACCOUNT?
                      <br />
                      LOG IN TO CHECK OUT FASTER
                    </p>
                    <button
                      className="mt-5 w-1/2 cursor-pointer rounded-lg bg-black py-2 text-white"
                      onClick={handleLogin}
                    >
                      LOG IN
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
