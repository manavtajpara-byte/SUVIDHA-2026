'use client';

import React from 'react';
import AethelLayout from '@/components/AethelLayout';
import { BookOpen, GraduationCap, Video, Users, ChevronRight, HeartPulse, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function TrainingHub() {
    const sidebarLinks = [
        { label: 'Platform Hub', icon: <BookOpen size={20} />, href: '/training', active: true },
        { label: 'Disaster Prep', icon: <ShieldAlert size={20} />, href: '/training/disaster' },
        { label: 'First Aid', icon: <HeartPulse size={20} />, href: '/training/first-aid' },
    ];

    const courses = [
        {
            title: 'Disaster Management',
            desc: 'Earthquake, Flood, and Fire safety protocols.',
            icon: <ShieldAlert size={32} />,
            href: '/training/disaster',
            color: '#e11d48'
        },
        {
            title: 'First Aid Essentials',
            desc: 'Learn CPR and emergency medical response.',
            icon: <HeartPulse size={32} />,
            href: '/training/first-aid',
            color: '#10b981'
        }
    ];

    return (
        <AethelLayout
            title="Education & Skills Hub"
            themeColor="var(--theme-amethyst)"
            themeSoft="var(--theme-amethyst-soft)"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Knowledge Empowerment</h1>
                    <p style={styles.subtitle}>Equip yourself with life-saving skills and professional certifications.</p>
                </div>

                <div style={styles.grid}>
                    {courses.map((course, i) => (
                        <Link key={i} href={course.href} style={styles.card}>
                            <div style={{ ...styles.iconBox, background: course.color + '15', color: course.color }}>
                                {course.icon}
                            </div>
                            <div style={styles.content}>
                                <h3 style={styles.courseTitle}>{course.title}</h3>
                                <p style={styles.courseDesc}>{course.desc}</p>
                            </div>
                            <ChevronRight size={20} color="#94a3b8" />
                        </Link>
                    ))}
                </div>

                <div style={styles.emptyState}>
                    <Video size={48} color="#94a3b8" />
                    <h3>More Modules Coming Soon</h3>
                    <p>We are integrating professional skill certifications and vocational training modules.</p>
                </div>
            </div>
        </AethelLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { display: 'flex', flexDirection: 'column', gap: '2.5rem' },
    header: { marginBottom: '1rem' },
    title: { fontSize: '2rem', fontWeight: 800, color: '#1e293b', margin: 0 },
    subtitle: { fontSize: '1rem', color: '#64748b', marginTop: '0.5rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' },
    card: {
        background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #f1f5f9',
        display: 'flex', alignItems: 'center', gap: '1.5rem', textDecoration: 'none', transition: 'all 0.2s'
    },
    iconBox: {
        width: '72px', height: '72px', borderRadius: '20px', display: 'flex',
        alignItems: 'center', justifyContent: 'center'
    },
    content: { flex: 1 },
    courseTitle: { fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', margin: 0 },
    courseDesc: { fontSize: '0.9rem', color: '#64748b', marginTop: '0.25rem' },
    emptyState: {
        background: '#f8fafc', padding: '4rem', borderRadius: '32px', textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '2rem'
    }
};
