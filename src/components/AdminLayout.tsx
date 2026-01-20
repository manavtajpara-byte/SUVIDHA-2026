'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, Users, MessageSquare, Settings, LogOut, Activity } from 'lucide-react';

interface AdminSidebarProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminSidebarProps) {
    const router = useRouter();
    const pathname = usePathname();

    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: <Activity size={20} />, label: 'Live Traffic', path: '/admin/traffic' },
        { icon: <MessageSquare size={20} />, label: 'Feedback', path: '/admin/feedback' },
        { icon: <Settings size={20} />, label: 'Settings', path: '/admin/settings' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('admin_session');
        router.push('/admin/login');
    };

    return (
        <div style={styles.container}>
            {/* Sidebar */}
            <aside style={styles.sidebar}>
                <div style={styles.brand}>
                    <div style={styles.logo}>S</div>
                    <div>
                        <h2 style={styles.brandName}>SUVIDHA</h2>
                        <span style={styles.brandBadge}>ADMIN</span>
                    </div>
                </div>

                <nav style={styles.nav}>
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => router.push(item.path)}
                            style={{
                                ...styles.navItem,
                                backgroundColor: pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent',
                                opacity: pathname === item.path ? 1 : 0.7,
                            }}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div style={styles.footer}>
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                        <LogOut size={20} />
                        Logout
                    </button>
                    <p style={styles.version}>v2.0.1 (Stable)</p>
                </div>
            </aside>

            {/* Main Content */}
            <main style={styles.main}>
                {children}
            </main>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        background: '#f1f5f9',
    },
    sidebar: {
        width: '280px',
        backgroundColor: '#1e293b',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem',
        position: 'sticky',
        top: 0,
        height: '100vh',
    },
    brand: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '3rem',
    },
    logo: {
        width: '40px',
        height: '40px',
        background: 'var(--primary)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 900,
        fontSize: '1.5rem',
    },
    brandName: {
        margin: 0,
        fontSize: '1.2rem',
        fontWeight: 700,
    },
    brandBadge: {
        fontSize: '0.7rem',
        background: 'rgba(255,255,255,0.2)',
        padding: '2px 6px',
        borderRadius: '4px',
        fontWeight: 600,
        letterSpacing: '1px',
    },
    nav: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        flex: 1,
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        borderRadius: '1rem',
        border: 'none',
        color: 'white',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
        textAlign: 'left',
    },
    footer: {
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: '1.5rem',
    },
    logoutBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        color: '#ef4444',
        background: 'transparent',
        border: 'none',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        width: '100%',
    },
    version: {
        margin: '1rem 0 0 0',
        fontSize: '0.8rem',
        color: '#64748b',
        textAlign: 'center',
    },
    main: {
        flex: 1,
        padding: '2rem',
        overflowY: 'auto',
    }
};
