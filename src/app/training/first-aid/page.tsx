'use client';

import React, { useState } from 'react';
import { Heart, ArrowLeft, ArrowRight, PlayCircle, Info, ShieldCheck, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FirstAidTrainingPage() {
    const router = useRouter();
    const [step, setStep] = useState(0);

    const cprSteps = [
        { id: 1, title: 'Check Environment', desc: 'Ensure the area is safe for you and the victim.' },
        { id: 2, title: 'Call for Help', desc: 'Ask someone to call 102/108 or use the Kiosk Emergency button.' },
        { id: 3, title: 'Check Response', desc: 'Tap their shoulder and shout. Check for breathing.' },
        { id: 4, title: 'Compressions', desc: 'Push hard and fast in the center of the chest (100-120 bpm).' }
    ];

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}><ArrowLeft size={32} /></button>
                <div style={{ flex: 1 }}>
                    <h1 style={styles.title}>First Aid Masterclass 🩹</h1>
                    <p style={styles.subtitle}>Be a Hero: Save a Life with Essential Skills</p>
                </div>
            </div>

            <div style={styles.layout}>
                <div style={styles.leftCol}>
                    <div style={styles.courseCard}>
                        <div style={styles.courseHeader}>
                            <Heart size={32} color="#dc2626" />
                            <h3>Adult CPR (Hands-Only)</h3>
                        </div>
                        <div style={styles.progressTracker}>
                            {cprSteps.map((s, idx) => (
                                <div key={s.id} style={{
                                    ...styles.progressDot,
                                    background: idx <= step ? '#dc2626' : '#e2e8f0'
                                }}></div>
                            ))}
                        </div>
                        <div style={styles.stepContent}>
                            <h4 style={styles.stepTitle}>Step {cprSteps[step].id}: {cprSteps[step].title}</h4>
                            <p style={styles.stepDesc}>{cprSteps[step].desc}</p>
                        </div>
                        <div style={styles.navBtns}>
                            <button
                                disabled={step === 0}
                                onClick={() => setStep(step - 1)}
                                style={styles.prevBtn}
                            >Prev</button>
                            <button
                                onClick={() => step < cprSteps.length - 1 ? setStep(step + 1) : setStep(0)}
                                style={styles.nextBtn}
                            >
                                {step === cprSteps.length - 1 ? 'Finish & Quiz' : 'Next Step'}
                            </button>
                        </div>
                    </div>
                </div>

                <div style={styles.rightCol}>
                    <div style={styles.videoCard}>
                        <div style={styles.videoPlaceholder}>
                            <PlayCircle size={64} color="white" />
                            <p style={{ color: 'white', fontWeight: 'bold' }}>Watch Video Tutorial</p>
                        </div>
                        <div style={styles.videoInfo}>
                            <h4>CPR Demonstration</h4>
                            <p>Certified by National Health Mission</p>
                        </div>
                    </div>

                    <div style={styles.infoAlert}>
                        <Info size={20} color="#3b82f6" />
                        <p><strong>Note:</strong> This training is for informational purposes. Always seek professional medical help in real emergencies.</p>
                    </div>
                </div>
            </div>

            {step === cprSteps.length - 1 && (
                <div style={styles.quizCard}>
                    <ShieldCheck size={48} color="#16a34a" />
                    <h3>Unlock Your Badge</h3>
                    <p>Complete a quick 3-question quiz to receive your First Responder digital badge.</p>
                    <button style={styles.quizBtn}>Start Quiz &rarr;</button>
                </div>
            )}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '1100px', margin: '0 auto' },
    header: { display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' },
    title: { fontSize: '2.5rem', fontWeight: 900, margin: 0, color: '#1e293b' },
    subtitle: { color: '#64748b', fontSize: '1.2rem' },
    layout: { display: 'grid', gridTemplateColumns: '1fr 400px', gap: '3rem' },
    courseCard: { background: 'white', padding: '2.5rem', borderRadius: '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' },
    courseHeader: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' },
    progressTracker: { display: 'flex', gap: '0.5rem', marginBottom: '2rem' },
    progressDot: { height: '8px', flex: 1, borderRadius: '4px', transition: 'background 0.3s' },
    stepContent: { minHeight: '200px' },
    stepTitle: { fontSize: '1.8rem', fontWeight: 800, margin: '0 0 1rem 0', color: '#1e293b' },
    stepDesc: { fontSize: '1.2rem', color: '#475569', lineHeight: '1.6' },
    navBtns: { display: 'flex', gap: '1rem', marginTop: '2rem' },
    prevBtn: { padding: '1rem 2rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', fontWeight: 'bold', cursor: 'pointer' },
    nextBtn: { flex: 1, padding: '1rem 2rem', borderRadius: '12px', background: '#dc2626', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' },
    videoCard: { background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
    videoPlaceholder: { height: '250px', background: '#334155', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' },
    videoInfo: { padding: '1.5rem' },
    infoAlert: { marginTop: '2rem', background: '#eff6ff', padding: '1.5rem', borderRadius: '20px', display: 'flex', gap: '1rem', border: '1px solid #bfdbfe' },
    quizCard: { marginTop: '3rem', background: '#f0fdf4', padding: '3rem', borderRadius: '32px', textAlign: 'center', border: '2px dashed #bbfcce' },
    quizBtn: { marginTop: '1.5rem', padding: '1rem 2rem', background: '#16a34a', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }
};
