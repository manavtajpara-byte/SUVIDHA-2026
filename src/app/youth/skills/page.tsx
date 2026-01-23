'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { ArrowLeft, BookOpen, Star, PlayCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SkillsPage() {
    const { addToast } = useAppState();
    const router = useRouter();

    const handleEnroll = (course: string) => {
        addToast({ message: `Enrolled in ${course}. Happy Learning!`, type: 'success' });
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h2 style={styles.title}>Skill India Portal 🇮🇳</h2>
            </div>

            <div style={styles.card}>
                <div style={styles.intro}>
                    <BookOpen size={64} color="#dc2626" />
                    <p style={styles.desc}>Free vocational training courses under PMKVY 4.0</p>
                </div>

                <div style={styles.grid}>
                    {/* Course 1 */}
                    <div style={styles.courseCard}>
                        <div style={styles.thumbnail} className="bg-red-100 flex items-center justify-center">
                            <span style={{ fontSize: '3rem' }}>📱</span>
                        </div>
                        <div style={styles.content}>
                            <div style={styles.badge}>Best Seller</div>
                            <h3>Mobile Repair Technician</h3>
                            <div style={styles.rating}>
                                <Star size={16} fill="#eab308" color="#eab308" /> 4.8 (1.2k Reviews)
                            </div>
                            <p style={styles.duration}>Duration: 3 Months • Certified</p>
                            <button onClick={() => handleEnroll('Mobile Repair')} style={styles.enrollBtn}>
                                <PlayCircle size={20} /> Start Course
                            </button>
                        </div>
                    </div>

                    {/* Course 2 */}
                    <div style={styles.courseCard}>
                        <div style={styles.thumbnail} className="bg-blue-100 flex items-center justify-center">
                            <span style={{ fontSize: '3rem' }}>💻</span>
                        </div>
                        <div style={styles.content}>
                            <div style={styles.badge}>Trending</div>
                            <h3>Basic Computer Course (CCC)</h3>
                            <div style={styles.rating}>
                                <Star size={16} fill="#eab308" color="#eab308" /> 4.6 (5k Reviews)
                            </div>
                            <p style={styles.duration}>Duration: 1 Month • NIELIT</p>
                            <button onClick={() => handleEnroll('Computer Course')} style={styles.enrollBtn}>
                                <PlayCircle size={20} /> Start Course
                            </button>
                        </div>
                    </div>

                    {/* Course 3 */}
                    <div style={styles.courseCard}>
                        <div style={styles.thumbnail} className="bg-green-100 flex items-center justify-center">
                            <span style={{ fontSize: '3rem' }}>🌾</span>
                        </div>
                        <div style={styles.content}>
                            <div style={styles.badge}>New</div>
                            <h3>Modern Agriculture</h3>
                            <div style={styles.rating}>
                                <Star size={16} fill="#eab308" color="#eab308" /> 4.9 (300 Reviews)
                            </div>
                            <p style={styles.duration}>Duration: 2 Weeks • Practical</p>
                            <button onClick={() => handleEnroll('Modern Agriculture')} style={styles.enrollBtn}>
                                <PlayCircle size={20} /> Start Course
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' },
    header: { display: 'flex', alignItems: 'center', gap: '1rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' },
    title: { fontSize: '2rem', fontWeight: 900, margin: 0 },
    card: { backgroundColor: 'white', padding: '2rem', borderRadius: '2rem', boxShadow: 'var(--card-shadow)', minHeight: '400px' },
    intro: { textAlign: 'center', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
    desc: { color: '#64748b', fontSize: '1.2rem', maxWidth: '500px' },
    grid: { display: 'grid', gap: '1.5rem' },
    courseCard: { display: 'flex', gap: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1rem', background: '#fff', alignItems: 'center' },
    thumbnail: { width: '100px', height: '100px', borderRadius: '12px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    content: { flex: 1 },
    badge: { display: 'inline-block', fontSize: '0.75rem', fontWeight: 'bold', color: 'white', background: '#ef4444', padding: '0.1rem 0.5rem', borderRadius: '4px', marginBottom: '0.5rem' },
    rating: { display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem', color: '#4b5563', margin: '0.2rem 0' },
    duration: { fontSize: '0.9rem', color: '#64748b', marginBottom: '0.8rem' },
    enrollBtn: { padding: '0.6rem 1.2rem', background: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }
};
