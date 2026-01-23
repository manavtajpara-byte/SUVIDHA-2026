'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { ArrowLeft, CreditCard, CheckCircle2, Droplets } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Receipt from '@/components/Receipt';

export default function WaterTaxPage() {
    const { language } = useAppState();
    const t = translations[language];
    const router = useRouter();
    const [propertyId, setPropertyId] = useState('');
    const [step, setStep] = useState(1);
    const [showReceipt, setShowReceipt] = useState(false);

    const handleFetch = (e: React.FormEvent) => {
        e.preventDefault();
        if (propertyId) setStep(2);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h2 style={styles.title}>Water Tax Payment</h2>
            </div>

            <div style={styles.card}>
                {step === 1 && (
                    <form onSubmit={handleFetch} style={styles.form}>
                        <div style={styles.iconHeader}>
                            <Droplets size={60} color="var(--municipal)" />
                            <p>Fetch details using Property ID</p>
                        </div>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Enter Property ID / Service No.</label>
                            <input
                                type="text"
                                placeholder="Ex: PROP-45012"
                                value={propertyId}
                                onChange={(e) => setPropertyId(e.target.value)}
                                style={styles.input}
                            />
                        </div>
                        <button type="submit" style={styles.submitBtn} disabled={!propertyId}>
                            Fetch Details
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <div style={styles.summary}>
                        <div style={styles.summaryItem}>
                            <span>Owner Name:</span>
                            <strong>Anita Sharma</strong>
                        </div>
                        <div style={styles.summaryItem}>
                            <span>Address:</span>
                            <strong>Flat 4B, Skyview Apts</strong>
                        </div>
                        <div style={styles.summaryItem}>
                            <span>Outstanding Tax:</span>
                            <strong style={{ fontSize: '2.5rem', color: 'var(--municipal)' }}>₹ 3,420.00</strong>
                        </div>
                        <button onClick={() => setStep(3)} style={styles.payBtn}>
                            <CreditCard size={28} />
                            Pay Water Tax Now
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div style={styles.success}>
                        <CheckCircle2 size={120} color="var(--municipal)" />
                        <h3 style={styles.successTitle}>Transaction Complete!</h3>
                        <p>Receipt ID: MUNI-WATER-9921</p>
                        <div style={styles.receiptActions}>
                            <button onClick={() => setShowReceipt(true)} style={styles.receiptBtn}>Print Receipt</button>
                            <button onClick={() => alert('Receipt shared to WhatsApp!')} style={styles.receiptBtn}>WhatsApp</button>
                        </div>
                        <button onClick={() => router.push('/')} style={styles.homeBtn}>Back to Home</button>
                    </div>
                )}
            </div>

            {showReceipt && (
                <Receipt
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
    },
    iconHeader: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2rem',
        fontSize: '1.2rem',
        fontWeight: 'bold',
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
        backgroundColor: 'var(--municipal)',
        color: 'white',
        border: 'none',
        borderRadius: '1rem',
        cursor: 'pointer',
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
        backgroundColor: 'var(--municipal)',
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
        border: '2px solid var(--municipal)',
        borderRadius: '1rem',
        background: 'none',
        color: 'var(--municipal)',
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
