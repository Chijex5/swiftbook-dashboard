import React, { useState } from "react";
import { User, CreditCard, Clock, Lock, LogOut, Trash2, ChevronRight, Plus, Check, AlertTriangle, ChevronDown } from "lucide-react";
import { useData } from "../context/DataContext";
import { motion } from "framer-motion";
export function SettingsPage() {
  const {
    profile,
    paymentMethods,
    paymentHistory,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod,
    logout,
    deleteAccount,
    changePassword
  } = useData();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [expandedPayment, setExpandedPayment] = useState<string | null>(null);
  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return; // Show error
    }
    await changePassword(passwordData.oldPassword, passwordData.newPassword);
    setShowPasswordChange(false);
  };
  return <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Account</h2>
                <p className="text-sm text-gray-500">
                  Manage your account settings
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <button onClick={() => setShowPasswordChange(true)} className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <Lock className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="font-medium">Change Password</span>
                  <p className="text-sm text-gray-500">Update your password</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button onClick={() => logout()} className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <LogOut className="w-5 h-5 text-gray-400" />
                <div>
                  <span className="font-medium">Logout</span>
                  <p className="text-sm text-gray-500">
                    Sign out of your account
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Payment Methods
                </h2>
                <p className="text-sm text-gray-500">
                  Manage your payment methods
                </p>
              </div>
            </div>
            <button className="text-purple-600 hover:text-purple-700 flex items-center gap-2" onClick={() => {
            /* Add payment method */
          }}>
              <Plus className="w-4 h-4" />
              <span>Add New</span>
            </button>
          </div>
          <div className="space-y-4">
            {paymentMethods.map(method => <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">{method.cardNumber}</p>
                    <p className="text-sm text-gray-500">
                      Expires {method.expiryDate}
                    </p>
                  </div>
                  {method.default && <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                      Default
                    </span>}
                </div>
                <div className="flex items-center gap-2">
                  {!method.default && <button onClick={() => setDefaultPaymentMethod(method.id)} className="text-sm text-purple-600 hover:text-purple-700">
                      Make Default
                    </button>}
                  <button onClick={() => removePaymentMethod(method.id)} className="text-gray-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>)}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Order History
              </h2>
              <p className="text-sm text-gray-500">View your past orders</p>
            </div>
          </div>
          <div className="space-y-4">
            {paymentHistory.map(payment => <div key={payment.id} className="space-y-2">
                <div onClick={() => setExpandedPayment(expandedPayment === payment.id ? null : payment.id)} className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-medium">${payment.amount.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(payment.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm px-2 py-1 rounded-full ${payment.status === "completed" ? "bg-green-100 text-green-600" : payment.status === "pending" ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"}`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedPayment === payment.id ? "rotate-180" : ""}`} />
                  </div>
                </div>
                <motion.div initial={{
              height: 0,
              opacity: 0
            }} animate={{
              height: expandedPayment === payment.id ? "auto" : 0,
              opacity: expandedPayment === payment.id ? 1 : 0
            }} transition={{
              duration: 0.2
            }} className="overflow-hidden">
                  <div className="p-4 bg-gray-50 rounded-lg border mt-2 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Order ID</p>
                        <p className="font-medium text-gray-900">
                          {payment.id}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Payment Date</p>
                        <p className="font-medium text-gray-900">
                          {new Date(payment.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-2">
                        Items Purchased
                      </p>
                      <div className="space-y-2">
                        {payment.items.map((item, index) => <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-2 h-2 rounded-full bg-purple-600" />
                            <span>{item}</span>
                          </div>)}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-2">
                        Payment Details
                      </p>
                      <div className="bg-white p-3 rounded border">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Amount</span>
                          <span className="font-medium">
                            ${payment.amount.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-1">
                          <span className="text-gray-600">Payment Method</span>
                          <span className="font-medium">Credit Card</span>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-1">
                          <span className="text-gray-600">Transaction ID</span>
                          <span className="font-medium text-purple-600">
                            {payment.id.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>)}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Danger Zone
              </h2>
              <p className="text-sm text-gray-500">Irreversible actions</p>
            </div>
          </div>
          <button onClick={() => setShowDeleteConfirm(true)} className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:bg-red-50">
            <div className="flex items-center gap-4">
              <Trash2 className="w-5 h-5 text-red-500" />
              <div>
                <span className="font-medium text-red-500">Delete Account</span>
                <p className="text-sm text-red-400">
                  This action cannot be undone
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-red-500" />
          </button>
        </div>
        {showPasswordChange && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input type="password" value={passwordData.oldPassword} onChange={e => setPasswordData(prev => ({
                ...prev,
                oldPassword: e.target.value
              }))} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input type="password" value={passwordData.newPassword} onChange={e => setPasswordData(prev => ({
                ...prev,
                newPassword: e.target.value
              }))} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input type="password" value={passwordData.confirmPassword} onChange={e => setPasswordData(prev => ({
                ...prev,
                confirmPassword: e.target.value
              }))} className="w-full p-2 border rounded-lg" />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button onClick={() => setShowPasswordChange(false)} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button onClick={handlePasswordChange} className="px-4 py-2 bg-purple-600 text-white rounded-lg">
                  Change Password
                </button>
              </div>
            </div>
          </div>}
        {showDeleteConfirm && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold">Delete Account</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>
                <button onClick={() => {
              deleteAccount();
              setShowDeleteConfirm(false);
            }} className="px-4 py-2 bg-red-600 text-white rounded-lg">
                  Delete Account
                </button>
              </div>
            </div>
          </div>}
      </div>
    </div>;
}