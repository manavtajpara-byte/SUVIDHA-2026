'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import { FileText, Plus, Shield, Check, QrCode } from 'lucide-react';
import dynamic from 'next/dynamic';

const DocumentScanner = dynamic(() => import('@/components/DocumentScanner'), { ssr: false });

const initialDocs = [
    {
        id: 1,
        title: 'Aadhaar Card',
        category: 'Identity',
        verified: true,
        date: '2025-01-10',
        icon: <Shield size={24} color="#3b82f6" />,
        security: 'Quantum-Secure (AES-Q)',
        trustTier: 'L6'
    },
    {
        id: 2,
        title: 'PAN Card',
        category: 'Finance',
        verified: true,
        date: '2024-11-05',
        icon: <Shield size={24} color="#3b82f6" />,
        security: 'Post-Quantum Encrypted',
        trustTier: 'L6'
    },
    {
        id: 3,
        title: 'Driving License',
        category: 'Transport',
        verified: true,
        date: '2023-08-20',
        icon: <Shield size={24} color="#3b82f6" />,
        security: 'Blockchain Linked',
        trustTier: 'L5'
    },
];

export default function DocumentsPage() {
    const [docs, setDocs] = useState(initialDocs);
    const [isScanning, setIsScanning] = useState(false);
    const [pairingSuccess, setPairingSuccess] = useState(false);

    const handleCapture = (imgSrc: string) => {
        const newDoc = {
            id: Date.now(),
            title: `Scanned Document ${docs.length + 1}`,
            category: 'Scanned',
            verified: false,
            date: new Date().toISOString().split('T')[0],
            icon: <FileText size={24} color="#64748b" />,
            preview: imgSrc,
            security: 'Standard Encryption',
            trustTier: 'Unverified'
        };
        setDocs([newDoc, ...docs]);
        setIsScanning(false);
    };

    const triggerPairing = () => {
        setPairingSuccess(true);
        setTimeout(() => setPairingSuccess(false), 3000);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
            <Header />
            <main style={styles.main}>
                <div style={styles.header}>
                    <div>
                        <h1 style={styles.title}>Digital Locker <span style={styles.badgeQ}>Quantum Edition</span></h1>
                        <p style={styles.subtitle}>Trust-Tier 6 (L6) Verified Infrastructure Active.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={triggerPairing} style={styles.pairBtn}>
                            {pairingSuccess ? 'Identity Paired!' : 'Pair Blockchain ID'}
                        </button>
                        <button onClick={() => setIsScanning(true)} style={styles.addBtn}>
                            <Plus size={20} /> Scan New
                        </button>
                    </div>
                </div>

                <div style={styles.grid}>
                    {docs.map(doc => (
                        <div key={doc.id} style={styles.card}>
                            <div style={styles.cardHeader}>
                                <div style={styles.iconBox}>{doc.icon}</div>
                                <div style={{ display: 'flex', gap: '0.4rem', flexDirection: 'column', alignItems: 'flex-end' }}>
                                    {doc.verified && (
                                        <div style={styles.verifiedBadge}>
                                            <Check size={12} /> Verified
                                        </div>
                                    )}
                                    <div style={styles.tierBadge}>{doc.trustTier}</div>
                                </div>
                            </div>
                            <h3 style={styles.docTitle}>{doc.title}</h3>
                            <p style={styles.docMeta}>{doc.category} • {doc.date}</p>
                            <p style={styles.securityText}>{doc.security}</p>

                            <div style={styles.actions}>
                                <button style={styles.actionBtn}>View Securely</button>
                                <button style={styles.qrBtn} title="Show Quantum QR">
                                    <QrCode size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {isScanning && (
                <DocumentScanner
                    onCapture={handleCapture}
                    onClose={() => setIsScanning(false)}
                />
            )}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    main: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
    },
    title: {
        fontSize: '2rem',
        fontWeight: 800,
        color: '#1e293b',
        margin: 0,
    },
    subtitle: {
        color: '#64748b',
        marginTop: '0.25rem',
    },
    addBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'var(--primary)',
        color: 'white',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '1rem',
        fontWeight: 600,
        fontSize: '1rem',
        cursor: 'pointer',
        boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.3)',
        transition: 'all 0.2s',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
    },
    card: {
        background: 'white',
        borderRadius: '1.5rem',
        padding: '1.5rem',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
        border: '1px solid #e2e8f0',
        transition: 'transform 0.2s',
        display: 'flex',
        flexDirection: 'column',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem',
    },
    badgeQ: {
        fontSize: '0.7rem',
        textTransform: 'uppercase',
        background: 'linear-gradient(90deg, #6366f1, #a855f7)',
        color: 'white',
        padding: '2px 8px',
        borderRadius: '10px',
        marginLeft: '10px',
        verticalAlign: 'middle',
    },
    pairBtn: {
        background: '#1e293b',
        color: 'white',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    tierBadge: {
        fontSize: '0.65rem',
        fontWeight: 800,
        color: '#6366f1',
        border: '1px solid #6366f1',
        padding: '1px 6px',
        borderRadius: '4px',
    },
    securityText: {
        fontSize: '0.75rem',
        color: '#6366f1',
        fontWeight: 600,
        marginTop: '0.5rem',
        fontStyle: 'italic',
    },
    iconBox: {
        width: '48px',
        height: '48px',
        background: '#f1f5f9',
        borderRadius: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    verifiedBadge: {
        background: '#dcfce7',
        color: '#166534',
        padding: '0.25rem 0.6rem',
        borderRadius: '2rem',
        fontSize: '0.75rem',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
    },
    docTitle: {
        fontSize: '1.1rem',
        fontWeight: 700,
        color: '#1e293b',
        margin: '0 0 0.25rem 0',
    },
    docMeta: {
        fontSize: '0.85rem',
        color: '#94a3b8',
        margin: 0,
    },
    actions: {
        marginTop: '1.5rem',
        display: 'flex',
        gap: '0.75rem',
    },
    actionBtn: {
        flex: 1,
        background: 'white',
        border: '1px solid #cbd5e1',
        borderRadius: '0.5rem',
        padding: '0.5rem',
        fontWeight: 600,
        color: '#475569',
        cursor: 'pointer',
    },
    qrBtn: {
        background: 'white',
        border: '1px solid #cbd5e1',
        borderRadius: '0.5rem',
        padding: '0.5rem',
        color: '#475569',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
};
