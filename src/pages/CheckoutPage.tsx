import React, { useEffect, useState } from "react";
import { ArrowLeft, Building2, MapPin, User, CreditCard, BookOpen } from "lucide-react";
import { useData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CheckoutSuccess } from "../components/CheckoutSuccess";
type Step = "details" | "delivery" | "payment";
const steps = [{
  id: "details",
  label: "Personal Details"
}, {
  id: "delivery",
  label: "Delivery Info"
}, {
  id: "payment",
  label: "Payment"
}];
export function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<Step>("details");
  const [formData, setFormData] = useState({
    // Personal Details
    fullName: "",
    email: "",
    phone: "",
    // Delivery Details
    address: "",
    city: "",
    state: "",
    // Payment Details
    paymentMethod: ""
  });
  const {
    profile
  } = useData();
  const navigate = useNavigate();
  const {
    items,
    clearCart
  } = useCart();
  const cartItems = Object.values(items);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  const OrderSummary = () => <div className="bg-gray-100 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      <div className="space-y-4">
        {cartItems.map(item => <div key={item.id} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gray-700 p-2 rounded-lg">
                <BookOpen className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>)}
        <div className="border-t border-gray-700 pt-4 mt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-400">Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium mt-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>;
  const handleNext = () => {
    if (currentStep === "details") setCurrentStep("delivery");else if (currentStep === "delivery") setCurrentStep("payment");
  };
  const handleBack = () => {
    if (currentStep === "payment") setCurrentStep("delivery");else if (currentStep === "delivery") setCurrentStep("details");else navigate("/cart");
  };
  const [ussdCode, setUssdCode] = useState<string>("");
  const generateUSSDCode = (bankCode: string) => {
    const amount = total.toFixed(2);
    const merchantCode = "123456"; // This would come from your payment provider
    const reference = Math.random().toString(36).substring(2, 15);
    // Format: *bankCode*merchantCode*amount*reference#
    const code = `*${bankCode}*${merchantCode}*${amount}*${reference}#`;
    setUssdCode(code);
  };
  const handlePayment = () => {
    const newOrderId = addOrder({
      items: cartItems,
      total,
      deliveryInfo: {
        address: formData.address,
        city: formData.city,
        state: formData.state
      }
    });
    // Add to payment history
    addPaymentHistory({
      id: newOrderId,
      date: new Date().toISOString(),
      amount: total,
      items: cartItems.map(item => item.title),
      status: "completed"
    });
    clearCart();
    setOrderId(newOrderId);
    setShowSuccess(true);
  };
  const {
    addOrder,
    addPaymentHistory
  } = useData();
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      address: profile.address
    }));
  }, [profile]);
  useEffect(() => {
    if (cartItems.length === 0 && !showSuccess) {
      navigate("/cart");
    }
  }, [cartItems.length, showSuccess]);
  return <div className="min-h-screen bg-white text-purple-600">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={handleBack} className="p-2 hover:bg-gray-300 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Checkout</h1>
        </div>
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => <div key={step.id} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${steps.findIndex(s => s.id === currentStep) >= index ? "bg-purple-600 text-black" : "bg-gray-100 text-gray-400"}`}>
                {index + 1}
              </div>
              <div className={`ml-2 ${steps.findIndex(s => s.id === currentStep) >= index ? "text-white" : "text-gray-400"}`}>
                {step.label}
              </div>
              {index < steps.length - 1 && <div className={`w-12 h-0.5 mx-2 ${steps.findIndex(s => s.id === currentStep) > index ? "bg-purple-600" : "bg-gray-100"}`} />}
            </div>)}
        </div>
        <OrderSummary />
        {currentStep === "details" && <div className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Full Name</label>
              <input type="text" value={formData.fullName} onChange={e => setFormData({
            ...formData,
            fullName: e.target.value
          })} className="w-full p-3 bg-gray-100 rounded-lg border border-gray-300 text-purple-600" />
            </div>
            <div>
              <label className="block text-sm mb-2">Email</label>
              <input type="email" value={formData.email} onChange={e => setFormData({
            ...formData,
            email: e.target.value
          })} className="w-full p-3 bg-gray-100 rounded-lg border border-gray-300 text-purple-600" />
            </div>
            <div>
              <label className="block text-sm mb-2">Phone</label>
              <input type="tel" value={formData.phone} onChange={e => setFormData({
            ...formData,
            phone: e.target.value
          })} className="w-full p-3 bg-gray-100 rounded-lg border border-gray-300 text-purple-600" />
            </div>
          </div>}
        {currentStep === "delivery" && <div className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Delivery Address</label>
              <textarea value={formData.address} onChange={e => setFormData({
            ...formData,
            address: e.target.value
          })} className="w-full p-3 bg-gray-100 rounded-lg border border-gray-300 text-purple-600" rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">City</label>
                <input type="text" value={formData.city} onChange={e => setFormData({
              ...formData,
              city: e.target.value
            })} className="w-full p-3 bg-gray-100 rounded-lg border border-gray-300 text-purple-600" />
              </div>
              <div>
                <label className="block text-sm mb-2">State</label>
                <input type="text" value={formData.state} onChange={e => setFormData({
              ...formData,
              state: e.target.value
            })} className="w-full p-3 bg-gray-100 rounded-lg border border-gray-300 text-purple-600" />
              </div>
            </div>
          </div>}
        {currentStep === "payment" && <div className="space-y-4">
            <button onClick={() => setFormData({
          ...formData,
          paymentMethod: "bank"
        })} className={`w-full p-4 rounded-lg flex items-center justify-between ${formData.paymentMethod === "bank" ? "bg-purple-600 text-black" : "bg-gray-100 hover:bg-gray-300"}`}>
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5" />
                <span>Pay With Bank Transfer</span>
              </div>
              <span className="text-sm">Transfer via your bank</span>
            </button>
            <button onClick={() => setFormData({
          ...formData,
          paymentMethod: "card"
        })} className={`w-full p-4 rounded-lg flex items-center justify-between ${formData.paymentMethod === "card" ? "bg-purple-600 text-black" : "bg-gray-100 hover:bg-gray-300"}`}>
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5" />
                <span>Pay With Card</span>
              </div>
              <span className="text-sm">Pay via debit/credit card</span>
            </button>
            <button onClick={() => setFormData({
          ...formData,
          paymentMethod: "ussd"
        })} className={`w-full p-4 rounded-lg flex items-center justify-between ${formData.paymentMethod === "ussd" ? "bg-purple-600 text-black" : "bg-gray-100 hover:bg-gray-300"}`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">#</span>
                <span>Pay With USSD</span>
              </div>
              <span className="text-sm">Pay via USSD Code</span>
            </button>
            {formData.paymentMethod === "bank" && <div className="mt-6 p-6 bg-gray-100 rounded-lg">
                <h3 className="text-lg mb-4">Bank Transfer Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bank Name</span>
                    <span>Sterling Bank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account Name</span>
                    <span>BOOKSTORE-NextGen PG</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account Number</span>
                    <span>5264710934</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount</span>
                    <span>NGN 75.00</span>
                  </div>
                </div>
              </div>}
            {formData.paymentMethod === "card" && <div className="mt-6 p-6 bg-gray-100 rounded-lg space-y-4">
                <div>
                  <label className="block text-sm mb-2">Card Number</label>
                  <input type="text" placeholder="**** **** **** ****" className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Expiry Date</label>
                    <input type="text" placeholder="MM/YY" className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">CVV</label>
                    <input type="text" placeholder="***" className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600" />
                  </div>
                </div>
              </div>}
            {formData.paymentMethod === "ussd" && <div className="mt-6 p-6 bg-gray-100 rounded-lg space-y-4">
                <select className="w-full p-3 bg-white rounded-lg border border-gray-300" onChange={e => e.target.value && generateUSSDCode(e.target.value)}>
                  <option value="">Select Bank</option>
                  <option value="901">Access Bank - 901</option>
                  <option value="826">Union Bank - 826</option>
                  <option value="7799">Unity Bank - 7799</option>
                  <option value="5037">VFD - 5037</option>
                  <option value="945">Wema Bank - 945</option>
                  <option value="966">Zenith Bank - 966</option>
                </select>
                {ussdCode && <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">
                      Dial this code on your phone:
                    </p>
                    <p className="text-xl font-mono text-purple-600 text-center">
                      {ussdCode}
                    </p>
                  </div>}
              </div>}
          </div>}
        {showSuccess && <CheckoutSuccess orderId={orderId} />}
        <div className="mt-8 flex justify-end gap-4">
          <button onClick={handleBack} className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-200">
            Back
          </button>
          {currentStep !== "payment" && <button onClick={handleNext} className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium">
              Continue
            </button>}
          {currentStep === "payment" && formData.paymentMethod && <button onClick={handlePayment} className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium">
              Pay Now
            </button>}
        </div>
      </div>
    </div>;
}