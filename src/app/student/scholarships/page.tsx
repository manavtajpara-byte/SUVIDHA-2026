'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { ArrowLeft, Award, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ScholarshipPage() {
    const { language, addToast } = useAppState();
    const router = useRouter();

    const handleApply = (scheme: string) => {
        addToast({ message: `Applied for ${scheme} successfully!`, type: 'success' });
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h2 style={styles.title}>Scholarship Portal 🎓</h2>
            </div>

            <div style={styles.card}>
                <div style={styles.intro}>
                    <Award size={64} color="var(--primary)" />
                    <p style={styles.desc}>Based on your profile, you are eligible for the following government schemes.</p>
                </div>

                <div style={styles.grid}>
                    {/* Scheme 1 */}
                    <div style={styles.schemeCard}>
                        <div style={styles.schemeHeader}>
                            <h3>Pre-Matric Scholarship</h3>
                            <span style={styles.tag}>Central Govt</span>
                        </div>
                        <p>For minority students scoring above 50% in previous exams.</p>
                        <div style={styles.benefit}>Benefit: ₹ 12,000 / Year</div>
                        <button onClick={() => handleApply('Pre-Matric Scholarship')} style={styles.applyBtn}>Apply Now</button>
                    </div>

                    {/* Scheme 2 */}
                    <div style={styles.schemeCard}>
                        <div style={styles.schemeHeader}>
                            <h3>Merit-cum-Means</h3>
                            <span style={styles.tag}>State Govt</span>
                        </div>
                        <p>Financial assistance for technical and professional courses.</p>
                        <div style={styles.benefit}>Benefit: ₹ 20,000 / Year</div>
                        <button onClick={() => handleApply('Merit-cum-Means')} style={styles.applyBtn}>Apply Now</button>
                    </div>

                    {/* Scheme 3 */}
                    <div style={styles.schemeCard}>
                        <div style={styles.schemeHeader}>
                            <h3>PM Young Achievers</h3>
                            <span style={styles.tag}>Special</span>
                        </div>
                        <p>Top class education scheme for SC students.</p>
                        <div style={styles.benefit}>Benefit: Full Fee Waiver</div>
                        <button onClick={() => handleApply('PM Young Achievers')} style={styles.applyBtn}>Apply Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' },
    header: { display: 'flex', alignItems: 'center', gap: '1rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' },
    title: { fontSize: '2rem', fontWeight: 900, margin: 0 },
    card: { backgroundColor: 'white', padding: '2rem', borderRadius: '2rem', boxShadow: 'var(--card-shadow)', minHeight: '400px' },
    intro: { textAlign: 'center', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
    desc: { color: '#64748b', fontSize: '1.2rem', maxWidth: '500px' },
    grid: { display: 'grid', gap: '1.5rem' },
    schemeCard: { border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', background: '#f8fafc' },
    schemeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' },
    tag: { fontSize: '0.8rem', background: '#dbeafe', color: '#2563eb', padding: '0.2rem 0.6rem', borderRadius: '20px', fontWeight: 'bold' },
    benefit: { fontWeight: 'bold', color: '#059669', margin: '0.5rem 0 1rem 0' },
    applyBtn: { width: '100%', padding: '0.8rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }
};
