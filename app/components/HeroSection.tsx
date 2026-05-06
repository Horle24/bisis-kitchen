"use client";

export default function HeroSection() {
    return (
        <section
            id="home"
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '4rem 1rem 2.5rem',
                position: 'relative',
                overflow: 'hidden',
                background: "linear-gradient(180deg, #1a0e00 0%, #0f0800 100%)",
            }}
        >
            {/* Background Glow */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: 'none',
                    background:
                        "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(201,149,42,0.12) 0%, transparent 70%)",
                }}
            />

            {/* Pattern Overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    opacity: 0.03,
                    pointerEvents: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c9952a'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 10, maxWidth: '48rem' }}>
                {/* Badge */}
                <span style={{
                    display: 'inline-block',
                    marginBottom: '1.5rem',
                    backgroundColor: 'rgba(201, 149, 42, 0.15)',
                    border: '1px solid rgba(201, 149, 42, 0.35)',
                    color: '#e8b84b',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '9999px'
                }}>
                    🍽 Lagos, Nigeria — Open Daily 10am – 10pm
                </span>

                {/* Heading */}
                <h1 style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '3rem',
                    color: '#fdf6ec',
                    lineHeight: 1.2,
                    marginBottom: '1rem'
                }}>
                    Delicious Food from <br />
                    <em style={{ color: '#e8b84b' }}>Multiple Restaurants</em>
                </h1>

                {/* Subheading */}
                <p style={{
                    color: '#9a8870',
                    fontSize: '1.125rem',
                    maxWidth: '28rem',
                    margin: '0 auto 2rem',
                    lineHeight: 1.6
                }}>
                    FoodHub connects you with the best restaurants in Lagos. Order fresh, authentic cuisine delivered straight to your door.
                </p>

                {/* Buttons */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <a
                        href="#menu"
                        style={{
                            backgroundColor: '#c9952a',
                            color: '#1a0e00',
                            padding: '0.875rem 2rem',
                            borderRadius: '9999px',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            letterSpacing: '0.025em',
                            textDecoration: 'none',
                            display: 'inline-block',
                            transition: 'all 0.3s',
                            cursor: 'pointer'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#e8b84b';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#c9952a';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        Explore the Menu
                    </a>
                    <a
                        href="#our-story"
                        style={{
                            backgroundColor: 'transparent',
                            border: '1px solid rgba(253, 246, 236, 0.3)',
                            color: '#fdf6ec',
                            padding: '0.875rem 2rem',
                            borderRadius: '9999px',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            letterSpacing: '0.025em',
                            textDecoration: 'none',
                            display: 'inline-block',
                            transition: 'all 0.3s',
                            cursor: 'pointer'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.borderColor = '#c9952a';
                            e.currentTarget.style.color = '#e8b84b';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(253, 246, 236, 0.3)';
                            e.currentTarget.style.color = '#fdf6ec';
                        }}
                    >
                        Our Story
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#9a8870',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                animation: 'pulse 2s infinite'
            }}>
                <span>Scroll</span>
                <div style={{
                    width: '1px',
                    height: '2.5rem',
                    background: 'linear-gradient(to bottom, #c9952a, transparent)'
                }} />
            </div>
        </section>
    );
}