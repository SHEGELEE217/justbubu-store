// app/page.tsx
"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import About from "../components/About";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { Search } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on the search query (matches name or description)
  const filteredProducts = products.filter((product) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)
    );
  });

  // Now split the *filtered* products into categories
  const fashionProducts = filteredProducts.filter(p => p.category === "Fashion");
  const groceryProducts = filteredProducts.filter(p => p.category === "Groceries");

  if (loading) {
    return <div className="h-screen flex items-center justify-center text-justbubu-purple text-2xl font-bold">Loading JustBubu...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 scroll-smooth">
      <Navbar />
      <Hero />
      
      {/* Search Bar Section */}
      <div className="bg-justbubu-purple py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                   <div className="relative">
            <input 
              type="text" 
              placeholder="Search for a dress, spaghetti, or cooking oil..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-justbubu-gold/50 shadow-lg"
            />
            <Search className="absolute right-6 top-4 text-gray-400" size={24} />
          </div>
        </div>
      </div>

      {/* Fashion Section (Only show if there are matching fashion items) */}
      {fashionProducts.length > 0 && (
        <section id="fashion" className="pt-20 pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-justbubu-purple mb-4">Executive Fashion</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Discover our latest ready-to-wear collections designed for the modern woman.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {fashionProducts.map((product) => (
              <ProductCard key={product.id} product={{...product, image: product.images?.[0]}} />
            ))}
          </div>
        </section>
      )}

      {/* Groceries Section (Only show if there are matching grocery items) */}
      {groceryProducts.length > 0 && (
        <section id="groceries" className="pt-20 pb-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-justbubu-purple mb-4">Premium Groceries</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Quality essentials for your home, delivered with the same JustBubu elegance.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {groceryProducts.map((product) => (
                <ProductCard key={product.id} product={{...product, image: product.images?.[0]}} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State (If search yields no results) */}
      {filteredProducts.length === 0 && (
        <div className="py-32 text-center">
          <h3 className="text-2xl font-bold text-gray-400 mb-2">No products found</h3>
          <p className="text-gray-500">We couldn't find anything matching "{searchQuery}". Try a different search term.</p>
          <button 
            onClick={() => setSearchQuery("")}
            className="mt-6 text-justbubu-purple font-semibold hover:underline"
          >
            Clear Search
          </button>
        </div>
      )}

      <About />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}