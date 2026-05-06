"use client";

export default function Footer() {
    return (
        <footer style={{
            backgroundColor: '#140b00',
            borderTop: '1px solid rgba(201, 149, 42, 0.2)',
            padding: '2.5rem 1rem 0',
            textAlign: 'center'
        }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', color: '#e8b84b', marginBottom: '0.25rem' }}>
                FoodHub
            </div>
            <p style={{ color: '#9a8870', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                Your Food Delivery Partner — Lagos, Nigeria
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                {[
                    { href: '#menu', text: 'Menu' },
                    { href: '#our-story', text: 'Our Story' },
                    { href: '#specials', text: 'Specials' },
                    { href: 'https://wa.me/2348000000000', text: 'WhatsApp Us' }
                ].map(link => (
                    <a
                        key={link.href}
                        href={link.href}
                        style={{
                            color: '#9a8870',
                            fontSize: '0.875rem',
                            textDecoration: 'none',
                            transition: 'color 0.3s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.color = '#e8b84b'}
                        onMouseOut={(e) => e.currentTarget.style.color = '#9a8870'}
                    >
                        {link.text}
                    </a>
                ))}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'rgba(154, 136, 112, 0.4)' }}>
                © 2026 FoodHub. All rights reserved.
            </p>
        </footer>
    );
}