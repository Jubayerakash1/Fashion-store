"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

type OrderItem = {
  name: string;
  quantity: number;
  offerPrice: string;
  regularPrice: string;
  image: string;
  total: number;
};

type Order = {
  id: number;
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

export default function AdminPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  async function fetchOrders() {
    setLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Orders Fetch Error:",
        error
      );

      setLoading(false);
      return;
    }

    setOrders(data || []);
    setLoading(false);
  }

  useEffect(() => {
    const isAdmin =
      sessionStorage.getItem("fashion_admin");

    if (isAdmin !== "true") {
      router.push("/admin-login");
      return;
    }

    fetchOrders();
  }, [router]);

  async function updateStatus(
    id: number,
    status: string
  ) {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error(
        "Status Update Error:",
        error
      );

      alert(
        "Could not update order status."
      );

      return;
    }

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === id
          ? {
              ...order,
              status,
            }
          : order
      )
    );

    setSelectedOrder((currentOrder) => {
      if (
        currentOrder &&
        currentOrder.id === id
      ) {
        return {
          ...currentOrder,
          status,
        };
      }

      return currentOrder;
    });
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleString(
      "en-BD",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  }

  function logout() {
    sessionStorage.removeItem(
      "fashion_admin"
    );

    router.push("/admin-login");
  }

  return (
    <main className="admin-page">

      {/* HEADER */}

      <div className="admin-header">

        <div>
          <h1>
            Admin Dashboard
          </h1>

          <p>
            Manage your Fashion Store orders
          </p>
        </div>

        <div className="admin-header-actions">

          <button
            onClick={fetchOrders}
            className="refresh-btn"
          >
            Refresh Orders
          </button>

          <button
            onClick={logout}
            className="logout-btn"
          >
            Logout
          </button>

        </div>

      </div>

      {/* STATISTICS */}

      <div className="admin-stats">

        <div className="stat-card">
          <h3>
            Total Orders
          </h3>

          <strong>
            {orders.length}
          </strong>
        </div>

        <div className="stat-card">
          <h3>
            Pending
          </h3>

          <strong>
            {
              orders.filter(
                (order) =>
                  order.status ===
                  "Pending"
              ).length
            }
          </strong>
        </div>

        <div className="stat-card">
          <h3>
            Confirmed
          </h3>

          <strong>
            {
              orders.filter(
                (order) =>
                  order.status ===
                  "Confirmed"
              ).length
            }
          </strong>
        </div>

        <div className="stat-card">
          <h3>
            Delivered
          </h3>

          <strong>
            {
              orders.filter(
                (order) =>
                  order.status ===
                  "Delivered"
              ).length
            }
          </strong>
        </div>

      </div>

      {/* ORDERS */}

      <section className="orders-section">

        <h2>
          Orders
        </h2>

        {loading ? (
          <p>
            Loading orders...
          </p>
        ) : orders.length === 0 ? (
          <p>
            No orders found.
          </p>
        ) : (
          <div className="orders-table-wrapper">

            <table className="orders-table">

              <thead>

                <tr>

                  <th>
                    Order ID
                  </th>

                  <th>
                    Customer
                  </th>

                  <th>
                    Phone
                  </th>

                  <th>
                    Total
                  </th>

                  <th>
                    Payment
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Date
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {orders.map(
                  (order) => (
                    <tr
                      key={order.id}
                    >

                      <td>
                        <strong>
                          {
                            order.order_id
                          }
                        </strong>
                      </td>

                      <td>
                        {
                          order.customer_name
                        }
                      </td>

                      <td>
                        {order.phone}
                      </td>

                      <td>
                        <strong>
                          {order.total} Tk
                        </strong>
                      </td>

                      <td>
                        {
                          order.payment_method
                        }
                      </td>

                      <td>

                        <select
                          value={
                            order.status
                          }
                          onChange={(
                            event
                          ) =>
                            updateStatus(
                              order.id,
                              event.target
                                .value
                            )
                          }
                        >

                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Confirmed">
                            Confirmed
                          </option>

                          <option value="Processing">
                            Processing
                          </option>

                          <option value="Shipped">
                            Shipped
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>

                        </select>

                      </td>

                      <td>
                        {formatDate(
                          order.created_at
                        )}
                      </td>

                      <td>

                        <button
                          className="view-order-btn"
                          onClick={() =>
                            setSelectedOrder(
                              order
                            )
                          }
                        >
                          View
                        </button>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </section>

      {/* ORDER DETAILS MODAL */}

      {selectedOrder && (
        <div
          className="order-modal-overlay"
          onClick={() =>
            setSelectedOrder(null)
          }
        >

          <div
            className="order-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <h2>
                  Order Details
                </h2>

                <p>
                  {
                    selectedOrder.order_id
                  }
                </p>

              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setSelectedOrder(null)
                }
              >
                ×
              </button>

            </div>

            {/* CUSTOMER INFORMATION */}

            <div className="order-detail-section">

              <h3>
                Customer Information
              </h3>

              <div className="detail-grid">

                <div>
                  <span>
                    Name
                  </span>

                  <strong>
                    {
                      selectedOrder.customer_name
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Phone
                  </span>

                  <strong>
                    {
                      selectedOrder.phone
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Delivery Area
                  </span>

                  <strong>
                    {
                      selectedOrder.delivery_area
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Payment
                  </span>

                  <strong>
                    {
                      selectedOrder.payment_method
                    }
                  </strong>
                </div>

              </div>

              <div className="address-box">

                <span>
                  Delivery Address
                </span>

                <p>
                  {
                    selectedOrder.address
                  }
                </p>

              </div>

            </div>

            {/* PRODUCTS */}

            <div className="order-detail-section">

              <h3>
                Products
              </h3>

              <div className="modal-products">

                {selectedOrder.items?.map(
                  (item, index) => (
                    <div
                      className="modal-product"
                      key={index}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="modal-product-info">

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
                        {item.total} Tk
                      </strong>

                    </div>
                  )
                )}

              </div>

            </div>

            {/* ORDER SUMMARY */}

            <div className="order-detail-section">

              <h3>
                Order Summary
              </h3>

              <div className="modal-summary-row">

                <span>
                  Subtotal
                </span>

                <span>
                  {
                    selectedOrder.subtotal
                  }{" "}
                  Tk
                </span>

              </div>

              <div className="modal-summary-row">

                <span>
                  Delivery
                </span>

                <span>
                  {
                    selectedOrder.delivery_charge
                  }{" "}
                  Tk
                </span>

              </div>

              <div className="modal-summary-total">

                <span>
                  Total
                </span>

                <strong>
                  {
                    selectedOrder.total
                  }{" "}
                  Tk
                </strong>

              </div>

            </div>

            {/* STATUS */}

            <div className="modal-status">

              <label>
                Order Status
              </label>

              <select
                value={
                  selectedOrder.status
                }
                onChange={(event) =>
                  updateStatus(
                    selectedOrder.id,
                    event.target.value
                  )
                }
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="Confirmed">
                  Confirmed
                </option>

                <option value="Processing">
                  Processing
                </option>

                <option value="Shipped">
                  Shipped
                </option>

                <option value="Delivered">
                  Delivered
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>

              </select>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}