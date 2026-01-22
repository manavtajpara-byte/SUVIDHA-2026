'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Radio, Droplets, Wind, Lightbulb, Thermometer, ShieldCheck, Activity, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';

export default function SmartVillagePage() {
    const { language } = useAppState();
    const t = (translations as any)[language] || translations.en;
    const router = useRouter();

    const [sensors, setSensors] = useState([
        { id: 1, name: 'Water Purity', value: '98%', status: 'Normal', icon: <Droplets size={32} color="#3b82f6" />, action: 'Flush Valve' },
        { id: 2, name: 'Air Quality (AQI)', value: '42', status: 'Excellent', icon: <Wind size={32} color="#10b981" />, action: 'Sync Node' },
        { id: 3, name: 'Smart Street-lights', value: 'OFF', status: 'Day Mode', icon: <Lightbulb size={32} color="#facc15" />, action: 'Toggle Manual' },
        { id: 4, name: 'Soil PH Level', value: '6.8', status: 'Healthy', icon: <Thermometer size={32} color="#8b5cf6" />, action: 'Nutrient Dispense' },
    ]);

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setSensors(prev => prev.map(s => {
                if (s.id === 2) return { ...s, value: (Math.floor(Math.random() * 5) + 40).toString() };
                return s;
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h2 style={styles.title}>{t.smartVillage || 'Smart Village IoT'}</h2>
            </div>

            <div style={styles.statusBanner}>
                <Activity size={24} className="pulse" />
                <span>Live Feed from Gram Panchayat #4421 Node</span>
            </div>

            <div style={styles.grid}>
                {sensors.map(sensor => (
                    <div key={sensor.id} style={styles.card}>
                        <div style={styles.cardHeader}>
                            {sensor.icon}
                            <div style={styles.dot} />
                        </div>
                        <h4 style={styles.sensorName}>{sensor.name}</h4>
                        <div style={styles.valueRow}>
                            <span style={styles.value}>{sensor.value}</span>
                            <span style={{
                                ...styles.status,
                                backgroundColor: sensor.status === 'Normal' || sensor.status === 'Excellent' || sensor.status === 'Healthy' ? '#d1fae5' : '#fee2e2',
                                color: sensor.status === 'Normal' || sensor.status === 'Excellent' || sensor.status === 'Healthy' ? '#065f46' : '#991b1b'
                            }}>
                                {sensor.status}
                            </span>
                        </div>
                        <button style={styles.actionBtn}>
                            <Zap size={16} /> {sensor.action}
                        </button>
                    </div>
                ))}
            </div>

            <div style={styles.mapBox}>
                <h3>Interactive Infrastructure Map</h3>
                <div style={styles.mapPlaceholder}>
                    <div style={{ ...styles.mapPin, top: '20%', left: '30%' }} />
                    <div style={{ ...styles.mapPin, top: '50%', left: '70%' }} />
                    <div style={{ ...styles.mapPin, top: '80%', left: '40%' }} />
                    <p>Asset Tracking Active (34 Nodes Online)</p>
                </div>
            </div>

            <style jsx>{`
                @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
                .pulse { animation: pulse 2s infinite; }
            `}</style>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' },
    header: { display: 'flex', alignItems: 'center', gap: '2rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#059669' },
    title: { fontSize: '2.5rem', fontWeight: 900, margin: 0 },
    statusBanner: { backgroundColor: '#1e293b', color: '#10b981', padding: '1rem 2rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 'bold' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' },
    card: { backgroundColor: 'white', padding: '1.5rem', borderRadius: '1.5rem', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '1rem' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    dot: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' },
    sensorName: { margin: 0, fontSize: '1.1rem', color: '#64748b' },
    valueRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'bottom' },
    value: { fontSize: '2rem', fontWeight: 900 },
    status: { fontSize: '0.75rem', fontWeight: 'bold', padding: '0.25rem 0.5rem', borderRadius: '1rem' },
    mapBox: { backgroundColor: 'white', padding: '2rem', borderRadius: '2rem', boxShadow: 'var(--card-shadow)' },
    mapPlaceholder: { height: '300px', backgroundColor: '#f1f5f9', borderRadius: '1rem', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', border: '2px solid #e2e8f0' },
    mapPin: { position: 'absolute', width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '50%', border: '2px solid white', boxShadow: '0 0 10px rgba(0,0,0,0.5)' },
    actionBtn: {
        marginTop: '0.5rem',
        padding: '0.6rem',
        borderRadius: '0.8rem',
        border: 'none',
        backgroundColor: '#1e293b',
        color: '#10b981',
        fontWeight: 'bold',
        fontSize: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
        transition: 'all 0.2s'
    }
};
