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
        // Primary Emergency
        { label: t.nationalEmergency || "National Emergency", number: '112', purpose: "Single emergency number for all services", icon: <AlertTriangle size={60} />, color: '#ef4444', category: 'Emergency' },
        { label: t.police, number: '100', purpose: "Police help and security", icon: <AlertTriangle size={60} />, color: '#3b82f6', category: 'Emergency' },
        { label: t.fireService, number: '101', purpose: "Fire and rescue services", icon: <Flame size={60} />, color: '#f59e0b', category: 'Emergency' },
        { label: t.ambulance, number: '108', purpose: "Immediate medical assistance", icon: <Phone size={60} />, color: '#10b981', category: 'Emergency' },

        // Women & Child Safety
        { label: t.womenHelpline || "Women Helpline", number: '1091', purpose: "Safety and support for women", icon: <Phone size={60} />, color: '#ec4899', category: 'Women & Child' },
        { label: "Women Helpline (NCW)", number: '7827170170', purpose: "National Commission for Women", icon: <Phone size={60} />, color: '#ec4899', category: 'Women & Child' },
        { label: t.childHelpline || "Child Helpline", number: '1098', purpose: "Child protection and support", icon: <Phone size={60} />, color: '#f43f5e', category: 'Women & Child' },
        { label: "Missing Child", number: '1094', purpose: "Report missing children", icon: <Phone size={60} />, color: '#f43f5e', category: 'Women & Child' },

        // Health Services
        { label: t.covidHelpline || "COVID-19 Helpline", number: '1075', purpose: "COVID-19 information and support", icon: <Phone size={60} />, color: '#8b5cf6', category: 'Health' },
        { label: "Mental Health", number: '08046110007', purpose: "NIMHANS mental health support", icon: <Phone size={60} />, color: '#8b5cf6', category: 'Health' },
        { label: "Kiran Mental Health", number: '18005990019', purpose: "24/7 mental health support", icon: <Phone size={60} />, color: '#8b5cf6', category: 'Health' },
        { label: "AIDS Helpline", number: '1097', purpose: "HIV/AIDS information", icon: <Phone size={60} />, color: '#8b5cf6', category: 'Health' },
        { label: "Blood Bank", number: '104', purpose: "Blood donation and availability", icon: <Phone size={60} />, color: '#dc2626', category: 'Health' },

        // Senior Citizens
        { label: "Senior Citizen Helpline", number: '14567', purpose: "Support for elderly citizens", icon: <Phone size={60} />, color: '#059669', category: 'Senior Citizens' },
        { label: "Elder Abuse Helpline", number: '1091', purpose: "Report abuse of elderly", icon: <Phone size={60} />, color: '#059669', category: 'Senior Citizens' },

        // Crime & Safety
        { label: t.cyberCrime || "Cyber Crime", number: '155260', purpose: "Reporting online fraud and abuse", icon: <AlertTriangle size={60} />, color: '#1e293b', category: 'Crime & Safety' },
        { label: "Anti-Corruption", number: '1031', purpose: "Report corruption", icon: <AlertTriangle size={60} />, color: '#1e293b', category: 'Crime & Safety' },
        { label: "Vigilance", number: '1064', purpose: "Central Vigilance Commission", icon: <AlertTriangle size={60} />, color: '#1e293b', category: 'Crime & Safety' },

        // Transport & Travel
        { label: t.railwaySecurity || "Railway Security", number: '139', purpose: "Help during train travel", icon: <Phone size={60} />, color: '#6366f1', category: 'Transport' },
        { label: t.roadAccident || "Road Accident", number: '1073', purpose: "Highways and city road accidents", icon: <AlertTriangle size={60} />, color: '#ef4444', category: 'Transport' },
        { label: "Road Safety", number: '1033', purpose: "Traffic and road safety", icon: <Phone size={60} />, color: '#6366f1', category: 'Transport' },

        // Consumer & Utilities
        { label: "Consumer Helpline", number: '1800-11-4000', purpose: "Consumer complaints", icon: <Phone size={60} />, color: '#0891b2', category: 'Consumer' },
        { label: "LPG Leak", number: '1906', purpose: "Report gas leakage", icon: <Flame size={60} />, color: '#f59e0b', category: 'Consumer' },
        { label: "Electricity Complaint", number: '1912', purpose: "Power supply issues", icon: <Phone size={60} />, color: '#eab308', category: 'Consumer' },

        // Disaster Management
        { label: "Disaster Management", number: '1070', purpose: "Natural disaster helpline", icon: <AlertTriangle size={60} />, color: '#dc2626', category: 'Disaster' },
        { label: "Earthquake/Flood", number: '1077', purpose: "Natural calamity support", icon: <AlertTriangle size={60} />, color: '#dc2626', category: 'Disaster' },

        // Government Services
        { label: "Passport Seva", number: '1800-258-1800', purpose: "Passport related queries", icon: <Phone size={60} />, color: '#4f46e5', category: 'Government' },
        { label: "Income Tax", number: '1800-180-1961', purpose: "Tax related queries", icon: <Phone size={60} />, color: '#4f46e5', category: 'Government' },
        { label: "Railway Enquiry", number: '139', purpose: "Train information", icon: <Phone size={60} />, color: '#6366f1', category: 'Government' },
        { label: "Kisan Call Center", number: '1800-180-1551', purpose: "Farmer support", icon: <Phone size={60} />, color: '#16a34a', category: 'Government' },
    ];

    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories = ['All', 'Emergency', 'Women & Child', 'Health', 'Senior Citizens', 'Crime & Safety', 'Transport', 'Consumer', 'Disaster', 'Government'];

    const filteredServices = selectedCategory === 'All'
        ? emergencyServices
        : emergencyServices.filter(s => s.category === selectedCategory);

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
                <div style={{ flex: 1 }}>
                    <p style={{ margin: 0 }}><strong>Complete Indian Helpline Directory</strong></p>
                    <p style={{ margin: 0, opacity: 0.8 }}>35+ essential helplines across all categories</p>
                </div>
            </div>

            {/* Category Filter */}
            <div style={styles.categoryFilter}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        style={{
                            ...styles.categoryBtn,
                            backgroundColor: selectedCategory === cat ? 'var(--primary)' : '#f1f5f9',
                            color: selectedCategory === cat ? 'white' : '#64748b',
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div style={styles.grid}>
                {filteredServices.map((service) => (
                    <button
                        key={`${service.label}-${service.number}`}
                        onClick={() => handleCall(service.label, service.number)}
                        disabled={calling !== null}
                        style={{
                            ...styles.emergencyBtn,
                            backgroundColor: service.color,
                            opacity: calling && calling !== service.label ? 0.5 : 1
                        }}
                    >
                        <div style={styles.btnTop}>
                            {service.icon}
                            <div style={styles.badgeWrapper}>
                                <div style={styles.numberBadge}>{service.number}</div>
                            </div>
                        </div>
                        <div style={styles.btnBottom}>
                            <h3 style={styles.serviceLabel}>{service.label}</h3>
                            <p style={styles.servicePurpose}>{service.purpose}</p>
                        </div>
                        {calling === service.label && <div style={styles.calling}>Dialing...</div>}
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
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' },
    emergencyBtn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: '0',
        borderRadius: '2rem',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        minHeight: '280px',
        gap: '0',
        transition: 'transform 0.2s, box-shadow 0.2s',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'left'
    },
    btnTop: {
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1
    },
    badgeWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.5rem'
    },
    btnBottom: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: '1.5rem 2rem',
        backdropFilter: 'blur(10px)'
    },
    serviceLabel: { fontSize: '1.8rem', fontWeight: 900, margin: 0 },
    servicePurpose: { fontSize: '1rem', opacity: 0.9, margin: '4px 0 0 0', fontWeight: 500 },
    numberBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: '0.5rem 1.5rem',
        borderRadius: '1.5rem',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        border: '2px solid rgba(255,255,255,0.4)'
    },
    calling: { position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'rgba(0,0,0,0.5)', padding: '0.5rem 1rem', borderRadius: '1rem', fontSize: '1rem', zIndex: 10 },
    info: { backgroundColor: '#f1f5f9', padding: '1.5rem', borderRadius: '1rem', textAlign: 'center', fontSize: '1.1rem' }
};
