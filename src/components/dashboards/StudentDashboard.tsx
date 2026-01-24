'use client';

import React, { useEffect, useState } from 'react';
import { BookOpen, GraduationCap, Award, Calendar, Bell, ChevronRight, Clock, Star, Zap } from 'lucide-react';
import { useAppState } from '@/context/StateContext';
import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
    const { user } = useAppState();
    const router = useRouter();
    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        const allBroadcasts = JSON.parse(localStorage.getItem('suvidha_broadcasts') || '[]');
        const relevant = allBroadcasts.filter((b: any) => b.target === 'all' || b.target === 'student');
        setNotifications(relevant);
    }, []);

    const activities = [
        { label: 'Scholarship Match', sub: '3 new schemes identified', icon: <Award size={20} />, color: '#9333ea', href: '/student/scholarships' },
        { label: 'JEE Mains Admit', sub: 'Download ready for session 2', icon: <Calendar size={20} />, color: '#ec4899', href: '/student/exams' },
        { label: 'Digital Library', sub: 'Resume: Physics Chapter 4', icon: <BookOpen size={20} />, color: '#10b981', href: '#' }
    ];

    return (
        <div style={styles.dashboardContainer}>
            {/* Dynamic Alerts */}
            {notifications.length > 0 && (
                <div style={styles.alertStack}>
                    {notifications.map((n: any) => (
                        <div key={n.id} style={styles.alertCard}>
                            <Bell size={18} color="#9333ea" />
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
                        <h3 style={styles.sectionTitle}>Academic Success</h3>
                        <p style={styles.sectionSub}>Personalized track for {user?.details?.student?.class || 'Class 12'}</p>
                    </div>

                    <div style={styles.activityGrid}>
                        {activities.map((act, i) => (
                            <button key={i} onClick={() => act.href !== '#' && router.push(act.href)} style={styles.activityCard}>
                                <div style={{ ...styles.iconWrapper, background: `${act.color}15`, color: act.color }}>{act.icon}</div>
                                <div style={styles.activityInfo}>
                                    <h4 style={styles.activityTitle}>{act.label}</h4>
                                    <p style={styles.activitySub}>{act.sub}</p>
                                </div>
                                <ChevronRight size={18} color="#94a3b8" />
                            </button>
                        ))}
                    </div>

                    <div style={styles.learningProgress}>
                        <div style={styles.progressHeader}>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                <GraduationCap size={20} color="#9333ea" />
                                <h4 style={{ margin: 0, fontWeight: 700 }}>Physics Advanced Course</h4>
                            </div>
                            <span style={styles.percentText}>60%</span>
                        </div>
                        <div style={styles.progressBar}><div style={{ ...styles.progressFill, width: '60%' }}></div></div>
                        <p style={styles.resumeInfo}>Resume: Electromagnetism (12 mins left)</p>
                        <button style={styles.primaryBtn}>Launch Lesson</button>
                    </div>
                </div>

                <div style={styles.sidePanel}>
                    <div style={styles.statsCard}>
                        <div style={styles.statItem}>
                            <div style={styles.statLabel}><Clock size={14} /> Total Study</div>
                            <div style={styles.statValue}>42h 15m</div>
                        </div>
                        <div style={styles.statDivider} />
                        <div style={styles.statItem}>
                            <div style={styles.statLabel}><Star size={14} /> Percentile</div>
                            <div style={styles.statValue}>98.5</div>
                        </div>
                    </div>

                    <div style={styles.gamifiedCard}>
                        <Zap size={24} color="#f59e0b" />
                        <h4 style={{ margin: '0.5rem 0 0.25rem', color: 'white' }}>Daily Streak: 12</h4>
                        <p style={{ margin: 0, color: 'white', opacity: 0.8, fontSize: '0.8rem' }}>Top 5% in your region this week!</p>
                        <div style={styles.xpBar}><div style={{ ...styles.xpFill, width: '85%' }}></div></div>
                        <p style={{ margin: '0.5rem 0 0', color: 'white', fontSize: '0.75rem' }}>150 XP to Level 5</p>
                    </div>

                    <div style={styles.quickLinks}>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b', marginBottom: '1rem' }}>Direct Tools</h4>
                        <button style={styles.toolBtn}>Result Verifier</button>
                        <button style={styles.toolBtn}>AI Tutor (Beta)</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    dashboardContainer: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    alertStack: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    alertCard: { background: '#faf5ff', border: '1px solid #f3e8ff', borderRadius: '16px', padding: '1rem 1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' },
    alertContent: { flex: 1 },
    alertSender: { fontSize: '0.8rem', fontWeight: 800, color: '#9333ea', textTransform: 'uppercase' },
    alertMsg: { fontSize: '0.9rem', color: '#581c87', margin: '0.1rem 0 0' },
    mainGrid: { display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' },
    primaryContent: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    cardHeader: { marginBottom: '0.5rem' },
    sectionTitle: { fontSize: '1.5rem', fontWeight: 800, color: '#1e293b', margin: 0 },
    sectionSub: { fontSize: '0.95rem', color: '#64748b', margin: '0.25rem 0 0' },
    activityGrid: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    activityCard: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '20px', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left' },
    iconWrapper: { width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    activityInfo: { flex: 1 },
    activityTitle: { margin: 0, fontSize: '1rem', fontWeight: 700, color: '#1e293b' },
    activitySub: { margin: 0, fontSize: '0.8rem', color: '#64748b' },
    learningProgress: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' },
    progressHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    percentText: { fontSize: '1.25rem', fontWeight: 800, color: '#9333ea' },
    progressBar: { height: '8px', background: '#f3e8ff', borderRadius: '4px', overflow: 'hidden' },
    progressFill: { height: '100%', background: '#9333ea', borderRadius: '4px' },
    resumeInfo: { fontSize: '0.85rem', color: '#64748b', margin: 0 },
    primaryBtn: { background: '#1e293b', color: 'white', border: 'none', padding: '1rem', borderRadius: '14px', fontWeight: 700, cursor: 'pointer', marginTop: '0.5rem' },
    sidePanel: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    statsCard: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '24px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' },
    statItem: { flex: 1 },
    statLabel: { fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', textTransform: 'uppercase' },
    statValue: { fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', marginTop: '0.2rem' },
    statDivider: { height: '1px', background: '#f1f5f9' },
    gamifiedCard: { background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: '24px', padding: '1.5rem', display: 'flex', flexDirection: 'column' },
    xpBar: { height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '1rem', overflow: 'hidden' },
    xpFill: { height: '100%', background: '#f59e0b' },
    quickLinks: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    toolBtn: { background: 'white', border: '1px solid #f1f5f9', padding: '0.75rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', color: '#475569', fontSize: '0.85rem', textAlign: 'left' }
};
