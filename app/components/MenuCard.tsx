"use client";

import { MenuItem } from "../lib/sheets";
import { CartItem } from "../lib/cart";

interface MenuCardProps {
    item: MenuItem;
    cart: Record<string, CartItem>;
    onAdd: (item: MenuItem) => void;
}

const EMOJI_MAP: Record<string, string> = {
    soups: "🍲",
    rice: "🍛",
    grills: "🍗",
    snacks: "🍩",
    drinks: "🥤",
    other: "🍽",
};

export default function MenuCard({ item, cart, onAdd }: MenuCardProps) {
    const inCart = !!cart[item.id];
    const soldOut = !item.available;
    const emoji = EMOJI_MAP[item.category] || "🍽";

    return (
        <div
            style={{
                backgroundColor: '#2a1500',
                border: soldOut ? '1px solid rgba(201, 149, 42, 0.1)' : '1px solid rgba(201, 149, 42, 0.2)',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s',
                opacity: soldOut ? 0.5 : 1,
                transform: soldOut ? 'none' : 'translateY(0)',
                cursor: soldOut ? 'not-allowed' : 'pointer'
            }}
            onMouseOver={(e) => {
                if (!soldOut) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = 'rgba(201, 149, 42, 0.5)';
                }
            }}
            onMouseOut={(e) => {
                if (!soldOut) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(201, 149, 42, 0.2)';
                }
            }}
        >
            {/* Image or Emoji */}
            <div style={{
                position: 'relative',
                height: '11rem',
                background: 'linear-gradient(to bottom right, #1a0e00, #2a1500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                {item.photo_url && item.photo_url.startsWith("http") ? (
  <img
    src={item.photo_url}
    alt={item.name}
    className="w-full h-full object-cover"
    onError={(e) => {
      (e.target as HTMLImageElement).style.display = "none";
    }}
  />
) : (
  <span className="text-6xl">{emoji}</span>
)}
                {/* Sold Out Badge */}
                {soldOut && (
                    <div style={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        backgroundColor: 'rgba(185, 28, 28, 0.9)',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.025em'
                    }}>
                        Unavailable
                    </div>
                )}
            </div>

            {/* Card Body */}
            <div style={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                flex: 1
            }}>
                {item.tag && (
                    <span style={{
                        display: 'inline-block',
                        backgroundColor: 'rgba(201, 149, 42, 0.15)',
                        border: '1px solid rgba(201, 149, 42, 0.25)',
                        color: '#e8b84b',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        padding: '0.125rem 0.75rem',
                        borderRadius: '9999px',
                        marginBottom: '0.5rem',
                        width: 'fit-content',
                        textTransform: 'uppercase',
                        letterSpacing: '0.025em'
                    }}>
                        {item.tag}
                    </span>
                )}

                <h3 style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '1.125rem',
                    color: '#fdf6ec',
                    marginBottom: '0.25rem'
                }}>
                    {item.name}
                </h3>

                <p style={{
                    fontSize: '0.75rem',
                    color: '#c9952a',
                    marginBottom: '0.5rem',
                    fontWeight: 500
                }}>
                    {item.restaurant}
                </p>

                <p style={{
                    fontSize: '0.875rem',
                    color: '#9a8870',
                    lineHeight: 1.6,
                    flex: 1,
                    marginBottom: '1rem'
                }}>
                    {item.description}
                </p>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <span style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '1.25rem',
                        color: '#e8b84b'
                    }}>
                        ₦{item.price.toLocaleString()}
                    </span>

                    {soldOut ? (
                        <span style={{
                            color: '#f87171',
                            fontSize: '0.875rem',
                            fontWeight: 500
                        }}>
                            Sold Out
                        </span>
                    ) : (
                        <button
                            onClick={() => onAdd(item)}
                            style={{
                                padding: '0.375rem 1rem',
                                borderRadius: '9999px',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                backgroundColor: inCart ? '#15803d' : '#c9952a',
                                color: inCart ? 'white' : '#1a0e00'
                            }}
                            onMouseOver={(e) => {
                                if (!inCart) {
                                    e.currentTarget.style.backgroundColor = '#e8b84b';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!inCart) {
                                    e.currentTarget.style.backgroundColor = '#c9952a';
                                }
                            }}
                        >
                            {inCart ? "✓ Added" : "+ Add"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}