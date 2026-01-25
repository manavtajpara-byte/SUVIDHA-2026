'use client';

import React from 'react';
import AethelLayout from '@/components/AethelLayout';
import { Settings, User, Bell, Shield, Moon, Globe, ChevronRight, FileDown, Trash2, CheckCircle2, Lock } from 'lucide-react';
import { useAppState } from '@/context/StateContext';
import { PrivacyManager, ConsentProfile } from '@/utils/PrivacyManager';

export default function SettingsPage() {
    const { language, setLanguage, addToast } = useAppState();
    const [consent, setConsent] = React.useState<ConsentProfile>(PrivacyManager.getConsent());

    const updateConsent = (key: keyof ConsentProfile) => {
        if (typeof consent[key] === 'boolean') {
            const newVal = !consent[key];
            const updated = PrivacyManager.updateConsent({ [key]: newVal });
            setConsent(updated);
            addToast({ message: `Consent for ${key} updated.`, type: 'success' });
        }
    };

    const handleExport = () => {
        const data = PrivacyManager.exportData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `suvidha_data_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        addToast({ message: "Data exported successfully.", type: 'success' });
    };

    const handleErasure = () => {
        if (confirm("Are you sure? This will purge ALL your local data from this kiosk under DPDP Right to Erasure.")) {
            PrivacyManager.requestErasure();
            addToast({ message: "Data Purged. Logging out...", type: 'warning' });
            setTimeout(() => window.location.href = '/login', 2000);
        }
    };

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

                        <div style={styles.card}>
                            <div style={styles.cardHeader}>
                                <div style={{ ...styles.iconBox, background: '#f0fdf4', color: '#16a34a' }}><Shield size={20} /></div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={styles.sectionTitle}>Privacy & Data Governance (DPDP)</h3>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>Manage your sovereign data consents</p>
                                </div>
                                <Lock size={16} color="#16a34a" />
                            </div>
                            <div style={styles.consentList}>
                                {[
                                    { key: 'aadhaar', label: 'Allow Aadhaar Authentication for Services' },
                                    { key: 'location', label: 'Allow Location for Municipal Service Tracking' },
                                    { key: 'healthRecords', label: 'Share Health Records with eSanjeevani Doctors' },
                                    { key: 'marketing', label: 'Receive New Scheme Notifications (SMS/Push)' }
                                ].map((c, i) => (
                                    <div key={i} style={styles.consentItem}>
                                        <div style={styles.consentLabel}>
                                            <span style={styles.cLabel}>{c.label}</span>
                                            <p style={styles.cSub}>Current Status: {consent[c.key as keyof ConsentProfile] ? 'Granted' : 'Revoked'}</p>
                                        </div>
                                        <button
                                            onClick={() => updateConsent(c.key as keyof ConsentProfile)}
                                            style={{ ...styles.toggle, background: consent[c.key as keyof ConsentProfile] ? '#10b981' : '#cbd5e1' }}
                                        >
                                            <div style={{ ...styles.toggleDot, transform: consent[c.key as keyof ConsentProfile] ? 'translateX(20px)' : 'translateX(0)' }} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div style={styles.dataActions}>
                                <button onClick={handleExport} style={styles.actionBtn}><FileDown size={18} /> Export My Data (JSON)</button>
                                <button onClick={handleErasure} style={{ ...styles.actionBtn, color: '#ef4444' }}><Trash2 size={18} /> Request Data Erasure</button>
                            </div>
                        </div>
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
    dangerBtn: { background: '#ef4444', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '12px', fontWeight: 800, width: '100%', cursor: 'pointer', marginTop: '1rem' },
    consentList: { display: 'flex', flexDirection: 'column', padding: '1rem 0' },
    consentItem: { padding: '1.25rem 2rem', borderBottom: '1px solid #f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    consentLabel: { flex: 1 },
    cLabel: { fontSize: '0.95rem', fontWeight: 700, color: '#1e293b' },
    cSub: { margin: '0.25rem 0 0', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 },
    toggle: { width: '44px', height: '24px', borderRadius: '12px', padding: '2px', border: 'none', cursor: 'pointer', transition: 'all 0.3s', position: 'relative' },
    toggleDot: { width: '20px', height: '20px', background: 'white', borderRadius: '50%', transition: 'all 0.3s' },
    dataActions: { padding: '1.5rem 2rem', background: '#f8fafc', display: 'flex', gap: '1rem' },
    actionBtn: { background: 'white', border: '1px solid #e2e8f0', padding: '0.6rem 1rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#475569' }
};
