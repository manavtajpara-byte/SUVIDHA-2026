'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { useVirtualKeyboard } from '@/hooks/useVirtualKeyboard';
import VirtualKeyboard from '@/components/VirtualKeyboard';
import { ArrowLeft, CheckCircle2, CreditCard, CreditCard as CardIcon, Scan, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Receipt from '@/components/Receipt';

export default function MetroCardPage() {
    const { language } = useAppState();
    const t = translations[language];
    const router = useRouter();
    const { isOpen, openKeyboard, closeKeyboard, handleInput, handleDelete, values } = useVirtualKeyboard();
    const [step, setStep] = useState(1); // 1: Verify Card, 2: Amount, 3: Payment, 4: Success
    const [showReceipt, setShowReceipt] = useState(false);
    const [mockBalance, setMockBalance] = useState(124.50);

    const rechargeAmounts = [100, 200, 500, 1000];
    const [selectedAmount, setSelectedAmount] = useState(rechargeAmounts[1]);

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (values.cardNumber) setStep(2);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => step === 1 ? router.back() : setStep(step - 1)} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h2 style={styles.title}>Metro Card Recharge</h2>
            </div>

            <div style={styles.card}>
                {step === 1 && (
                    <form onSubmit={handleVerify} style={styles.form}>
                        <div style={styles.scanHeader}>
                            <Scan size={80} color="var(--primary)" />
                            <p>Place card on the kiosk scanner OR enter card number</p>
                        </div>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Smart Card Number</label>
                            <input
                                readOnly
                                value={values.cardNumber || ''}
                                onFocus={() => openKeyboard('cardNumber')}
                                placeholder="Ex: 80034412"
                                style={styles.input}
                            />
                        </div>
                        <button type="submit" style={styles.submitBtn} disabled={!values.cardNumber}>
                            Verify Card Balance
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <div style={styles.stepContainer}>
                        <div style={styles.balanceCard}>
                            <span>Current Balance</span>
                            <strong>₹ {mockBalance.toFixed(2)}</strong>
                        </div>
                        <h3 style={styles.subTitle}>Select Recharge Amount</h3>
                        <div style={styles.grid}>
                            {rechargeAmounts.map(amt => (
                                <button
                                    key={amt}
                                    onClick={() => setSelectedAmount(amt)}
                                    style={{
                                        ...styles.amtBtn,
                                        borderColor: selectedAmount === amt ? 'var(--primary)' : '#e2e8f0',
                                        backgroundColor: selectedAmount === amt ? '#f1f5f9' : 'white'
                                    }}
                                >
                                    ₹ {amt}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => setStep(3)} style={styles.submitBtn}>Proceed to Payment</button>
                    </div>
                )}

                {step === 3 && (
                    <div style={styles.summary}>
                        <div style={styles.summaryItem}>
                            <span>Card Number:</span>
                            <strong>{values.cardNumber}</strong>
                        </div>
                        <div style={styles.summaryItem}>
                            <span>Recharge Value:</span>
                            <strong style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>₹ {selectedAmount.toFixed(2)}</strong>
                        </div>
                        <button onClick={() => setStep(4)} style={styles.payBtn}>
                            <CreditCard size={28} />
                            Complete Payment
                        </button>
                    </div>
                )}

                {step === 4 && (
                    <div style={styles.success}>
                        <div style={styles.zapCircle}>
                            <Zap size={60} color="white" fill="white" />
                        </div>
                        <h3 style={styles.successTitle}>Balance Updated!</h3>
                        <p>New Balance: ₹ {(mockBalance + selectedAmount).toFixed(2)}</p>
                        <div style={styles.receiptActions}>
                            <button onClick={() => setShowReceipt(true)} style={styles.receiptBtn}>Official Receipt</button>
                            <button onClick={() => router.push('/')} style={styles.homeBtn}>Back to Home</button>
                        </div>
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
                    type="metro-recharge"
                    transactionId={`METRO-${Date.now()}`}
                    amount={selectedAmount}
                    customerName="Metro Commuter"
                    details={{
                        'Card Number': values.cardNumber || '80034412',
                        'Previous Balance': `₹ ${mockBalance.toFixed(2)}`,
                        'Current Balance': `₹ ${(mockBalance + selectedAmount).toFixed(2)}`,
                        'Recharge Type': 'Instant Top-Up',
                        'Station ID': 'CSC-KIOSK-04'
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
    scanHeader: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', fontSize: '1.2rem', fontWeight: 'bold', color: '#64748b' },
    fieldGroup: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    label: { fontSize: '1.2rem', fontWeight: 'bold', color: '#444' },
    input: { padding: '1.2rem', fontSize: '1.5rem', borderRadius: '0.8rem', border: '2px solid #ddd', backgroundColor: '#f9f9f9', textAlign: 'center' },
    submitBtn: { padding: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold', backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer' },
    stepContainer: { display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' },
    balanceCard: {
        backgroundColor: 'var(--primary)', color: 'white', padding: '2rem',
        borderRadius: '1.5rem', display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '0.5rem', boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.4)'
    },
    subTitle: { fontSize: '1.5rem', fontWeight: 800, margin: 0 },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' },
    amtBtn: {
        padding: '1.5rem', fontSize: '1.5rem', fontWeight: 900,
        borderRadius: '1.2rem', border: '3px solid #e2e8f0',
        cursor: 'pointer', transition: 'all 0.2s'
    },
    summary: { width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    summaryItem: { display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' },
    payBtn: { marginTop: '2rem', padding: '1.5rem', fontSize: '1.8rem', fontWeight: 'bold', backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' },
    success: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' },
    zapCircle: {
        width: '100px', height: '100px', borderRadius: '50%',
        backgroundColor: '#f59e0b', display: 'flex', alignItems: 'center',
        justifyContent: 'center', boxShadow: '0 0 30px rgba(245, 158, 11, 0.5)'
    },
    successTitle: { fontSize: '2.5rem', fontWeight: 900, color: 'var(--municipal)', margin: 0 },
    receiptActions: { display: 'flex', gap: '1rem', marginTop: '1rem' },
    receiptBtn: { padding: '1rem 2rem', fontSize: '1.2rem', fontWeight: 'bold', border: '2px solid var(--primary)', borderRadius: '1rem', background: 'none', color: 'var(--primary)', cursor: 'pointer' },
    homeBtn: { marginTop: '1rem', padding: '1rem 3rem', fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer' }
};
