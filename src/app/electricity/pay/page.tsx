'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { useRouter } from 'next/navigation';
import { Receipt as ReceiptIcon, FilePlus, AlertTriangle, ArrowLeft, LayoutDashboard, Zap, History, Bell, Search, Globe, ChevronRight, CreditCard, CheckCircle2, QrCode, ShieldCheck, Fingerprint } from 'lucide-react';
import AethelLayout from '@/components/AethelLayout';
import Receipt from '@/components/Receipt';

export default function ElectricityPayPage() {
    const { language, addToast } = useAppState();
    const t = translations[language] || translations.en;
    const router = useRouter();
    const [consumerId, setConsumerId] = useState('');
    const [step, setStep] = useState(1); // 1: Fetch, 2: Confirm, 3: Success
    const [showReceipt, setShowReceipt] = useState(false);
    const [loading, setLoading] = useState(false);

    const sidebarLinks = [
        { label: 'Energy Hub', icon: <LayoutDashboard size={20} />, href: '/electricity' },
        { label: 'Quick Pay', icon: <ReceiptIcon size={20} />, href: '/electricity/pay', active: true },
        { label: 'New Connection', icon: <FilePlus size={20} />, href: '/electricity/new' },
        { label: 'Outage Report', icon: <AlertTriangle size={20} />, href: '/electricity/outage' },
    ];

    const handleFetch = (e: React.FormEvent) => {
        e.preventDefault();
        if (consumerId.length < 5) return addToast({ message: 'Enter valid Consumer ID', type: 'error' });
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
            addToast({ message: 'Payment successful!', type: 'success' });
        }, 2000);
    };

    return (
        <AethelLayout
            title="Bill Payment"
            themeColor="var(--theme-amber)"
            themeSoft="var(--theme-amber-soft)"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.payContainer}>
                {step === 1 && (
                    <div style={styles.card}>
                        <div style={styles.formHeader}>
                            <h2 style={styles.cardTitle}>Fetch Electricity Bill</h2>
                            <p style={styles.cardSub}>Enter your unique consumer number to continue</p>
                        </div>
                        <form onSubmit={handleFetch} style={styles.form}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Consumer ID / Service No</label>
                                <div style={styles.inputWrapper}>
                                    <Zap size={20} color="#94a3b8" />
                                    <input
                                        type="tel"
                                        value={consumerId}
                                        onChange={e => setConsumerId(e.target.value.replace(/\D/g, ''))}
                                        placeholder="Ex: 88273641"
                                        style={styles.input}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" style={styles.primaryBtn} disabled={loading}>
                                {loading ? 'Fetching...' : 'Fetch Bill Details'}
                            </button>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div style={styles.card}>
                        <div style={styles.formHeader}>
                            <h2 style={styles.cardTitle}>Confirm Statement</h2>
                            <p style={styles.cardSub}>Review billing details before final payment</p>
                        </div>
                        <div style={styles.billBox}>
                            <div style={styles.billRow}><span>Customer Name</span><strong>Rajesh Kumar</strong></div>
                            <div style={styles.billRow}><span>Bill Month</span><strong>January 2026</strong></div>
                            <div style={styles.billRow}><span>Units Consumed</span><strong>450 Units</strong></div>
                            <div style={styles.billRow}><span>Due Date</span><strong>25 Jan 2026</strong></div>
                            <div style={styles.billDivider} />
                            <div style={styles.billRowTotal}><span>Payable Amount</span><strong>₹ 1,245.00</strong></div>
                        </div>

                        <div style={styles.paymentMethods}>
                            <button style={styles.methodBtn}><CreditCard size={18} /> Card</button>
                            <button style={{ ...styles.methodBtn, background: '#f8fafc' }}><QrCode size={18} /> UPI QR</button>
                            <button style={{ ...styles.methodBtn, background: '#f8fafc' }}><Fingerprint size={18} /> AEPS</button>
                        </div>

                        <button onClick={handlePay} style={{ ...styles.primaryBtn, background: '#1e293b' }} disabled={loading}>
                            {loading ? 'Processing...' : 'Confirm & Pay Securely'}
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div style={{ ...styles.card, textAlign: 'center' }}>
                        <div style={styles.successIcon}><CheckCircle2 size={48} color="white" /></div>
                        <h2 style={styles.cardTitle}>Payment Received</h2>
                        <p style={styles.cardSub}>Transaction ID: SUVIDHA-ELEC-782910</p>
                        <div style={styles.actionRow}>
                            <button onClick={() => setShowReceipt(true)} style={styles.outlineBtn}>View Receipt</button>
                            <button onClick={() => router.push('/electricity')} style={styles.outlineBtn}>Back to energy hub</button>
                        </div>
                    </div>
                )}
            </div>

            {showReceipt && (
                <Receipt
                    type="electricity"
                    transactionId="SUVIDHA-ELEC-782910"
                    amount={1245}
                    customerName="Rajesh Kumar"
                    details={{
                        'Consumer ID': consumerId || '88273641',
                        'Bill Month': 'January 2026',
                        'Units Consumed': '450 units',
                        'Due Date': '25 Jan 2026'
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
