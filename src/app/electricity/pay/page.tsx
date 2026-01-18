'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { useVirtualKeyboard } from '@/hooks/useVirtualKeyboard';
import VirtualKeyboard from '@/components/VirtualKeyboard';
import { ArrowLeft, CreditCard, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Receipt from '@/components/Receipt';

export default function BillPayPage() {
    const { language } = useAppState();
    const t = translations[language];
    const router = useRouter();
    const { isOpen, openKeyboard, closeKeyboard, handleInput, handleDelete, values } = useVirtualKeyboard();
    const [step, setStep] = useState(1); // 1: Fetch, 2: Confirm, 3: Success
    const [showReceipt, setShowReceipt] = useState(false);

    const handleFetch = (e: React.FormEvent) => {
        e.preventDefault();
        if (values.consumerId) setStep(2);
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
                <h2 style={styles.title}>{t.payBill}</h2>
            </div>

            <div style={styles.card}>
                {step === 1 && (
                    <form onSubmit={handleFetch} style={styles.form}>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Enter Consumer Number / Customer ID</label>
                            <input
                                type="text"
                                readOnly
                                placeholder="Ex: 123456789"
                                value={values.consumerId || ''}
                                onFocus={() => openKeyboard('consumerId')}
                                style={styles.input}
                            />
                        </div>
                        <button type="submit" style={styles.submitBtn} disabled={!values.consumerId}>
                            Fetch Pending Bill
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <div style={styles.summary}>
                        <div style={styles.summaryItem}>
                            <span>Customer Name:</span>
                            <strong>Rajesh Kumar</strong>
                        </div>
                        <div style={styles.summaryItem}>
                            <span>Bill Month:</span>
                            <strong>January 2026</strong>
                        </div>
                        <div style={styles.summaryItem}>
                            <span>Amount Due:</span>
                            <strong style={{ fontSize: '2.5rem', color: 'var(--electricity)' }}>₹ 1,245.00</strong>
                        </div>
                        <button onClick={handlePay} style={styles.payBtn}>
                            <CreditCard size={28} />
                            Confirm & Pay Securely
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div style={styles.success}>
                        <CheckCircle2 size={120} color="var(--municipal)" />
                        <h3 style={styles.successTitle}>Payment Successful!</h3>
                        <p>Transaction ID: SUVIDHA-782910</p>
                        <div style={styles.receiptActions}>
                            <button onClick={() => setShowReceipt(true)} style={styles.receiptBtn}>View & Print Receipt</button>
                            <button onClick={() => alert('Receipt shared to mobile!')} style={styles.receiptBtn}>SMS Receipt</button>
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
                    type="electricity"
                    transactionId="SUVIDHA-ELEC-782910"
                    amount={1245}
                    customerName="Rajesh Kumar"
                    details={{
                        'Consumer ID': values.consumerId || '88273641',
                        'Bill Month': 'January 2026',
                        'Units Consumed': '450 units',
                        'Due Date': '25 Jan 2026'
                    }}
                    onClose={() => setShowReceipt(false)}
                />
            )}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
    },
    backBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--primary)',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 900,
        margin: 0,
    },
    card: {
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '2rem',
        boxShadow: 'var(--card-shadow)',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%',
    },
    fieldGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    label: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#475569',
    },
    input: {
        padding: '1.5rem',
        fontSize: '2rem',
        borderRadius: '1rem',
        border: '3px solid #e2e8f0',
        textAlign: 'center',
        backgroundColor: '#f8fafc',
        cursor: 'pointer',
    },
    submitBtn: {
        padding: '1.5rem',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        backgroundColor: 'var(--primary)',
        color: 'white',
        border: 'none',
        borderRadius: '1rem',
        cursor: 'pointer',
        opacity: 1,
    },
    summary: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    summaryItem: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '1.5rem',
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: '0.75rem',
    },
    payBtn: {
        marginTop: '2rem',
        padding: '1.5rem',
        fontSize: '1.8rem',
        fontWeight: 'bold',
        backgroundColor: 'var(--primary)',
        color: 'white',
        border: 'none',
        borderRadius: '1rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
    },
    success: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1.5rem',
    },
    successTitle: {
        fontSize: '2.5rem',
        fontWeight: 900,
        color: 'var(--municipal)',
        margin: 0,
    },
    receiptActions: {
        display: 'flex',
        gap: '1rem',
        marginTop: '1rem',
    },
    receiptBtn: {
        padding: '1rem 2rem',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        border: '2px solid var(--primary)',
        borderRadius: '1rem',
        background: 'none',
        color: 'var(--primary)',
        cursor: 'pointer',
    },
    homeBtn: {
        marginTop: '2.5rem',
        padding: '1rem 3rem',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        backgroundColor: 'var(--foreground)',
        color: 'white',
        border: 'none',
        borderRadius: '1rem',
        cursor: 'pointer',
    }
};
