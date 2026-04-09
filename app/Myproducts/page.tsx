"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function MyOrders() {
  const { user } = useUser();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = () => {
      fetch(`/api/orders/${user.id}`)
        .then((res) => res.json())
        .then(setOrders);
    };

    fetchOrders();

    const interval = setInterval(fetchOrders, 5000); // tiempo real simple

    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="bg-white p-4 mb-4 rounded shadow">
          <p className="font-bold">Status: {order.status}</p>
          <p>Total: ${order.total}</p>

          {order.items.map((item: any, i: number) => (
            <p key={i}>
              {item.name} x{item.quantity}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}