import React, { useState } from "react";
import { Bell, BookOpen, Heart, Tag, AlertCircle, Check, X } from "lucide-react";
import { motion } from "framer-motion";
const notifications = [{
  id: 1,
  type: "availability",
  title: "Book Now Available",
  message: "Advanced Machine Learning is now back in stock!",
  time: "2 hours ago",
  icon: BookOpen,
  color: "text-green-600",
  bgColor: "bg-green-50"
}, {
  id: 2,
  type: "wishlist",
  title: "Price Drop Alert",
  message: 'A book in your wishlist "Data Structures" has dropped in price',
  time: "5 hours ago",
  icon: Heart,
  color: "text-pink-600",
  bgColor: "bg-pink-50"
}, {
  id: 3,
  type: "offer",
  title: "Special Discount",
  message: "Get 30% off on all Mathematics books this week",
  time: "1 day ago",
  icon: Tag,
  color: "text-purple-600",
  bgColor: "bg-purple-50"
}, {
  id: 4,
  type: "alert",
  title: "Order Update",
  message: "Your order #1234 has been shipped",
  time: "2 days ago",
  icon: AlertCircle,
  color: "text-blue-600",
  bgColor: "bg-blue-50"
}];
export function NotificationsPage() {
  const [showAll, setShowAll] = useState(true);
  return <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          </div>
          <button onClick={() => setShowAll(!showAll)} className="text-sm text-purple-600 hover:text-purple-700">
            {showAll ? "Show Unread" : "Show All"}
          </button>
        </div>
        <div className="space-y-4">
          {notifications.map(notification => <motion.div key={notification.id} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className={`${notification.bgColor} rounded-xl p-4 flex items-start gap-4`}>
              <div className={`p-2 rounded-lg ${notification.bgColor}`}>
                <notification.icon className={`w-5 h-5 ${notification.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {notification.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {notification.message}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-xs text-gray-500">
                    {notification.time}
                  </span>
                  <button className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Mark as read
                  </button>
                </div>
              </div>
            </motion.div>)}
        </div>
      </div>
    </div>;
}