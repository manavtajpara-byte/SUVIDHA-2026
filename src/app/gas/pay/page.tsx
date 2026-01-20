'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { useVirtualKeyboard } from '@/hooks/useVirtualKeyboard';
import VirtualKeyboard from '@/components/VirtualKeyboard';
import { ArrowLeft, CreditCard, CheckCircle2, Flame } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Receipt from '@/components/Receipt';

export default function GasBillPayPage() {
    const { language } = useAppState();
    const t = translations[language];
    const router = useRouter();
    const { isOpen, openKeyboard, closeKeyboard, handleInput, handleDelete, values } = useVirtualKeyboard();
    const [step, setStep] = useState(1);
    const [showReceipt, setShowReceipt] = useState(false);

    const handleFetch = (e: React.FormEvent) => {
        e.preventDefault();
        if (values.consumerNumber) setStep(2);
    };

    const handlePay = () => {
        setStep(3);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h2 style={styles.title}>{t.gas} - {t.payBill}</h2>
            </div>

            <div style={styles.card}>
                {step === 1 && (
                    <form onSubmit={handleFetch} style={styles.form}>
                        <div style={styles.iconHeader}>
                            <Flame size={60} color="var(--gas)" />
                            <p>Enter Gas Consumer Number</p>
                        </div>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Consumer ID / BP Number</label>
                            <input
                                type="text"
                                readOnly
                                placeholder="Ex: 50021489"
                                value={values.consumerNumber || ''}
                                onFocus={() => openKeyboard('consumerNumber')}
                                style={styles.input}
                            />
                        </div>
                        <button type="submit" style={styles.submitBtn} disabled={!values.consumerNumber}>
                            Fetch Billing Details
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <div style={styles.summary}>
                        <div style={styles.summaryItem}>
                            <span>Distributor:</span>
                            <strong>Indane Gas Service</strong>
                        </div>
                        <div style={styles.summaryItem}>
                            <span>Customer Name:</span>
                            <strong>Sunita Devi</strong>
                        </div>
                        <div style={styles.summaryItem}>
                            <span>Due Amount:</span>
                            <strong style={{ fontSize: '2.5rem', color: 'var(--gas)' }}>₹ 950.00</strong>
                        </div>
                        <button onClick={handlePay} style={styles.payBtn}>
                            <CreditCard size={28} />
                            Pay Gas Bill Now
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div style={styles.success}>
                        <CheckCircle2 size={120} color="var(--municipal)" />
                        <h3 style={styles.successTitle}>Payment Received!</h3>
                        <p>Booking ID: GAS-REF-5521</p>
                        <div style={styles.receiptActions}>
                            <button onClick={() => setShowReceipt(true)} style={styles.receiptBtn}>Print Receipt</button>
                            <button onClick={() => alert('Confirmed to Distributor')} style={styles.receiptBtn}>Notify Agent</button>
                        </div>
                        <button onClick={() => router.push('/')} style={styles.homeBtn}>Back to Home</button>
                    </div>
                )}
            </div>

            {isOpen && (
                <VirtualKeyboard
                    onInput={handleInput}
                    onDelete={handleDelete}
                    onClose={closeKeyboard}
                />
            )}

            {showReceipt && (
                <Receipt
                    type="gas-utility"
                    transactionId="GAS-REF-5521"
                    amount={950}
                    customerName="Sunita Devi"
                    details={{
                        'Consumer ID': values.consumerNumber || '50021489',
                        'Distributor': 'Indane Gas Service',
                        'Booking Type': 'Cylinder Refill',
                        'Sub-Station': 'North-East Hub'
                    }}
                    onClose={() => setShowReceipt(false)}
                />
            )}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' },
    header: { display: 'flex', alignItems: 'center', gap: '2rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' },
    title: { fontSize: '2.5rem', fontWeight: 900, margin: 0 },
    card: { backgroundColor: 'white', padding: '3rem', borderRadius: '2rem', boxShadow: 'var(--card-shadow)', minHeight: '400px' },
    form: { display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' },
    iconHeader: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', fontSize: '1.2rem', fontWeight: 'bold' },
    fieldGroup: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    label: { fontSize: '1.5rem', fontWeight: 'bold', color: '#475569' },
    input: { padding: '1.5rem', fontSize: '2rem', borderRadius: '1rem', border: '3px solid #e2e8f0', textAlign: 'center', backgroundColor: '#f8fafc', cursor: 'pointer' },
    submitBtn: { padding: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold', backgroundColor: 'var(--gas)', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer' },
    summary: { width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    summaryItem: { display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' },
    payBtn: { marginTop: '2rem', padding: '1.5rem', fontSize: '1.8rem', fontWeight: 'bold', backgroundColor: 'var(--gas)', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' },
    success: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' },
    successTitle: { fontSize: '2.5rem', fontWeight: 900, color: 'var(--municipal)', margin: 0 },
    receiptActions: { display: 'flex', gap: '1rem', marginTop: '1rem' },
    receiptBtn: { padding: '1rem 2rem', fontSize: '1.2rem', fontWeight: 'bold', border: '2px solid var(--gas)', borderRadius: '1rem', background: 'none', color: 'var(--gas)', cursor: 'pointer' },
    homeBtn: { marginTop: '2.5rem', padding: '1rem 3rem', fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: 'var(--foreground)', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer' }
};
