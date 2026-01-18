'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { useVirtualKeyboard } from '@/hooks/useVirtualKeyboard';
import VirtualKeyboard from '@/components/VirtualKeyboard';
import { ArrowLeft, CheckCircle2, Bus, MapPin, Calendar, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Receipt from '@/components/Receipt';

export default function BusPassPage() {
    const { language } = useAppState();
    const t = translations[language];
    const router = useRouter();
    const { isOpen, openKeyboard, closeKeyboard, handleInput, handleDelete, values } = useVirtualKeyboard();
    const [step, setStep] = useState(1); // 1: Routes, 2: Details, 3: Payment, 4: Success
    const [showReceipt, setShowReceipt] = useState(false);

    const routes = [
        { id: 'R-101', name: 'Downtown Express (Route 101)', price: 450 },
        { id: 'R-202', name: 'Suburban Link (Route 202)', price: 350 },
        { id: 'R-303', name: 'Airport Shuttle (Route 303)', price: 1200 },
        { id: 'R-ALL', name: 'All Routes (Monthly Pass)', price: 2500 },
    ];

    const [selectedRoute, setSelectedRoute] = useState(routes[0]);

    const handleNext = () => setStep(step + 1);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => step === 1 ? router.back() : setStep(step - 1)} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h2 style={styles.title}>Apply for Bus Pass</h2>
            </div>

            <div style={styles.card}>
                {step === 1 && (
                    <div style={styles.stepContainer}>
                        <div style={styles.stepHeader}>
                            <Bus size={60} color="var(--primary)" />
                            <h3>Choose your Pass Route</h3>
                        </div>
                        <div style={styles.grid}>
                            {routes.map(route => (
                                <button
                                    key={route.id}
                                    onClick={() => setSelectedRoute(route)}
                                    style={{
                                        ...styles.routeBtn,
                                        borderColor: selectedRoute.id === route.id ? 'var(--primary)' : '#e2e8f0',
                                        backgroundColor: selectedRoute.id === route.id ? '#f1f5f9' : 'white'
                                    }}
                                >
                                    <div style={styles.routeInfo}>
                                        <MapPin size={24} />
                                        <strong>{route.name}</strong>
                                    </div>
                                    <span style={styles.price}>₹ {route.price}</span>
                                </button>
                            ))}
                        </div>
                        <button onClick={handleNext} style={styles.submitBtn}>Continue to Applicant Details</button>
                    </div>
                )}

                {step === 2 && (
                    <form style={styles.form}>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Applicant Full Name</label>
                            <input
                                readOnly
                                value={values.applicantName || ''}
                                onFocus={() => openKeyboard('applicantName')}
                                placeholder="As per Identity Proof"
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Aadhar Number / ID Number</label>
                            <input
                                readOnly
                                value={values.idNo || ''}
                                onFocus={() => openKeyboard('idNo')}
                                placeholder="XXXX-XXXX-XXXX"
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Pass Start Date</label>
                            <div style={styles.datePickerSim}>
                                <Calendar size={24} />
                                <span>{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                            </div>
                        </div>
                        <button onClick={handleNext} style={styles.submitBtn} disabled={!values.applicantName || !values.idNo}>
                            Proceed to Payment
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <div style={styles.summary}>
                        <div style={styles.summaryItem}>
                            <span>Selected Route:</span>
                            <strong>{selectedRoute.name}</strong>
                        </div>
                        <div style={styles.summaryItem}>
                            <span>Validity:</span>
                            <strong>30 Days (Monthly)</strong>
                        </div>
                        <div style={styles.summaryItem}>
                            <span>Amount Due:</span>
                            <strong style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>₹ {selectedRoute.price.toFixed(2)}</strong>
                        </div>
                        <button onClick={handleNext} style={styles.payBtn}>
                            <CreditCard size={28} />
                            Pay & Generate Pass
                        </button>
                    </div>
                )}

                {step === 4 && (
                    <div style={styles.success}>
                        <CheckCircle2 size={120} color="var(--municipal)" />
                        <h3 style={styles.successTitle}>Application Successful!</h3>
                        <p>Your bus pass has been generated and activated.</p>
                        <div style={styles.receiptActions}>
                            <button onClick={() => setShowReceipt(true)} style={styles.receiptBtn}>Open Digital Pass</button>
                            <button onClick={() => alert('Link sent to mobile')} style={styles.receiptBtn}>SMS Pass Link</button>
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
                    type="bus-pass-issue"
                    transactionId={`BUS-PASS-${Date.now()}`}
                    amount={selectedRoute.price}
                    customerName={values.applicantName || 'Applicant'}
                    details={{
                        'Route Name': selectedRoute.name,
                        'Pass ID': `BP-${Math.floor(Math.random() * 900000 + 100000)}`,
                        'ID Number': values.idNo || 'XXXX-XXXX-XXXX',
                        'Valid From': new Date().toLocaleDateString('en-GB'),
                        'Valid To': new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')
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
    stepContainer: { display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' },
    stepHeader: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
    grid: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    routeBtn: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.5rem', borderRadius: '1rem', border: '2px solid #e2e8f0',
        cursor: 'pointer', transition: 'all 0.2s'
    },
    routeInfo: { display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.2rem' },
    price: { fontSize: '1.3rem', fontWeight: 900, color: 'var(--primary)' },
    form: { display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' },
    fieldGroup: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    label: { fontSize: '1.2rem', fontWeight: 'bold', color: '#444' },
    input: { padding: '1.2rem', fontSize: '1.5rem', borderRadius: '0.8rem', border: '2px solid #ddd', backgroundColor: '#f9f9f9' },
    datePickerSim: {
        display: 'flex', alignItems: 'center', gap: '1rem',
        padding: '1.2rem', borderRadius: '0.8rem', border: '2px solid #ddd',
        backgroundColor: '#f1f5f9', fontSize: '1.2rem', fontWeight: 'bold'
    },
    submitBtn: { padding: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold', backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer' },
    summary: { width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    summaryItem: { display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' },
    payBtn: { marginTop: '2rem', padding: '1.5rem', fontSize: '1.8rem', fontWeight: 'bold', backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' },
    success: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' },
    successTitle: { fontSize: '2.5rem', fontWeight: 900, color: 'var(--municipal)', margin: 0 },
    receiptActions: { display: 'flex', gap: '1rem', marginTop: '1rem' },
    receiptBtn: { padding: '1rem 2rem', fontSize: '1.2rem', fontWeight: 'bold', border: '2px solid var(--primary)', borderRadius: '1rem', background: 'none', color: 'var(--primary)', cursor: 'pointer' },
    homeBtn: { marginTop: '2.5rem', padding: '1rem 3rem', fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer' }
};
