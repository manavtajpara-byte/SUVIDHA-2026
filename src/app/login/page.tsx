'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Phone, ArrowRight, Eye, EyeOff, LayoutGrid, Zap, Droplets, CreditCard } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
    const { setIsLoggedIn, setUser } = useAppState();
    const router = useRouter();
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void, maxLen: number) => {
        const val = e.target.value;
        if (/^\d*$/.test(val) && val.length <= maxLen) {
            setter(val);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        setTimeout(() => {
            const storedData = localStorage.getItem(`user_${mobile}`);
            if (!storedData) {
                setError("User not found. Please register first.");
                setLoading(false);
                return;
            }

            const user = JSON.parse(storedData);
            if (user.password !== password) {
                setError("Incorrect Password. Try again.");
                setLoading(false);
                return;
            }

            // Success
            localStorage.setItem('suvidha_session_user', JSON.stringify({ name: user.name, mobile }));
            setUser({ name: user.name, mobile });
            setIsLoggedIn(true);
            setLoading(false);
            router.push('/');
        }, 1000);
    };

    return (
        <div style={styles.container}>
            {/* Watermark Logo */}
            <div style={styles.watermarkContainer}>
                <Image src="/logo.png" alt="Watermark" width={800} height={800} style={styles.watermark} />
            </div>

            <div style={styles.grid} className="grid-responsive">
                {/* Left Side: Work Information */}
                <div style={styles.infoPanel} className="info-panel-responsive">
                    <div style={styles.brand}>
                        <Image src="/logo.png" alt="Logo" width={60} height={60} />
                        <h1 style={styles.brandName}>SUVIDHA KIOSK</h1>
                    </div>

                    <h2 style={styles.infoTitle}>One Portal, <br />Infinite Possibilities.</h2>
                    <p style={styles.infoDesc}>Access all government services securely from a single digital gateway.</p>

                    <div style={styles.features}>
                        <div style={styles.featureItem}>
                            <Zap size={24} color="#facc15" />
                            <div>
                                <h3>Utility Payments</h3>
                                <p>Pay Electricity, Water, and Gas bills instantly.</p>
                            </div>
                        </div>
                        <div style={styles.featureItem}>
                            <LayoutGrid size={24} color="#8b5cf6" />
                            <div>
                                <h3>Digital Documents</h3>
                                <p>Access Aadhaar, PAN, and Certificates securely.</p>
                            </div>
                        </div>
                        <div style={styles.featureItem}>
                            <CreditCard size={24} color="#ec4899" />
                            <div>
                                <h3>Financial Inclusion</h3>
                                <p>AEPS, DBT Status, and Micro-ATM services.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div style={styles.formPanel}>
                    <div style={styles.card}>
                        <div style={styles.formHeader}>
                            <h2 style={styles.formTitle}>Citizen Login</h2>
                            <p style={styles.formSub}>Secure access with your password</p>
                        </div>

                        <form onSubmit={handleLogin} style={styles.form}>
                            {error && <div style={styles.errorBanner}>{error}</div>}

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Mobile Number</label>
                                <div style={styles.inputWrapper}>
                                    <Phone size={20} color="#64748b" />
                                    <input
                                        type="tel"
                                        placeholder="Enter 10-digit mobile"
                                        style={styles.input}
                                        value={mobile}
                                        onChange={e => handleNumericInput(e, setMobile, 10)}
                                        maxLength={10}
                                        required
                                    />
                                </div>
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Password</label>
                                <div style={styles.inputWrapper}>
                                    <Lock size={20} color="#64748b" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        style={styles.input}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={styles.eyeBtn}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div style={styles.forgotRow}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input type="checkbox" /> Remember me
                                </label>
                                <button type="button" style={styles.forgotBtn}>Forgot Password?</button>
                            </div>

                            <button type="submit" style={styles.submitBtn} disabled={loading}>
                                {loading ? 'Authenticating...' : 'Secure Login'}
                                <ArrowRight size={20} />
                            </button>
                        </form>

                        <div style={styles.footer}>
                            <p>New to Suvidha?</p>
                            <Link href="/register" style={styles.registerLink}>Create new account</Link>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @media (max-width: 768px) {
                    .info-panel-responsive {
                        display: none !important;
                    }
                    .grid-responsive {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        minHeight: '100vh',
        width: '100vw',
        position: 'relative',
        backgroundColor: '#f8fafc',
        overflow: 'hidden',
    },
    watermarkContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 0,
        opacity: 0.05,
        pointerEvents: 'none',
    },
    watermark: {
        objectFit: 'contain',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '100vh',
        position: 'relative',
        zIndex: 1,
    },
    infoPanel: {
        backgroundColor: 'rgba(139, 92, 246, 0.05)',
        padding: '4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRight: '1px solid rgba(0,0,0,0.05)',
    },
    brand: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '3rem',
    },
    brandName: {
        fontSize: '2rem',
        fontWeight: 900,
        background: 'linear-gradient(to right, var(--primary), #ec4899)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    infoTitle: {
        fontSize: '3.5rem',
        fontWeight: 800,
        lineHeight: 1.1,
        marginBottom: '1.5rem',
        color: '#1e293b',
    },
    infoDesc: {
        fontSize: '1.25rem',
        color: '#64748b',
        maxWidth: '500px',
        marginBottom: '4rem',
    },
    features: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    featureItem: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
    },
    formPanel: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
    },
    card: {
        background: 'white',
        padding: '3rem',
        borderRadius: '24px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '500px',
    },
    formHeader: {
        marginBottom: '2rem',
        textAlign: 'center',
    },
    formTitle: {
        fontSize: '2rem',
        fontWeight: 700,
        color: '#1e293b',
        marginBottom: '0.5rem',
    },
    formSub: {
        color: '#64748b',
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
    },
    inputWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        background: '#f1f5f9',
        padding: '1rem',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        transition: 'all 0.2s',
    },
    input: {
        border: 'none',
        background: 'none',
        outline: 'none',
        width: '100%',
        fontSize: '1.1rem',
        color: '#1e293b',
    },
    eyeBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#94a3b8',
    },
    submitBtn: {
        background: 'var(--primary)',
        color: 'white',
        padding: '1.25rem',
        borderRadius: '12px',
        border: 'none',
        fontSize: '1.1rem',
        fontWeight: 700,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
        marginTop: '1rem',
    },
    errorBanner: {
        background: '#fee2e2',
        color: '#dc2626',
        padding: '1rem',
        borderRadius: '8px',
        textAlign: 'center',
        fontSize: '0.9rem',
        fontWeight: 600,
    },
    footer: {
        marginTop: '2rem',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        color: '#64748b',
    },
    registerLink: {
        color: 'var(--primary)',
        fontWeight: 700,
        textDecoration: 'none',
    },
    forgotRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.9rem',
        color: '#64748b',
    },
    forgotBtn: {
        background: 'none',
        border: 'none',
        color: 'var(--primary)',
        fontWeight: 600,
        cursor: 'pointer',
    }
};
