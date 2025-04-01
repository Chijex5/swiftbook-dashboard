import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { UserDashboard } from "./UserDashboard";
import { MobileNavigation } from "./MobileNavigation";
import { BooksPage } from "../pages/BooksPage";
import { WishlistPage } from "../pages/WishlistPage";
import { ProfilePage } from "../pages/ProfilePage";
import { useData } from "../context/DataContext";
import { NotificationsPage } from "../pages/NotificationsPage";
import { CartPage } from "../pages/CartPage";
import { SettingsPage } from "../pages/SettingsPage";
import { Toaster } from "react-hot-toast";
import { TrackOrderPage } from "../pages/TrackOrderPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { jwtDecode } from "jwt-decode";
import { WelcomeConfetti } from "./WelcomeConfetti";
import axios from "axios";

interface JwtPayload {
  exp: number;
  sub: {
    userId: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    department: string;
    level: string;
    avatar?: string;
  };
}

type UserProfile = {
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  department: string;
  level: string;
  avatar?: string;
};

export function Layout() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { isCheckingAuth } = useData();
  const url = 'http://unibooks.local:5173/'
  const prodUrl = "https://online-textbook-ordering-system-ai41.vercel.app/auth"
  const baseUrl = 'http://127.0.0.1:5000';
  const baseUrl1 = 'https://backend2-opvr.onrender.com';

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     setIsCheckingAuth(true);
  //     let token: string | null = null;
  //     const queryParams = new URLSearchParams(window.location.search);
  //     const urlUserId = queryParams.get("userId");
  
  //     try {
  //       // Handle URL user ID case
  //       if (urlUserId) {
  //         try {
  //           const response = await axios.get(`${baseUrl}/api/users/${urlUserId}`);
  //           localStorage.setItem("token", response.data.token);
  //           token = response.data.token;
  //           window.history.replaceState(null, "", window.location.pathname);
  //         } catch (error) {
  //           console.error("Invalid user ID or network error:", error);
  //           throw new Error("Invalid authentication token");
  //         }
  //       } else {
  //         // Check localStorage for existing token
  //         token = localStorage.getItem("token");
  //       }
  
  //       // Final check if token is still missing
  //       if (!token) {
  //         throw new Error("No authentication token found");
  //       }
  
  //       // Token validation
  //       const decoded = jwtDecode<{
  //         userId: string;
  //         fullName: string;
  //         email: string;
  //         phone?: string;
  //         address?: string;
  //         department?: string;
  //         level?: string;
  //         avatar?: string;
  //         hasWelcomed?: boolean;
  //         exp: number;
  //       }>(token);
  
  //       // Check token expiration
  //       if (Date.now() / 1000 > decoded.exp) {
  //         throw new Error("Token expired");
  //       }
  
  //       // Update user profile
  //       const userData = {
  //         userId: decoded.userId,
  //         fullName: decoded.fullName,
  //         email: decoded.email,
  //         phone: decoded.phone || "",
  //         address: decoded.address || "",
  //         department: decoded.department || "",
  //         level: decoded.level || "",
  //         hasWelcomed: decoded.hasWelcomed || false,
  //       };
  //       setProfile(userData);
  //       localStorage.setItem("currentUser", JSON.stringify(userData));
  
  //     } catch (error) {
  //       console.error("Authentication error:", error);
  //       localStorage.removeItem("token");
  //       localStorage.removeItem("currentUser");
  //       window.location.href = url;
  //     } finally {
  //       setIsCheckingAuth(false);
  //     }
  //   };
  
  //   checkAuth();
  // }, []);




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
        <WelcomeConfetti />
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