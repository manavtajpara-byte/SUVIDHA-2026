'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import Link from 'next/link';
import { Landmark, GraduationCap, Radio, Sparkles, ArrowLeft, Eye, BarChart3, Brain, LayoutDashboard, History, Search, ChevronRight, Zap, Target, Globe, Cpu } from 'lucide-react';
import AethelLayout from '@/components/AethelLayout';

export default function VisionDashboardPage() {
    const sidebarLinks = [
        { label: 'Vision Hub', icon: <Target size={20} />, href: '/vision', active: true },
        { label: 'Smart Village', icon: <Radio size={20} />, href: '/vision/smart-village' },
        { label: 'AI Training', icon: <Cpu size={20} />, href: '/vision/ai-training-hub' },
        { label: 'Gov Watch', icon: <Eye size={20} />, href: '/transparency' },
    ];

    const sectors = [
        { title: 'Financial Inclusion', desc: 'AEPS & Micro-ATM', icon: <Landmark size={24} />, href: '/vision/financial-inclusion' },
        { title: 'Education 2.0', desc: 'Skill India AI Match', icon: <GraduationCap size={24} />, href: '/vision/education-hub' },
        { title: 'Smart Village', desc: 'IoT Water & Air Monitoring', icon: <Radio size={24} />, href: '/vision/smart-village' },
        { title: 'AR Public Guide', desc: 'Mixed Reality Assistance', icon: <Eye size={24} />, href: '/vision/ar-training' },
        { title: 'Predictive Cities', desc: 'AI Heatmaps & Analytics', icon: <BarChart3 size={24} />, href: '/vision/predictive-governance' },
        { title: 'AI Training Hub', desc: 'Deep Evolve Stage 2', icon: <Brain size={24} />, href: '/vision/ai-training-hub' }
    ];

    return (
        <AethelLayout
            title="Vision 2030 Portal"
            themeColor="var(--theme-indigo)"
            themeSoft="var(--theme-indigo-soft)"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.visionContainer}>
                {/* Hero Singularity */}
                <div style={styles.heroSingularity}>
                    <div style={styles.singularityContent}>
                        <div style={styles.heroBadge}><Sparkles size={14} /> ACTIVE SINGULARITY PHASE</div>
                        <h2 style={styles.heroTitle}>Autonomous Governance</h2>
                        <p style={styles.heroDesc}>All municipal and utility algorithms are now self-optimizing based on real-time citizen feedback.</p>
                        <Link href="/vision/singularity" style={styles.singularityBtn}>Configure AI Mesh</Link>
                    </div>
                    <div style={styles.singularityGraphic}>
                        <div style={styles.orbit1}></div>
                        <div style={styles.orbit2}></div>
                        <Sparkles size={80} color="white" />
                    </div>
                </div>

                <div style={styles.mainGrid}>
                    <div style={styles.sectorSection}>
                        <h2 style={styles.sectionTitle}>Digital Frontier Sectors</h2>
                        <div style={styles.sectorGrid}>
                            {sectors.map((s, i) => (
                                <Link key={i} href={s.href} style={styles.sectorCard}>
                                    <div style={styles.sectorIcon}>{s.icon}</div>
                                    <div style={styles.sectorInfo}>
                                        <h3 style={styles.sectorTitle}>{s.title}</h3>
                                        <p style={styles.sectorDesc}>{s.desc}</p>
                                    </div>
                                    <ChevronRight size={18} color="#94a3b8" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div style={styles.sidePanel}>
                        <div style={styles.updateCard}>
                            <Zap size={24} color="#f59e0b" />
                            <h4 style={{ color: 'white', margin: '0.5rem 0 0.25rem' }}>Quantum Path</h4>
                            <p style={{ color: 'white', opacity: 0.8, fontSize: '0.8rem', margin: 0 }}>Upgrade to quantum-ready encryption for your digital records.</p>
                            <button style={styles.updateBtn}>Upgrade Now</button>
                        </div>

                        <div style={styles.metricBox}>
                            <h4 style={{ margin: '0 0 1rem', fontSize: '0.9rem', color: '#1e293b' }}>Global Index</h4>
                            <div style={styles.metricItem}>
                                <Globe size={18} color="#2563eb" />
                                <div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700 }}>E-Gov Ranking</p><div style={styles.bar}><div style={{ ...styles.barFill, width: '92%', background: '#2563eb' }}></div></div></div>
                                <span style={styles.metricVal}>92%</span>
                            </div>
                            <div style={styles.metricItem}>
                                <Cpu size={18} color="#9333ea" />
                                <div style={{ flex: 1 }}><p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700 }}>Automation</p><div style={styles.bar}><div style={{ ...styles.barFill, width: '78%', background: '#9333ea' }}></div></div></div>
                                <span style={styles.metricVal}>78%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AethelLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    visionContainer: { display: 'flex', flexDirection: 'column', gap: '2.5rem' },
    heroSingularity: {
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
        borderRadius: '32px', padding: '3rem', color: 'white', display: 'flex',
        alignItems: 'center', gap: '4rem', overflow: 'hidden', position: 'relative'
    },
    singularityContent: { flex: 1, zIndex: 2 },
    heroBadge: { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800, width: 'fit-content', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' },
    heroTitle: { fontSize: '2.5rem', fontWeight: 900, margin: 0 },
    heroDesc: { fontSize: '1.1rem', opacity: 0.8, margin: '1rem 0 2rem', maxWidth: '500px' },
    singularityBtn: { background: 'white', color: '#1e1b4b', padding: '1rem 2rem', borderRadius: '16px', fontWeight: 900, textDecoration: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' },
    singularityGraphic: { position: 'relative', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 },
    orbit1: { position: 'absolute', width: '180px', height: '180px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%' },
    orbit2: { position: 'absolute', width: '240px', height: '240px', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '50%' },
    mainGrid: { display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' },
    sectorSection: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    sectionTitle: { fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' },
    sectorGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
    sectorCard: {
        background: 'white', border: '1px solid #f1f5f9', borderRadius: '24px',
        padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem',
        textDecoration: 'none', transition: 'all 0.2s shadow 0.2s'
    },
    sectorIcon: { width: '48px', height: '48px', background: 'var(--theme-indigo-soft)', color: 'var(--theme-indigo)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    sectorInfo: { flex: 1 },
    sectorTitle: { fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', margin: 0 },
    sectorDesc: { fontSize: '0.75rem', color: '#64748b', margin: 0 },
    sidePanel: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    updateCard: { background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '24px', padding: '1.5rem' },
    updateBtn: { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '100%', padding: '0.75rem', borderRadius: '12px', fontWeight: 700, marginTop: '1rem', cursor: 'pointer' },
    metricBox: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '24px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' },
    metricItem: { display: 'flex', gap: '1rem', alignItems: 'flex-start' },
    bar: { height: '6px', background: '#f1f5f9', borderRadius: '3px', marginTop: '0.5rem', overflow: 'hidden' },
    barFill: { height: '100%', borderRadius: '3px' },
    metricVal: { fontSize: '0.85rem', fontWeight: 800, color: '#1e293b', marginTop: '4px' }
};
