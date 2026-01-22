'use client';

import React from 'react';
import { Landmark, GraduationCap, Radio, Sparkles, ArrowLeft, Eye, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function VisionDashboardPage() {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <Link href="/" style={styles.backBtn}><ArrowLeft size={32} /></Link>
                <h1 style={styles.title}>Vision 2030: Smart India Hub</h1>
            </div>
            <p style={styles.subtitle}>Welcome to the future of Digital India. All modules are now fully operational.</p>

            <div style={styles.grid}>
                <Link href="/vision/financial-inclusion" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={styles.card}>
                        <Landmark size={40} color="#2563eb" />
                        <h3>Financial Inclusion (AEPS)</h3>
                        <p>Micro-ATM & DBT Tracker</p>
                    </div>
                </Link>

                <Link href="/vision/education-hub" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={styles.card}>
                        <GraduationCap size={40} color="#db2777" />
                        <h3>Education Hub</h3>
                        <p>Skill India Courses & Job Match</p>
                    </div>
                </Link>

                <Link href="/vision/smart-village" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={styles.card}>
                        <Radio size={40} color="#059669" />
                        <h3>Smart Village</h3>
                        <p>IoT Sensors (Water/Air/Light)</p>
                    </div>
                </Link>

                <Link href="/vision/ar-training" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={styles.card}>
                        <Eye size={40} color="#8b5cf6" />
                        <h3>AR Training</h3>
                        <p>Mixed-Reality Kiosk Guidance</p>
                    </div>
                </Link>

                <Link href="/vision/predictive-governance" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={styles.card}>
                        <BarChart3 size={40} color="#f97316" />
                        <h3>Predictive Governance</h3>
                        <p>AI Heatmaps & Digital Twins</p>
                    </div>
                </Link>

                <Link href="/vision/singularity" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ ...styles.card, background: 'linear-gradient(135deg, #1e1b4b, #312e81)', color: 'white' }}>
                        <Sparkles size={40} color="#fbbf24" />
                        <h3 style={{ color: 'white' }}>The Singularity</h3>
                        <p style={{ color: '#a5b4fc' }}>Self-Governing AI System</p>
                    </div>
                </Link>
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
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        marginBottom: '2rem',
        justifyContent: 'center',
    },
    backBtn: {
        color: '#1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.5rem',
        borderRadius: '50%',
        backgroundColor: '#f1f5f9',
        transition: 'all 0.2s',
    },
    title: { fontSize: '2.5rem', margin: 0 },
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
