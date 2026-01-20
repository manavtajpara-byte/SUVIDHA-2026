'use client';

import React, { useEffect, useState } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { SyncManager } from '@/utils/SyncManager';

export default function OfflineIndicator() {
    const [isOnline, setIsOnline] = useState(true);
    const [pendingCount, setPendingCount] = useState(0);

    useEffect(() => {
        setIsOnline(navigator.onLine);

        const handleOnline = () => {
            setIsOnline(true);
            SyncManager.syncWithServer(); // Auto sync
        };
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        const interval = setInterval(() => {
            const queue = SyncManager.getQueue();
            const pending = queue.filter(q => q.status === 'pending').length;
            setPendingCount(pending);
        }, 2000);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            clearInterval(interval);
        };
    }, []);

    if (isOnline && pendingCount === 0) return null;

    return (
        <div style={styles.container}>
            {isOnline ? (
                <div style={styles.synced}>
                    <RefreshCw size={16} className="spin" />
                    <span>Syncing {pendingCount} items...</span>
                </div>
            ) : (
                <div style={styles.offline}>
                    <WifiOff size={16} />
                    <span>You are Offline. Changes will be saved via 'Net-Zero Sync'.</span>
                </div>
            )}
            <style jsx>{`
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        position: 'fixed',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10001,
    },
    offline: {
        backgroundColor: '#ef4444',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        fontSize: '0.9rem',
    },
    synced: {
        backgroundColor: '#f59e0b',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        fontSize: '0.9rem',
    }
};
