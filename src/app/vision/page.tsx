'use client';

import React from 'react';
import { Landmark, GraduationCap, Radio, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function VisionDashboardPage() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Vision 2030: Future Capabilities</h1>
            <p style={styles.subtitle}>These modules are in Beta / Pilot phase.</p>

            <div style={styles.grid}>
                <div style={styles.card}>
                    <Landmark size={40} color="#2563eb" />
                    <h3>Financial Inclusion (AEPS)</h3>
                    <p>Micro-ATM & DBT Tracker</p>
                    <span style={styles.badge}>Phase 37</span>
                </div>

                <div style={styles.card}>
                    <GraduationCap size={40} color="#db2777" />
                    <h3>Education Hub</h3>
                    <p>Skill India Courses & Job Match</p>
                    <span style={styles.badge}>Phase 38</span>
                </div>

                <div style={styles.card}>
                    <Radio size={40} color="#059669" />
                    <h3>Smart Village</h3>
                    <p>IoS Sensors (Water/Air/Light)</p>
                    <span style={styles.badge}>Phase 39</span>
                </div>

                <div style={{ ...styles.card, background: 'linear-gradient(135deg, #1e1b4b, #312e81)', color: 'white' }}>
                    <Sparkles size={40} color="#fbbf24" />
                    <h3 style={{ color: 'white' }}>The Singularity</h3>
                    <p style={{ color: '#a5b4fc' }}>Self-Governing AI System</p>
                    <span style={styles.badgeGold}>Phase 40</span>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        padding: '4rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
    },
    title: { fontSize: '2.5rem', marginBottom: '0.5rem' },
    subtitle: { color: '#64748b', marginBottom: '4rem' },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
    },
    card: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
    },
    badge: {
        backgroundColor: '#f1f5f9',
        fontSize: '0.8rem',
        padding: '0.2rem 0.6rem',
        borderRadius: '20px',
        color: '#64748b',
    },
    badgeGold: {
        backgroundColor: '#fbbf24',
        color: '#78350f',
        fontSize: '0.8rem',
        padding: '0.2rem 0.6rem',
        borderRadius: '20px',
        fontWeight: 'bold',
    }
};
