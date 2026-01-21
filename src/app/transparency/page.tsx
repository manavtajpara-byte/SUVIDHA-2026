'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Box, RefreshCw, CheckCircle } from 'lucide-react';

const MOCK_BLOCKCHAIN_DATA = [
    { hash: '0x8f...3a1', type: 'PM KISAN GRANT', amount: '₹2,000', beneficiary: 'Ramesh K.', timestamp: '10:42 AM', status: 'Verified' },
    { hash: '0x2d...9b4', type: 'HOUSING SUBSIDY', amount: '₹12,500', beneficiary: 'Sita Devi', timestamp: '10:41 AM', status: 'Verified' },
    { hash: '0x1a...7c2', type: 'SCHOLARSHIP', amount: '₹5,000', beneficiary: 'Rahul S.', timestamp: '10:39 AM', status: 'Verified' },
    { hash: '0x9c...4f1', type: 'PENSION', amount: '₹1,000', beneficiary: 'Om Prakash', timestamp: '10:35 AM', status: 'Verified' },
];

export default function TransparencyPage() {
    const [blocks, setBlocks] = useState(MOCK_BLOCKCHAIN_DATA);
    const [isMining, setIsMining] = useState(false);
    const [selectedTx, setSelectedTx] = useState<any>(null);

    const mineBlock = () => {
        setIsMining(true);
        setTimeout(() => {
            const newBlock = {
                hash: `0x${Math.random().toString(16).substr(2, 8)}...`,
                type: 'MNREGA PAYMENT',
                amount: `₹${Math.floor(Math.random() * 5000)}`,
                beneficiary: 'Anonymous Citizen',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: 'Verified'
            };
            setBlocks(prev => [newBlock, ...prev]);
            setIsMining(false);
        }, 2000);
    };

    if (selectedTx) {
        return (
            <div style={styles.container}>
                <div style={styles.certCard}>
                    <ShieldCheck size={64} color="#4f46e5" />
                    <h2>Blockchain Verification Certificate</h2>
                    <p style={{ color: '#64748b' }}>Verified by Govt GBN-3 Node #99120</p>

                    <div style={styles.txDetails}>
                        <div style={styles.txRow}><span>Transaction Hash</span> <span style={styles.txHash}>{selectedTx.hash}</span></div>
                        <div style={styles.txRow}><span>Grant Type</span> <strong>{selectedTx.type}</strong></div>
                        <div style={styles.txRow}><span>Amount</span> <span style={{ color: '#16a34a', fontWeight: 'bold' }}>{selectedTx.amount}</span></div>
                        <div style={styles.txRow}><span>Beneficiary</span> <strong>{selectedTx.beneficiary}</strong></div>
                        <div style={styles.txRow}><span>Status</span> <span style={styles.verified}><CheckCircle size={14} /> IMMUTABLE</span></div>
                    </div>

                    <button onClick={() => window.print()} style={styles.printBtn}>Print Certificate</button>
                    <button onClick={() => setSelectedTx(null)} style={styles.backBtn}>Close</button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <ShieldCheck size={48} color="#16a34a" />
                <div>
                    <h1 style={styles.title}>Public Trust Ledger</h1>
                    <p style={styles.subtitle}>Secured by Government Blockchain Network (GBN)</p>
                </div>
            </div>

            <div style={styles.statsRow}>
                <div style={styles.statCard}>
                    <h3>Total Disbursed (Today)</h3>
                    <p style={styles.statValue}>₹42,50,000</p>
                </div>
                <div style={styles.statCard}>
                    <h3>Active Nodes</h3>
                    <p style={styles.statValue}>12,405</p>
                </div>
                <div style={styles.statCard}>
                    <h3>Block Height</h3>
                    <p style={styles.statValue}>#8,902,114</p>
                </div>
            </div>

            <div style={styles.ledgerContainer}>
                <div style={styles.ledgerHeader}>
                    <h2>Live Transactions</h2>
                    <button onClick={mineBlock} disabled={isMining} style={styles.mineBtn}>
                        <RefreshCw size={16} className={isMining ? 'spin' : ''} />
                        {isMining ? 'Verifying Block...' : 'Refresh Ledger'}
                    </button>
                </div>

                <div style={styles.tableWrapper}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Block Hash</th>
                                <th style={styles.th}>Grant Type</th>
                                <th style={styles.th}>Amount</th>
                                <th style={styles.th}>Beneficiary</th>
                                <th style={styles.th}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blocks.map((block, i) => (
                                <tr key={i} style={{ ...styles.tr, animationDelay: `${i * 100}ms` }} className="fade-in">
                                    <td style={styles.td}><span style={styles.hash}>{block.hash}</span></td>
                                    <td style={styles.td}>
                                        <div style={styles.typeTag}>
                                            <Box size={14} /> {block.type}
                                        </div>
                                    </td>
                                    <td style={styles.td}>{block.amount}</td>
                                    <td style={styles.td}>{block.beneficiary}</td>
                                    <td style={styles.td}>
                                        <button
                                            onClick={() => setSelectedTx(block)}
                                            style={styles.verifyBtn}
                                        >
                                            Verify Certificate
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <style jsx>{`
                .spin { animation: spin 1s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
                .fade-in { animation: fadeIn 0.5s ease-out forwards; opacity: 0; transform: translateY(10px); }
                @keyframes fadeIn { to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        marginBottom: '2rem',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#1e293b',
        margin: 0,
    },
    subtitle: {
        color: '#64748b',
        marginTop: '0.5rem',
    },
    statsRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
        marginBottom: '2rem',
    },
    statCard: {
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '15px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        textAlign: 'center',
    },
    statValue: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#2563eb',
        marginTop: '0.5rem',
    },
    ledgerContainer: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    ledgerHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
    },
    mineBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#f1f5f9',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 600,
        color: '#475569',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        textAlign: 'left',
        padding: '1rem',
        borderBottom: '2px solid #e2e8f0',
        color: '#64748b',
        fontSize: '0.9rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    tr: {
        borderBottom: '1px solid #f1f5f9',
    },
    td: {
        padding: '1rem',
        fontSize: '0.95rem',
        color: '#334155',
    },
    hash: {
        fontFamily: 'monospace',
        backgroundColor: '#f8fafc',
        padding: '0.2rem 0.5rem',
        borderRadius: '4px',
        border: '1px solid #e2e8f0',
        color: '#0f172a',
    },
    typeTag: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.85rem',
        fontWeight: 600,
        color: '#4f46e5',
        backgroundColor: '#eef2ff',
        padding: '0.2rem 0.6rem',
        borderRadius: '20px',
        width: 'fit-content',
    },
    verified: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        color: '#16a34a',
        fontWeight: 600,
        fontSize: '0.85rem',
    },
    verifyBtn: {
        padding: '0.4rem 0.8rem',
        backgroundColor: '#4f46e5',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '0.8rem',
        cursor: 'pointer',
    },
    certCard: {
        backgroundColor: 'white',
        padding: '4rem',
        borderRadius: '25px',
        maxWidth: '700px',
        margin: '2rem auto',
        textAlign: 'center',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid #e2e8f0',
    },
    txDetails: {
        marginTop: '2.5rem',
        textAlign: 'left',
        backgroundColor: '#f8fafc',
        padding: '2rem',
        borderRadius: '15px',
        display: 'grid',
        gap: '1.25rem',
    },
    txRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: '0.75rem',
        fontSize: '0.95rem',
    },
    txHash: {
        fontFamily: 'monospace',
        fontSize: '0.85rem',
        color: '#64748b',
    },
    printBtn: {
        width: '100%',
        padding: '1rem',
        backgroundColor: '#4f46e5',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        marginTop: '2rem',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    backBtn: {
        width: '100%',
        padding: '1rem',
        backgroundColor: '#f1f5f9',
        color: '#475569',
        border: 'none',
        borderRadius: '10px',
        marginTop: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
    }
};
