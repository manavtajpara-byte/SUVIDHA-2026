'use client';

import React, { useState, useEffect } from 'react';
import { Scan, Fingerprint, Eye, CheckCircle, XCircle } from 'lucide-react';

interface BiometricScannerProps {
    onSuccess: () => void;
    onClose: () => void;
    mode: 'fingerprint' | 'iris';
}

export default function BiometricScanner({ onSuccess, onClose, mode }: BiometricScannerProps) {
    const [status, setStatus] = useState<'scanning' | 'verifying' | 'success' | 'failed'>('scanning');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (status === 'scanning') {
            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        setStatus('verifying');
                        return 100;
                    }
                    return prev + 2;
                });
            }, 50);
        } else if (status === 'verifying') {
            setTimeout(() => {
                setStatus('success');
                setTimeout(onSuccess, 1000);
            }, 1500);
        }
        return () => clearInterval(interval);
    }, [status, onSuccess]);

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2 style={styles.title}>
                    {mode === 'fingerprint' ? 'Place Thumb on Scanner' : 'Look into Camera'}
                </h2>
                <div style={styles.scanArea}>
                    {mode === 'fingerprint' ? (
                        <Fingerprint size={120} color={status === 'success' ? '#10b981' : '#8b5cf6'} className={status === 'scanning' ? 'pulse' : ''} />
                    ) : (
                        <Eye size={120} color={status === 'success' ? '#10b981' : '#8b5cf6'} className={status === 'scanning' ? 'pulse' : ''} />
                    )}

                    {status === 'scanning' && <div style={{ ...styles.scannerLine, top: `${progress}%` }}></div>}
                </div>

                <div style={styles.status}>
                    {status === 'scanning' && <p>Scanning Pattern... {progress}%</p>}
                    {status === 'verifying' && <p>Verifying with UIDAI Server...</p>}
                    {status === 'success' && <p style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle /> Verified</p>}
                </div>

                <button onClick={onClose} style={styles.cancelBtn}>Cancel</button>
            </div>
            <style jsx>{`
                .pulse { animation: pulse 1.5s infinite; }
                @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
            `}</style>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.9)',
        zIndex: 20000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        backgroundColor: '#1e1b4b',
        padding: '3rem',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        minWidth: '400px',
        border: '1px solid #4ade80',
        boxShadow: '0 0 50px rgba(74, 222, 128, 0.2)',
    },
    title: {
        color: 'white',
        fontSize: '1.5rem',
    },
    scanArea: {
        position: 'relative',
        width: '200px',
        height: '200px',
        border: '2px dashed rgba(255,255,255,0.2)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    scannerLine: {
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '4px',
        backgroundColor: '#4ade80',
        boxShadow: '0 0 10px #4ade80',
        transition: 'top 0.1s linear',
    },
    status: {
        color: '#94a3b8',
        fontSize: '1.1rem',
        height: '30px',
    },
    cancelBtn: {
        background: 'transparent',
        border: '1px solid #64748b',
        color: '#64748b',
        padding: '0.5rem 2rem',
        borderRadius: '8px',
        cursor: 'pointer',
    }
};
