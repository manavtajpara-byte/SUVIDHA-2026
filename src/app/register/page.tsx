'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { useRouter } from 'next/navigation';
import { ShieldCheck, User, Lock, Phone, ArrowRight, Eye, EyeOff, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function RegisterPage() {
    const { setIsLoggedIn, setUser } = useAppState();
    const router = useRouter();

    const [name, setName] = useState('');
    const [aadhaar, setAadhaar] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (mobile.length < 10) return setError("Invalid Mobile Number");
        if (password.length < 4) return setError("Password must be at least 4 chars");
        if (password !== confirmPassword) return setError("Passwords do not match");

        setLoading(true);
        setTimeout(() => {
            // Save user credentials (simulated DB)
            const userData = { name, mobile, aadhaar, password };
            localStorage.setItem(`user_${mobile}`, JSON.stringify(userData));

            // Auto-login
            localStorage.setItem('suvidha_session_user', JSON.stringify({ name, mobile }));
            setUser({ name, mobile });
            setIsLoggedIn(true);
            setLoading(false);
            router.push('/');
        }, 1500);
    };

    return (
        <div style={styles.container}>
            <div style={styles.watermarkContainer}>
                <Image src="/logo.png" alt="Watermark" width={800} height={800} style={styles.watermark} />
            </div>

            <div style={styles.grid} className="grid-responsive">
                {/* Left Side: Info */}
                <div style={styles.infoPanel} className="info-panel-responsive">
                    <div style={styles.brand}>
                        <Image src="/logo.png" alt="Logo" width={60} height={60} />
                        <h1 style={styles.brandName}>SUVIDHA KIOSK</h1>
                    </div>

                    <h2 style={styles.infoTitle}>Join Digital India.<br />Start Today.</h2>
                    <p style={styles.infoDesc}>Create your unique Digital Identity and unlock seamless access to national welfare schemes.</p>

                    <div style={styles.featureBox}>
                        <h3>Why Register?</h3>
                        <ul>
                            <li>✅ Single Sign-On for all services</li>
                            <li>✅ Secure Digital Document Vault</li>
                            <li>✅ Personalized Scheme Recommendations</li>
                            <li>✅ Track Application Status in Real-time</li>
                        </ul>
                    </div>
                </div>

                {/* Right Side: Register Form */}
                <div style={styles.formPanel}>
                    <div style={styles.card}>
                        <div style={styles.formHeader}>
                            <h2 style={styles.formTitle}>Create Account</h2>
                            <p style={styles.formSub}>Register with your details</p>
                        </div>

                        <form onSubmit={handleRegister} style={styles.form}>
                            {error && <div style={styles.errorBanner}>{error}</div>}

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Full Name</label>
                                <div style={styles.inputWrapper}>
                                    <User size={20} color="#64748b" />
                                    <input
                                        type="text"
                                        placeholder="Name as per Aadhaar"
                                        style={styles.input}
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Aadhaar Number</label>
                                <div style={styles.inputWrapper}>
                                    <ShieldCheck size={20} color="#64748b" />
                                    <input
                                        type="text"
                                        placeholder="12-digit Aadhaar"
                                        style={styles.input}
                                        value={aadhaar}
                                        onChange={e => setAadhaar(e.target.value)}
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
                                        placeholder="10-digit mobile"
                                        style={styles.input}
                                        value={mobile}
                                        onChange={e => setMobile(e.target.value)}
                                        maxLength={10}
                                        required
                                    />
                                </div>
                            </div>

                            <div style={styles.row}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Password</label>
                                    <div style={styles.inputWrapper}>
                                        <Lock size={20} color="#64748b" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Create Pass"
                                            style={styles.input}
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Confirm</label>
                                    <div style={styles.inputWrapper}>
                                        <Lock size={20} color="#64748b" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Repeat Pass"
                                            style={styles.input}
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.9rem' }}>
                                    {showPassword ? "Hide Passwords" : "Show Passwords"}
                                </button>
                            </div>

                            <button type="submit" style={styles.submitBtn} disabled={loading}>
                                {loading ? 'Creating Identity...' : 'Register & Login'}
                                <ArrowRight size={20} />
                            </button>
                        </form>

                        <div style={styles.footer}>
                            <p>Already have an account?</p>
                            <Link href="/login" style={styles.registerLink}>Login here</Link>
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
        backgroundColor: 'rgba(16, 185, 129, 0.05)', // Green tint for register
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
        background: 'linear-gradient(to right, #10b981, #0ea5e9)',
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
    featureBox: {
        background: 'white',
        padding: '2rem',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
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
        gap: '1rem',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
    },
    label: {
        fontSize: '0.85rem',
        fontWeight: 600,
        color: '#475569',
    },
    inputWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        background: '#f1f5f9',
        padding: '0.8rem 1rem',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        transition: 'all 0.2s',
    },
    input: {
        border: 'none',
        background: 'none',
        outline: 'none',
        width: '100%',
        fontSize: '1rem',
        color: '#1e293b',
    },
    submitBtn: {
        background: '#10b981', // Green for register
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
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
        marginTop: '0.5rem',
    },
    errorBanner: {
        background: '#fee2e2',
        color: '#dc2626',
        padding: '0.75rem',
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
        color: '#10b981',
        fontWeight: 700,
        textDecoration: 'none',
    }
};
