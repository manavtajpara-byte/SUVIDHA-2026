'use client';

import React, { useState } from 'react';
import { Users, Bell, BarChart3, Radio, ShieldCheck, Activity, Search, ChevronRight, PieChart, Layers } from 'lucide-react';
import { useAppState } from '@/context/StateContext';

export default function GovtDashboard() {
    const { user, addToast } = useAppState();
    const [msg, setMsg] = useState('');
    const [target, setTarget] = useState('all');

    const handleBroadcast = () => {
        if (!msg) return;

        const newBroadcast = {
            id: Date.now(),
            sender: user?.details?.govt?.department || 'Government',
            target,
            message: msg,
            timestamp: new Date().toISOString()
        };

        const existing = JSON.parse(localStorage.getItem('suvidha_broadcasts') || '[]');
        localStorage.setItem('suvidha_broadcasts', JSON.stringify([newBroadcast, ...existing]));

        addToast({ message: `Secure Broadcast Sent to ${target.toUpperCase()}`, type: 'success' });
        setMsg('');
    };

    return (
        <div style={styles.adminContainer}>
            <div style={styles.topBar}>
                <div style={styles.headerInfo}>
                    <h2 style={styles.title}>Administrative Command</h2>
                    <p style={styles.subtitle}>{user?.details?.govt?.department || 'National Node'} • {user?.details?.govt?.designation || 'System Admin'}</p>
                </div>
                <div style={styles.statusBadge}><div style={styles.pulse}></div> SYSTEM OPERATIONAL</div>
            </div>

            <div style={styles.mainGrid}>
                <div style={styles.leftCol}>
                    <div style={styles.metricRow}>
                        <div style={styles.metricCard}>
                            <h4 style={styles.metricLabel}>Reach Index</h4>
                            <div style={styles.metricVal}>94.2%</div>
                            <div style={styles.metricSub}>+1.2% this month</div>
                        </div>
                        <div style={{ ...styles.metricCard, borderLeft: '1px solid #f1f5f9' }}>
                            <h4 style={styles.metricLabel}>Daily Transactions</h4>
                            <div style={styles.metricVal}>8,421</div>
                            <div style={styles.metricSub}>Across 12 nodes</div>
                        </div>
                    </div>

                    <div style={styles.broadcastBox}>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <Bell size={22} color="#0284c7" />
                            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Secure Broadcast Channel</h3>
                        </div>

                        <div style={styles.targetSelector}>
                            {['all', 'student', 'youth'].map(t => (
                                <button key={t} onClick={() => setTarget(t)} style={{ ...styles.targetBtn, ...(target === t ? styles.targetBtnActive : {}) }}>
                                    {t === 'all' ? 'All Citizens' : t === 'student' ? 'Students' : 'Youth'}
                                </button>
                            ))}
                        </div>

                        <textarea
                            style={styles.broadcastInput}
                            placeholder="Draft official notification..."
                            value={msg}
                            onChange={e => setMsg(e.target.value)}
                            rows={3}
                        />

                        <button onClick={handleBroadcast} style={styles.broadcastActionBtn} disabled={!msg}>
                            <Radio size={18} /> DISPATCH NOTIFICATION
                        </button>
                    </div>

                    <div style={styles.approvalSection}>
                        <h3 style={styles.sectionTitle}>Queue Processing</h3>
                        <div style={styles.queueList}>
                            <div style={styles.queueItem}>
                                <div style={styles.queueIcon}><ShieldCheck size={18} /></div>
                                <div style={styles.queueInfo}>
                                    <h4 style={styles.queueTitle}>Caste Certificates</h4>
                                    <p style={styles.queueSub}>12 Pending Verification</p>
                                </div>
                                <button style={styles.processBtn}>VERIFY BATCH</button>
                            </div>
                            <div style={styles.queueItem}>
                                <div style={{ ...styles.queueIcon, background: '#fef3c7', color: '#d97706' }}><Activity size={18} /></div>
                                <div style={styles.queueInfo}>
                                    <h4 style={styles.queueTitle}>Scholarship KYC</h4>
                                    <p style={styles.queueSub}>85 Automated Clearances</p>
                                </div>
                                <button style={styles.processBtn}>PROCESS</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={styles.rightCol}>
                    <div style={styles.demographicsCard}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800 }}>User Hubs</h4>
                            <PieChart size={18} color="#94a3b8" />
                        </div>
                        <div style={styles.demoItem}>
                            <span>Students</span><strong>1,240</strong>
                            <div style={styles.demoBar}><div style={{ ...styles.demoFill, width: '60%', background: '#9333ea' }}></div></div>
                        </div>
                        <div style={styles.demoItem}>
                            <span>Youth</span><strong>850</strong>
                            <div style={styles.demoBar}><div style={{ ...styles.demoFill, width: '40%', background: '#7c3aed' }}></div></div>
                        </div>
                    </div>

                    <div style={styles.activityLog}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 800 }}>Audit Trail</h4>
                            <Layers size={18} color="#94a3b8" />
                        </div>
                        <div style={styles.logItem}><span>09:42 AM</span> New Welfare Scheme Online</div>
                        <div style={styles.logItem}><span>Yesterday</span> Batch Verification #A24 Complete</div>
                        <div style={styles.logItem}><span>yesterday</span> System Patch v2.4.1 Applied</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    adminContainer: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' },
    title: { fontSize: '1.75rem', fontWeight: 900, color: '#1e293b', margin: 0 },
    subtitle: { fontSize: '0.95rem', color: '#64748b', margin: '0.25rem 0 0' },
    statusBadge: { display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f0fdf4', padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 800, color: '#16a34a', border: '1px solid #bbf7d0' },
    pulse: { width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 0 4px rgba(16, 185, 129, 0.2)' },
    mainGrid: { display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' },
    leftCol: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    metricRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'white', borderRadius: '24px', border: '1px solid #f1f5f9', overflow: 'hidden' },
    metricCard: { padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' },
    metricLabel: { fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' },
    metricVal: { fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' },
    metricSub: { fontSize: '0.75rem', color: '#16a34a', fontWeight: 600 },
    broadcastBox: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'column' },
    targetSelector: { display: 'flex', gap: '0.75rem', marginBottom: '1rem' },
    targetBtn: { flex: 1, padding: '0.6rem', borderRadius: '12px', border: '1px solid #f1f5f9', background: '#f8fafc', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', color: '#64748b' },
    targetBtnActive: { background: '#0284c7', color: 'white', border: 'none' },
    broadcastInput: { width: '100%', padding: '1.25rem', borderRadius: '16px', border: '1px solid #f1f5f9', background: '#f8fafc', fontSize: '0.95rem', marginBottom: '1.25rem', resize: 'none', outline: 'none' },
    broadcastActionBtn: { background: '#1e293b', color: 'white', border: 'none', padding: '1rem', borderRadius: '16px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '0.85rem' },
    approvalSection: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    sectionTitle: { fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', margin: 0 },
    queueList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    queueItem: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '20px', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' },
    queueIcon: { width: '42px', height: '42px', background: '#f0fdf4', color: '#16a34a', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    queueInfo: { flex: 1 },
    queueTitle: { margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#1e293b' },
    queueSub: { margin: 0, fontSize: '0.8rem', color: '#64748b' },
    processBtn: { background: '#f1f5f9', color: '#1e293b', border: 'none', padding: '0.5rem 1rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer' },
    rightCol: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    demographicsCard: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '24px', padding: '1.5rem' },
    demoItem: { marginBottom: '1.25rem' },
    demoBar: { height: '6px', background: '#f1f5f9', borderRadius: '3px', marginTop: '0.5rem', overflow: 'hidden' },
    demoFill: { height: '100%', borderRadius: '3px' },
    activityLog: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '24px', padding: '1.5rem' },
    logItem: { fontSize: '0.8rem', color: '#475569', padding: '0.75rem 0', borderBottom: '1px solid #f8fafc' }
};
