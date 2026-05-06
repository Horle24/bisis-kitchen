"use client";

import { useState } from "react";
import { CartItem, CustomerDetails, getCartTotal, sendToWhatsApp } from "../lib/cart";

interface OrderPanelProps {
    cart: Record<string, CartItem>;
    onClose: () => void;
    onChangeQty: (id: string, delta: number) => void;
}

const EMOJI_MAP: Record<string, string> = {
    soups: "🍲",
    rice: "🍛",
    grills: "🍗",
    snacks: "🍩",
    drinks: "🥤",
    other: "🍽",
};

/**
 * Calculates delivery fee based on total item quantity and number of unique restaurants.
 * Fee range: ₦500 – ₦1,500
 *
 * Logic:
 *  - Base fee: ₦500
 *  - +₦200 per extra restaurant beyond the first (multi-restaurant orders need separate pickups)
 *  - +₦100 per 3 items (heavier/bulkier load)
 *  - Capped at ₦1,500
 */
function calcDeliveryFee(items: CartItem[]): number {
    if (items.length === 0) return 0;

    const totalQty = items.reduce((s, c) => s + c.qty, 0);

    // Infer unique "restaurants" from item category as a proxy
    // (swap `c.item.category` for a real `restaurantId` field if available)
    const uniqueRestaurants = new Set(items.map(c => c.item.category)).size;

    const base = 500;
    const restaurantSurcharge = Math.max(0, uniqueRestaurants - 1) * 200;
    const qtySurcharge = Math.floor(totalQty / 3) * 100;

    return Math.min(1500, base + restaurantSurcharge + qtySurcharge);
}

function DeliveryFeeBreakdown({ items }: { items: CartItem[] }) {
    const totalQty = items.reduce((s, c) => s + c.qty, 0);
    const uniqueRestaurants = new Set(items.map(c => c.item.category)).size;
    const restaurantSurcharge = Math.max(0, uniqueRestaurants - 1) * 200;
    const qtySurcharge = Math.floor(totalQty / 3) * 100;
    const fee = calcDeliveryFee(items);
    const isCapped = fee === 1500;

    return (
        <div style={{
            backgroundColor: 'rgba(37, 211, 102, 0.06)',
            border: '1px solid rgba(37, 211, 102, 0.18)',
            borderRadius: '0.75rem',
            padding: '0.875rem 1rem',
            marginBottom: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
        }}>
            {/* Section header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.25rem',
            }}>
                <span style={{
                    fontSize: '0.75rem',
                    color: '#9a8870',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    fontWeight: 600,
                }}>
                    🛵 Delivery Fee
                </span>
                <span style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '1rem',
                    color: '#25D366',
                    fontWeight: 700,
                }}>
                    ₦{fee.toLocaleString()}
                </span>
            </div>

            {/* Breakdown rows */}
            <FeeRow label="Base fee" value={500} />
            {restaurantSurcharge > 0 && (
                <FeeRow
                    label={`Multi-restaurant surcharge (${uniqueRestaurants} spots)`}
                    value={restaurantSurcharge}
                />
            )}
            {qtySurcharge > 0 && (
                <FeeRow
                    label={`Bulk surcharge (${totalQty} items)`}
                    value={qtySurcharge}
                />
            )}

            {isCapped && (
                <p style={{
                    fontSize: '0.7rem',
                    color: '#9a8870',
                    marginTop: '0.25rem',
                    fontStyle: 'italic',
                }}>
                    * Fee capped at ₦1,500 maximum.
                </p>
            )}

            <p style={{
                fontSize: '0.7rem',
                color: '#9a8870',
                marginTop: '0.1rem',
                lineHeight: 1.5,
            }}>
                Fee may be adjusted by our team based on your exact location.
            </p>
        </div>
    );
}

function FeeRow({ label, value }: { label: string; value: number }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <span style={{ fontSize: '0.75rem', color: '#9a8870' }}>{label}</span>
            <span style={{ fontSize: '0.75rem', color: '#c9952a' }}>
                +₦{value.toLocaleString()}
            </span>
        </div>
    );
}

export default function OrderPanel({
    cart,
    onClose,
    onChangeQty,
}: OrderPanelProps) {
    const [customer, setCustomer] = useState<CustomerDetails>({
        name: "",
        phone: "",
        orderType: "delivery",
        address: "",
        note: "",
    });

    const items = Object.values(cart).filter(c => c.qty > 0);
    const subtotal = getCartTotal(cart);
    const deliveryFee = customer.orderType === "delivery" ? calcDeliveryFee(items) : 0;
    const grandTotal = subtotal + deliveryFee;

    function handleSend() {
        if (!customer.name.trim()) {
            alert("Please enter your name."); return;
        }
        if (!customer.phone.trim()) {
            alert("Please enter your phone number."); return;
        }
        if (customer.orderType === "delivery" && !customer.address.trim()) {
            alert("Please enter your delivery address."); return;
        }
        if (!items.length) {
            alert("Your cart is empty!"); return;
        }
        sendToWhatsApp(cart, customer);
    }

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                zIndex: 50,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center'
            }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div style={{
                backgroundColor: '#1e1005',
                border: '1px solid rgba(201, 149, 42, 0.2)',
                borderRadius: '1rem 1rem 0 0',
                width: '100%',
                maxWidth: '32rem',
                maxHeight: '88vh',
                overflowY: 'auto',
                padding: '1.5rem'
            }}>

                {/* Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem'
                }}>
                    <h2 style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '1.5rem',
                        color: '#fdf6ec'
                    }}>Your Order 🛒</h2>
                    <button
                        onClick={onClose}
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: '#9a8870',
                            width: '2rem',
                            height: '2rem',
                            borderRadius: '9999px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.color = '#9a8870';
                        }}
                    >
                        ✕
                    </button>
                </div>

                {items.length === 0 ? (
                    /* Empty Cart */
                    <div style={{
                        textAlign: 'center',
                        padding: '2.5rem 0',
                        color: '#9a8870'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🍽</div>
                        <p>Your cart is empty.<br />Add items from the menu.</p>
                    </div>
                ) : (
                    <>
                        {/* Cart Items */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                            marginBottom: '1.25rem'
                        }}>
                            {items.map(c => (
                                <div
                                    key={c.item.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(201, 149, 42, 0.15)',
                                        borderRadius: '0.75rem',
                                        padding: '1rem'
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem'
                                    }}>
                                        {c.item.photo_url ? (
                                            <img
                                                src={c.item.photo_url}
                                                alt={c.item.name}
                                                style={{
                                                    width: '2.5rem',
                                                    height: '2.5rem',
                                                    borderRadius: '0.5rem',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        ) : (
                                            <span style={{ fontSize: '1.5rem' }}>
                                                {EMOJI_MAP[c.item.category] || "🍽"}
                                            </span>
                                        )}
                                        <div>
                                            <p style={{
                                                fontSize: '0.875rem',
                                                fontWeight: 500,
                                                color: '#fdf6ec'
                                            }}>
                                                {c.item.name}
                                            </p>
                                            <p style={{
                                                fontSize: '0.75rem',
                                                color: '#c9952a'
                                            }}>
                                                ₦{(c.item.price * c.qty).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Qty Controls */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        <button
                                            onClick={() => onChangeQty(c.item.id, -1)}
                                            style={{
                                                backgroundColor: 'rgba(201, 149, 42, 0.2)',
                                                border: '1px solid rgba(201, 149, 42, 0.3)',
                                                color: '#e8b84b',
                                                width: '1.75rem',
                                                height: '1.75rem',
                                                borderRadius: '9999px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s'
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.backgroundColor = 'rgba(201, 149, 42, 0.4)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.backgroundColor = 'rgba(201, 149, 42, 0.2)';
                                            }}
                                        >
                                            −
                                        </button>
                                        <span style={{
                                            color: '#fdf6ec',
                                            fontSize: '0.875rem',
                                            width: '1rem',
                                            textAlign: 'center'
                                        }}>
                                            {c.qty}
                                        </span>
                                        <button
                                            onClick={() => onChangeQty(c.item.id, 1)}
                                            style={{
                                                backgroundColor: 'rgba(201, 149, 42, 0.2)',
                                                border: '1px solid rgba(201, 149, 42, 0.3)',
                                                color: '#e8b84b',
                                                width: '1.75rem',
                                                height: '1.75rem',
                                                borderRadius: '9999px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s'
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.backgroundColor = 'rgba(201, 149, 42, 0.4)';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.backgroundColor = 'rgba(201, 149, 42, 0.2)';
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Customer Form */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                            marginBottom: '1.25rem'
                        }}>
                            {/* Name */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <label style={{
                                    fontSize: '0.75rem', color: '#9a8870',
                                    textTransform: 'uppercase', letterSpacing: '0.05em'
                                }}>Your Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Amaka Johnson"
                                    value={customer.name}
                                    onChange={e => setCustomer({ ...customer, name: e.target.value })}
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(201, 149, 42, 0.2)',
                                        color: '#fdf6ec', borderRadius: '0.5rem',
                                        padding: '0.625rem 1rem', fontSize: '0.875rem',
                                        outline: 'none', transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => { e.currentTarget.style.borderColor = '#c9952a'; }}
                                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(201, 149, 42, 0.2)'; }}
                                />
                            </div>

                            {/* Phone */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <label style={{
                                    fontSize: '0.75rem', color: '#9a8870',
                                    textTransform: 'uppercase', letterSpacing: '0.05em'
                                }}>Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="e.g. 08012345678"
                                    value={customer.phone}
                                    onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(201, 149, 42, 0.2)',
                                        color: '#fdf6ec', borderRadius: '0.5rem',
                                        padding: '0.625rem 1rem', fontSize: '0.875rem',
                                        outline: 'none', transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => { e.currentTarget.style.borderColor = '#c9952a'; }}
                                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(201, 149, 42, 0.2)'; }}
                                />
                            </div>

                            {/* Order Type */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <label style={{
                                    fontSize: '0.75rem', color: '#9a8870',
                                    textTransform: 'uppercase', letterSpacing: '0.05em'
                                }}>Order Type</label>
                                <select
                                    value={customer.orderType}
                                    onChange={e => setCustomer({ ...customer, orderType: e.target.value as CustomerDetails["orderType"] })}
                                    style={{
                                        backgroundColor: '#1e1005',
                                        border: '1px solid rgba(201, 149, 42, 0.2)',
                                        color: '#fdf6ec', borderRadius: '0.5rem',
                                        padding: '0.625rem 1rem', fontSize: '0.875rem',
                                        outline: 'none', transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => { e.currentTarget.style.borderColor = '#c9952a'; }}
                                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(201, 149, 42, 0.2)'; }}
                                >
                                    <option value="delivery">Home Delivery</option>
                                    <option value="pickup">Pickup</option>
                                    <option value="dine">Dine In</option>
                                </select>
                            </div>

                            {/* Address */}
                            {customer.orderType === "delivery" && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    <label style={{
                                        fontSize: '0.75rem', color: '#9a8870',
                                        textTransform: 'uppercase', letterSpacing: '0.05em'
                                    }}>Delivery Address</label>
                                    <input
                                        type="text"
                                        placeholder="Your delivery address"
                                        value={customer.address}
                                        onChange={e => setCustomer({ ...customer, address: e.target.value })}
                                        style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid rgba(201, 149, 42, 0.2)',
                                            color: '#fdf6ec', borderRadius: '0.5rem',
                                            padding: '0.625rem 1rem', fontSize: '0.875rem',
                                            outline: 'none', transition: 'all 0.3s'
                                        }}
                                        onFocus={(e) => { e.currentTarget.style.borderColor = '#c9952a'; }}
                                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(201, 149, 42, 0.2)'; }}
                                    />
                                </div>
                            )}

                            {/* Note */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                <label style={{
                                    fontSize: '0.75rem', color: '#9a8870',
                                    textTransform: 'uppercase', letterSpacing: '0.05em'
                                }}>Special Requests (optional)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Extra pepper, less salt..."
                                    value={customer.note}
                                    onChange={e => setCustomer({ ...customer, note: e.target.value })}
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(201, 149, 42, 0.2)',
                                        color: '#fdf6ec', borderRadius: '0.5rem',
                                        padding: '0.625rem 1rem', fontSize: '0.875rem',
                                        outline: 'none', transition: 'all 0.3s'
                                    }}
                                    onFocus={(e) => { e.currentTarget.style.borderColor = '#c9952a'; }}
                                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(201, 149, 42, 0.2)'; }}
                                />
                            </div>
                        </div>

                        {/* ── Delivery Fee Breakdown (delivery only) ── */}
                        {customer.orderType === "delivery" && items.length > 0 && (
                            <DeliveryFeeBreakdown items={items} />
                        )}

                        {/* Totals */}
                        <div style={{
                            borderTop: '1px solid rgba(201, 149, 42, 0.2)',
                            paddingTop: '1rem',
                            marginBottom: '1.25rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                        }}>
                            {/* Subtotal row */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: '#9a8870', fontSize: '0.875rem' }}>Subtotal</span>
                                <span style={{ color: '#fdf6ec', fontSize: '0.875rem' }}>
                                    ₦{subtotal.toLocaleString()}
                                </span>
                            </div>

                            {/* Delivery fee row */}
                            {customer.orderType === "delivery" && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: '#9a8870', fontSize: '0.875rem' }}>Delivery Fee</span>
                                    <span style={{ color: '#25D366', fontSize: '0.875rem' }}>
                                        ₦{deliveryFee.toLocaleString()}
                                    </span>
                                </div>
                            )}

                            {/* Grand Total */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderTop: '1px dashed rgba(201, 149, 42, 0.15)',
                                paddingTop: '0.5rem',
                                marginTop: '0.25rem',
                            }}>
                                <span style={{ color: '#9a8870', fontSize: '0.875rem' }}>Total Estimate</span>
                                <span style={{
                                    fontFamily: 'Georgia, serif',
                                    fontSize: '1.5rem',
                                    color: '#e8b84b'
                                }}>
                                    ₦{grandTotal.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        {/* WhatsApp Button */}
                        <button
                            onClick={handleSend}
                            style={{
                                width: '100%',
                                backgroundColor: '#25D366',
                                color: 'white',
                                padding: '0.875rem',
                                borderRadius: '9999px',
                                fontWeight: 600,
                                fontSize: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = '#1ebe5a';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = '#25D366';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <svg style={{ width: '1.25rem', height: '1.25rem', fill: 'currentColor' }} viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            Send Order to WhatsApp
                        </button>

                        <p style={{
                            textAlign: 'center',
                            fontSize: '0.75rem',
                            color: '#9a8870',
                            marginTop: '0.75rem',
                            lineHeight: 1.6
                        }}>
                            Your order opens in WhatsApp. Our team will confirm, arrange payment and delivery.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}