'use client';

import React, { useState } from 'react';
import { ArrowLeft, Box, Play, CheckCircle2, Info, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const Webcam = dynamic<any>(() => import('react-webcam'), { ssr: false });

export default function ARTrainingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isAssisting, setIsAssisting] = useState(false);

    const steps = [
        { id: 1, title: 'Kiosk Hardware Overview', description: 'Locate the biometric scanner and printer slot.' },
        { id: 2, title: 'Paper Refill AR Guide', description: 'Follow the green visual overlay to open the tray.' },
        { id: 3, title: 'Biometric Alignment', description: 'Position your fingerprint within the blue AR target.' },
        { id: 4, title: 'Maintenance Challenge', description: 'Locate and "tighten" the virtual screw to fix connectivity.' },
    ];

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}><ArrowLeft size={32} /></button>
                <h1 style={styles.title}>AR-Infused Training</h1>
            </div>

            <div style={styles.grid}>
                <div style={styles.sidebar}>
                    <h3>Learning Curriculum</h3>
                    {steps.map((s) => (
                        <div
                            key={s.id}
                            style={{
                                ...styles.stepCard,
                                borderLeft: step === s.id ? '4px solid #6366f1' : '4px solid transparent',
                                background: step === s.id ? '#f1f5f9' : 'white'
                            }}
                            onClick={() => setStep(s.id)}
                        >
                            <span style={styles.stepNum}>{s.id}</span>
                            <div>
                                <h4>{s.title}</h4>
                                <p style={styles.stepDesc}>{s.description}</p>
                            </div>
                        </div>
                    ))}

                    <div style={styles.infoBox}>
                        <Info size={20} />
                        <p>AR overlays help you master kiosk hardware in minutes.</p>
                    </div>
                </div>

                <div style={styles.previewArea}>
                    {!isAssisting ? (
                        <div style={styles.startHero}>
                            <Box size={80} color="#6366f1" />
                            <h2>Mixed Reality Guided Assistance</h2>
                            <p>Enable your camera to see interactive instructions overlaid on the physical kiosk hardware.</p>
                            <button onClick={() => setIsAssisting(true)} style={styles.startBtn}>
                                <Play size={20} /> Start AR Session
                            </button>
                        </div>
                    ) : (
                        <div style={styles.arStage}>
                            <Webcam
                                audio={false}
                                width="100%"
                                height="100%"
                                style={styles.webcam}
                            />

                            {/* AR Overlays */}
                            {step === 1 && (
                                <div className="ar-overlay ar-pulse" style={{ top: '20%', left: '30%', width: '100px', height: '100px', border: '3px dashed #10b981', borderRadius: '10px' }}>
                                    <span style={styles.arLabel}>Printer Slot</span>
                                </div>
                            )}
                            {step === 2 && (
                                <div className="ar-overlay" style={{ top: '50%', left: '60%', textAlign: 'center' }}>
                                    <div style={{ width: '4px', height: '100px', background: '#3b82f6', margin: '0 auto' }} />
                                    <span style={{ ...styles.arLabel, background: '#3b82f6' }}>Load Paper Here</span>
                                </div>
                            )}
                            {step === 3 && (
                                <div className="ar-overlay ar-scale" style={{ top: '40%', left: '45%', width: '120px', height: '120px', border: '5px solid #fbbf24', borderRadius: '50%' }}>
                                    <span style={{ ...styles.arLabel, background: '#fbbf24', color: '#000' }}>Scan Zone</span>
                                </div>
                            )}
                            {step === 4 && (
                                <div className="ar-overlay" style={{ top: '65%', left: '25%', textAlign: 'center' }}>
                                    <div style={{ width: '40px', height: '40px', border: '5px solid #ef4444', borderRadius: '50%', animation: 'spin 4s linear infinite' }} />
                                    <span style={{ ...styles.arLabel, background: '#ef4444' }}>Loose Connectivity Hub</span>
                                    <button
                                        onClick={() => setStep(5)}
                                        style={{ marginTop: '1rem', background: '#10b981', border: 'none', color: 'white', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                                    >
                                        Tighten Virtual Screw
                                    </button>
                                </div>
                            )}

                            {step === 5 && (
                                <div style={styles.successOverlay}>
                                    <CheckCircle2 size={100} color="#10b981" />
                                    <h2 style={{ color: 'white' }}>Training Certified!</h2>
                                    <p style={{ color: '#cbd5e1' }}>You have mastered Kiosk Hardware Maintenance.</p>
                                    <button onClick={() => router.push('/vision')} style={styles.startBtn}>Back to Hub</button>
                                </div>
                            )}

                            <div style={styles.arControls}>
                                <div style={styles.arStatus}>
                                    <Eye size={16} /> <span>Spatial Tracking Active</span>
                                </div>
                                <button onClick={() => setIsAssisting(false)} style={styles.closeBtn}>Exit AR</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .ar-overlay { position: absolute; pointer-events: none; transition: all 0.5s; z-index: 10; }
                .ar-pulse { animation: pulse 2s infinite; }
                .ar-scale { animation: scale 1.5s infinite alternate; }
                @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
                @keyframes scale { from { transform: scale(0.9); } to { transform: scale(1.1); } }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    header: { display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' },
    backBtn: { background: '#f1f5f9', border: 'none', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' },
    title: { fontSize: '2.5rem', margin: 0 },
    grid: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', minHeight: '600px' },
    sidebar: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    stepCard: { padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', cursor: 'pointer', display: 'flex', gap: '1rem', transition: 'all 0.2s' },
    stepNum: { fontSize: '1.2rem', fontWeight: 800, color: '#6366f1', minWidth: '30px' },
    stepDesc: { fontSize: '0.9rem', color: '#64748b', margin: '0.2rem 0 0' },
    infoBox: { marginTop: 'auto', padding: '1rem', background: '#e0e7ff', borderRadius: '12px', display: 'flex', gap: '0.8rem', color: '#4338ca' },
    previewArea: { background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', position: 'relative' },
    startHero: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '3rem', textAlign: 'center', gap: '1rem' },
    startBtn: { background: '#6366f1', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', gap: '0.5rem', marginTop: '1rem' },
    arStage: { width: '100%', height: '100%', position: 'relative' },
    webcam: { objectFit: 'cover' },
    arLabel: { position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', background: '#10b981', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, whiteSpace: 'nowrap' },
    arControls: { position: 'absolute', bottom: '20px', left: '20px', right: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    arStatus: { background: 'rgba(0,0,0,0.6)', color: 'white', padding: '8px 16px', borderRadius: '30px', fontSize: '0.8rem', display: 'flex', gap: '0.5rem', alignItems: 'center' },
    closeBtn: { background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' },
    successOverlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        zIndex: 100,
        textAlign: 'center',
        padding: '2rem'
    }
};
