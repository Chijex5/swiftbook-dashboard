import React, { useState, createContext, useContext } from "react";
type CartItem = {
  id: string;
  title: string;
  code: string;
  department: string;
  price: number;
  quantity: number;
  level: string;
};
type CartContextType = {
  items: {
    [key: string]: CartItem;
  };
  addToCart: (book: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  wishlistItems: Set<string>;
  toggleWishlist: (id: string) => void;
};
const CartContext = createContext<CartContextType | undefined>(undefined);
export function CartProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<{
    [key: string]: CartItem;
  }>({});
  const [wishlistItems, setWishlistItems] = useState<Set<string>>(new Set());
  const addToCart = (book: any) => {
    setItems(prev => {
      const existing = prev[book.id];
      return {
        ...prev,
        [book.id]: {
          ...book,
          quantity: (existing?.quantity || 0) + 1
        }
      };
    });
  };
  const removeFromCart = (id: string) => {
    setItems(prev => {
      const newItems = {
        ...prev
      };
      delete newItems[id];
      return newItems;
    });
  };
  const updateQuantity = (id: string, delta: number) => {
    setItems(prev => {
      const item = prev[id];
      if (!item) return prev;
      const newQuantity = item.quantity + delta;
      if (newQuantity <= 0) {
        const {
          [id]: _,
          ...rest
        } = prev;
        return rest;
      }
      return {
        ...prev,
        [id]: {
          ...item,
          quantity: newQuantity
        }
      };
    });
  };
  const clearCart = () => {
    setItems({});
  };
  const toggleWishlist = (id: string) => {
    setWishlistItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  return <CartContext.Provider value={{
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    wishlistItems,
    toggleWishlist
  }}>
      {children}
    </CartContext.Provider>;
}
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}