import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Package, Check, Truck, Home } from "lucide-react";
import { useData } from "../context/DataContext";
const orderStatuses = [{
  id: "processing",
  label: "Order Processing",
  icon: Package
}, {
  id: "confirmed",
  label: "Order Confirmed",
  icon: Check
}, {
  id: "shipping",
  label: "Out for Delivery",
  icon: Truck
}, {
  id: "delivered",
  label: "Delivered",
  icon: Home
}];
export function TrackOrderPage() {
  const {
    orderId
  } = useParams();
  const {
    getOrder
  } = useData();
  const order = getOrder(orderId || "");
  if (!order) {
    return <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order Not Found
          </h1>
          <p className="text-gray-600">
            The order you're looking for doesn't exist.
          </p>
        </div>
      </div>;
  }
  const getCurrentStep = () => {
    return orderStatuses.findIndex(status => status.id === order.status);
  };
  return <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Track Order</h1>
        <p className="text-gray-600 mb-8">
          Order ID:{" "}
          <span className="font-medium text-purple-600">{order.id}</span>
        </p>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="space-y-8">
            {orderStatuses.map((status, index) => {
            const isActive = index <= getCurrentStep();
            const StatusIcon = status.icon;
            return <div key={status.id} className="relative">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isActive ? "bg-purple-600" : "bg-gray-200"}`}>
                      <StatusIcon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`} />
                    </div>
                    <div>
                      <h3 className={`font-medium ${isActive ? "text-purple-600" : "text-gray-400"}`}>
                        {status.label}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {isActive ? "Completed" : "Pending"}
                      </p>
                    </div>
                  </div>
                  {index < orderStatuses.length - 1 && <div className={`absolute left-5 top-10 w-0.5 h-12 ${index < getCurrentStep() ? "bg-purple-600" : "bg-gray-200"}`} />}
                </div>;
          })}
          </div>
          <div className="mt-8 p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-600 mb-2">
              Estimated Delivery
            </h4>
            <p className="text-gray-600">
              Your order will arrive within 2-3 business days
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
          <h3 className="text-lg font-semibold mb-4">Order Details</h3>
          <div className="space-y-4">
            {order.items.map(item => <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>)}
            <div className="border-t pt-4">
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}