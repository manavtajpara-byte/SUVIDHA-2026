'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Cpu, Globe, Zap, ShieldAlert, Terminal, MessageSquare, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';

export default function SingularityPage() {
    const { language } = useAppState();
    const t = (translations as any)[language] || translations.en;
    const router = useRouter();
    const [logs, setLogs] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const initialLogs = [
            'System Initialized: SUVIDHA-AI Core v4.0.2',
            'Neutrality Check: 100% Bias-Free Protocol Active',
            'Synchronizing with National Data Grid...',
            'Policy Simulation: Running Grant Optimization #992',
            'Singularity Node #1 Online.'
        ];
        let i = 0;
        const interval = setInterval(() => {
            if (i < initialLogs.length) {
                setLogs(prev => [...prev, initialLogs[i]]);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 800);
        return () => clearInterval(interval);
    }, []);

    const handleAsk = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue) return;
        setLogs(prev => [...prev, `Citizen: ${inputValue}`, `Singularity: Analysing resources... Optimum allocation calculated for sector 4.`]);
        setInputValue('');
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h2 style={styles.title}>{t.singularity || 'The Singularity'}</h2>
            </div>

            <div style={styles.hero}>
                <div style={styles.orbContainer}>
                    <div style={styles.orb} />
                    <Sparkles size={48} color="#fbbf24" style={styles.orbIcon} />
                </div>
                <h3>Sovereign AI Singularity</h3>
                <p>Gemini-3 Pro Hyper-Intelligence Cluster Active.</p>
            </div>

            <div style={styles.contentGrid}>
                {/* Digital Twin Village Map */}
                <div style={{ ...styles.card, gridColumn: 'span 2' }}>
                    <div style={styles.aiHeader}>
                        <Globe size={40} color="#6366f1" />
                        <div>
                            <h3 style={{ margin: 0 }}>Village Digital Twin (Live)</h3>
                            <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Real-time IoT Telemetry & Predictive Simulation</p>
                        </div>
                    </div>
                    <div style={styles.twinGrid}>
                        {Array.from({ length: 32 }).map((_, i) => (
                            <div key={i} style={{
                                ...styles.twinNode,
                                backgroundColor: Math.random() > 0.8 ? '#ef4444' : '#10b981',
                                animation: Math.random() > 0.5 ? 'pulse-green 2s infinite' : 'none'
                            }}>
                                <span style={styles.nodeLabel}>Node {i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={styles.terminalCard}>
                    <div style={styles.terminalHeader}>
                        <Terminal size={20} />
                        <span>Hyper-Intelligence Logs (Deep Reasoning)</span>
                    </div>
                    <div style={styles.logArea}>
                        {logs.map((log, i) => (
                            <div key={i} style={styles.logLine}>
                                <span style={styles.prompt}>&gt;</span> {log}
                            </div>
                        ))}
                    </div>
                </div>

                <div style={styles.aiCard}>
                    <div style={styles.aiHeader}>
                        <MessageSquare size={24} />
                        <span>Neural Sovereign Interface</span>
                    </div>
                    <div style={styles.chatInfo}>
                        <p>Direct access to the autonomous governance logic core.</p>
                    </div>
                    <form onSubmit={handleAsk} style={styles.chatForm}>
                        <input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type sovereign inquiry..."
                            style={styles.chatInput}
                        />
                        <button type="submit" style={styles.sendBtn}><Zap size={20} /></button>
                    </form>
                </div>
            </div>

            <div style={styles.warningBox}>
                <ShieldAlert size={24} color="#f59e0b" />
                <p>CRITICAL: High-Level AI reasoning is currently managing 94% of village utility efficiency.</p>
            </div>

            <style jsx>{`
                @keyframes pulse-orb { 0% { box-shadow: 0 0 20px #4f46e5; } 50% { box-shadow: 0 0 80px #818cf8; } 100% { box-shadow: 0 0 20px #4f46e5; } }
                @keyframes pulse-green { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
                .orb { animation: pulse-orb 4s infinite ease-in-out; }
            `}</style>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem', color: 'white', backgroundColor: '#020617', minHeight: '100vh' },
    header: { display: 'flex', alignItems: 'center', gap: '2rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1' },
    title: { fontSize: '2.5rem', fontWeight: 900, margin: 0 },
    hero: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', margin: '2rem 0' },
    orbContainer: { position: 'relative', width: '120px', height: '120px' },
    orb: { width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(45deg, #4f46e5, #818cf8)', position: 'absolute' },
    orbIcon: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 },
    contentGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' },
    terminalCard: { backgroundColor: '#0f172a', borderRadius: '1.5rem', border: '1px solid #1e293b', overflow: 'hidden' },
    terminalHeader: { backgroundColor: '#1e293b', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#94a3b8' },
    logArea: { padding: '1.5rem', height: '300px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', color: '#38bdf8' },
    logLine: { marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' },
    prompt: { color: '#818cf8' },
    aiCard: { backgroundColor: '#1e1b4b', borderRadius: '1.5rem', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid #312e81' },
    aiHeader: { display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 'bold' },
    chatInfo: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: '#a5b4fc' },
    chatForm: { display: 'flex', gap: '0.5rem', marginTop: 'auto' },
    chatInput: { flex: 1, backgroundColor: '#312e81', border: 'none', borderRadius: '0.75rem', padding: '1rem', color: 'white', outline: 'none' },
    sendBtn: { padding: '1rem', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '0.75rem', cursor: 'pointer' },
    warningBox: { backgroundColor: '#451a03', border: '1px solid #78350f', color: '#fbbf24', padding: '1.5rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' },
    votingCard: { backgroundColor: '#1e1b4b', borderRadius: '1.5rem', padding: '1.5rem', border: '1px solid #312e81', display: 'flex', flexDirection: 'column', gap: '1rem' },
    policyRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: '#0f172a' },
    voteBtns: { display: 'flex', gap: '0.5rem' },
    voteBtn: { background: 'none', border: 'none', color: '#10b981', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' },
    mapCard: { backgroundColor: '#0f172a', borderRadius: '1.5rem', padding: '1.5rem', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '1rem' },
    miniMap: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', height: '150px' },
    mapTile: { backgroundColor: '#6366f1', borderRadius: '4px' },
    twinGrid: { display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '1rem', marginTop: '1.5rem' },
    twinNode: { height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' },
    nodeLabel: { fontSize: '0.6rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.8)' }
};
