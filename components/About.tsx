// components/About.tsx
"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 bg-justbubu-purple text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1574634534894-89d7576c8259?q=80&w=1000&auto=format&fit=crop" 
              alt="JustBubu Brand Story" 
              className="w-full h-full object-cover"
            />
            {/* Gold Accent Box */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-justbubu-gold rounded-full mix-blend-multiply opacity-50 blur-2xl"></div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Redefining <span className="text-justbubu-gold">Everyday Luxury</span>
            </h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              JustBubu was born from a simple idea: the modern woman deserves elegance in every aspect of her life. From the boardroom to the kitchen, we curate pieces that make you feel confident and essentials that make your life easier.
            </p>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Whether you are shopping for a stunning ready-to-wear gown or premium cooking oil for your family, we deliver quality, style, and convenience straight to your doorstep.
            </p>
            <div className="flex gap-4">
              <div className="border-l-4 border-justbubu-gold pl-4">
                <h4 className="font-bold text-xl">Premium Quality</h4>
                <p className="text-sm text-gray-400">Handpicked with care.</p>
              </div>
              <div className="border-l-4 border-justbubu-gold pl-4">
                <h4 className="font-bold text-xl">Fast Delivery</h4>
                <p className="text-sm text-gray-400">To your doorstep.</p>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}