'use client';

import React, { useState } from 'react';
import { Scale, Video, FileText, Search, User, Gavel, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TeleLawPage() {
    const router = useRouter();
    const [view, setView] = useState<'home' | 'status'>('home');
    const [cnr, setCnr] = useState('');
    const [caseStatus, setCaseStatus] = useState<any>(null);

    const handleSearch = () => {
        if (!cnr) return;
        // Mock result
        setCaseStatus({
            id: cnr,
            court: 'District Court, Varanasi',
            judge: 'Hon. S.K. Gupta',
            nextDate: '15 Feb 2026',
            stage: 'Evidence Recording'
        });
    };

    const StatusView = () => (
        <div style={styles.section}>
            <button onClick={() => setView('home')} style={styles.backBtn}>&larr; Back to Services</button>
            <div style={styles.statusCard}>
                <h2 style={{ marginBottom: '1.5rem' }}>Track Case Status ⚖️</h2>
                <div style={styles.searchBox}>
                    <input
                        placeholder="Enter CNR Number (Ex: UPVR01...)"
                        style={styles.input}
                        value={cnr}
                        onChange={(e) => setCnr(e.target.value)}
                    />
                    <button onClick={handleSearch} style={styles.searchBtn}>
                        <Search size={20} /> Search
                    </button>
                </div>

                {caseStatus && (
                    <div style={styles.resultBox}>
                        <div style={styles.resultRow}>
                            <span style={styles.label}>Court:</span>
                            <span style={styles.value}>{caseStatus.court}</span>
                        </div>
                        <div style={styles.resultRow}>
                            <span style={styles.label}>Judge:</span>
                            <span style={styles.value}>{caseStatus.judge}</span>
                        </div>
                        <div style={styles.resultRow}>
                            <span style={styles.label}>Next Hearing:</span>
                            <span style={styles.dateBadge}>{caseStatus.nextDate}</span>
                        </div>
                        <div style={styles.resultRow}>
                            <span style={styles.label}>Current Stage:</span>
                            <span style={styles.value}>{caseStatus.stage}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    if (view === 'status') return <StatusView />;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <Scale size={48} color="#4f46e5" />
                <div>
                    <h1 style={styles.title}>Tele-Law & Justice</h1>
                    <p style={styles.subtitle}>Legal Aid for Everyone | Nyaya Bandhu</p>
                </div>
            </div>

            <div style={styles.grid}>
                {/* Video Consult */}
                <div style={styles.card}>
                    <div style={{ ...styles.iconBox, background: '#e0e7ff', color: '#4338ca' }}>
                        <Video size={32} />
                    </div>
                    <h3>Book Legal Advice</h3>
                    <p style={styles.desc}>Connect with pro-bono lawyers via video call for legal queries.</p>
                    <button style={styles.actionBtn}>Book Appointment <ArrowRight size={16} /></button>
                </div>

                {/* Case Status */}
                <div style={styles.card}>
                    <div style={{ ...styles.iconBox, background: '#fef3c7', color: '#d97706' }}>
                        <Gavel size={32} />
                    </div>
                    <h3>Case Status</h3>
                    <p style={styles.desc}>Track your ongoing court cases using CNR number.</p>
                    <button onClick={() => setView('status')} style={styles.actionBtn}>Check Status <ArrowRight size={16} /></button>
                </div>

                {/* Document Builder */}
                <div style={styles.card}>
                    <div style={{ ...styles.iconBox, background: '#dcfce7', color: '#16a34a' }}>
                        <FileText size={32} />
                    </div>
                    <h3>Legal Docs</h3>
                    <p style={styles.desc}>Auto-generate Rent Agreements and Affidavits.</p>
                    <button style={styles.actionBtn}>Create Document <ArrowRight size={16} /></button>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    header: { display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' },
    title: { fontSize: '2.5rem', margin: 0, color: '#1e293b' },
    subtitle: { color: '#64748b', fontSize: '1.1rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' },
    card: { background: 'white', padding: '2rem', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
    iconBox: { width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' },
    desc: { color: '#64748b', marginBottom: '2rem', lineHeight: '1.5' },
    actionBtn: { marginTop: 'auto', padding: '0.8rem 1.5rem', background: '#1e293b', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' },

    // Status View Styles
    section: { padding: '2rem', maxWidth: '800px', margin: '0 auto' },
    backBtn: { background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', marginBottom: '1rem', fontSize: '1rem' },
    statusCard: { background: 'white', padding: '3rem', borderRadius: '20px', boxShadow: 'var(--card-shadow)' },
    searchBox: { display: 'flex', gap: '1rem', marginBottom: '2rem' },
    input: { flex: 1, padding: '1rem', borderRadius: '10px', border: '2px solid #e2e8f0', fontSize: '1.1rem' },
    searchBtn: { padding: '1rem 2rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' },
    resultBox: { background: '#f8fafc', padding: '2rem', borderRadius: '15px', border: '1px solid #e2e8f0' },
    resultRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px dashed #cbd5e1' },
    label: { color: '#64748b', fontWeight: '600' },
    value: { color: '#1e293b', fontWeight: 'bold', fontSize: '1.1rem' },
    dateBadge: { background: '#fee2e2', color: '#dc2626', padding: '0.3rem 0.8rem', borderRadius: '20px', fontWeight: 'bold' }
};
