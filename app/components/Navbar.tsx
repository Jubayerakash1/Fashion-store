"use client";

import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="navbar">

      <h1>
        FASHION STORE
      </h1>

      <div>

        <a href="/">
          Home
        </a>

        <a href="/">
          Shop
        </a>

        <a href="/">
          About
        </a>

        <a href="/">
          Contact
        </a>

        <a href="/track-order">
          Track Order
        </a>

        <a href="/cart">
          Cart ({cart.length})
        </a>

      </div>

    </nav>
  );
}