'use client';

import React, { useState } from 'react';
import { Globe, Plane, ArrowLeft, Search, CheckCircle, Calculator, ChevronRight, FileText, Smartphone } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GlobalConnectPage() {
    const router = useRouter();
    const [passportId, setPassportId] = useState('');
    const [country, setCountry] = useState('USA');
    const [amount, setAmount] = useState('1000');

    const exchangeRates: Record<string, number> = { 'USA': 83.12, 'Europe': 90.45, 'Dubai': 22.63 };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}><ArrowLeft size={32} /></button>
                <div style={{ flex: 1 }}>
                    <h1 style={styles.title}>Global Connect 🌏</h1>
                    <p style={styles.subtitle}>Passport Services & Visa Guidance for Global Aspirations</p>
                </div>
            </div>

            <div style={styles.grid}>
                {/* Passport Tracker */}
                <div style={styles.card}>
                    <div style={styles.cardHeader}>
                        <FileText size={40} color="#2563eb" />
                        <h3>Passport Seva Tracker</h3>
                    </div>
                    <div style={styles.formGroup}>
                        <input
                            placeholder="Enter File Number (Ex: VR002...)"
                            style={styles.input}
                            value={passportId}
                            onChange={(e) => setPassportId(e.target.value)}
                        />
                        <button style={styles.trackBtn}>Track Status</button>
                    </div>
                    {passportId && (
                        <div style={styles.statusBox}>
                            <div style={styles.statusRow}>
                                <span>Current Status:</span>
                                <span style={{ color: '#16a34a', fontWeight: 'bold' }}>Police Verification Complete</span>
                            </div>
                            <div style={styles.progressLine}><div style={{ width: '75%', background: '#2563eb', height: '100%' }}></div></div>
                        </div>
                    )}
                </div>

                {/* Currency Converter */}
                <div style={styles.card}>
                    <div style={styles.cardHeader}>
                        <Calculator size={40} color="#16a34a" />
                        <h3>Trip Budgeter</h3>
                    </div>
                    <div style={styles.converterBox}>
                        <div style={styles.inputRow}>
                            <span>INR</span>
                            <input value={amount} onChange={(e) => setAmount(e.target.value)} style={styles.miniInput} />
                        </div>
                        <div style={styles.arrowRow}><ChevronRight /></div>
                        <div style={styles.inputRow}>
                            <select onChange={(e) => setCountry(e.target.value)} value={country} style={styles.miniSelect}>
                                <option value="USA">USD ($)</option>
                                <option value="Europe">EUR (€)</option>
                                <option value="Dubai">AED (DHS)</option>
                            </select>
                            <div style={styles.resultValue}>
                                {(Number(amount) / exchangeRates[country]).toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visa Helper */}
                <div style={{ ...styles.card, gridColumn: 'span 2' }}>
                    <div style={styles.visaHeader}>
                        <div style={styles.titleCol}>
                            <Plane size={32} color="#4f46e5" />
                            <h3>Visa Documentation Checklist</h3>
                        </div>
                        <select style={styles.countrySelect}>
                            <option>Student Visa - Canada</option>
                            <option>Work Visa - Dubai</option>
                            <option>Tourist Visa - USA</option>
                        </select>
                    </div>
                    <div style={styles.checklist}>
                        <div style={styles.checkItem}><CheckCircle size={18} color="#cbd5e1" /> Valid Passport (6+ months)</div>
                        <div style={styles.checkItem}><CheckCircle size={18} color="#cbd5e1" /> Academic Transcripts (Notarized)</div>
                        <div style={styles.checkItem}><CheckCircle size={18} color="#cbd5e1" /> Financial Proof (6 Months Bank Statement)</div>
                        <div style={styles.checkItem}><CheckCircle size={18} color="#cbd5e1" /> Statement of Purpose (SOP)</div>
                    </div>
                    <button style={styles.guideBtn}>Request Full Guide PDF</button>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '1100px', margin: '0 auto' },
    header: { display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#2563eb' },
    title: { fontSize: '2.5rem', fontWeight: 900, margin: 0, color: '#1e293b' },
    subtitle: { color: '#64748b', fontSize: '1.2rem' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' },
    card: { background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' },
    cardHeader: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' },
    formGroup: { display: 'flex', gap: '0.5rem', marginBottom: '1rem' },
    input: { flex: 1, padding: '0.8rem', borderRadius: '10px', border: '1px solid #e2e8f0' },
    trackBtn: { padding: '0.8rem 1.5rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold' },
    statusBox: { marginTop: '1.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '12px' },
    statusRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' },
    progressLine: { height: '8px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' },
    converterBox: { display: 'flex', flexDirection: 'column', gap: '1rem', background: '#f0fdf4', padding: '1.5rem', borderRadius: '16px' },
    inputRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    miniInput: { width: '120px', padding: '0.5rem', borderRadius: '8px', border: '1px solid #bbfcce', textAlign: 'right', fontWeight: 'bold' },
    arrowRow: { display: 'flex', justifyContent: 'center' },
    miniSelect: { background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer' },
    resultValue: { fontSize: '1.5rem', fontWeight: 900, color: '#15803d' },
    visaHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    titleCol: { display: 'flex', alignItems: 'center', gap: '1rem' },
    countrySelect: { padding: '0.8rem 1.5rem', borderRadius: '32px', background: '#f1f5f9', border: 'none', fontWeight: 'bold' },
    checklist: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' },
    checkItem: { display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#475569' },
    guideBtn: { width: '100%', padding: '1.2rem', background: '#1e293b', color: 'white', border: 'none', borderRadius: '16px', fontWeight: 'bold', cursor: 'pointer' }
};
