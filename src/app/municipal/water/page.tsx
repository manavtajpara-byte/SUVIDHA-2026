'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { useRouter } from 'next/navigation';
import { Droplets, CreditCard, CheckCircle2, LayoutDashboard, History, Search, ChevronRight, FileText, QrCode, ShieldCheck, Fingerprint, Receipt } from 'lucide-react';
import AethelLayout from '@/components/AethelLayout';
import ReceiptComponent from '@/components/Receipt';

export default function WaterTaxPage() {
    const { language, addToast } = useAppState();
    const t = translations[language] || translations.en;
    const router = useRouter();
    const [propertyId, setPropertyId] = useState('');
    const [step, setStep] = useState(1); // 1: Fetch, 2: Confirm, 3: Success
    const [showReceipt, setShowReceipt] = useState(false);
    const [loading, setLoading] = useState(false);

    const sidebarLinks = [
        { label: 'Citizen Hub', icon: <LayoutDashboard size={20} />, href: '/municipal' },
        { label: 'Water Tax', icon: <Droplets size={20} />, href: '/municipal/water', active: true },
        { label: 'Usage History', icon: <History size={20} />, href: '/municipal/water/history' },
    ];

    const handleFetch = (e: React.FormEvent) => {
        e.preventDefault();
        if (propertyId.length < 5) return addToast({ message: 'Enter valid Property ID', type: 'error' });
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
            addToast({ message: 'Water Tax paid successfully!', type: 'success' });
        }, 2000);
    };

    return (
        <AethelLayout
            title="Water Tax Portal"
            themeColor="var(--theme-ocean)"
            themeSoft="var(--theme-ocean-soft)"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.payContainer}>
                {step === 1 && (
                    <div style={styles.card}>
                        <div style={styles.formHeader}>
                            <h2 style={styles.cardTitle}>Fetch Municipal Dues</h2>
                            <p style={styles.cardSub}>Enter your Property ID or Consumer Number</p>
                        </div>
                        <form onSubmit={handleFetch} style={styles.form}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Property ID / Service No</label>
                                <div style={styles.inputWrapper}>
                                    <Droplets size={20} color="#94a3b8" />
                                    <input
                                        type="text"
                                        value={propertyId}
                                        onChange={e => setPropertyId(e.target.value.toUpperCase())}
                                        placeholder="Ex: PROP-45012"
                                        style={styles.input}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" style={styles.primaryBtn} disabled={loading}>
                                {loading ? 'Checking Records...' : 'Fetch Water Tax Dues'}
                            </button>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div style={styles.card}>
                        <div style={styles.formHeader}>
                            <h2 style={styles.cardTitle}>Tax Determination</h2>
                            <p style={styles.cardSub}>Review assessment details for Q4 2025</p>
                        </div>
                        <div style={styles.billBox}>
                            <div style={styles.billRow}><span>Owner Name</span><strong>Anita Sharma</strong></div>
                            <div style={styles.billRow}><span>Address</span><strong>Flat 4B, Skyview Apts</strong></div>
                            <div style={styles.billRow}><span>Connection Type</span><strong>Residential Metered</strong></div>
                            <div style={styles.billDivider} />
                            <div style={styles.billRowTotal}><span>Outstanding Balance</span><strong>₹ 3,420.00</strong></div>
                        </div>

                        <div style={styles.paymentMethods}>
                            <button style={styles.methodBtn}><CreditCard size={18} /> Card</button>
                            <button style={{ ...styles.methodBtn, background: '#f8fafc' }}><QrCode size={18} /> UPI</button>
                            <button style={{ ...styles.methodBtn, background: '#f8fafc' }}><Fingerprint size={18} /> AEPS</button>
                        </div>

                        <button onClick={handlePay} style={{ ...styles.primaryBtn, background: '#1e293b' }} disabled={loading}>
                            {loading ? 'Processing Transaction...' : 'Confirm & Authorize Payment'}
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div style={{ ...styles.card, textAlign: 'center' }}>
                        <div style={styles.successIcon}><CheckCircle2 size={48} color="white" /></div>
                        <h2 style={styles.cardTitle}>Tax Paid Successfully</h2>
                        <p style={styles.cardSub}>Receipt ID: MUNI-WATER-9921</p>
                        <div style={styles.actionRow}>
                            <button onClick={() => setShowReceipt(true)} style={styles.outlineBtn}>Digital Receipt</button>
                            <button onClick={() => router.push('/municipal')} style={styles.outlineBtn}>Back to Citizen Hub</button>
                        </div>
                    </div>
                )}
            </div>

            {showReceipt && (
                <ReceiptComponent
                    type="water-tax"
                    transactionId="MUNI-WATER-9921"
                    amount={3420}
                    customerName="Anita Sharma"
                    details={{
                        'Property ID': propertyId || 'PROP-45012',
                        'Address': 'Flat 4B, Skyview Apts',
                        'Connection Type': 'Residential Metered',
                        'Period': 'Q4 2025'
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
    primaryBtn: { background: 'var(--theme-ocean)', color: 'white', padding: '1.25rem', borderRadius: '16px', border: 'none', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 10px 20px rgba(8, 145, 178, 0.2)' },
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
