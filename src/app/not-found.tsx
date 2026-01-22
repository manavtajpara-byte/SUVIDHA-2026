'use client';

import React from 'react';
import Link from 'next/link';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <AlertTriangle size={80} color="#dc2626" />
                <h1 style={styles.errorCode}>404</h1>
                <h2 style={styles.title}>Page Not Found / पृष्ठ नहीं मिला</h2>
                <p style={styles.description}>
                    The page you are looking for does not exist or has been moved.
                    <br />
                    जिस पृष्ठ को आप खोज रहे हैं वह मौजूद नहीं है।
                </p>

                <Link href="/" style={styles.button}>
                    <Home size={20} />
                    <span>Return Home / मुख्य पृष्ठ</span>
                </Link>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        textAlign: 'center',
    },
    card: {
        background: 'white',
        padding: '3rem',
        borderRadius: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
    },
    errorCode: {
        fontSize: '5rem',
        fontWeight: 900,
        color: '#e5e7eb',
        margin: 0,
        lineHeight: 1,
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: 700,
        color: '#1f2937',
        margin: 0,
    },
    description: {
        color: '#6b7280',
        lineHeight: 1.6,
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'var(--primary)',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: 600,
        marginTop: '1rem',
        transition: 'transform 0.2s',
    }
};
