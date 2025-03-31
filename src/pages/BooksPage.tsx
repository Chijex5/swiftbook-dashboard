import React, { useState } from "react";
import { Search, Filter, BookOpen, ShoppingCart, Heart, ChevronDown, Plus, Minus, X } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
const faculties = ["All", "Computer Science", "Engineering", "Medicine", "Arts", "Business"];
const levels = ["All", "Year 1", "Year 2", "Year 3", "Year 4"];
const bookSessions = [{
  id: "recommended",
  title: "Recommended for You",
  books: [...Array(6)].map((_, i) => ({
    id: `rec-${i}`,
    title: "Introduction to Programming",
    code: "CS101",
    department: "Computer Science",
    price: 79.99,
    level: "Year 1",
    available: true
  }))
}, {
  id: "popular",
  title: "Popular in Computer Science",
  books: [...Array(6)].map((_, i) => ({
    id: `pop-${i}`,
    title: "Data Structures and Algorithms",
    code: "CS201",
    department: "Computer Science",
    price: 89.99,
    level: "Year 2",
    available: true
  }))
}, {
  id: "new",
  title: "New Arrivals",
  books: [...Array(6)].map((_, i) => ({
    id: `new-${i}`,
    title: "Advanced Machine Learning",
    code: "CS401",
    department: "Computer Science",
    price: 99.99,
    level: "Year 4",
    available: true
  }))
}];
export function BooksPage() {
  const {
    items,
    addToCart,
    updateQuantity,
    wishlistItems,
    toggleWishlist
  } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [showAvailable, setShowAvailable] = useState(false);
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({});
  const [showFilters, setShowFilters] = useState(false);
  interface Book {
    id: string;
    title: string;
    code: string;
    department: string;
    price: number;
    level: string;
    available: boolean;
  }

  interface BookSession {
    id: string;
    title: string;
    books: Book[];
  }

  interface ExpandedSections {
    [key: string]: boolean;
  }

  const handleAddToCart = (book: Book) => {
    addToCart(book);
    toast.success(`${book.title} added to cart!`);
  };
  interface HandleUpdateQuantityParams {
    book: Book;
    delta: number;
  }

  const handleUpdateQuantity = ({ book, delta }: HandleUpdateQuantityParams) => {
    updateQuantity(book.id, delta);
  };
  interface HandleToggleWishlistParams {
    book: Book;
  }

  const handleToggleWishlist = ({ book }: HandleToggleWishlistParams) => {
    toggleWishlist(book.id);
    if (wishlistItems.has(book.id)) {
      toast.success(`${book.title} removed from wishlist!`);
    } else {
      toast.success(`${book.title} added to wishlist!`);
    }
  };
  function toggleSection(id: string): void {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }

  return <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => setShowFilters(true)} className="p-2 rounded-lg border bg-white hover:bg-gray-50">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <div className="relative">
              <input type="text" placeholder="Search by title, code, or department..." className="w-full pl-12 pr-4 py-3 border rounded-lg bg-white" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              <Search className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
        <div className="space-y-8">
          {bookSessions.map(session => <section key={session.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6 cursor-pointer" onClick={() => toggleSection(session.id)}>
                <h2 className="text-xl font-semibold text-gray-900">
                  {session.title}
                </h2>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${expandedSections[session.id] ? "rotate-180" : ""}`} />
              </div>
              {(!expandedSections[session.id] || expandedSections[session.id]) && <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {session.books.map(book => <motion.div key={book.id} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} className="bg-white border rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-purple-100 p-3 rounded-lg">
                          <BookOpen className="w-6 h-6 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                          Available
                        </span>
                      </div>
                      <h4 className="text-lg font-medium mb-2 line-clamp-1">
                        {book.title}
                      </h4>
                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600">
                          {book.code} - {book.department}
                        </p>
                        <p className="text-sm text-gray-600">{book.level}</p>
                        <p className="text-xl font-semibold text-purple-600">
                          ${book.price}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {items[book.id] ? <div className="flex-1 flex items-center justify-between bg-purple-50 rounded-lg border-2 border-purple-600">
                            <button onClick={() => handleUpdateQuantity({ book, delta: -1 })} className="p-2 hover:bg-purple-100 rounded-l-lg">
                              <Minus className="w-4 h-4 text-purple-600" />
                            </button>
                            <span className="text-purple-600 font-medium">
                              {items[book.id].quantity}
                            </span>
                            <button onClick={() => handleUpdateQuantity({ book, delta: 1 })} className="p-2 hover:bg-purple-100 rounded-r-lg">
                              <Plus className="w-4 h-4 text-purple-600" />
                            </button>
                          </div> : <button onClick={() => handleAddToCart(book)} className="flex-1 bg-purple-600 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors font-medium">
                            <ShoppingCart className="w-4 h-4" />
                            <span>Add to Cart</span>
                          </button>}
                        <button onClick={() => handleToggleWishlist({ book })} className={`p-2.5 border rounded-lg transition-colors ${wishlistItems.has(book.id) ? "bg-pink-50 border-pink-200" : "hover:bg-gray-50"}`}>
                          <Heart className={`w-5 h-5 ${wishlistItems.has(book.id) ? "text-pink-500 fill-pink-500" : "text-gray-600"}`} />
                        </button>
                      </div>
                    </motion.div>)}
                </div>}
            </section>)}
        </div>
      </div>
      <AnimatePresence>
        {showFilters && <>
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowFilters(false)} />
            <motion.div initial={{
          x: "100%"
        }} animate={{
          x: 0
        }} exit={{
          x: "100%"
        }} transition={{
          type: "tween"
        }} className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-lg z-50 overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm text-gray-600 block mb-2 font-medium">
                      Faculty
                    </label>
                    <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedFaculty} onChange={e => setSelectedFaculty(e.target.value)}>
                      {faculties.map(faculty => <option key={faculty} value={faculty}>
                          {faculty}
                        </option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-2 font-medium">
                      Level
                    </label>
                    <select className="w-full p-2.5 border rounded-lg bg-white" value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)}>
                      {levels.map(level => <option key={level} value={level}>
                          {level}
                        </option>)}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="available" checked={showAvailable} onChange={e => setShowAvailable(e.target.checked)} className="rounded text-purple-600 w-4 h-4" />
                    <label htmlFor="available" className="text-sm text-gray-600">
                      Available Only
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>
    </div>;
}