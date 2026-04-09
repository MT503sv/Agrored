"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ================= DATA ================= */

const salesData = [
  { name: "August 15th", sales: 300 },
  { name: "August 17th", sales: 180 },
  { name: "August 18th", sales: 320 },
  { name: "August 21st", sales: 210 },
  { name: "August 23rd", sales: 500 },
];

interface Order {
  id: string;
  client: string;
  date: string;
  status: "Sent" | "Delivered" | "In process";
  total: number;
}

const orders: Order[] = [
  { id: "#12345", client: "Hortifrutales del Sur", date: "08/15/2025", status: "Sent", total: 300 },
  { id: "#12346", client: "Campo Verde", date: "08/17/2025", status: "Delivered", total: 180 },
  { id: "#12347", client: "Agroexportaciones Andinas", date: "08/18/2025", status: "In process", total: 320 },
  { id: "#12348", client: "Frutas Tropicales", date: "08/21/2025", status: "Sent", total: 210 },
  { id: "#12349", client: "Cultivos del Norte", date: "08/23/2025", status: "Delivered", total: 500 },
];

/* ================= MAIN PAGE ================= */

export default function OrderManagementPage() {
  const getStatusClasses = (status: Order["status"]) => {
    switch (status) {
      case "Sent":
        return "bg-yellow-100 text-yellow-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "In process":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-200";
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <main className="bg-gray-50 min-h-screen p-10 space-y-10">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-gray-800">
        Control Panel
      </h1>

      {/* ================= TABLE ================= */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Recent Orders
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b text-gray-500 text-left">
                <th className="py-2 px-4">Order ID</th>
                <th className="py-2 px-4">Customer</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4 text-right">Total</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b last:border-none">
                  <td className="py-4 px-4 font-semibold text-gray-800">
                    {order.id}
                  </td>

                  <td className="py-4 px-4 text-gray-600">
                    {order.client}
                  </td>

                  <td className="py-4 px-4 text-gray-500">
                    {order.date}
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right font-medium text-gray-800">
                    ${order.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= GRAPH ================= */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-2">
          Monthly Sales
        </h3>

        <h4 className="text-2xl font-bold mb-4 text-green-700">
          ${totalRevenue}
        </h4>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#55A605"
                strokeWidth={3}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </main>
  );
}