'use client';

import React, { useState, useEffect } from 'react';
import AethelLayout from '@/components/AethelLayout';
import {
    Video, Mic, PhoneOff, FileText, CheckCircle,
    Printer, CreditCard, ShieldPlus, Activity,
    Upload, Search, Download, Clock, Heart,
    Thermometer, Zap, AlertCircle
} from 'lucide-react';
import { useAppState } from '@/context/StateContext';

export default function TeleHealthModern() {
    const { addToast } = useAppState();
    const [view, setView] = useState<'hub' | 'vault' | 'call'>('hub');
    const [step, setStep] = useState<'intro' | 'payment' | 'call' | 'post-call'>('intro');
    const [isProcessing, setIsProcessing] = useState(false);
    const [vitals, setVitals] = useState({ bpm: 72, temp: 98.6, spo2: 98 });

    const sidebarLinks = [
        { label: 'Health Center', icon: <Heart size={20} />, href: '/tele-health', active: view === 'hub' },
        { label: 'ABHA Vault', icon: <ShieldPlus size={20} />, href: '/tele-health/vault', active: view === 'vault' },
        { label: 'Action History', icon: <Activity size={20} />, href: '/transactions' },
    ];

    useEffect(() => {
        if (step === 'call') {
            const interval = setInterval(() => {
                setVitals(prev => ({
                    bpm: prev.bpm + (Math.random() > 0.5 ? 1 : -1),
                    temp: 98.6 + (Math.random() * 0.2),
                    spo2: 98 + (Math.random() > 0.8 ? 1 : 0)
                }));
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [step]);

    const handleStartCall = () => { setStep('payment'); setView('call'); };

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setStep('call');
        }, 1500);
    };

    return (
        <AethelLayout
            title="eSanjeevani Tele-Health"
            themeColor="#e11d48"
            themeSoft="#fff1f2"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.container}>
                {view === 'hub' && step === 'intro' && (
                    <div style={styles.hubGrid}>
                        <div style={styles.mainAction}>
                            <div style={styles.heroSection}>
                                <div style={styles.heroText}>
                                    <h2 style={styles.heroTitle}>Sovereign Digital OPD</h2>
                                    <p style={styles.heroSub}>Connect with AI-assisted government doctors in real-time. Subsidized for all citizens.</p>
                                    <button onClick={handleStartCall} style={styles.primeBtn}>
                                        <Video size={20} /> Request New Consultation
                                    </button>
                                </div>
                                <div style={styles.heroImg}>👩‍⚕️</div>
                            </div>
                            <div style={styles.recentFiles}>
                                <h3 style={styles.sectionTitle}>Upcoming Appointments</h3>
                                <div style={styles.emptyState}>
                                    <Clock size={40} color="#94a3b8" />
                                    <p>No pending appointments. You are currently in the live queue.</p>
                                </div>
                            </div>
                        </div>
                        <div style={styles.sideStats}>
                            <div style={styles.statCard}>
                                <div style={styles.statIcon}><ShieldPlus size={24} color="#e11d48" /></div>
                                <h4>ABHA Identity</h4>
                                <p style={styles.token}>99-2101-4421-9921</p>
                                <div style={styles.tokenBadge}>Verified</div>
                            </div>
                            <div style={styles.historyCard}>
                                <h4 style={styles.smTitle}>Recent Consultations</h4>
                                <div style={styles.miniList}>
                                    <div style={styles.miniItem}>
                                        <p style={styles.miniDate}>12 Jan 2026</p>
                                        <p style={styles.miniDoc}>Dr. R.K. Gupta</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {view === 'call' && (
                    <div style={styles.callInterface}>
                        {step === 'payment' && (
                            <div style={styles.cardBox}>
                                <div style={styles.payCard}>
                                    <CreditCard size={48} color="#2563eb" />
                                    <h3>Consulation Fee: ₹ 1.00</h3>
                                    <p style={styles.cardSub}>Standard subsidy rate for eSanjeevani portal.</p>
                                    <button onClick={handlePayment} style={styles.primeBtn} disabled={isProcessing}>
                                        {isProcessing ? 'Verifying Gateway...' : 'Pay with BharatQR'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 'call' && (
                            <div style={styles.activeCall}>
                                <div style={styles.remoteFeeds}>
                                    <div style={styles.doctorFeed}>
                                        <div style={styles.overlayDoc}>Dr. Anjali Sharma (MBBS)</div>
                                        <div style={styles.faceMoji}>👩‍⚕️</div>
                                    </div>
                                    <div style={styles.localFeed}>You</div>
                                </div>
                                <div style={styles.vitalsPanel}>
                                    <h4 style={styles.vTitle}>Live Vitals (Kiosk L3)</h4>
                                    <div style={styles.vGrid}>
                                        <div style={styles.vItem}><Activity size={18} color="#ef4444" /> <span>{vitals.bpm} BPM</span></div>
                                        <div style={styles.vItem}><Thermometer size={18} color="#f59e0b" /> <span>{vitals.temp.toFixed(1)}°F</span></div>
                                        <div style={styles.vItem}><Zap size={18} color="#06b6d4" /> <span>{vitals.spo2}% SpO2</span></div>
                                    </div>
                                </div>
                                <div style={styles.callControls}>
                                    <button style={styles.circBtn}><Mic size={24} /></button>
                                    <button style={styles.circBtn}><Video size={24} /></button>
                                    <button onClick={() => setStep('post-call')} style={{ ...styles.circBtn, background: '#ef4444' }}><PhoneOff size={24} /></button>
                                </div>
                            </div>
                        )}

                        {step === 'post-call' && (
                            <div style={styles.cardBox}>
                                <div style={styles.postCard}>
                                    <CheckCircle size={64} color="#10b981" />
                                    <h2>Session Complete</h2>
                                    <p style={styles.cardSub}>Your digital prescription has been sent to your ABHA Vault.</p>
                                    <div style={styles.prescBox}>
                                        <p><strong>Diagnosis:</strong> Mild Flu-like symptoms</p>
                                        <p><strong>Rx:</strong> Paracetamol 500mg, Rest</p>
                                    </div>
                                    <div style={styles.actionRow}>
                                        <button onClick={() => window.print()} style={styles.primeBtn}><Printer size={18} /> Print Record</button>
                                        <button onClick={() => { setStep('intro'); setView('hub'); }} style={styles.secondBtn}>Return to Hub</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AethelLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    hubGrid: { display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' },
    mainAction: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    heroSection: { background: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)', borderRadius: '32px', padding: '3rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    heroText: { flex: 1 },
    heroTitle: { fontSize: '2.5rem', fontWeight: 900, margin: 0 },
    heroSub: { fontSize: '1.1rem', opacity: 0.9, margin: '1rem 0 2rem', maxWidth: '500px' },
    primeBtn: { background: 'white', color: '#be123c', border: 'none', padding: '1rem 2rem', borderRadius: '16px', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' },
    secondBtn: { background: '#f1f5f9', color: '#475569', border: 'none', padding: '1rem 2rem', borderRadius: '16px', fontWeight: 800, cursor: 'pointer' },
    heroImg: { fontSize: '6rem' },
    recentFiles: { background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #f1f5f9' },
    sectionTitle: { margin: '0 0 1.5rem', fontSize: '1.25rem', fontWeight: 800 },
    emptyState: { padding: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: '#94a3b8' },
    sideStats: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    statCard: { background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #f1f5f9' },
    statIcon: { width: '48px', height: '48px', background: '#fff1f2', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' },
    token: { fontWeight: 800, color: '#1e293b', margin: '0.5rem 0' },
    tokenBadge: { background: '#f0fdf4', color: '#16a34a', padding: '0.25rem 0.6rem', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 800, display: 'inline-block' },
    historyCard: { background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #f1f5f9' },
    smTitle: { margin: '0 0 1rem', fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800 },
    miniList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    miniItem: { borderLeft: '3px solid #e11d48', paddingLeft: '1rem' },
    miniDate: { fontSize: '0.75rem', color: '#94a3b8', margin: 0 },
    miniDoc: { fontSize: '0.9rem', fontWeight: 700, margin: 0 },
    callInterface: { minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    activeCall: { width: '100%', maxWidth: '1000px', height: '640px', background: '#0f172a', borderRadius: '40px', position: 'relative', overflow: 'hidden' },
    remoteFeeds: { width: '100%', height: '100%', position: 'relative' },
    doctorFeed: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' },
    overlayDoc: { position: 'absolute', top: '30px', left: '30px', background: 'rgba(15,23,42,0.8)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '12px', backdropFilter: 'blur(8px)', fontWeight: 700 },
    faceMoji: { fontSize: '10rem' },
    localFeed: { position: 'absolute', bottom: '120px', right: '30px', width: '240px', height: '160px', background: '#1e293b', borderRadius: '20px', border: '2px solid rgba(255,255,255,0.1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' },
    vitalsPanel: { position: 'absolute', top: '30px', right: '30px', background: 'rgba(15,23,42,0.8)', padding: '1.25rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', color: 'white', width: '200px' },
    vTitle: { margin: '0 0 1rem', fontSize: '0.75rem', fontWeight: 800, opacity: 0.6, textTransform: 'uppercase' },
    vGrid: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    vItem: { display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, fontSize: '1.1rem' },
    callControls: { position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1.5rem' },
    circBtn: { width: '64px', height: '64px', borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' },
    cardBox: { width: '100%', maxWidth: '500px' },
    payCard: { background: 'white', padding: '3rem', borderRadius: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' },
    cardSub: { color: '#64748b', fontSize: '1rem', margin: 0 },
    postCard: { background: 'white', padding: '3rem', borderRadius: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' },
    prescBox: { background: '#f8fafc', padding: '1.5rem', borderRadius: '20px', width: '100%', textAlign: 'left' },
    actionRow: { display: 'flex', gap: '1rem', width: '100%', marginTop: '1.5rem' }
};
