'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import BigButton from '@/components/BigButton';
import { FilePlus, Download, CheckCircle, ArrowLeft, Wheat } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Receipt from '@/components/Receipt';

export default function RationCardPage() {
    const { language } = useAppState();
    const t = translations[language];
    const router = useRouter();
    const [view, setView] = useState<'menu' | 'apply' | 'download' | 'success'>('menu');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [members, setMembers] = useState('');
    const [cardNo, setCardNo] = useState('');
    const [showReceipt, setShowReceipt] = useState(false);

    const services = [
        {
            label: t.applyNew,
            icon: <FilePlus size={60} />,
            color: '#16a34a',
            action: () => setView('apply')
        },
        {
            label: t.downloadCard,
            icon: <Download size={60} />,
            color: '#2563eb',
            action: () => setView('download')
        },
        {
            label: t.checkStatus,
            icon: <CheckCircle size={60} />,
            color: '#f59e0b',
            action: () => router.push('/track')
        }
    ];

    const handleApply = (e: React.FormEvent) => {
        e.preventDefault();
        setView('success');
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => view === 'menu' ? router.back() : setView('menu')} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h2 style={styles.title}>{t.rationCard}</h2>
            </div>

            {view === 'menu' && (
                <div style={styles.grid}>
                    {services.map((service) => (
                        <BigButton
                            key={service.label}
                            label={service.label}
                            icon={service.icon}
                            color={service.color}
                            onClick={service.action}
                        />
                    ))}
                </div>
            )}

            {view === 'apply' && (
                <div style={styles.card}>
                    <form onSubmit={handleApply} style={styles.form}>
                        <div style={styles.iconHeader}>
                            <Wheat size={60} color="#16a34a" />
                            <h3>Apply for New Ration Card</h3>
                        </div>
                        <div style={styles.onorcSection}>
                            <h3>Portability Status (ONORC)</h3>
                            <p>Access your food grains from any Fair Price Shop across India.</p>
                            <button onClick={() => router.push('/ration-card/onorc')} style={styles.btnSecondary}>Check Eligibility</button>
                        </div>
                        <div style={styles.field}>
                            <label>Head of Family Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
                        </div>
                        <div style={styles.field}>
                            <label>Mobile Number</label>
                            <input value={mobile} onChange={(e) => setMobile(e.target.value)} style={styles.input} />
                        </div>
                        <div style={styles.field}>
                            <label>Number of Family Members</label>
                            <input value={members} onChange={(e) => setMembers(e.target.value)} style={styles.input} />
                        </div>
                        <button type="submit" style={styles.submitBtn} disabled={!name || !mobile}>Submit Application</button>
                    </form>
                </div>
            )}

            {view === 'download' && (
                <div style={styles.card}>
                    <div style={styles.downloadSection}>
                        <Wheat size={80} color="#16a34a" />
                        <h3>Download Ration Card</h3>
                        <p>Enter your Ration Card Number to download</p>
                        <input value={cardNo} onChange={(e) => setCardNo(e.target.value)} placeholder="Card Number" style={styles.input} />
                        <button onClick={() => setShowReceipt(true)} style={styles.submitBtn} disabled={!cardNo}>Download Card (PDF)</button>
                    </div>
                </div>
            )}

            {view === 'success' && (
                <div style={styles.success}>
                    <CheckCircle size={100} color="#16a34a" />
                    <h2>Application Submitted!</h2>
                    <p>Your ration card application has been received. You will be notified within 15 working days.</p>
                    <div style={styles.ticketCard}>
                        <span>Application ID:</span>
                        <strong>RATION-2026-{Math.floor(Math.random() * 10000)}</strong>
                    </div>
                    <button onClick={() => router.push('/')} style={styles.homeBtn}>Back to Home</button>
                </div>
            )}

            {showReceipt && (
                <Receipt
                    type="ration"
                    transactionId={`RATION-DL-${Date.now()}`}
                    customerName={name || 'Cardholder'}
                    details={{
                        'Card Number': cardNo || 'XXXX-XXXX-XXXX',
                        'Card Type': 'APL (Above Poverty Line)',
                        'Family Members': members || '4',
                        'Valid Until': 'Dec 2026'
                    }}
                    onClose={() => setShowReceipt(false)}
                />
            )}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' },
    header: { display: 'flex', alignItems: 'center', gap: '2rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' },
    title: { fontSize: '2.5rem', fontWeight: 900, margin: 0, color: '#16a34a' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' },
    card: { backgroundColor: 'white', padding: '3rem', borderRadius: '2rem', boxShadow: 'var(--card-shadow)' },
    form: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    iconHeader: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
    field: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    input: { padding: '1.25rem', fontSize: '1.5rem', borderRadius: '1rem', border: '2px solid #e2e8f0', backgroundColor: '#f8fafc' },
    submitBtn: { padding: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer' },
    downloadSection: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', textAlign: 'center' },
    success: { display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', padding: '4rem 2rem', borderRadius: '2rem', boxShadow: 'var(--card-shadow)', textAlign: 'center', gap: '1.5rem' },
    ticketCard: { backgroundColor: '#f1f5f9', padding: '1.5rem 3rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '1.3rem' },
    homeBtn: { marginTop: '2rem', padding: '1rem 3rem', fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: 'var(--foreground)', color: 'white', borderRadius: '1rem', border: 'none', cursor: 'pointer' }
};
