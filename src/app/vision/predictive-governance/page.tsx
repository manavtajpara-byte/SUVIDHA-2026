'use client';

import React, { useState } from 'react';
import { ArrowLeft, Map as MapIcon, BarChart3, Database, TrendingUp, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PredictiveGovernancePage() {
    const router = useRouter();
    const [view, setView] = useState<'heatmap' | 'budget' | 'digital-twin' | 'impact'>('heatmap');
    const [placedItems, setPlacedItems] = useState<string[]>([]);

    const stats = [
        { label: 'Grievance Resolution', value: '99.2%', trend: '+4%' },
        { label: 'Resource Efficiency', value: '87%', trend: '+12%' },
        { label: 'Public Sentiment', value: 'Highly Positive', trend: 'Stable' },
    ];

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}><ArrowLeft size={32} /></button>
                <h1 style={styles.title}>Predictive Governance</h1>
            </div>

            <div style={styles.statsRow}>
                {stats.map((s, i) => (
                    <div key={i} style={styles.statCard}>
                        <span style={styles.statLabel}>{s.label}</span>
                        <div style={styles.statValRow}>
                            <span style={styles.statVal}>{s.value}</span>
                            <span style={styles.statTrend}>{s.trend}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div style={styles.navTabs}>
                <button onClick={() => setView('heatmap')} style={{ ...styles.tab, ...(view === 'heatmap' ? styles.activeTab : {}) }}><MapIcon size={18} /> Grievance Heatmap</button>
                <button onClick={() => setView('budget')} style={{ ...styles.tab, ...(view === 'budget' ? styles.activeTab : {}) }}><BarChart3 size={18} /> Dynamic Budget</button>
                <button onClick={() => setView('digital-twin')} style={{ ...styles.tab, ...(view === 'digital-twin' ? styles.activeTab : {}) }}><TrendingUp size={18} /> Digital Twin</button>
                <button onClick={() => setView('impact')} style={{ ...styles.tab, ...(view === 'impact' ? styles.activeTab : {}) }}><Database size={18} /> Impact Simulator</button>
            </div>

            <div style={styles.mainDisplay}>
                {view === 'heatmap' && (
                    <div style={styles.heatmapBox}>
                        <div style={styles.mapHeader}>
                            <h3>Real-time Complaint Density (Ward #4)</h3>
                            <div style={styles.legend}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 12, height: 12, background: '#fee2e2' }} /> Low</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 12, height: 12, background: '#f87171' }} /> Medium</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: 12, height: 12, background: '#b91c1c' }} /> Critical</div>
                            </div>
                        </div>
                        <div style={styles.mapViz}>
                            <div className="hotspot" style={{ top: '20%', left: '30%', width: 60, height: 60, background: 'rgba(185, 28, 28, 0.4)' }} />
                            <div className="hotspot" style={{ top: '50%', left: '70%', width: 40, height: 40, background: 'rgba(248, 113, 113, 0.4)' }} />
                            <div className="hotspot" style={{ top: '80%', left: '40%', width: 80, height: 80, background: 'rgba(185, 28, 28, 0.6)' }} />
                            <p style={{ position: 'absolute', bottom: 10, right: 10, color: '#666', fontSize: '0.8rem' }}>AI predictive model flags Water Scarcity in Sector 4.</p>
                        </div>
                    </div>
                )}

                {view === 'budget' && (
                    <div style={styles.budgetBox}>
                        <h3>Interactive Fund Flow (FY 2026-27)</h3>
                        <div style={styles.budgetList}>
                            {[
                                { name: 'Infrastructure', val: 45, spent: 30 },
                                { name: 'Education', val: 25, spent: 22 },
                                { name: 'Healthcare', val: 20, spent: 10 },
                                { name: 'Digital Services', val: 10, spent: 8 },
                            ].map((item, i) => (
                                <div key={i} style={styles.budgetItem}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span>{item.name}</span>
                                        <span>₹{item.spent}Cr / ₹{item.val}Cr</span>
                                    </div>
                                    <div style={styles.progressBg}>
                                        <div style={{ ...styles.progressFill, width: `${(item.spent / item.val) * 100}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'digital-twin' && (
                    <div style={styles.twinBox}>
                        <AlertTriangle color="#fbbf24" size={32} />
                        <h2>Community Digital Twin</h2>
                        <p>Simulating the impact of proposed 4-lane highway on local agriculture yields.</p>
                        <div style={styles.twinGrid}>
                            <div style={styles.twinCard}>
                                <h4>Scenario A: Baseline</h4>
                                <p>Yield: 4.2 Tons/Acre</p>
                            </div>
                            <div style={styles.twinCard}>
                                <h4>Scenario B: Planned</h4>
                                <p>Yield: 4.8 Tons/Acre (due to logistics)</p>
                            </div>
                        </div>
                        <button style={styles.simBtn}>Run Monte Carlo Simulation</button>
                    </div>
                )}

                {view === 'impact' && (
                    <div style={styles.impactBox}>
                        <h3>AI Strategy: Infrastructure Placement</h3>
                        <p>Simulate the outcome of adding new facilities to the ward.</p>
                        <div style={styles.impactGrid}>
                            <div style={styles.mapTool}>
                                <div style={styles.mapGrid}>
                                    {Array.from({ length: 9 }).map((_, i) => (
                                        <div
                                            key={i}
                                            style={{ ...styles.gridTile, background: placedItems.includes(i.toString()) ? '#6366f1' : '#f1f5f9' }}
                                            onClick={() => setPlacedItems([...placedItems, i.toString()])}
                                        >
                                            {placedItems.includes(i.toString()) && <Database size={16} color="white" />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={styles.impactOutcome}>
                                <h4>Predictive ROI (Next 5 Years)</h4>
                                <div style={styles.impactStat}>
                                    <span>Economic Growth</span>
                                    <strong style={{ color: '#10b981' }}>+{placedItems.length * 1.5}%</strong>
                                </div>
                                <div style={styles.impactStat}>
                                    <span>Standard of Living</span>
                                    <strong style={{ color: '#10b981' }}>+{placedItems.length * 2.1}%</strong>
                                </div>
                                <button
                                    onClick={() => setPlacedItems([])}
                                    style={{ ...styles.simBtn, background: '#ef4444', width: '100%' }}
                                >
                                    Reset Simulation
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .hotspot { position: absolute; border-radius: 50%; animation: pulse 2s infinite; }
                @keyframes pulse { 0% { transform: scale(0.9); opacity: 0.6; } 50% { transform: scale(1.1); opacity: 0.8; } 100% { transform: scale(0.9); opacity: 0.6; } }
            `}</style>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    header: { display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' },
    backBtn: { background: '#f1f5f9', border: 'none', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' },
    title: { fontSize: '2.5rem', margin: 0 },
    statsRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' },
    statCard: { padding: '1.5rem', background: 'white', borderRadius: '16px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' },
    statLabel: { fontSize: '0.85rem', color: '#64748b' },
    statValRow: { display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.4rem' },
    statVal: { fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' },
    statTrend: { fontSize: '0.75rem', color: '#10b981', fontWeight: 700 },
    navTabs: { display: 'flex', gap: '1rem', marginBottom: '2rem' },
    tab: { background: 'white', border: '1px solid #e2e8f0', padding: '0.75rem 1.5rem', borderRadius: '12px', cursor: 'pointer', display: 'flex', gap: '0.5rem', alignItems: 'center', transition: 'all 0.2s' },
    activeTab: { borderColor: '#6366f1', background: '#6366f1', color: 'white' },
    mainDisplay: { background: 'white', borderRadius: '24px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', minHeight: '400px' },
    heatmapBox: { height: '100%', display: 'flex', flexDirection: 'column' },
    mapHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    legend: { display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#64748b' },
    mapViz: { flex: 1, background: '#f1f5f9', borderRadius: '16px', position: 'relative', overflow: 'hidden', minHeight: '300px' },
    budgetBox: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    progressBg: { background: '#f1f5f9', height: '12px', borderRadius: '6px', overflow: 'hidden' },
    progressFill: { background: '#6366f1', height: '100%', transition: 'width 1s ease-out' },
    twinBox: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' },
    twinGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%', maxWidth: '600px' },
    twinCard: { padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' },
    simBtn: { background: '#1e293b', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', marginTop: '1rem' },
    impactBox: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    impactGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' },
    mapGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', background: '#e2e8f0', padding: '10px', borderRadius: '12px' },
    gridTile: { aspectRatio: '1/1', background: '#f1f5f9', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' },
    impactOutcome: { background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    impactStat: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.1rem' }
};
