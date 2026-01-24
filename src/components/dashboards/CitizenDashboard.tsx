'use client';

import React from 'react';
import { Cloud, Zap, Droplets, Newspaper, ArrowRight, ZapOff, Wind, ShieldAlert, ChevronRight, Activity } from 'lucide-react';
import { useAppState } from '@/context/StateContext';

export default function CitizenDashboard() {
    const { user } = useAppState();

    const quickTiles = [
        { label: 'Electricity', icon: <Zap size={20} />, color: '#f59e0b', sub: 'Pay Bill' },
        { label: 'Water Tax', icon: <Droplets size={20} />, color: '#0ea5e9', sub: 'View Dues' },
        { label: 'Rashan Status', icon: <Activity size={20} />, color: '#10b981', sub: 'Verified' }
    ];

    return (
        <div style={styles.citizenContainer}>
            <div style={styles.topBar}>
                <div style={styles.headerInfo}>
                    <h2 style={styles.title}>Welcome back, {user?.name.split(' ')[0] || 'Citizen'}</h2>
                    <p style={styles.subtitle}>Unified access to your local civic services</p>
                </div>
            </div>

            <div style={styles.mainGrid}>
                <div style={styles.leftCol}>
                    <h3 style={styles.sectionLabel}>Priority Services</h3>
                    <div style={styles.tileGrid}>
                        {quickTiles.map((tile, i) => (
                            <div key={i} style={styles.tile}>
                                <div style={{ ...styles.tileIcon, background: `${tile.color}15`, color: tile.color }}>{tile.icon}</div>
                                <div style={styles.tileInfo}>
                                    <h4 style={styles.tileTitle}>{tile.label}</h4>
                                    <p style={styles.tileSub}>{tile.sub}</p>
                                </div>
                                <ChevronRight size={16} color="#94a3b8" />
                            </div>
                        ))}
                    </div>

                    <div style={styles.newsSection}>
                        <div style={styles.sectionHeader}>
                            <h3 style={styles.sectionLabel}>Civic Notifications</h3>
                            <button style={styles.textLink}>View Archive</button>
                        </div>
                        <div style={styles.newsStack}>
                            <div style={styles.newsCard}>
                                <div style={styles.newsDate}>MAY 12</div>
                                <div style={styles.newsContent}>
                                    <h4 style={styles.newsTitle}>Public Park Inauguration</h4>
                                    <p style={styles.newsDesc}>Ward 12's new digital park opens this Sunday for all residents.</p>
                                </div>
                            </div>
                            <div style={styles.newsCard}>
                                <div style={{ ...styles.newsDate, color: '#f59e0b' }}>MAY 11</div>
                                <div style={styles.newsContent}>
                                    <h4 style={styles.newsTitle}>Maintenance Alert</h4>
                                    <p style={styles.newsDesc}>Scheduled water supply outage tomorrow (10 AM - 2 PM) for pipeline repair.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={styles.rightCol}>
                    <div style={styles.environmentCard}>
                        <div style={styles.envHeader}>
                            <Cloud size={32} color="var(--theme-azure)" />
                            <div style={styles.temp}>28°C</div>
                        </div>
                        <div style={styles.envMetrics}>
                            <div style={styles.envItem}><Wind size={16} /> 12km/h <p>Wind</p></div>
                            <div style={styles.envDivider} />
                            <div style={styles.envItem}><Activity size={16} /> 55 <p>AQI (Good)</p></div>
                        </div>
                    </div>

                    <div style={styles.alertPanel}>
                        <ShieldAlert size={24} color="#e11d48" />
                        <h4 style={{ margin: '0.5rem 0 0.25rem', fontWeight: 800 }}>Safety Matrix</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>WARD 12 status is Green. No active emergency protocols.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    citizenContainer: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    topBar: { marginBottom: '0.5rem' },
    title: { fontSize: '1.75rem', fontWeight: 900, color: '#1e293b', margin: 0 },
    subtitle: { fontSize: '0.95rem', color: '#64748b', margin: '0.25rem 0 0' },
    mainGrid: { display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' },
    leftCol: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    sectionLabel: { fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '1rem' },
    tileGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
    tile: { background: 'white', padding: '1.25rem', borderRadius: '24px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' },
    tileIcon: { width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    tileInfo: { flex: 1 },
    tileTitle: { margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#1e293b' },
    tileSub: { margin: '0.1rem 0 0', fontSize: '0.75rem', color: '#64748b' },
    newsSection: { marginTop: '1rem' },
    sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    textLink: { background: 'none', border: 'none', color: '#2563eb', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' },
    newsStack: { display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' },
    newsCard: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '20px', padding: '1.25rem', display: 'flex', gap: '1.25rem' },
    newsDate: { fontWeight: 900, fontSize: '0.75rem', color: '#9333ea', width: '40px', lineHeight: 1.2 },
    newsContent: { flex: 1 },
    newsTitle: { margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#1e293b' },
    newsDesc: { margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#64748b', lineHeight: 1.4 },
    rightCol: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    environmentCard: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column' },
    envHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    temp: { fontSize: '2.5rem', fontWeight: 900, color: '#1e293b' },
    envMetrics: { display: 'flex', justifyContent: 'space-between', gap: '1rem' },
    envItem: { fontSize: '0.85rem', fontWeight: 700, color: '#1e293b', display: 'flex', flexDirection: 'column', gap: '0.2rem' },
    envDivider: { width: '1px', background: '#f1f5f9' },
    alertPanel: { background: '#fff1f2', border: '1px solid #ffe4e6', borderRadius: '24px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }
};
