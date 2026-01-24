'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { Syringe, Heart, ArrowLeft, ShieldCheck, Archive, LayoutDashboard, History, Search, ChevronRight, Activity, ClipboardList, Thermometer } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AethelLayout from '@/components/AethelLayout';

export default function HealthcarePage() {
    const { language } = useAppState();
    const t = translations[language] || translations.en;
    const router = useRouter();

    const sidebarLinks = [
        { label: 'Health Center', icon: <LayoutDashboard size={20} />, href: '/healthcare', active: true },
        { label: 'Vaccination', icon: <ShieldCheck size={20} />, href: '/healthcare/vaccination' },
        { label: 'Action History', icon: <History size={20} />, href: '/transactions' },
    ];

    const stats = [
        { label: 'ABHA Status', value: 'Verified', sub: 'ID: 88-2710-3321', color: '#16a34a' },
        { label: 'Last Checkup', value: '15 Dec 2025', sub: 'Dr. Ramesh Kumar', color: 'var(--theme-ruby)' },
        { label: 'Vaccination', value: 'Fully Done', sub: 'Covid-19 Dose 3', color: 'var(--theme-azure)' }
    ];

    const services = [
        { title: 'Vaccination Appointment', desc: 'Book doses for all ages', icon: <Syringe size={28} />, href: '/healthcare/vaccination' },
        { title: 'Ayushman Health Card', desc: 'Digital insurance proof', icon: <Heart size={28} />, href: '/healthcare/health-card' },
        { title: 'ABHA Health ID', desc: 'Unified health identity', icon: <ShieldCheck size={28} />, href: '/healthcare/abha' },
        { title: 'Medical Locker', desc: 'Securely store lab reports', icon: <Archive size={28} />, href: '/healthcare/locker' }
    ];

    return (
        <AethelLayout
            title="Healthcare Portal"
            themeColor="var(--theme-ruby)"
            themeSoft="var(--theme-ruby-soft)"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.grid}>
                {/* Stats Row */}
                <div style={styles.statsRow}>
                    {stats.map((stat, i) => (
                        <div key={i} style={styles.statCard}>
                            <p style={styles.statLabel}>{stat.label}</p>
                            <h3 style={{ ...styles.statValue, color: stat.color }}>{stat.value}</h3>
                            <p style={styles.statSub}>{stat.sub}</p>
                        </div>
                    ))}
                </div>

                <div style={styles.mainLayout}>
                    <div style={styles.serviceSection}>
                        <h2 style={styles.sectionTitle}>Medical Services</h2>
                        <div style={styles.serviceGrid}>
                            {services.map((act, i) => (
                                <Link key={i} href={act.href} style={styles.serviceCard}>
                                    <div style={styles.serviceIcon}>{act.icon}</div>
                                    <div style={styles.serviceContent}>
                                        <h3 style={styles.serviceTitle}>{act.title}</h3>
                                        <p style={styles.serviceDesc}>{act.desc}</p>
                                    </div>
                                    <ChevronRight size={20} color="#94a3b8" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div style={styles.sidePanel}>
                        <div style={styles.alertBox}>
                            <Thermometer size={24} color="#e11d48" />
                            <div>
                                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>Winter Care</h4>
                                <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#64748b' }}>Free flu shots available at Ward 12 clinic.</p>
                            </div>
                        </div>

                        <div style={styles.premiumCard}>
                            <div style={styles.premiumHeader}>
                                <ClipboardList size={24} color="white" />
                                <span style={{ color: 'white', fontWeight: 700 }}>Doctor Connect</span>
                            </div>
                            <p style={{ margin: '0.5rem 0', color: 'white', opacity: 0.9, fontSize: '0.85rem' }}>Consult with over 500+ specialists online via Tele-Health.</p>
                            <button style={styles.premiumBtn}>Connect Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </AethelLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    grid: { display: 'flex', flexDirection: 'column', gap: '2.5rem' },
    statsRow: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' },
    statCard: {
        background: 'white', padding: '1.5rem', borderRadius: '24px',
        border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '0.5rem'
    },
    statLabel: { fontSize: '0.85rem', fontWeight: 600, color: '#64748b', margin: 0 },
    statValue: { fontSize: '1.5rem', fontWeight: 800, margin: 0 },
    statSub: { fontSize: '0.75rem', color: '#94a3b8', margin: 0 },
    mainLayout: { display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' },
    serviceSection: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    sectionTitle: { fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' },
    serviceGrid: { display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' },
    serviceCard: {
        background: 'white', padding: '1.5rem', borderRadius: '24px',
        border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center',
        gap: '1.25rem', textDecoration: 'none', transition: 'all 0.2s'
    },
    serviceIcon: {
        width: '56px', height: '56px', background: 'var(--theme-ruby-soft)',
        color: 'var(--theme-ruby)', borderRadius: '16px', display: 'flex',
        alignItems: 'center', justifyContent: 'center'
    },
    serviceContent: { flex: 1 },
    serviceTitle: { fontSize: '1.05rem', fontWeight: 700, color: '#1e293b', margin: 0 },
    serviceDesc: { fontSize: '0.85rem', color: '#64748b', margin: 0 },
    sidePanel: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    alertBox: {
        background: '#fff1f2', border: '1px solid #ffe4e6', borderRadius: '24px',
        padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center'
    },
    premiumCard: {
        background: 'linear-gradient(135deg, #e11d48 0%, #9f1239 100%)',
        borderRadius: '24px', padding: '1.5rem', display: 'flex', flexDirection: 'column',
        gap: '0.5rem'
    },
    premiumHeader: { display: 'flex', gap: '0.75rem', alignItems: 'center' },
    premiumBtn: {
        background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none',
        padding: '0.75rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', marginTop: '0.5rem'
    }
};
