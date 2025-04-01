import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { useData } from "../context/DataContext";
import axios from "axios";

export function WelcomeConfetti() {
  const { profile, updateProfile } = useData();
  const [showModal, setShowModal] = useState(false);
  const baseUrl = 'http://127.0.0.1:5000'
  const baseUrl1 = 'https://backend2-opvr.onrender.com';

  useEffect(() => {
    // Check if the modal has been closed in this session
    const hasClosedModal = localStorage.getItem("hasClosedWelcomeModal") === "true";
    // Only show modal if profile.hasWelcomed is false AND it hasn't been closed in this session
    const shouldShowModal = profile.hasWelcomed === false && !hasClosedModal;
    setShowModal(shouldShowModal);
  }, [profile.hasWelcomed]);

  const handleClose = async () => {
    // Close the modal immediately
    setShowModal(false);
    // Mark the modal as closed in this session
    localStorage.setItem("hasClosedWelcomeModal", "true");

    // Update profile asynchronously
    const token = localStorage.getItem("token");
    console.log(token)
    if (token) {
      try {
        const response = await axios.post(`${baseUrl}/api/iswelcomed`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        updateProfile({ hasWelcomed: response.data.haswelcomed });
        console.log("Profile updated successfully!", response.data.haswelcomed);
        // If backend confirms welcomed, clear the local flag
        if (response.data.haswelcomed === true) {
          localStorage.removeItem("hasClosedWelcomeModal");
        }
      } catch (error) {
        console.error("Error updating welcome status:", error);
      }
    }
  };

  useEffect(() => {
    if (!showModal) return;
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#9333EA", "#A855F7", "#7E22CE"],
    });

    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#9333EA", "#A855F7", "#7E22CE"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#9333EA", "#A855F7", "#7E22CE"],
      });
    }, 150);

    return () => clearInterval(interval);
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-white rounded-2xl p-8 text-center max-w-md mx-4 shadow-xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close welcome message"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Welcome to BookStore! 🎉
        </h2>

        <p className="text-gray-700 mb-4 text-lg">
          📚 Hi {profile.fullName.split(" ")[0]}, we're thrilled to have you join our reading community!
        </p>

        <div className="space-y-2">
          <p className="text-gray-600">
            Discover curated academic resources and exclusive member benefits!
          </p>
          <p className="text-purple-600 font-medium">
            Start exploring now ➡️
          </p>
        </div>
      </div>
    </div>
  );
}