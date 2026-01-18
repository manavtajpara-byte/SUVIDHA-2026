'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { ArrowLeft, Phone, AlertTriangle, Flame } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EmergencyPage() {
    const { language } = useAppState();
    const t = translations[language];
    const router = useRouter();
    const [calling, setCalling] = useState<string | null>(null);

    const emergencyServices = [
        { label: t.police, number: '100', icon: <AlertTriangle size={80} />, color: '#3b82f6' },
        { label: t.ambulance, number: '108', icon: <Phone size={80} />, color: '#ef4444' },
        { label: t.fireService, number: '101', icon: <Flame size={80} />, color: '#f59e0b' }
    ];

    const handleCall = (service: string, number: string) => {
        setCalling(service);
        setTimeout(() => {
            alert(`Connecting to ${service} (${number})...\nThis is a simulation. In production, this would initiate a real call.`);
            setCalling(null);
        }, 2000);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}><ArrowLeft size={32} /></button>
                <h2 style={styles.title}>{t.emergency}</h2>
            </div>

            <div style={styles.alert}>
                <AlertTriangle size={40} color="#ef4444" />
                <p><strong>Emergency Services</strong><br />Tap any service below to connect immediately</p>
            </div>

            <div style={styles.grid}>
                {emergencyServices.map((service) => (
                    <button
                        key={service.label}
                        onClick={() => handleCall(service.label, service.number)}
                        disabled={calling !== null}
                        style={{
                            ...styles.emergencyBtn,
                            backgroundColor: service.color,
                            opacity: calling && calling !== service.label ? 0.5 : 1
                        }}
                    >
                        {service.icon}
                        <h3 style={styles.serviceLabel}>{service.label}</h3>
                        <div style={styles.numberBadge}>Call {service.number}</div>
                        {calling === service.label && <div style={styles.calling}>Connecting...</div>}
                    </button>
                ))}
            </div>

            <div style={styles.info}>
                <p><strong>Important:</strong> These are direct emergency hotlines. Use only in case of genuine emergencies.</p>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' },
    header: { display: 'flex', alignItems: 'center', gap: '2rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' },
    title: { fontSize: '3rem', fontWeight: 900, margin: 0, color: '#ef4444' },
    alert: { display: 'flex', alignItems: 'center', gap: '1.5rem', backgroundColor: '#fef2f2', border: '2px solid #ef4444', padding: '1.5rem', borderRadius: '1.5rem', fontSize: '1.2rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' },
    emergencyBtn: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', borderRadius: '2rem', border: 'none', color: 'white', cursor: 'pointer', minHeight: '300px', gap: '1.5rem', transition: 'transform 0.2s', position: 'relative' },
    serviceLabel: { fontSize: '2rem', fontWeight: 900, margin: 0 },
    numberBadge: { backgroundColor: 'rgba(255,255,255,0.3)', padding: '0.75rem 2rem', borderRadius: '2rem', fontSize: '1.5rem', fontWeight: 'bold' },
    calling: { position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'rgba(0,0,0,0.5)', padding: '0.5rem 1rem', borderRadius: '1rem', fontSize: '1rem' },
    info: { backgroundColor: '#f1f5f9', padding: '1.5rem', borderRadius: '1rem', textAlign: 'center', fontSize: '1.1rem' }
};
