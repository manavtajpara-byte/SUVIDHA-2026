'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { ArrowLeft, AlertTriangle, ShieldAlert, Phone, MapPin, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useVirtualKeyboard } from '@/hooks/useVirtualKeyboard';
import VirtualKeyboard from '@/components/VirtualKeyboard';

export default function GasLeakReportPage() {
    const { language } = useAppState();
    const t = translations[language];
    const router = useRouter();
    const { isOpen, openKeyboard, closeKeyboard, handleInput, handleDelete, values } = useVirtualKeyboard();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h2 style={styles.title}>Emergency Leak Report</h2>
            </div>

            <div style={styles.card}>
                {!submitted ? (
                    <div style={styles.stepContainer}>
                        <div style={styles.warningBox}>
                            <AlertTriangle size={64} />
                            <div>
                                <h3 style={styles.warningTitle}>IMMEDIATE ACTION REQUIRED</h3>
                                <p style={styles.warningText}>If you smell gas, open all windows, don't use electric switches, and leave the area immediately.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} style={styles.form}>
                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Current Location (Auto-detected)</label>
                                <div style={styles.locationField}>
                                    <MapPin size={24} />
                                    <span>Near Main Street, Block B, Sector 4</span>
                                </div>
                            </div>
                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Emergency Mobile Number</label>
                                <input
                                    readOnly
                                    value={values.mergencyMobile || ''}
                                    onFocus={() => openKeyboard('mergencyMobile')}
                                    style={styles.input}
                                    placeholder="Enter your number"
                                />
                            </div>
                            <button type="submit" style={styles.reportBtn} disabled={!values.mergencyMobile}>
                                <Send size={24} />
                                SUBMIT EMERGENCY ALERT
                            </button>
                        </form>

                        <div style={styles.callBox}>
                            <p>OR CALL EMERGENCY HELPLINE</p>
                            <a href="tel:1906" style={styles.phoneLink}>
                                <Phone size={32} />
                                1906
                            </a>
                        </div>
                    </div>
                ) : (
                    <div style={styles.success}>
                        <ShieldAlert size={120} color="#ef4444" />
                        <h3 style={{ ...styles.successTitle, color: '#ef4444' }}>EMERGENCY ALERT SENT!</h3>
                        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Our rapid response team is on the way.</p>
                        <p>Response ID: GAS-EM-7721</p>
                        <div style={styles.statusLive}>
                            <div style={styles.pulse} />
                            <span>Team Dispatched - ETA 8 mins</span>
                        </div>
                        <button onClick={() => router.push('/')} style={styles.homeBtn}>Back to Dashboard</button>
                    </div>
                )}
            </div>

            {isOpen && (
                <VirtualKeyboard
                    onInput={handleInput}
                    onDelete={handleDelete}
                    onClose={closeKeyboard}
                />
            )}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' },
    header: { display: 'flex', alignItems: 'center', gap: '2rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' },
    title: { fontSize: '2.5rem', fontWeight: 900, margin: 0, color: '#ef4444' },
    card: { backgroundColor: 'white', padding: '3rem', borderRadius: '2rem', boxShadow: '0 25px 50px -12px rgba(239, 68, 68, 0.25)', minHeight: '400px' },
    stepContainer: { display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' },
    warningBox: { backgroundColor: '#fef2f2', borderLeft: '8px solid #ef4444', padding: '1.5rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#991b1b' },
    warningTitle: { margin: 0, fontSize: '1.4rem', fontWeight: 900 },
    warningText: { margin: '4px 0 0', fontSize: '1rem' },
    form: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    fieldGroup: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    label: { fontSize: '1.2rem', fontWeight: 'bold', color: '#444' },
    locationField: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem', backgroundColor: '#f8fafc', borderRadius: '0.8rem', border: '1px solid #e2e8f0', color: '#475569', fontWeight: 'bold' },
    input: { padding: '1.2rem', fontSize: '1.5rem', borderRadius: '0.8rem', border: '2px solid #ddd', backgroundColor: '#f9f9f9', textAlign: 'center' },
    reportBtn: { padding: '1.5rem', fontSize: '1.6rem', fontWeight: 900, backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.4)' },
    callBox: { textAlign: 'center', marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '2rem' },
    phoneLink: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontSize: '3rem', fontWeight: 900, color: '#ef4444', textDecoration: 'none', marginTop: '1rem' },
    success: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' },
    successTitle: { fontSize: '2.5rem', fontWeight: 900, margin: 0 },
    statusLive: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 2rem', backgroundColor: '#fef2f2', color: '#ef4444', borderRadius: '2rem', fontWeight: 900, fontSize: '1.1rem' },
    pulse: { width: '12px', height: '12px', backgroundColor: '#ef4444', borderRadius: '50%', animation: 'pulse-red 1.5s infinite' },
    homeBtn: { marginTop: '2.5rem', padding: '1rem 3rem', fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer' }
};
