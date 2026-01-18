'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import BigButton from '@/components/BigButton';
import { Bus, CreditCard, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TransportPage() {
    const { language } = useAppState();
    const t = translations[language];
    const router = useRouter();

    const services = [
        { label: t.busPass, icon: <Bus size={60} />, color: '#9333ea', link: '/transport/bus-pass' },
        { label: t.metroCard, icon: <CreditCard size={60} />, color: '#06b6d4', link: '/transport/metro-card' }
    ];

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}><ArrowLeft size={32} /></button>
                <h2 style={styles.title}>{t.transport}</h2>
            </div>
            <div style={styles.grid}>
                {services.map((service) => (
                    <a key={service.label} href={service.link} style={{ textDecoration: 'none' }}>
                        <BigButton label={service.label} icon={service.icon} color={service.color} onClick={() => { }} />
                    </a>
                ))}
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' },
    header: { display: 'flex', alignItems: 'center', gap: '2rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' },
    title: { fontSize: '3rem', fontWeight: 900, margin: 0, color: '#9333ea' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }
};
