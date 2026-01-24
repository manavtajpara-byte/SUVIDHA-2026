'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { Landmark, CreditCard, CheckCircle2, LayoutDashboard, History, Search, ChevronRight, FileText, QrCode, ShieldCheck, Fingerprint, Building, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AethelLayout from '@/components/AethelLayout';
import ReceiptComponent from '@/components/Receipt';

export default function PropertyTaxPage() {
    const { language, addToast } = useAppState();
    const t = translations[language] || translations.en;
    const router = useRouter();
    const [propertyId, setPropertyId] = useState('');
    const [step, setStep] = useState(1); // 1: Fetch, 2: Confirm, 3: Success
    const [showReceipt, setShowReceipt] = useState(false);
    const [loading, setLoading] = useState(false);

    const sidebarLinks = [
        { label: 'Citizen Hub', icon: <LayoutDashboard size={20} />, href: '/municipal' },
        { label: 'Property Tax', icon: <Landmark size={20} />, href: '/property-tax', active: true },
        { label: 'Assessed Land', icon: <Building size={20} />, href: '/property-tax/list' },
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
            addToast({ message: 'Property Tax paid successfully!', type: 'success' });
        }, 2000);
    };

    return (
        <AethelLayout
            title="Property Tax Assessment"
            themeColor="var(--theme-ocean)"
            themeSoft="var(--theme-ocean-soft)"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.payContainer}>
                {step === 1 && (
                    <div style={styles.card}>
                        <div style={styles.formHeader}>
                            <h2 style={styles.cardTitle}>Property Assessment</h2>
                            <p style={styles.cardSub}>Enter your unique Property PIN or ID</p>
                        </div>
                        <form onSubmit={handleFetch} style={styles.form}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Property ID / PIN</label>
                                <div style={styles.inputWrapper}>
                                    <Landmark size={20} color="#94a3b8" />
                                    <input
                                        type="text"
                                        value={propertyId}
                                        onChange={e => setPropertyId(e.target.value.toUpperCase())}
                                        placeholder="Ex: PROP-77210"
                                        style={styles.input}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" style={styles.primaryBtn} disabled={loading}>
                                {loading ? 'Fetching Records...' : 'Check Appraisal Data'}
                            </button>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div style={styles.card}>
                        <div style={styles.formHeader}>
                            <h2 style={styles.cardTitle}>Tax Statement</h2>
                            <p style={styles.cardSub}>Review valuation for year 2025-26</p>
                        </div>
                        <div style={styles.billBox}>
                            <div style={styles.billRow}><span>Owner Name</span><strong>Suresh Patel</strong></div>
                            <div style={styles.billRow}><span>Property Type</span><strong>Residential (G+1)</strong></div>
                            <div style={styles.billRow}><span>Area Assessment</span><strong>1,200 sq ft</strong></div>
                            <div style={styles.billDivider} />
                            <div style={styles.billRowTotal}><span>Payable Tax</span><strong>₹ 8,500.00</strong></div>
                        </div>

                        <div style={styles.paymentMethods}>
                            <button style={styles.methodBtn}><CreditCard size={18} /> NetBanking</button>
                            <button style={{ ...styles.methodBtn, background: '#f8fafc' }}><QrCode size={18} /> UPI</button>
                            <button style={{ ...styles.methodBtn, background: '#f8fafc' }}><Fingerprint size={18} /> AEPS</button>
                        </div>

                        <button onClick={handlePay} style={{ ...styles.primaryBtn, background: '#1e293b' }} disabled={loading}>
                            {loading ? 'Processing Assessment...' : 'Authorize Tax Payment'}
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div style={{ ...styles.card, textAlign: 'center' }}>
                        <div style={styles.successIcon}><CheckCircle2 size={48} color="white" /></div>
                        <h2 style={styles.cardTitle}>Assessment Complete</h2>
                        <p style={styles.cardSub}>Transaction ID: PTAX-REF-2291</p>
                        <div style={styles.actionRow}>
                            <button onClick={() => setShowReceipt(true)} style={styles.outlineBtn}>Property Receipt</button>
                            <button onClick={() => router.push('/municipal')} style={styles.outlineBtn}>Portal Dashboard</button>
                        </div>
                    </div>
                )}
            </div>

            {showReceipt && (
                <ReceiptComponent
                    type="property-tax"
                    transactionId="PTAX-REF-2291"
                    amount={8500}
                    customerName="Suresh Patel"
                    details={{
                        'Property ID': propertyId || 'PROP-45012',
                        'Property Type': 'Residential',
                        'Area': '1,200 sq ft',
                        'Assessment Year': '2025-2026',
                        'Tax Period': 'Annual'
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
