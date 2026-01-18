'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { ArrowLeft, Home as HomeIcon, CreditCard, FileText, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useVirtualKeyboard } from '@/hooks/useVirtualKeyboard';
import VirtualKeyboard from '@/components/VirtualKeyboard';
import Receipt from '@/components/Receipt';

export default function PropertyTaxPage() {
    const { language } = useAppState();
    const t = translations[language];
    const router = useRouter();
    const { isOpen, openKeyboard, closeKeyboard, handleInput, handleDelete, values } = useVirtualKeyboard();
    const [step, setStep] = useState(1);
    const [showReceipt, setShowReceipt] = useState(false);

    const handleFetch = (e: React.FormEvent) => {
        e.preventDefault();
        if (values.propertyId) setStep(2);
    };

    const handlePay = () => {
        setShowReceipt(true);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}><ArrowLeft size={32} /></button>
                <h2 style={styles.title}>{t.propertyTax}</h2>
            </div>

            <div style={styles.card}>
                {step === 1 && (
                    <form onSubmit={handleFetch} style={styles.form}>
                        <div style={styles.iconHeader}>
                            <HomeIcon size={60} color="#dc2626" />
                            <p>Enter Property ID to view tax details</p>
                        </div>
                        <input readOnly value={values.propertyId || ''} onFocus={() => openKeyboard('propertyId')} placeholder="Property ID" style={styles.input} />
                        <button type="submit" style={styles.submitBtn} disabled={!values.propertyId}>Fetch Tax Details</button>
                    </form>
                )}

                {step === 2 && (
                    <div style={styles.summary}>
                        <div style={styles.summaryItem}><span>Property ID:</span><strong>{values.propertyId}</strong></div>
                        <div style={styles.summaryItem}><span>Owner Name:</span><strong>Suresh Patel</strong></div>
                        <div style={styles.summaryItem}><span>Property Type:</span><strong>Residential</strong></div>
                        <div style={styles.summaryItem}><span>Area (sq ft):</span><strong>1,200</strong></div>
                        <div style={styles.summaryItem}><span>Annual Tax:</span><strong style={{ fontSize: '2.5rem', color: '#dc2626' }}>₹ 8,500.00</strong></div>
                        <button onClick={handlePay} style={styles.payBtn}><CreditCard size={28} />Pay Property Tax</button>
                    </div>
                )}
            </div>

            {isOpen && <VirtualKeyboard onInput={handleInput} onDelete={handleDelete} onClose={closeKeyboard} />}

            {showReceipt && (
                <Receipt
                    type="property-tax"
                    transactionId={`PTAX-${Date.now()}`}
                    amount={8500}
                    customerName="Suresh Patel"
                    details={{
                        'Property ID': values.propertyId || 'PROP-45012',
                        'Property Type': 'Residential',
                        'Area': '1,200 sq ft',
                        'Assessment Year': '2025-2026',
                        'Tax Period': 'Annual'
                    }}
                    onClose={() => { setShowReceipt(false); router.push('/'); }}
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
    form: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    iconHeader: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', fontSize: '1.2rem', fontWeight: 'bold' },
    input: { padding: '1.5rem', fontSize: '2rem', borderRadius: '1rem', border: '3px solid #e2e8f0', textAlign: 'center', backgroundColor: '#f8fafc', cursor: 'pointer' },
    submitBtn: { padding: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer' },
    summary: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    summaryItem: { display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' },
    payBtn: { marginTop: '2rem', padding: '1.5rem', fontSize: '1.8rem', fontWeight: 'bold', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }
};
