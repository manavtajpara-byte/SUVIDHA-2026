'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Shield, User, ArrowRight } from 'lucide-react';
import { useAppState } from '@/context/StateContext';

export default function AdminLoginPage() {
    const router = useRouter();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulated highly secure authentication logic ;)
        setTimeout(() => {
            if (userId === 'admin' && password === 'suvidha2026') {
                // Successful login
                // In a real app, we'd set a cookie/token here
                localStorage.setItem('admin_session', 'active');
                router.push('/admin/dashboard');
            } else {
                setError('Invalid Credentials. Access Denied.');
                setLoading(false);
            }
        }, 1000);
    };

    return (
        <div style={styles.container}>
            <div style={styles.panel}>
                <div style={styles.header}>
                    <div style={styles.iconBox}>
                        <Shield size={40} color="var(--primary)" />
                    </div>
                    <h1 style={styles.title}>Official Login</h1>
                    <p style={styles.subtitle}>Secure Access for SUVIDHA Officials</p>
                </div>

                <form onSubmit={handleLogin} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Official ID</label>
                        <div style={styles.inputWrapper}>
                            <User size={20} style={styles.inputIcon} />
                            <input
                                type="text"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                placeholder="Enter Official ID"
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <div style={styles.inputWrapper}>
                            <Lock size={20} style={styles.inputIcon} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>

                    {error && <div style={styles.error}>{error}</div>}

                    <button type="submit" style={styles.loginBtn} disabled={loading}>
                        {loading ? 'Authenticating...' : 'Access Dashboard'}
                        {!loading && <ArrowRight size={20} />}
                    </button>
                </form>

                <div style={styles.footer}>
                    <p>Unauthorized access is a punishable offense under IT Act, 2000.</p>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 20%)',
        padding: '1rem',
    },
    panel: {
        width: '100%',
        maxWidth: '450px',
        background: 'white',
        borderRadius: '2rem',
        padding: '3rem',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    header: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
    },
    iconBox: {
        width: '80px',
        height: '80px',
        borderRadius: '2rem',
        background: '#f3f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '0.5rem',
    },
    title: {
        margin: 0,
        fontSize: '2rem',
        fontWeight: 800,
        color: '#1e293b',
    },
    subtitle: {
        margin: 0,
        color: '#64748b',
        fontSize: '1rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    label: {
        fontSize: '0.9rem',
        fontWeight: 600,
        color: '#475569',
        marginLeft: '0.5rem',
    },
    inputWrapper: {
        position: 'relative',
    },
    inputIcon: {
        position: 'absolute',
        left: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#94a3b8',
    },
    input: {
        width: '100%',
        padding: '1rem 1rem 1rem 3rem',
        borderRadius: '1rem',
        border: '2px solid #e2e8f0',
        fontSize: '1rem',
        outline: 'none',
        transition: 'all 0.2s',
        background: '#f8fafc',
    },
    loginBtn: {
        marginTop: '1rem',
        padding: '1rem',
        borderRadius: '1rem',
        border: 'none',
        background: 'var(--primary)',
        color: 'white',
        fontSize: '1.1rem',
        fontWeight: 700,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
        transition: 'all 0.2s',
    },
    error: {
        padding: '0.75rem',
        borderRadius: '0.75rem',
        background: '#fef2f2',
        color: '#ef4444',
        fontSize: '0.9rem',
        textAlign: 'center',
        fontWeight: 600,
        border: '1px solid #fee2e2',
    },
    footer: {
        textAlign: 'center',
        fontSize: '0.8rem',
        color: '#94a3b8',
        marginTop: '1rem',
    },
};
