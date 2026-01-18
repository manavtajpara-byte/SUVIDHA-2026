'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import BigButton from '@/components/BigButton';
import { Syringe, Heart, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HealthcarePage() {
    const { language } = useAppState();
    const t = translations[language];
    const router = useRouter();

    const services = [
        { label: t.vaccination, icon: <Syringe size={60} />, color: '#ec4899', link: '/healthcare/vaccination' },
        { label: t.healthCard, icon: <Heart size={60} />, color: '#f43f5e', link: '/healthcare/health-card' }
    ];

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}><ArrowLeft size={32} /></button>
                <h2 style={styles.title}>{t.healthcare}</h2>
            </div>
            <div style={styles.grid}>
                {services.map((service) => (
                    <BigButton
                        key={service.label}
                        label={service.label}
                        icon={service.icon}
                        color={service.color}
                        onClick={() => router.push(service.link)}
                    />
                ))}
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' },
    header: { display: 'flex', alignItems: 'center', gap: '2rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' },
    title: { fontSize: '3rem', fontWeight: 900, margin: 0, color: '#ec4899' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }
};
