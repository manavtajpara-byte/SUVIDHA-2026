'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { QrCode, Smartphone, X, CheckCircle2, Share2 } from 'lucide-react';

export default function QRConnect() {
    const { language } = useAppState();
    const t = translations[language] || translations.en;
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1); // 1: Initial, 2: Connected

    const toggle = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setStep(1);
            // Simulate connection after 3 seconds
            setTimeout(() => setStep(2), 5000);
        }
    };

    return (
        <>
            <button onClick={toggle} style={styles.fab}>
                <QrCode size={24} />
                <span>{t.qrConnect || "QR Connect"}</span>
            </button>

            {isOpen && (
                <div style={styles.overlay}>
                    <div style={styles.modal} className="animate-float">
                        <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>
                            <X size={24} />
                        </button>

                        <div style={styles.content}>
                            {step === 1 ? (
                                <>
                                    <div style={styles.header}>
                                        <div style={styles.iconCircle}>
                                            <Smartphone size={32} style={{ color: 'var(--primary)' }} />
                                        </div>
                                        <h2 style={styles.title}>Mobile Handoff</h2>
                                        <p style={styles.subtitle}>Scan to continue your session on mobile</p>
                                    </div>

                                    <div style={styles.qrBox}>
                                        {/* Mock QR Code */}
                                        <div style={styles.qrPlaceholder}>
                                            <div style={styles.qrPattern}></div>
                                            <QrCode size={120} style={{ opacity: 0.1, position: 'absolute' }} />
                                            <div style={styles.qrCorner}></div>
                                        </div>
                                        <p style={styles.timer}>Expiring in 01:59</p>
                                    </div>

                                    <ul style={styles.features}>
                                        <li style={styles.featureItem}><CheckCircle2 size={16} color="#10b981" /> Save digital receipt</li>
                                        <li style={styles.featureItem}><CheckCircle2 size={16} color="#10b981" /> Track application live</li>
                                        <li style={styles.featureItem}><CheckCircle2 size={16} color="#10b981" /> Secure 2FA Payment</li>
                                    </ul>
                                </>
                            ) : (
                                <div style={styles.success}>
                                    <div style={styles.successIcon}>
                                        <CheckCircle2 size={64} color="#10b981" />
                                    </div>
                                    <h2 style={styles.title}>Connected!</h2>
                                    <p style={styles.subtitle}>Your session is now active on +91 ******4520</p>
                                    <div style={styles.details}>
                                        <p>Check your phone for the notification to continue.</p>
                                    </div>
                                    <button onClick={() => setIsOpen(false)} style={styles.doneBtn}>
                                        Back to Kiosk
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

const styles: Record<string, React.CSSProperties> = {
    fab: {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        background: 'var(--foreground)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '50px',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '1rem',
        fontWeight: 700,
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        cursor: 'pointer',
        zIndex: 999,
        transition: 'all 0.3s ease',
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
    },
    modal: {
        background: 'white',
        width: '90%',
        maxWidth: '450px',
        borderRadius: '2.5rem',
        padding: '2.5rem',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },
    closeBtn: {
        position: 'absolute',
        top: '1.5rem',
        right: '1.5rem',
        background: '#f1f5f9',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: '#64748b',
    },
    content: {
        textAlign: 'center',
    },
    header: {
        marginBottom: '2rem',
    },
    iconCircle: {
        width: '72px',
        height: '72px',
        background: 'rgba(139, 92, 246, 0.1)',
        borderRadius: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem auto',
    },
    title: {
        fontSize: '1.8rem',
        fontWeight: 900,
        margin: '0 0 0.5rem 0',
        color: '#1e293b',
    },
    subtitle: {
        fontSize: '1rem',
        color: '#64748b',
        margin: 0,
    },
    qrBox: {
        background: '#f8fafc',
        borderRadius: '24px',
        padding: '2rem',
        marginBottom: '2rem',
        border: '2px dashed #e2e8f0',
    },
    qrPlaceholder: {
        width: '180px',
        height: '180px',
        background: 'white',
        margin: '0 auto 1rem auto',
        borderRadius: '16px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    },
    qrPattern: {
        width: '100%',
        height: '100%',
        background: 'repeating-linear-gradient(45deg, #eee 0px, #eee 5px, #fff 5px, #fff 10px)',
        opacity: 0.5,
    },
    qrCorner: {
        position: 'absolute',
        top: '10px',
        left: '10px',
        width: '30px',
        height: '30px',
        border: '4px solid #1e293b',
        borderRadius: '4px',
    },
    timer: {
        fontSize: '0.85rem',
        fontWeight: 700,
        color: 'var(--primary)',
        margin: 0,
    },
    features: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        textAlign: 'left',
    },
    featureItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '0.95rem',
        fontWeight: 600,
        color: '#475569',
    },
    success: {
        padding: '1rem 0',
    },
    successIcon: {
        marginBottom: '2rem',
    },
    details: {
        background: '#f0fdf4',
        padding: '1rem',
        borderRadius: '12px',
        color: '#166534',
        fontSize: '0.9rem',
        fontWeight: 600,
        marginTop: '1.5rem',
    },
    doneBtn: {
        marginTop: '2rem',
        width: '100%',
        padding: '1rem',
        borderRadius: '12px',
        background: 'var(--primary)',
        color: 'white',
        border: 'none',
        fontSize: '1rem',
        fontWeight: 700,
        cursor: 'pointer',
    }
};
