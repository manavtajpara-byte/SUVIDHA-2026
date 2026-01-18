'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { useVirtualKeyboard } from '@/hooks/useVirtualKeyboard';
import VirtualKeyboard from '@/components/VirtualKeyboard';
import { ArrowLeft, Trash2, Droplet, Construction, CheckCircle, Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GrievancePage() {
    const { language } = useAppState();
    const t = translations[language];
    const router = useRouter();
    const { isOpen, openKeyboard, closeKeyboard, handleInput, handleDelete, values } = useVirtualKeyboard();
    const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const issues = [
        { id: 'garbage', label: 'Missed Garbage Collection', icon: <Trash2 size={50} />, color: '#ef4444' },
        { id: 'water', label: 'Water Contamination', icon: <Droplet size={50} />, color: '#3b82f6' },
        { id: 'road', label: 'Pothole / Road Damage', icon: <Construction size={50} />, color: '#f59e0b' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h2 style={styles.title}>{t.grievance}</h2>
            </div>

            {!submitted ? (
                <div style={styles.content}>
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>Select Issue Type</h3>
                        <div style={styles.issueGrid}>
                            {issues.map(issue => (
                                <button
                                    key={issue.id}
                                    onClick={() => setSelectedIssue(issue.id)}
                                    style={{
                                        ...styles.issueCard,
                                        borderColor: selectedIssue === issue.id ? issue.color : '#e2e8f0',
                                        backgroundColor: selectedIssue === issue.id ? `${issue.color}20` : 'white'
                                    }}
                                >
                                    <div style={{ color: issue.color }}>{issue.icon}</div>
                                    <span style={styles.issueLabel}>{issue.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {selectedIssue && (
                        <form onSubmit={handleSubmit} style={styles.form}>
                            <div style={styles.field}>
                                <label style={styles.label}>Your Name</label>
                                <input
                                    readOnly
                                    value={values.name || ''}
                                    onFocus={() => openKeyboard('name')}
                                    placeholder="Enter your name"
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.field}>
                                <label style={styles.label}>Mobile Number</label>
                                <input
                                    readOnly
                                    value={values.mobile || ''}
                                    onFocus={() => openKeyboard('mobile')}
                                    placeholder="10-digit number"
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.field}>
                                <label style={styles.label}>Location / Address</label>
                                <input
                                    readOnly
                                    value={values.location || ''}
                                    onFocus={() => openKeyboard('location')}
                                    placeholder="Where is the issue?"
                                    style={styles.input}
                                />
                            </div>

                            <button
                                type="submit"
                                style={styles.submitBtn}
                                disabled={!values.name || !values.mobile || !values.location}
                            >
                                Submit Grievance
                            </button>
                        </form>
                    )}
                </div>
            ) : (
                <div style={styles.success}>
                    <CheckCircle size={100} color="var(--municipal)" />
                    <h2 style={styles.successTitle}>Grievance Registered!</h2>
                    <p style={styles.successSub}>
                        Your complaint has been registered. Our team will investigate and resolve it within 7 working days.
                    </p>
                    <div style={styles.ticketCard}>
                        <span>Ticket ID:</span>
                        <strong>GRV-2026-8821</strong>
                    </div>
                    <button onClick={() => router.push('/')} style={styles.homeBtn}>Back to Home</button>
                </div>
            )}

            {isOpen && (
                <VirtualKeyboard
                    onInput={handleInput}
                    onDelete={handleDelete}
                    onClose={closeKeyboard}
                />
            )}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        padding: '2rem',
        maxWidth: '900px',
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
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    section: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '2rem',
        boxShadow: 'var(--card-shadow)',
    },
    sectionTitle: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
    },
    issueGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
    },
    issueCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        padding: '2rem 1rem',
        borderRadius: '1.5rem',
        border: '3px solid',
        cursor: 'pointer',
        transition: 'all 0.2s',
        background: 'white',
    },
    issueLabel: {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    form: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '2rem',
        boxShadow: 'var(--card-shadow)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    label: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
        color: '#475569',
    },
    input: {
        padding: '1.25rem',
        fontSize: '1.5rem',
        borderRadius: '1rem',
        border: '2px solid #e2e8f0',
        backgroundColor: '#f8fafc',
        cursor: 'pointer',
    },
    submitBtn: {
        padding: '1.5rem',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        backgroundColor: 'var(--municipal)',
        color: 'white',
        border: 'none',
        borderRadius: '1rem',
        cursor: 'pointer',
        marginTop: '1rem',
    },
    success: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '4rem 2rem',
        borderRadius: '2rem',
        boxShadow: 'var(--card-shadow)',
        textAlign: 'center',
        gap: '1.5rem',
    },
    successTitle: {
        fontSize: '2.5rem',
        fontWeight: 900,
        color: 'var(--municipal)',
        margin: 0,
    },
    successSub: {
        fontSize: '1.3rem',
        maxWidth: '500px',
    },
    ticketCard: {
        backgroundColor: '#f1f5f9',
        padding: '1.5rem 3rem',
        borderRadius: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        fontSize: '1.3rem',
    },
    homeBtn: {
        marginTop: '2rem',
        padding: '1rem 3rem',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        backgroundColor: 'var(--foreground)',
        color: 'white',
        borderRadius: '1rem',
        border: 'none',
        cursor: 'pointer',
    }
};
