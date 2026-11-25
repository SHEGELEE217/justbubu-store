// components/Footer.tsx
import { Mail, Phone } from "lucide-react";
import Link from "next/link";

// Custom Brand Icons (Since Lucide v1 removed them)
const FacebookIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t-4 border-justbubu-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-3xl font-serif font-bold text-white tracking-wider">
              JUST<span className="text-justbubu-gold">BUBU</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400 max-w-sm">
              Your one-stop destination for executive ready-to-wear fashion and premium household groceries.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#fashion" className="hover:text-justbubu-gold transition-colors">Women's Fashion</Link></li>
              <li><Link href="#groceries" className="hover:text-justbubu-gold transition-colors">Premium Groceries</Link></li>
              <li><Link href="#about" className="hover:text-justbubu-gold transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-justbubu-gold" />
                <span>+234 800 000 0000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-justbubu-gold" />
                <span>hello@justbubu.com</span>
              </li>
              {/* Social Icons correctly placed here inside the list */}
              <li className="flex gap-4 mt-4">
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-justbubu-gold hover:text-white transition-colors">
                  <InstagramIcon size={18} />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-justbubu-gold hover:text-white transition-colors">
                  <FacebookIcon size={18} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} JustBubu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}