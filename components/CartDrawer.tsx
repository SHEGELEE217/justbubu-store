// components/CartDrawer.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cartItems, cartTotal, removeFromCart, clearCart } = useCart();
  const [formData, setFormData] = useState({ name: "", address: "", date: "" });

  // REPLACE THIS WITH YOUR ACTUAL WHATSAPP NUMBER (e.g., 2348012345678)
  const WHATSAPP_NUMBER = "2348140253666"; 

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) return alert("Your cart is empty!");
    if (!formData.name || !formData.address || !formData.date) {
      return alert("Please fill in all delivery details.");
    }

    // Build the WhatsApp message
    let message = `*Hello JustBubu!* 🛍️\nI would like to place an order.\n\n`;
    message += `*--- MY ORDER ---*\n`;
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (x${item.quantity}) - ₦${(item.price * item.quantity).toLocaleString()}\n`;
    });
    
    message += `\n*Total:* ₦${cartTotal.toLocaleString()}\n\n`;
    message += `*--- DELIVERY DETAILS ---*\n`;
    message += `*Name:* ${formData.name}\n`;
    message += `*Address:* ${formData.address}\n`;
    message += `*Preferred Delivery Date:* ${formData.date}\n`;

    // Encode and open WhatsApp
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
    
    // Optional: Clear cart after checkout
    // clearCart(); 
    // onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Overlay Background */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />

          {/* Sliding Drawer */}
          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-2xl font-serif font-bold text-justbubu-purple flex items-center gap-2">
                <ShoppingBag /> Your Cart
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
                <X size={28} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                  <ShoppingBag size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-3 rounded-lg">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">{item.name}</h4>
                      <p className="text-justbubu-purple font-bold text-sm">₦{item.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Checkout Section */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-gray-700">Total:</span>
                  <span className="text-2xl font-bold text-justbubu-purple">₦{cartTotal.toLocaleString()}</span>
                </div>

                <form onSubmit={handleWhatsAppCheckout} className="space-y-3">
                  <input 
                    type="text" placeholder="Your Full Name" required
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-justbubu-purple"
                  />
                  <input 
                    type="text" placeholder="Delivery Address" required
                    value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-justbubu-purple"
                  />
                  <input 
                    type="date" required
                    value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-justbubu-purple text-gray-500"
                  />
                  
                  <button 
                    type="submit"
                    className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-md transition-colors flex justify-center items-center gap-2"
                  >
                    Order via WhatsApp
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}