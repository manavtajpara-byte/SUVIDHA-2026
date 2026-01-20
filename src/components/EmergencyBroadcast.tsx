'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function EmergencyBroadcast() {
    const [alert, setAlert] = useState<null | { title: string, message: string, severity: 'high' | 'medium' }>(null);

    useEffect(() => {
        // Simulate checking for emergency broadcasts
        const checkForAlerts = () => {
            // Randomly trigger a mock alert for demo purposes (very low chance)
            // Or use a hidden trigger
            if (window.location.hash === '#emergency_test') {
                setAlert({
                    title: 'CYCLONE WARNING - RED ALERT',
                    message: 'Severe Cyclone approaching coastal areas. Please proceed to nearest relief camp immediately.',
                    severity: 'high'
                });
            }
        };

        const interval = setInterval(checkForAlerts, 5000);
        return () => clearInterval(interval);
    }, []);

    if (!alert) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.banner}>
                <div style={styles.header}>
                    <AlertTriangle size={40} color="white" className="flash" />
                    <h1>EMERGENCY BROADCAST / आपातकालीन सूचना</h1>
                    <AlertTriangle size={40} color="white" className="flash" />
                </div>
                <div style={styles.content}>
                    <h2>{alert.title}</h2>
                    <p>{alert.message}</p>
                </div>
                <button onClick={() => setAlert(null)} style={styles.closeBtn}>
                    DISMISS (TEST ONLY)
                </button>
            </div>
            <style jsx>{`
                .flash { animation: flash 1s infinite; }
                @keyframes flash { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
             `}</style>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(220, 38, 38, 0.95)', // Red background
        zIndex: 99999, // Topmost
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    banner: {
        backgroundColor: '#7f1d1d',
        color: 'white',
        padding: '4rem',
        borderRadius: '20px',
        maxWidth: '800px',
        textAlign: 'center',
        border: '4px solid white',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        marginBottom: '2rem',
        borderBottom: '1px solid rgba(255,255,255,0.3)',
        paddingBottom: '2rem',
        fontSize: '1.5rem',
        fontWeight: 900,
    },
    content: {
        marginBottom: '3rem',
    },
    closeBtn: {
        backgroundColor: 'transparent',
        border: '2px solid white',
        color: 'white',
        padding: '1rem 3rem',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        cursor: 'pointer',
    }
};
