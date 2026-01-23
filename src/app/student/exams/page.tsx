'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { ArrowLeft, Calendar, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ExamsPage() {
    const { addToast } = useAppState();
    const router = useRouter();

    const handleDownload = (exam: string) => {
        addToast({ message: `Downloading Admit Card for ${exam}...`, type: 'info' });
        setTimeout(() => {
            addToast({ message: 'Download Complete!', type: 'success' });
        }, 1500);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h2 style={styles.title}>Exam Portal 📝</h2>
            </div>

            <div style={styles.card}>
                <div style={styles.intro}>
                    <Calendar size={64} color="#db2777" />
                    <p style={styles.desc}>Track upcoming entrance exams and download your admit cards.</p>
                </div>

                <div style={styles.grid}>
                    {/* Exam 1 */}
                    <div style={styles.examCard}>
                        <div style={styles.dateBox}>
                            <span style={styles.month}>APR</span>
                            <span style={styles.day}>15</span>
                        </div>
                        <div style={styles.details}>
                            <h3>JEE Mains (Session 2)</h3>
                            <p>Shift 1: 09:00 AM - 12:00 PM</p>
                            <span style={styles.venue}>Venue: Public School, Sector 4</span>
                        </div>
                        <button onClick={() => handleDownload('JEE Mains')} style={styles.downloadBtn}>
                            <Download size={20} /> Admit Card
                        </button>
                    </div>

                    {/* Exam 2 */}
                    <div style={styles.examCard}>
                        <div style={{ ...styles.dateBox, background: '#fef3c7', color: '#d97706' }}>
                            <span style={styles.month}>MAY</span>
                            <span style={styles.day}>07</span>
                        </div>
                        <div style={styles.details}>
                            <h3>NEET (UG) 2026</h3>
                            <p>Shift 1: 02:00 PM - 05:20 PM</p>
                            <span style={styles.venue}>Venue: Govt Polytechnic</span>
                        </div>
                        <button onClick={() => handleDownload('NEET UG')} style={styles.downloadBtn}>
                            <Download size={20} /> Admit Card
                        </button>
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
    examCard: { display: 'flex', alignItems: 'center', gap: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', background: '#fff' },
    dateBox: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '70px', height: '70px', background: '#dbeafe', color: '#2563eb', borderRadius: '12px', fontWeight: 'bold' },
    month: { fontSize: '0.8rem', textTransform: 'uppercase' },
    day: { fontSize: '1.8rem', lineHeight: 1 },
    details: { flex: 1 },
    venue: { fontSize: '0.9rem', color: '#64748b' },
    downloadBtn: { padding: '0.8rem 1.2rem', background: '#f1f5f9', color: '#334155', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }
};
