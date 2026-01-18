'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { useVirtualKeyboard } from '@/hooks/useVirtualKeyboard';
import VirtualKeyboard from '@/components/VirtualKeyboard';
import { ArrowLeft, CheckCircle2, Heart, Fingerprint, Search, Smartphone, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Receipt from '@/components/Receipt';

export default function HealthCardPage() {
    const { language } = useAppState();
    const t = translations[language];
    const router = useRouter();
    const { isOpen, openKeyboard, closeKeyboard, handleInput, handleDelete, values } = useVirtualKeyboard();
    const [step, setStep] = useState(1); // 1: Info, 2: Verification, 3: Success/Card
    const [showReceipt, setShowReceipt] = useState(false);

    const handleVerify = () => setStep(3);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => step === 1 ? router.back() : setStep(step - 1)} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h2 style={styles.title}>Digital Health Card (ABHA)</h2>
            </div>

            <div style={styles.card}>
                {step === 1 && (
                    <div style={styles.stepContainer}>
                        <div style={styles.hero}>
                            <Heart size={80} color="#dc2626" fill="#fee2e2" />
                            <h3>Create your ABHA Health Account</h3>
                            <p style={styles.description}>
                                Ayushman Bharat Health Account (ABHA) is the first step towards creating safer
                                and efficient digital health records for you and your family.
                            </p>
                        </div>
                        <div style={styles.fieldGroup}>
                            <label style={styles.label}>Aadhar Number</label>
                            <input
                                readOnly
                                value={values.aadharNo || ''}
                                onFocus={() => openKeyboard('aadharNo')}
                                placeholder="XXXX-XXXX-XXXX"
                                style={styles.input}
                            />
                        </div>
                        <button onClick={() => setStep(2)} style={styles.submitBtn} disabled={!values.aadharNo}>
                            Start Aadhaar Authentication
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div style={styles.verification}>
                        <Smartphone size={80} color="var(--primary)" />
                        <h3>OTP Verification</h3>
                        <p>Enter the 6-digit code sent to your Aadhaar-linked mobile (XXXXX-9812)</p>
                        <input
                            readOnly
                            value={values.otp || ''}
                            onFocus={() => openKeyboard('otp')}
                            placeholder="· · · · · ·"
                            style={styles.otpInput}
                        />
                        <button onClick={handleVerify} style={styles.submitBtn} disabled={!values.otp}>
                            Verify & Create Card
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div style={styles.success}>
                        <div style={styles.healthCardPreview}>
                            <div style={styles.cardGovHeader}>
                                <ShieldCheck size={24} color="#059669" />
                                <span>ABHA DIGITAL HEALTH ID</span>
                            </div>
                            <div style={styles.cardBody}>
                                <div style={styles.qrPlaceholder}>QR Code</div>
                                <div style={styles.cardInfo}>
                                    <h4 style={styles.cardName}>Samanth Reddy</h4>
                                    <p style={styles.abhaId}>ABHA ID: 91-0021-4402-9912</p>
                                    <p style={styles.gender}>Male | 28 Years</p>
                                </div>
                            </div>
                        </div>
                        <h3 style={styles.successTitle}>Card Generated!</h3>
                        <div style={styles.receiptActions}>
                            <button onClick={() => setShowReceipt(true)} style={styles.receiptBtn}>Official Receipt</button>
                            <button onClick={() => alert('PDF saved to Desktop')} style={styles.receiptBtn}>Download PDF</button>
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
                    type="health-card-issue"
                    transactionId="ABHA-ISS-202611"
                    customerName="Samanth Reddy"
                    details={{
                        'ABHA Number': '91-0021-4402-9912',
                        'Auth Mode': 'Aadhaar Biometric',
                        'Verification Provider': 'UIDAI',
                        'Issuing Authority': 'National Health Authority',
                        'Validity': 'Life-time'
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
    stepContainer: { display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', alignItems: 'center', textAlign: 'center' },
    hero: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
    description: { fontSize: '1.1rem', color: '#64748b', maxWidth: '500px', lineHeight: '1.6' },
    fieldGroup: { display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', textAlign: 'left' },
    label: { fontSize: '1.2rem', fontWeight: 'bold', color: '#444' },
    input: { padding: '1.2rem', fontSize: '1.5rem', borderRadius: '0.8rem', border: '2px solid #ddd', backgroundColor: '#f9f9f9', textAlign: 'center', width: '100%' },
    otpInput: { padding: '1.2rem', fontSize: '3rem', borderRadius: '0.8rem', border: '2px solid var(--primary)', textAlign: 'center', letterSpacing: '10px', width: '100%', marginBottom: '1rem' },
    submitBtn: { width: '100%', padding: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold', backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer' },
    verification: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', textAlign: 'center', width: '100%' },
    success: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem', width: '100%' },
    healthCardPreview: {
        width: '400px', height: '240px', borderRadius: '1rem',
        border: '3px solid #059669', background: 'white',
        boxShadow: '0 20px 25px -5px rgba(5, 150, 105, 0.15)',
        padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem'
    },
    cardGovHeader: { display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontWeight: 900, fontSize: '0.9rem', borderBottom: '1px solid #efefef', paddingBottom: '0.5rem' },
    cardBody: { display: 'flex', gap: '1rem', alignItems: 'center' },
    qrPlaceholder: { width: '100px', height: '100px', backgroundColor: '#f1f5f9', border: '2px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#64748b' },
    cardInfo: { flex: 1, textAlign: 'left' },
    cardName: { margin: 0, fontSize: '1.2rem', fontWeight: 900 },
    abhaId: { margin: '4px 0', fontSize: '0.9rem', color: '#64748b', fontWeight: 'bold' },
    gender: { margin: 0, fontSize: '0.8rem', color: '#94a3b8' },
    successTitle: { fontSize: '2.5rem', fontWeight: 900, color: 'var(--municipal)', margin: 0 },
    receiptActions: { display: 'flex', gap: '1rem', marginTop: '1rem' },
    receiptBtn: { padding: '1rem 2rem', fontSize: '1.2rem', fontWeight: 'bold', border: '2px solid var(--primary)', borderRadius: '1rem', background: 'none', color: 'var(--primary)', cursor: 'pointer' },
    homeBtn: { marginTop: '1rem', padding: '1rem 3rem', fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer' }
};
