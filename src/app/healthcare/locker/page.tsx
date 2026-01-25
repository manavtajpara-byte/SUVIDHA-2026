'use client';

import React, { useState } from 'react';
import { Archive, ArrowLeft, Plus, FileText, Share2, Eye, Calendar, User, LayoutDashboard, History } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AethelLayout from '@/components/AethelLayout';

export default function HealthLockerPage() {
    const router = useRouter();
    const [docs, setDocs] = useState([
        { id: 1, name: 'Blood Test Report', date: '12 Jan 2026', type: 'Lab Report', provider: 'City Diagnostics' },
        { id: 2, name: 'General Prescription', date: '05 Jan 2026', type: 'Prescription', provider: 'Dr. Sharma' },
        { id: 3, name: 'COVID-19 Vaccination', date: '20 Dec 2025', type: 'Certificate', provider: 'PHC Centre' },
    ]);

    const sidebarLinks = [
        { label: 'Health Center', icon: <LayoutDashboard size={20} />, href: '/healthcare' },
        { label: 'Medical Locker', icon: <Archive size={20} />, href: '/healthcare/locker', active: true },
        { label: 'Action History', icon: <History size={20} />, href: '/transactions' },
    ];

    return (
        <AethelLayout
            title="Medical Locker"
            themeColor="var(--theme-ruby)"
            themeSoft="var(--theme-ruby-soft)"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <button onClick={() => router.back()} style={styles.backBtn}>
                        <ArrowLeft size={32} />
                    </button>
                    <div style={{ flex: 1 }}>
                        <h1 style={styles.title}>Secure Storage 📁</h1>
                        <p style={styles.subtitle}>Verified medical records under National Health Stack</p>
                    </div>
                    <button style={styles.uploadBtn}>
                        <Plus size={20} /> Add New Record
                    </button>
                </div>

                <div style={styles.grid}>
                    {docs.map(doc => (
                        <div key={doc.id} style={styles.docCard}>
                            <div style={styles.docIcon}>
                                <FileText size={32} color="#ec4899" />
                            </div>
                            <div style={styles.docContent}>
                                <h3 style={styles.docName}>{doc.name}</h3>
                                <div style={styles.docMeta}>
                                    <span><Calendar size={14} /> {doc.date}</span>
                                    <span><User size={14} /> {doc.provider}</span>
                                </div>
                                <span style={styles.typeBadge}>{doc.type}</span>
                            </div>
                            <div style={styles.docActions}>
                                <button style={styles.iconBtn}><Eye size={18} /></button>
                                <button style={styles.iconBtn}><Share2 size={18} /></button>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={styles.consentCard}>
                    <div style={styles.consentHeader}>
                        <Share2 size={24} color="#ec4899" />
                        <h3>Share with Verified Providers</h3>
                    </div>
                    <p>Generate a sovereign link to share selected medical history with AI-doctors or hospitals.</p>
                    <button style={styles.shareBtn}>Generate Access Code</button>
                </div>
            </div>
        </AethelLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '1000px', margin: '0 auto' },
    header: { display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#ec4899' },
    title: { fontSize: '2.5rem', fontWeight: 900, margin: 0, color: '#1e293b' },
    subtitle: { color: '#64748b', margin: '0.25rem 0' },
    uploadBtn: { background: '#ec4899', color: 'white', border: 'none', padding: '1rem 1.5rem', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(236, 72, 153, 0.3)' },
    grid: { display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' },
    docCard: { background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1.5rem' },
    docIcon: { width: '56px', height: '56px', background: '#fdf2f8', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    docContent: { flex: 1 },
    docName: { margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: '#1e293b' },
    docMeta: { display: 'flex', gap: '1.5rem', color: '#64748b', fontSize: '0.85rem' },
    typeBadge: { display: 'inline-block', marginTop: '0.75rem', background: '#f1f5f9', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', color: '#475569' },
    docActions: { display: 'flex', gap: '0.5rem' },
    iconBtn: { width: '40px', height: '40px', borderRadius: '50%', background: '#f8fafc', border: '1px solid #e2e8f0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' },
    consentCard: { background: '#fdf2f8', padding: '2rem', borderRadius: '24px', border: '1px solid #fbcfe8' },
    consentHeader: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' },
    shareBtn: { padding: '1rem 2rem', background: '#ec4899', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }
};
