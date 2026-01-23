'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppState } from '@/context/StateContext';
import { Menu, X, Home, User, FileText, Settings, LogOut, LayoutGrid, Globe } from 'lucide-react';
import Image from 'next/image';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { user, setIsLoggedIn, setUser } = useAppState();

    const menuItems = [
        { name: 'Home', path: '/', icon: <Home size={20} /> },
        { name: 'All Services', path: '/#services', icon: <LayoutGrid size={20} /> },
        { name: 'My Documents', path: '/documents', icon: <FileText size={20} /> },
        { name: 'Profile', path: '/profile', icon: <User size={20} /> },
        { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
    ];

    const toggleSidebar = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('suvidha_session_user');
        window.location.href = '/login';
    };

    return (
        <>
            {/* Mobile Header Bar */}
            <div style={styles.mobileHeader}>
                <button onClick={toggleSidebar} style={styles.menuBtn}>
                    <Menu size={24} color="#000" />
                </button>
                <div style={styles.brand}>
                    <Image src="/logo.png" alt="Logo" width={32} height={32} />
                    <span style={styles.brandText}>SUVIDHA</span>
                </div>
                <div style={{ width: 24 }} /> {/* Spacer */}
            </div>

            {/* Overlay */}
            {isOpen && <div style={styles.overlay} onClick={toggleSidebar} />}

            {/* Sidebar Drawer */}
            <div style={{
                ...styles.sidebar,
                transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
            }}>
                <div style={styles.sidebarHeader}>
                    <div style={styles.brand}>
                        <Image src="/logo.png" alt="Logo" width={40} height={40} />
                        <span style={styles.brandTextLarge}>SUVIDHA KIOSK</span>
                    </div>
                    <button onClick={toggleSidebar} style={styles.closeBtn}>
                        <X size={24} />
                    </button>
                </div>

                {user && (
                    <div style={styles.userProfile}>
                        <div style={styles.userAvatar}>
                            {user.name.charAt(0)}
                        </div>
                        <div style={styles.userInfo}>
                            <p style={styles.userName}>{user.name}</p>
                            <p style={styles.userMobile}>{user.mobile}</p>
                        </div>
                    </div>
                )}

                <nav style={styles.nav}>
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            style={{
                                ...styles.navItem,
                                backgroundColor: pathname === item.path ? '#eff6ff' : 'transparent',
                                color: pathname === item.path ? '#2563eb' : '#334155',
                                borderRight: pathname === item.path ? '3px solid #2563eb' : 'none'
                            }}
                            onClick={() => setIsOpen(false)}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    ))}

                    <div style={styles.divider} />

                    <button onClick={handleLogout} style={styles.logoutBtn}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </nav>

                <div style={styles.footer}>
                    <p>© 2026 Suvidha Gov</p>
                </div>
            </div>
        </>
    );
}

const styles: Record<string, React.CSSProperties> = {
    mobileHeader: {
        position: 'sticky',
        top: 0,
        height: '60px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
        zIndex: 50,
    },
    menuBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem',
    },
    brand: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    brandText: {
        fontSize: '1.2rem',
        fontWeight: 700,
        color: '#000',
    },
    brandTextLarge: {
        fontSize: '1.4rem',
        fontWeight: 800,
        color: '#2563eb',
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 99,
    },
    sidebar: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '280px',
        backgroundColor: '#fff',
        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        zIndex: 100,
        transition: 'transform 0.3s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
    },
    sidebarHeader: {
        padding: '1.5rem',
        borderBottom: '1px solid #f1f5f9',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#64748b',
    },
    userProfile: {
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        backgroundColor: '#f8fafc',
    },
    userAvatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#2563eb',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '1.2rem',
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    userName: {
        margin: 0,
        fontWeight: 600,
        fontSize: '0.95rem',
    },
    userMobile: {
        margin: 0,
        fontSize: '0.8rem',
        color: '#64748b',
    },
    nav: {
        flex: 1,
        padding: '1rem 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.75rem 1.5rem',
        textDecoration: 'none',
        fontSize: '1rem',
        fontWeight: 500,
        transition: 'all 0.2s',
    },
    divider: {
        height: '1px',
        backgroundColor: '#f1f5f9',
        margin: '1rem 1.5rem',
    },
    logoutBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.75rem 1.5rem',
        background: 'none',
        border: 'none',
        color: '#dc2626',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left',
    },
    footer: {
        padding: '1rem',
        textAlign: 'center',
        borderTop: '1px solid #f1f5f9',
        color: '#94a3b8',
        fontSize: '0.8rem',
    }
};
