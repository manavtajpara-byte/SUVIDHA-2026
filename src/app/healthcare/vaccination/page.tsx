'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { ArrowLeft, CheckCircle2, Shield, Calendar, User, Search, MapPin, LayoutDashboard, History } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Receipt from '@/components/Receipt';
import AethelLayout from '@/components/AethelLayout';

export default function VaccinationPage() {
    const { language } = useAppState();
    const t = translations[language] || translations.en;
    const router = useRouter();
    const [aadharNo, setAadharNo] = useState('');
    const [step, setStep] = useState(1); // 1: Search, 2: Slot Selection, 3: Success
    const [showReceipt, setShowReceipt] = useState(false);

    const sidebarLinks = [
        { label: 'Health Center', icon: <LayoutDashboard size={20} />, href: '/healthcare' },
        { label: 'Vaccination', icon: <Shield size={20} />, href: '/healthcare/vaccination', active: true },
        { label: 'Action History', icon: <History size={20} />, href: '/transactions' },
    ];

    const centers = [
        { id: 'C1', name: 'District General Hospital', distance: '1.2 km', available: true },
        { id: 'C2', name: 'Primary Health Center - South', distance: '3.5 km', available: true },
        { id: 'C3', name: 'Apollo Clinics (Private)', distance: '4.8 km', available: true },
    ];

    const [selectedCenter, setSelectedCenter] = useState(centers[0]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (aadharNo) setStep(2);
    };

    return (
        <AethelLayout
            title="Vaccination Center"
            themeColor="var(--theme-ruby)"
            themeSoft="var(--theme-ruby-soft)"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <button onClick={() => step === 1 ? router.back() : setStep(step - 1)} style={styles.backBtn}>
                        <ArrowLeft size={32} />
                    </button>
                    <h2 style={styles.title}>Slot Booking</h2>
                </div>

                <div style={styles.card}>
                    {step === 1 && (
                        <form onSubmit={handleSearch} style={styles.form}>
                            <div style={styles.promoHeader}>
                                <Shield size={60} color="#059669" />
                                <p>Book your 1st, 2nd or Precautionary Dose</p>
                            </div>
                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Aadhar Number / CoWIN Registered ID</label>
                                <input
                                    value={aadharNo}
                                    onChange={(e) => setAadharNo(e.target.value)}
                                    placeholder="XXXX-XXXX-XXXX"
                                    style={styles.input}
                                />
                            </div>
                            <button type="submit" style={styles.submitBtn} disabled={!aadharNo}>
                                Find Centers Near You
                            </button>
                        </form>
                    )}

                    {step === 2 && (
                        <div style={styles.stepContainer}>
                            <div style={styles.userBadge}>
                                <User size={24} />
                                <span>Hi, <strong>Karan Verma</strong> (Eligible for Dose 2)</span>
                            </div>
                            <h3 style={styles.subTitle}>Select Vaccination Center</h3>
                            <div style={styles.centerList}>
                                {centers.map(center => (
                                    <button
                                        key={center.id}
                                        onClick={() => setSelectedCenter(center)}
                                        style={{
                                            ...styles.centerBtn,
                                            borderColor: selectedCenter.id === center.id ? '#059669' : '#e2e8f0',
                                            backgroundColor: selectedCenter.id === center.id ? '#f0fdf4' : 'white'
                                        }}
                                    >
                                        <div style={styles.centerInfo}>
                                            <MapPin size={20} />
                                            <div>
                                                <strong style={{ display: 'block' }}>{center.name}</strong>
                                                <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>{center.distance} away</span>
                                            </div>
                                        </div>
                                        <span style={styles.availBadge}>Available</span>
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => setStep(3)} style={styles.submitBtnGreen}>Confirm Slot for Tomorrow</button>
                        </div>
                    )}

                    {step === 3 && (
                        <div style={styles.success}>
                            <CheckCircle2 size={120} color="#059669" />
                            <h3 style={{ ...styles.successTitle, color: '#059669' }}>Slot Booked!</h3>
                            <p>Appointment ID: VAC-REF-44201</p>
                            <div style={styles.receiptActions}>
                                <button onClick={() => setShowReceipt(true)} style={{ ...styles.receiptBtn, borderColor: '#059669', color: '#059669' }}>Booking Receipt</button>
                                <button onClick={() => router.push('/')} style={styles.homeBtn}>Back to Home</button>
                            </div>
                        </div>
                    )}
                </div>

                {showReceipt && (
                    <Receipt
                        type="vaccination-booking"
                        transactionId="VAC-REF-44201"
                        customerName="Karan Verma"
                        details={{
                            'Beneficiary ID': aadharNo || 'XXXX-XXXX-XXXX',
                            'Vaccine Dose': 'Dose 2 (Covishield)',
                            'Center Name': selectedCenter.name,
                            'Slot Date': '20 Jan 2026',
                            'Slot Time': '10:00 AM - 12:00 PM'
                        }}
                        onClose={() => setShowReceipt(false)}
                    />
                )}
            </div>
        </AethelLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' },
    header: { display: 'flex', alignItems: 'center', gap: '2rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' },
    title: { fontSize: '2.5rem', fontWeight: 900, margin: 0 },
    card: { backgroundColor: 'white', padding: '3rem', borderRadius: '2rem', boxShadow: 'var(--card-shadow)', minHeight: '400px' },
    form: { display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' },
    promoHeader: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', fontSize: '1.2rem', fontWeight: 'bold', color: '#059669' },
    fieldGroup: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    label: { fontSize: '1.2rem', fontWeight: 'bold', color: '#444' },
    input: { padding: '1.2rem', fontSize: '1.5rem', borderRadius: '0.8rem', border: '2px solid #ddd', backgroundColor: '#f9f9f9', textAlign: 'center' },
    submitBtn: { padding: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold', backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer' },
    submitBtnGreen: { padding: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer' },
    stepContainer: { display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' },
    userBadge: { backgroundColor: '#f0fdf4', color: '#059669', padding: '1rem', borderRadius: '1rem', border: '1px solid #bcf0da', display: 'flex', alignItems: 'center', gap: '1rem' },
    subTitle: { fontSize: '1.3rem', fontWeight: 800 },
    centerList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    centerBtn: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem', borderRadius: '1rem', border: '2px solid #e2e8f0', cursor: 'pointer', textAlign: 'left' },
    centerInfo: { display: 'flex', alignItems: 'center', gap: '1rem' },
    availBadge: { backgroundColor: '#d1fae5', color: '#065f46', fontSize: '0.8rem', fontWeight: 'bold', padding: '0.4rem 0.8rem', borderRadius: '2rem' },
    success: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' },
    successTitle: { fontSize: '2.5rem', fontWeight: 900, margin: 0 },
    receiptActions: { display: 'flex', gap: '1rem', marginTop: '1rem' },
    receiptBtn: { padding: '1rem 2rem', fontSize: '1.2rem', fontWeight: 'bold', border: '2px solid', borderRadius: '1rem', background: 'none', cursor: 'pointer' },
    homeBtn: { marginTop: '1rem', padding: '1rem 3rem', fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '1rem', cursor: 'pointer' }
};
