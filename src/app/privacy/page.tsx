'use client';

import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppState } from '@/context/StateContext';

export default function PrivacyPage() {
    const router = useRouter();
    const { language } = useAppState();

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn} aria-label="Go Back">
                    <ArrowLeft size={32} />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Shield size={40} color="var(--primary)" />
                    <h1 style={styles.title}>Privacy Policy</h1>
                </div>
            </div>

            <div style={styles.content}>
                <section style={styles.section}>
                    <h2 style={styles.heading}>1. Data Collection & Usage</h2>
                    <p style={styles.text}>
                        SUVIDHA Kiosk collects minimal personal data (Name, Consumer IDs, Mobile Number) strictly for the purpose of
                        delivering government services. This data is transmitted securely to respective department servers
                        (e.g., Electricity Board, Municipal Corporation) and is <strong>not stored</strong> locally on this Kiosk
                        after your session ends.
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.heading}>2. Security Measures</h2>
                    <p style={styles.text}>
                        We verify all documents using DigiLocker APIs. All transactions are encrypted using industry-standard
                        protocols (TLS 1.3). This Kiosk operates on a secure Government Intranet Network (GIN).
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.heading}>3. User Rights</h2>
                    <p style={styles.text}>
                        As a citizen, you have the right to access your transaction history and request receipts.
                        You may also file grievances regarding data handling through the "Grievance Redressal" module.
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.heading}>4. Cookies & Local Storage</h2>
                    <p style={styles.text}>
                        We use temporary local storage to maintain your current session state (e.g., Language preference).
                        This is automatically cleared when the session times out or when you click "Logout".
                    </p>
                </section>

                <div style={styles.footer}>
                    <p>Last Updated: January 15, 2026</p>
                    <p>Ministry of Electronics & IT, Government of India</p>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        padding: '2rem',
        maxWidth: '1000px',
        margin: '0 auto',
        minHeight: '100vh',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        marginBottom: '3rem',
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: '1rem',
    },
    backBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--primary)',
        padding: '0.5rem',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 900,
        color: 'var(--foreground)',
        margin: 0,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem',
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '2rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    heading: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'var(--primary)',
        margin: 0,
    },
    text: {
        fontSize: '1.1rem',
        lineHeight: '1.7',
        color: '#475569',
        margin: 0,
    },
    footer: {
        marginTop: '2rem',
        paddingTop: '2rem',
        borderTop: '1px solid #e2e8f0',
        color: '#94a3b8',
        fontSize: '0.9rem',
    }
};
