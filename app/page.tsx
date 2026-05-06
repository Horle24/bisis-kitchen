"use client";

import { useState, useEffect } from "react";
import { MenuItem } from "./lib/sheets";
import { useCart } from "./context/CartContext";
import HeroSection from "./components/HeroSection";
import MenuSection from "./components/MenuSection";
import OrderPanel from "./components/OrderPanel";

export default function Home() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { cart, cartCount, cartTotal, addToCart, changeQty, isCartOpen, openCart, closeCart } = useCart();

  // Load menu on mount
  useEffect(() => {
    async function loadMenu() {
      try {
        const res = await fetch("/api/menu");
        const items = (await res.json()) as MenuItem[];
        setMenu(items);
      } catch (error) {
        console.error("Menu load failed:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f0800' }}>

      {/* Hero */}
      <HeroSection />

      {/* About / Our Story */}
      <section
        id="our-story"
        style={{ padding: '6rem 1rem', backgroundColor: '#140b00' }}
      >
        <div style={{
          maxWidth: '72rem',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '4rem',
          alignItems: 'center'
        }} className="md-grid-cols-2">

          {/* Image Placeholder */}
          <div style={{
            height: '20rem',
            borderRadius: '1rem',
            border: '1px solid rgba(201, 149, 42, 0.2)',
            background: 'linear-gradient(to bottom right, #1e1005, #2a1500)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            color: '#9a8870'
          }} className="md-h-420">
            <span style={{ fontSize: '4rem' }}>🚀</span>
            <p style={{ fontSize: '0.875rem' }}>Fast and Reliable Delivery</p>
          </div>

          {/* Text */}
          <div>
            <span style={{
              color: '#c9952a',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              About FoodHub
            </span>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '2.25rem',
              color: '#fdf6ec',
              marginTop: '0.5rem',
              lineHeight: 1.2
            }}>
              Connecting You to <em style={{ color: '#e8b84b' }}>Great Food</em>,<br />
              Effortlessly
            </h2>
            <div style={{
              width: '3.5rem',
              height: '0.0625rem',
              backgroundColor: '#c9952a',
              margin: '1.25rem 0'
            }} />
            <p style={{
              color: '#9a8870',
              lineHeight: 1.6,
              marginBottom: '1rem'
            }}>
              FoodHub is your go-to platform for ordering delicious meals from
              a variety of restaurants across Lagos. We partner with local
              eateries to bring you fresh, high-quality food right to your doorstep.
            </p>
            <p style={{
              color: '#9a8870',
              lineHeight: 1.6,
              marginBottom: '2rem'
            }}>
              Choose from diverse cuisines, place your order easily, and enjoy
              fast delivery. No hassle, just great food from your favorite spots.
            </p>

            {/* Stats */}
            <div style={{
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
              {[
                { num: "50+", label: "Partner Restaurants" },
                { num: "1000+", label: "Daily Orders" },
                { num: "5k+", label: "Happy Customers" },
              ].map(stat => (
                <div
                  key={stat.label}
                  style={{
                    borderLeft: '2px solid #c9952a',
                    paddingLeft: '1rem'
                  }}
                >
                  <div style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '1.875rem',
                    color: '#e8b84b'
                  }}>
                    {stat.num}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#9a8870',
                    textTransform: 'uppercase',
                    letterSpacing: '0.025em',
                    marginTop: '0.125rem'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specials */}
      <section id="specials" style={{ padding: '6rem 1rem', backgroundColor: '#0f0800' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              color: '#c9952a',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              Why Choose FoodHub
            </span>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '2.25rem',
              color: '#fdf6ec',
              marginTop: '0.5rem'
            }}>
              What Makes Us <em style={{ color: '#e8b84b' }}>Special</em>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.25rem'
          }}>
            {[
              { icon: "🏪", title: "Multiple Restaurants", desc: "Choose from a wide variety of restaurants offering different cuisines." },
              { icon: "🌿", title: "Fresh Ingredients", desc: "Partner restaurants use only the freshest ingredients for quality meals." },
              { icon: "🛵", title: "Fast Delivery", desc: "Quick and reliable delivery straight to your door from 30–45 mins." },
              { icon: "💬", title: "Easy Ordering", desc: "Simple ordering process via WhatsApp. Customize your order anytime." },
            ].map(card => (
              <div
                key={card.title}
                style={{
                  backgroundColor: '#1e1005',
                  border: '1px solid rgba(201, 149, 42, 0.2)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  textAlign: 'center',
                  transition: 'border-color 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(201, 149, 42, 0.5)'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(201, 149, 42, 0.2)'}
              >
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.75rem' }}>{card.icon}</span>
                <h3 style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.125rem',
                  color: '#fdf6ec',
                  marginBottom: '0.5rem'
                }}>
                  {card.title}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#9a8870',
                  lineHeight: 1.6
                }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu */}
      {loading ? (
        <div style={{
          padding: '6rem 1rem',
          textAlign: 'center',
          color: '#9a8870'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }} className="animate-bounce">🍽</div>
          <p>Loading today&apos;s menu...</p>
        </div>
      ) : (
        <MenuSection
          menu={menu}
          cart={cart}
          onAdd={addToCart}
        />
      )}

      {/* Floating Cart Bar */}
      {cartCount > 0 && (
        <button
          onClick={openCart}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 40,
            backgroundColor: '#c9952a',
            color: '#1a0e00',
            padding: '0.75rem 2rem',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 10px 15px -3px rgba(201, 149, 42, 0.3), 0 4px 6px -2px rgba(201, 149, 42, 0.15)',
            transition: 'transform 0.3s',
            whiteSpace: 'nowrap'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#e8b84b';
            e.currentTarget.style.transform = 'translateX(-50%) translateY(-0.125rem)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#c9952a';
            e.currentTarget.style.transform = 'translateX(-50%)';
          }}
        >
          <span style={{
            backgroundColor: '#1a0e00',
            color: '#e8b84b',
            width: '1.5rem',
            height: '1.5rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 'bold'
          }}>
            {cartCount}
          </span>
          View Your Order
          <span style={{ fontWeight: 'bold' }}>
            ₦{cartTotal.toLocaleString()}
          </span>
        </button>
      )}

      {/* Order Panel */}
      {isCartOpen && (
        <OrderPanel
          cart={cart}
          onClose={closeCart}
          onChangeQty={changeQty}
        />
      )}
    </div>
  );
}