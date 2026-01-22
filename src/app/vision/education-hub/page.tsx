'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { ArrowLeft, GraduationCap, Video, BookOpen, Briefcase, CheckCircle2, Star, Printer, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { translations } from '@/constants/translations';
import Receipt from '@/components/Receipt';

export default function EducationHubPage() {
    const { language } = useAppState();
    const t = (translations as any)[language] || translations.en;
    const router = useRouter();
    const [view, setView] = useState<'courses' | 'course-detail' | 'player' | 'success'>('courses');
    const [progress, setProgress] = useState(0);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [showReceipt, setShowReceipt] = useState(false);

    const courses = [
        { id: 1, title: 'Basics of Digital Literacy', duration: '4 Weeks', level: 'Beginner', rating: 4.8, students: '12K+', category: 'Digital Skills' },
        { id: 2, title: 'Modern Sustainable Farming', duration: '6 Weeks', level: 'Intermediate', rating: 4.9, students: '8K+', category: 'Agriculture' },
        { id: 3, title: 'Financial Management for Small Business', duration: '3 Weeks', level: 'Advanced', rating: 4.7, students: '5K+', category: 'Finance' },
    ];

    const handleEnroll = (course: any) => {
        setSelectedCourse(course);
        setView('course-detail');
    };

    const confirmEnrollment = () => {
        setView('player');
        // Simulate progress
        let p = 0;
        const interval = setInterval(() => {
            p += 5;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
            }
        }, 300);
    };

    const handleCertification = () => {
        setView('success');
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => view === 'courses' ? router.back() : setView('courses')} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h2 style={styles.title}>{t.educationHub || 'Education Hub'}</h2>
            </div>

            <div style={styles.card}>
                {view === 'courses' && (
                    <div style={styles.coursesView}>
                        <div style={styles.promo}>
                            <GraduationCap size={48} color="#db2777" />
                            <h3>Upgrade your skills for Vision 2030</h3>
                            <p>Free government certified courses for all citizens.</p>
                        </div>
                        <div style={styles.courseGrid}>
                            {courses.map(course => (
                                <div key={course.id} style={styles.courseCard}>
                                    <div style={styles.courseHeader}>
                                        <BookOpen size={24} color="#db2777" />
                                        <strong>{course.title}</strong>
                                    </div>
                                    <div style={styles.courseMeta}>
                                        <span><Clock size={16} /> {course.duration}</span>
                                        <span><Star size={16} color="#fbbf24" fill="#fbbf24" /> {course.rating}</span>
                                        <span style={{ color: '#db2777', fontWeight: 'bold' }}>{course.category}</span>
                                    </div>
                                    <button onClick={() => handleEnroll(course)} style={styles.enrollBtn}>View Details</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'course-detail' && (
                    <div style={styles.detailView}>
                        <Video size={60} color="#db2777" />
                        <h3>{selectedCourse?.title}</h3>
                        <div style={styles.curriculum}>
                            <h4>Curriculum Preview:</h4>
                            <ul style={styles.list}>
                                <li>Introduction to the Subject</li>
                                <li>Core Principles & Practice</li>
                                <li>Real-world Case Studies</li>
                                <li>Final Assessment & Certification</li>
                            </ul>
                        </div>
                        <div style={styles.infoBox}>
                            <p><strong>Certification:</strong> Government Verified e-Certificate</p>
                            <p><strong>Impact:</strong> Direct linkage to NCS & Skill India Portal</p>
                        </div>
                        <button onClick={confirmEnrollment} style={styles.confirmBtn}>Enroll with Jan Dhan ID</button>
                        <button onClick={() => setView('courses')} style={styles.secondaryBtn}>Cancel & Back</button>
                    </div>
                )}

                {view === 'player' && (
                    <div style={styles.playerView}>
                        <div style={styles.videoMock}>
                            <Play size={80} color="white" />
                            <div style={styles.progressBar}>
                                <div style={{ ...styles.progressFill, width: `${progress}%` }} />
                            </div>
                        </div>
                        <h3>Learning: {selectedCourse?.title}</h3>
                        <p>Module 1: Future of Governance (Live Streaming...)</p>
                        <div style={styles.playerStats}>
                            <span>Progress: {progress}%</span>
                            <span>ETA: {Math.max(0, 10 - Math.floor(progress / 10))} mins</span>
                        </div>
                        <button
                            onClick={handleCertification}
                            style={{ ...styles.confirmBtn, opacity: progress === 100 ? 1 : 0.5 }}
                            disabled={progress < 100}
                        >
                            {progress < 100 ? 'Complete Video to Certify' : 'Apply for Certification'}
                        </button>
                    </div>
                )}

                {view === 'success' && (
                    <div style={styles.successView}>
                        <CheckCircle2 size={100} color="#059669" />
                        <h2 style={{ color: '#059669' }}>Enrollment Confirmed!</h2>
                        <p style={{ fontSize: '1.2rem', color: '#444' }}>
                            You are now enrolled in <strong>{selectedCourse?.title}</strong>.
                            Course access is linked to your biometrics.
                        </p>
                        <div style={styles.accessBox}>
                            <Briefcase size={24} />
                            <span>Automatically Linked to National Career Service (NCS)</span>
                        </div>

                        <div style={styles.successActions}>
                            <button onClick={() => setShowReceipt(true)} style={styles.printBtn}>
                                <Printer size={20} /> Print Enrollment Receipt
                            </button>
                            <button onClick={() => router.push('/')} style={styles.homeBtn}>Back to Home</button>
                        </div>
                    </div>
                )}
            </div>

            {showReceipt && (
                <Receipt
                    type="Education Hub Enrollment"
                    transactionId={`EDU-${Date.now()}`}
                    customerName="Learner Citizen"
                    details={{
                        'Course Name': selectedCourse?.title,
                        'Duration': selectedCourse?.duration,
                        'Certification': 'Government Verified',
                        'Portal Link': 'Skill India - NCS',
                        'Status': 'ACTIVE'
                    }}
                    onClose={() => setShowReceipt(false)}
                />
            )}
        </div>
    );
}

// Simple helper icon
function Clock({ size, color }: any) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' },
    header: { display: 'flex', alignItems: 'center', gap: '2rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#db2777' },
    title: { fontSize: '2.5rem', fontWeight: 900, margin: 0 },
    card: { backgroundColor: 'white', padding: '3rem', borderRadius: '2rem', boxShadow: 'var(--card-shadow)' },
    coursesView: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    promo: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', borderBottom: '1px solid #eee', paddingBottom: '2rem' },
    courseGrid: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    courseCard: { padding: '1.5rem', border: '2px solid #fdf2f8', borderRadius: '1.5rem', backgroundColor: '#fff5f8' },
    courseHeader: { display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.2rem', marginBottom: '1rem' },
    courseMeta: { display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: '#64748b' },
    enrollBtn: { marginTop: '1.5rem', width: '100%', padding: '0.8rem', border: 'none', borderRadius: '0.8rem', backgroundColor: '#db2777', color: 'white', fontWeight: 'bold', cursor: 'pointer' },
    detailView: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' },
    curriculum: { textAlign: 'left', width: '100%', backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '1rem' },
    list: { margin: '1rem 0 0 1.5rem', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    infoBox: { width: '100%', padding: '1rem', border: '1px solid #db2777', borderRadius: '1rem', background: '#fff5f8', color: '#db2777' },
    confirmBtn: { width: '100%', padding: '1.5rem', fontSize: '1.5rem', backgroundColor: '#db2777', color: 'white', border: 'none', borderRadius: '1rem', fontWeight: 'bold', cursor: 'pointer' },
    secondaryBtn: { background: 'none', border: 'none', color: '#64748b', fontWeight: 'bold', cursor: 'pointer' },
    successView: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', textAlign: 'center' },
    accessBox: { display: 'flex', alignItems: 'center', gap: '1rem', color: '#059669', fontSize: '1.1rem', fontWeight: 'bold', backgroundColor: '#ecfdf5', padding: '1rem', borderRadius: '1rem' },
    successActions: { display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' },
    printBtn: { padding: '1rem', border: '2px solid #059669', color: '#059669', borderRadius: '1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' },
    homeBtn: { padding: '1rem', backgroundColor: '#333', color: 'white', borderRadius: '1rem', border: 'none', fontWeight: 'bold', cursor: 'pointer' },
    playerView: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', textAlign: 'center' },
    videoMock: { width: '100%', aspectRatio: '16/9', backgroundColor: '#000', borderRadius: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' },
    progressBar: { position: 'absolute', bottom: 0, left: 0, width: '100%', height: '8px', backgroundColor: '#333' },
    progressFill: { height: '100%', backgroundColor: '#db2777', transition: 'width 0.3s ease' },
    playerStats: { display: 'flex', justifyContent: 'space-between', width: '100%', color: '#64748b', fontSize: '0.9rem' }
};
