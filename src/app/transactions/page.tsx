'use client';

import React from 'react';
import AethelLayout from '@/components/AethelLayout';
import { CreditCard, ArrowDownLeft, ArrowUpRight, Search, Filter, Calendar } from 'lucide-react';

export default function TransactionsPage() {
    const sidebarLinks = [
        { label: 'Ledger', icon: <CreditCard size={20} />, href: '/transactions', active: true },
        { label: 'Statements', icon: <Calendar size={20} />, href: '/transactions/statements' },
    ];

    const transactions = [
        { id: 'TXN001', sector: 'Electricity', amount: '₹ 2,450.00', type: 'Payment', status: 'Success', date: '22 Jan 2026' },
        { id: 'TXN002', sector: 'Gas', amount: '₹ 840.00', type: 'Refill Booking', status: 'Processing', date: '24 Jan 2026' },
        { id: 'TXN003', sector: 'Municipal', amount: '₹ 1,200.00', type: 'Water Tax', status: 'Success', date: '15 Jan 2026' },
        { id: 'TXN004', sector: 'Healthcare', amount: '₹ 500.00', type: 'Consultation', status: 'Success', date: '10 Jan 2026' },
    ];

    return (
        <AethelLayout
            title="Unified Ledger"
            themeColor="var(--theme-azure)"
            themeSoft="var(--theme-azure-soft)"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Account History</h1>
                    <p style={styles.subtitle}>Consolidated view of all your payments and service applications.</p>
                </div>

                <div style={styles.ledgerCard}>
                    <div style={styles.tableHeader}>
                        <div style={styles.col}>Transaction ID</div>
                        <div style={styles.col}>Sector</div>
                        <div style={styles.col}>Type</div>
                        <div style={styles.col}>Date</div>
                        <div style={styles.col}>Amount</div>
                        <div style={styles.col}>Status</div>
                    </div>

                    <div style={styles.tableBody}>
                        {transactions.map((txn, i) => (
                            <div key={i} style={styles.row}>
                                <div style={{ ...styles.col, fontWeight: 700, color: '#1e293b' }}>{txn.id}</div>
                                <div style={styles.col}>
                                    <span style={styles.sectorBadge}>{txn.sector}</span>
                                </div>
                                <div style={styles.col}>{txn.type}</div>
                                <div style={styles.col}>{txn.date}</div>
                                <div style={{ ...styles.col, fontWeight: 800 }}>{txn.amount}</div>
                                <div style={styles.col}>
                                    <span style={{
                                        ...styles.statusBadge,
                                        background: txn.status === 'Success' ? '#f0fdf4' : '#fff7ed',
                                        color: txn.status === 'Success' ? '#16a34a' : '#ea580c'
                                    }}>
                                        {txn.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AethelLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    header: { marginBottom: '1rem' },
    title: { fontSize: '2rem', fontWeight: 800, color: '#1e293b', margin: 0 },
    subtitle: { fontSize: '1rem', color: '#64748b', marginTop: '0.5rem' },
    ledgerCard: { background: 'white', borderRadius: '32px', border: '1px solid #f1f5f9', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' },
    tableHeader: { display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr 1fr', padding: '1.5rem 2rem', background: '#f8fafc', borderBottom: '1px solid #f1f5f9', fontSize: '0.85rem', fontWeight: 700, color: '#64748b' },
    tableBody: { display: 'flex', flexDirection: 'column' },
    row: { display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr 1fr', padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', alignItems: 'center', transition: 'background 0.2s' },
    col: { fontSize: '0.95rem', color: '#64748b' },
    sectorBadge: { background: '#eff6ff', color: '#2563eb', padding: '0.4rem 0.8rem', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 700 },
    statusBadge: { padding: '0.4rem 0.8rem', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 800 },
};
