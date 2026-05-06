import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "FoodHub - Order from Multiple Restaurants",
  description: "Order fresh food from various restaurants delivered to your door. Soups, rice dishes, grills, and more from Lagos, Nigeria.",
  icons: {
    icon: "/favicon.svg",
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{
        fontFamily: 'var(--font-geist-sans), sans-serif',
        height: '100%',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
      }}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Georgia, serif',
        backgroundColor: '#fdf6ec',
        color: '#3d1f00'
      }}>
        <CartProvider>
          <Navbar />
          <main style={{ flex: 1, paddingTop: '0' }}>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
