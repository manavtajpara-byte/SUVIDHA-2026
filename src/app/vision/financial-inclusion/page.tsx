'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { ArrowLeft, Landmark, Wallet, ShieldCheck, Fingerprint, Receipt as ReceiptIcon, Banknote } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { translations } from '@/constants/translations';
import Receipt from '@/components/Receipt';

export default function AEPSPage() {
    const { language } = useAppState();
    const t = (translations as any)[language] || translations.en;
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: Select Type, 2: Aadhaar, 3: Amount (if withdraw), 4: Biometric, 5: Success
    const [type, setType] = useState<'balance' | 'withdraw' | 'statement'>('balance');
    const [isScanning, setIsScanning] = useState(false);
    const [showReceipt, setShowReceipt] = useState(false);
    const [aadharNo, setAadharNo] = useState('');
    const [amount, setAmount] = useState('');

    const startBiometric = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            setStep(5);
        }, 3000);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => step === 1 ? router.back() : setStep(step - 1)} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h2 style={styles.title}>{t.aePS || 'AEPS Micro-ATM'}</h2>
            </div>

            <div style={styles.card}>
                {step === 1 && (
                    <div style={styles.stepContainer}>
                        <Landmark size={80} color="#2563eb" />
                        <h3>Aadhaar Enabled Payment System</h3>
                        <p>Select the service you wish to use</p>
                        <div style={styles.typeGrid}>
                            <button onClick={() => { setType('balance'); setStep(2); }} style={styles.typeBtn}>
                                <Wallet size={40} />
                                <span>Balance Inquiry</span>
                            </button>
                            <button onClick={() => { setType('withdraw'); setStep(2); }} style={styles.typeBtn}>
                                <Banknote size={40} />
                                <span>Cash Withdrawal</span>
                            </button>
                            <button onClick={() => { setType('statement'); setStep(2); }} style={styles.typeBtn}>
                                <ReceiptIcon size={40} />
                                <span>Mini Statement</span>
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div style={styles.stepContainer}>
                        <div style={styles.hero}>
                            <ShieldCheck size={60} color="#2563eb" />
                            <h3>Authentication Required</h3>
                            <p>Enter your 12-digit Aadhaar Number</p>
                        </div>
                        <div style={styles.inputGroup}>
                            <label>Aadhaar Number</label>
                            <input
                                value={aadharNo}
                                onChange={(e) => setAadharNo(e.target.value)}
                                placeholder="XXXX-XXXX-XXXX"
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.bankGrid}>
                            {[
                                { name: 'SBI', color: '#1a4a9e' },
                                { name: 'HDFC', color: '#004da8' },
                                { name: 'ICICI', color: '#f58220' },
                                { name: 'BoB', color: '#f15a22' },
                                { name: 'PNB', color: '#8b0000' },
                                { name: 'Axis', color: '#ae285d' }
                            ].map(bank => (
                                <button key={bank.name} style={{ ...styles.bankBtn, borderColor: bank.color }}>
                                    <div style={{ ...styles.bankLogo, backgroundColor: bank.color }}>{bank.name[0]}</div>
                                    {bank.name}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => type === 'withdraw' ? setStep(3) : setStep(4)}
                            style={styles.submitBtn}
                            disabled={!aadharNo || aadharNo.length < 12}
                        >
                            {type === 'withdraw' ? 'Enter Amount' : 'Proceed to Biometric'}
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div style={styles.stepContainer}>
                        <div style={styles.hero}>
                            <Banknote size={60} color="#059669" />
                            <h3>Withdrawal Amount</h3>
                            <p>Daily limit: ₹10,000</p>
                        </div>
                        <div style={styles.inputGroup}>
                            <label>Amount (₹)</label>
                            <input
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter Amount (Multiples of 100)"
                                style={{ ...styles.input, color: '#059669', fontWeight: 'bold' }}
                            />
                        </div>
                        <button onClick={() => setStep(4)} style={styles.submitBtn} disabled={!amount}>
                            Proceed to Biometric
                        </button>
                    </div>
                )}

                {step === 4 && (
                    <div style={styles.stepContainer}>
                        <div style={styles.bioHeader}>
                            <Fingerprint size={100} color={isScanning ? '#2563eb' : '#94a3b8'} className={isScanning ? 'pulse' : ''} />
                            <h3>{isScanning ? 'Scanning Fingerprint...' : 'Place Hand on Scanner'}</h3>
                            <p>Scanning right thumb for UIDAI authentication</p>
                        </div>
                        {!isScanning && (
                            <button onClick={startBiometric} style={styles.scanBtn}>
                                Start Scanner
                            </button>
                        )}
                        <div style={styles.shieldBox}>
                            <ShieldCheck size={20} />
                            <span>128-bit Encrypted Session</span>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div style={styles.success}>
                        <div style={styles.balanceSummary}>
                            {type === 'withdraw' ? (
                                <>
                                    <span>Withdrawal Successful</span>
                                    <strong style={{ color: '#059669' }}>- ₹ {amount}.00</strong>
                                    <p style={{ marginTop: '1rem', fontSize: '1rem', color: '#64748b' }}>Balance: ₹ 8,420.00</p>
                                </>
                            ) : type === 'balance' ? (
                                <>
                                    <span>Available Balance</span>
                                    <strong>₹ 8,420.00</strong>
                                </>
                            ) : (
                                <>
                                    <span>Mini Statement Retreived</span>
                                    <div style={styles.statementMini}>
                                        <div style={styles.stRow}><span>21/01/26 - POS TRF</span> <span style={{ color: '#ef4444' }}>-₹2,400</span></div>
                                        <div style={styles.stRow}><span>18/01/26 - NEFT CR</span> <span style={{ color: '#10b981' }}>+₹10,000</span></div>
                                        <div style={styles.stRow}><span>15/01/26 - ATM WDL</span> <span style={{ color: '#ef4444' }}>-₹500</span></div>
                                    </div>
                                </>
                            )}
                        </div>
                        <h3 style={styles.successTitle}>Transaction Complete</h3>
                        <p>Aadhaar ending in XXXX-{aadharNo?.slice(-4) || '9912'} verified.</p>
                        {type === 'withdraw' && (
                            <div style={styles.cashNotice}>
                                <Banknote size={24} />
                                <span>Please collect cash from the dispenser below.</span>
                            </div>
                        )}
                        <div style={styles.actions}>
                            <button onClick={() => setShowReceipt(true)} style={styles.receiptBtn}>Print Minified Receipt</button>
                            <button onClick={() => router.push('/')} style={styles.homeBtn}>Back to Home</button>
                        </div>
                    </div>
                )}
            </div>

            {showReceipt && (
                <Receipt
                    type={type === 'withdraw' ? "AEPS Cash Withdrawal" : "AEPS Balance Inquiry"}
                    transactionId={`AEPS-${Date.now()}`}
                    customerName="Verified Citizen"
                    amount={type === 'withdraw' ? Number(amount) : 0}
                    details={{
                        'Aadhaar Mask': `XXXX-XXXX-${aadharNo?.slice(-4) || '9912'}`,
                        'Bank Name': 'State Bank of India',
                        'Auth ID': 'NPCI-9921-X',
                        'LEDGER BALANCE': '₹ 8,420.00',
                        'Status': 'Success'
                    }}
                    onClose={() => setShowReceipt(false)}
                />
            )}

            <style jsx>{`
                @keyframes pulse { 0% { opacity: 0.5; transform: scale(0.95); } 50% { opacity: 1; transform: scale(1.05); } 100% { opacity: 0.5; transform: scale(0.95); } }
                .pulse { animation: pulse 1.5s infinite ease-in-out; }
            `}</style>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' },
    header: { display: 'flex', alignItems: 'center', gap: '2rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' },
    title: { fontSize: '2.5rem', fontWeight: 900, margin: 0 },
    card: { backgroundColor: 'white', padding: '3rem', borderRadius: '2rem', boxShadow: 'var(--card-shadow)', minHeight: '400px' },
    stepContainer: { display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', alignItems: 'center', textAlign: 'center' },
    typeGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '100%', marginTop: '1rem' },
    typeBtn: {
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
        padding: '2rem', borderRadius: '1.5rem', border: '2px solid #e2e8f0',
        backgroundColor: '#f8fafc', cursor: 'pointer', transition: 'all 0.2s',
        fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)'
    },
    hero: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
    inputGroup: { width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    input: { padding: '1.2rem', fontSize: '1.8rem', borderRadius: '0.8rem', border: '2px solid #ddd', backgroundColor: '#f9f9f9', textAlign: 'center', width: '100%' },
    bankGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', width: '100%' },
    bankBtn: {
        padding: '1rem', border: '2px solid #d1d5db', borderRadius: '1rem',
        backgroundColor: 'white', fontWeight: 'bold', display: 'flex',
        flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'
    },
    bankLogo: { width: '40px', height: '40px', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' },
    submitBtn: { width: '100%', padding: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer' },
    bioHeader: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' },
    scanBtn: { padding: '1rem 3rem', fontSize: '1.5rem', backgroundColor: '#2563eb', color: 'white', borderRadius: '1rem', border: 'none', fontWeight: 'bold', cursor: 'pointer' },
    shieldBox: { display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontSize: '0.9rem', fontWeight: 'bold' },
    success: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '2rem' },
    balanceSummary: { backgroundColor: '#eff6ff', border: '2px solid #bfdbfe', padding: '2rem', borderRadius: '1.5rem', width: '100%' },
    statementMini: { marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left', fontSize: '0.9rem' },
    stRow: { display: 'flex', justifyContent: 'space-between', padding: '0.5rem', borderBottom: '1px dashed #bfdbfe' },
    successTitle: { fontSize: '2.5rem', color: '#2563eb', margin: 0 },
    cashNotice: { display: 'flex', alignItems: 'center', gap: '1rem', color: '#059669', fontWeight: 'bold', fontSize: '1.2rem' },
    actions: { display: 'flex', gap: '1rem', flexDirection: 'column', width: '100%' },
    receiptBtn: { padding: '1rem', border: '2px solid #2563eb', color: '#2563eb', borderRadius: '1rem', fontWeight: 'bold', cursor: 'pointer' },
    homeBtn: { padding: '1rem', backgroundColor: '#333', color: 'white', borderRadius: '1rem', fontWeight: 'bold', cursor: 'pointer' }
};
