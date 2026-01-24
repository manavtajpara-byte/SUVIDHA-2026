'use client';

import React, { useEffect, useState } from 'react';
import { Briefcase, Activity, Rocket, TrendingUp, Bell, ChevronRight, Star, Zap, Clock } from 'lucide-react';
import { useAppState } from '@/context/StateContext';
import { useRouter } from 'next/navigation';

export default function YouthDashboard() {
    const { user } = useAppState();
    const router = useRouter();
    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        const allBroadcasts = JSON.parse(localStorage.getItem('suvidha_broadcasts') || '[]');
        const relevant = allBroadcasts.filter((b: any) => b.target === 'all' || b.target === 'youth');
        setNotifications(relevant);
    }, []);

    const actions = [
        { label: 'Job Matcher', sub: '5 matches found today', icon: <Briefcase size={20} />, color: '#7c3aed', href: '/youth/jobs' },
        { label: 'Skill Up', sub: 'New PMKVY 4.0 Courses', icon: <Activity size={20} />, color: '#dc2626', href: '/youth/skills' },
        { label: 'Startup Hub', sub: 'Mudra Loan Eligibility', icon: <Rocket size={20} />, color: '#d97706', href: '#' }
    ];

    return (
        <div style={styles.dashboardContainer}>
            {/* Dynamic Alerts */}
            {notifications.length > 0 && (
                <div style={styles.alertStack}>
                    {notifications.map((n: any) => (
                        <div key={n.id} style={styles.alertCard}>
                            <Bell size={18} color="#7c3aed" />
                            <div style={styles.alertContent}>
                                <strong style={styles.alertSender}>{n.sender}</strong>
                                <p style={styles.alertMsg}>{n.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div style={styles.mainGrid}>
                <div style={styles.primaryContent}>
                    <div style={styles.cardHeader}>
                        <h3 style={styles.sectionTitle}>Opportunity Radar</h3>
                        <p style={styles.sectionSub}>Scaling potential for {user?.details?.youth?.employment || 'Aspiring Professional'}</p>
                    </div>

                    <div style={styles.actionGrid}>
                        {actions.map((act, i) => (
                            <button key={i} onClick={() => act.href !== '#' && router.push(act.href)} style={styles.actionCard}>
                                <div style={{ ...styles.iconWrapper, background: `${act.color}15`, color: act.color }}>{act.icon}</div>
                                <div style={styles.actionInfo}>
                                    <h4 style={styles.actionTitle}>{act.label}</h4>
                                    <p style={styles.actionSub}>{act.sub}</p>
                                </div>
                                <ChevronRight size={18} color="#94a3b8" />
                            </button>
                        ))}
                    </div>

                    <div style={styles.roadmapCard}>
                        <div style={styles.roadmapHeader}>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                <TrendingUp size={20} color="#7c3aed" />
                                <h4 style={{ margin: 0, fontWeight: 700 }}>Career Roadmap</h4>
                            </div>
                            <span style={styles.stageText}>Stage 2 of 4</span>
                        </div>
                        <div style={styles.roadmapBar}><div style={{ ...styles.roadmapFill, width: '45%' }}></div></div>
                        <p style={styles.roadmapNext}>Next: Skill Certification (Data Analytics)</p>
                        <button style={styles.primaryBtn}>Review Strategy</button>
                    </div>
                </div>

                <div style={styles.sidePanel}>
                    <div style={styles.scoreCard}>
                        <div style={styles.scoreItem}>
                            <div style={styles.scoreLabel}><Clock size={14} /> Experience</div>
                            <div style={styles.scoreValue}>2.5 Years</div>
                        </div>
                        <div style={styles.scoreDivider} />
                        <div style={styles.scoreItem}>
                            <div style={styles.scoreLabel}><Star size={14} /> Skill Index</div>
                            <div style={styles.scoreValue}>8.4/10</div>
                        </div>
                    </div>

                    <div style={styles.premiumBanner}>
                        <Zap size={24} color="#f59e0b" />
                        <h4 style={{ margin: '0.5rem 0 0.25rem', color: 'white' }}>Pro Career AI</h4>
                        <p style={{ margin: 0, color: 'white', opacity: 0.8, fontSize: '0.8rem' }}>Unlock AI-powered interview prep and direct recruiter access.</p>
                        <button style={styles.unlockBtn}>Upgrade to Pro</button>
                    </div>

                    <div style={styles.trendingBox}>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b', marginBottom: '1rem' }}>Market Trends</h4>
                        <div style={styles.trendTag}>#DataSci +120%</div>
                        <div style={styles.trendTag}>#SolarTech +85%</div>
                        <div style={styles.trendTag}>#CyberSec +60%</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    dashboardContainer: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    alertStack: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    alertCard: { background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '16px', padding: '1rem 1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' },
    alertContent: { flex: 1 },
    alertSender: { fontSize: '0.75rem', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase' },
    alertMsg: { fontSize: '0.9rem', color: '#4c1d95', margin: '0.1rem 0 0' },
    mainGrid: { display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' },
    primaryContent: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    cardHeader: { marginBottom: '0.5rem' },
    sectionTitle: { fontSize: '1.5rem', fontWeight: 800, color: '#1e293b', margin: 0 },
    sectionSub: { fontSize: '0.95rem', color: '#64748b', margin: '0.25rem 0 0' },
    actionGrid: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    actionCard: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '20px', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left' },
    iconWrapper: { width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    actionInfo: { flex: 1 },
    actionTitle: { margin: 0, fontSize: '1rem', fontWeight: 700, color: '#1e293b' },
    actionSub: { margin: 0, fontSize: '0.8rem', color: '#64748b' },
    roadmapCard: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' },
    roadmapHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    stageText: { fontSize: '0.85rem', fontWeight: 700, color: '#7c3aed' },
    roadmapBar: { height: '8px', background: '#ede9fe', borderRadius: '4px', overflow: 'hidden' },
    roadmapFill: { height: '100%', background: '#7c3aed', borderRadius: '4px' },
    roadmapNext: { fontSize: '0.85rem', color: '#64748b', margin: 0 },
    primaryBtn: { background: '#1e293b', color: 'white', border: 'none', padding: '1rem', borderRadius: '14px', fontWeight: 700, cursor: 'pointer', marginTop: '0.5rem' },
    sidePanel: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    scoreCard: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '24px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' },
    scoreItem: { flex: 1 },
    scoreLabel: { fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', textTransform: 'uppercase' },
    scoreValue: { fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', marginTop: '0.2rem' },
    scoreDivider: { height: '1px', background: '#f1f5f9' },
    premiumBanner: { background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '24px', padding: '1.5rem', display: 'flex', flexDirection: 'column' },
    unlockBtn: { background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '0.6rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', marginTop: '1rem', fontSize: '0.8rem' },
    trendingBox: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem' },
    trendTag: { background: 'white', border: '1px solid #f1f5f9', padding: '0.4rem 0.75rem', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 700, color: '#475569' }
};
