"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem } from "../lib/cart";
import { MenuItem } from "../lib/sheets";

interface CartContextType {
    cart: Record<string, CartItem>;
    cartCount: number;
    cartTotal: number;
    addToCart: (item: MenuItem) => void;
    changeQty: (id: string, delta: number) => void;
    openCart: () => void;
    closeCart: () => void;
    isCartOpen: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<Record<string, CartItem>>({});
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (item: MenuItem) => {
        setCart(prev => {
            const existing = prev[item.id];
            return {
                ...prev,
                [item.id]: {
                    item,
                    qty: existing ? existing.qty + 1 : 1,
                },
            };
        });
    };

    const changeQty = (id: string, delta: number) => {
        setCart(prev => {
            const existing = prev[id];
            if (!existing) return prev;
            const newQty = existing.qty + delta;
            if (newQty <= 0) {
                const updated = { ...prev };
                delete updated[id];
                return updated;
            }
            return { ...prev, [id]: { ...existing, qty: newQty } };
        });
    };

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const cartCount = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
    const cartTotal = Object.values(cart).reduce((sum, item) => sum + item.item.price * item.qty, 0);

    return (
        <CartContext.Provider value={{
            cart,
            cartCount,
            cartTotal,
            addToCart,
            changeQty,
            openCart,
            closeCart,
            isCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
}