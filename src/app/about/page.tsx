'use client';

import React from 'react';
import AethelLayout from '@/components/AethelLayout';
import { Globe, Shield, Sparkles, Zap, Heart, Leaf } from 'lucide-react';

export default function AboutPage() {
    const sidebarLinks = [
        { label: 'Our Vision', icon: <Globe size={20} />, href: '/about', active: true },
        { label: 'Terms', icon: <Shield size={20} />, href: '/terms' },
    ];

    return (
        <AethelLayout
            title="About SUVIDHA 2026"
            themeColor="#0f172a"
            themeSoft="#f1f5f9"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.container}>
                <div style={styles.hero}>
                    <Sparkles size={64} color="var(--theme-azure)" />
                    <h1 style={styles.title}>The Future of Governance</h1>
                    <p style={styles.subtitle}>SUVIDHA 2026 is a hyper-connected, AI-driven ecosystem designed to bring essential governance directly to every citizen's pocket.</p>
                </div>

                <div style={styles.grid}>
                    <div style={styles.card}>
                        <h2 style={styles.sectionTitle}>Our Pillars</h2>
                        <div style={styles.pillarList}>
                            <div style={styles.pillar}>
                                <Zap color="#f59e0b" />
                                <div>
                                    <h4 style={styles.pillarTitle}>Efficiency</h4>
                                    <p style={styles.pillarText}>Instant settlements and real-time utility management.</p>
                                </div>
                            </div>
                            <div style={styles.pillar}>
                                <Heart color="#e11d48" />
                                <div>
                                    <h4 style={styles.pillarTitle}>Empathy</h4>
                                    <p style={styles.pillarText}>Healthcare and social security accessible to all.</p>
                                </div>
                            </div>
                            <div style={styles.pillar}>
                                <Leaf color="#10b981" />
                                <div>
                                    <h4 style={styles.pillarTitle}>Sustainability</h4>
                                    <p style={styles.pillarText}>Digital-first processes reducing environmental footprint.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.versionBox}>
                        <h3 style={styles.versionTitle}>System Manifest</h3>
                        <div style={styles.versionItem}><strong>Version:</strong> 2.0.0-PRO</div>
                        <div style={styles.versionItem}><strong>Engine:</strong> Aethel-Mesh v4</div>
                        <div style={styles.versionItem}><strong>Security:</strong> AES-256 Quantum Shield</div>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '1rem' }}>Built for the citizens of India, 2026.</p>
                    </div>
                </div>
            </div>
        </AethelLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { display: 'flex', flexDirection: 'column', gap: '3rem' },
    hero: { padding: '4rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' },
    title: { fontSize: '3rem', fontWeight: 900, color: '#1e293b', margin: 0 },
    subtitle: { fontSize: '1.25rem', color: '#64748b', maxWidth: '800px', lineHeight: 1.6 },
    grid: { display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' },
    card: { background: 'white', padding: '2.5rem', borderRadius: '32px', border: '1px solid #f1f5f9' },
    sectionTitle: { fontSize: '1.5rem', fontWeight: 800, color: '#1e293b', marginBottom: '2rem' },
    pillarList: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    pillar: { display: 'flex', gap: '1.5rem', alignItems: 'flex-start' },
    pillarTitle: { fontSize: '1.1rem', fontWeight: 700, margin: 0 },
    pillarText: { fontSize: '0.9rem', color: '#64748b', margin: '4px 0 0' },
    versionBox: { background: '#f8fafc', padding: '2rem', borderRadius: '24px', border: '1px solid #e2e8f0', alignSelf: 'start' },
    versionTitle: { fontSize: '1rem', fontWeight: 800, marginBottom: '1rem' },
    versionItem: { fontSize: '0.9rem', marginBottom: '0.5rem', color: '#475569' }
};
