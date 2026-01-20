'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface SessionTimeoutProps {
    timeoutMinutes?: number;
    warningMinutes?: number;
    onTimeout?: () => void;
}

export default function SessionTimeout({
    timeoutMinutes = 5,
    warningMinutes = 1,
    onTimeout
}: SessionTimeoutProps) {
    const [timeLeft, setTimeLeft] = useState(timeoutMinutes * 60);
    const [showWarning, setShowWarning] = useState(false);
    const [lastActivity, setLastActivity] = useState(Date.now());

    const resetTimer = useCallback(() => {
        setTimeLeft(timeoutMinutes * 60);
        setShowWarning(false);
        setLastActivity(Date.now());

        // Auto-save form data to localStorage
        const forms = document.querySelectorAll('input, textarea, select');
        const formData: Record<string, string> = {};
        forms.forEach((element) => {
            const input = element as HTMLInputElement;
            if (input.name) {
                formData[input.name] = input.value;
            }
        });
        localStorage.setItem('suvidha_session_backup', JSON.stringify({
            data: formData,
            timestamp: Date.now()
        }));
    }, [timeoutMinutes]);

    const handleActivity = useCallback(() => {
        if (Date.now() - lastActivity > 1000) { // Throttle to once per second
            resetTimer();
        }
    }, [lastActivity, resetTimer]);

    useEffect(() => {
        // Activity listeners
        const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
        events.forEach(event => {
            window.addEventListener(event, handleActivity);
        });

        return () => {
            events.forEach(event => {
                window.removeEventListener(event, handleActivity);
            });
        };
    }, [handleActivity]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                const newTime = prev - 1;

                if (newTime <= 0) {
                    clearInterval(interval);
                    if (onTimeout) onTimeout();
                    // Clear session
                    localStorage.removeItem('suvidha_session_backup');
                    window.location.href = '/';
                    return 0;
                }

                if (newTime <= warningMinutes * 60 && !showWarning) {
                    setShowWarning(true);
                }

                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [warningMinutes, showWarning, onTimeout]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!showWarning) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.iconContainer}>
                    <AlertTriangle size={48} color="#f59e0b" />
                </div>
                <h2 style={styles.title}>Session Timeout Warning</h2>
                <p style={styles.message}>
                    Your session will expire in <strong>{formatTime(timeLeft)}</strong> due to inactivity.
                </p>
                <p style={styles.submessage}>
                    Your form data has been auto-saved. Click below to continue your session.
                </p>
                <div style={styles.timer}>
                    <Clock size={20} />
                    <span style={styles.timerText}>{formatTime(timeLeft)}</span>
                </div>
                <button onClick={resetTimer} style={styles.continueBtn}>
                    Continue Session
                </button>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10001,
        backdropFilter: 'blur(4px)',
    },
    modal: {
        background: 'white',
        borderRadius: '2rem',
        padding: '3rem 2.5rem',
        maxWidth: '450px',
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
    },
    iconContainer: {
        marginBottom: '1.5rem',
    },
    title: {
        fontSize: '1.8rem',
        fontWeight: 900,
        margin: '0 0 1rem 0',
        color: '#1e293b',
    },
    message: {
        fontSize: '1.1rem',
        color: '#475569',
        margin: '0 0 0.5rem 0',
        lineHeight: 1.6,
    },
    submessage: {
        fontSize: '0.95rem',
        color: '#64748b',
        margin: '0 0 2rem 0',
    },
    timer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        padding: '1rem',
        background: '#fef3c7',
        borderRadius: '12px',
        marginBottom: '2rem',
    },
    timerText: {
        fontSize: '1.5rem',
        fontWeight: 900,
        color: '#92400e',
    },
    continueBtn: {
        width: '100%',
        padding: '1.25rem',
        background: 'var(--primary)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1.1rem',
        fontWeight: 700,
        cursor: 'pointer',
        transition: 'all 0.2s',
    }
};
