'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { useVirtualKeyboard } from '@/hooks/useVirtualKeyboard';
import VirtualKeyboard from '@/components/VirtualKeyboard';
import { ArrowLeft, Baby, Heart, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CertificatesPage() {
    const { language } = useAppState();
    const t = translations[language];
    const router = useRouter();
    const { isOpen, openKeyboard, closeKeyboard, handleInput, handleDelete, values } = useVirtualKeyboard();
    const [certType, setCertType] = useState<'birth' | 'death' | null>(null);
    const [submitted, setSubmitted] = useState(false);

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
                <h2 style={styles.title}>{t.certificates}</h2>
            </div>

            {!submitted ? (
                <div style={styles.content}>
                    {!certType ? (
                        <div style={styles.typeSelection}>
                            <h3 style={styles.selectionTitle}>Select Certificate Type</h3>
                            <div style={styles.typeGrid}>
                                <button onClick={() => setCertType('birth')} style={styles.typeCard}>
                                    <Baby size={70} color="var(--primary)" />
                                    <span style={styles.typeLabel}>Birth Certificate</span>
                                </button>
                                <button onClick={() => setCertType('death')} style={styles.typeCard}>
                                    <Heart size={70} color="#ef4444" />
                                    <span style={styles.typeLabel}>Death Certificate</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={styles.form}>
                            <div style={styles.formHeader}>
                                <div style={{ color: certType === 'birth' ? 'var(--primary)' : '#ef4444' }}>
                                    {certType === 'birth' ? <Baby size={50} /> : <Heart size={50} />}
                                </div>
                                <h3>{certType === 'birth' ? 'Birth' : 'Death'} Certificate Request</h3>
                            </div>

                            <div style={styles.field}>
                                <label style={styles.label}>Full Name (as per record)</label>
                                <input
                                    readOnly
                                    value={values.personName || ''}
                                    onFocus={() => openKeyboard('personName')}
                                    placeholder="Enter name"
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.field}>
                                <label style={styles.label}>Registration Number (if known)</label>
                                <input
                                    readOnly
                                    value={values.regNo || ''}
                                    onFocus={() => openKeyboard('regNo')}
                                    placeholder="Optional"
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.field}>
                                <label style={styles.label}>Your Mobile Number</label>
                                <input
                                    readOnly
                                    value={values.mobile || ''}
                                    onFocus={() => openKeyboard('mobile')}
                                    placeholder="For updates"
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.btnGroup}>
                                <button type="button" onClick={() => setCertType(null)} style={styles.backFormBtn}>
                                    Change Type
                                </button>
                                <button
                                    type="submit"
                                    style={styles.submitBtn}
                                    disabled={!values.personName || !values.mobile}
                                >
                                    Request Certificate
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            ) : (
                <div style={styles.success}>
                    <CheckCircle size={100} color="var(--municipal)" />
                    <h2 style={styles.successTitle}>Request Submitted!</h2>
                    <p style={styles.successSub}>
                        Your {certType} certificate request has been received.
                        You will be notified via SMS when it's ready for collection.
                    </p>
                    <div style={styles.ticketCard}>
                        <span>Request ID:</span>
                        <strong>CERT-{certType?.toUpperCase()}-1029</strong>
                    </div>
                    <p style={styles.note}>Processing time: 3-5 working days</p>
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
    content: {
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '2rem',
        boxShadow: 'var(--card-shadow)',
        minHeight: '400px',
    },
    typeSelection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    selectionTitle: {
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    typeGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
    },
    typeCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        padding: '3rem 2rem',
        borderRadius: '1.5rem',
        border: '3px solid #e2e8f0',
        backgroundColor: '#f8fafc',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    typeLabel: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    formHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        paddingBottom: '1rem',
        borderBottom: '2px solid #e2e8f0',
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
    btnGroup: {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '1rem',
        marginTop: '1rem',
    },
    backFormBtn: {
        padding: '1.25rem',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        backgroundColor: 'white',
        color: 'var(--primary)',
        border: '2px solid var(--primary)',
        borderRadius: '1rem',
        cursor: 'pointer',
    },
    submitBtn: {
        padding: '1.25rem',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        backgroundColor: 'var(--primary)',
        color: 'white',
        border: 'none',
        borderRadius: '1rem',
        cursor: 'pointer',
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
    note: {
        fontSize: '1rem',
        opacity: 0.7,
        fontStyle: 'italic',
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
