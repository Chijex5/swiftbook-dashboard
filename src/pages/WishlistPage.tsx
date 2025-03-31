import React from "react";
import { BookOpen, ShoppingCart, Trash2, Heart } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useData } from "../context/DataContext";
export function WishlistPage() {
  const {
    addToCart,
    wishlistItems,
    toggleWishlist
  } = useCart();
  const {
    books
  } = useData();
  const wishlistBooks = books.filter(book => wishlistItems.has(book.id));
  const handleMoveToCart = book => {
    addToCart(book);
    toggleWishlist(book.id);
    toast.success(`${book.title} moved to cart!`);
  };
  const handleRemove = book => {
    toggleWishlist(book.id);
    toast.success(`${book.title} removed from wishlist!`);
  };
  return <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h1>
      {wishlistBooks.length === 0 ? <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600">
            Start adding books you're interested in!
          </p>
        </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistBooks.map((book, index) => <motion.div key={book.id} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.3,
        delay: index * 0.1
      }} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm text-green-600">Available</span>
              </div>
              <h4 className="font-medium mb-1">{book.title}</h4>
              <p className="text-sm text-gray-600 mb-2">
                {book.code} - {book.department}
              </p>
              <p className="text-lg font-semibold text-purple-600 mb-3">
                ${book.price}
              </p>
              <div className="flex gap-2">
                <button onClick={() => handleMoveToCart(book)} className="flex-1 bg-purple-600 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Move to Cart</span>
                </button>
                <button onClick={() => handleRemove(book)} className="p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </motion.div>)}
        </div>}
    </div>;
}