"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const subtotal = cart.reduce((total, product) => {
    const price = Number(
      product.offerPrice.replace(/[^0-9]/g, "")
    );

    return total + price * product.quantity;
  }, 0);

  const deliveryCharge = cart.length > 0 ? 100 : 0;

  const grandTotal = subtotal + deliveryCharge;

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!customerName || !phone || !area || !address) {
      alert("Please fill in all required fields.");
      return;
    }

    // Generate Order ID
    const newOrderId = `FS-${Date.now()}`;

    // Prepare products for database
    const orderItems = cart.map((product) => {
      const price = Number(
        product.offerPrice.replace(/[^0-9]/g, "")
      );

      return {
        name: product.name,
        quantity: product.quantity,
        offerPrice: product.offerPrice,
        regularPrice: product.regularPrice,
        image: product.image,
        total: price * product.quantity,
      };
    });

    try {
      // Save order to Supabase
      const { error } = await supabase
        .from("orders")
        .insert([
          {
            order_id: newOrderId,
            customer_name: customerName,
            phone: phone,
            delivery_area: area,
            address: address,
            payment_method: paymentMethod,
            items: orderItems,
            subtotal: subtotal,
            delivery_charge: deliveryCharge,
            total: grandTotal,
            status: "Pending",
          },
        ]);

      // If Supabase gives an error
      if (error) {
        console.error(
          "Supabase Order Error:",
          error
        );

        alert(
          "Order could not be saved. Please try again."
        );

        return;
      }

      // Prepare WhatsApp product list
      const orderItemsText = cart
        .map((product, index) => {
          const price = Number(
            product.offerPrice.replace(
              /[^0-9]/g,
              ""
            )
          );

          const itemTotal =
            price * product.quantity;

          return `${index + 1}. ${product.name} × ${
            product.quantity
          }
Price: ${itemTotal} Tk`;
        })
        .join("\n\n");

      // WhatsApp message
      const message = `🛍️ NEW ORDER

🆔 Order ID: ${newOrderId}

👤 Customer: ${customerName}
📞 Phone: ${phone}

📦 ORDER DETAILS

${orderItemsText}

🚚 Delivery: ${area}
💰 Delivery Charge: ${deliveryCharge} Tk

💵 TOTAL: ${grandTotal} Tk

💳 Payment: ${paymentMethod}

📍 Address:
${address}`;

      // Configure the store WhatsApp number in .env.local.
      const whatsappNumber =
        process.env.NEXT_PUBLIC_WHATSAPP_ORDER_NUMBER;

      if (!whatsappNumber) {
        alert(
          "WhatsApp order number is not configured."
        );
        return;
      }

      const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=` +
        encodeURIComponent(message);

      // Open WhatsApp
      window.open(
        whatsappURL,
        "_blank"
      );

      // Save Order ID in state
      setOrderId(newOrderId);

      // Clear cart
      clearCart();

      // Show confirmation
      setOrderPlaced(true);

    } catch (error) {
      console.error(
        "Order Error:",
        error
      );

      alert(
        "Something went wrong. Please try again."
      );
    }
  }

  // Empty cart
  if (cart.length === 0 && !orderPlaced) {
    return (
      <main className="checkout-page">

        <h1>Checkout</h1>

        <p>
          Your cart is empty.
        </p>

        <Link href="/">
          <button>
            Continue Shopping
          </button>
        </Link>

      </main>
    );
  }

  // Order successful
  if (orderPlaced) {
    return (
      <main className="order-success">

        <div className="success-box">

          <div className="success-icon">
            ✓
          </div>

          <h1>
            Order Placed Successfully!
          </h1>

          <p>
            Thank you, {customerName}.
          </p>

          <p>
            Your order has been received.
          </p>

          <div className="success-details">

            <p>
              <strong>
                Order ID:
              </strong>{" "}
              {orderId}
            </p>

            <p>
              <strong>
                Customer:
              </strong>{" "}
              {customerName}
            </p>

            <p>
              <strong>
                Phone:
              </strong>{" "}
              {phone}
            </p>

            <p>
              <strong>
                Delivery:
              </strong>{" "}
              {area}
            </p>

            <p>
              <strong>
                Payment:
              </strong>{" "}
              {paymentMethod}
            </p>

            <p>
              <strong>
                Total:
              </strong>{" "}
              {grandTotal} Tk
            </p>

          </div>

          <p>
            Your order details have been
            sent to WhatsApp.
          </p>

          <Link href="/">
            <button className="continue-btn">
              Continue Shopping
            </button>
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="checkout-page">

      <h1>Checkout</h1>

      <div className="checkout-container">

        {/* CUSTOMER INFORMATION */}

        <section className="checkout-form">

          <h2>
            Customer Information
          </h2>

          <form onSubmit={handleSubmit}>

            <label>
              Full Name *
            </label>

            <input
              type="text"
              value={customerName}
              onChange={(event) =>
                setCustomerName(
                  event.target.value
                )
              }
              placeholder="Enter your full name"
              required
            />

            <label>
              Phone Number *
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(event) =>
                setPhone(
                  event.target.value
                )
              }
              placeholder="01XXXXXXXXX"
              required
            />

            <label>
              Delivery Area *
            </label>

            <select
              value={area}
              onChange={(event) =>
                setArea(
                  event.target.value
                )
              }
              required
            >
              <option value="">
                Select Delivery Area
              </option>

              <option value="Inside Dhaka">
                Inside Dhaka
              </option>

              <option value="Outside Dhaka">
                Outside Dhaka
              </option>
            </select>

            <label>
              Full Address *
            </label>

            <textarea
              value={address}
              onChange={(event) =>
                setAddress(
                  event.target.value
                )
              }
              placeholder="House, Road, Area, District"
              rows={5}
              required
            />

            <h2>
              Payment Method
            </h2>

            {/* Cash on Delivery */}

            <div className="payment-option">

              <label>

                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  checked={
                    paymentMethod ===
                    "Cash on Delivery"
                  }
                  onChange={(event) =>
                    setPaymentMethod(
                      event.target.value
                    )
                  }
                />

                Cash on Delivery

              </label>

            </div>

            {/* bKash */}

            <div className="payment-option">

              <label>

                <input
                  type="radio"
                  name="payment"
                  value="bKash"
                  checked={
                    paymentMethod === "bKash"
                  }
                  onChange={(event) =>
                    setPaymentMethod(
                      event.target.value
                    )
                  }
                />

                bKash

              </label>

            </div>

            {/* Nagad */}

            <div className="payment-option">

              <label>

                <input
                  type="radio"
                  name="payment"
                  value="Nagad"
                  checked={
                    paymentMethod === "Nagad"
                  }
                  onChange={(event) =>
                    setPaymentMethod(
                      event.target.value
                    )
                  }
                />

                Nagad

              </label>

            </div>

            <button
              type="submit"
              className="place-order-btn"
            >
              Place Order
            </button>

          </form>

        </section>

        {/* ORDER SUMMARY */}

        <section className="checkout-summary">

          <h2>
            Your Order
          </h2>

          {cart.map((product, index) => {

            const price = Number(
              product.offerPrice.replace(
                /[^0-9]/g,
                ""
              )
            );

            const itemTotal =
              price * product.quantity;

            return (
              <div
                className="checkout-item"
                key={index}
              >

                <img
                  src={product.image}
                  alt={product.name}
                />

                <div>

                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    {product.quantity} ×{" "}
                    {product.offerPrice}
                  </p>

                  <strong>
                    {itemTotal} Tk
                  </strong>

                </div>

              </div>
            );
          })}

          <hr />

          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <span>
              {subtotal} Tk
            </span>

          </div>

          <div className="summary-row">

            <span>
              Delivery
            </span>

            <span>
              {deliveryCharge} Tk
            </span>

          </div>

          <div className="summary-total">

            <span>
              Total
            </span>

            <span>
              {grandTotal} Tk
            </span>

          </div>

        </section>

      </div>

    </main>
  );
}