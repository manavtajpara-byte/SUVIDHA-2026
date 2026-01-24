'use client';

import React, { useState } from 'react';
import { Flame, Shield, ArrowLeft, Play, Layout, AlertCircle, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DisasterTrainingPage() {
    const router = useRouter();
    const [activeDrill, setActiveDrill] = useState<null | 'fire' | 'earthquake'>(null);
    const [score, setScore] = useState(0);

    const FireDrill = () => (
        <div style={styles.drillContainer}>
            <h3>Fire Safety Drill: Use the Extinguisher</h3>
            <div style={styles.simArea}>
                <div style={styles.fireAnimation}>🔥</div>
                <button
                    onClick={() => { setScore(100); setTimeout(() => setActiveDrill(null), 2000); }}
                    style={styles.extinguishBtn}
                >
                    🧯 PASS (Aim at Base)
                </button>
            </div>
            <div style={styles.instructions}>
                <strong>PASS Technique:</strong> Pull, Aim, Squeeze, Sweep.
            </div>
        </div>
    );

    const EarthquakeDrill = () => (
        <div style={styles.drillContainer}>
            <h3>Earthquake Drill: Drop, Cover, Hold</h3>
            <div style={styles.simArea}>
                <div style={{ ...styles.shakingTable, animation: 'shake 0.5s infinite' }}>🪑</div>
                <button
                    onClick={() => { setScore(100); setTimeout(() => setActiveDrill(null), 2000); }}
                    style={styles.hideBtn}
                >
                    👞 Get Under Table
                </button>
            </div>
            <style jsx>{`
                @keyframes shake {
                    0% { transform: translate(1px, 1px) rotate(0deg); }
                    10% { transform: translate(-1px, -2px) rotate(-1deg); }
                    50% { transform: translate(-3px, 0px) rotate(1deg); }
                    100% { transform: translate(1px, -1px) rotate(0deg); }
                }
            `}</style>
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}><ArrowLeft size={32} /></button>
                <div style={{ flex: 1 }}>
                    <h1 style={styles.title}>Disaster Resilience Training ⛑️</h1>
                    <p style={styles.subtitle}>Interactive Drills for Life-Saving Actions</p>
                </div>
            </div>

            {activeDrill ? (
                <div style={styles.simOverlay}>
                    <button onClick={() => setActiveDrill(null)} style={styles.closeBtn}>Back to Catalog</button>
                    {activeDrill === 'fire' ? <FireDrill /> : <EarthquakeDrill />}
                    {score === 100 && (
                        <div style={styles.successBanner}>
                            <CheckCircle size={32} /> Excellent! You've mastered this drill.
                        </div>
                    )}
                </div>
            ) : (
                <div style={styles.grid}>
                    <div style={styles.drillCard} onClick={() => setActiveDrill('fire')}>
                        <div style={{ ...styles.iconBox, background: '#fee2e2', color: '#dc2626' }}><Flame size={40} /></div>
                        <h3>Fire Safety Drill</h3>
                        <p>Learn the PASS method for using fire extinguishers.</p>
                        <button style={styles.startBtn}><Play size={16} /> Start Module</button>
                    </div>

                    <div style={styles.drillCard} onClick={() => setActiveDrill('earthquake')}>
                        <div style={{ ...styles.iconBox, background: '#fef3c7', color: '#d97706' }}><AlertCircle size={40} /></div>
                        <h3>Earthquake Survival</h3>
                        <p>Interactive "Drop, Cover, Hold" simulation.</p>
                        <button style={styles.startBtn}><Play size={16} /> Start Module</button>
                    </div>
                </div>
            )}

            <div style={styles.statsCard}>
                <h3>Your Training Status</h3>
                <div style={styles.progressBar}><div style={{ width: '60%', background: '#16a34a', height: '100%' }}></div></div>
                <p>3 of 5 Certification Modules Completed</p>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '1000px', margin: '0 auto' },
    header: { display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' },
    title: { fontSize: '2.5rem', fontWeight: 900, margin: 0, color: '#1e293b' },
    subtitle: { color: '#64748b', fontSize: '1.2rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' },
    drillCard: { background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'transform 0.2s' },
    iconBox: { width: '80px', height: '80px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' },
    startBtn: { marginTop: '1.5rem', padding: '0.8rem 1.5rem', background: '#1e293b', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' },
    simOverlay: { background: 'white', padding: '3rem', borderRadius: '32px', boxShadow: 'var(--card-shadow)', position: 'relative' },
    closeBtn: { position: 'absolute', top: '2rem', right: '2rem', background: '#f1f5f9', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' },
    drillContainer: { textAlign: 'center' },
    simArea: { height: '300px', background: '#f8fafc', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '2rem 0', gap: '2rem' },
    fireAnimation: { fontSize: '5rem', animation: 'pulsate 1s infinite' },
    extinguishBtn: { padding: '1rem 2rem', background: '#dc2626', color: 'white', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' },
    instructions: { color: '#64748b', fontStyle: 'italic' },
    shakingTable: { fontSize: '5rem' },
    hideBtn: { padding: '1rem 2rem', background: '#16a34a', color: 'white', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' },
    successBanner: { marginTop: '2rem', background: '#dcfce7', color: '#16a34a', padding: '1rem', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' },
    statsCard: { marginTop: '3rem', background: '#f8fafc', padding: '2rem', borderRadius: '24px' },
    progressBar: { height: '12px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden', margin: '1rem 0' }
};
