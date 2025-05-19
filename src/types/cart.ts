import { Product } from "./product";

export interface UseCartStoreInterface {
  selectedProducts: { product: Product; qty: number }[];
  setProduct: (product: Product) => void;
  setProductWithQty: (product: Product, qty: number) => void;
  incrementProductQty: (productId: number) => void;
  decrementProductQty: (productId: number) => void;
  removeProduct: (productId: number) => void;
  clearCart: () => void;
}

export interface UseIsCartOpenStoreInterface {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

export interface UseTransferCartStoreInterface {
  keepItems: boolean;
  transferItems: boolean;
  setKeepItems: (value: boolean) => void;
  setTransferItems: (value: boolean) => void;
}

//used to get only id and qty from users cart, which provides incomplete object,
//these products are then fetched correctly into cart when user wants to transfer them trought carts
export interface CartProductSummary {
  id: number;
  quantity: 3;
}
