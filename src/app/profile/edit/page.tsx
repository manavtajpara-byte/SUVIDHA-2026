'use client';

import React, { useState, useEffect } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import {
    User, Phone, Shield, ArrowLeft, Save,
    Building2, BookOpen, GraduationCap, Briefcase
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EditProfilePage() {
    const { user, setUser, language, addToast } = useAppState();
    const t = translations[language] || translations.en;
    const router = useRouter();

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [details, setDetails] = useState<any>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setMobile(user.mobile);
            setDetails(user.details || {});
        } else {
            router.push('/login');
        }
    }, [user, router]);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulation
        setTimeout(() => {
            const updatedUser = {
                ...user,
                name,
                mobile,
                details
            };

            // Update State
            setUser(updatedUser);

            // Update localStorage
            localStorage.setItem('suvidha_session_user', JSON.stringify(updatedUser));
            localStorage.setItem(`user_${mobile}`, JSON.stringify(updatedUser));

            addToast({
                message: "Profile updated successfully!",
                type: 'success'
            });

            setLoading(false);
            router.push('/profile');
        }, 1000);
    };

    if (!user) return null;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={24} />
                </button>
                <h1 style={styles.title}>Edit Profile</h1>
            </div>

            <form onSubmit={handleSave} style={styles.formCard}>
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Basic Information</h3>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Full Name</label>
                        <div style={styles.inputWrapper}>
                            <User size={20} color="#64748b" />
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Mobile Number</label>
                        <div style={styles.inputWrapper}>
                            <Phone size={20} color="#64748b" />
                            <input
                                type="tel"
                                value={mobile}
                                onChange={e => setMobile(e.target.value)}
                                style={styles.input}
                                maxLength={10}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Role Specific Details ({user.role})</h3>

                    {user.role === 'student' && (
                        <>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Institution</label>
                                <div style={styles.inputWrapper}>
                                    <Building2 size={20} color="#64748b" />
                                    <input
                                        type="text"
                                        value={details.institution || ''}
                                        onChange={e => setDetails({ ...details, institution: e.target.value })}
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Class / Course</label>
                                <div style={styles.inputWrapper}>
                                    <GraduationCap size={20} color="#64748b" />
                                    <input
                                        type="text"
                                        value={details.class || ''}
                                        onChange={e => setDetails({ ...details, class: e.target.value })}
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {user.role === 'youth' && (
                        <>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Qualification</label>
                                <div style={styles.inputWrapper}>
                                    <BookOpen size={20} color="#64748b" />
                                    <input
                                        type="text"
                                        value={details.qualification || ''}
                                        onChange={e => setDetails({ ...details, qualification: e.target.value })}
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {user.role === 'government' && (
                        <>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Department</label>
                                <div style={styles.inputWrapper}>
                                    <Building2 size={20} color="#64748b" />
                                    <input
                                        type="text"
                                        value={details.department || ''}
                                        onChange={e => setDetails({ ...details, department: e.target.value })}
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Designation</label>
                                <div style={styles.inputWrapper}>
                                    <Briefcase size={20} color="#64748b" />
                                    <input
                                        type="text"
                                        value={details.designation || ''}
                                        onChange={e => setDetails({ ...details, designation: e.target.value })}
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <button type="submit" style={styles.saveBtn} disabled={loading}>
                    {loading ? 'Saving Changes...' : (
                        <>
                            <Save size={20} /> Save Changes
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '3rem 1.5rem',
        fontFamily: "'Inter', sans-serif",
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        marginBottom: '3rem'
    },
    backBtn: {
        width: '48px',
        height: '48px',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: '#1e293b'
    },
    title: {
        fontSize: '2rem',
        fontWeight: 800,
        margin: 0,
        color: '#1e293b'
    },
    formCard: {
        background: 'white',
        borderRadius: '32px',
        border: '1px solid #f1f5f9',
        padding: '2.5rem',
        boxShadow: '0 10px 40px rgba(0,0,0,0.02)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem'
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    sectionTitle: {
        fontSize: '1.1rem',
        fontWeight: 700,
        color: '#1e293b',
        margin: '0 0 0.5rem 0',
        paddingLeft: '0.5rem',
        borderLeft: '4px solid var(--primary)'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    label: {
        fontSize: '0.85rem',
        fontWeight: 600,
        color: '#64748b'
    },
    inputWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        background: '#f8fafc',
        padding: '1rem',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        transition: 'all 0.2s'
    },
    input: {
        border: 'none',
        background: 'none',
        outline: 'none',
        width: '100%',
        fontSize: '1rem',
        color: '#1e293b'
    },
    saveBtn: {
        background: '#1e293b',
        color: 'white',
        padding: '1.25rem',
        borderRadius: '16px',
        border: 'none',
        fontSize: '1.1rem',
        fontWeight: 700,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        transition: 'transform 0.2s',
        marginTop: '1rem'
    }
};
