"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Product = {
  name: string;
  offerPrice: string;
  regularPrice: string;
  image: string;
};

type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  increaseQuantity: (index: number) => void;
  decreaseQuantity: (index: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add product to cart
  function addToCart(product: Product) {
    setCart((currentCart) => {
      const existingIndex = currentCart.findIndex(
        (item) => item.name === product.name
      );

      // If product already exists, increase quantity
      if (existingIndex !== -1) {
        return currentCart.map((item, index) =>
          index === existingIndex
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      // Otherwise add new product
      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }

  // Increase quantity
  function increaseQuantity(index: number) {
    setCart((currentCart) =>
      currentCart.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  // Decrease quantity
  function decreaseQuantity(index: number) {
    setCart((currentCart) =>
      currentCart
        .map((item, i) =>
          i === index
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Remove product completely
  function removeFromCart(index: number) {
    setCart((currentCart) =>
      currentCart.filter((_, i) => i !== index)
    );
  }

  // Clear entire cart after order
  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}