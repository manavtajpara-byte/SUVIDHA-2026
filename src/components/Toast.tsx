'use client';

import React, { useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
}

interface ToastProps {
    toast: Toast;
    onClose: (id: string) => void;
}

function ToastItem({ toast, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(toast.id);
        }, toast.duration || 5000);

        return () => clearTimeout(timer);
    }, [toast, onClose]);

    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return <CheckCircle2 size={20} />;
            case 'error':
                return <AlertCircle size={20} />;
            case 'warning':
                return <AlertTriangle size={20} />;
            case 'info':
                return <Info size={20} />;
        }
    };

    const getStyles = () => {
        const baseStyles = {
            ...styles.toast,
            animation: 'slideInRight 0.3s ease-out',
        };

        switch (toast.type) {
            case 'success':
                return { ...baseStyles, background: '#10b981', color: 'white' };
            case 'error':
                return { ...baseStyles, background: '#ef4444', color: 'white' };
            case 'warning':
                return { ...baseStyles, background: '#f59e0b', color: 'white' };
            case 'info':
                return { ...baseStyles, background: '#3b82f6', color: 'white' };
        }
    };

    return (
        <div style={getStyles()}>
            <div style={styles.icon}>{getIcon()}</div>
            <p style={styles.message}>{toast.message}</p>
            <button
                onClick={() => onClose(toast.id)}
                style={styles.closeBtn}
                aria-label="Close notification"
            >
                <X size={18} />
            </button>
        </div>
    );
}

interface ToastContainerProps {
    toasts: Toast[];
    onClose: (id: string) => void;
}

export default function ToastContainer({ toasts, onClose }: ToastContainerProps) {
    if (toasts.length === 0) return null;

    return (
        <div style={styles.container}>
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onClose={onClose} />
            ))}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        maxWidth: '400px',
    },
    toast: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem 1.25rem',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        minWidth: '300px',
    },
    icon: {
        flexShrink: 0,
    },
    message: {
        flex: 1,
        margin: 0,
        fontSize: '0.95rem',
        fontWeight: 600,
    },
    closeBtn: {
        background: 'rgba(255,255,255,0.2)',
        border: 'none',
        borderRadius: '6px',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'inherit',
        flexShrink: 0,
    }
};
