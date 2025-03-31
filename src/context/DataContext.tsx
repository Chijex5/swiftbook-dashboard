import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect, createContext, useContext } from "react";
type PaymentMethod = {
  id: string;
  cardNumber: string;
  expiryDate: string;
  default: boolean;
};
type PaymentHistory = {
  id: string;
  date: string;
  amount: number;
  items: string[];
  status: "completed" | "pending" | "failed";
};
type Book = {
  id: string;
  title: string;
  code: string;
  department: string;
  price: number;
  level: string;
  available: boolean;
};
type UserProfile = {
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  department: string;
  level: string;
  avatar?: string;
  hasWelcomed: boolean;
};
type CartItem = {
  id: string;
  title: string;
  code: string;
  department: string;
  price: number;
  quantity: number;
  level: string;
};

type Order = {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: "processing" | "confirmed" | "shipping" | "delivered";
  deliveryInfo: {
    address: string;
    city: string;
    state: string;
  };
};
type DataContextType = {
  profile: UserProfile;
  updateProfile: (data: Partial<UserProfile>) => void;
  books: Book[];
  recommendedBooks: Book[];
  paymentMethods: PaymentMethod[];
  addPaymentMethod: (method: Omit<PaymentMethod, "id">) => void;
  removePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;
  paymentHistory: PaymentHistory[];
  logout: () => void;
  deleteAccount: () => void;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  orders: Order[];
  isCheckingAuth: boolean;
  addOrder: (order: Omit<Order, "id" | "date" | "status">) => string;
  getOrder: (id: string) => Order | undefined;
  addPaymentHistory: (payment: PaymentHistory) => void;
};
const DataContext = createContext<DataContextType | undefined>(undefined);
export function DataProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [profile, setProfile] = useState<UserProfile>({
    userId: "10rj3j4",
    fullName: "Uzodinma Chijioke",
    email: "chjijioke.uzodinma@unn.edu.ng",
    phone: "+234 708 8099 773",
    address: "DeGreater Lodge Hilltop, Enugu",
    department: "Statistics",
    level: "300 Level",
    hasWelcomed: true,
  });
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([{
    id: "1",
    cardNumber: "**** **** **** 4242",
    expiryDate: "12/24",
    default: true
  }]);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([{
    id: "1",
    date: "2024-01-15",
    amount: 79.99,
    items: ["Introduction to Programming"],
    status: "completed"
  }]);
  const [books] = useState<Book[]>([
    // Your books data here
  ]);
  useEffect(() => {
    const checkAuth = () => {
      setIsCheckingAuth(true);
      let token: string | null = null;
      
      const queryParams = new URLSearchParams(window.location.search);
      const urlToken = queryParams.get("token");
      
      if (urlToken) {
        // Store new token and clean URL
        localStorage.setItem("token", urlToken);
        token = urlToken;
        window.history.replaceState(null, "", window.location.pathname);
      } else {
        // Check localStorage for existing token
        token = localStorage.getItem("token");
      }
  
      if (!token) {
        // No token found anywhere
        localStorage.removeItem("token");
        window.location.href = "https://online-textbook-ordering-system-ai41.vercel.app/auth";
        return;
      }
  
      try {
        // Decode and validate token
        const decoded = jwtDecode<{
          userId: string;
          fullName: string;
          email: string;
          phone?: string;
          address?: string;
          department?: string;
          level?: string;
          avatar?: string;
          hasWelcomed?: boolean;
          exp: number;
        }>(token);
  
        // Check token expiration
        if (Date.now() / 1000 > decoded.exp) {
          throw new Error("Token expired");
        }
  
        // Create user object from decoded token
        console.log(decoded.address)
        const userData = {
          userId: decoded.userId,
          fullName: decoded.fullName,
          email: decoded.email,
          phone: decoded.phone || "",
          address: decoded.address || "",
          department: decoded.department || "",
          level: decoded.level || "",
          hasWelcomed: decoded.hasWelcomed || false,
        };
  
        // Update state and localStorage
        setProfile(userData);
        localStorage.setItem("currentUser", JSON.stringify(userData));
  
      } catch (error) {
        console.error("Authentication error:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        window.location.href = "https://online-textbook-ordering-system-ai41.vercel.app/auth";
      } finally {
        setIsCheckingAuth(false);
      }
    };
  
    checkAuth();
  }, []);
  const [recommendedBooks] = useState<Book[]>([
    // Your recommended books data here
  ]);
  const [orders, setOrders] = useState<Order[]>([]);
  const updateProfile = (data: Partial<UserProfile>) => {
    setProfile(prev => ({
      ...prev,
      ...data
    }));
  };
  const addPaymentMethod = (method: Omit<PaymentMethod, "id">) => {
    const newMethod = {
      ...method,
      id: Date.now().toString()
    };
    setPaymentMethods(prev => [...prev, newMethod]);
  };
  const removePaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
  };
  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.map(method => ({
      ...method,
      default: method.id === id
    })));
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.location.href = "https://online-textbook-ordering-system-ai41.vercel.app/auth";
  };
  const deleteAccount = () => {
    // Implement account deletion logic
  };
  const changePassword = async (oldPassword: string, newPassword: string) => {
    // Implement password change logic
  };
  const addOrder = (orderData: Omit<Order, "id" | "date" | "status">) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD${Math.random().toString(36).substr(2, 9)}`.toUpperCase(),
      date: new Date().toISOString(),
      status: "processing"
    };
    setOrders(prev => [...prev, newOrder]);
    return newOrder.id;
  };
  const getOrder = (id: string) => {
    return orders.find(order => order.id === id);
  };
  const addPaymentHistory = (payment: PaymentHistory) => {
    setPaymentHistory(prev => [payment, ...prev]);
  };
  return <DataContext.Provider value={{
    profile,
    updateProfile,
    books,
    isCheckingAuth,
    recommendedBooks,
    paymentMethods,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod,
    paymentHistory,
    logout,
    deleteAccount,
    changePassword,
    orders,
    addOrder,
    getOrder,
    addPaymentHistory
  }}>
      {children}
    </DataContext.Provider>;
}
export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}