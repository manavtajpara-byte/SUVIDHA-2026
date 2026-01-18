'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { useVirtualKeyboard } from '@/hooks/useVirtualKeyboard';
import VirtualKeyboard from '@/components/VirtualKeyboard';
import { KioskCamera, QRHandshake } from '@/components/DocHandling';
import { ArrowLeft, ArrowRight, User, MapPin, Camera, CheckCircle, Smartphone } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NewConnectionPage() {
    const { language } = useAppState();
    const t = translations[language];
    const router = useRouter();
    const { isOpen, openKeyboard, closeKeyboard, handleInput, handleDelete, values } = useVirtualKeyboard();
    const [step, setStep] = useState(1);
    const [docMethod, setDocMethod] = useState<'camera' | 'qr' | null>(null);

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h2 style={styles.title}>{t.newConnection}</h2>
            </div>

            <div style={styles.stepper}>
                {[1, 2, 3, 4].map(s => (
                    <div key={s} style={{ ...styles.stepDot, backgroundColor: step >= s ? 'var(--primary)' : '#e2e8f0' }} />
                ))}
            </div>

            <div style={styles.card}>
                {step === 1 && (
                    <div style={styles.stepContent}>
                        <div style={styles.stepHeader}>
                            <User size={40} color="var(--primary)" />
                            <h3>Enter Personal Details</h3>
                        </div>
                        <div style={styles.form}>
                            <div style={styles.field}>
                                <label>Full Name</label>
                                <input
                                    readOnly
                                    value={values.name || ''}
                                    onFocus={() => openKeyboard('name')}
                                    placeholder="Enter your name"
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.field}>
                                <label>Mobile Number</label>
                                <input
                                    readOnly
                                    value={values.mobile || ''}
                                    onFocus={() => openKeyboard('mobile')}
                                    placeholder="10-digit mobile number"
                                    style={styles.input}
                                />
                            </div>
                            <button
                                onClick={nextStep}
                                style={styles.nextBtn}
                                disabled={!values.name || !values.mobile}
                            >Continue <ArrowRight size={24} /></button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div style={styles.stepContent}>
                        <div style={styles.stepHeader}>
                            <MapPin size={40} color="var(--primary)" />
                            <h3>Service Address</h3>
                        </div>
                        <div style={styles.form}>
                            <div style={styles.field}>
                                <label>House/Plot No.</label>
                                <input
                                    readOnly
                                    value={values.house || ''}
                                    onFocus={() => openKeyboard('house')}
                                    placeholder="Ex: 42-A"
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.field}>
                                <label>Street / Area</label>
                                <input
                                    readOnly
                                    value={values.area || ''}
                                    onFocus={() => openKeyboard('area')}
                                    placeholder="Ex: Green Park"
                                    style={styles.input}
                                />
                            </div>
                            <div style={styles.btnGroup}>
                                <button onClick={prevStep} style={styles.prevBtn}>Back</button>
                                <button onClick={nextStep} style={styles.nextBtn}>Continue</button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div style={styles.stepContent}>
                        <div style={styles.stepHeader}>
                            <Camera size={40} color="var(--primary)" />
                            <h3>Document Upload (ID Proof)</h3>
                        </div>

                        {!docMethod ? (
                            <div style={styles.methodChoice}>
                                <button onClick={() => setDocMethod('camera')} style={styles.methodBtn}>
                                    <Camera size={40} />
                                    <span>Use Kiosk Camera</span>
                                </button>
                                <button onClick={() => setDocMethod('qr')} style={styles.methodBtn}>
                                    <Smartphone size={40} />
                                    <span>Scan to Upload from Phone</span>
                                </button>
                            </div>
                        ) : (
                            <div style={styles.methodWrapper}>
                                {docMethod === 'camera' ? (
                                    <KioskCamera onCapture={nextStep} />
                                ) : (
                                    <QRHandshake onComplete={nextStep} />
                                )}
                                <button onClick={() => setDocMethod(null)} style={styles.changeMethodBtn}>Change Method</button>
                            </div>
                        )}
                        <button onClick={prevStep} style={styles.prevBtn}>Back</button>
                    </div>
                )}

                {step === 4 && (
                    <div style={styles.success}>
                        <CheckCircle size={100} color="var(--municipal)" />
                        <h2 style={styles.successTitle}>Application Submitted!</h2>
                        <p style={styles.successSub}>
                            Your application for a new connection has been received.
                            Our technician will contact you within 2-3 working days for a site inspection.
                        </p>
                        <div style={styles.ticketCard}>
                            <span>Your Application ID:</span>
                            <strong>REQ-ELE-2026-4401</strong>
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
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        padding: '2rem',
        maxWidth: '900px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
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
    stepper: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        marginBottom: '1rem',
    },
    stepDot: {
        width: '60px',
        height: '8px',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
    },
    card: {
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '2rem',
        boxShadow: 'var(--card-shadow)',
        minHeight: '500px',
    },
    stepContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        height: '100%',
    },
    stepHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        fontSize: '1.5rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    input: {
        padding: '1.25rem',
        fontSize: '1.5rem',
        borderRadius: '1rem',
        border: '2px solid #e2e8f0',
        backgroundColor: '#f8fafc',
    },
    nextBtn: {
        padding: '1.25rem',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        backgroundColor: 'var(--primary)',
        color: 'white',
        border: 'none',
        borderRadius: '1.25rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
    },
    btnGroup: {
        display: 'flex',
        gap: '1rem',
    },
    prevBtn: {
        padding: '1.25rem',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        backgroundColor: 'white',
        color: 'var(--primary)',
        border: '2px solid var(--primary)',
        borderRadius: '1.25rem',
        cursor: 'pointer',
        flex: 1,
    },
    methodChoice: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        padding: '1rem 0',
    },
    methodBtn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '3rem 1.5rem',
        borderRadius: '2rem',
        border: '2px solid #e2e8f0',
        backgroundColor: '#f8fafc',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    methodWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    changeMethodBtn: {
        background: 'none',
        border: 'none',
        color: 'var(--primary)',
        fontWeight: 'bold',
        cursor: 'pointer',
        textDecoration: 'underline',
    },
    success: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1.5rem',
        padding: '2rem 0',
    },
    successTitle: {
        fontSize: '2.5rem',
        color: 'var(--municipal)',
    },
    successSub: {
        fontSize: '1.2rem',
        maxWidth: '600px',
    },
    ticketCard: {
        backgroundColor: '#f1f5f9',
        padding: '1.5rem 3rem',
        borderRadius: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        fontSize: '1.3rem',
    },
    homeBtn: {
        marginTop: '2rem',
        padding: '1.25rem 4rem',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        backgroundColor: 'var(--foreground)',
        color: 'white',
        borderRadius: '1.25rem',
        border: 'none',
        cursor: 'pointer',
    }
};
