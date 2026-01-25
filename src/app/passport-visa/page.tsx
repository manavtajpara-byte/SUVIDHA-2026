'use client';

import React, { useState } from 'react';
import AethelLayout from '@/components/AethelLayout';
import {
    Globe, Plane, Search, CheckCircle, Calculator,
    ChevronRight, FileText, Calendar, Clock,
    MapPin, Wallet, ShieldCheck, Download
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GlobalConnectPage() {
    const router = useRouter();
    const [passportId, setPassportId] = useState('');
    const [country, setCountry] = useState('USA');
    const [amount, setAmount] = useState('1000');
    const [bookingStep, setBookingStep] = useState(1);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    const exchangeRates: Record<string, number> = { 'USA': 83.12, 'Europe': 90.45, 'Dubai': 22.63 };

    const sidebarLinks = [
        { label: 'Mobility Hub', icon: <Globe size={20} />, href: '/passport-visa', active: true },
        { label: 'Booking', icon: <Calendar size={20} />, href: '/passport-visa/booking' },
        { label: 'Documents', icon: <FileText size={20} />, href: '/passport-visa/documents' },
    ];

    const slots = ["09:00 AM", "10:30 AM", "01:30 PM", "03:00 PM", "04:30 PM"];

    const visaChecklists: Record<string, string[]> = {
        'Student Visa - Canada': [
            'Valid Passport (6+ months)',
            'Letter of Acceptance from DLI',
            'Financial Support Proof (GIC)',
            'Academic Transcripts (Notarized)',
            'Statement of Purpose (SOP)'
        ],
        'Work Visa - Dubai': [
            'Valid Passport',
            'Employment Contract',
            'Certificate of Good Conduct',
            'Medical Fitness Certificate',
            'Educational Attestations'
        ],
        'Tourist Visa - USA': [
            'Passport',
            'Form DS-160 Confirmation',
            'Interview Appointment Letter',
            'Financial proof for stay',
            'Travel Itinerary'
        ]
    };

    const [selectedVisa, setSelectedVisa] = useState('Student Visa - Canada');

    return (
        <AethelLayout
            title="International Mobility Hub"
            themeColor="var(--theme-indigo)"
            themeSoft="var(--theme-indigo-soft)"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.container}>
                <div style={styles.grid}>
                    {/* Passport Tracker */}
                    <div style={styles.card}>
                        <div style={styles.cardHeader}>
                            <div style={styles.iconBox}><FileText size={24} /></div>
                            <div>
                                <h3 style={styles.cardTitle}>Passport Seva Tracker</h3>
                                <p style={styles.cardSub}>Track your File Number application</p>
                            </div>
                        </div>
                        <div style={styles.formGroup}>
                            <input
                                placeholder="VR002XXXX..."
                                style={styles.input}
                                value={passportId}
                                onChange={(e) => setPassportId(e.target.value)}
                            />
                            <button style={styles.primaryBtn}>Track</button>
                        </div>
                        {passportId.length > 5 && (
                            <div style={styles.statusBox}>
                                <div style={styles.statusRow}>
                                    <span style={styles.statusLabel}>Verification Status</span>
                                    <span style={{ color: '#16a34a', fontWeight: 800 }}>Complete</span>
                                </div>
                                <div style={styles.progressLine}><div style={{ width: '75%', background: 'var(--theme-indigo)', height: '100%' }}></div></div>
                                <p style={styles.statusDesc}>Passport is currently under printing at SPP Noida.</p>
                            </div>
                        )}
                    </div>

                    {/* Appointment Booking */}
                    <div style={styles.card}>
                        <div style={styles.cardHeader}>
                            <div style={{ ...styles.iconBox, background: '#f0fdf4', color: '#16a34a' }}><Calendar size={24} /></div>
                            <div>
                                <h3 style={styles.cardTitle}>PSK Appointment</h3>
                                <p style={styles.cardSub}>Book slots at nearest Passport Seva Kendra</p>
                            </div>
                        </div>

                        <div style={styles.slotGrid}>
                            {slots.map(slot => (
                                <button
                                    key={slot}
                                    onClick={() => setSelectedSlot(slot)}
                                    style={{
                                        ...styles.slotBtn,
                                        background: selectedSlot === slot ? 'var(--theme-indigo)' : 'white',
                                        color: selectedSlot === slot ? 'white' : '#1e293b',
                                        borderColor: selectedSlot === slot ? 'var(--theme-indigo)' : '#e2e8f0'
                                    }}
                                >
                                    <Clock size={14} /> {slot}
                                </button>
                            ))}
                        </div>
                        <button style={{ ...styles.primaryBtn, width: '100%', marginTop: '1rem' }} disabled={!selectedSlot}>
                            {selectedSlot ? `Confirm Slot for tomorrow at ${selectedSlot}` : 'Select a Slot'}
                        </button>
                    </div>

                    {/* Visa Helper */}
                    <div style={{ ...styles.card, gridColumn: 'span 2' }}>
                        <div style={styles.visaHeader}>
                            <div style={styles.cardHeader}>
                                <div style={{ ...styles.iconBox, background: '#eff6ff', color: '#2563eb' }}><Plane size={24} /></div>
                                <div>
                                    <h3 style={styles.cardTitle}>Global Visa Checklist</h3>
                                    <p style={styles.cardSub}>Required documentation by category</p>
                                </div>
                            </div>
                            <select
                                style={styles.select}
                                value={selectedVisa}
                                onChange={(e) => setSelectedVisa(e.target.value)}
                            >
                                {Object.keys(visaChecklists).map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                        </div>

                        <div style={styles.checklist}>
                            {visaChecklists[selectedVisa].map((item, i) => (
                                <div key={i} style={styles.checkItem}>
                                    <div style={styles.checkCircle}><CheckCircle size={16} color="#16a34a" /></div>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                        <button style={styles.downloadBtn}><Download size={18} /> Download Verified Checklist (PDF)</button>
                    </div>

                    {/* Trip Budgeter */}
                    <div style={{ ...styles.card, gridColumn: 'span 2' }}>
                        <div style={styles.cardHeader}>
                            <div style={{ ...styles.iconBox, background: '#fff7ed', color: '#ea580c' }}><Calculator size={24} /></div>
                            <div>
                                <h3 style={styles.cardTitle}>Sovereign Trip Budgeter</h3>
                                <p style={styles.cardSub}>Live currency conversion for world travel</p>
                            </div>
                        </div>
                        <div style={styles.converterGrid}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Amount in INR</label>
                                <div style={styles.inputWrapper}>
                                    <Wallet size={18} color="#94a3b8" />
                                    <input value={amount} onChange={(e) => setAmount(e.target.value)} style={styles.input} type="number" />
                                </div>
                            </div>
                            <div style={styles.arrow}><ChevronRight size={32} color="#cbd5e1" /></div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Destination Currency</label>
                                <select onChange={(e) => setCountry(e.target.value)} value={country} style={styles.select}>
                                    <option value="USA">United States (USD)</option>
                                    <option value="Europe">European Union (EUR)</option>
                                    <option value="Dubai">United Arab Emirates (AED)</option>
                                </select>
                            </div>
                            <div style={styles.resultBox}>
                                <p style={styles.resLabel}>Current Value</p>
                                <h2 style={styles.resVal}>{(Number(amount) / exchangeRates[country]).toFixed(2)} {country === 'USA' ? '$' : country === 'Europe' ? '€' : 'DHS'}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AethelLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' },
    card: { background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' },
    cardHeader: { display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' },
    iconBox: { width: '48px', height: '48px', borderRadius: '14px', background: 'var(--theme-indigo-soft)', color: 'var(--theme-indigo)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    cardTitle: { fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', margin: 0 },
    cardSub: { fontSize: '0.85rem', color: '#64748b', margin: '0.2rem 0 0' },
    formGroup: { display: 'flex', gap: '0.75rem' },
    input: { flex: 1, padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', background: '#f8fafc' },
    primaryBtn: { background: 'var(--theme-indigo)', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' },
    statusBox: { marginTop: '1.5rem', padding: '1.25rem', background: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f5f9' },
    statusRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' },
    statusLabel: { fontSize: '0.85rem', color: '#64748b' },
    progressLine: { height: '8px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden', marginBottom: '0.75rem' },
    statusDesc: { fontSize: '0.8rem', color: '#64748b', margin: 0 },
    slotGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' },
    slotBtn: { padding: '0.6rem', borderRadius: '10px', border: '1px solid #e2e8f0', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', transition: 'all 0.2s' },
    visaHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    select: { padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: 700, outline: 'none' },
    checklist: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '24px', marginBottom: '1.5rem' },
    checkItem: { display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#475569', fontWeight: 600 },
    checkCircle: { display: 'flex', alignItems: 'center' },
    downloadBtn: { width: '100%', padding: '1rem', borderRadius: '16px', background: '#1e293b', color: 'white', border: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', cursor: 'pointer' },
    converterGrid: { display: 'grid', gridTemplateColumns: '1fr auto 1.2fr 1fr', gap: '1.5rem', alignItems: 'center' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    label: { fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' },
    inputWrapper: { display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f8fafc', padding: '0 1rem', borderRadius: '12px', border: '1px solid #e2e8f0' },
    arrow: { display: 'flex', alignItems: 'center' },
    resultBox: { background: '#f0fdf4', padding: '1rem 1.5rem', borderRadius: '20px', border: '1px solid #dcfce7' },
    resLabel: { margin: 0, fontSize: '0.7rem', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase' },
    resVal: { margin: '0.2rem 0 0', color: '#15803d', fontSize: '1.5rem', fontWeight: 900 }
};
