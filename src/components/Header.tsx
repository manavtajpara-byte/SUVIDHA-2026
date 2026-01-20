'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { Globe, ChevronDown, Search } from 'lucide-react';
import Link from 'next/link';
import { availableLanguages } from '@/constants/translations';

export default function Header() {
    const { language, setLanguage, searchQuery, setSearchQuery } = useAppState();
    const t = translations[language]; // Safe access
    const [showLangMenu, setShowLangMenu] = React.useState(false);

    // Fallback if translation is missing (though it shouldn't be now)
    const title = t?.title || "SUVIDHA Kiosk";
    const tagline = t?.tagline || "Your Gateway to Government Services";

    return (
        <header style={styles.header}>
            <div style={styles.container} className="container">
                <Link href="/" style={styles.brand} className="brand">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={styles.logo}>S</div>
                        <div>
                            <h1 style={styles.title}>{title}</h1>
                            <p style={styles.subtitle}>{tagline}</p>
                        </div>
                    </div>
                </Link>

                <div style={styles.searchContainer} className="searchContainer">
                    <Search style={styles.searchIcon} size={20} />
                    <input
                        type="text"
                        placeholder={t?.search || "Search services..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={styles.searchInput}
                    />
                </div>

                <div style={styles.controls} className="controls">
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setShowLangMenu(!showLangMenu)}
                            style={styles.pillBtn}
                        >
                            <Globe size={20} />
                            <span>{availableLanguages.find(l => l.code === language)?.nativeName || language.toUpperCase()}</span>
                            <ChevronDown size={16} />
                        </button>

                        {showLangMenu && (
                            <div style={styles.langDropdown}>
                                {availableLanguages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            setLanguage(lang.code);
                                            setShowLangMenu(false);
                                        }}
                                        style={{
                                            ...styles.langItem,
                                            backgroundColor: language === lang.code ? '#f3f4f6' : 'transparent',
                                            fontWeight: language === lang.code ? 800 : 500
                                        }}
                                    >
                                        <span style={{ fontSize: '0.9rem', opacity: 0.6 }}>{lang.name}</span>
                                        <span style={{ fontSize: '1.2rem' }}>{lang.nativeName}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <style jsx>{`
                @media (max-width: 768px) {
                    .container {
                        flex-direction: column;
                        align-items: stretch !important;
                        gap: 1rem;
                    }
                    .searchContainer {
                        width: 100%;
                        max-width: 100% !important;
                        order: 3;
                    }
                    .controls {
                        width: 100%;
                        justify-content: flex-end;
                    }
                    .brand {
                         width: 100%;
                         justify-content: space-between;
                    }
                }
            `}</style>
        </header >
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
        padding: '0.75rem 0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
    },
    brand: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        textDecoration: 'none',
        color: 'var(--foreground)',
    },
    logo: {
        width: '40px',
        height: '40px',
        background: 'linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)',
        color: 'white',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        fontWeight: 900,
        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
    },
    title: {
        margin: 0,
        fontSize: '1.4rem',
        fontWeight: 800,
        letterSpacing: '-0.5px',
        background: 'linear-gradient(to right, var(--primary), #ec4899)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    subtitle: {
        margin: 0,
        fontSize: '0.8rem',
        opacity: 0.6,
        fontWeight: 500,
    },
    controls: {
        display: 'flex',
        gap: '0.5rem',
        position: 'relative',
    },
    pillBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.5rem 0.75rem',
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '50px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: 600,
        color: 'var(--foreground)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        transition: 'all 0.2s',
    },
    searchContainer: {
        position: 'relative',
        flex: 1,
        maxWidth: '400px',
        margin: '0 1.5rem',
    },
    searchIcon: {
        position: 'absolute',
        left: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#9ca3af',
    },
    searchInput: {
        width: '100%',
        padding: '0.6rem 1rem 0.6rem 2.8rem',
        borderRadius: '50px',
        border: '1px solid #e5e7eb',
        fontSize: '0.95rem',
        outline: 'none',
        background: '#f9fafb',
        transition: 'all 0.2s',
    },
    dropdown: {
        position: 'absolute',
        top: '120%',
        right: 0,
        background: 'white',
        padding: '1.25rem',
        borderRadius: '1.25rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: '1px solid #f3f4f6',
        minWidth: '280px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        zIndex: 1001,
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        fontSize: '1rem',
        fontWeight: 600,
    },
    langDropdown: {
        position: 'absolute',
        top: '120%',
        right: 0,
        background: 'white',
        borderRadius: '1.25rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: '1px solid #f3f4f6',
        minWidth: '220px',
        maxHeight: '350px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        padding: '0.4rem',
        zIndex: 1000,
    },
    langItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1rem',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        borderRadius: '0.75rem',
        transition: 'all 0.2s',
        gap: '1rem',
        color: 'var(--foreground)',
    },
};
