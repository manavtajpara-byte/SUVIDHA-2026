'use client';

import React, { useState } from 'react';
import { Locate, Calendar, Map, CheckCircle, ArrowLeft, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppState } from '@/context/StateContext';

export default function DroneBookingPage() {
    const router = useRouter();
    const { addToast } = useAppState();
    const [step, setStep] = useState(1);
    const [area, setArea] = useState('');
    const [service, setService] = useState('');

    const services = [
        { id: 'spray', name: 'Pesticide Spraying', rate: 400, desc: 'High-precision liquid spraying' },
        { id: 'survey', name: 'Crop Health Survey', rate: 250, desc: 'Multispectral analysis for disease detection' },
        { id: 'sow', name: 'Seed Sowing', rate: 600, desc: 'Automated seed distribution' },
    ];

    const handleConfirm = () => {
        if (!area || !service) {
            addToast({ message: 'Please select service and enter area', type: 'error' });
            return;
        }
        setStep(2);
        setTimeout(() => setStep(3), 2000);
    };

    if (step === 3) {
        return (
            <div style={styles.container}>
                <div style={styles.successCard}>
                    <CheckCircle size={80} color="#16a34a" />
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Drone Reserved! 🚁</h2>
                    <p style={{ color: '#64748b', marginBottom: '2rem' }}>Our team will reach your farm on the scheduled date.</p>

                    <div style={styles.bookingDetails}>
                        <div style={styles.detailRow}><span>Booking ID:</span> <strong>#DRN-552</strong></div>
                        <div style={styles.detailRow}><span>Date:</span> <strong>28 Jan 2026</strong></div>
                        <div style={styles.detailRow}><span>Service:</span> <strong>{services.find(s => s.id === service)?.name}</strong></div>
                        <div style={styles.detailRow}><span>Total Cost:</span> <strong style={{ color: '#16a34a' }}>₹ {Number(area) * (services.find(s => s.id === service)?.rate || 0)}</strong></div>
                    </div>

                    <button onClick={() => router.push('/agri-tech')} style={styles.primaryBtn}>
                        Return to Agri-Tech Hub
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h1 style={styles.title}>Drone Booking 🚁</h1>
            </div>

            <div style={styles.layout}>
                <div style={styles.formSection}>
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>1. Choose Service</h3>
                        <div style={styles.serviceGrid}>
                            {services.map(s => (
                                <div
                                    key={s.id}
                                    style={{
                                        ...styles.serviceCard,
                                        borderColor: service === s.id ? '#16a34a' : '#e2e8f0',
                                        backgroundColor: service === s.id ? '#f0fdf4' : 'white'
                                    }}
                                    onClick={() => setService(s.id)}
                                >
                                    <h4 style={{ margin: '0 0 0.25rem 0' }}>{s.name}</h4>
                                    <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>{s.desc}</p>
                                    <span style={styles.rate}>₹{s.rate} / acre</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>2. Farm Details</h3>
                        <div style={styles.inputGroup}>
                            <label>Farm Area (Acres)</label>
                            <input
                                type="number"
                                placeholder="Enter area..."
                                style={styles.input}
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div style={styles.summarySection}>
                    <div style={styles.summaryCard}>
                        <h3 style={{ marginTop: 0 }}>Booking Summary</h3>
                        <div style={styles.summaryRow}>
                            <span>Rate per Acre</span>
                            <span>₹ {services.find(s => s.id === service)?.rate || 0}</span>
                        </div>
                        <div style={styles.summaryRow}>
                            <span>Area</span>
                            <span>{area || 0} Acres</span>
                        </div>
                        <div style={styles.divider}></div>
                        <div style={styles.totalRow}>
                            <span>Total Payable</span>
                            <span>₹ {Number(area) * (services.find(s => s.id === service)?.rate || 0)}</span>
                        </div>

                        <div style={styles.infoAlert}>
                            <Info size={16} />
                            <span>Fuel and operator costs are included.</span>
                        </div>

                        <button onClick={handleConfirm} style={styles.bookBtn} disabled={step === 2}>
                            {step === 2 ? 'Processing...' : 'Confirm Booking'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '1000px', margin: '0 auto' },
    header: { display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#16a34a' },
    title: { fontSize: '2.5rem', fontWeight: 900, color: '#1e293b', margin: 0 },
    layout: { display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' },
    formSection: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    card: { background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' },
    cardTitle: { marginTop: 0, marginBottom: '1.5rem', fontSize: '1.2rem', color: '#475569' },
    serviceGrid: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    serviceCard: { padding: '1.25rem', borderRadius: '16px', border: '2px solid transparent', cursor: 'pointer', transition: 'all 0.2s' },
    rate: { display: 'block', marginTop: '0.5rem', fontWeight: 'bold', color: '#16a34a' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    input: { padding: '1rem', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '1.1rem' },
    summarySection: { height: 'fit-content', position: 'sticky', top: '2rem' },
    summaryCard: { background: 'white', padding: '2rem', borderRadius: '24px', border: '2px solid #16a34a', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' },
    summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: '#64748b' },
    divider: { height: '1px', background: '#e2e8f0', margin: '1rem 0' },
    totalRow: { display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.25rem', color: '#1e293b', marginBottom: '1.5rem' },
    infoAlert: { display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', fontSize: '0.8rem', color: '#64748b', marginBottom: '1.5rem' },
    bookBtn: { width: '100%', padding: '1.25rem', borderRadius: '12px', background: '#16a34a', color: 'white', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(22, 163, 74, 0.3)' },

    successCard: { textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '32px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' },
    bookingDetails: { background: '#f8fafc', padding: '2rem', borderRadius: '16px', margin: '2rem 0', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    detailRow: { display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e2e8f0', paddingBottom: '0.5rem' },
    primaryBtn: { padding: '1rem 2rem', background: '#1e293b', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }
};
