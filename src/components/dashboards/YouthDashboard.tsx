import React, { useEffect, useState } from 'react';
import { Briefcase, Activity, Rocket, TrendingUp, Bell } from 'lucide-react';
import { useAppState } from '@/context/StateContext';

import { useRouter } from 'next/navigation';

export default function YouthDashboard() {
    const { user } = useAppState();
    const router = useRouter();
    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        const allBroadcasts = JSON.parse(localStorage.getItem('suvidha_broadcasts') || '[]');
        // Filter for 'all' or 'youth'
        const relevant = allBroadcasts.filter((b: any) => b.target === 'all' || b.target === 'youth');
        setNotifications(relevant);
    }, []);

    return (
        <div className="animate-fade-in" style={{ padding: '1rem' }}>
            {/* Notifications Area */}
            {notifications.length > 0 && (
                <div style={styles.alertBox}>
                    <div style={styles.alertHeader}>
                        <Bell size={20} color="#c2410c" />
                        <span style={{ fontWeight: 'bold', color: '#9a3412' }}>Official Alerts</span>
                    </div>
                    {notifications.map((n: any) => (
                        <div key={n.id} style={styles.alertItem}>
                            <strong>{n.sender}:</strong> {n.message}
                        </div>
                    ))}
                </div>
            )}

            <div style={styles.header}>
                <h2 style={styles.greeting}>Hello, {user?.name} 🚀</h2>
                <p style={styles.sub}>Youth Hub • {user?.details?.youth?.employment || 'Aspiring'}</p>
            </div>

            <div style={styles.grid}>
                {/* Job Matcher */}
                <div style={styles.card}>
                    <div style={{ ...styles.iconBox, background: '#ede9fe', color: '#7c3aed' }}>
                        <Briefcase size={32} />
                    </div>
                    <h3>Job Matcher</h3>
                    <p style={styles.cardText}>5 Local Jobs match your skills: {(user?.details?.youth?.skills || []).slice(0, 2).join(', ')}...</p>
                    <button onClick={() => router.push('/youth/jobs')} style={styles.actionBtn}>View Jobs</button>
                </div>

                {/* Skill India */}
                <div style={styles.card}>
                    <div style={{ ...styles.iconBox, background: '#fee2e2', color: '#dc2626' }}>
                        <Activity size={32} />
                    </div>
                    <h3>Skill Up</h3>
                    <p style={styles.cardText}>Enroll in PMKVY 4.0 Courses near you.</p>
                    <button onClick={() => router.push('/youth/skills')} style={styles.actionBtn}>Browse Courses</button>
                </div>

                {/* Startup Corner */}
                <div style={styles.card}>
                    <div style={{ ...styles.iconBox, background: '#fef3c7', color: '#d97706' }}>
                        <Rocket size={32} />
                    </div>
                    <h3>Startup India</h3>
                    <p style={styles.cardText}>Apply for Mudra Loan to start your business.</p>
                    <button style={styles.actionBtn}>Apply for Loan</button>
                </div>

                {/* Career Trends */}
                <div style={styles.card}>
                    <div style={{ ...styles.iconBox, background: '#ccfbf1', color: '#0d9488' }}>
                        <TrendingUp size={32} />
                    </div>
                    <h3>Market Trends</h3>
                    <p style={styles.cardText}>High demand for: Data Entry, Electricians in your area.</p>
                    <button style={styles.actionBtn}>View Analytics</button>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    alertBox: { background: '#ffedd5', border: '1px solid #fed7aa', borderRadius: '12px', padding: '1rem', marginBottom: '2rem' },
    alertHeader: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' },
    alertItem: { fontSize: '0.95rem', color: '#7c2d12', padding: '0.5rem 0', borderTop: '1px solid #fed7aa' },
    header: { marginBottom: '2rem' },
    greeting: { fontSize: '2rem', fontWeight: 800, color: '#1e293b' },
    sub: { color: '#64748b', fontSize: '1.1rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' },
    card: { background: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
    iconBox: { width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' },
    cardText: { color: '#64748b', marginBottom: '1rem' },
    actionBtn: { width: '100%', padding: '0.75rem', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', color: '#0f172a', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' },
};
