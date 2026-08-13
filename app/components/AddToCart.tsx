"use client";

import { useCart } from "../context/CartContext";

type Product = {
  name: string;
  offerPrice: string;
  regularPrice: string;
  image: string;
};

export default function AddToCart({
  product,
}: {
  product: Product;
}) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart(product);
  }

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}