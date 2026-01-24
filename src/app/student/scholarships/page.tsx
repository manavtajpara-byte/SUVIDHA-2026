'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { useRouter } from 'next/navigation';
import { Award, CheckCircle2, LayoutDashboard, History, Search, ChevronRight, GraduationCap, BookOpen, Clock, Filter, Stars, Sparkles } from 'lucide-react';
import AethelLayout from '@/components/AethelLayout';

export default function ScholarshipPage() {
    const { language, addToast } = useAppState();
    const t = translations[language] || translations.en;
    const router = useRouter();
    const [search, setSearch] = React.useState('');
    const [category, setCategory] = React.useState('all');

    const sidebarLinks = [
        { label: 'Academic Hub', icon: <LayoutDashboard size={20} />, href: '/' },
        { label: 'Scholarships', icon: <Award size={20} />, href: '/student/scholarships', active: true },
        { label: 'Exams', icon: <BookOpen size={20} />, href: '/student/exams' },
    ];

    const stats = [
        { label: 'Match Rating', value: 'High', sub: '3 Schemes Found', color: 'var(--theme-amethyst)' },
        { label: 'Applications', value: '01 Active', sub: 'Pre-Matric Scheme', color: '#10b981' },
        { label: 'Deadline', value: '12 Days', sub: 'Central Merit Plan', color: '#f59e0b' }
    ];

    const schemes = [
        { name: 'Pre-Matric Scholarship', type: 'Central Govt', category: 'minority', desc: 'For students scoring above 50% in previous exams.', benefit: '₹ 12,000 / Year' },
        { name: 'Merit-cum-Means', type: 'State Govt', category: 'merit', desc: 'Financial assistance for professional courses.', benefit: '₹ 20,000 / Year' },
        { name: 'PM Young Achievers', type: 'Special', category: 'sc', desc: 'Top class education scheme for SC students.', benefit: 'Full Fee Waiver' },
    ];

    const filteredSchemes = schemes.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'all' || s.category === category;
        return matchesSearch && matchesCategory;
    });

    const handleApply = (scheme: string) => {
        addToast({ message: `Application for ${scheme} submitted for review.`, type: 'success' });
    };

    return (
        <AethelLayout
            title="Scholarship Radar"
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
                    <div style={styles.contentSection}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>Matching Schemes</h2>
                            <div style={styles.searchRow}>
                                <div style={styles.searchBox}>
                                    <Search size={18} />
                                    <input placeholder="Search..." style={styles.searchInput} value={search} onChange={e => setSearch(e.target.value)} />
                                </div>
                                <select style={styles.select} value={category} onChange={e => setCategory(e.target.value)}>
                                    <option value="all">All</option>
                                    <option value="minority">Minority</option>
                                    <option value="merit">Merit</option>
                                    <option value="sc">SC/ST</option>
                                </select>
                            </div>
                        </div>

                        <div style={styles.schemeList}>
                            {filteredSchemes.map((scheme, i) => (
                                <div key={i} style={styles.schemeCard}>
                                    <div style={styles.schemeHead}>
                                        <div style={styles.schemeIcon}><Stars size={20} color="var(--theme-amethyst)" /></div>
                                        <div style={styles.schemeInfo}>
                                            <div style={styles.schemeTag}>{scheme.type}</div>
                                            <h3 style={styles.schemeTitle}>{scheme.name}</h3>
                                        </div>
                                        <div style={styles.benefitBox}>{scheme.benefit}</div>
                                    </div>
                                    <p style={styles.schemeDesc}>{scheme.desc}</p>
                                    <div style={styles.schemeFooter}>
                                        <div style={styles.deadlineInfo}><Clock size={16} /> Deadline: 15 Mar 2026</div>
                                        <button onClick={() => handleApply(scheme.name)} style={styles.applyBtn}>Apply Now</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={styles.sidePanel}>
                        <div style={styles.sparkCard}>
                            <Sparkles size={24} color="white" />
                            <h4 style={{ color: 'white', margin: '0.5rem 0 0.25rem' }}>Smart Eligibility</h4>
                            <p style={{ color: 'white', opacity: 0.9, fontSize: '0.8rem', margin: 0 }}>We've pre-filled 80% of your application using your KYC data.</p>
                        </div>

                        <div style={styles.milestoneCard}>
                            <h4 style={{ margin: '0 0 1rem', fontSize: '0.9rem' }}>Upcoming Milestones</h4>
                            <div style={styles.milestoneItem}>
                                <div style={styles.mileDot}></div>
                                <div><p style={{ margin: 0, fontWeight: 700, fontSize: '0.8rem' }}>Documents Verified</p><p style={{ margin: 0, fontSize: '0.7rem', color: '#64748b' }}>Central Merit Scheme</p></div>
                            </div>
                            <div style={{ ...styles.milestoneItem, opacity: 0.6 }}>
                                <div style={{ ...styles.mileDot, background: '#e2e8f0' }}></div>
                                <div><p style={{ margin: 0, fontWeight: 700, fontSize: '0.8rem' }}>Payment Disbursed</p><p style={{ margin: 0, fontSize: '0.7rem', color: '#64748b' }}>Expected: 25 Jan</p></div>
                            </div>
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
    contentSection: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    sectionTitle: { fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' },
    searchRow: { display: 'flex', gap: '0.75rem' },
    searchBox: { display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'white', border: '1px solid #e1e5e8', borderRadius: '12px', padding: '0.5rem 1rem' },
    searchInput: { border: 'none', background: 'none', outline: 'none', fontSize: '0.9rem', fontWeight: 600, color: '#1e293b', width: '120px' },
    select: { border: '1px solid #e1e5e8', borderRadius: '12px', padding: '0.5rem', background: 'white', fontWeight: 600, fontSize: '0.9rem' },
    schemeList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    schemeCard: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '24px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' },
    schemeHead: { display: 'flex', alignItems: 'center', gap: '1rem' },
    schemeIcon: { width: '48px', height: '48px', background: 'var(--theme-amethyst-soft)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    schemeInfo: { flex: 1 },
    schemeTag: { background: '#f1f5f9', color: '#64748b', fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '6px', width: 'fit-content', marginBottom: '0.25rem' },
    schemeTitle: { margin: 0, fontSize: '1rem', fontWeight: 700, color: '#1e293b' },
    benefitBox: { background: '#f0fdf4', color: '#16a34a', fontWeight: 800, fontSize: '0.9rem', padding: '0.5rem 1rem', borderRadius: '12px' },
    schemeDesc: { fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, margin: 0 },
    schemeFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid #f8fafc' },
    deadlineInfo: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 },
    applyBtn: { background: 'var(--theme-amethyst)', color: 'white', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' },
    sidePanel: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    sparkCard: { background: 'linear-gradient(135deg, var(--theme-amethyst) 0%, #7c3aed 100%)', borderRadius: '24px', padding: '1.5rem', display: 'flex', flexDirection: 'column' },
    milestoneCard: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '24px', padding: '1.5rem' },
    milestoneItem: { display: 'flex', gap: '1rem', marginBottom: '1rem' },
    mileDot: { width: '10px', height: '10px', borderRadius: '50%', background: 'var(--theme-amethyst)', marginTop: '4px' }
};
