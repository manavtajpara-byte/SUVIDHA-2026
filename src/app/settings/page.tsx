'use client';

import React from 'react';
import AethelLayout from '@/components/AethelLayout';
import { Settings, User, Bell, Shield, Moon, Globe, ChevronRight } from 'lucide-react';
import { useAppState } from '@/context/StateContext';

export default function SettingsPage() {
    const { language, setLanguage } = useAppState();

    const sidebarLinks = [
        { label: 'General Settings', icon: <Settings size={20} />, href: '/settings', active: true },
        { label: 'Privacy', icon: <Shield size={20} />, href: '/settings/privacy' },
    ];

    const settingSections = [
        { title: 'Account Settings', icon: <User size={20} />, items: ['Update Phone Number', 'Identity Verification', 'Linked Documents'] },
        { title: 'Notifications', icon: <Bell size={20} />, items: ['Email Alerts', 'SMS Notifications', 'System Sounds'] },
        { title: 'App Theme', icon: <Moon size={20} />, items: ['Dark Mode', 'Glassmorphism Effects', 'Reduced Motion'] },
    ];

    return (
        <AethelLayout
            title="App Settings"
            themeColor="#475569"
            themeSoft="#f1f5f9"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Preferences</h1>
                    <p style={styles.subtitle}>Manage your profile, data, and application experience.</p>
                </div>

                <div style={styles.main}>
                    <div style={styles.settingsGrid}>
                        {settingSections.map((section, i) => (
                            <div key={i} style={styles.card}>
                                <div style={styles.cardHeader}>
                                    <div style={styles.iconBox}>{section.icon}</div>
                                    <h3 style={styles.sectionTitle}>{section.title}</h3>
                                </div>
                                <div style={styles.itemList}>
                                    {section.items.map((item, j) => (
                                        <div key={j} style={styles.item}>
                                            <span>{item}</span>
                                            <ChevronRight size={18} color="#94a3b8" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={styles.sidePanel}>
                        <div style={styles.langCard}>
                            <div style={styles.langHeader}>
                                <Globe size={24} color="#2563eb" />
                                <h3 style={styles.langTitle}>Language / भाषा</h3>
                            </div>
                            <div style={styles.langOptions}>
                                <button
                                    onClick={() => setLanguage('en')}
                                    style={{ ...styles.langBtn, background: language === 'en' ? '#2563eb' : 'white', color: language === 'en' ? 'white' : '#1e293b' }}
                                >
                                    English
                                </button>
                                <button
                                    onClick={() => setLanguage('hi')}
                                    style={{ ...styles.langBtn, background: language === 'hi' ? '#2563eb' : 'white', color: language === 'hi' ? 'white' : '#1e293b' }}
                                >
                                    हिन्दी
                                </button>
                            </div>
                        </div>

                        <div style={styles.dangerZone}>
                            <h3 style={{ margin: 0, color: '#ef4444', fontSize: '1rem', fontWeight: 800 }}>Security Lockdown</h3>
                            <p style={{ margin: '0.5rem 0', fontSize: '0.85rem', color: '#64748b' }}>Immediately invalidate all active sessions and reset credentials.</p>
                            <button style={styles.dangerBtn}>Lock Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </AethelLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { display: 'flex', flexDirection: 'column', gap: '2.5rem' },
    header: { marginBottom: '0.5rem' },
    title: { fontSize: '2rem', fontWeight: 800, color: '#1e293b', margin: 0 },
    subtitle: { fontSize: '1rem', color: '#64748b', marginTop: '0.5rem' },
    main: { display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem' },
    settingsGrid: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    card: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '24px', overflow: 'hidden' },
    cardHeader: { padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '1rem' },
    iconBox: { width: '40px', height: '40px', background: '#f8fafc', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    sectionTitle: { fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', margin: 0 },
    itemList: { display: 'flex', flexDirection: 'column' },
    item: { padding: '1.25rem 2rem', borderBottom: '1px solid #f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.95rem', color: '#475569', cursor: 'pointer' },
    sidePanel: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    langCard: { background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #f1f5f9' },
    langHeader: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' },
    langTitle: { fontSize: '1rem', fontWeight: 800, color: '#1e293b', margin: 0 },
    langOptions: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    langBtn: { padding: '0.8rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' },
    dangerZone: { border: '2px dashed #fee2e2', padding: '1.5rem', borderRadius: '24px', background: '#fef2f2' },
    dangerBtn: { background: '#ef4444', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '12px', fontWeight: 800, width: '100%', cursor: 'pointer', marginTop: '1rem' }
};
