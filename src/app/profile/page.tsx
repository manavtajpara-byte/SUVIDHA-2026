'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import {
    User, Mail, Phone, MapPin, Shield, Edit3,
    TrendingUp, Clock, CheckCircle, ChevronDown,
    Globe, Bell, Settings, LogOut, Briefcase,
    Calendar, ListChecks, Smartphone
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ProfilePage() {
    const { user, language, setIsLoggedIn, setUser } = useAppState();
    const t = translations[language] || translations.en;
    const router = useRouter();

    const [activeTab, setActiveTab] = useState('Overview');

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('suvidha_session_user');
        router.push('/login');
    };

    if (!user) {
        return (
            <div style={styles.emptyState}>
                <User size={64} color="#CBD5E1" />
                <h2>Please Login to see your profile</h2>
                <button onClick={() => router.push('/login')} style={styles.primaryBtn}>Login Now</button>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header / Sub-nav */}
            <div style={styles.topNav}>
                <div style={styles.logoArea}>
                    <div style={styles.logoBox}>Crextio</div>
                </div>
                <div style={styles.navLinks}>
                    {['Dashboard', 'People', 'Devices', 'Apps', 'Reviews'].map(link => (
                        <button
                            key={link}
                            style={{
                                ...styles.navBtn,
                                background: activeTab === link ? '#1e293b' : 'transparent',
                                color: activeTab === link ? 'white' : '#64748b'
                            }}
                            onClick={() => setActiveTab(link)}
                        >
                            {link}
                        </button>
                    ))}
                    <button style={styles.navBtn}><Settings size={18} /> Setting</button>
                </div>
                <div style={styles.topActions}>
                    <button style={styles.iconAction}><Bell size={20} /></button>
                    <div style={styles.userCircle}>
                        <User size={18} />
                    </div>
                </div>
            </div>

            <div style={styles.main}>
                <header style={styles.welcomeSection}>
                    <h1 style={styles.welcomeTitle}>Welcome in, {user.name.split(' ')[0]}</h1>
                </header>

                <div style={styles.dashboardGrid}>
                    {/* Left Column */}
                    <div style={styles.leftCol}>
                        {/* Profile Info Card */}
                        <div style={styles.profileCard}>
                            <div style={styles.profileImageWrapper}>
                                <Image
                                    src="/profile-avatar.png"
                                    alt="Profile"
                                    width={240}
                                    height={240}
                                    style={styles.profileImg}
                                />
                                <div style={styles.salaryBadge}>$1,200</div>
                            </div>
                            <div style={styles.profileIdentify}>
                                <h2 style={styles.userName}>{user.name}</h2>
                                <p style={styles.userRole}>{user.role?.toUpperCase() || 'CITIZEN'}</p>
                            </div>
                            <button style={styles.editPill} onClick={() => router.push('/profile/edit')}>
                                <Edit3 size={14} /> Edit Profile
                            </button>
                        </div>

                        {/* Expandable Sections */}
                        <div style={styles.accordionList}>
                            <div style={styles.accordionItem}>
                                <span>Service Subscriptions</span>
                                <ChevronDown size={18} />
                            </div>
                            <div style={{ ...styles.accordionItem, background: '#f8fafc' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <Smartphone size={18} color="#6366f1" />
                                    <div>
                                        <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem' }}>Surface Laptop</p>
                                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>Version M1</p>
                                    </div>
                                </div>
                                <div style={styles.dots}>...</div>
                            </div>
                            <div style={styles.accordionItem}>
                                <span>Scheme Eligibility</span>
                                <ChevronDown size={18} />
                            </div>
                            <div style={styles.accordionItem}>
                                <span>Support Tickets</span>
                                <ChevronDown size={18} />
                            </div>
                        </div>
                    </div>

                    {/* Middle Column */}
                    <div style={styles.midCol}>
                        <div style={styles.statsRow}>
                            <div style={styles.miniStat}>
                                <div style={styles.statInfo}>
                                    <p style={styles.statLabel}>Usage</p>
                                    <h3 style={styles.statVal}>85%</h3>
                                </div>
                                <div style={styles.progressRingMock}></div>
                            </div>
                            <div style={styles.miniStat}>
                                <div style={styles.statInfo}>
                                    <p style={styles.statLabel}>Output</p>
                                    <h3 style={styles.statVal}>10%</h3>
                                </div>
                                <div style={styles.progressPillMock}></div>
                            </div>
                        </div>

                        <div style={styles.chartsRow}>
                            <div style={styles.chartCard}>
                                <div style={styles.chartHeader}>
                                    <div>
                                        <h3 style={styles.chartTitle}>Progress</h3>
                                        <p style={styles.chartSub}>Activities this week</p>
                                    </div>
                                    <h3 style={styles.chartGiantVal}>6.1 h</h3>
                                </div>
                                <div style={styles.barChartMock}>
                                    {[20, 45, 30, 60, 25, 80, 40].map((h, i) => (
                                        <div key={i} style={{ ...styles.bar, height: `${h}%`, background: i === 5 ? '#fbbf24' : '#e2e8f0' }} />
                                    ))}
                                </div>
                            </div>

                            <div style={styles.chartCard}>
                                <div style={styles.chartHeader}>
                                    <h3 style={styles.chartTitle}>Time tracker</h3>
                                </div>
                                <div style={styles.timerContainer}>
                                    <div style={styles.timerRing}>
                                        <div style={styles.timerInside}>
                                            <p style={styles.timerVal}>02:35</p>
                                            <p style={styles.timerSub}>Active Time</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Schedule / Calendar Card */}
                        <div style={styles.calendarCard}>
                            <div style={styles.calendarHeader}>
                                <h3 style={styles.chartTitle}>September 2024</h3>
                            </div>
                            <div style={styles.calendarGrid}>
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
                                    <div key={d} style={styles.calDay}>
                                        <p style={styles.dayName}>{d}</p>
                                        <p style={{ ...styles.dayNum, background: i === 2 ? '#1e293b' : 'transparent', color: i === 2 ? 'white' : '#64748b' }}>{22 + i}</p>
                                    </div>
                                ))}
                            </div>
                            <div style={styles.eventList}>
                                <div style={styles.eventItem}>
                                    <div style={styles.eventTime}>8:00 am</div>
                                    <div style={styles.eventBox}>
                                        <div style={styles.eventContent}>
                                            <p style={styles.eventTitle}>Weekly Team Sync</p>
                                            <div style={styles.avatarStalk}>
                                                {[1, 2, 3].map(i => <div key={i} style={styles.miniAvatar} />)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div style={styles.rightCol}>
                        <div style={styles.heroStats}>
                            <div style={styles.heroStatItem}>
                                <h2 style={styles.heroStatNum}>78</h2>
                                <p style={styles.heroStatLabel}>Employe</p>
                            </div>
                            <div style={styles.heroStatItem}>
                                <h2 style={styles.heroStatNum}>56</h2>
                                <p style={styles.heroStatLabel}>Hirings</p>
                            </div>
                            <div style={styles.heroStatItem}>
                                <h2 style={styles.heroStatNum}>203</h2>
                                <p style={styles.heroStatLabel}>Projects</p>
                            </div>
                        </div>

                        <div style={styles.onboardingCard}>
                            <div style={styles.chartHeader}>
                                <h3 style={styles.chartTitle}>Onboarding</h3>
                                <p style={styles.chartGiantVal}>18%</p>
                            </div>
                            <div style={styles.onboardingMobile}>
                                <div style={styles.mobileHeader}>
                                    <p style={{ margin: 0, fontWeight: 700 }}>Onboarding Task</p>
                                    <p style={{ margin: 0, opacity: 0.6 }}>2/8</p>
                                </div>
                                <div style={styles.taskList}>
                                    {[
                                        { title: 'Interview', time: 'Sep 13, 08:30', checked: true },
                                        { title: 'Team Meeting', time: 'Sep 13, 10:30', checked: true },
                                        { title: 'Project Update', time: 'Sep 13, 13:00', checked: false },
                                        { title: 'Discuss Q3 Goals', time: 'Sep 13, 14:45', checked: false },
                                    ].map((task, i) => (
                                        <div key={i} style={styles.taskItem}>
                                            <div style={styles.taskIcon}><ListChecks size={14} /></div>
                                            <div style={styles.taskInfo}>
                                                <p style={styles.taskTitle}>{task.title}</p>
                                                <p style={styles.taskTime}>{task.time}</p>
                                            </div>
                                            <div style={{ ...styles.taskCheck, background: task.checked ? '#fbbf24' : 'rgba(255,255,255,0.1)' }}>
                                                {task.checked && <CheckCircle size={12} color="white" />}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .dashboardGrid {
                    animation: fadeIn 0.8s ease-out;
                }
            `}</style>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#fefefe',
        color: '#1e293b',
        fontFamily: "'Inter', sans-serif",
        paddingBottom: '2rem'
    },
    topNav: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        background: 'white',
        borderBottom: '1px solid #f1f5f9'
    },
    logoBox: {
        padding: '0.5rem 1rem',
        background: '#f1f5f9',
        borderRadius: '12px',
        fontWeight: 800,
        fontSize: '1.2rem'
    },
    navLinks: {
        display: 'flex',
        gap: '0.5rem',
        background: '#f8fafc',
        padding: '0.4rem',
        borderRadius: '50px'
    },
    navBtn: {
        padding: '0.5rem 1.25rem',
        border: 'none',
        borderRadius: '50px',
        fontSize: '0.85rem',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'all 0.2s'
    },
    topActions: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    },
    iconAction: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '1px solid #f1f5f9',
        background: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
    },
    userCircle: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: '#f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem'
    },
    welcomeSection: {
        marginBottom: '2rem'
    },
    welcomeTitle: {
        fontSize: '3rem',
        fontWeight: 400,
        color: '#1e293b',
        margin: 0
    },
    dashboardGrid: {
        display: 'grid',
        gridTemplateColumns: '320px 1fr 340px',
        gap: '2rem'
    },
    profileCard: {
        background: '#f1f5f9',
        borderRadius: '32px',
        padding: '2.5rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        position: 'relative',
        marginBottom: '1.5rem',
        overflow: 'hidden'
    },
    profileImageWrapper: {
        position: 'relative',
        marginBottom: '1.5rem',
        borderRadius: '24px',
        overflow: 'hidden'
    },
    profileImg: {
        borderRadius: '24px',
        objectFit: 'cover'
    },
    salaryBadge: {
        position: 'absolute',
        bottom: '10px',
        right: '-10px',
        background: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(5px)',
        padding: '0.5rem 1.25rem',
        borderRadius: '50px',
        fontSize: '1rem',
        fontWeight: 700,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    },
    userName: {
        fontSize: '1.5rem',
        fontWeight: 600,
        margin: '0 0 0.25rem 0'
    },
    userRole: {
        fontSize: '0.85rem',
        color: '#64748b',
        margin: 0,
        fontWeight: 500,
        letterSpacing: '0.5px'
    },
    editPill: {
        marginTop: '2rem',
        padding: '0.6rem 1.2rem',
        borderRadius: '50px',
        border: 'none',
        background: '#1e293b',
        color: 'white',
        fontSize: '0.85rem',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    accordionList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
    },
    accordionItem: {
        padding: '1.25rem',
        borderRadius: '24px',
        background: 'white',
        border: '1px solid #f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.95rem',
        fontWeight: 600,
        cursor: 'pointer'
    },
    midCol: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    statsRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem'
    },
    miniStat: {
        padding: '1.5rem',
        background: 'white',
        borderRadius: '24px',
        border: '1px solid #f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    statLabel: { margin: 0, fontSize: '0.85rem', color: '#64748b' },
    statVal: { margin: '0.2rem 0 0 0', fontSize: '1.5rem', fontWeight: 700 },
    progressRingMock: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '4px solid #1e293b',
        borderTopColor: '#e2e8f0'
    },
    progressPillMock: {
        width: '60px',
        height: '30px',
        borderRadius: '50px',
        background: '#e2e8f0',
        padding: '3px',
        display: 'flex',
        justifyContent: 'flex-start'
    },
    chartsRow: {
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '1.5rem'
    },
    chartCard: {
        padding: '2rem',
        background: 'white',
        borderRadius: '32px',
        border: '1px solid #f1f5f9'
    },
    chartHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '2rem'
    },
    chartTitle: { fontSize: '1.1rem', fontWeight: 600, margin: 0 },
    chartSub: { margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#94a3b8' },
    chartGiantVal: { fontSize: '2.5rem', fontWeight: 400, margin: 0 },
    barChartMock: {
        height: '100px',
        display: 'flex',
        alignItems: 'flex-end',
        gap: '10px'
    },
    bar: { flex: 1, borderRadius: '4px' },
    timerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    timerRing: {
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        border: '10px solid #fbbf24',
        borderTopColor: '#f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    timerInside: { textAlign: 'center' },
    timerVal: { fontSize: '1.5rem', fontWeight: 700, margin: 0 },
    timerSub: { fontSize: '0.7rem', color: '#94a3b8', margin: 0 },
    calendarCard: {
        padding: '2rem',
        background: 'white',
        borderRadius: '32px',
        border: '1px solid #f1f5f9'
    },
    calendarGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '1rem',
        marginBottom: '2rem'
    },
    calDay: { textAlign: 'center' },
    dayName: { fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' },
    dayNum: {
        width: '36px',
        height: '36px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
        fontWeight: 600
    },
    eventItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem'
    },
    eventTime: { fontSize: '0.9rem', color: '#94a3b8', width: '70px' },
    eventBox: {
        flex: 1,
        background: '#1e293b',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '20px'
    },
    eventContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    eventTitle: { margin: 0, fontWeight: 600, fontSize: '0.95rem' },
    avatarStalk: { display: 'flex' },
    miniAvatar: {
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        border: '2px solid #1e293b',
        background: '#f1f5f9',
        marginLeft: '-8px'
    },
    rightCol: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    heroStats: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem 0'
    },
    heroStatItem: { textAlign: 'center' },
    heroStatNum: { fontSize: '2.5rem', fontWeight: 400, margin: 0 },
    heroStatLabel: { fontSize: '0.8rem', color: '#94a3b8', margin: 0 },
    onboardingCard: {
        padding: '2rem',
        background: '#fefefe',
        borderRadius: '32px',
        border: '1px solid #f1f5f9',
        flex: 1
    },
    onboardingMobile: {
        background: '#1e293b',
        borderRadius: '40px',
        padding: '2rem',
        color: 'white',
        marginTop: '1rem',
        minHeight: '400px'
    },
    mobileHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
    },
    taskItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '20px',
        marginBottom: '0.75rem'
    },
    taskIcon: {
        width: '36px',
        height: '36px',
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskInfo: { flex: 1 },
    taskTitle: { margin: 0, fontSize: '0.9rem', fontWeight: 600 },
    taskTime: { margin: 0, fontSize: '0.75rem', opacity: 0.5 },
    taskCheck: {
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    primaryBtn: {
        padding: '0.75rem 2rem',
        borderRadius: '50px',
        border: 'none',
        background: '#1e293b',
        color: 'white',
        fontWeight: 700,
        cursor: 'pointer'
    },
    emptyState: {
        textAlign: 'center',
        padding: '5rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem'
    }
};
