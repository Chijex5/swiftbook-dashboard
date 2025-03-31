import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { UserDashboard } from "./UserDashboard";
import { MobileNavigation } from "./MobileNavigation";
import { BooksPage } from "../pages/BooksPage";
import { WishlistPage } from "../pages/WishlistPage";
import { ProfilePage } from "../pages/ProfilePage";
import { NotificationsPage } from "../pages/NotificationsPage";
import { CartPage } from "../pages/CartPage";
import { SettingsPage } from "../pages/SettingsPage";
import { Toaster } from "react-hot-toast";
import { TrackOrderPage } from "../pages/TrackOrderPage";
import { CheckoutPage } from "../pages/CheckoutPage";

export function Layout() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get("token");

      if (token) {
        localStorage.setItem("token", token);
        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState(null, "", newUrl);
      }

      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        // Redirect to external login with current URL as redirect param
        window.location.href = `https://external-login.com/login?redirect=${encodeURIComponent(
          window.location.href
        )}`;
        return;
      }

      setIsCheckingAuth(false);
    };

    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Existing layout JSX remains the same */}
      <Navigation className="hidden lg:block" />
      <MobileNavigation
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
      <div className="flex-1 overflow-auto">
        <div className="lg:hidden">
          <button onClick={() => setIsMobileNavOpen(true)} className="p-4 text-gray-600 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <Routes>
           <Route path="/" element={<UserDashboard />} />
           <Route path="/books" element={<BooksPage />} />
           <Route path="/wishlist" element={<WishlistPage />} />
           <Route path="/profile" element={<ProfilePage />} />
           <Route path="/cart" element={<CartPage />} />
           <Route path="/settings" element={<SettingsPage />} />
           <Route path="/notifications" element={<NotificationsPage />} />
           <Route path="/checkout" element={<CheckoutPage />} />
           <Route path="/track-order/:orderId" element={<TrackOrderPage />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}