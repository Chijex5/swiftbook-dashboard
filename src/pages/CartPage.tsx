import React from "react";
import { ShoppingCart, Trash2, ArrowRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
export function CartPage() {
  const navigate = useNavigate();
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();
  const cartItems = Object.values(items);
  const handleRemoveItem = id => {
    removeFromCart(id);
  };
  const handleUpdateQuantity = (id, delta) => {
    updateQuantity(id, delta);
  };
  const handleClearCart = () => {
    clearCart();
  };
  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate("/checkout");
    }
  };
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;
  return <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            <span className="text-sm text-gray-500">
              ({cartItems.length} items)
            </span>
          </div>
          {cartItems.length > 0 && <button onClick={handleClearCart} className="text-red-600 hover:text-red-700 text-sm flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Clear Cart
            </button>}
        </div>
        {cartItems.length === 0 ? <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any books yet
            </p>
            <Link to="/books" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700">
              <ChevronLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
          </div> : <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => <motion.div key={item.id} layout initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: -20
          }} className="bg-white rounded-xl shadow-sm p-4 flex gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ShoppingCart className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.code} - {item.department}
                        </p>
                      </div>
                      <button onClick={() => handleRemoveItem(item.id)} className="text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleUpdateQuantity(item.id, -1)} className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-gray-50">
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button onClick={() => handleUpdateQuantity(item.id, 1)} className="w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-gray-50">
                          +
                        </button>
                      </div>
                      <p className="font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>)}
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (10%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-medium text-gray-900">Total</span>
                    <span className="font-semibold text-gray-900">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
                <button onClick={handleCheckout} className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors">
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link to="/books" className="w-full mt-3 text-center text-sm text-purple-600 hover:text-purple-700 inline-block">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>}
      </div>
    </div>;
}