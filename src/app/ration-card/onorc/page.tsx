'use client';

import React, { useState } from 'react';
import { Wheat, MapPin, Search, CheckCircle, AlertTriangle, Info, ArrowLeft, Store } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ONORCPage() {
    const router = useRouter();
    const [view, setView] = useState<'portability' | 'stock'>('portability');
    const [rcNumber, setRcNumber] = useState('');
    const [searchResult, setSearchResult] = useState<any>(null);

    const handleCheck = () => {
        if (!rcNumber) return;
        setSearchResult({
            id: rcNumber,
            head: 'Ram Prasad',
            state: 'Bihar (Home)',
            currentLoc: 'Varanasi, UP (Active)',
            status: 'Eligible for Portability',
            allocated: 'Wheat: 15kg, Rice: 10kg'
        });
    };

    const PortabilityView = () => (
        <div style={styles.section}>
            <div style={styles.card}>
                <h2 style={{ marginBottom: '1.5rem' }}>Portability Check 🌾</h2>
                <div style={styles.searchBox}>
                    <input
                        placeholder="Enter Ration Card Number..."
                        style={styles.input}
                        value={rcNumber}
                        onChange={(e) => setRcNumber(e.target.value)}
                    />
                    <button onClick={handleCheck} style={styles.primaryBtn}>Check Status</button>
                </div>

                {searchResult && (
                    <div style={styles.resultBox}>
                        <div style={styles.statusBanner}>
                            <CheckCircle size={20} /> {searchResult.status}
                        </div>
                        <div style={styles.detailRow}>
                            <span>Head of Family:</span>
                            <strong>{searchResult.head}</strong>
                        </div>
                        <div style={styles.detailRow}>
                            <span>Home State:</span>
                            <strong>{searchResult.state}</strong>
                        </div>
                        <div style={styles.detailRow}>
                            <span>Monthly Allocation:</span>
                            <strong>{searchResult.allocated}</strong>
                        </div>
                        <p style={styles.hint}><Info size={14} /> You can collect your ration from any Fair Price Shop in Varanasi.</p>
                    </div>
                )}
            </div>
        </div>
    );

    const StockView = () => (
        <div style={styles.section}>
            <div style={styles.grid}>
                {[1, 2, 3].map(i => (
                    <div key={i} style={styles.shopCard}>
                        <div style={styles.shopHeader}>
                            <Store size={24} color="#ea580c" />
                            <h3>Fair Price Shop #{1020 + i}</h3>
                        </div>
                        <p style={styles.shopLoc}><MapPin size={14} /> Sector {i * 2}, Varanasi Hub</p>
                        <div style={styles.stockGrid}>
                            <div style={styles.stockItem}> Wheat: <span style={{ color: '#16a34a' }}>450kg Avail.</span> </div>
                            <div style={styles.stockItem}> Rice: <span style={{ color: '#16a34a' }}>200kg Avail.</span> </div>
                            <div style={styles.stockItem}> Sugar: <span style={{ color: '#dc2626' }}>Out of Stock</span> </div>
                        </div>
                        <button style={styles.navigateBtn}>Navigate to Shop &rarr;</button>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <Wheat size={48} color="#ea580c" />
                <div>
                    <h1 style={styles.title}>One Nation One Ration Card</h1>
                    <p style={styles.subtitle}>Seamless Food Security for Migrant Workers</p>
                </div>
            </div>

            <div style={styles.tabs}>
                <button
                    style={{ ...styles.tab, borderBottom: view === 'portability' ? '4px solid #ea580c' : 'none', color: view === 'portability' ? '#ea580c' : '#64748b' }}
                    onClick={() => setView('portability')}
                >
                    Eligibility Check
                </button>
                <button
                    style={{ ...styles.tab, borderBottom: view === 'stock' ? '4px solid #ea580c' : 'none', color: view === 'stock' ? '#ea580c' : '#64748b' }}
                    onClick={() => setView('stock')}
                >
                    Nearby Stock
                </button>
            </div>

            {view === 'portability' ? <PortabilityView /> : <StockView />}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '1000px', margin: '0 auto' },
    header: { display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#ea580c' },
    title: { fontSize: '2.5rem', fontWeight: 900, color: '#1e293b', margin: 0 },
    subtitle: { color: '#64748b', fontSize: '1.1rem' },
    tabs: { display: 'flex', gap: '2rem', borderBottom: '1px solid #e2e8f0', marginBottom: '2rem' },
    tab: { padding: '1rem', background: 'none', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' },
    section: { animation: 'fadeIn 0.3s ease-in' },
    card: { background: 'white', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
    searchBox: { display: 'flex', gap: '1rem', marginBottom: '2rem' },
    input: { flex: 1, padding: '1rem', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '1.1rem' },
    primaryBtn: { padding: '1rem 2rem', background: '#ea580c', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
    resultBox: { background: '#fff7ed', padding: '2rem', borderRadius: '16px', border: '1px solid #ffedd5' },
    statusBanner: { display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#15803d', fontWeight: 'bold', marginBottom: '1.5rem', fontSize: '1.2rem' },
    detailRow: { display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px dashed #fed7aa', color: '#475569' },
    hint: { marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#ea580c' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' },
    shopCard: { background: 'white', padding: '1.5rem', borderRadius: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' },
    shopHeader: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' },
    shopLoc: { fontSize: '0.9rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '1.5rem' },
    stockGrid: { display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' },
    stockItem: { padding: '0.5rem', background: '#f8fafc', borderRadius: '8px', fontSize: '0.95rem' },
    navigateBtn: { width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'none', border: '1px solid #ea580c', color: '#ea580c', fontWeight: 'bold', cursor: 'pointer' }
};
