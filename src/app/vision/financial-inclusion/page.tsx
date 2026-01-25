'use client';

import React, { useState } from 'react';
import AethelLayout from '@/components/AethelLayout';
import { useAppState } from '@/context/StateContext';
import {
    Landmark, Wallet, ShieldCheck, Fingerprint,
    Receipt as ReceiptIcon, Banknote, History,
    ShieldAlert, CreditCard, ArrowRight, TrendingUp,
    CheckCircle2, AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { translations } from '@/constants/translations';
import Receipt from '@/components/Receipt';

export default function FinancialInclusionPage() {
    const { language } = useAppState();
    const t = (translations as any)[language] || translations.en;
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<'aeps' | 'dbt' | 'insurance'>('aeps');
    const [step, setStep] = useState(1);
    const [type, setType] = useState<'balance' | 'withdraw' | 'statement'>('balance');
    const [isScanning, setIsScanning] = useState(false);
    const [showReceipt, setShowReceipt] = useState(false);
    const [aadharNo, setAadharNo] = useState('');
    const [amount, setAmount] = useState('');

    const sidebarLinks = [
        { label: 'Banking Mesh', icon: <Landmark size={20} />, href: '/vision/financial-inclusion', active: true },
        { label: 'Transactions', icon: <History size={20} />, href: '/transactions' },
        { label: 'Insurance', icon: <ShieldAlert size={20} />, href: '/vision/financial-inclusion?tab=insurance' },
    ];

    const startBiometric = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            setStep(5);
        }, 3000);
    };

    const banks = [
        { name: 'SBI', color: '#1a4a9e' },
        { name: 'HDFC', color: '#004da8' },
        { name: 'ICICI', color: '#f58220' },
        { name: 'BoB', color: '#f15a22' },
        { name: 'PNB', color: '#8b0000' },
        { name: 'Axis', color: '#ae285d' }
    ];

    return (
        <AethelLayout
            title="Financial Inclusion 2.0"
            themeColor="var(--theme-azure)"
            themeSoft="var(--theme-azure-soft)"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.container}>
                {/* Mode Selector */}
                <div style={styles.tabBar}>
                    <button onClick={() => { setActiveTab('aeps'); setStep(1); }} style={{ ...styles.tabBtn, borderBottom: activeTab === 'aeps' ? '3px solid #2563eb' : 'none', color: activeTab === 'aeps' ? '#2563eb' : '#64748b' }}>AEPS Micro-ATM</button>
                    <button onClick={() => { setActiveTab('dbt'); setStep(1); }} style={{ ...styles.tabBtn, borderBottom: activeTab === 'dbt' ? '3px solid #2563eb' : 'none', color: activeTab === 'dbt' ? '#2563eb' : '#64748b' }}>DBT Tracker</button>
                    <button onClick={() => { setActiveTab('insurance'); setStep(1); }} style={{ ...styles.tabBtn, borderBottom: activeTab === 'insurance' ? '3px solid #2563eb' : 'none', color: activeTab === 'insurance' ? '#2563eb' : '#64748b' }}>Micro-Insurance</button>
                </div>

                {activeTab === 'aeps' && (
                    <div style={styles.card}>
                        {step === 1 && (
                            <div style={styles.stepContainer}>
                                <Landmark size={64} color="#2563eb" />
                                <h3 style={styles.cardTitle}>Aadhaar Enabled Payment System</h3>
                                <p style={styles.cardSub}>Secure banking without a physical card</p>
                                <div style={styles.typeGrid}>
                                    <button onClick={() => { setType('balance'); setStep(2); }} style={styles.typeBtn}>
                                        <Wallet size={32} />
                                        <span>Balance Inquiry</span>
                                    </button>
                                    <button onClick={() => { setType('withdraw'); setStep(2); }} style={styles.typeBtn}>
                                        <Banknote size={32} />
                                        <span>Cash Withdrawal</span>
                                    </button>
                                    <button onClick={() => { setType('statement'); setStep(2); }} style={{ ...styles.typeBtn, gridColumn: 'span 2' }}>
                                        <ReceiptIcon size={32} />
                                        <span>Mini Statement</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div style={styles.stepContainer}>
                                <ShieldCheck size={48} color="#2563eb" />
                                <h3 style={styles.cardTitle}>Identity & Bank Selection</h3>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Aadhaar Number</label>
                                    <input value={aadharNo} onChange={(e) => setAadharNo(e.target.value.replace(/\D/g, '').slice(0, 12))} placeholder="1234 5678 9012" style={styles.input} />
                                </div>
                                <div style={styles.bankGrid}>
                                    {banks.map(bank => (
                                        <button key={bank.name} style={styles.bankBtn}>
                                            <div style={{ ...styles.bankLogo, backgroundColor: bank.color }}>{bank.name[0]}</div>
                                            <span style={{ fontSize: '0.8rem' }}>{bank.name}</span>
                                        </button>
                                    ))}
                                </div>
                                <button onClick={() => type === 'withdraw' ? setStep(3) : setStep(4)} style={styles.primaryBtn} disabled={aadharNo.length < 12}>
                                    {type === 'withdraw' ? 'Next: Amount' : 'Proceed to Biometric'}
                                </button>
                            </div>
                        )}

                        {step === 3 && (
                            <div style={styles.stepContainer}>
                                <Banknote size={48} color="#059669" />
                                <h3 style={styles.cardTitle}>Withdrawal Amount</h3>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Amount (Multiples of 100)</label>
                                    <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="₹ 500" style={{ ...styles.input, fontSize: '2rem', color: '#059669' }} type="number" />
                                </div>
                                <button onClick={() => setStep(4)} style={styles.primaryBtn} disabled={!amount}>Confirm Amount</button>
                            </div>
                        )}

                        {step === 4 && (
                            <div style={styles.stepContainer}>
                                <div style={styles.bioBox}>
                                    <Fingerprint size={80} color={isScanning ? '#2563eb' : '#94a3b8'} className={isScanning ? 'pulse' : ''} />
                                    <h3 style={styles.cardTitle}>{isScanning ? 'Capturing Biometrics...' : 'Scan Thumb'}</h3>
                                    <p style={styles.cardSub}>Place your finger on the kiosk scanner</p>
                                </div>
                                {!isScanning && <button onClick={startBiometric} style={styles.primaryBtn}>Initialize Scanner</button>}
                            </div>
                        )}

                        {step === 5 && (
                            <div style={styles.success}>
                                {type === 'statement' ? (
                                    <div style={styles.statementBox}>
                                        <h4 style={styles.sectionTitle}>Recent Transactions</h4>
                                        {[
                                            { d: '24 Jan', m: 'PDS-Ration', a: '-₹240', c: '#ef4444' },
                                            { d: '20 Jan', m: 'DBT-PMKISAN', a: '+₹2,000', c: '#10b981' },
                                            { d: '15 Jan', m: 'ELEC-UHBVN', a: '-₹1,150', c: '#ef4444' }
                                        ].map((t, i) => (
                                            <div key={i} style={styles.stRow}>
                                                <span>{t.d} <strong>{t.m}</strong></span>
                                                <span style={{ color: t.c, fontWeight: 800 }}>{t.a}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div style={styles.amountCircle}>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>{type === 'withdraw' ? 'Dispensed' : 'Balance'}</p>
                                        <h2 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 900 }}>₹ {type === 'withdraw' ? amount : '8,420'}.00</h2>
                                    </div>
                                )}
                                <h3 style={styles.successText}>Authentication Successful</h3>
                                <div style={styles.actionRow}>
                                    <button onClick={() => setShowReceipt(true)} style={styles.secondaryBtn}>Print Receipt</button>
                                    <button onClick={() => setStep(1)} style={styles.primaryBtn}>New Transaction</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'dbt' && (
                    <div style={styles.card}>
                        <div style={styles.stepContainer}>
                            <TrendingUp size={48} color="#2563eb" />
                            <h3 style={styles.cardTitle}>Direct Benefit Transfer Tracker</h3>
                            <div style={styles.dbtGrid}>
                                {[
                                    { name: 'PM-Kisan', amt: '₹ 2,000', status: 'Credited', date: '20/01/2026' },
                                    { name: 'Old Age Pension', amt: '₹ 1,500', status: 'Pending', date: 'Exp. 05/02' },
                                    { name: 'LPG Subsidy', amt: '₹ 242', status: 'Credited', date: '12/01/2026' }
                                ].map((d, i) => (
                                    <div key={i} style={styles.dbtItem}>
                                        <div style={styles.dbtHeader}>
                                            <span style={styles.dbtName}>{d.name}</span>
                                            <span style={{ ...styles.dbtStatus, background: d.status === 'Credited' ? '#f0fdf4' : '#fff7ed', color: d.status === 'Credited' ? '#16a34a' : '#ea580c' }}>{d.status}</span>
                                        </div>
                                        <div style={styles.dbtBody}>
                                            <span style={styles.dbtAmt}>{d.amt}</span>
                                            <span style={styles.dbtDate}>{d.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'insurance' && (
                    <div style={styles.card}>
                        <div style={styles.stepContainer}>
                            <ShieldAlert size={48} color="#e11d48" />
                            <h3 style={styles.cardTitle}>Micro-Insurance Portal</h3>
                            <div style={styles.insGrid}>
                                {[
                                    { name: 'PM Suraksha Bima', premium: '₹ 20/year', cover: '₹ 2 Lakh', desc: 'Accidental Death Insurance' },
                                    { name: 'PM Jeevan Jyoti', premium: '₹ 436/year', cover: '₹ 2 Lakh', desc: 'Life Insurance Cover' },
                                    { name: 'Ayushman Bharat', premium: 'Govt Funded', cover: '₹ 5 Lakh', desc: 'Health Insurance' }
                                ].map((ins, i) => (
                                    <div key={i} style={styles.insCard}>
                                        <h4 style={styles.insName}>{ins.name}</h4>
                                        <p style={styles.insDesc}>{ins.desc}</p>
                                        <div style={styles.insFooter}>
                                            <span>{ins.cover} Cover</span>
                                            <button style={styles.enrollBtn}>Enroll Now</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {showReceipt && (
                <Receipt
                    type="AEPS Transaction"
                    transactionId={`AEPS-V2-${Date.now()}`}
                    customerName="Verified Citizen"
                    amount={Number(amount) || 0}
                    details={{
                        'Bank': 'State Bank of India',
                        'Auth Type': 'Biometric L3',
                        'Rem. Balance': '₹ 8,420.00',
                        'Status': 'Confirmed'
                    }}
                    onClose={() => setShowReceipt(false)}
                />
            )}

            <style jsx>{`
                @keyframes pulse { 0% { opacity: 0.5; transform: scale(0.95); } 50% { opacity: 1; transform: scale(1.05); } 100% { opacity: 0.5; transform: scale(0.95); } }
                .pulse { animation: pulse 1s infinite ease-in-out; }
            `}</style>
        </AethelLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    tabBar: { display: 'flex', gap: '2rem', borderBottom: '1px solid #e2e8f0', marginBottom: '1rem' },
    tabBtn: { padding: '1rem', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' },
    card: { background: 'white', padding: '3rem', borderRadius: '32px', border: '1px solid #f1f5f9' },
    stepContainer: { display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', textAlign: 'center' },
    cardTitle: { fontSize: '1.5rem', fontWeight: 900, color: '#1e293b', margin: 0 },
    cardSub: { fontSize: '0.95rem', color: '#64748b', margin: 0 },
    typeGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', width: '100%', maxWidth: '500px' },
    typeBtn: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1.5rem', borderRadius: '20px', border: '1px solid #e2e8f0', background: '#f8fafc', cursor: 'pointer', color: '#2563eb', fontWeight: 800 },
    inputGroup: { width: '100%', maxWidth: '400px', textAlign: 'left' },
    label: { fontSize: '0.85rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'block' },
    input: { width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '1.25rem', textAlign: 'center', outline: 'none' },
    bankGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', width: '100%', maxWidth: '500px' },
    bankBtn: { padding: '1rem', borderRadius: '16px', border: '1px solid #e2e8f0', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' },
    bankLogo: { width: '32px', height: '32px', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 },
    primaryBtn: { width: '100%', maxWidth: '400px', padding: '1.25rem', borderRadius: '16px', background: '#2563eb', color: 'white', border: 'none', fontWeight: 800, cursor: 'pointer' },
    secondaryBtn: { width: '100%', maxWidth: '400px', padding: '1.25rem', borderRadius: '16px', background: 'white', color: '#2563eb', border: '2px solid #2563eb', fontWeight: 800, cursor: 'pointer' },
    bioBox: { padding: '2rem', background: '#f8fafc', borderRadius: '32px', width: '100%', maxWidth: '400px', border: '1px dashed #cbd5e1' },
    success: { display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', width: '100%' },
    amountCircle: { width: '180px', height: '180px', borderRadius: '50%', border: '8px solid #dcfce7', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f0fdf4' },
    successText: { fontSize: '1.75rem', fontWeight: 900, color: '#1e293b', margin: 0 },
    actionRow: { display: 'flex', gap: '1rem', width: '100%', maxWidth: '500px' },
    statementBox: { width: '100%', maxWidth: '500px', textAlign: 'left' },
    sectionTitle: { fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', marginBottom: '1.5rem' },
    stRow: { display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #f1f5f9' },
    dbtGrid: { display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '600px' },
    dbtItem: { padding: '1.5rem', borderRadius: '20px', border: '1px solid #f1f5f9', background: '#f8fafc' },
    dbtHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' },
    dbtName: { fontWeight: 800, color: '#1e293b' },
    dbtStatus: { padding: '0.4rem 0.8rem', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 800 },
    dbtBody: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' },
    dbtAmt: { fontSize: '1.5rem', fontWeight: 900, color: '#1e293b' },
    dbtDate: { fontSize: '0.85rem', color: '#94a3b8' },
    insGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', width: '100%' },
    insCard: { padding: '1.5rem', borderRadius: '24px', border: '1px solid #f1f5f9', background: 'white', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' },
    insName: { margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' },
    insDesc: { margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 },
    insFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
    enrollBtn: { padding: '0.6rem 1rem', borderRadius: '12px', background: '#1e293b', color: 'white', border: 'none', fontWeight: 700, cursor: 'pointer' }
};
