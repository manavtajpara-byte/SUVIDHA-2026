'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { ArrowLeft, AlertTriangle, MapPin, Send, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OutagePage() {
    const { language } = useAppState();
    const t = (translations[language] || translations.en) as any;
    const router = useRouter();
    const [reported, setReported] = useState(false);

    const handleReport = () => {
        setReported(true);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h2 style={styles.title}>{t.reportOutage}</h2>
            </div>

            {!reported ? (
                <div style={styles.content}>
                    <div style={styles.alertCard}>
                        <AlertTriangle size={80} color="#fbbf24" />
                        <div style={styles.alertText}>
                            <h3 style={styles.alertTitle}>Is your area currently without power?</h3>
                            <p style={styles.alertSub}>We can help you report it instantly to the technical team.</p>
                        </div>
                    </div>

                    <div style={styles.locCard}>
                        <MapPin size={32} color="var(--primary)" />
                        <div style={styles.locText}>
                            <p style={styles.locLabel}>CURRENT KIOSK LOCATION</p>
                            <strong style={styles.locValue}>Sector 15, Community Center, New Delhi</strong>
                        </div>
                    </div>

                    <button onClick={handleReport} style={styles.reportBtn}>
                        <Send size={24} />
                        One-Tap Report Outage
                    </button>
                </div>
            ) : (
                <div style={styles.success}>
                    <CheckCircle size={100} color="var(--municipal)" />
                    <h2 style={styles.successTitle}>Report Received!</h2>
                    <p style={styles.successSub}>A technical team has been notified for Sector 15. Your Ticket ID is #OUT-9912.</p>
                    <button onClick={() => router.push('/')} style={styles.homeBtn}>Back to Home</button>
                </div>
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
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    alertCard: {
        backgroundColor: '#fffbeb',
        border: '2px solid #fbbf24',
        padding: '2rem',
        borderRadius: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
    },
    alertText: {
        flex: 1,
    },
    alertTitle: {
        fontSize: '1.8rem',
        fontWeight: 900,
        margin: 0,
        color: '#92400e',
    },
    alertSub: {
        fontSize: '1.2rem',
        margin: '0.5rem 0 0 0',
        color: '#b45309',
    },
    locCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        backgroundColor: 'white',
        padding: '1.5rem 2rem',
        borderRadius: '1.5rem',
        boxShadow: 'var(--card-shadow)',
    },
    locText: {},
    locLabel: {
        fontSize: '0.9rem',
        fontWeight: 'bold',
        opacity: 0.6,
        margin: 0,
    },
    locValue: {
        fontSize: '1.3rem',
    },
    reportBtn: {
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        padding: '1.5rem',
        fontSize: '1.8rem',
        fontWeight: 'bold',
        borderRadius: '1.5rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        boxShadow: '0 10px 0 #b91c1c',
        marginTop: '1rem',
    },
    success: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '4rem 2rem',
        borderRadius: '2rem',
        boxShadow: 'var(--card-shadow)',
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
        maxWidth: '500px',
    },
    homeBtn: {
        marginTop: '2rem',
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
