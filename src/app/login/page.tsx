'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Phone, ArrowRight, Eye, EyeOff, User, Fingerprint, Sparkles, LayoutGrid, CreditCard } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
    const { setIsLoggedIn, setUser, addToast } = useAppState();
    const router = useRouter();
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        setTimeout(() => {
            const storedData = localStorage.getItem(`user_${mobile}`);
            if (!storedData) {
                setError("User identity not found in national registry.");
                setLoading(false);
                return;
            }

            const storedUser = JSON.parse(storedData);
            if (storedUser.password !== password) {
                setError("Authentication failed. Invalid credentials.");
                setLoading(false);
                return;
            }

            const sessionData = {
                name: storedUser.name,
                mobile,
                role: storedUser.role || 'citizen',
                details: storedUser.details || {}
            };
            localStorage.setItem('suvidha_session_user', JSON.stringify(sessionData));
            setUser(sessionData);
            setIsLoggedIn(true);
            setLoading(false);

            addToast({ message: `Welcome back, ${storedUser.name}!`, type: 'success' });
            router.push('/');
        }, 1200);
    };


    const handleBiometricLogin = () => {
        setLoading(true);
        setError('');
        addToast({ message: "Scanning fingerprint...", type: 'info' });

        setTimeout(() => {
            try {
                // Find the last registered user as a mock for biometric match
                const keys = Object.keys(localStorage);
                const userKey = keys.find(k => k.startsWith('user_'));

                if (userKey) {
                    const storedUser = JSON.parse(localStorage.getItem(userKey)!);
                    const sessionData = {
                        name: storedUser.name,
                        mobile: storedUser.mobile,
                        role: storedUser.role || 'citizen',
                        details: storedUser.details || {}
                    };
                    localStorage.setItem('suvidha_session_user', JSON.stringify(sessionData));
                    setUser(sessionData);
                    setIsLoggedIn(true);
                    addToast({ message: `Biometric Match: Welcome, ${storedUser.name}!`, type: 'success' });
                    setLoading(false);
                    router.push('/');
                } else {
                    setError("No biometric profile found. Please register first.");
                    addToast({ message: "Biometric authentication failed", type: 'error' });
                    setLoading(false);
                }
            } catch (err) {
                setError("Biometric scanner error. Please try again.");
                addToast({ message: "Scanner error", type: 'error' });
                setLoading(false);
            }
        }, 1500);
    };


    return (
        <div style={styles.container}>
            {/* Ambient Background */}
            <div style={styles.ambientBlur} />

            <main style={styles.main}>
                <div style={styles.card}>
                    <div style={styles.header}>
                        <div style={styles.logoBox}>
                            <ShieldCheck size={32} color="white" />
                        </div>
                        <h1 style={styles.title}>Login to Suvidha</h1>
                        <p style={styles.subtitle}>Enter your credentials to access your digital dashboard</p>
                    </div>

                    {error && <div style={styles.errorBox}>{error}</div>}

                    <form onSubmit={handleLogin} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Mobile Number</label>
                            <div style={styles.inputWrapper}>
                                <Phone size={20} color="#94a3b8" />
                                <input
                                    type="tel"
                                    value={mobile}
                                    onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    placeholder="99-88-77-66-55"
                                    style={styles.input}
                                    required
                                />
                            </div>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>National Password</label>
                            <div style={styles.inputWrapper}>
                                <Lock size={20} color="#94a3b8" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    style={styles.input}
                                    required
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div style={styles.footerActions}>
                            <label style={styles.checkboxLabel}>
                                <input type="checkbox" style={styles.checkbox} />
                                Remember access
                            </label>
                            <button type="button" style={styles.textBtn}>Forgot password?</button>
                        </div>

                        <button type="submit" style={styles.primaryBtn} disabled={loading}>
                            {loading ? 'Authenticating...' : (
                                <>
                                    Secure Access <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div style={styles.divider}>
                        <div style={styles.line} />
                        <span style={styles.dividerText}>OR</span>
                        <div style={styles.line} />
                    </div>

                    <button
                        onClick={handleBiometricLogin}
                        style={styles.biometricBtn}
                        disabled={loading}
                    >
                        <Fingerprint size={24} /> {loading ? 'Scanning...' : 'Login with Biometrics'}
                    </button>

                    <div style={styles.registerLink}>
                        Don't have an account? <Link href="/register" style={{ color: 'var(--theme-emerald)', fontWeight: 700 }}>Register now</Link>
                    </div>
                </div>
            </main>

            <footer style={styles.pageFooter}>
                <div style={styles.footerContent}>
                    <p>© 2026 Digital India Mission | Secure Portal</p>
                    <div style={styles.footerLinks}>
                        <span>Privacy</span>
                        <span>Terms</span>
                        <span>Official Support</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        overflow: 'hidden'
    },
    ambientBlur: {
        position: 'absolute',
        top: '10%',
        left: '50%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(255, 255, 255, 0) 70%)',
        zIndex: 0,
        transform: 'translateX(-50%)'
    },
    main: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        width: '100%',
        padding: '2rem'
    },
    card: {
        backgroundColor: 'white',
        width: '100%',
        maxWidth: '480px',
        padding: '3rem',
        borderRadius: '32px',
        border: '1px solid #f1f5f9',
        boxShadow: '0 20px 80px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
    },
    header: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
    },
    logoBox: {
        width: '64px',
        height: '64px',
        background: 'var(--theme-emerald)',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 20px rgba(16, 185, 129, 0.2)'
    },
    title: {
        fontSize: '2rem',
        fontWeight: 800,
        color: '#1e293b',
        margin: 0
    },
    subtitle: {
        fontSize: '0.95rem',
        color: '#64748b',
        margin: 0,
        lineHeight: 1.5
    },
    errorBox: {
        backgroundColor: '#fff1f2',
        color: '#e11d48',
        padding: '1rem',
        borderRadius: '16px',
        fontSize: '0.9rem',
        fontWeight: 600,
        textAlign: 'center',
        border: '1px solid #ffe4e6'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    label: {
        fontSize: '0.85rem',
        fontWeight: 700,
        color: '#475569',
        marginLeft: '0.5rem'
    },
    inputWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        backgroundColor: '#f8fafc',
        padding: '1.1rem 1.25rem',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        transition: 'all 0.2s'
    },
    input: {
        border: 'none',
        background: 'none',
        outline: 'none',
        fontSize: '1rem',
        width: '100%',
        color: '#1e293b'
    },
    eyeBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#94a3b8',
        padding: 0
    },
    footerActions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.9rem',
        color: '#64748b',
        cursor: 'pointer'
    },
    checkbox: {
        width: '18px',
        height: '18px',
        borderRadius: '4px',
        borderColor: '#e2e8f0'
    },
    textBtn: {
        background: 'none',
        border: 'none',
        color: 'var(--theme-emerald)',
        fontSize: '0.9rem',
        fontWeight: 700,
        cursor: 'pointer'
    },
    primaryBtn: {
        backgroundColor: '#1e293b',
        color: 'white',
        padding: '1.25rem',
        borderRadius: '16px',
        border: 'none',
        fontSize: '1.1rem',
        fontWeight: 800,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        marginTop: '0.5rem'
    },
    divider: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        color: '#cbd5e1'
    },
    line: {
        height: '1px',
        backgroundColor: '#e2e8f0',
        flex: 1
    },
    dividerText: {
        fontSize: '0.75rem',
        fontWeight: 600
    },
    biometricBtn: {
        backgroundColor: 'white',
        color: '#1e293b',
        border: '1px solid #e2e8f0',
        padding: '1.1rem',
        borderRadius: '16px',
        fontSize: '1rem',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        cursor: 'pointer'
    },
    registerLink: {
        textAlign: 'center',
        fontSize: '0.95rem',
        color: '#64748b'
    },
    pageFooter: {
        width: '100%',
        padding: '2rem',
        background: '#fcfcfc',
        borderTop: '1px solid #f1f5f9'
    },
    footerContent: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.85rem',
        color: '#94a3b8'
    },
    footerLinks: {
        display: 'flex',
        gap: '2rem',
        fontWeight: 600
    }
};
