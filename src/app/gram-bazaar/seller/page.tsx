'use client';

import React, { useState } from 'react';
import { Package, Plus, TrendingUp, DollarSign, Archive, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SellerDashboard() {
    const router = useRouter();
    const [inventory, setInventory] = useState([
        { id: 1, name: 'Madhubani Painting', stock: 5, price: 1200, status: 'Active' },
        { id: 2, name: 'Handwoven Scarf', stock: 12, price: 450, status: 'Active' },
        { id: 3, name: 'Bamboo Basket', stock: 0, price: 300, status: 'Out of Stock' },
    ]);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={24} />
                </button>
                <h1 style={styles.title}>Seller Dashboard 🏪</h1>
            </div>

            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <div style={{ ...styles.iconBox, background: '#dcfce7', color: '#16a34a' }}>
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <p style={styles.statLabel}>Total Sales</p>
                        <h3 style={styles.statValue}>₹ 12,450</h3>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <div style={{ ...styles.iconBox, background: '#dbeafe', color: '#2563eb' }}>
                        <Package size={24} />
                    </div>
                    <div>
                        <p style={styles.statLabel}>Active Listings</p>
                        <h3 style={styles.statValue}>8 Items</h3>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <div style={{ ...styles.iconBox, background: '#ffedd5', color: '#ea580c' }}>
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <p style={styles.statLabel}>Views (Week)</p>
                        <h3 style={styles.statValue}>1,204</h3>
                    </div>
                </div>
            </div>

            <div style={styles.sectionHeader}>
                <h2>My Inventory</h2>
                <button style={styles.addBtn}>
                    <Plus size={20} /> Add New Item
                </button>
            </div>

            <div style={styles.tableCard}>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.trHead}>
                            <th style={styles.th}>Product Name</th>
                            <th style={styles.th}>Price</th>
                            <th style={styles.th}>Stock</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map((item) => (
                            <tr key={item.id} style={styles.tr}>
                                <td style={styles.td}>{item.name}</td>
                                <td style={styles.td}>₹ {item.price}</td>
                                <td style={styles.td}>{item.stock} Units</td>
                                <td style={styles.td}>
                                    <span style={{
                                        ...styles.statusBadge,
                                        background: item.status === 'Active' ? '#dcfce7' : '#fee2e2',
                                        color: item.status === 'Active' ? '#16a34a' : '#ef4444'
                                    }}>
                                        {item.status}
                                    </span>
                                </td>
                                <td style={styles.td}>
                                    <button style={styles.actionBtn}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '1000px', margin: '0 auto' },
    header: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' },
    title: { margin: 0, fontSize: '2rem', color: '#1e293b' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' },
    statCard: { background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '1rem' },
    iconBox: { width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    statLabel: { margin: 0, fontSize: '0.9rem', color: '#64748b' },
    statValue: { margin: '0.2rem 0 0 0', fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b' },
    sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    addBtn: { background: '#ea580c', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' },
    tableCard: { background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden' },
    table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
    trHead: { background: '#f8fafc', borderBottom: '1px solid #e2e8f0' },
    th: { padding: '1rem', color: '#64748b', fontWeight: '600' },
    tr: { borderBottom: '1px solid #f1f5f9' },
    td: { padding: '1rem' },
    statusBadge: { padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' },
    actionBtn: { background: 'none', border: '1px solid #cbd5e1', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }
};
