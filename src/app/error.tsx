'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log exception to analytics service if needed
        console.error(error);
    }, [error]);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.iconWrapper}>
                    <AlertCircle size={40} color="#dc2626" />
                </div>
                <h2 style={styles.title}>Something went wrong!</h2>
                <p style={{ color: '#6b7280' }}>We encountered an unexpected error.</p>
                <p style={{ color: '#dc2626', fontSize: '0.9rem', background: '#fee2e2', padding: '0.5rem', borderRadius: '8px', maxWidth: '100%' }}>
                    {error.message || "Unknown Error"}
                </p>

                <button
                    onClick={() => reset()}
                    style={styles.button}
                >
                    <RefreshCw size={18} />
                    Try Again
                </button>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
    },
    card: {
        background: 'white',
        padding: '2rem',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%',
    },
    iconWrapper: {
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        background: '#fee2e2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        margin: 0,
        fontSize: '1.5rem',
        fontWeight: 700,
        color: '#1f2937',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'var(--primary)',
        color: 'white',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '12px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: 600,
        transition: 'background 0.2s',
    }
};
