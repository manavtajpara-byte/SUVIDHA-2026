'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { MapPin, Phone, ExternalLink, Hospital, Landmark, ShieldCheck, Map } from 'lucide-react';

export default function NearbyFacilities() {
    const { language } = useAppState();
    const t = translations[language] || translations.en;

    const facilities = [
        {
            name: "District Civil Hospital",
            type: "Healthcare",
            distance: "1.2 km",
            icon: <Hospital size={24} />,
            phone: "011-23456789",
            color: 'var(--healthcare)'
        },
        {
            name: "Central Police Station",
            type: "Security",
            distance: "0.8 km",
            icon: <ShieldCheck size={24} />,
            phone: "100 / 112",
            color: 'var(--emergency)'
        },
        {
            name: "Muncipal Corporation Office",
            type: "Government",
            distance: "2.5 km",
            icon: <Landmark size={24} />,
            phone: "011-98765432",
            color: 'var(--municipal)'
        },
        {
            name: "Public Library & Digital Center",
            type: "Education",
            distance: "1.5 km",
            icon: <Map size={24} />,
            phone: "011-55566677",
            color: 'var(--transport)'
        }
    ];

    return (
        <div style={styles.section}>
            <div style={styles.header}>
                <MapPin size={28} style={{ color: 'var(--primary)' }} />
                <h2 style={styles.title}>Nearby Essential Facilities</h2>
            </div>

            <div style={styles.grid}>
                {facilities.map((fac, idx) => (
                    <div key={idx} style={styles.card}>
                        <div style={{ ...styles.iconBox, backgroundColor: fac.color + '20', color: fac.color }}>
                            {fac.icon}
                        </div>
                        <div style={styles.info}>
                            <h3 style={styles.facName}>{fac.name}</h3>
                            <p style={styles.facType}>{fac.type} • {fac.distance}</p>
                            <div style={styles.actions}>
                                <button style={styles.actionBtn}>
                                    <Phone size={14} /> {fac.phone}
                                </button>
                                <button style={styles.actionBtn}>
                                    <ExternalLink size={14} /> Map
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    section: {
        background: 'white',
        borderRadius: '2rem',
        padding: '2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        border: '1px solid rgba(0,0,0,0.05)',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '2rem',
    },
    title: {
        fontSize: '1.8rem',
        fontWeight: 800,
        margin: 0,
        background: 'linear-gradient(to right, #1e293b, #475569)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
    },
    card: {
        display: 'flex',
        gap: '1.25rem',
        padding: '1.25rem',
        borderRadius: '1.25rem',
        background: '#f8fafc',
        border: '1px solid #f1f5f9',
        transition: 'all 0.2s',
    },
    iconBox: {
        width: '56px',
        height: '56px',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    info: {
        flex: 1,
    },
    facName: {
        margin: '0 0 0.25rem 0',
        fontSize: '1.1rem',
        fontWeight: 700,
        color: '#1e293b',
    },
    facType: {
        margin: '0 0 1rem 0',
        fontSize: '0.9rem',
        color: '#64748b',
        fontWeight: 500,
    },
    actions: {
        display: 'flex',
        gap: '0.75rem',
    },
    actionBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.4rem 0.75rem',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        background: 'white',
        fontSize: '0.8rem',
        fontWeight: 600,
        color: '#475569',
        cursor: 'pointer',
    }
};
