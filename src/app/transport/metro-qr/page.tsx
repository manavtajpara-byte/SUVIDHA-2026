'use client';

import React, { useState } from 'react';
import { CreditCard, ArrowLeft, QrCode, Train, MapPin, Printer, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppState } from '@/context/StateContext';

export default function MetroQRPage() {
    const router = useRouter();
    const { addToast } = useAppState();
    const [step, setStep] = useState(1);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const stations = ['Village Junction', 'District Admin Block', 'Medical College', 'Technical Hub', 'Industrial Estate'];

    const handleGenerate = () => {
        if (!from || !to) {
            addToast({ message: 'Please select both stations', type: 'error' });
            return;
        }
        setStep(2);
        setTimeout(() => setStep(3), 1500);
    };

    if (step === 2) {
        return (
            <div style={styles.loadingContainer}>
                <div className="spinner"></div>
                <h2>Securing Digital Token...</h2>
                <style jsx>{`
                    .spinner { border: 4px solid #f3f3f3; border-top: 4px solid #06b6d4; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; }
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                `}</style>
            </div>
        );
    }

    if (step === 3) {
        return (
            <div style={styles.container}>
                <div style={styles.ticketCard}>
                    <div style={styles.ticketHeader}>
                        <Train size={32} color="white" />
                        <h2 style={{ color: 'white', margin: 0 }}>Metro Digital Pass</h2>
                    </div>

                    <div style={styles.ticketContent}>
                        <div style={styles.qrContainer}>
                            <QrCode size={200} />
                            <p style={styles.qrSub}>Scan at Entry Gate</p>
                        </div>

                        <div style={styles.detailsGrid}>
                            <div style={styles.detail}>
                                <label>From</label>
                                <span>{from}</span>
                            </div>
                            <div style={styles.detail}>
                                <label>To</label>
                                <span>{to}</span>
                            </div>
                            <div style={styles.detail}>
                                <label>Valid Till</label>
                                <span>Today, 11:59 PM</span>
                            </div>
                            <div style={styles.detail}>
                                <label>Passenger</label>
                                <span>Single Entry</span>
                            </div>
                        </div>

                        <div style={styles.divider}></div>

                        <div style={styles.actionRow}>
                            <button style={styles.printBtn} onClick={() => window.print()}>
                                <Printer size={20} /> Print Receipt
                            </button>
                        </div>
                    </div>
                    <div style={styles.successBadge}>
                        <CheckCircle size={20} /> Payment Verified
                    </div>
                </div>
                <button onClick={() => setStep(1)} style={styles.newBtn}>Book Another Ticket</button>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h1 style={styles.title}>Metro Ticketing 🚇</h1>
            </div>

            <div style={styles.formCard}>
                <div style={styles.formHeader}>
                    <div style={styles.iconCircle}>
                        <MapPin size={32} color="#06b6d4" />
                    </div>
                    <h3>Plan Your Journey</h3>
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Origin Station</label>
                    <select value={from} onChange={(e) => setFrom(e.target.value)} style={styles.select}>
                        <option value="">Select Origin</option>
                        {stations.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Destination Station</label>
                    <select value={to} onChange={(e) => setTo(e.target.value)} style={styles.select}>
                        <option value="">Select Destination</option>
                        {stations.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>

                <div style={styles.fareBox}>
                    <span>Estimated Fare</span>
                    <span style={styles.fareValue}>₹ 25.00</span>
                </div>

                <button onClick={handleGenerate} style={styles.generateBtn}>
                    Pay & Generate QR Ticket
                </button>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' },
    header: { display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem', textAlign: 'left' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#06b6d4' },
    title: { fontSize: '2.5rem', fontWeight: 900, margin: 0, color: '#1e293b' },
    formCard: { background: 'white', padding: '3rem', borderRadius: '32px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', textAlign: 'left' },
    formHeader: { display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' },
    iconCircle: { width: '64px', height: '64px', borderRadius: '50%', background: '#ecfeff', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    field: { marginBottom: '1.5rem' },
    label: { display: 'block', fontWeight: 'bold', color: '#64748b', marginBottom: '0.75rem', fontSize: '0.9rem' },
    select: { width: '100%', padding: '1rem', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '1.1rem', appearance: 'none', background: 'white' },
    fareBox: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: '#f8fafc', borderRadius: '16px', margin: '2rem 0' },
    fareValue: { fontSize: '1.5rem', fontWeight: 900, color: '#1e293b' },
    generateBtn: { width: '100%', padding: '1.5rem', borderRadius: '16px', background: '#06b6d4', color: 'white', border: 'none', fontSize: '1.25rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(6, 182, 212, 0.3)' },
    loadingContainer: { height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' },
    ticketCard: { background: 'white', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', marginBottom: '2rem', border: '2px solid #06b6d4' },
    ticketHeader: { background: '#06b6d4', padding: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' },
    ticketContent: { padding: '2.5rem' },
    qrContainer: { textAlign: 'center', marginBottom: '2rem' },
    qrSub: { color: '#64748b', fontWeight: 'bold', marginTop: '1rem' },
    detailsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', textAlign: 'left' },
    detail: { display: 'flex', flexDirection: 'column' },
    divider: { height: '1px', background: '#e2e8f0', margin: '2rem 0' },
    actionRow: { display: 'flex', gap: '1rem' },
    printBtn: { flex: 1, padding: '1rem', borderRadius: '12px', background: '#f1f5f9', border: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' },
    successBadge: { background: '#dcfce7', color: '#16a34a', padding: '1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' },
    newBtn: { padding: '1rem 2rem', background: 'none', border: '2px solid #06b6d4', color: '#06b6d4', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }
};
