import React, { useEffect, useState } from 'react';
import { BookOpen, GraduationCap, Award, Calendar, Bell } from 'lucide-react';
import { useAppState } from '@/context/StateContext';
import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
    const { user } = useAppState();
    const router = useRouter();
    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        const allBroadcasts = JSON.parse(localStorage.getItem('suvidha_broadcasts') || '[]');
        // Filter for 'all' or 'student'
        const relevant = allBroadcasts.filter((b: any) => b.target === 'all' || b.target === 'student');
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
                <h2 style={styles.greeting}>Welcome, {user?.name} 🎓</h2>
                <p style={styles.sub}>Student Portal • {user?.details?.student?.class || 'General'}</p>
            </div>

            <div style={styles.grid}>
                {/* Scholarship Card */}
                <div style={styles.card}>
                    <div style={{ ...styles.iconBox, background: '#dbeafe', color: '#2563eb' }}>
                        <Award size={32} />
                    </div>
                    <h3>Scholarship Finder</h3>
                    <p style={styles.cardText}>3 New Scholarships match your profile.</p>
                    <button onClick={() => router.push('/student/scholarships')} style={styles.actionBtn}>View Matches</button>
                </div>

                {/* Exam Tracker */}
                <div style={styles.card}>
                    <div style={{ ...styles.iconBox, background: '#fce7f3', color: '#db2777' }}>
                        <Calendar size={32} />
                    </div>
                    <h3>Exam Tracker</h3>
                    <ul style={styles.list}>
                        <li>JEE Mains: 15 Days left</li>
                        <li>Board Exams: Mar 10</li>
                    </ul>
                    <button onClick={() => router.push('/student/exams')} style={styles.actionBtn}>View Schedule</button>
                </div>

                {/* Digital Library */}
                <div style={styles.card}>
                    <div style={{ ...styles.iconBox, background: '#d1fae5', color: '#059669' }}>
                        <BookOpen size={32} />
                    </div>
                    <h3>Digital Library</h3>
                    <p style={styles.cardText}>Access NCERT Books and Video Lectures.</p>
                    <button style={styles.actionBtn}>Open Library</button>
                </div>

                {/* Learning Goals */}
                <div style={styles.card}>
                    <div style={{ ...styles.iconBox, background: '#ffedd5', color: '#ea580c' }}>
                        <GraduationCap size={32} />
                    </div>
                    <h3>Smart Goals</h3>
                    <div style={styles.progressContainer}>
                        <span>Physics Syllabus</span>
                        <div style={styles.progressBar}><div style={{ ...styles.progressFill, width: '60%' }}></div></div>
                    </div>
                    <button style={styles.actionBtn}>Resume Learning</button>
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
    list: { listStyle: 'none', padding: 0, color: '#64748b', marginBottom: '1rem', fontSize: '0.95rem' },
    actionBtn: { width: '100%', padding: '0.75rem', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', color: '#0f172a', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' },
    progressContainer: { margin: '1rem 0' },
    progressBar: { height: '8px', background: '#e2e8f0', borderRadius: '4px', marginTop: '0.5rem', overflow: 'hidden' },
    progressFill: { height: '100%', background: '#ea580c', borderRadius: '4px' }
};
