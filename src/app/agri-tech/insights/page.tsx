'use client';

import React from 'react';
import { Leaf, ArrowLeft, ThermometerSun, Droplets, Wind, AlertTriangle, TrendingUp, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FarmInsightsPage() {
    const router = useRouter();

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <div style={{ flex: 1 }}>
                    <h1 style={styles.title}>Farm Insights 📈</h1>
                    <p style={styles.subtitle}>AI-Driven Crop & Soil Intelligence</p>
                </div>
                <div style={styles.farmerId}>
                    Farmer ID: #KA-99210
                </div>
            </div>

            <div style={styles.topGrid}>
                {/* Crop Health Map (Mock) */}
                <div style={styles.mapCard}>
                    <div style={styles.mapHeader}>
                        <Search size={20} color="#64748b" />
                        <h3 style={{ margin: 0 }}>Satellite Crop Health Index</h3>
                    </div>
                    <div style={styles.mapPlaceholder}>
                        {/* Simulation of NDVI / Heatmap */}
                        <div style={{ ...styles.heatZone, background: 'rgba(34, 197, 94, 0.6)', width: '60%', height: '40%', top: '10%', left: '10%' }}>Optimal Growth</div>
                        <div style={{ ...styles.heatZone, background: 'rgba(239, 68, 68, 0.6)', width: '20%', height: '30%', bottom: '10%', right: '10%' }}>Stress Alert</div>
                        <div style={{ ...styles.heatZone, background: 'rgba(234, 88, 12, 0.6)', width: '30%', height: '20%', top: '50%', left: '40%' }}>Low Moisture</div>
                    </div>
                    <div style={styles.legend}>
                        <div style={styles.legendItem}><div style={{ ...styles.dot, background: '#22c55e' }}></div> Healthy</div>
                        <div style={styles.legendItem}><div style={{ ...styles.dot, background: '#ea580c' }}></div> Moderate</div>
                        <div style={styles.legendItem}><div style={{ ...styles.dot, background: '#ef4444' }}></div> High Stress</div>
                    </div>
                </div>

                {/* Soil Analysis Details */}
                <div style={styles.statsCol}>
                    <div style={styles.statCard}>
                        <div style={{ ...styles.iconBox, background: '#ecfdf5', color: '#059669' }}>
                            <Droplets size={24} />
                        </div>
                        <div>
                            <p style={styles.statLabel}>Soil Moisture</p>
                            <h3 style={styles.statValue}>22%</h3>
                        </div>
                        <span style={styles.statTrend}>Optimal</span>
                    </div>

                    <div style={styles.statCard}>
                        <div style={{ ...styles.iconBox, background: '#fff7ed', color: '#ea580c' }}>
                            <ThermometerSun size={24} />
                        </div>
                        <div>
                            <p style={styles.statLabel}>Soil Temp</p>
                            <h3 style={styles.statValue}>24°C</h3>
                        </div>
                    </div>

                    <div style={styles.statCard}>
                        <div style={{ ...styles.iconBox, background: '#fef2f2', color: '#dc2626' }}>
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <p style={styles.statLabel}>Disease Risk</p>
                            <h3 style={styles.statValue}>Low</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div style={styles.aiAdvice}>
                <div style={styles.adviceHeader}>
                    <TrendingUp size={24} color="#16a34a" />
                    <h3 style={{ margin: 0 }}>Intelligent Farm Advice</h3>
                </div>
                <div style={styles.adviceContent}>
                    <p>"Based on recent satellite data and soil moisture levels, we recommend scheduling an irrigation cycle in the North-East quadrant within the next 48 hours. Nitrogen levels are sufficient, but a mild supplement of Potash would improve yield by 15%."</p>
                    <button style={styles.actionLink}>Order Required Fertilizer &rarr;</button>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    header: { display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#16a34a' },
    title: { fontSize: '2.5rem', fontWeight: 900, margin: 0, color: '#1e293b' },
    subtitle: { color: '#64748b', margin: '0.25rem 0' },
    farmerId: { background: '#f1f5f9', padding: '0.5rem 1rem', borderRadius: '50px', fontWeight: 'bold', fontSize: '0.9rem', color: '#475569' },
    topGrid: { display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', marginBottom: '2rem' },
    mapCard: { background: 'white', padding: '1.5rem', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' },
    mapHeader: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' },
    mapPlaceholder: { height: '400px', background: '#f1f5f9', borderRadius: '16px', position: 'relative', overflow: 'hidden', backgroundImage: 'url("https://www.google.com/maps/vt/pb=!1m4!1m3!1i14!2i9290!3i7521!2m3!1e0!2sm!3i531115167!3m8!2sen!3sin!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e4!23i1301875")' },
    heatZone: { position: 'absolute', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.7rem', backdropFilter: 'blur(4px)' },
    legend: { display: 'flex', gap: '1.5rem', marginTop: '1.5rem' },
    legendItem: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748b' },
    dot: { width: '10px', height: '10px', borderRadius: '50%' },
    statsCol: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    statCard: { background: 'white', padding: '1.5rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' },
    iconBox: { width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    statLabel: { margin: 0, fontSize: '0.85rem', color: '#64748b' },
    statValue: { margin: '0.1rem 0 0 0', fontSize: '1.25rem', fontWeight: 900, color: '#1e293b' },
    statTrend: { marginLeft: 'auto', background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' },
    aiAdvice: { background: '#f0fdf4', padding: '2rem', borderRadius: '24px', border: '1px solid #bbfcce' },
    adviceHeader: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' },
    adviceContent: { color: '#166534', lineHeight: '1.6', fontSize: '1.1rem' },
    actionLink: { marginTop: '1rem', background: 'none', border: 'none', color: '#15803d', fontWeight: 'bold', cursor: 'pointer', display: 'block', padding: 0 }
};
