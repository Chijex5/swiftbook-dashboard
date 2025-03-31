import React from "react";
import { Book, ShoppingCart, Heart, TrendingUp, Bell } from "lucide-react";
import { StatisticsCard } from "./StatisticsCard";
import { BooksList } from "./BooksList";
import { OffersSection } from "./OffersSection";
import { motion } from "framer-motion";
import { useData } from "../context/DataContext";
export function UserDashboard() {
  const {
    profile
  } = useData();
  return <main className="min-h-screen bg-gray-50">
      <div className="max-w-[1600px] mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {profile.fullName.split(" ")[0]}! 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Check out our latest book collection
            </p>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              3
            </span>
          </button>
        </div>
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.1
          }}>
              <StatisticsCard title="Monthly Spent" value="$245.50" change="+12.5%" icon={<TrendingUp className="w-6 h-6 text-purple-600" />} chart={[35, 60, 25, 65, 45, 75, 55]} />
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }}>
              <StatisticsCard title="Books Purchased" value="12" change="+3" icon={<Book className="w-6 h-6 text-blue-600" />} chart={[45, 30, 60, 25, 45, 65, 45]} />
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3
          }}>
              <StatisticsCard title="Wishlist" value="5" change="+2" icon={<Heart className="w-6 h-6 text-pink-600" />} chart={[25, 45, 55, 35, 55, 45, 65]} />
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }}>
              <StatisticsCard title="Active Orders" value="2" change="0" icon={<ShoppingCart className="w-6 h-6 text-green-600" />} chart={[55, 45, 35, 55, 35, 45, 25]} />
            </motion.div>
          </div>
          <div className="space-y-8">
            <OffersSection />
            <BooksList />
          </div>
        </div>
      </div>
    </main>;
}