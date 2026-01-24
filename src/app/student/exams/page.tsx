'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { useRouter } from 'next/navigation';
import { Calendar, Download, LayoutDashboard, History, Search, ChevronRight, Award, BookOpen, Clock, FileText, MapPin, Bell, Zap } from 'lucide-react';
import AethelLayout from '@/components/AethelLayout';

export default function ExamsPage() {
    const { addToast } = useAppState();
    const router = useRouter();

    const sidebarLinks = [
        { label: 'Academic Hub', icon: <LayoutDashboard size={20} />, href: '/' },
        { label: 'Scholarships', icon: <Award size={20} />, href: '/student/scholarships' },
        { label: 'Exams', icon: <BookOpen size={20} />, href: '/student/exams', active: true },
    ];

    const stats = [
        { label: 'Upcoming', value: '02 Exams', sub: 'Next: JEE Mains', color: 'var(--theme-amethyst)' },
        { label: 'Applications', value: 'Submitted', sub: 'Verified by School', color: '#10b981' },
        { label: 'Results', value: 'Expected', sub: 'Last: 92.5%', color: 'var(--theme-azure)' }
    ];

    const exams = [
        { name: 'JEE Mains (Session 2)', date: '15 APR', shift: 'Shift 1: 09:00 AM - 12:00 PM', venue: 'Public School, Sector 4', status: 'Admit Card Ready' },
        { name: 'NEET (UG) 2026', date: '07 MAY', shift: 'Shift 1: 02:00 PM - 05:20 PM', venue: 'Govt Polytechnic', status: 'Processing' }
    ];

    const handleDownload = (exam: string) => {
        addToast({ message: `Downloading encrypted Admit Card for ${exam}...`, type: 'info' });
        setTimeout(() => {
            addToast({ message: 'Secure Download Complete!', type: 'success' });
        }, 1500);
    };

    return (
        <AethelLayout
            title="Exam Navigator"
            themeColor="var(--theme-amethyst)"
            themeSoft="var(--theme-amethyst-soft)"
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
                    <div style={styles.examSection}>
                        <h2 style={styles.sectionTitle}>Exam Schedule</h2>
                        <div style={styles.examGrid}>
                            {exams.map((exam, i) => (
                                <div key={i} style={styles.examCard}>
                                    <div style={styles.dateBadge}>
                                        <span style={styles.day}>{exam.date.split(' ')[0]}</span>
                                        <span style={styles.month}>{exam.date.split(' ')[1]}</span>
                                    </div>
                                    <div style={styles.examContent}>
                                        <h3 style={styles.examTitle}>{exam.name}</h3>
                                        <div style={styles.examMeta}>
                                            <div style={styles.metaItem}><Clock size={14} /> {exam.shift}</div>
                                            <div style={styles.metaItem}><MapPin size={14} /> {exam.venue}</div>
                                        </div>
                                    </div>
                                    {exam.status === 'Admit Card Ready' ? (
                                        <button onClick={() => handleDownload(exam.name)} style={styles.downloadBtn}>
                                            <Download size={18} /> Admit Card
                                        </button>
                                    ) : (
                                        <div style={styles.pendingBadge}>Processing</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={styles.sidePanel}>
                        <div style={styles.noticeBox}>
                            <Bell size={24} color="var(--theme-amethyst)" />
                            <div>
                                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>Instruction Kit</h4>
                                <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#64748b' }}>Download revised exam guidelines for Session 2.</p>
                            </div>
                        </div>

                        <div style={styles.mockCard}>
                            <Zap size={24} color="white" />
                            <h4 style={{ color: 'white', margin: '0.5rem 0 0.25rem' }}>Practice Arena</h4>
                            <p style={{ color: 'white', opacity: 0.9, fontSize: '0.8rem', margin: 0 }}>Take a free 30-min mock test to gauge your percentile.</p>
                            <button style={styles.mockBtn}>Start Mock</button>
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
    statCard: { background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    statLabel: { fontSize: '0.85rem', fontWeight: 600, color: '#64748b', margin: 0 },
    statValue: { fontSize: '1.75rem', fontWeight: 800, margin: 0 },
    statSub: { fontSize: '0.75rem', color: '#94a3b8', margin: 0 },
    mainLayout: { display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' },
    examSection: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    sectionTitle: { fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' },
    examGrid: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    examCard: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '24px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' },
    dateBadge: { width: '64px', height: '64px', background: 'var(--theme-amethyst-soft)', color: 'var(--theme-amethyst)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontWeight: 800 },
    day: { fontSize: '1.25rem', lineHeight: 1 },
    month: { fontSize: '0.7rem' },
    examContent: { flex: 1 },
    examTitle: { fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', margin: '0 0 0.5rem' },
    examMeta: { display: 'flex', flexDirection: 'column', gap: '0.25rem' },
    metaItem: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#64748b' },
    downloadBtn: { background: '#f8fafc', border: '1px solid #e2e8f0', color: '#1e293b', padding: '0.75rem 1.25rem', borderRadius: '12px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' },
    pendingBadge: { background: '#fff7ed', color: '#c2410c', padding: '0.5rem 1rem', borderRadius: '12px', fontWeight: 700, fontSize: '0.8rem' },
    sidePanel: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    noticeBox: { background: 'var(--theme-amethyst-soft)', border: '1px solid var(--theme-amethyst)', borderRadius: '24px', padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' },
    mockCard: { background: 'linear-gradient(135deg, var(--theme-amethyst) 0%, #7c3aed 100%)', borderRadius: '24px', padding: '1.5rem', display: 'flex', flexDirection: 'column' },
    mockBtn: { background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', marginTop: '0.8rem' }
};
