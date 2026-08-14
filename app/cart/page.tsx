"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  // Calculate subtotal
  const subtotal = cart.reduce((total, product) => {
    const price = Number(
      product.offerPrice.replace(/[^0-9]/g, "")
    );

    return total + price * product.quantity;
  }, 0);

  // Delivery charge
  const deliveryCharge = cart.length > 0 ? 100 : 0;

  // Grand total
  const grandTotal = subtotal + deliveryCharge;

  return (
    <main className="cart-page">

      <h1>🛒 Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">

          <p>Your cart is empty.</p>

          <Link href="/">
            <button>Continue Shopping</button>
          </Link>

        </div>
      ) : (
        <>

          {/* Cart Items */}
          <div className="cart-items">

            {cart.map((product, index) => (
              <div
                className="cart-item"
                key={index}
              >

                <img
                  src={product.image}
                  alt={product.name}
                  className="cart-image"
                />

                <div className="cart-info">

                  <h3>{product.name}</h3>

                  <p className="offer">
                    Offer Price: {product.offerPrice}
                  </p>

                  <p className="regular">
                    Regular Price: {product.regularPrice}
                  </p>

                  {/* Quantity */}
                  <div className="quantity-controls">

                    <button
                      onClick={() =>
                        decreaseQuantity(index)
                      }
                    >
                      −
                    </button>

                    <span>
                      {product.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(index)
                      }
                    >
                      +
                    </button>

                  </div>

                  {/* Remove */}
                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeFromCart(index)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))}

          </div>

          {/* Order Summary */}
          <div className="cart-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>

              <span>
                {subtotal} Tk
              </span>
            </div>

            <div className="summary-row">
              <span>Delivery Charge</span>

              <span>
                {deliveryCharge} Tk
              </span>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total</span>

              <span>
                {grandTotal} Tk
              </span>
            </div>

           <Link href="/checkout">
  <button className="checkout-btn">
    Proceed to Checkout
  </button>
</Link>

          </div>

        </>
      )}

    </main>
  );
}