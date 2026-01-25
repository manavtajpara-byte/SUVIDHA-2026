'use client';

import React, { useState } from 'react';
import AethelLayout from '@/components/AethelLayout';
import {
    Scale, Video, FileText, Search, User, Gavel,
    ArrowRight, Clock, ShieldCheck, Download,
    Plus, HelpCircle, FileCheck, Landmark
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppState } from '@/context/StateContext';

export default function TeleLawDigitalJustice() {
    const { addToast } = useAppState();
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentView = searchParams.get('view') || 'home';

    // CNR state stays local as it's interactive
    const [cnr, setCnr] = useState('');
    const [caseStatus, setCaseStatus] = useState<any>(null);

    const sidebarLinks = [
        { label: 'Justice Hub', icon: <Scale size={20} />, href: '/tele-law', active: currentView === 'home' },
        { label: 'Case Tracker', icon: <Gavel size={20} />, href: '/tele-law?view=status', active: currentView === 'status' },
        { label: 'Legal Docs', icon: <FileText size={20} />, href: '/tele-law?view=docs', active: currentView === 'docs' },
    ];

    const stats = [
        { label: 'Active Cases', value: '01', sub: 'Civil - Dist. Court', color: 'var(--theme-slate)' },
        { label: 'Legal Aid', value: 'Verified', sub: 'Nyaya Bandhu active', color: '#10b981' },
        { label: 'Next Hearing', value: '15 Feb', sub: 'Varanasi Court', color: '#f59e0b' }
    ];

    const handleSearch = () => {
        if (!cnr) return;
        setCaseStatus({
            id: cnr,
            court: 'District Court, Varanasi',
            judge: 'Hon. S.K. Gupta',
            nextDate: '15 Feb 2026',
            stage: 'Evidence Recording',
            updates: ['20 Jan: Summons Issued', '12 Jan: Case Registered']
        });
    };

    return (
        <AethelLayout
            title="Tele-Law & Digital Justice"
            themeColor="#475569"
            themeSoft="#f1f5f9"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.container}>
                {currentView === 'home' && (
                    <div style={styles.homeView}>
                        <div style={styles.statsRow}>
                            {stats.map((s, i) => (
                                <div key={i} style={styles.statCard}>
                                    <p style={styles.statLabel}>{s.label}</p>
                                    <h3 style={{ ...styles.statValue, color: s.color }}>{s.value}</h3>
                                    <p style={styles.statSub}>{s.sub}</p>
                                </div>
                            ))}
                        </div>

                        <div style={styles.grid}>
                            <div style={styles.card}>
                                <div style={styles.cardHeader}>
                                    <div style={styles.iconBox}><Video size={24} /></div>
                                    <h3 style={styles.cardTitle}>Pro-Bono Consultation</h3>
                                </div>
                                <p style={styles.cardDesc}>Book a video session with a volunteer lawyer for free legal advice under the Nyaya Bandhu scheme.</p>
                                <button style={styles.primaryBtn} onClick={() => addToast({ message: "Consultation slot booked for Monday", type: 'success' })}>
                                    Book Appointment <ArrowRight size={16} />
                                </button>
                            </div>

                            <div style={styles.card}>
                                <div style={styles.cardHeader}>
                                    <div style={{ ...styles.iconBox, background: '#fef3c7', color: '#d97706' }}><Gavel size={24} /></div>
                                    <h3 style={styles.cardTitle}>CNR Case Tracker</h3>
                                </div>
                                <p style={styles.cardDesc}>Track real-time status of your ongoing cases in High Courts and District Courts across India.</p>
                                <button onClick={() => router.push('/tele-law?view=status')} style={styles.secondaryBtn}>
                                    Check Case Status <Search size={16} />
                                </button>
                            </div>

                            <div style={{ ...styles.card, gridColumn: 'span 2' }}>
                                <div style={styles.cardHeader}>
                                    <div style={{ ...styles.iconBox, background: '#dcfce7', color: '#16a34a' }}><FileCheck size={24} /></div>
                                    <h3 style={styles.cardTitle}>Smart Document Generator</h3>
                                </div>
                                <div style={styles.docFlex}>
                                    <div style={styles.docText}>
                                        <p style={styles.cardDesc}>Instantly draft legally binding documents, affidavits, and agreements using verified GOI templates.</p>
                                        <div style={styles.templateList}>
                                            <span style={styles.tag}>Affidavits</span>
                                            <span style={styles.tag}>Rent Agreement</span>
                                            <span style={styles.tag}>General NDA</span>
                                            <span style={styles.tag}>Will Template</span>
                                        </div>
                                    </div>
                                    <button onClick={() => router.push('/tele-law?view=docs')} style={styles.primaryBtn}>
                                        Start Drafting <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentView === 'status' && (
                    <div style={styles.subView}>
                        <div style={styles.viewHeader}>
                            <button onClick={() => router.push('/tele-law')} style={styles.backBtn}>&larr; Back</button>
                            <h2 style={styles.viewTitle}>National Case Tracker</h2>
                        </div>
                        <div style={styles.searchPanel}>
                            <div style={styles.searchBox}>
                                <input
                                    placeholder="Enter 16-Digit CNR Number..."
                                    style={styles.input}
                                    value={cnr}
                                    onChange={(e) => setCnr(e.target.value.toUpperCase())}
                                />
                                <button onClick={handleSearch} style={styles.primaryBtn}>Search Records</button>
                            </div>
                            {caseStatus && (
                                <div style={styles.results}>
                                    <div style={styles.resultMain}>
                                        <div style={styles.resRow}><span>CNR:</span> <strong>{caseStatus.id}</strong></div>
                                        <div style={styles.resRow}><span>Court:</span> <strong>{caseStatus.court}</strong></div>
                                        <div style={styles.resRow}><span>Judge:</span> <strong>{caseStatus.judge}</strong></div>
                                        <div style={styles.resRow}><span>Next Date:</span> <span style={styles.dateBadge}>{caseStatus.nextDate}</span></div>
                                    </div>
                                    <div style={styles.timeline}>
                                        <h4 style={styles.smTitle}>Recent Proceedings</h4>
                                        {caseStatus.updates.map((upd: string, idx: number) => (
                                            <div key={idx} style={styles.timeItem}>{upd}</div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {currentView === 'docs' && (
                    <div style={styles.subView}>
                        <div style={styles.viewHeader}>
                            <button onClick={() => router.push('/tele-law')} style={styles.backBtn}>&larr; Back</button>
                            <h2 style={styles.viewTitle}>Legal Document Studio</h2>
                        </div>
                        <div style={styles.docStudio}>
                            <div style={styles.templateGrid}>
                                {[
                                    { name: 'Income Affidavit', icon: <FileText /> },
                                    { name: 'Rent Agreement (Standard)', icon: <Landmark /> },
                                    { name: 'Gap Certificate', icon: <FileCheck /> },
                                    { name: 'Identity Declaration', icon: <User /> }
                                ].map((t, i) => (
                                    <div key={i} style={styles.tempBtn} onClick={() => addToast({ message: "Template loaded", type: 'info' })}>
                                        <div style={styles.tempIcon}>{t.icon}</div>
                                        <p style={styles.tempName}>{t.name}</p>
                                        <Download size={14} color="#94a3b8" />
                                    </div>
                                ))}
                            </div>
                            <div style={styles.previewBox}>
                                <div style={styles.mockDoc}>
                                    <h4 style={{ textAlign: 'center' }}>BHARAT GOVERNMENT SERVICE</h4>
                                    <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Select a template to begin interactive drafting with Sahayak AI.</p>
                                </div>
                                <button style={styles.primaryBtn} disabled>Generate & E-Sign</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AethelLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    homeView: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    statsRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' },
    statCard: { background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #f1f5f9' },
    statLabel: { margin: 0, fontSize: '0.85rem', color: '#64748b', fontWeight: 600 },
    statValue: { margin: '0.25rem 0', fontSize: '1.75rem', fontWeight: 900 },
    statSub: { margin: 0, fontSize: '0.75rem', color: '#94a3b8' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' },
    card: { background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '1.25rem' },
    cardHeader: { display: 'flex', alignItems: 'center', gap: '1rem' },
    iconBox: { width: '48px', height: '48px', borderRadius: '14px', background: '#f1f5f9', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    cardTitle: { margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' },
    cardDesc: { margin: 0, fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 },
    primaryBtn: { background: '#1e293b', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' },
    secondaryBtn: { background: 'white', color: '#1e293b', border: '1px solid #e2e8f0', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' },
    docFlex: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem' },
    docText: { flex: 1 },
    templateList: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' },
    tag: { padding: '0.25rem 0.75rem', background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '20px', fontSize: '0.75rem', color: '#64748b', fontWeight: 600 },
    subView: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    viewHeader: { display: 'flex', alignItems: 'center', gap: '2rem' },
    backBtn: { background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: 700 },
    viewTitle: { margin: 0, fontSize: '1.5rem', fontWeight: 900 },
    searchPanel: { background: 'white', padding: '3rem', borderRadius: '32px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '2rem' },
    searchBox: { display: 'flex', gap: '1rem', maxWidth: '600px', margin: '0 auto', width: '100%', justifyContent: 'center' },
    input: { flex: 1, padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' },
    results: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', borderTop: '1px solid #f1f5f9', paddingTop: '2rem' },
    resultMain: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    resRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' },
    dateBadge: { background: '#fff7ed', color: '#ea580c', padding: '0.2rem 0.6rem', borderRadius: '8px', fontWeight: 800 },
    timeline: { background: '#f8fafc', padding: '1.5rem', borderRadius: '20px' },
    smTitle: { margin: '0 0 1rem', fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' },
    timeItem: { fontSize: '0.85rem', color: '#475569', marginBottom: '0.75rem', paddingLeft: '1rem', borderLeft: '2px solid #cbd5e1' },
    docStudio: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' },
    templateGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' },
    tempBtn: { background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', transition: 'all 0.2s' },
    tempIcon: { color: '#475569' },
    tempName: { flex: 1, margin: 0, fontWeight: 700, fontSize: '0.9rem' },
    previewBox: { background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    mockDoc: { flex: 1, background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0' }
};
