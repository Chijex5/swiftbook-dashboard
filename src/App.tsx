import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { CartProvider } from "./context/CartContext";
import { DataProvider } from "./context/DataContext";
export function App() {
  return <MemoryRouter>
      <DataProvider>
        <CartProvider>
          <div className="min-h-screen w-full bg-gray-50">
            <Layout />
          </div>
        </CartProvider>
      </DataProvider>
    </MemoryRouter>;
}