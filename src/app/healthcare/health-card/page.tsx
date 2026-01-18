'use client';

import React, { useState } from 'react';
import { useVirtualKeyboard } from '@/hooks/useVirtualKeyboard';
import VirtualKeyboard from '@/components/VirtualKeyboard';
import { ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Receipt from '@/components/Receipt';

export default function HealthPage() {
    const router = useRouter();
    const { isOpen, openKeyboard, closeKeyboard, handleInput, handleDelete, values } = useVirtualKeyboard();
    const [step, setStep] = useState(1);
    const [showReceipt, setShowReceipt] = useState(false);

    const handleApply = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h2 style={styles.title}>Digital Health Card</h2>
            </div>

            <div style={styles.card}>
                {step === 1 && (
                    <form onSubmit={handleApply} style={styles.form}>
                        <div style={styles.iconHeader}>
                            <Heart size={60} color="#f43f5e" />
                            <p>Apply for New Digital Health ID</p>
                        </div>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Aadhaar Number</label>
                            <input
                                readOnly
                                value={values.aadhaar || ''}
                                onFocus={() => openKeyboard('aadhaar')}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Full Name</label>
                            <input
                                readOnly
                                value={values.name || ''}
                                onFocus={() => openKeyboard('name')}
                                style={styles.input}
                            />
                        </div>
                        <button type="submit" style={styles.submitBtn} disabled={!values.aadhaar || !values.name}>
                            Create Health ID
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <div style={styles.success}>
                        <CheckCircle2 size={120} color="#f43f5e" />
                        <h3 style={styles.successTitle}>Health Card Created!</h3>
                        <p>Health ID: 22-9999-1020-22</p>
                        <div style={styles.receiptActions}>
                            <button onClick={() => setShowReceipt(true)} style={styles.receiptBtn}>Print Card Detail</button>
                        </div>
                        <button onClick={() => router.push('/')} style={styles.homeBtn}>Back to Home</button>
                    </div>
                )}
            </div>

            {isOpen && <VirtualKeyboard onInput={handleInput} onDelete={handleDelete} onClose={closeKeyboard} />}

            {showReceipt && (
                <Receipt
                    type="municipal"
                    transactionId={`HID-${Date.now()}`}
                    customerName={values.name || 'Beneficiary'}
                    details={{
                        'Health ID': '22-9999-1020-22',
                        'Aadhaar Linked': 'Yes',
                        'DOB': '01/01/1990',
                        'Gender': 'Male'
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
    title: { fontSize: '2.5rem', fontWeight: 900, margin: 0, color: '#f43f5e' },
    card: { backgroundColor: 'white', padding: '3rem', borderRadius: '2rem', boxShadow: 'var(--card-shadow)', minHeight: '400px' },
    form: { display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' },
    iconHeader: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: 'bold' },
    fieldGroup: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    label: { fontSize: '1.5rem', fontWeight: 'bold', color: '#475569' },
    input: { padding: '1.5rem', fontSize: '1.5rem', borderRadius: '1rem', border: '2px solid #e2e8f0', backgroundColor: '#f8fafc' },
    submitBtn: { padding: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold', backgroundColor: '#f43f5e', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer' },
    success: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' },
    successTitle: { fontSize: '2.5rem', fontWeight: 900, color: '#f43f5e', margin: 0 },
    receiptActions: { display: 'flex', gap: '1rem', marginTop: '1rem' },
    receiptBtn: { padding: '1rem 2rem', fontSize: '1.2rem', fontWeight: 'bold', border: '2px solid #f43f5e', borderRadius: '1rem', background: 'none', color: '#f43f5e', cursor: 'pointer' },
    homeBtn: { marginTop: '2.5rem', padding: '1rem 3rem', fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: 'var(--foreground)', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer' }
};
