'use client';

import React, { useState, useEffect } from 'react';
import { Brain, Cpu, Zap, Activity, ShieldCheck, Database, ArrowLeft, Play, Lock, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppState } from '@/context/StateContext';

import { stage2Dataset } from '@/utils/trainingDatasetExpansion';

export default function AITrainingHub() {
    const router = useRouter();
    const { addToast } = useAppState();
    const [level, setLevel] = useState(1); // 1 to 20 stages
    const [isTraining, setIsTraining] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentFeedingQuestion, setCurrentFeedingQuestion] = useState("");
    const [stats, setStats] = useState({
        nodes: 1024,
        bias: 0.15,
        logicDepth: 82,
        unlockedSchemes: 540
    });

    const stages = [
        { name: "Foundational Literacy", icon: <Database />, desc: "Constitutional rights & Digital basics" },
        { name: "Public Policy Core", icon: <ShieldCheck />, desc: "Central/State scheme architecture" },
        { name: "Crisis Response", icon: <Activity />, desc: "Epidemic & Disaster protocols" },
        { name: "Sovereign Cognition", icon: <Cpu />, desc: "Autonomous governance logic" },
        { name: "The Singularity", icon: <Sparkles />, desc: "Self-evolving ethical framework" },
    ];

    const currentStageIdx = Math.floor((level - 1) / 4);

    const startTraining = () => {
        if (level >= 20) {
            addToast({ message: "AI has reached maximum evolution!", type: "success" });
            return;
        }
        setIsTraining(true);
        let p = 0;
        const interval = setInterval(() => {
            p += 2;
            setProgress(p);

            // Periodically change the feeding question based on progress
            if (p % 10 === 0) {
                const randomQuest = stage2Dataset[Math.floor(Math.random() * stage2Dataset.length)].question;
                setCurrentFeedingQuestion(randomQuest);
            }

            if (p >= 100) {
                clearInterval(interval);
                setIsTraining(false);
                setProgress(0);
                setCurrentFeedingQuestion("");
                setLevel(prev => prev + 1);
                setStats(prev => ({
                    nodes: prev.nodes + 128,
                    bias: Math.max(0.01, prev.bias - 0.01),
                    logicDepth: Math.min(100, prev.logicDepth + 1),
                    unlockedSchemes: prev.unlockedSchemes + 25
                }));
                addToast({ message: `Level ${level + 1} Unlocked!`, type: "success" });
            }
        }, 80);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <div style={{ flex: 1 }}>
                    <h1 style={styles.title}>AI Training Hub 🧠</h1>
                    <p style={styles.subtitle}>Evolving SUVIDHA Intelligence: Stage {level}/20</p>
                </div>
            </div>

            <div style={styles.dashboard}>
                {/* Stats Section */}
                <div style={styles.statsCard}>
                    <div style={styles.statLine}>
                        <span>Knowledge Nodes</span>
                        <strong>{stats.nodes.toLocaleString()}</strong>
                    </div>
                    <div style={styles.statLine}>
                        <span>Logic Depth</span>
                        <strong>{stats.logicDepth}%</strong>
                    </div>
                    <div style={styles.statLine}>
                        <span>Bias Deviation</span>
                        <strong style={{ color: '#ef4444' }}>{stats.bias.toFixed(2)}</strong>
                    </div>
                    <div style={styles.statLine}>
                        <span>Active Schemes</span>
                        <strong>{stats.unlockedSchemes}</strong>
                    </div>
                </div>

                {/* Training Viz Section */}
                <div style={styles.vizCard}>
                    <div style={styles.neuralNet}>
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} style={styles.neuronCol}>
                                {[1, 2, 3].map(j => (
                                    <div key={j} style={{
                                        ...styles.neuron,
                                        backgroundColor: isTraining ? '#fbbf24' : '#6366f1',
                                        boxShadow: isTraining ? '0 0 15px #fbbf24' : 'none',
                                        animation: isTraining ? `pulse ${0.5 + Math.random()}s infinite` : 'none'
                                    }}></div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {isTraining ? (
                        <div style={styles.trainingOverlay}>
                            <Zap size={48} color="#fbbf24" style={{ animation: 'bounce 1s infinite' }} />
                            <h3>Optimizing Neural Pathing...</h3>
                            <div style={styles.questionStream}>
                                <span style={styles.feedLabel}>INPUT FEED:</span>
                                <p style={styles.feedText}>{currentFeedingQuestion}</p>
                            </div>
                            <div style={styles.progressTrack}>
                                <div style={{ ...styles.progressFill, width: `${progress}%` }}></div>
                            </div>
                        </div>
                    ) : (
                        <div style={styles.idleOverlay}>
                            <Brain size={64} color="#6366f1" />
                            <h3>{stages[currentStageIdx].name}</h3>
                            <p>{stages[currentStageIdx].desc}</p>
                            <button onClick={startTraining} style={styles.trainBtn}>
                                <Play size={20} /> Train Next Sub-Phase
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Stage Progression UI */}
            <div style={styles.stagesGrid}>
                {stages.map((stage, i) => {
                    const isLocked = level < (i * 4) + 1;
                    const isPassed = level > ((i + 1) * 4);
                    return (
                        <div key={i} style={{
                            ...styles.stageCard,
                            opacity: isLocked ? 0.5 : 1,
                            borderColor: isPassed ? '#16a34a' : (isLocked ? '#e2e8f0' : '#6366f1')
                        }}>
                            <div style={styles.stageIcon}>
                                {isLocked ? <Lock size={20} /> : stage.icon}
                            </div>
                            <h4>{stage.name}</h4>
                            {isPassed && <span style={styles.passedBadge}>Evolved</span>}
                        </div>
                    );
                })}
            </div>

            <style jsx>{`
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.3); opacity: 1; }
                    100% { transform: scale(1); opacity: 0.8; }
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `}</style>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    header: { display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1' },
    title: { fontSize: '2.5rem', fontWeight: 900, margin: 0, color: '#1e293b' },
    subtitle: { color: '#64748b', fontSize: '1.2rem' },
    dashboard: { display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2rem', marginBottom: '3rem' },
    statsCard: { background: '#1e1b4b', padding: '2rem', borderRadius: '24px', color: 'white', display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    statLine: { display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.8rem' },
    vizCard: { background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', height: '500px' },
    neuralNet: { display: 'flex', gap: '4rem', zIndex: 1, opacity: 0.2 },
    neuronCol: { display: 'flex', flexDirection: 'column', gap: '3rem' },
    neuron: { width: '20px', height: '20px', borderRadius: '50%' },
    idleOverlay: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, textAlign: 'center', padding: '2rem' },
    trainingOverlay: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, background: 'rgba(255,255,255,0.95)', padding: '2rem' },
    questionStream: { background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', margin: '1.5rem 0', border: '1px solid #e2e8f0', width: '80%', textAlign: 'center' },
    feedLabel: { fontSize: '0.7rem', fontWeight: 900, color: '#6366f1', letterSpacing: '0.1em' },
    feedText: { margin: '0.5rem 0 0 0', fontStyle: 'italic', color: '#475569' },
    trainBtn: { marginTop: '2rem', padding: '1rem 2rem', background: '#6366f1', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.3)' },
    progressTrack: { width: '300px', height: '10px', background: '#e2e8f0', borderRadius: '10px', marginTop: '1.5rem', overflow: 'hidden' },
    progressFill: { height: '100%', background: '#fbbf24', transition: 'width 0.1s linear' },
    stagesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' },
    stageCard: { background: 'white', padding: '1.5rem', borderRadius: '20px', border: '2px solid transparent', textAlign: 'center', position: 'relative' },
    stageIcon: { marginBottom: '1rem', color: '#6366f1' },
    passedBadge: { marginTop: '0.5rem', display: 'inline-block', background: '#dcfce7', color: '#16a34a', fontSize: '0.75rem', fontWeight: 'bold', padding: '0.2rem 0.6rem', borderRadius: '20px' }
};
