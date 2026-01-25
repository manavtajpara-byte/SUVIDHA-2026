'use client';

import React, { useState, useEffect } from 'react';
import AethelLayout from '@/components/AethelLayout';
import {
    Activity, Droplets, Wind, Lightbulb,
    Thermometer, ShieldCheck, Zap, BarChart3,
    Power, RefreshCw, MapPin, Radio
} from 'lucide-react';
import { useAppState } from '@/context/StateContext';

export default function SmartVillageAnalytics() {
    const { addToast } = useAppState();
    const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());
    const [sensors, setSensors] = useState([
        { id: 1, name: 'Water Purity', value: '98', unit: '%', status: 'Optimal', color: '#3b82f6', history: [95, 96, 98, 97, 98] },
        { id: 2, name: 'Air Quality', value: '42', unit: 'AQI', status: 'Good', color: '#10b981', history: [45, 43, 42, 44, 42] },
        { id: 3, name: 'Soil PH', value: '6.8', unit: 'pH', status: 'Healthy', color: '#8b5cf6', history: [6.7, 6.8, 6.8, 6.9, 6.8] },
        { id: 4, name: 'Grid Load', value: '74', unit: '%', status: 'Stable', color: '#f59e0b', history: [70, 72, 74, 73, 74] },
    ]);

    const sidebarLinks = [
        { label: 'IoT Console', icon: <Radio size={20} />, href: '/vision/smart-village', active: true },
        { label: 'Asset Map', icon: <MapPin size={20} />, href: '/vision/smart-village/map' },
        { label: 'Alerts', icon: <Activity size={20} />, href: '/vision/smart-village/alerts' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setSensors(prev => prev.map(s => {
                const change = (Math.random() - 0.5) * 2;
                const newVal = (parseFloat(s.value) + change).toFixed(1);
                return { ...s, value: newVal };
            }));
            setLastSync(new Date().toLocaleTimeString());
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleOverride = (name: string) => {
        addToast({ message: `Manual override initiated for ${name}`, type: 'info' });
    };

    return (
        <AethelLayout
            title="Smart Village Command"
            themeColor="#059669"
            themeSoft="#ecfdf5"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.container}>
                <div style={styles.syncRow}>
                    <div style={styles.nodeBadge}>Node: PANCHAYAT_4421_SEC4</div>
                    <div style={styles.syncTime}><RefreshCw size={14} className="spin" /> Last updated: {lastSync}</div>
                </div>

                <div style={styles.mainGrid}>
                    <div style={styles.statsCol}>
                        <div style={styles.sensorGrid}>
                            {sensors.map(s => (
                                <div key={s.id} style={styles.sensorCard}>
                                    <h4 style={styles.sName}>{s.name}</h4>
                                    <div style={styles.sValueRow}>
                                        <span style={{ ...styles.sValue, color: s.color }}>{s.value}</span>
                                        <span style={styles.sUnit}>{s.unit}</span>
                                    </div>
                                    <div style={styles.miniChart}>
                                        {s.history.map((h, i) => (
                                            <div key={i} style={{ ...styles.chartBar, height: `${(h / 100) * 40}px`, background: s.color + '40' }} />
                                        ))}
                                    </div>
                                    <div style={{ ...styles.statusBadge, color: s.color, background: s.color + '15' }}>{s.status}</div>
                                </div>
                            ))}
                        </div>

                        <div style={styles.controlBox}>
                            <h3 style={styles.sectionTitle}>Infrastructure Controls</h3>
                            <div style={styles.controlGrid}>
                                {[
                                    { name: 'Street Lights', icon: <Lightbulb />, state: 'Auto' },
                                    { name: 'Water Pump', icon: <Droplets />, state: 'Remote' },
                                    { name: 'Security CCTV', icon: <ShieldCheck />, state: 'Active' },
                                    { name: 'Power Grid', icon: <Zap />, state: 'Sovereign' }
                                ].map((c, i) => (
                                    <div key={i} style={styles.ctrlCard}>
                                        <div style={styles.ctrlIcon}>{c.icon}</div>
                                        <div style={styles.ctrlInfo}>
                                            <h4 style={styles.ctrlName}>{c.name}</h4>
                                            <p style={styles.ctrlState}>{c.state}</p>
                                        </div>
                                        <button onClick={() => handleOverride(c.name)} style={styles.overrideBtn}><Power size={18} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div style={styles.alertCol}>
                        <div style={styles.mapCard}>
                            <h4 style={styles.smallTitle}>Asset Mesh Topology</h4>
                            <div style={styles.mapGraphic}>
                                <div style={{ ...styles.ping, top: '30%', left: '40%' }} />
                                <div style={{ ...styles.ping, top: '60%', left: '70%' }} />
                                <div style={{ ...styles.ping, top: '20%', left: '80%' }} />
                                <p style={styles.nodeCount}>34 Active Nodes</p>
                            </div>
                        </div>

                        <div style={styles.logCard}>
                            <h4 style={styles.smallTitle}>System Log</h4>
                            <div style={styles.logs}>
                                <div style={styles.logEntry}><span>13:42</span> Water depth normal in Tank 4</div>
                                <div style={styles.logEntry}><span>13:10</span> Streetlight battery 94%</div>
                                <div style={styles.logEntry}><span>12:45</span> Solar input: 14.2kW</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .spin { animation: spin 4s linear infinite; }
            `}</style>
        </AethelLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    syncRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' },
    nodeBadge: { background: '#1e293b', color: '#10b981', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 800 },
    syncTime: { fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem' },
    mainGrid: { display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem' },
    statsCol: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    sensorGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' },
    sensorCard: { background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #f1f5f9', position: 'relative' },
    sName: { margin: 0, fontSize: '0.85rem', color: '#64748b', fontWeight: 700 },
    sValueRow: { margin: '0.5rem 0', display: 'flex', alignItems: 'baseline', gap: '0.25rem' },
    sValue: { fontSize: '1.75rem', fontWeight: 900 },
    sUnit: { fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 },
    miniChart: { height: '40px', display: 'flex', alignItems: 'flex-end', gap: '4px', margin: '0.75rem 0' },
    chartBar: { width: '100%', borderRadius: '2px' },
    statusBadge: { padding: '0.25rem 0.6rem', borderRadius: '8px', fontSize: '0.65rem', fontWeight: 800, display: 'inline-block' },
    controlBox: { background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #f1f5f9' },
    sectionTitle: { fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', marginBottom: '1.5rem' },
    controlGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' },
    ctrlCard: { background: '#f8fafc', padding: '1.25rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid #f1f5f9' },
    ctrlIcon: { width: '44px', height: '44px', background: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' },
    ctrlInfo: { flex: 1 },
    ctrlName: { margin: 0, fontSize: '0.9rem', fontWeight: 800, color: '#1e293b' },
    ctrlState: { margin: 0, fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 },
    overrideBtn: { width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
    alertCol: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    mapCard: { background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #f1f5f9' },
    smallTitle: { margin: '0 0 1rem', fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800 },
    mapGraphic: { height: '180px', background: '#f1f5f9', borderRadius: '16px', position: 'relative', overflow: 'hidden' },
    ping: { position: 'absolute', width: '10px', height: '10px', background: '#10b981', borderRadius: '50%', border: '2px solid white' },
    nodeCount: { position: 'absolute', bottom: '10px', left: '10px', margin: 0, fontSize: '0.7rem', fontWeight: 800, color: '#64748b' },
    logCard: { background: '#1e293b', padding: '1.5rem', borderRadius: '24px', color: 'white' },
    logs: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    logEntry: { fontSize: '0.75rem', opacity: 0.8, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }
};
