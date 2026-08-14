"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

type OrderItem = {
  name: string;
  quantity: number;
  offerPrice: string;
  image: string;
  total?: number;
};

type Order = {
  order_id: string;
  customer_name: string;
  phone: string;
  delivery_area: string;
  address: string;
  payment_method: string;
  items: OrderItem[];
  subtotal: number;
  delivery_charge: number;
  total: number;
  status: string;
  created_at: string;
};

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchOrder() {
    if (!orderId.trim()) {
      setError("Please enter your Order ID.");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("order_id", orderId.trim())
      .single();

    if (error || !data) {
      setError(
        "Order not found. Please check your Order ID."
      );

      setLoading(false);
      return;
    }

    setOrder(data as Order);
    setLoading(false);
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleString("en-BD", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  function isActive(status: string, step: string) {
    const steps = [
      "Pending",
      "Confirmed",
      "Processing",
      "Shipped",
      "Delivered",
    ];

    const currentIndex = steps.indexOf(status);
    const stepIndex = steps.indexOf(step);

    if (currentIndex === -1) {
      return step === "Pending";
    }

    return stepIndex <= currentIndex;
  }

  return (
    <main className="track-order-page">

      <div className="track-order-container">

        <h1>
          Track Your Order
        </h1>

        <p>
          Enter your Order ID to check your order status.
        </p>

        {/* SEARCH */}

        <div className="track-search">

          <input
            type="text"
            value={orderId}
            onChange={(event) =>
              setOrderId(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                searchOrder();
              }
            }}
            placeholder="Example: FS-123456789"
          />

          <button
            onClick={searchOrder}
            disabled={loading}
          >
            {loading
              ? "Searching..."
              : "Track Order"}
          </button>

        </div>

        {/* ERROR */}

        {error && (
          <p className="track-error">
            {error}
          </p>
        )}

        {/* ORDER RESULT */}

        {order && (
          <section className="tracking-result">

            {/* HEADER */}

            <div className="tracking-header">

              <div>

                <h2>
                  Order Details
                </h2>

                <p>
                  Order ID: {order.order_id}
                </p>

              </div>

              <span className="order-status">
                {order.status}
              </span>

            </div>

            {/* CUSTOMER INFORMATION */}

            <div className="tracking-info">

              <div>
                <span>
                  Customer
                </span>

                <strong>
                  {order.customer_name}
                </strong>
              </div>

              <div>
                <span>
                  Phone
                </span>

                <strong>
                  {order.phone}
                </strong>
              </div>

              <div>
                <span>
                  Delivery Area
                </span>

                <strong>
                  {order.delivery_area}
                </strong>
              </div>

              <div>
                <span>
                  Order Date
                </span>

                <strong>
                  {formatDate(order.created_at)}
                </strong>
              </div>

            </div>

            {/* ADDRESS */}

            <div className="tracking-address">

              <span>
                Delivery Address
              </span>

              <p>
                {order.address}
              </p>

            </div>

            {/* PAYMENT */}

            <div className="tracking-address">

              <span>
                Payment Method
              </span>

              <p>
                {order.payment_method}
              </p>

            </div>

            {/* PRODUCTS */}

            <h3>
              Products
            </h3>

            <div className="tracking-products">

              {order.items &&
                order.items.map(
                  (item, index) => {

                    const price = Number(
                      item.offerPrice.replace(
                        /[^0-9]/g,
                        ""
                      )
                    );

                    const itemTotal =
                      item.total ??
                      price * item.quantity;

                    return (
                      <div
                        className="tracking-product"
                        key={index}
                      >

                        <img
                          src={item.image}
                          alt={item.name}
                        />

                        <div>

                          <h4>
                            {item.name}
                          </h4>

                          <p>
                            Quantity:{" "}
                            {item.quantity}
                          </p>

                          <p>
                            Price:{" "}
                            {item.offerPrice}
                          </p>

                        </div>

                        <strong>
                          {itemTotal} Tk
                        </strong>

                      </div>
                    );
                  }
                )}

            </div>

            {/* SUMMARY */}

            <div className="tracking-summary">

              <div>

                <span>
                  Subtotal
                </span>

                <strong>
                  {order.subtotal} Tk
                </strong>

              </div>

              <div>

                <span>
                  Delivery
                </span>

                <strong>
                  {order.delivery_charge} Tk
                </strong>

              </div>

              <div className="tracking-total">

                <span>
                  Total
                </span>

                <strong>
                  {order.total} Tk
                </strong>

              </div>

            </div>

            {/* ORDER PROGRESS */}

            <div className="tracking-progress">

              <div
                className={
                  isActive(
                    order.status,
                    "Pending"
                  )
                    ? "progress-step active"
                    : "progress-step"
                }
              >

                <span>
                  1
                </span>

                <p>
                  Pending
                </p>

              </div>

              <div
                className={
                  isActive(
                    order.status,
                    "Confirmed"
                  )
                    ? "progress-step active"
                    : "progress-step"
                }
              >

                <span>
                  2
                </span>

                <p>
                  Confirmed
                </p>

              </div>

              <div
                className={
                  isActive(
                    order.status,
                    "Processing"
                  )
                    ? "progress-step active"
                    : "progress-step"
                }
              >

                <span>
                  3
                </span>

                <p>
                  Processing
                </p>

              </div>

              <div
                className={
                  isActive(
                    order.status,
                    "Shipped"
                  )
                    ? "progress-step active"
                    : "progress-step"
                }
              >

                <span>
                  4
                </span>

                <p>
                  Shipped
                </p>

              </div>

              <div
                className={
                  isActive(
                    order.status,
                    "Delivered"
                  )
                    ? "progress-step active"
                    : "progress-step"
                }
              >

                <span>
                  5
                </span>

                <p>
                  Delivered
                </p>

              </div>

            </div>

          </section>
        )}

      </div>

    </main>
  );
}