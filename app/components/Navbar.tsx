"use client";

import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .bisi-nav {
          position: fixed;
          inset-inline: 0;
          top: 0;
          z-index: 50;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bisi-nav.scrolled {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 1px 0 rgba(201,149,42,0.15), 0 8px 32px rgba(0,0,0,0.4);
        }

        .bisi-nav-inner {
          max-width: 72rem;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem;
          height: 4.5rem;
          transition: height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bisi-nav.scrolled .bisi-nav-inner {
          height: 3.75rem;
        }

        /* ── LOGO ── */
        .bisi-logo {
          display: flex;
          flex-direction: column;
          line-height: 1;
          text-decoration: none;
          gap: 1px;
          position: relative;
        }

        .bisi-logo-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 700;
          font-size: 1.45rem;
          color: #f5e6c8;
          letter-spacing: -0.01em;
          line-height: 1;
        }

        .bisi-logo-name em {
          font-style: italic;
          color: #e8b84b;
        }

        .bisi-logo-sub {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #c9952a;
          padding-left: 1px;
        }

        .bisi-logo-dot {
          position: absolute;
          top: 3px;
          right: -8px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #e8b84b;
          animation: bisi-pulse 2.5s ease-in-out infinite;
        }

        @keyframes bisi-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }

        /* ── DESKTOP NAV LINKS ── */
        .bisi-links {
          display: none;
          align-items: center;
          gap: 2.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        @media (min-width: 768px) {
          .bisi-links { display: flex; }
        }

        .bisi-link {
          position: relative;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #9a8870;
          text-decoration: none;
          transition: color 0.3s ease;
          padding-bottom: 2px;
        }

        .bisi-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #c9952a, #e8b84b);
          transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bisi-link:hover {
          color: #e8b84b;
        }

        .bisi-link:hover::after {
          width: 100%;
        }

        /* ── ORDER BUTTON ── */
        .bisi-order-btn {
          display: none;
          align-items: center;
          gap: 0.5rem;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #1a0e00;
          background: linear-gradient(135deg, #c9952a 0%, #e8b84b 50%, #c9952a 100%);
          background-size: 200% 100%;
          border: none;
          border-radius: 9999px;
          padding: 0.65rem 1.4rem;
          cursor: pointer;
          transition: background-position 0.4s ease, transform 0.2s ease, box-shadow 0.3s ease;
          box-shadow: 0 2px 16px rgba(201,149,42,0.25);
          position: relative;
          overflow: hidden;
        }

        @media (min-width: 768px) {
          .bisi-order-btn { display: flex; }
        }

        .bisi-order-btn:hover {
          background-position: 100% 0;
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(201,149,42,0.4);
        }

        .bisi-order-btn:active {
          transform: translateY(0);
        }

        /* ── MOBILE ORDER BUTTON ── */
        .bisi-order-btn-mobile {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 1rem;
          color: #1a0e00;
          background: linear-gradient(135deg, #c9952a, #e8b84b);
          border: none;
          border-radius: 9999px;
          padding: 0.6rem 1rem;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.3s ease;
          box-shadow: 0 2px 12px rgba(201,149,42,0.3);
        }

        @media (min-width: 768px) {
          .bisi-order-btn-mobile { display: none; }
        }

        .bisi-order-btn-mobile:active {
          transform: scale(0.95);
        }

        /* ── CART BADGE ── */
        .bisi-badge {
          background: #1a0e00;
          color: #e8b84b;
          font-size: 0.65rem;
          font-weight: 700;
          width: 1.35rem;
          height: 1.35rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: bisi-badge-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes bisi-badge-pop {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }

        /* ── HAMBURGER ── */
        .bisi-hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 2.25rem;
          height: 2.25rem;
          gap: 5px;
          background: transparent;
          border: 1px solid rgba(201,149,42,0.25);
          border-radius: 8px;
          cursor: pointer;
          padding: 0;
          transition: border-color 0.3s;
        }

        @media (min-width: 768px) {
          .bisi-hamburger { display: none; }
        }

        .bisi-hamburger:hover {
          border-color: rgba(201,149,42,0.6);
        }

        .bisi-bar {
          display: block;
          width: 1.1rem;
          height: 1.5px;
          background: #9a8870;
          border-radius: 2px;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: center;
        }

        .bisi-hamburger.open .bisi-bar:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
          background: #e8b84b;
        }
        .bisi-hamburger.open .bisi-bar:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .bisi-hamburger.open .bisi-bar:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
          background: #e8b84b;
        }

        /* ── MOBILE DROPDOWN ── */
        .bisi-mobile-menu {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
          opacity: 0;
          background: #120900;
          border-top: 1px solid rgba(201,149,42,0.12);
        }

        .bisi-mobile-menu.open {
          max-height: 24rem;
          opacity: 1;
        }

        .bisi-mobile-inner {
          padding: 1.5rem 1.5rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .bisi-mobile-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #7a6a55;
          text-decoration: none;
          padding: 0.85rem 0;
          border-bottom: 1px solid rgba(201,149,42,0.08);
          transition: color 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .bisi-mobile-link:last-of-type {
          border-bottom: none;
        }

        .bisi-mobile-link:hover {
          color: #e8b84b;
        }

        .bisi-mobile-link::after {
          content: '→';
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.25s ease;
          color: #c9952a;
        }

        .bisi-mobile-link:hover::after {
          opacity: 1;
          transform: translateX(0);
        }

        .bisi-mobile-order {
          margin-top: 1.25rem;
          width: 100%;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #1a0e00;
          background: linear-gradient(135deg, #c9952a 0%, #e8b84b 100%);
          border: none;
          border-radius: 9999px;
          padding: 0.85rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: opacity 0.2s, transform 0.2s;
        }

        .bisi-mobile-order:active {
          transform: scale(0.98);
          opacity: 0.9;
        }

        /* ── DIVIDER ORNAMENT ── */
        .bisi-divider {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 6px;
          opacity: 0.35;
        }

        .bisi-divider-line {
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c9952a);
        }

        .bisi-divider-line.right {
          background: linear-gradient(90deg, #c9952a, transparent);
        }

        .bisi-divider-diamond {
          width: 4px;
          height: 4px;
          background: #c9952a;
          transform: rotate(45deg);
        }

        /* ── NAV BACKGROUND ── */
        .bisi-nav-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(26,14,0,0.98) 0%, rgba(26,14,0,0.92) 100%);
          z-index: -1;
        }
      `}</style>

      <nav className={`bisi-nav${scrolled ? " scrolled" : ""}`}>
        <div className="bisi-nav-bg" />

        <div className="bisi-nav-inner">

          {/* ── Logo ── */}
          <a href="#" className="bisi-logo">
            <span className="bisi-logo-name">
              <em>Bisi's</em> FoodHub
            </span>
            <span className="bisi-logo-sub">Home Kitchen · Lagos</span>
            <span className="bisi-logo-dot" />
          </a>

          {/* ── Desktop Links ── */}
          <ul className="bisi-links">
            {[
              { label: "Menu", href: "#menu" },
              { label: "Our Story", href: "#our-story" },
              { label: "Specials", href: "#specials" },
            ].map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="bisi-link">{label}</a>
              </li>
            ))}
          </ul>

          {/* ── Right Controls ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>

            {/* Desktop Order Btn */}
            <button onClick={openCart} className="bisi-order-btn">
              <span>🛒</span>
              <span>Order Now</span>
              {cartCount > 0 && (
                <span className="bisi-badge">{cartCount}</span>
              )}
            </button>

            {/* Mobile Order Btn */}
            <button onClick={openCart} className="bisi-order-btn-mobile">
              <span>🛒</span>
              {cartCount > 0 && (
                <span className="bisi-badge">{cartCount}</span>
              )}
            </button>

            {/* Hamburger */}
            <button
              className={`bisi-hamburger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="bisi-bar" />
              <span className="bisi-bar" />
              <span className="bisi-bar" />
            </button>
          </div>
        </div>

        {/* Ornamental Divider */}
        <div className="bisi-divider" style={{ position: "relative", bottom: "auto", left: "auto", transform: "none", display: "flex", margin: "0 auto", width: "fit-content", opacity: 0.25 }}>
          <span className="bisi-divider-line" />
          <span className="bisi-divider-diamond" />
          <span className="bisi-divider-line right" />
        </div>

        {/* ── Mobile Dropdown ── */}
        <div className={`bisi-mobile-menu${menuOpen ? " open" : ""}`}>
          <div className="bisi-mobile-inner">
            {[
              { label: "Menu", href: "#menu" },
              { label: "Our Story", href: "#our-story" },
              { label: "Specials", href: "#specials" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="bisi-mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}

            <button
              onClick={() => { openCart(); setMenuOpen(false); }}
              className="bisi-mobile-order"
            >
              🛒 Place Your Order
              {cartCount > 0 && (
                <span className="bisi-badge">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}