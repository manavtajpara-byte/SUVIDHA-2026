'use client';

import React, { useState, useEffect } from 'react';
import { Printer, CreditCard, X } from 'lucide-react';

// Global Event Bus for Hardware Triggers
export const triggerHardware = (type: 'print' | 'card_read') => {
    const event = new CustomEvent('suvidha_hardware_trigger', { detail: { type } });
    window.dispatchEvent(event);
};

export default function HardwareBridge() {
    const [activeAction, setActiveAction] = useState<'print' | 'card_read' | null>(null);

    useEffect(() => {
        const handleTrigger = (e: any) => {
            setActiveAction(e.detail.type);
            // Auto-dismiss after simulation
            setTimeout(() => setActiveAction(null), 4000);
        };

        window.addEventListener('suvidha_hardware_trigger', handleTrigger);
        return () => window.removeEventListener('suvidha_hardware_trigger', handleTrigger);
    }, []);

    if (!activeAction) return null;

    return (
        <div style={styles.overlay}>
            {activeAction === 'print' && (
                <div style={styles.hardwareBox}>
                    <div style={styles.printerSlot}>
                        <div className="receipt-paper">
                            <div style={{ height: '4px', background: '#ccc', marginBottom: '5px' }}></div>
                            <div style={{ height: '4px', background: '#ccc', width: '80%' }}></div>
                        </div>
                    </div>
                    <Printer size={60} color="#333" />
                    <p style={styles.statusText}>Printing Receipt...</p>
                    <p style={styles.subText}>*chk-chk-zzzt*</p>
                </div>
            )}

            {activeAction === 'card_read' && (
                <div style={styles.hardwareBox}>
                    <div className="card-slot">
                        <div className="card-insert"></div>
                    </div>
                    <CreditCard size={60} color="#333" />
                    <p style={styles.statusText}>Reading Smart Card...</p>
                    <p style={styles.subText}>Do not remove card</p>
                </div>
            )}

            <style jsx>{`
                .receipt-paper {
                    width: 60px;
                    height: 0px;
                    background: white;
                    border: 1px solid #ddd;
                    margin: 0 auto;
                    animation: print-feed 3s ease-out forwards;
                    overflow: hidden;
                    padding: 5px;
                }
                @keyframes print-feed {
                    to { height: 80px; transform: translateY(40px); }
                }

                .card-insert {
                    width: 80px;
                    height: 50px;
                    background: linear-gradient(135deg, #1e3a8a, #3b82f6);
                    border-radius: 5px;
                    margin: 0 auto;
                    animation: insert 1s ease-in-out infinite alternate;
                }
                @keyframes insert {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0px); opacity: 1; }
                }
             `}</style>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 5000,
        pointerEvents: 'none', // Don't block clicks
    },
    hardwareBox: {
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        border: '4px solid #333',
        width: '200px',
        pointerEvents: 'auto',
    },
    printerSlot: {
        width: '80px',
        height: '10px',
        background: '#111',
        borderRadius: '5px',
        marginBottom: '-20px',
        zIndex: 2,
    },
    statusText: {
        fontWeight: 'bold',
        marginTop: '1rem',
        textAlign: 'center',
    },
    subText: {
        fontSize: '0.8rem',
        color: '#666',
        fontStyle: 'italic',
    }
};
