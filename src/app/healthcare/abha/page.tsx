'use client';

import React, { useState } from 'react';
import { Heart, ArrowLeft, ShieldCheck, Fingerprint, Smartphone, CheckCircle, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppState } from '@/context/StateContext';

export default function AbhaRegistrationPage() {
    const router = useRouter();
    const { addToast } = useAppState();
    const [step, setStep] = useState(1); // 1: Consent, 2: Auth, 3: Success

    const handleAuth = () => {
        setStep(2);
        setTimeout(() => {
            addToast({ message: 'Biometric Verified', type: 'success' });
            setStep(3);
        }, 2000);
    };

    if (step === 3) {
        return (
            <div style={styles.container}>
                <div style={styles.successCard}>
                    <CheckCircle size={80} color="#16a34a" />
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>ABHA ID Generated!</h2>
                    <p style={{ color: '#64748b', marginBottom: '2rem' }}>Your digital health identity is now linked to your Aadhaar.</p>

                    <div style={styles.idCard}>
                        <div style={styles.cardHeader}>
                            <Heart size={24} color="white" />
                            <span style={{ color: 'white', fontWeight: 'bold' }}>Ayushman Bharat Digital Mission</span>
                        </div>
                        <div style={styles.cardBody}>
                            <div style={styles.photoBox}>
                                <Fingerprint size={48} color="#e2e8f0" />
                            </div>
                            <div style={styles.details}>
                                <h3 style={styles.userName}>Citizen Name</h3>
                                <p style={styles.abhaId}>14-Digit Number: 91-2245-6678-0092</p>
                                <p style={styles.gender}>Gender: M | DOB: 01-01-1990</p>
                            </div>
                        </div>
                        <div style={styles.cardFooter}>
                            <ShieldCheck size={16} /> Verified by UIDAI
                        </div>
                    </div>

                    <button onClick={() => router.push('/healthcare')} style={styles.homeBtn}>
                        Return to Healthcare
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h1 style={styles.title}>ABHA Health ID</h1>
            </div>

            <div style={styles.flowCard}>
                <div style={styles.flowHeader}>
                    <div style={styles.iconCircle}>
                        <ShieldCheck size={32} color="#ec4899" />
                    </div>
                    <h3>Create Your Digital Health ID</h3>
                </div>

                <div style={styles.infoBox}>
                    <p>Building India's Digital Health Ecosystem. Benefits include:</p>
                    <ul style={styles.list}>
                        <li>Unified Health Identity</li>
                        <li>Digital Lab Reports & Prescriptions</li>
                        <li>Seamless access to Govt Health Schemes</li>
                    </ul>
                </div>

                <div style={styles.authSection}>
                    <div style={styles.authOption}>
                        <Fingerprint size={40} color="#64748b" />
                        <div>
                            <h4>Aadhaar Biometric</h4>
                            <p>Fastest and most secure way</p>
                        </div>
                        <button onClick={handleAuth} style={styles.authBtn}>Start Scan</button>
                    </div>

                    <div style={styles.divider}><span>OR</span></div>

                    <div style={styles.authOption}>
                        <Smartphone size={40} color="#64748b" />
                        <div>
                            <h4>Aadhaar OTP</h4>
                            <p>Sent to registered mobile</p>
                        </div>
                        <button style={styles.authBtnSecondary}>Get OTP</button>
                    </div>
                </div>

                <div style={styles.consentText}>
                    By proceeding, you agree to the National Health Authority's terms and consent to using your Aadhaar data for ABHA generation.
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '700px', margin: '0 auto', textAlign: 'center' },
    header: { display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem', textAlign: 'left' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#ec4899' },
    title: { fontSize: '2.5rem', fontWeight: 900, margin: 0, color: '#1e293b' },
    flowCard: { background: 'white', padding: '3rem', borderRadius: '32px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', textAlign: 'left' },
    flowHeader: { display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' },
    iconCircle: { width: '64px', height: '64px', borderRadius: '50%', background: '#fdf2f8', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    infoBox: { background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem' },
    list: { margin: '0.5rem 0 0 1.5rem', color: '#475569', fontSize: '0.95rem' },
    authSection: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    authOption: { display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', borderRadius: '16px', border: '2px solid #e2e8f0' },
    authBtn: { marginLeft: 'auto', background: '#ec4899', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' },
    authBtnSecondary: { marginLeft: 'auto', background: 'none', border: '2px solid #ec4899', color: '#ec4899', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' },
    divider: { display: 'flex', alignItems: 'center', gap: '1rem', color: '#cbd5e1', fontSize: '0.8rem', fontWeight: 'bold' },
    consentText: { marginTop: '2rem', fontSize: '0.8rem', color: '#94a3b8', textAlign: 'center' },

    successCard: { textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '2rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' },
    idCard: { maxWidth: '400px', margin: '2rem auto', background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', borderRadius: '16px', overflow: 'hidden', textAlign: 'left', boxShadow: '0 10px 15px -3px rgba(190, 24, 93, 0.4)' },
    cardHeader: { padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.2)' },
    cardBody: { padding: '1.5rem', display: 'flex', gap: '1rem' },
    photoBox: { width: '80px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    details: { color: 'white' },
    userName: { margin: 0, fontSize: '1.25rem' },
    abhaId: { margin: '0.25rem 0', fontSize: '0.9rem', opacity: 0.9 },
    gender: { margin: 0, fontSize: '0.8rem', opacity: 0.8 },
    cardFooter: { padding: '0.75rem 1rem', background: 'rgba(0,0,0,0.1)', color: 'white', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.3rem' },
    homeBtn: { padding: '1rem 2rem', background: '#1e293b', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }
};
