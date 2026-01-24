'use client';

import React, { useState } from 'react';
import AethelLayout from '@/components/AethelLayout';
import { useAppState } from '@/context/StateContext';
import {
    Zap, Flame, Heart, BookOpen, Sparkles, Building2,
    Smartphone, Leaf, Scale, Globe, Wallet, Search,
    ChevronRight, Filter, Wheat, Droplets
} from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
    const { searchQuery } = useAppState();
    const [filter, setFilter] = useState('all');

    const sidebarLinks = [
        { label: 'Directory', icon: <Search size={20} />, href: '/services', active: true },
        { label: 'Saved', icon: <Wallet size={20} />, href: '/services/saved' },
    ];

    const sectors = [
        { id: 'utilities', label: 'Electricity', icon: <Zap />, href: '/electricity', color: '#f59e0b', desc: 'Bills & Connections' },
        { id: 'utilities', label: 'LPG Gas', icon: <Flame />, href: '/gas', color: '#ea580c', desc: 'Booking & Leak Report' },
        { id: 'utilities', label: 'Municipal', icon: <Droplets />, href: '/municipal', color: '#2563eb', desc: 'Water & Property Tax' },
        { id: 'social', label: 'Ration Card', icon: <Wheat />, href: '/ration-card', color: '#16a34a', desc: 'PDS & Food Security' },
        { id: 'healthcare', label: 'Healthcare', icon: <Heart />, href: '/healthcare', color: '#e11d48', desc: 'Doctors & Health ID' },
        { id: 'education', label: 'Education', icon: <BookOpen />, href: '/training', color: '#9333ea', desc: 'Courses & Skills' },
        { id: 'legal', label: 'Tele-Law', icon: <Scale />, href: '/tele-law', color: '#4f46e5', desc: 'Legal Consultation' },
        { id: 'agri', label: 'Agri-Tech', icon: <Leaf />, href: '/agri-tech', color: '#059669', desc: 'Market & Weather' },
        { id: 'future', label: 'Vision 2030', icon: <Sparkles />, href: '/vision', color: '#8b5cf6', desc: 'AI & Smart Villages' },
    ];

    const filtered = sectors.filter(s => {
        const matchesSearch = s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.desc.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === 'all' || s.id === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <AethelLayout
            title="Service Directory"
            themeColor="#2563eb"
            themeSoft="#eff6ff"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.container}>
                <div style={styles.filterBar}>
                    {['all', 'utilities', 'healthcare', 'social', 'education', 'legal', 'agri'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                ...styles.filterBtn,
                                background: filter === f ? '#2563eb' : 'white',
                                color: filter === f ? 'white' : '#64748b'
                            }}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                <div style={styles.grid}>
                    {filtered.map((s, i) => (
                        <Link key={i} href={s.href} style={styles.card}>
                            <div style={{ ...styles.iconBox, background: s.color + '15', color: s.color }}>
                                {s.icon}
                            </div>
                            <div style={styles.content}>
                                <h3 style={styles.cardTitle}>{s.label}</h3>
                                <p style={styles.cardDesc}>{s.desc}</p>
                            </div>
                            <ChevronRight size={20} color="#94a3b8" />
                        </Link>
                    ))}
                </div>
            </div>
        </AethelLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    filterBar: { display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' },
    filterBtn: {
        padding: '0.6rem 1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0',
        fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
        whiteSpace: 'nowrap'
    },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' },
    card: {
        background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #f1f5f9',
        display: 'flex', alignItems: 'center', gap: '1.25rem', textDecoration: 'none', transition: 'all 0.2s'
    },
    iconBox: {
        width: '56px', height: '56px', borderRadius: '16px', display: 'flex',
        alignItems: 'center', justifyContent: 'center'
    },
    content: { flex: 1 },
    cardTitle: { fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', margin: 0 },
    cardDesc: { fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }
};
