'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { ArrowLeft, Search, CheckCircle, Clock, FileCheck, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Receipt from '@/components/Receipt';

export default function TrackPage() {
    const { language } = useAppState();
    const t = translations[language];
    const router = useRouter();
    const [ticketId, setTicketId] = useState('');
    const [tracking, setTracking] = useState(false);
    const [showReceipt, setShowReceipt] = useState(false);

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        if (ticketId) setTracking(true);
    };

    const timeline = [
        { label: 'Submitted', icon: <FileCheck size={32} />, status: 'complete', date: 'Jan 15, 2026' },
        { label: 'Verified', icon: <CheckCircle size={32} />, status: 'complete', date: 'Jan 16, 2026' },
        { label: 'Field Inspection', icon: <Truck size={32} />, status: 'current', date: 'In Progress' },
        { label: 'Approved', icon: <CheckCircle size={32} />, status: 'pending', date: 'Pending' },
    ];

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h2 style={styles.title}>{t.track}</h2>
            </div>

            {!tracking ? (
                <div style={styles.card}>
                    <form onSubmit={handleTrack} style={styles.form}>
                        {/* ... existing form content ... */}
                        <div style={styles.iconHeader}>
                            <Search size={60} color="var(--primary)" />
                            <p>Enter your Application or Ticket ID</p>
                        </div>
                        <div style={styles.field}>
                            <input
                                value={ticketId}
                                onChange={(e) => setTicketId(e.target.value)}
                                placeholder="Ex: REQ-ELE-2026-4401"
                                style={styles.input}
                            />
                        </div>
                        <button type="submit" style={styles.submitBtn} disabled={!ticketId}>
                            Track Status
                        </button>
                    </form>
                </div>
            ) : (
                <div style={styles.trackingCard}>
                    <div style={styles.trackingHeader}>
                        <div>
                            <h3 style={styles.trackingTitle}>Application: REQ-ELE-2026-4401</h3>
                            <p style={styles.trackingType}>New Electricity Connection</p>
                        </div>
                        <div style={styles.statusBadge}>In Progress</div>
                    </div>

                    <div style={styles.timeline}>
                        {timeline.map((step, i) => (
                            <div key={i} style={styles.timelineItem}>
                                <div style={{
                                    ...styles.timelineIcon,
                                    backgroundColor: step.status === 'complete' ? 'var(--municipal)' :
                                        step.status === 'current' ? 'var(--primary)' : '#e2e8f0',
                                    color: step.status === 'pending' ? '#94a3b8' : 'white'
                                }}>
                                    {step.icon}
                                </div>
                                <div style={styles.timelineContent}>
                                    <strong style={styles.timelineLabel}>{step.label}</strong>
                                    <span style={styles.timelineDate}>{step.date}</span>
                                </div>
                                {i < timeline.length - 1 && <div style={styles.timelineConnector} />}
                            </div>
                        ))}
                    </div>

                    <div style={styles.infoBox}>
                        <Clock size={24} color="var(--primary)" />
                        <p>Our technician will contact you within 2-3 working days for site inspection.</p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={() => setShowReceipt(true)} style={styles.printBtn}>Print Status Receipt</button>
                        <button onClick={() => setTracking(false)} style={styles.newSearchBtn}>Check Another</button>
                    </div>
                </div>
            )}

            {showReceipt && (
                <Receipt
                    type="Application Status Report"
                    transactionId="REQ-ELE-2026-4401"
                    customerName="Applicant"
                    details={{
                        'Application Type': 'New Electricity Connection',
                        'Current Status': 'In Progress - Field Inspection',
                        'Last Updated': 'Today',
                        'Assigned Office': 'Zone 4, Municipal Office'
                    }}
                    autoPrint={true}
                    onClose={() => setShowReceipt(false)}
                />
            )}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
    },
    backBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--primary)',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 900,
        margin: 0,
    },
    card: {
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '2rem',
        boxShadow: 'var(--card-shadow)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    iconHeader: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem',
        fontSize: '1.3rem',
        fontWeight: 'bold',
    },
    field: {},
    input: {
        width: '100%',
        padding: '1.5rem',
        fontSize: '1.8rem',
        borderRadius: '1rem',
        border: '3px solid #e2e8f0',
        textAlign: 'center',
        backgroundColor: '#f8fafc',
        cursor: 'pointer',
        textTransform: 'uppercase',
    },
    submitBtn: {
        padding: '1.5rem',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        backgroundColor: 'var(--primary)',
        color: 'white',
        border: 'none',
        borderRadius: '1rem',
        cursor: 'pointer',
    },
    trackingCard: {
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '2rem',
        boxShadow: 'var(--card-shadow)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    trackingHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingBottom: '1.5rem',
        borderBottom: '2px solid #e2e8f0',
    },
    trackingTitle: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        margin: 0,
    },
    trackingType: {
        fontSize: '1.1rem',
        opacity: 0.7,
        margin: '0.5rem 0 0 0',
    },
    statusBadge: {
        backgroundColor: '#dbeafe',
        color: 'var(--primary)',
        padding: '0.75rem 1.5rem',
        borderRadius: '2rem',
        fontWeight: 'bold',
        fontSize: '1.1rem',
    },
    timeline: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        position: 'relative',
    },
    timelineItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1.5rem',
        position: 'relative',
        paddingBottom: '2rem',
    },
    timelineIcon: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        zIndex: 1,
    },
    timelineContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
        paddingTop: '0.75rem',
    },
    timelineLabel: {
        fontSize: '1.3rem',
    },
    timelineDate: {
        fontSize: '1rem',
        opacity: 0.7,
    },
    timelineConnector: {
        position: 'absolute',
        left: '30px',
        top: '60px',
        width: '2px',
        height: 'calc(100% - 60px)',
        backgroundColor: '#e2e8f0',
    },
    infoBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        backgroundColor: '#f1f5f9',
        padding: '1.5rem',
        borderRadius: '1rem',
        fontSize: '1.1rem',
    },
    newSearchBtn: {
        flex: 1,
        padding: '1rem',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        backgroundColor: 'white',
        color: '#64748b',
        border: '2px solid #cbd5e1',
        borderRadius: '1rem',
        cursor: 'pointer',
    },
    printBtn: {
        flex: 1,
        padding: '1rem',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        backgroundColor: 'var(--primary)',
        color: 'white',
        border: 'none',
        borderRadius: '1rem',
        cursor: 'pointer',
    }
};
