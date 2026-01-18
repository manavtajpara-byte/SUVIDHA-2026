'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { Globe, Accessibility, Monitor, Type, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
    const { language, setLanguage, contrast, toggleContrast, fontSize, setFontSize } = useAppState();
    const t = translations[language]; // Safe access
    const [showA11y, setShowA11y] = React.useState(false);

    // Fallback if translation is missing (though it shouldn't be now)
    const title = t?.title || "SUVIDHA Kiosk";
    const tagline = t?.tagline || "Your Gateway to Government Services";

    return (
        <header style={styles.header}>
            <div style={styles.container}>
                <Link href="/" style={styles.brand}>
                    <div style={styles.logo}>S</div>
                    <div>
                        <h1 style={styles.title}>{title}</h1>
                        <p style={styles.subtitle}>{tagline}</p>
                    </div>
                </Link>

                <div style={styles.controls}>
                    {/* Simplified Language Toggle for now to reduce complexity */}
                    <button
                        onClick={() => setLanguage(language === 'en' ? 'hi' : language === 'hi' ? 'kn' : 'en')}
                        style={styles.pillBtn}
                    >
                        <Globe size={20} />
                        <span>{language.toUpperCase()}</span>
                    </button>

                    <button onClick={() => setShowA11y(!showA11y)} style={styles.pillBtn}>
                        <Accessibility size={20} />
                        <span>A11y</span>
                    </button>

                    {showA11y && (
                        <div style={styles.dropdown}>
                            <div style={styles.menuItem}>
                                <Monitor size={18} />
                                <span>High Contrast</span>
                                <input
                                    type="checkbox"
                                    checked={contrast === 'high'}
                                    onChange={toggleContrast}
                                    style={{ transform: 'scale(1.5)' }}
                                />
                            </div>
                            <div style={styles.menuItem}>
                                <Type size={18} />
                                <span>Font Size: {fontSize}px</span>
                                <input
                                    type="range"
                                    min="14"
                                    max="32"
                                    value={fontSize}
                                    onChange={(e) => setFontSize(Number(e.target.value))}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

const styles: Record<string, React.CSSProperties> = {
    header: {
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '1rem 0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    brand: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        textDecoration: 'none',
        color: 'var(--foreground)',
    },
    logo: {
        width: '50px',
        height: '50px',
        background: 'linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)',
        color: 'white',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.8rem',
        fontWeight: 900,
        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
    },
    title: {
        margin: 0,
        fontSize: '1.8rem',
        fontWeight: 800,
        letterSpacing: '-0.5px',
        background: 'linear-gradient(to right, var(--primary), #ec4899)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    subtitle: {
        margin: 0,
        fontSize: '0.9rem',
        opacity: 0.6,
        fontWeight: 500,
    },
    controls: {
        display: 'flex',
        gap: '1rem',
        position: 'relative',
    },
    pillBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.25rem',
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '50px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 600,
        color: 'var(--foreground)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        transition: 'all 0.2s',
    },
    dropdown: {
        position: 'absolute',
        top: '120%',
        right: 0,
        background: 'white',
        padding: '1.5rem',
        borderRadius: '1.5rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: '1px solid #f3f4f6',
        minWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        fontSize: '1.1rem',
        fontWeight: 600,
    }
};
