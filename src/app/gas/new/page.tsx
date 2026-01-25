'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { ArrowLeft, CheckCircle2, Flame, MapPin, Smartphone, FileText, Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { KioskCamera } from '@/components/DocHandling';

export default function GasNewConnectionPage() {
    const { language } = useAppState();
    const t = (translations[language] || translations.en) as any;
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [step, setStep] = useState(1); // 1: Details, 2: Documents, 3: Success

    const handleNext = () => setStep(step + 1);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => step === 1 ? router.back() : setStep(step - 1)} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h2 style={styles.title}>New Gas Connection</h2>
            </div>

            <div style={styles.card}>
                {step === 1 && (
                    <div style={styles.stepContainer}>
                        <div style={styles.stepHeader}>
                            <Flame size={60} color="var(--gas)" />
                            <h3>Basic Information</h3>
                        </div>
                        <div style={styles.form}>
                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Applicant Full Name</label>
                                <input value={fullName} onChange={(e) => setFullName(e.target.value)} style={styles.input} placeholder="Enter name" />
                            </div>
                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Mobile Number</label>
                                <input value={mobile} onChange={(e) => setMobile(e.target.value)} style={styles.input} placeholder="10-digit mobile" />
                            </div>
                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Installation Address</label>
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    style={{ ...styles.input, height: '100px', textAlign: 'left' }}
                                    placeholder="Full address for installation"
                                />
                            </div>
                            <button onClick={handleNext} style={styles.submitBtn} disabled={!fullName || !mobile || !address}>
                                Next: Upload Documents
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div style={styles.stepContainer}>
                        <div style={styles.stepHeader}>
                            <FileText size={60} color="var(--gas)" />
                            <h3>Document Capture</h3>
                            <p>Please place your Aadhar Card or Identity Proof under the kiosk scanner</p>
                        </div>
                        <KioskCamera onCapture={() => { }} />
                        <div style={styles.docStatus}>
                            <CheckCircle2 size={24} color="#059669" />
                            <span>Identity Proof Captured Successfully</span>
                        </div>
                        <button onClick={handleNext} style={styles.submitBtn}>Submit Application</button>
                    </div>
                )}

                {step === 3 && (
                    <div style={styles.success}>
                        <CheckCircle2 size={120} color="var(--municipal)" />
                        <h3 style={styles.successTitle}>Application Submitted!</h3>
                        <p>Application ID: GAS-NEW-8921</p>
                        <p style={{ maxWidth: '500px' }}>
                            Our technician will contact you within 48 hours for address verification and installation.
                        </p>
                        <button onClick={() => router.push('/')} style={styles.homeBtn}>Back to Home</button>
                    </div>
                )}
            </div>
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
    form: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    fieldGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    label: { fontSize: '1.2rem', fontWeight: 'bold' },
    input: { padding: '1.2rem', fontSize: '1.5rem', borderRadius: '0.8rem', border: '2px solid #ddd', backgroundColor: '#f9f9f9', width: '100%' },
    submitBtn: { padding: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold', backgroundColor: 'var(--gas)', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer', marginTop: '1rem' },
    docStatus: { display: 'flex', alignItems: 'center', gap: '1rem', color: '#059669', fontWeight: 'bold', justifyContent: 'center', padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '1rem' },
    success: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' },
    successTitle: { fontSize: '2.5rem', fontWeight: 900, color: 'var(--municipal)', margin: 0 },
    homeBtn: { marginTop: '2.5rem', padding: '1rem 3rem', fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer' }
};
