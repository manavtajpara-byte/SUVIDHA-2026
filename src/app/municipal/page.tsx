'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { Droplets, MessageSquare, FileText, ArrowLeft, LayoutDashboard, Building2, Landmark, History, Search, ChevronRight, Gavel, FileCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AethelLayout from '@/components/AethelLayout';

export default function MunicipalPage() {
    const { language } = useAppState();
    const t = translations[language] || translations.en;
    const router = useRouter();

    const sidebarLinks = [
        { label: 'Citizen Hub', icon: <LayoutDashboard size={20} />, href: '/municipal', active: true },
        { label: 'Water Tax', icon: <Droplets size={20} />, href: '/municipal/water' },
        { label: 'Property Tax', icon: <Landmark size={20} />, href: '/property-tax' },
        { label: 'Grievance', icon: <MessageSquare size={20} />, href: '/municipal/grievance' },
        { label: 'Certificates', icon: <FileCheck size={20} />, href: '/municipal/certificates' },
    ];

    const stats = [
        { label: 'Active Dues', value: '₹ 3,420.00', sub: 'Water Tax Q4', color: 'var(--theme-ocean)' },
        { label: 'Applications', value: '02 Pending', sub: 'Birth/Marriage Cert', color: '#10b981' },
        { label: 'Zone ID', value: 'West-Zone 04', sub: 'Ward No: 12', color: 'var(--theme-azure)' }
    ];

    const services = [
        { title: 'Water Tax', desc: 'Manage connections & bills', icon: <Droplets size={28} />, href: '/municipal/water' },
        { title: 'Property Tax', desc: 'Land and house assessment', icon: <Landmark size={28} />, href: '/property-tax' },
        { title: 'Grievance Redressal', desc: 'Lodge civic complaints', icon: <MessageSquare size={28} />, href: '/municipal/grievance' },
        { title: 'Certificates', desc: 'Birth, Death & Marriage', icon: <FileCheck size={28} />, href: '/municipal/certificates' }
    ];

    return (
        <AethelLayout
            title="Municipal Portal"
            themeColor="var(--theme-ocean)"
            themeSoft="var(--theme-ocean-soft)"
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
                        <h2 style={styles.sectionTitle}>Civic Services</h2>
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
                        <div style={styles.eventBox}>
                            <Gavel size={24} color="var(--theme-ocean)" />
                            <div>
                                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>Lok Adalat</h4>
                                <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#64748b' }}>Settling disputes this Sat at Ward 12.</p>
                            </div>
                        </div>

                        <div style={styles.digitalCard}>
                            <div style={styles.digitalHeader}>
                                <FileText size={24} color="white" />
                                <span style={{ color: 'white', fontWeight: 700 }}>Digital Gram</span>
                            </div>
                            <p style={{ margin: '0.5rem 0', color: 'white', opacity: 0.9, fontSize: '0.85rem' }}>Apply for all types of certificates online in minutes.</p>
                            <button style={styles.digitalBtn}>Apply Now</button>
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
    serviceSection: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    sectionTitle: { fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' },
    serviceGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
    serviceCard: {
        background: 'white', padding: '1.25rem', borderRadius: '24px',
        border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center',
        gap: '1rem', textDecoration: 'none', transition: 'all 0.2s'
    },
    serviceIcon: {
        width: '48px', height: '48px', background: 'var(--theme-ocean-soft)',
        color: 'var(--theme-ocean)', borderRadius: '14px', display: 'flex',
        alignItems: 'center', justifyContent: 'center'
    },
    serviceContent: { flex: 1 },
    serviceTitle: { fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', margin: 0 },
    serviceDesc: { fontSize: '0.75rem', color: '#64748b', margin: 0 },
    sidePanel: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    eventBox: {
        background: 'var(--theme-ocean-soft)', border: '1px solid var(--theme-ocean)', borderRadius: '24px',
        padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center'
    },
    digitalCard: {
        background: 'linear-gradient(135deg, var(--theme-ocean) 0%, #0e7490 100%)',
        borderRadius: '24px', padding: '1.5rem', display: 'flex', flexDirection: 'column',
        gap: '0.5rem'
    },
    digitalHeader: { display: 'flex', gap: '0.75rem', alignItems: 'center' },
    digitalBtn: {
        background: 'white', color: 'var(--theme-ocean)', border: 'none',
        padding: '0.75rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', marginTop: '0.5rem'
    }
};
