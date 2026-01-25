'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { ArrowLeft, CheckCircle2, CreditCard, RefreshCw, Zap, Landmark } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Receipt from '@/components/Receipt';

export default function MetroCardPage() {
    const { language } = useAppState();
    const t = (translations[language] || translations.en) as any;
    const router = useRouter();
    const [cardNo, setCardNo] = useState('');
    const [amount, setAmount] = useState('');
    const [step, setStep] = useState(1); // 1: ID, 2: Amount, 3: Success
    const [isProcessing, setIsProcessing] = useState(false);
    const [showReceipt, setShowReceipt] = useState(false);

    const handleNext = () => setStep(step + 1);

    const handleRecharge = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setStep(3);
        }, 2000);
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
                    <div style={styles.stepContainer}>
                        <div style={styles.hero}>
                            <CreditCard size={80} color="#06b6d4" />
                            <h3>Enter Metro Card Number</h3>
                            <p>Found on the back of your card (8-12 digits)</p>
                        </div>
                        <input
                            value={cardNo}
                            onChange={(e) => setCardNo(e.target.value)}
                            placeholder="Card Number"
                            style={styles.input}
                        />
                        <button onClick={handleNext} style={styles.submitBtn} disabled={!cardNo}>
                            Check Card Balance
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div style={styles.stepContainer}>
                        <div style={styles.balanceBox}>
                            <span>Current Balance</span>
                            <strong>₹ 42.50</strong>
                        </div>
                        <div style={styles.amountGrid}>
                            {[100, 200, 500, 1000].map(amt => (
                                <button
                                    key={amt}
                                    onClick={() => setAmount(amt.toString())}
                                    style={styles.amtBtn}
                                >
                                    ₹ {amt}
                                </button>
                            ))}
                        </div>
                        <div style={styles.inputGroup}>
                            <label>Recharge Amount</label>
                            <input
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <button onClick={handleRecharge} style={styles.rechargeBtn} disabled={!amount || isProcessing}>
                            {isProcessing ? (
                                <>
                                    <RefreshCw className="spin" size={24} /> Processing...
                                </>
                            ) : (
                                `Pay ₹ ${amount || '0'}`
                            )}
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div style={styles.success}>
                        <CheckCircle2 size={120} color="#06b6d4" />
                        <h3 style={styles.successTitle}>Recharge Successful!</h3>
                        <p>Your Metro card has been updated. New Balance: <strong>₹ {(parseFloat(amount || '0') + 42.50).toFixed(2)}</strong></p>
                        <div style={styles.receiptActions}>
                            <button onClick={() => setShowReceipt(true)} style={styles.receiptBtn}>Print Receipt</button>
                        </div>
                        <button onClick={() => router.push('/')} style={styles.homeBtn}>Back to Home</button>
                    </div>
                )}
            </div>

            {showReceipt && (
                <Receipt
                    type="Metro Card Recharge"
                    transactionId={`METRO-${Date.now()}`}
                    amount={parseFloat(amount || '0')}
                    customerName="Metro User"
                    details={{
                        'Card Number': cardNo || 'XXXX-XXXX',
                        'Previous Balance': '₹ 42.50',
                        'Added Amount': `₹ ${amount}`,
                        'New Balance': `₹ ${(parseFloat(amount || '0') + 42.50).toFixed(2)}`,
                        'Operator': 'Metro Rail Corp'
                    }}
                    onClose={() => setShowReceipt(false)}
                />
            )}

            <style jsx>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .spin { animation: spin 1s linear infinite; }
            `}</style>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' },
    header: { display: 'flex', alignItems: 'center', gap: '2rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' },
    title: { fontSize: '2.5rem', fontWeight: 900, margin: 0 },
    card: { backgroundColor: 'white', padding: '3rem', borderRadius: '2rem', boxShadow: 'var(--card-shadow)', minHeight: '400px' },
    stepContainer: { display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', alignItems: 'center', textAlign: 'center' },
    hero: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
    input: { padding: '1.2rem', fontSize: '1.8rem', borderRadius: '0.8rem', border: '2px solid #ddd', backgroundColor: '#f9f9f9', textAlign: 'center', width: '100%' },
    submitBtn: { width: '100%', padding: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold', backgroundColor: '#06b6d4', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer' },
    balanceBox: { padding: '1.5rem 3rem', backgroundColor: '#ecfeff', color: '#06b6d4', borderRadius: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    amountGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', width: '100%' },
    amtBtn: { padding: '1rem', fontSize: '1.2rem', fontWeight: 'bold', border: '2px solid #06b6d4', borderRadius: '0.8rem', color: '#06b6d4', backgroundColor: 'white', cursor: 'pointer' },
    inputGroup: { width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    rechargeBtn: { width: '100%', padding: '1.5rem', fontSize: '1.8rem', fontWeight: 'bold', backgroundColor: '#06b6d4', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' },
    success: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' },
    successTitle: { fontSize: '2.5rem', fontWeight: 900, color: '#06b6d4', margin: 0 },
    receiptActions: { display: 'flex', gap: '1rem', marginTop: '1rem' },
    receiptBtn: { padding: '1rem 2rem', fontSize: '1.2rem', fontWeight: 'bold', border: '2px solid #06b6d4', borderRadius: '1rem', background: 'none', color: '#06b6d4', cursor: 'pointer' },
    homeBtn: { marginTop: '1rem', padding: '1rem 3rem', fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer' }
};
