import React from "react";
import { BookOpen } from "lucide-react";
export function RecentOrders() {
  const orders = [{
    id: 1,
    code: "CS101",
    title: "Introduction to Programming",
    department: "Computer Science",
    price: 79.99,
    status: "Delivered"
  }, {
    id: 2,
    code: "MATH201",
    title: "Advanced Calculus",
    department: "Mathematics",
    price: 89.99,
    status: "Processing"
  }, {
    id: 3,
    code: "PHY301",
    title: "Quantum Physics",
    department: "Physics",
    price: 99.99,
    status: "Pending"
  }];
  return <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600 text-sm">
              <th className="pb-4">Course Code</th>
              <th className="pb-4">Title</th>
              <th className="pb-4">Price</th>
              <th className="pb-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => <tr key={order.id} className="border-t">
                <td className="py-4">{order.code}</td>
                <td className="py-4">{order.title}</td>
                <td className="py-4">${order.price}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${order.status === "Delivered" ? "bg-green-100 text-green-800" : order.status === "Processing" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}>
                    {order.status}
                  </span>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
}