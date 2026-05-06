"use client";

import { useState } from "react";
import { MenuItem } from "../lib/sheets";
import { CartItem } from "../lib/cart";
import MenuCard from "./MenuCard";

interface MenuSectionProps {
    menu: MenuItem[];
    cart: Record<string, CartItem>;
    onAdd: (item: MenuItem) => void;
}

export default function MenuSection({ menu, cart, onAdd }: MenuSectionProps) {
    const [activeCategory, setActiveCategory] = useState("all");

    const CATEGORY_LABELS: Record<string, string> = {
        all: "All Items",
        soups: "Soups & Stews",
        rice: "Rice Dishes",
        grills: "Grills & Protein",
        snacks: "Snacks",
        drinks: "Drinks",
    };

    // Build tabs dynamically from menu
    const categories = [
        "all",
        ...Array.from(new Set(menu.map(m => m.category))),
    ];

    const filtered =
        activeCategory === "all"
            ? menu
            : menu.filter(m => m.category === activeCategory);

    return (
        <section id="menu" style={{ padding: '6rem 1rem', backgroundColor: '#0f0800' }}>
            <div style={{ maxWidth: '72rem', margin: '0 auto' }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <span style={{
                        color: '#c9952a',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase'
                    }}>
                        Our Menu
                    </span>
                    <h2 style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '2.25rem',
                        color: '#fdf6ec',
                        marginTop: '0.5rem'
                    }}>
                        Pick Your <em style={{ color: '#e8b84b' }}>Favourite</em>
                    </h2>
                    <p style={{
                        color: '#9a8870',
                        marginTop: '0.75rem',
                        maxWidth: '28rem',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        lineHeight: 1.6,
                        fontSize: '0.875rem'
                    }}>
                        Browse dishes from our partner restaurants, add to your cart, then send directly to our WhatsApp
                        to confirm and pay.
                    </p>
                </div>

                {/* Category Tabs */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    justifyContent: 'center',
                    marginBottom: '2.5rem'
                }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '0.5rem 1.25rem',
                                borderRadius: '9999px',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid rgba(201, 149, 42, 0.2)',
                                backgroundColor: activeCategory === cat ? '#c9952a' : 'transparent',
                                color: activeCategory === cat ? '#1a0e00' : '#9a8870',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                            onMouseOver={(e) => {
                                if (activeCategory !== cat) {
                                    e.currentTarget.style.borderColor = 'rgba(201, 149, 42, 0.5)';
                                    e.currentTarget.style.color = '#e8b84b';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (activeCategory !== cat) {
                                    e.currentTarget.style.borderColor = 'rgba(201, 149, 42, 0.2)';
                                    e.currentTarget.style.color = '#9a8870';
                                }
                            }}
                        >
                            {CATEGORY_LABELS[cat] ||
                                cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Menu Grid */}
                {filtered.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 0',
                        color: '#9a8870'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🍽</div>
                        <p>No items in this category today.</p>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1.25rem'
                    }}>
                        {filtered.map(item => (
                            <MenuCard
                                key={item.id}
                                item={item}
                                cart={cart}
                                onAdd={onAdd}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}