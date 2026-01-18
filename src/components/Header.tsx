'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations, availableLanguages, type LanguageKey } from '@/constants/translations';
import { Globe, Accessibility, Monitor, Type, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
    const { language, setLanguage, contrast, toggleContrast, fontSize, setFontSize } = useAppState();
    const t = translations[language];
    const [showA11y, setShowA11y] = useState(false);
    const [showLangMenu, setShowLangMenu] = useState(false);

    const currentLang = availableLanguages.find(l => l.code === language) || availableLanguages[0];

    return (
        <header style={styles.header}>
            <div style={styles.topBar}>
                <Link href="/" style={styles.logoGroup}>
                    <div style={styles.logoIcon}>S</div>
                    <div>
                        <h1 style={styles.title}>{t.title}</h1>
                        <p style={styles.tagline}>{t.tagline}</p>
                    </div>
                </Link>

                <div style={styles.actions}>
                    {/* Language Dropdown */}
                    <div style={styles.langDropdown}>
                        <button onClick={() => setShowLangMenu(!showLangMenu)} style={styles.langBtn}>
                            <Globe size={20} />
                            <span>{currentLang.nativeName}</span>
                            <ChevronDown size={20} />
                        </button>
                        {showLangMenu && (
                            <div style={styles.langMenu}>
                                {availableLanguages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => {
                                            setLanguage(lang.code);
                                            setShowLangMenu(false);
                                        }}
                                        style={{
                                            ...styles.langMenuItem,
                                            backgroundColor: language === lang.code ? '#e0f2fe' : 'transparent'
                                        }}
                                    >
                                        <span style={styles.langNative}>{lang.nativeName}</span>
                                        <span style={styles.langEnglish}>{lang.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button onClick={() => setShowA11y(!showA11y)} style={styles.iconBtn}>
                        <Accessibility size={32} />
                        <span style={styles.btnLabel}>{t.accessibility}</span>
                    </button>
                </div>
            </div>

            {showA11y && (
                <div style={styles.a11yMenu}>
                    <div style={styles.a11yOption}>
                        <Monitor size={24} />
                        <span>{t.highContrast}</span>
                        <button onClick={toggleContrast} style={styles.toggleBtn}>
                            {contrast === 'high' ? 'ON' : 'OFF'}
                        </button>
                    </div>
                    <div style={styles.a11yOption}>
                        <Type size={24} />
                        <span>{t.fontSize}</span>
                        <input
                            type="range"
                            min="14"
                            max="32"
                            value={fontSize}
                            onChange={(e) => setFontSize(parseInt(e.target.value))}
                            style={styles.slider}
                        />
                        <span style={{ minWidth: '3ch' }}>{fontSize}px</span>
                    </div>
                    <button onClick={() => setShowA11y(false)} style={styles.closeBtn}>
                        <X size={24} />
                    </button>
                </div>
            )}
        </header>
    );
}


const styles: Record<string, React.CSSProperties> = {
    header: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderBottom: 'none',
        padding: '1.5rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
    },
    topBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
    },
    logoGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        textDecoration: 'none',
        color: 'white',
    },
    logoIcon: {
        backgroundColor: 'white',
        color: '#667eea',
        width: '60px',
        height: '60px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    },
    title: {
        margin: 0,
        fontSize: '2rem',
        fontWeight: 900,
        lineHeight: 1,
        color: 'white',
        textShadow: '0 2px 10px rgba(0,0,0,0.2)',
    },
    tagline: {
        margin: 0,
        fontSize: '0.9rem',
        color: 'rgba(255,255,255,0.9)',
        fontWeight: 500,
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
    },
    langDropdown: {
        position: 'relative',
    },
    langBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(255,255,255,0.3)',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        color: 'white',
        transition: 'all 0.3s ease',
    },
    langMenu: {
        position: 'absolute',
        top: '100%',
        right: 0,
        marginTop: '0.5rem',
        backgroundColor: 'white',
        border: '2px solid #667eea',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        minWidth: '250px',
        maxHeight: '400px',
        overflowY: 'auto',
        zIndex: 2000,
    },
    langMenuItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        padding: '1rem 1.5rem',
        border: 'none',
        borderBottom: '1px solid #e2e8f0',
        background: 'transparent',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'background-color 0.2s',
    },
    langNative: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#1e293b',
    },
    langEnglish: {
        fontSize: '0.9rem',
        color: '#64748b',
    },
    iconBtn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(255,255,255,0.3)',
        borderRadius: '12px',
        padding: '0.75rem 1rem',
        cursor: 'pointer',
        color: 'white',
        gap: '0.25rem',
        transition: 'all 0.3s ease',
    },
    btnLabel: {
        fontSize: '0.8rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    a11yMenu: {
        position: 'absolute',
        top: '100%',
        right: '2rem',
        backgroundColor: 'white',
        border: '2px solid var(--primary)',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        marginTop: '1rem',
        minWidth: '350px',
    },
    a11yOption: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    toggleBtn: {
        marginLeft: 'auto',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        border: '2px solid var(--primary)',
        background: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    slider: {
        marginLeft: 'auto',
        flex: 1,
        cursor: 'pointer',
    },
    closeBtn: {
        position: 'absolute',
        top: '0.5rem',
        right: '0.5rem',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        opacity: 0.5,
    }
};
