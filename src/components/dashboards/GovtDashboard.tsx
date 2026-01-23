import React, { useState } from 'react';
import { Users, Bell, BarChart3, Radio } from 'lucide-react';
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
            target, // 'all', 'student', 'youth'
            message: msg,
            timestamp: new Date().toISOString()
        };

        const existing = JSON.parse(localStorage.getItem('suvidha_broadcasts') || '[]');
        localStorage.setItem('suvidha_broadcasts', JSON.stringify([newBroadcast, ...existing]));

        addToast({ message: `Broadcast Sent to ${target.toUpperCase()} users!`, type: 'success' });
        setMsg('');
    };

    return (
        <div className="animate-fade-in" style={{ padding: '1rem' }}>
            <div style={styles.header}>
                <h2 style={styles.greeting}>Admin Console 🏛️</h2>
                <p style={styles.sub}>{user?.details?.govt?.department || 'Government'} • {user?.details?.govt?.designation || 'Official'}</p>
            </div>

            <div style={styles.grid}>
                {/* Stats Card */}
                <div style={styles.card}>
                    <div style={{ ...styles.iconBox, background: '#ffedd5', color: '#c2410c' }}>
                        <Users size={32} />
                    </div>
                    <h3>Demographics</h3>
                    <div style={styles.statsRow}>
                        <div>
                            <span style={styles.statVal}>1,240</span>
                            <span style={styles.statLabel}>Students</span>
                        </div>
                        <div>
                            <span style={styles.statVal}>850</span>
                            <span style={styles.statLabel}>Youth</span>
                        </div>
                    </div>
                    <button style={styles.actionBtn}>View Detailed Report</button>
                </div>

                {/* Broadcast Center */}
                <div style={{ ...styles.card, gridColumn: 'span 2' }}>
                    <div style={{ ...styles.iconBox, background: '#e0f2fe', color: '#0284c7' }}>
                        <Bell size={32} />
                    </div>
                    <h3>Notification Broadcast Center</h3>
                    <p style={styles.cardText}>Send alerts to specific user groups.</p>

                    <div style={styles.form}>
                        <div style={styles.radioGroup}>
                            <label style={styles.radioLabel}>
                                <input type="radio" name="target" value="all" checked={target === 'all'} onChange={e => setTarget(e.target.value)} /> All Citizens
                            </label>
                            <label style={styles.radioLabel}>
                                <input type="radio" name="target" value="student" checked={target === 'student'} onChange={e => setTarget(e.target.value)} /> Students Only
                            </label>
                            <label style={styles.radioLabel}>
                                <input type="radio" name="target" value="youth" checked={target === 'youth'} onChange={e => setTarget(e.target.value)} /> Youth Only
                            </label>
                        </div>
                        <textarea
                            style={styles.input}
                            placeholder="Type your official message here..."
                            value={msg}
                            onChange={e => setMsg(e.target.value)}
                            rows={3}
                        />
                        <button onClick={handleBroadcast} style={styles.broadcastBtn} disabled={!msg}>
                            <Radio size={20} /> Broadcast Message
                        </button>
                    </div>
                </div>

                {/* Activity Log */}
                <div style={styles.card}>
                    <div style={{ ...styles.iconBox, background: '#f0fdf4', color: '#15803d' }}>
                        <BarChart3 size={32} />
                    </div>
                    <h3>Recent Activity</h3>
                    <ul style={styles.list}>
                        <li>New Scholarship Scheme Added</li>
                        <li>Youth Job Fair: +400 Registrations</li>
                        <li>Emergency Sevice Alert: Resolved</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    header: { marginBottom: '2rem' },
    greeting: { fontSize: '2rem', fontWeight: 800, color: '#1e293b' },
    sub: { color: '#64748b', fontSize: '1.1rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' },
    card: { background: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
    iconBox: { width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' },
    cardText: { color: '#64748b', marginBottom: '1rem' },
    statsRow: { display: 'flex', gap: '2rem', marginBottom: '1rem' },
    statVal: { display: 'block', fontSize: '1.8rem', fontWeight: 800, color: '#1e293b' },
    statLabel: { fontSize: '0.9rem', color: '#64748b' },
    actionBtn: { width: '100%', padding: '0.75rem', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', color: '#0f172a', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    radioGroup: { display: 'flex', gap: '1rem', marginBottom: '0.5rem' },
    radioLabel: { display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500 },
    input: { width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '1rem' },
    broadcastBtn: { padding: '1rem', background: '#0284c7', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' },
    list: { listStyle: 'none', padding: 0, color: '#64748b', marginBottom: '0', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
};
