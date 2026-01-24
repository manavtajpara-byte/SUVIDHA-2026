'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { useRouter } from 'next/navigation';
import { Locate, Droplets, ThermometerSun, Leaf, CheckCircle, Printer, ArrowLeft, LayoutDashboard, History, Search, ChevronRight, Sprout, Tractor, Wind, CloudRain, Microscope } from 'lucide-react';
import AethelLayout from '@/components/AethelLayout';

export default function AgriTechPage() {
    const { language, addToast } = useAppState();
    const t = translations[language] || translations.en;
    const router = useRouter();
    const [bookingStatus, setBookingStatus] = React.useState<'idle' | 'booking' | 'confirmed'>('idle');
    const [selectedService, setSelectedService] = React.useState('');

    const sidebarLinks = [
        { label: 'Agritech Hub', icon: <LayoutDashboard size={20} />, href: '/agri-tech', active: true },
        { label: 'Gram Bazaar', icon: <Sprout size={20} />, href: '/gram-bazaar' },
        { label: 'Soil Analysis', icon: <Microscope size={20} />, href: '/agri-tech/soil' },
    ];

    const stats = [
        { label: 'Soil Moisture', value: '42%', sub: 'Optimal Range', color: 'var(--theme-ocean)' },
        { label: 'Crop Yield est.', value: '+12%', sub: 'vs last season', color: '#16a34a' },
        { label: 'Next Harvest', value: '18 Days', sub: 'Wheat Cycle', color: 'var(--theme-terra)' }
    ];

    const handleBook = (service: string) => {
        setSelectedService(service);
        setBookingStatus('booking');
        setTimeout(() => {
            setBookingStatus('confirmed');
            addToast({ message: `Service ${service} booked successfully!`, type: 'success' });
        }, 1500);
    };

    if (bookingStatus === 'confirmed') {
        return (
            <AethelLayout title="Booking Confirmed" themeColor="var(--theme-terra)" themeSoft="var(--theme-terra-soft)" sidebarLinks={sidebarLinks}>
                <div style={styles.successContainer}>
                    <div style={styles.successIcon}><CheckCircle size={48} color="white" /></div>
                    <h2 style={styles.cardTitle}>Service Scheduled</h2>
                    <p style={styles.cardSub}>Booking Ref: #KA-99210-WHT</p>
                    <div style={styles.billBox}>
                        <div style={styles.billRow}><span>Farmer ID</span><strong>KA-99210</strong></div>
                        <div style={styles.billRow}><span>Selected Service</span><strong>{selectedService}</strong></div>
                        <div style={styles.billRow}><span>Arrival Time</span><strong>Tomorrow, 7:00 AM</strong></div>
                    </div>
                    <div style={styles.actionRow}>
                        <button onClick={() => window.print()} style={styles.outlineBtn}>Print Pass</button>
                        <button onClick={() => setBookingStatus('idle')} style={styles.primaryBtn}>Portal Home</button>
                    </div>
                </div>
            </AethelLayout>
        );
    }

    return (
        <AethelLayout
            title="Kisan Agri-Tech"
            themeColor="var(--theme-terra)"
            themeSoft="var(--theme-terra-soft)"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.grid}>
                {/* Stats Row */}
                <div style={styles.statsRow}>
                    {stats.map((stat, i) => (
                        <div key={i} style={styles.statCard}>
                            <p style={styles.statLabel}>{stat.label}</p>
                            <h3 style={{ ...styles.statValue, color: stat.color }}>{stat.value}</h3>
                            <p style={styles.statSub}>{stat.sub}</p>
                        </div>
                    ))}
                </div>

                <div style={styles.mainLayout}>
                    <div style={styles.contentSection}>
                        <div style={styles.card}>
                            <div style={styles.cardHead}>
                                <Microscope size={24} color="var(--theme-terra)" />
                                <h3 style={styles.cardTitle}>Dynamic Soil Appraisal</h3>
                            </div>
                            <div style={styles.soilGrid}>
                                <div style={styles.soilItem}>
                                    <div style={styles.soilLabel}>Nitrogen (N) <span style={styles.soilVal}>Medium</span></div>
                                    <div style={styles.bar}><div style={{ ...styles.barFill, width: '60%', background: '#f59e0b' }}></div></div>
                                </div>
                                <div style={styles.soilItem}>
                                    <div style={styles.soilLabel}>Phosphorus (P) <span style={styles.soilVal}>Low</span></div>
                                    <div style={styles.bar}><div style={{ ...styles.barFill, width: '30%', background: '#ef4444' }}></div></div>
                                </div>
                                <div style={styles.soilItem}>
                                    <div style={styles.soilLabel}>Potassium (K) <span style={styles.soilVal}>High</span></div>
                                    <div style={styles.bar}><div style={{ ...styles.barFill, width: '85%', background: '#16a34a' }}></div></div>
                                </div>
                            </div>
                            <div style={styles.alertBox}>
                                <Sprout size={20} color="#78350f" />
                                <p style={{ margin: 0, fontSize: '0.85rem' }}><strong>Advisor:</strong> Add 50kg/acre DAP fertilizer specifically for current cycle.</p>
                            </div>
                        </div>

                        <div style={styles.serviceSection}>
                            <h2 style={styles.sectionTitle}>Precision Services</h2>
                            <div style={styles.serviceGrid}>
                                <div style={styles.serviceCard}>
                                    <div style={styles.serviceIcon}><Tractor size={24} /></div>
                                    <div style={styles.serviceInfo}>
                                        <h4 style={styles.serviceTitle}>Kisan Drone Spray</h4>
                                        <p style={styles.serviceDesc}>₹400 / acre • Precision application</p>
                                    </div>
                                    <button onClick={() => handleBook('Drone Spray')} style={styles.bookBtn}>Book Now</button>
                                </div>
                                <div style={styles.serviceCard}>
                                    <div style={styles.serviceIcon}><Locate size={24} /></div>
                                    <div style={styles.serviceInfo}>
                                        <h4 style={styles.serviceTitle}>Satellite Insights</h4>
                                        <p style={styles.serviceDesc}>Real-time biomass & moisture maps</p>
                                    </div>
                                    <button onClick={() => router.push('/agri-tech/insights')} style={styles.bookBtn}>View Maps</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.sidePanel}>
                        <div style={styles.weatherCard}>
                            <CloudRain size={32} color="white" />
                            <h4 style={{ color: 'white', margin: '0.5rem 0 0.25rem' }}>Weather Alert</h4>
                            <p style={{ color: 'white', opacity: 0.9, fontSize: '0.8rem', margin: 0 }}>Scattered showers expected in 24h. Postpone harvesting.</p>
                        </div>

                        <div style={styles.marketCard}>
                            <h4 style={{ margin: '0 0 1rem', fontSize: '0.9rem' }}>Live Mandi Rates</h4>
                            <div style={styles.marketItem}><span>Wheat</span><strong style={{ color: '#16a34a' }}>₹ 2,275 ↑</strong></div>
                            <div style={styles.marketItem}><span>Rice (Basmati)</span><strong>₹ 4,100 -</strong></div>
                            <div style={styles.marketItem}><span>Corn</span><strong style={{ color: '#ef4444' }}>₹ 1,820 ↓</strong></div>
                        </div>
                    </div>
                </div>
            </div>
            {bookingStatus === 'booking' && (
                <div style={styles.loadingOverlay}>
                    <div style={styles.pulseIcon}><Tractor size={48} color="white" /></div>
                    <h2 style={{ color: 'white' }}>Deploying Assets...</h2>
                    <p style={{ color: 'white', opacity: 0.7 }}>Scheduling {selectedService} at your coordinates</p>
                </div>
            )}
        </AethelLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    grid: { display: 'flex', flexDirection: 'column', gap: '2.5rem' },
    statsRow: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' },
    statCard: { background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    statLabel: { fontSize: '0.85rem', fontWeight: 600, color: '#64748b', margin: 0 },
    statValue: { fontSize: '1.75rem', fontWeight: 800, margin: 0 },
    statSub: { fontSize: '0.75rem', color: '#94a3b8', margin: 0 },
    mainLayout: { display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' },
    contentSection: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    card: { background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    cardHead: { display: 'flex', alignItems: 'center', gap: '1rem' },
    cardTitle: { margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#1e293b' },
    soilGrid: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
    soilItem: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
    soilLabel: { display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: '#475569' },
    soilVal: { fontWeight: 800 },
    bar: { height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' },
    barFill: { height: '100%', borderRadius: '4px' },
    alertBox: { background: '#fef3c7', padding: '1.25rem', borderRadius: '16px', border: '1px solid #fde68a', display: 'flex', gap: '1rem', alignItems: 'center' },
    serviceSection: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    sectionTitle: { fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' },
    serviceGrid: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    serviceCard: { background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '1.25rem' },
    serviceIcon: { width: '56px', height: '56px', background: 'var(--theme-terra-soft)', color: 'var(--theme-terra)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    serviceInfo: { flex: 1 },
    serviceTitle: { margin: 0, fontSize: '1rem', fontWeight: 700, color: '#1e293b' },
    serviceDesc: { margin: 0, fontSize: '0.8rem', color: '#64748b' },
    bookBtn: { background: '#1e293b', color: 'white', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' },
    sidePanel: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    weatherCard: { background: 'linear-gradient(135deg, #78350f 0%, #451a03 100%)', borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column' },
    marketCard: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '24px', padding: '1.5rem' },
    marketItem: { display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#475569', padding: '0.75rem 0', borderBottom: '1px solid #f8fafc' },
    loadingOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', textAlign: 'center' },
    pulseIcon: { animation: 'pulse 2s infinite' },
    successContainer: { maxWidth: '500px', margin: '2rem auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    successIcon: { width: '80px', height: '80px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' },
    billBox: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '24px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' },
    billRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' },
    actionRow: { display: 'flex', gap: '1rem' },
    outlineBtn: { flex: 1, padding: '1rem', borderRadius: '16px', border: '1px solid #e2e8f0', background: 'white', fontWeight: 700, cursor: 'pointer' },
    primaryBtn: { flex: 1, padding: '1rem', borderRadius: '16px', border: 'none', background: 'var(--theme-terra)', color: 'white', fontWeight: 800, cursor: 'pointer' },
    cardSub: { fontSize: '0.9rem', color: '#64748b', margin: 0 }
};
