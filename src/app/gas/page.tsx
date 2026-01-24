'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { Receipt, FilePlus, AlertTriangle, ArrowLeft, LayoutDashboard, Flame, History, Bell, Search, Globe, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AethelLayout from '@/components/AethelLayout';

export default function GasPage() {
    const { language } = useAppState();
    const t = translations[language] || translations.en;
    const router = useRouter();

    const sidebarLinks = [
        { label: 'Gas Hub', icon: <LayoutDashboard size={20} />, href: '/gas', active: true },
        { label: 'Pay Bill', icon: <Receipt size={20} />, href: '/gas/pay' },
        { label: 'New Connection', icon: <FilePlus size={20} />, href: '/gas/new' },
        { label: 'Report Leak', icon: <AlertTriangle size={20} />, href: '/gas/outage' },
        { label: 'Usage History', icon: <History size={20} />, href: '/transactions' },
    ];

    const stats = [
        { label: 'Current Balance', value: '₹ 840.00', sub: 'Last refill: 12 Jan', color: 'var(--theme-amber)' },
        { label: 'Next Refill', value: 'Estimated 5 Feb', sub: '90% Tank Capacity', color: '#10b981' },
        { label: 'Consumer ID', value: '50021489', sub: 'Indane Gas Service', color: 'var(--theme-azure)' }
    ];

    const actions = [
        { title: 'Pay Gas Bill', desc: 'Secure payment gateway', icon: <Receipt size={28} />, href: '/gas/pay' },
        { title: 'New Connection', desc: 'Apply for LPG pipeline', icon: <FilePlus size={28} />, href: '/gas/new' },
        { title: 'Report Leak', desc: 'Emergency response team', icon: <AlertTriangle size={28} />, href: '/gas/outage' }
    ];

    return (
        <AethelLayout
            title="LPG & Gas Portal"
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
                        <h2 style={styles.sectionTitle}>Main Services</h2>
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
                        <div style={styles.safetyBox}>
                            <Flame size={24} color="var(--theme-amber)" />
                            <div>
                                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>Winter Safety</h4>
                                <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#64748b' }}>Keep vents clear and check for leaks.</p>
                            </div>
                        </div>

                        <div style={styles.promoCard}>
                            <Flame size={40} color="white" />
                            <h3 style={{ margin: 0, color: 'white' }}>PNG Upgrade</h3>
                            <p style={{ margin: 0, color: 'white', opacity: 0.8, fontSize: '0.8rem' }}>Switch from cylinder to piped gas today.</p>
                            <button style={styles.promoBtn}>Apply Now</button>
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
    safetyBox: {
        background: 'var(--theme-amber-soft)', border: '1px solid var(--theme-amber)', borderRadius: '24px',
        padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center'
    },
    promoCard: {
        background: 'linear-gradient(135deg, #475569 0%, #1e293b 100%)',
        borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column',
        gap: '1rem', position: 'relative', overflow: 'hidden'
    },
    promoBtn: {
        background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white',
        padding: '0.75rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer'
    }
};
