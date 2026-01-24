'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { useRouter } from 'next/navigation';
import { PhoneCall, Phone, AlertCircle, ShieldAlert, Heart, Siren, Search, LayoutDashboard, History, Bell, Search as SearchIcon, Globe, ChevronRight, AlertTriangle, Flame } from 'lucide-react';
import AethelLayout from '@/components/AethelLayout';

export default function EmergencyPage() {
    const { language } = useAppState();
    const t = translations[language] || translations.en;
    const router = useRouter();
    const [calling, setCalling] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const emergencyServices = [
        { label: 'Panic Button', number: '112', desc: 'SOS - All Emergencies', icon: <Siren size={32} />, color: '#e11d48', category: 'Priority' },
        { label: 'Police Help', number: '100', desc: 'Law Enforcement', icon: <ShieldAlert size={32} />, color: '#1d4ed8', category: 'Emergency' },
        { label: 'Fire & Rescue', number: '101', desc: 'Accidents & Fire', icon: <Flame size={32} />, color: '#ea580c', category: 'Emergency' },
        { label: 'Ambulance', number: '108', desc: 'Medical Emergency', icon: <Heart size={32} />, color: '#16a34a', category: 'Emergency' },
        { label: 'Women Helpline', number: '1091', desc: 'Safety & Protection', icon: <Phone size={32} />, color: '#db2777', category: 'Safety' },
        { label: 'Child Helpline', number: '1098', desc: 'Child welfare/Missing', icon: <Phone size={32} />, color: '#be185d', category: 'Safety' },
        { label: 'Cyber Crime', number: '1930', desc: 'Online Fraud/Abuse', icon: <AlertCircle size={32} />, color: '#1e293b', category: 'Crime' },
        { label: 'LPG Leak', number: '1906', desc: 'Gas Emergency', icon: <Flame size={32} />, color: '#d97706', category: 'Home' }
    ];

    const sidebarLinks = [
        { label: 'Safety Dashboard', icon: <LayoutDashboard size={20} />, href: '/emergency', active: true },
        { label: 'Heath Portal', icon: <Heart size={20} />, href: '/healthcare' },
        { label: 'Recent Alerts', icon: <Bell size={20} />, href: '/alerts' },
    ];

    const handleCall = (service: string, number: string) => {
        setCalling(service);
        setTimeout(() => {
            alert(`Emergency Call Simulation: Dialing ${number} for ${service}...`);
            setCalling(null);
        }, 1500);
    };

    return (
        <AethelLayout
            title="Emergency Shield"
            themeColor="var(--theme-ruby)"
            themeSoft="var(--theme-ruby-soft)"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.emergencyGrid}>
                {/* Panic Row */}
                <div style={styles.panicRow}>
                    <div style={styles.panicBanner}>
                        <div style={styles.panicIcon}><Siren size={40} color="white" /></div>
                        <div>
                            <h2 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>National SOS Dial 112</h2>
                            <p style={{ color: 'white', opacity: 0.9, margin: 0, fontSize: '0.9rem' }}>One number for Police, Fire, and Ambulance</p>
                        </div>
                        <button onClick={() => handleCall('National SOS', '112')} style={styles.sosBtn}>TRRIGGER SOS</button>
                    </div>
                </div>

                <div style={styles.mainLayout}>
                    <div style={styles.directorySection}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>Emergency Directory</h2>
                            <div style={styles.searchBox}><SearchIcon size={18} /><input placeholder="Search helplines..." style={styles.searchInput} /></div>
                        </div>

                        <div style={styles.cardGrid}>
                            {emergencyServices.map((svc, i) => (
                                <button key={i} onClick={() => handleCall(svc.label, svc.number)} style={styles.serviceCard}>
                                    <div style={{ ...styles.iconLabel, background: `${svc.color}15`, color: svc.color }}>{svc.icon}</div>
                                    <div style={styles.serviceContent}>
                                        <div style={styles.numberBadge}>{svc.number}</div>
                                        <h3 style={styles.serviceTitle}>{svc.label}</h3>
                                        <p style={styles.serviceDesc}>{svc.desc}</p>
                                    </div>
                                    <PhoneCall size={20} color="#94a3b8" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={styles.sidePanel}>
                        <div style={styles.guidanceBox}>
                            <Heart size={24} color="#e11d48" />
                            <div>
                                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>First Aid AI</h4>
                                <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#64748b' }}>Tap for instant CPR or burns guidance.</p>
                            </div>
                        </div>

                        <div style={styles.statusCard}>
                            <div style={styles.statusPulse}></div>
                            <h3 style={{ margin: 0, color: '#1e293b' }}>Safe Area Status</h3>
                            <p style={{ margin: 0, color: '#64748b', fontSize: '0.8rem' }}>Ward 12: High Alert (Monsoon)</p>
                            <button style={styles.statusBtn}>View Map</button>
                        </div>
                    </div>
                </div>
            </div>
            {calling && (
                <div style={styles.callingOverlay}>
                    <div style={styles.callingCard}>
                        <div style={styles.pulseIcon}><PhoneCall size={48} color="white" /></div>
                        <h2>Dialing {calling}...</h2>
                        <p>Connecting you to the nearest emergency responder</p>
                        <button onClick={() => setCalling(null)} style={styles.cancelCall}>Cancel Call</button>
                    </div>
                </div>
            )}
        </AethelLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    emergencyGrid: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    panicRow: { background: 'linear-gradient(135deg, #e11d48 0%, #be185d 100%)', borderRadius: '32px', padding: '2rem', boxShadow: '0 20px 40px rgba(225, 29, 72, 0.2)' },
    panicBanner: { display: 'flex', alignItems: 'center', gap: '2rem' },
    panicIcon: { width: '80px', height: '80px', background: 'rgba(255,255,255,0.2)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    sosBtn: { marginLeft: 'auto', background: 'white', color: '#e11d48', border: 'none', padding: '1rem 2.5rem', borderRadius: '16px', fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' },
    mainLayout: { display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem' },
    directorySection: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    sectionTitle: { fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', margin: 0 },
    searchBox: { display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f8fafc', padding: '0.75rem 1.25rem', borderRadius: '16px', border: '1px solid #e1e5e8' },
    searchInput: { border: 'none', background: 'none', outline: 'none', color: '#1e293b', fontWeight: 600 },
    cardGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
    serviceCard: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '24px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left' },
    iconLabel: { width: '64px', height: '64px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    serviceContent: { flex: 1 },
    numberBadge: { background: '#f1f5f9', color: '#1e293b', padding: '0.2rem 0.6rem', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 800, width: 'fit-content', marginBottom: '0.4rem' },
    serviceTitle: { fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', margin: 0 },
    serviceDesc: { fontSize: '0.8rem', color: '#64748b', margin: 0 },
    sidePanel: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    guidanceBox: { background: '#fff1f2', border: '1px solid #ffe4e6', borderRadius: '24px', padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'center' },
    statusCard: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' },
    statusPulse: { position: 'absolute', top: '2rem', right: '2rem', width: '12px', height: '12px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 0 4px rgba(16, 185, 129, 0.2)' },
    statusBtn: { background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.75rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' },
    callingOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    callingCard: { background: '#1e293b', padding: '4rem', borderRadius: '40px', textAlign: 'center', color: 'white', display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '440px' },
    pulseIcon: { width: '96px', height: '96px', background: '#e11d48', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', animation: 'pulse 2s infinite' },
    cancelCall: { background: '#334155', border: 'none', color: 'white', padding: '1.25rem', borderRadius: '20px', fontWeight: 700, cursor: 'pointer', marginTop: '1rem' }
};
