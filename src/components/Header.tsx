'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { Globe, ChevronDown, Search, Mic } from 'lucide-react';
import Link from 'next/link';
import { availableLanguages } from '@/constants/translations';

export default function Header() {
    const { language, setLanguage, searchQuery, setSearchQuery } = useAppState();
    const t = translations[language];
    const [showLangMenu, setShowLangMenu] = React.useState(false);
    const [isListening, setIsListening] = React.useState(false);

    // Voice Search Logic
    const startListening = () => {
        const win = window as any;
        if ('webkitSpeechRecognition' in win || 'SpeechRecognition' in win) {
            const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();

            recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US'; // Dynamic language
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setSearchQuery(transcript);
            };

            recognition.start();
        } else {
            alert('Voice search is not supported in this browser.');
        }
    };

    // Fallback if translation is missing 
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
                        placeholder={isListening ? "Listening..." : (t?.search || "Search services...")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={styles.searchInput}
                    />
                    <button
                        onClick={startListening}
                        style={{
                            ...styles.micBtn,
                            color: isListening ? '#ef4444' : '#94a3b8',
                            animation: isListening ? 'pulse 1.5s infinite' : 'none'
                        }}
                        title="Voice Search"
                    >
                        <Mic size={20} />
                    </button>
                </div>

                <div style={styles.controls} className="controls">
                    {/* ... controls ... */}
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
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.2); opacity: 0.7; }
                    100% { transform: scale(1); opacity: 1; }
                }
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
        </header>
    );
}

// Add Mic Button style
const activeStyles = {
    // ...
};

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
        padding: '0.75rem 3rem 0.75rem 3rem', // Increased right padding for mic
        borderRadius: '50px',
        border: '1px solid #e2e8f0',
        background: '#f8fafc',
        fontSize: '0.95rem',
        outline: 'none',
        transition: 'all 0.2s',
    },
    micBtn: {
        position: 'absolute',
        right: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
