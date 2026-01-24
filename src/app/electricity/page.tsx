'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { Receipt, FilePlus, AlertTriangle, ArrowLeft, LayoutDashboard, Zap, History, Bell, Search, Globe, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import AethelLayout from '@/components/AethelLayout';

export default function ElectricityPage() {
    const { language } = useAppState();
    const t = translations[language] || translations.en;
    const router = useRouter();

    const sidebarLinks = [
        { label: 'Energy Hub', icon: <LayoutDashboard size={20} />, href: '/electricity', active: true },
        { label: 'Quick Pay', icon: <Receipt size={20} />, href: '/electricity/pay' },
        { label: 'New Connection', icon: <FilePlus size={20} />, href: '/electricity/new' },
        { label: 'Outage Report', icon: <AlertTriangle size={20} />, href: '/electricity/outage' },
        { label: 'Usage History', icon: <History size={20} />, href: '/transactions' },
    ];

    const stats = [
        { label: 'Current Bill', value: '₹ 2,450.00', sub: 'Due in 12 days', color: 'var(--theme-amber)' },
        { label: 'Energy Saved', value: '15%', sub: 'vs last month', color: '#10b981' },
        { label: 'Connections', value: '01 Active', sub: 'Service No: 45012', color: 'var(--theme-azure)' }
    ];

    const actions = [
        { title: 'Pay Bill', desc: 'Instant online payment', icon: <Receipt size={28} />, href: '/electricity/pay' },
        { title: 'New Connection', desc: 'Apply for residential/com', icon: <FilePlus size={28} />, href: '/electricity/new' },
        { title: 'Usage Analytics', desc: 'Real-time consumption', icon: <Zap size={28} />, href: '/transactions' }
    ];

    return (
        <AethelLayout
            title="Electricity Portal"
            themeColor="var(--theme-amber)"
            themeSoft="var(--theme-amber-soft)"
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

                {/* Main Action Area */}
                <div style={styles.mainLayout}>
                    <div style={styles.actionSection}>
                        <h2 style={styles.sectionTitle}>Main Actions</h2>
                        <div style={styles.actionGrid}>
                            {actions.map((act, i) => (
                                <Link key={i} href={act.href} style={styles.actionCard}>
                                    <div style={styles.actionIcon}>{act.icon}</div>
                                    <div style={styles.actionContent}>
                                        <h3 style={styles.actionTitle}>{act.title}</h3>
                                        <p style={styles.actionDesc}>{act.desc}</p>
                                    </div>
                                    <ChevronRight size={20} color="#94a3b8" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div style={styles.sidePanel}>
                        <div style={styles.alertBox}>
                            <AlertTriangle size={24} color="#e11d48" />
                            <div>
                                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>Planned Outage</h4>
                                <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#64748b' }}>Area 4B: Sunday 10AM - 2PM</p>
                            </div>
                        </div>

                        <div style={styles.promoCard}>
                            <Zap size={40} color="white" />
                            <h3 style={{ margin: 0, color: 'white' }}>Go Solar</h3>
                            <p style={{ margin: 0, color: 'white', opacity: 0.8, fontSize: '0.8rem' }}>Apply for Rooftop Solar Subsidy today.</p>
                            <button style={styles.promoBtn}>Learn More</button>
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
    statValue: { fontSize: '1.75rem', fontWeight: 800, margin: 0 },
    statSub: { fontSize: '0.75rem', color: '#94a3b8', margin: 0 },
    mainLayout: { display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' },
    actionSection: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    sectionTitle: { fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' },
    actionGrid: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    actionCard: {
        background: 'white', padding: '1.5rem', borderRadius: '24px',
        border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center',
        gap: '1.25rem', textDecoration: 'none', transition: 'all 0.2s'
    },
    actionIcon: {
        width: '56px', height: '56px', background: 'var(--theme-amber-soft)',
        color: 'var(--theme-amber)', borderRadius: '16px', display: 'flex',
        alignItems: 'center', justifyContent: 'center'
    },
    actionContent: { flex: 1 },
    actionTitle: { fontSize: '1.05rem', fontWeight: 700, color: '#1e293b', margin: 0 },
    actionDesc: { fontSize: '0.85rem', color: '#64748b', margin: 0 },
    sidePanel: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    alertBox: {
        background: '#fff1f2', border: '1px solid #ffe4e6', borderRadius: '24px',
        padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center'
    },
    promoCard: {
        background: 'linear-gradient(135deg, var(--theme-amber) 0%, #f59e0b 100%)',
        borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column',
        gap: '1rem', position: 'relative', overflow: 'hidden'
    },
    promoBtn: {
        background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white',
        padding: '0.75rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer'
    }
};
