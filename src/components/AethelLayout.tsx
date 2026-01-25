'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import {
    LayoutDashboard, CreditCard, Settings, HelpCircle, LogOut, ChevronRight,
    User, Bell, Search, Globe, ChevronDown, Menu, X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { availableLanguages, translations } from '@/constants/translations';

interface AethelLayoutProps {
    children: React.ReactNode;
    title: string;
    themeColor: string;
    themeSoft: string;
    sidebarLinks: { label: string; icon: React.ReactNode; href: string; active?: boolean }[];
}

export default function AethelLayout({ children, title, themeColor, themeSoft, sidebarLinks }: AethelLayoutProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, language, setLanguage, setIsLoggedIn, setUser, searchQuery, setSearchQuery } = useAppState();
    const [showLangMenu, setShowLangMenu] = React.useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('suvidha_session_user');
        router.push('/login');
    };

    return (
        <div style={styles.container}>
            {/* Sidebar Overlay for Mobile */}
            {isSidebarOpen && <div style={styles.sidebarOverlay} onClick={() => setIsSidebarOpen(false)} />}

            {/* Sidebar */}
            <aside style={{
                ...styles.sidebar,
                left: isSidebarOpen ? 0 : undefined
            }} className="sidebar-resp">
                <div style={styles.sidebarBrand}>
                    <div style={{ ...styles.logoIcon, background: themeColor }}>S</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={styles.logoText}>Suvidha</span>
                        <div style={styles.vBadge}>v1.0.0</div>
                    </div>
                </div>

                <div style={styles.menuLabel}>Main Menu</div>
                <nav style={styles.navStack}>
                    {sidebarLinks.map((link, idx) => (
                        <Link
                            key={idx}
                            href={link.href}
                            onClick={() => setIsSidebarOpen(false)}
                            style={{
                                ...styles.navLink,
                                backgroundColor: pathname === link.href ? themeSoft : 'transparent',
                                color: pathname === link.href ? themeColor : '#64748b'
                            }}
                        >
                            <span style={styles.linkIcon}>{link.icon}</span>
                            <span style={styles.linkLabel}>{link.label}</span>
                        </Link>
                    ))}
                </nav>

                <div style={styles.sidebarFooter}>
                    <Link href="/settings" style={styles.footerLink}><Settings size={18} /> Settings</Link>
                    <Link href="/help" style={styles.footerLink}><HelpCircle size={18} /> Help & Center</Link>
                    <button onClick={handleLogout} style={styles.logoutBtn}><LogOut size={18} /> Log Out</button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main style={styles.main}>
                <header style={styles.header}>
                    <div style={styles.headerLeft}>
                        <button style={styles.menuBtn} onClick={() => setIsSidebarOpen(true)} className="menu-btn-visible"><Menu size={24} /></button>
                        <h1 style={styles.pageTitle}>{title}</h1>
                    </div>
                    <div style={styles.headerRight}>
                        <div style={styles.searchBar} className="desktop-only">
                            <Search size={18} color="#94a3b8" />
                            <input
                                type="text"
                                placeholder="Search everything..."
                                style={styles.searchInput}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button style={styles.iconBtn}><Bell size={20} /></button>

                        <div style={{ position: 'relative' }}>
                            <button
                                style={styles.iconBtn}
                                onClick={() => setShowLangMenu(!showLangMenu)}
                            >
                                <Globe size={20} />
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
                                            <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{lang.name}</span>
                                            <span style={{ fontSize: '1rem' }}>{lang.nativeName}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <Link href="/profile" style={styles.userProfile}>
                            <div style={{ ...styles.avatar, background: themeColor }}>
                                <User size={18} color="white" />
                            </div>
                        </Link>
                    </div>
                </header>

                <div style={styles.contentScroll}>
                    <div className="fade-in-breathe" style={styles.contentBody}>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f8fafc',
        overflow: 'hidden'
    },
    sidebar: {
        width: '280px',
        background: 'white',
        borderRight: '1px solid #f1f5f9',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 1.5rem',
        flexShrink: 0
    },
    sidebarBrand: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '3rem'
    },
    logoIcon: {
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 900,
        fontSize: '1.2rem'
    },
    logoText: {
        fontSize: '1.2rem',
        fontWeight: 800,
        color: '#1e293b'
    },
    menuLabel: {
        fontSize: '0.75rem',
        fontWeight: 700,
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '1rem'
    },
    navStack: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        flex: 1
    },
    navLink: {
        display: 'flex',
        alignItems: 'center',
        padding: '0.8rem 1rem',
        borderRadius: '12px',
        textDecoration: 'none',
        fontSize: '0.95rem',
        fontWeight: 600,
        transition: 'all 0.2s'
    },
    linkIcon: { marginRight: '0.75rem' },
    linkLabel: { flex: 1 },
    sidebarFooter: {
        marginTop: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        paddingTop: '2rem',
        borderTop: '1px solid #f1f5f9'
    },
    footerLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        textDecoration: 'none',
        color: '#64748b',
        fontSize: '0.9rem',
        fontWeight: 600
    },
    logoutBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        background: 'none',
        border: 'none',
        color: '#ef4444',
        fontSize: '0.9rem',
        fontWeight: 700,
        cursor: 'pointer',
        padding: 0,
        textAlign: 'left'
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem 2.5rem',
        background: 'white',
        borderBottom: '1px solid #f1f5f9'
    },
    pageTitle: {
        fontSize: '1.5rem',
        fontWeight: 700,
        color: '#1e293b',
        margin: 0
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem'
    },
    searchBar: {
        display: 'flex',
        alignItems: 'center',
        padding: '0.6rem 1rem',
        background: '#f8fafc',
        borderRadius: '50px',
        border: '1px solid #f1f5f9',
        width: '300px'
    },
    searchInput: {
        border: 'none',
        background: 'none',
        outline: 'none',
        marginLeft: '0.5rem',
        fontSize: '0.9rem',
        width: '100%'
    },
    iconBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#64748b'
    },
    userProfile: {
        textDecoration: 'none'
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentScroll: {
        flex: 1,
        overflowY: 'auto',
        padding: '2.5rem'
    },
    contentBody: {
        maxWidth: '1200px',
        margin: '0 auto'
    },
    vBadge: {
        fontSize: '0.55rem',
        background: '#f1f5f9',
        color: '#64748b',
        padding: '2px 6px',
        borderRadius: '6px',
        fontWeight: 900,
        marginTop: '2px'
    },
    langDropdown: {
        position: 'absolute',
        top: '120%',
        right: 0,
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        border: '1px solid #f1f5f9',
        minWidth: '180px',
        maxHeight: '300px',
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
        padding: '0.6rem 0.8rem',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        borderRadius: '8px',
        transition: 'all 0.2s',
        gap: '0.5rem',
        color: '#1e293b',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    menuBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#1e293b',
        display: 'none', // Shown via CSS in globals
    },
    sidebarOverlay: {
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 999
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#64748b',
        display: 'none' // Shown in mobile sidebar
    }
};
