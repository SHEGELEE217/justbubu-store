// components/ProductCard.tsx
"use client";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext"; // Import useCart

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart(); // Get the function

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col"
    >
      <div className="relative h-80 w-full overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-justbubu-purple rounded-full tracking-wide uppercase">
          {product.category}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4 flex-grow line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="text-xl font-bold text-justbubu-purple">
  ₦{Number(product.price).toLocaleString()}
</span>
          
          {/* Update the button to trigger addToCart */}
          <button 
            onClick={() => addToCart(product)}
            className="flex items-center gap-2 bg-justbubu-gold/10 text-justbubu-gold hover:bg-justbubu-gold hover:text-white px-4 py-2 rounded-md font-semibold transition-colors duration-300"
          >
            <ShoppingBag size={18} />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}