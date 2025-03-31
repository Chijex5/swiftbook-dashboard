import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, User, BookOpen, Heart, ShoppingCart, Bell, Settings } from "lucide-react";
import { useCart } from "../context/CartContext";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: BookOpen, label: "Books", path: "/books" },
  { icon: Heart, label: "Wishlist", path: "/wishlist" },
  { icon: ShoppingCart, label: "Cart", path: "/cart" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: User, label: "Profile", path: "/profile" }
];

export function Navigation({ className = "" }) {
  const { items, wishlistItems } = useCart();
  const cartCount = Object.keys(items).length;
  const wishlistCount = wishlistItems.size;

  return (
    <nav className={`w-64 bg-white border-r shadow-md ${className}`}>
      {/* Logo & Branding */}
      <div className="p-6 flex flex-col items-center">
        <img src='/logo.svg' alt="Logo" className="w-16 h-16 mb-2" />
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-500 to-indigo-600 text-transparent bg-clip-text">
          BookSwift
        </h1>
      </div>

      {/* Navigation Items */}
      <div className="px-3">
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2 rounded-lg mb-1 transition-all duration-200 
              ${isActive ? "bg-purple-50 text-purple-600 font-semibold" : "text-gray-600 hover:bg-gray-50"}`
            }
          >
            <div className="flex items-center space-x-3">
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </div>
            {path === "/cart" && cartCount > 0 && (
              <span className="bg-purple-100 text-purple-600 text-xs font-medium px-2 py-1 rounded-full">
                {cartCount}
              </span>
            )}
            {path === "/wishlist" && wishlistCount > 0 && (
              <span className="bg-pink-100 text-pink-600 text-xs font-medium px-2 py-1 rounded-full">
                {wishlistCount}
              </span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Settings */}
      <div className="absolute bottom-0 w-64 p-6 border-t">
        <NavLink to="/settings" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>
      </div>
    </nav>
  );
}
