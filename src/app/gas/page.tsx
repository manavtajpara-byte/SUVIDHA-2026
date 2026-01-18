'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import BigButton from '@/components/BigButton';
import { Receipt, FilePlus, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function GasPage() {
    const { language } = useAppState();
    const t = translations[language];
    const router = useRouter();

    const services = [
        {
            label: t.payBill,
            icon: <Receipt size={60} />,
            color: 'var(--gas)',
            link: '/gas/pay'
        },
        {
            label: t.newConnection,
            icon: <FilePlus size={60} />,
            color: 'var(--gas)',
            link: '/gas/new'
        },
        {
            label: "Report Gas Leak",
            icon: <AlertTriangle size={60} />,
            color: '#ef4444',
            link: '/gas/outage'
        }
    ];

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                    <span>{t.home}</span>
                </button>
                <h2 style={styles.title}>{t.gas}</h2>
            </div>

            <div style={styles.grid}>
                {services.map((service) => (
                    <Link key={service.label} href={service.link} style={{ textDecoration: 'none' }}>
                        <BigButton
                            label={service.label}
                            icon={service.icon}
                            color={service.color}
                            onClick={() => { }}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        marginBottom: '1rem',
    },
    backBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'white',
        border: '2px solid var(--primary)',
        padding: '1rem 2rem',
        borderRadius: '1rem',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        color: 'var(--primary)',
    },
    title: {
        fontSize: '3rem',
        fontWeight: 900,
        color: 'var(--gas)',
        margin: 0,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
    }
};
