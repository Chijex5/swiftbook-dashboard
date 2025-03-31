import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
export function CheckoutSuccess({
  orderId
}: {
  orderId: string;
}) {
  const navigate = useNavigate();
  const {
    profile
  } = useData();
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0
    };
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2
        },
        colors: ["#9333EA", "#A855F7", "#7E22CE"]
      });
      confetti({
        ...defaults,
        particleCount,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2
        },
        colors: ["#9333EA", "#A855F7", "#7E22CE"]
      });
    }, 250);
    return () => clearInterval(interval);
  }, []);
  return <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl p-8 text-center max-w-md">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Thank you for your purchase! 🎉
        </h2>
        <p className="text-gray-600 mb-6">
          Hi {profile.fullName.split(" ")[0]}, your order has been confirmed.
          Your order ID is{" "}
          <span className="font-medium text-purple-600">{orderId}</span>
        </p>
        <div className="space-y-3">
          <button onClick={() => navigate(`/track-order/${orderId}`)} className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700">
            Track Order
          </button>
          <button onClick={() => navigate("/")} className="w-full border border-purple-600 text-purple-600 py-3 rounded-lg hover:bg-purple-50">
            Back to Home
          </button>
        </div>
      </div>
    </div>;
}