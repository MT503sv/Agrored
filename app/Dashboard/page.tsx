"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { name: "Jan", sales: 25 },
  { name: "Feb", sales: 35 },
  { name: "Mar", sales: 55 },
  { name: "Apr", sales: 40 },
  { name: "May", sales: 90 },
  { name: "Jun", sales: 120 },
];

const stats = [
  { label: "Active Sales", value: 25 },
  { label: "Pending Orders", value: 10 },
  { label: "Revenue", value: "$15,000" },
];

const orders = [
  { id: "#1027", amount: "$156", date: "17/09/25", status: "Pending" },
  { id: "#1027", amount: "$150", date: "11/09/25", status: "Pending" },
  { id: "#1027", amount: "$84", date: "23/08/25", status: "Completed" },
];

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-white shadow-md p-6 space-y-2 border">
      <p className="text-gray-500 text-sm">{label}</p>
      <h2 className="text-3xl font-bold text-black">{value}</h2>
    </div>
  );
}


function OrdersTable() {
  return (
    <div className="rounded-xl bg-white shadow-md p-6 border">
      <h3 className="text-lg font-semibold mb-4 text-black">Recent Orders</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500 text-left">
            <th className="pb-2">Order ID</th>
            <th className="pb-2">Amount</th>
            <th className="pb-2">Date</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y text-black">
          {orders.map((order, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td>{order.id}</td>
              <td>{order.amount}</td>
              <td>{order.date}</td>
              <td
                className={`font-medium ${
                  order.status === "Pending"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="p-10 md:p-16 grid gap-8 min-h-screen bg-gray-100">
      
      <h1 className="text-4xl font-bold text-black">Dashboard</h1>

     
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
  
        <div className="rounded-xl bg-white shadow-md p-6 border">
          <h3 className="text-lg font-semibold mb-4 text-black">
            Sales Overview
          </h3>

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
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>


        <OrdersTable />
      </div>
    </div>
  );
}