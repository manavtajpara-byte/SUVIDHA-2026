'use client';

import React, { useState, useEffect } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { useVirtualKeyboard } from '@/hooks/useVirtualKeyboard';
import VirtualKeyboard from '@/components/VirtualKeyboard';
import { ArrowLeft, Smartphone, CheckCircle, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const { language, setIsLoggedIn, setUser } = useAppState();
    const t = translations[language];
    const router = useRouter();
    const { isOpen, openKeyboard, closeKeyboard, handleInput, handleDelete, values } = useVirtualKeyboard();
    const [step, setStep] = useState(1); // 1: Mobile, 2: OTP, 3: Success
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        if (step === 2 && timer > 0) {
            const interval = setInterval(() => setTimer(t => t - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [step, timer]);

    const handleSendOTP = (e: React.FormEvent) => {
        e.preventDefault();
        if (values.mobile && values.mobile.length === 10) {
            setStep(2);
            setTimer(30);
        }
    };

    const handleVerifyOTP = (e: React.FormEvent) => {
        e.preventDefault();
        if (values.otp && values.otp.length === 6) {
            setUser({ name: 'Guest User', mobile: values.mobile || '' });
            setIsLoggedIn(true);
            setStep(3);
            setTimeout(() => router.push('/'), 2000);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h2 style={styles.title}>{t.login}</h2>
            </div>

            <div style={styles.card}>
                {step === 1 && (
                    <form onSubmit={handleSendOTP} style={styles.form}>
                        <div style={styles.iconHeader}>
                            <Smartphone size={70} color="var(--primary)" />
                            <h3 style={styles.formTitle}>Login with Mobile OTP</h3>
                            <p style={styles.formSub}>No password required. We'll send you a one-time code.</p>
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>Mobile Number</label>
                            <input
                                readOnly
                                value={values.mobile || ''}
                                onFocus={() => openKeyboard('mobile')}
                                placeholder="10-digit number"
                                style={styles.input}
                                maxLength={10}
                            />
                        </div>

                        <button
                            type="submit"
                            style={styles.submitBtn}
                            disabled={!values.mobile || values.mobile.length !== 10}
                        >
                            Send OTP
                        </button>

                        <div style={styles.guestNote}>
                            <Shield size={20} />
                            <span>Secure authentication for accessing personalized services</span>
                        </div>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOTP} style={styles.form}>
                        <div style={styles.iconHeader}>
                            <div style={styles.otpIcon}>
                                <Smartphone size={50} color="white" />
                            </div>
                            <h3 style={styles.formTitle}>Enter OTP</h3>
                            <p style={styles.formSub}>
                                We've sent a 6-digit code to<br />
                                <strong>{values.mobile}</strong>
                            </p>
                        </div>

                        <div style={styles.field}>
                            <input
                                readOnly
                                value={values.otp || ''}
                                onFocus={() => openKeyboard('otp')}
                                placeholder="000000"
                                style={{ ...styles.input, letterSpacing: '1rem', textAlign: 'center', fontSize: '2.5rem' }}
                                maxLength={6}
                            />
                        </div>

                        <div style={styles.timerBox}>
                            {timer > 0 ? (
                                <span>Resend OTP in {timer}s</span>
                            ) : (
                                <button type="button" onClick={() => setTimer(30)} style={styles.resendBtn}>
                                    Resend OTP
                                </button>
                            )}
                        </div>

                        <button
                            type="submit"
                            style={styles.submitBtn}
                            disabled={!values.otp || values.otp.length !== 6}
                        >
                            Verify & Login
                        </button>

                        <button type="button" onClick={() => setStep(1)} style={styles.changeNumberBtn}>
                            Change Number
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <div style={styles.success}>
                        <CheckCircle size={100} color="var(--municipal)" />
                        <h2 style={styles.successTitle}>Login Successful!</h2>
                        <p style={styles.successSub}>Welcome back! Redirecting to home...</p>
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
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        padding: '2rem',
        maxWidth: '600px',
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
        minHeight: '500px',
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
    iconHeader: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
    },
    formTitle: {
        fontSize: '2rem',
        fontWeight: 'bold',
        margin: 0,
    },
    formSub: {
        fontSize: '1.1rem',
        opacity: 0.7,
        margin: 0,
    },
    otpIcon: {
        backgroundColor: 'var(--primary)',
        borderRadius: '50%',
        width: '100px',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    label: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
        color: '#475569',
    },
    input: {
        padding: '1.5rem',
        fontSize: '2rem',
        borderRadius: '1rem',
        border: '3px solid #e2e8f0',
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
    },
    guestNote: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        justifyContent: 'center',
        fontSize: '0.95rem',
        opacity: 0.7,
        padding: '1rem',
        backgroundColor: '#f1f5f9',
        borderRadius: '0.75rem',
    },
    timerBox: {
        textAlign: 'center',
        fontSize: '1.1rem',
        color: '#64748b',
        fontWeight: 'bold',
    },
    resendBtn: {
        background: 'none',
        border: 'none',
        color: 'var(--primary)',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        cursor: 'pointer',
        textDecoration: 'underline',
    },
    changeNumberBtn: {
        background: 'none',
        border: '2px solid #e2e8f0',
        padding: '1rem',
        borderRadius: '1rem',
        cursor: 'pointer',
        fontWeight: 'bold',
        color: '#64748b',
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
    successSub: {
        fontSize: '1.3rem',
    }
};
