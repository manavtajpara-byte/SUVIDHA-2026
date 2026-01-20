'use client';

import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TermsPage() {
    const router = useRouter();

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn} aria-label="Go Back">
                    <ArrowLeft size={32} />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <FileText size={40} color="var(--primary)" />
                    <h1 style={styles.title}>Terms & Conditions</h1>
                </div>
            </div>

            <div style={styles.content}>
                <section style={styles.section}>
                    <h2 style={styles.heading}>1. Acceptance of Terms</h2>
                    <p style={styles.text}>
                        By using the SUVIDHA Kiosk service, you agree to comply with these terms. This service is provided
                        by the Government of India for the benefit of citizens.
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.heading}>2. User Responsibilities</h2>
                    <p style={styles.text}>
                        You are responsible for providing accurate and authentic information/documents.
                        Submission of forged documents is a punishable offense under the Information Technology Act.
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.heading}>3. Service Availability</h2>
                    <p style={styles.text}>
                        While we strive for 24/7 uptime, services may be temporarily unavailable due to server maintenance
                        or network issues. The Kiosk operator will be notified in such events.
                    </p>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.heading}>4. Payment & Refunds</h2>
                    <p style={styles.text}>
                        All payments made through this Kiosk are final. In case of transaction failure where money is deducted,
                        a refund is automatically initiated within 7 working days to the source account.
                    </p>
                </section>

                <div style={styles.footer}>
                    <p>Jurisdiction: Courts of New Delhi</p>
                    <p>SUVIDHA - Digital India Initiative</p>
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
