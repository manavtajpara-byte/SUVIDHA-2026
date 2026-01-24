'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { useRouter } from 'next/navigation';
import { Receipt as ReceiptIcon, FilePlus, AlertTriangle, ArrowLeft, LayoutDashboard, Flame, History, Bell, Search, Globe, ChevronRight, CreditCard, CheckCircle2, QrCode, ShieldCheck, Fingerprint } from 'lucide-react';
import AethelLayout from '@/components/AethelLayout';
import Receipt from '@/components/Receipt';

export default function GasPayPage() {
    const { language, addToast } = useAppState();
    const t = translations[language] || translations.en;
    const router = useRouter();
    const [consumerNumber, setConsumerNumber] = useState('');
    const [step, setStep] = useState(1); // 1: Fetch, 2: Confirm, 3: Success
    const [showReceipt, setShowReceipt] = useState(false);
    const [loading, setLoading] = useState(false);

    const sidebarLinks = [
        { label: 'Gas Hub', icon: <LayoutDashboard size={20} />, href: '/gas' },
        { label: 'Pay Bill', icon: <ReceiptIcon size={20} />, href: '/gas/pay', active: true },
        { label: 'New Connection', icon: <FilePlus size={20} />, href: '/gas/new' },
        { label: 'Report Leak', icon: <AlertTriangle size={20} />, href: '/gas/outage' },
    ];

    const handleFetch = (e: React.FormEvent) => {
        e.preventDefault();
        if (consumerNumber.length < 5) return addToast({ message: 'Enter valid Consumer Number', type: 'error' });
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 1200);
    };

    const handlePay = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(3);
            addToast({ message: 'Bill paid successfully!', type: 'success' });
        }, 2000);
    };

    return (
        <AethelLayout
            title="Gas Bill Payment"
            themeColor="var(--theme-amber)"
            themeSoft="var(--theme-amber-soft)"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.payContainer}>
                {step === 1 && (
                    <div style={styles.card}>
                        <div style={styles.formHeader}>
                            <h2 style={styles.cardTitle}>Fetch LPG Account</h2>
                            <p style={styles.cardSub}>Enter your BP number or consumer ID</p>
                        </div>
                        <form onSubmit={handleFetch} style={styles.form}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Consumer ID / BP Number</label>
                                <div style={styles.inputWrapper}>
                                    <Flame size={20} color="#94a3b8" />
                                    <input
                                        type="tel"
                                        value={consumerNumber}
                                        onChange={e => setConsumerNumber(e.target.value.replace(/\D/g, ''))}
                                        placeholder="Ex: 50021489"
                                        style={styles.input}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" style={styles.primaryBtn} disabled={loading}>
                                {loading ? 'Fetching...' : 'Fetch Billing Data'}
                            </button>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div style={styles.card}>
                        <div style={styles.formHeader}>
                            <h2 style={styles.cardTitle}>Review Refill Details</h2>
                            <p style={styles.cardSub}>Review your LPG distributor and charges</p>
                        </div>
                        <div style={styles.billBox}>
                            <div style={styles.billRow}><span>Consumer Name</span><strong>Sunita Devi</strong></div>
                            <div style={styles.billRow}><span>Distributor</span><strong>Indane Gas Service</strong></div>
                            <div style={styles.billRow}><span>Booking Type</span><strong>Monthly Refill</strong></div>
                            <div style={styles.billDivider} />
                            <div style={styles.billRowTotal}><span>Total Amount</span><strong>₹ 950.00</strong></div>
                        </div>

                        <div style={styles.paymentMethods}>
                            <button style={styles.methodBtn}><CreditCard size={18} /> Card</button>
                            <button style={{ ...styles.methodBtn, background: '#f8fafc' }}><QrCode size={18} /> UPI QR</button>
                            <button style={{ ...styles.methodBtn, background: '#f8fafc' }}><ShieldCheck size={18} /> Points</button>
                        </div>

                        <button onClick={handlePay} style={{ ...styles.primaryBtn, background: '#1e293b' }} disabled={loading}>
                            {loading ? 'Processing Refill...' : 'Pay & Book Cylinder'}
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div style={{ ...styles.card, textAlign: 'center' }}>
                        <div style={styles.successIcon}><CheckCircle2 size={48} color="white" /></div>
                        <h2 style={styles.cardTitle}>Booking Confirmed</h2>
                        <p style={styles.cardSub}>Booking ID: GAS-REF-5521</p>
                        <div style={styles.actionRow}>
                            <button onClick={() => setShowReceipt(true)} style={styles.outlineBtn}>Digital Receipt</button>
                            <button onClick={() => router.push('/gas')} style={styles.outlineBtn}>Back to gas hub</button>
                        </div>
                    </div>
                )}
            </div>

            {showReceipt && (
                <Receipt
                    type="gas-utility"
                    transactionId="GAS-REF-5521"
                    amount={950}
                    customerName="Sunita Devi"
                    details={{
                        'Consumer ID': consumerNumber || '50021489',
                        'Distributor': 'Indane Gas Service',
                        'Booking Type': 'Cylinder Refill',
                        'Sub-Station': 'North-East Hub'
                    }}
                    onClose={() => setShowReceipt(false)}
                />
            )}
        </AethelLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    payContainer: { maxWidth: '520px', margin: '0 auto', paddingTop: '1rem' },
    card: { background: 'white', padding: '3rem', borderRadius: '32px', border: '1px solid #f1f5f9', boxShadow: 'var(--shadow-premium)', display: 'flex', flexDirection: 'column', gap: '2rem' },
    formHeader: { textAlign: 'center' },
    cardTitle: { fontSize: '1.5rem', fontWeight: 800, color: '#1e293b', margin: 0 },
    cardSub: { fontSize: '0.9rem', color: '#64748b', marginTop: '0.5rem' },
    form: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    label: { fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginLeft: '0.5rem' },
    inputWrapper: { display: 'flex', alignItems: 'center', gap: '1rem', background: '#f8fafc', padding: '1.1rem 1.25rem', borderRadius: '16px', border: '1px solid #e2e8f0' },
    input: { border: 'none', background: 'none', outline: 'none', fontSize: '1.1rem', width: '100%', color: '#1e293b', fontWeight: 700 },
    primaryBtn: { background: 'var(--theme-amber)', color: 'white', padding: '1.25rem', borderRadius: '16px', border: 'none', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 10px 20px rgba(245, 158, 11, 0.2)' },
    billBox: { background: '#f8fafc', padding: '1.5rem', borderRadius: '24px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    billRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#64748b' },
    billDivider: { height: '1px', background: '#e2e8f0', margin: '0.5rem 0' },
    billRowTotal: { display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', color: '#1e293b' },
    paymentMethods: { display: 'flex', gap: '0.75rem' },
    methodBtn: { flex: 1, padding: '1rem', borderRadius: '12px', border: '1px solid #f1f5f9', background: 'white', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' },
    successIcon: { width: '80px', height: '80px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' },
    actionRow: { display: 'flex', gap: '1rem', marginTop: '1rem' },
    outlineBtn: { flex: 1, padding: '1rem', borderRadius: '16px', border: '1px solid #e2e8f0', background: 'white', color: '#1e293b', fontWeight: 700, cursor: 'pointer' }
};
