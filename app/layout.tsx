// app/layout.tsx
import "./globals.css";
import { CartProvider } from "../context/CartContext"; // Import this!

export const metadata = {
  title: "JustBubu | Fashion & Groceries",
  description: "Executive ready-to-wear and premium groceries.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <CartProvider> {/* Wrap it here */}
          {children}
        </CartProvider>
      </body>
    </html>
  );
}