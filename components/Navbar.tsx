// components/Navbar.tsx
"use client";
import { ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // New state
  const { cartCount } = useCart();

  return (
    <>
      <nav className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-3xl font-serif font-bold text-justbubu-purple tracking-wider">
                JUST<span className="text-justbubu-gold">BUBU</span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-10">
              <Link href="#fashion" className="text-gray-600 hover:text-justbubu-purple transition-colors font-medium">Fashion</Link>
              <Link href="#groceries" className="text-gray-600 hover:text-justbubu-purple transition-colors font-medium">Groceries</Link>
              <Link href="#about" className="text-gray-600 hover:text-justbubu-purple transition-colors font-medium">About Us</Link>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">
              {/* Cart Icon */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-justbubu-purple hover:text-justbubu-gold transition-colors"
              >
                <ShoppingBag size={28} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-justbubu-gold rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button (Visible only on small screens) */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-justbubu-purple"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col px-4 py-4 space-y-4">
                <Link href="#fashion" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-800 hover:text-justbubu-purple">Fashion</Link>
                <Link href="#groceries" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-800 hover:text-justbubu-purple">Groceries</Link>
                <Link href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-gray-800 hover:text-justbubu-purple">About Us</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}