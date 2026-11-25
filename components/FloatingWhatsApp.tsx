// components/FloatingWhatsApp.tsx
"use client";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingWhatsApp() {
  // Put your WhatsApp number here
  const WHATSAPP_NUMBER = "2348140253666"; 
  const message = encodeURIComponent("Hello JustBubu! I have a quick question about your products.");
  
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer"
    >
      <MessageCircle size={32} />
    </motion.a>
  );
}