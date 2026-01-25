'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { useRouter } from 'next/navigation';
import { ShieldCheck, User, Lock, Phone, ArrowRight, Eye, EyeOff, CheckCircle, Building2, BookOpen, GraduationCap, Briefcase, Star, Building, Mic, CreditCard, Smartphone, ArrowLeft, Fingerprint, Sparkles, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import FaceLivenessDetector from '@/components/FaceLivenessDetector';
import useVoiceForm from '@/hooks/useVoiceForm';

export default function RegisterPage() {
    const { setIsLoggedIn, setUser, addToast } = useAppState();
    const router = useRouter();
    const { isListening, startVoiceFill } = useVoiceForm((field, value) => {
        if (field === 'Full Name') setName(value);
        if (field === 'Mobile Number') setMobile(value);
    });

    const [role, setRole] = useState<'student' | 'youth' | 'government' | 'citizen' | null>(null);
    const [step, setStep] = useState(1); // 1: Role, 2: Identity, 3: Details
    const [showScanner, setShowScanner] = useState(false);

    const [name, setName] = useState('');
    const [aadhaar, setAadhaar] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Role Specific States
    const [institution, setInstitution] = useState('');
    const [studentId, setStudentId] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [qualification, setQualification] = useState('');
    const [skills, setSkills] = useState('');
    const [department, setDepartment] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [designation, setDesignation] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'verified' | 'failed'>('idle');

    const handleVerify = () => {
        if (aadhaar.length !== 12) return setError("Enter 12-digit Aadhaar");
        setVerificationStatus('verifying');
        setTimeout(() => {
            setVerificationStatus('verified');
            setName("Karan Verma"); // Simulated Aadhaar name
            addToast({ message: "Identity verified via Digiyatra-Link", type: 'success' });
            setStep(3);
        }, 1500);
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) return setError("Passwords do not match");

        setLoading(true);
        setTimeout(() => {
            const details = role === 'student' ? { institution, id: studentId, class: studentClass }
                : role === 'youth' ? { qualification, skills: skills.split(',') }
                    : role === 'government' ? { department, id: employeeId, designation }
                        : {};

            const userData = { name, mobile, aadhaar, password, role, details };
            localStorage.setItem(`user_${mobile}`, JSON.stringify(userData));
            localStorage.setItem('suvidha_session_user', JSON.stringify({ name, mobile, role, details }));

            setUser({ name, mobile, role: role || 'citizen', details });
            setIsLoggedIn(true);
            setLoading(false);
            addToast({ message: "Registration successful!", type: 'success' });
            router.push('/');
        }, 1500);
    };

    return (
        <div style={styles.container}>
            <div style={styles.ambientBlur} />

            <main style={styles.main}>
                <div style={styles.card}>
                    {/* Header */}
                    <div style={styles.header}>
                        <div style={styles.logoBox}>
                            <Sparkles size={32} color="white" />
                        </div>
                        <h1 style={styles.title}>Create Identity</h1>
                        <p style={styles.subtitle}>Step {step} of 3: {step === 1 ? 'Choose Role' : step === 2 ? 'Verify Identity' : 'Complete Profile'}</p>
                    </div>

                    {error && <div style={styles.errorBox}>{error}</div>}

                    {step === 1 && (
                        <div style={styles.roleGrid}>
                            {[
                                { id: 'citizen', label: 'Citizen', icon: '🏠', desc: 'General Services' },
                                { id: 'student', label: 'Student', icon: '🎓', desc: 'Learning & Skills' },
                                { id: 'youth', label: 'Youth', icon: '🚀', desc: 'Jobs & Traning' },
                                { id: 'government', label: 'Official', icon: '🏛️', desc: 'Admin Access' }
                            ].map(r => (
                                <button key={r.id} onClick={() => { setRole(r.id as any); setStep(2); }} style={styles.roleCard}>
                                    <span style={styles.roleIcon}>{r.icon}</span>
                                    <div style={{ textAlign: 'left' }}>
                                        <h3 style={styles.roleTitle}>{r.label}</h3>
                                        <p style={styles.roleDesc}>{r.desc}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {step === 2 && (
                        <div style={styles.formContainer}>
                            <button onClick={() => setStep(1)} style={styles.backBtn}><ArrowLeft size={16} /> Back to roles</button>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Aadhaar Number</label>
                                <div style={styles.inputWrapper}>
                                    <ShieldCheck size={20} color="#94a3b8" />
                                    <input
                                        type="tel"
                                        value={aadhaar}
                                        onChange={e => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))}
                                        placeholder="1234 5678 9012"
                                        style={styles.input}
                                    />
                                </div>
                            </div>
                            <button onClick={handleVerify} style={styles.primaryBtn} disabled={verificationStatus === 'verifying'}>
                                {verificationStatus === 'verifying' ? 'Verifying...' : 'Verify with DigiLocker'}
                            </button>
                            <label style={styles.biometricToggle}>
                                <input type="checkbox" onClick={() => setShowScanner(!showScanner)} /> Use Face RD Scanner 📸
                            </label>
                            {showScanner && <FaceLivenessDetector onVerify={() => handleVerify()} />}
                        </div>
                    )}

                    {step === 3 && (
                        <form onSubmit={handleRegister} style={styles.formContainer}>
                            <div style={styles.verifiedHeader}>
                                <div style={styles.verifiedBadge}><CheckCircle size={14} /> Identity Secured</div>
                                <h2 style={styles.cardTitle}>Personalize Profile</h2>
                                <p style={styles.cardSub}>Tailoring {role} services for your identity</p>
                            </div>

                            <div style={styles.scrollArea}>
                                <div style={styles.fieldSection}>
                                    <h4 style={styles.fieldSectionTitle}>Account Identity</h4>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.label}>Verified Name</label>
                                        <div style={{ ...styles.inputWrapper, background: '#f8fafc' }}>
                                            <User size={18} color="#94a3b8" />
                                            <input type="text" value={name} readOnly style={{ ...styles.input, color: '#64748b' }} />
                                        </div>
                                    </div>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.label}>Mobile Number</label>
                                        <div style={styles.inputWrapper}>
                                            <Phone size={18} color="#94a3b8" />
                                            <input type="tel" value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="Enter 10-digit number" style={styles.input} required />
                                        </div>
                                    </div>
                                </div>

                                <div style={styles.fieldSection}>
                                    <h4 style={styles.fieldSectionTitle}>{role?.toUpperCase()} Credentials</h4>

                                    {role === 'student' && (
                                        <>
                                            <div style={styles.inputGroup}>
                                                <label style={styles.label}>Institution Name</label>
                                                <div style={styles.inputWrapper}><Building2 size={18} color="#94a3b8" /><input type="text" value={institution} onChange={e => setInstitution(e.target.value)} placeholder="Ex: IIT Bombay" style={styles.input} required /></div>
                                            </div>
                                            <div style={styles.row}>
                                                <div style={styles.inputGroup}>
                                                    <label style={styles.label}>Roll/ID No.</label>
                                                    <div style={styles.inputWrapper}><CreditCard size={18} color="#94a3b8" /><input type="text" value={studentId} onChange={e => setStudentId(e.target.value)} placeholder="ID123" style={styles.input} required /></div>
                                                </div>
                                                <div style={styles.inputGroup}>
                                                    <label style={styles.label}>Class/Year</label>
                                                    <div style={styles.inputWrapper}><BookOpen size={18} color="#94a3b8" /><input type="text" value={studentClass} onChange={e => setStudentClass(e.target.value)} placeholder="3rd Year" style={styles.input} required /></div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {role === 'youth' && (
                                        <>
                                            <div style={styles.inputGroup}>
                                                <label style={styles.label}>Highest Qualification</label>
                                                <div style={styles.inputWrapper}><GraduationCap size={18} color="#94a3b8" /><input type="text" value={qualification} onChange={e => setQualification(e.target.value)} placeholder="Ex: B.Tech" style={styles.input} required /></div>
                                            </div>
                                            <div style={styles.inputGroup}>
                                                <label style={styles.label}>Skills (Comma separated)</label>
                                                <div style={styles.inputWrapper}><Star size={18} color="#94a3b8" /><input type="text" value={skills} onChange={e => setSkills(e.target.value)} placeholder="React, Node, SQL" style={styles.input} required /></div>
                                            </div>
                                        </>
                                    )}

                                    {role === 'government' && (
                                        <>
                                            <div style={styles.inputGroup}>
                                                <label style={styles.label}>Department</label>
                                                <div style={styles.inputWrapper}><Building size={18} color="#94a3b8" /><input type="text" value={department} onChange={e => setDepartment(e.target.value)} placeholder="Ex: Revenue Dept" style={styles.input} required /></div>
                                            </div>
                                            <div style={styles.row}>
                                                <div style={styles.inputGroup}>
                                                    <label style={styles.label}>Employee ID</label>
                                                    <div style={styles.inputWrapper}><ShieldCheck size={18} color="#94a3b8" /><input type="text" value={employeeId} onChange={e => setEmployeeId(e.target.value)} placeholder="GOV4421" style={styles.input} required /></div>
                                                </div>
                                                <div style={styles.inputGroup}>
                                                    <label style={styles.label}>Designation</label>
                                                    <div style={styles.inputWrapper}><Briefcase size={18} color="#94a3b8" /><input type="text" value={designation} onChange={e => setDesignation(e.target.value)} placeholder="Ex: Secretary" style={styles.input} required /></div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {role === 'citizen' && (
                                        <div style={styles.infoAlert}>
                                            <Globe size={20} color="#2563eb" />
                                            <p style={{ margin: 0, fontSize: '0.85rem' }}>Standard citizen profile includes all basic PDS and Municipal services.</p>
                                        </div>
                                    )}
                                </div>

                                <div style={styles.fieldSection}>
                                    <h4 style={styles.fieldSectionTitle}>Security Access</h4>
                                    <div style={styles.row}>
                                        <div style={styles.inputGroup}>
                                            <label style={styles.label}>Password</label>
                                            <div style={styles.inputWrapper}>
                                                <Lock size={18} color="#94a3b8" />
                                                <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} style={styles.input} required />
                                            </div>
                                        </div>
                                        <div style={styles.inputGroup}>
                                            <label style={styles.label}>Confirm</label>
                                            <div style={styles.inputWrapper}>
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                                                <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={styles.input} required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" style={styles.completeBtn} disabled={loading}>
                                {loading ? 'Initializing Mesh...' : 'Seal Identity & Connect'}
                            </button>
                        </form>
                    )}

                    <div style={styles.footerLink}>
                        Already registered? <Link href="/login" style={{ color: 'var(--theme-emerald)', fontWeight: 700 }}>Sign in here</Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { minHeight: '100vh', width: '100vw', position: 'relative', backgroundColor: '#f8fafc', overflow: 'hidden' },
    ambientBlur: { position: 'absolute', top: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0 },
    main: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', zIndex: 1 },
    card: { background: 'white', padding: '3rem', borderRadius: '32px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '500px', border: '1px solid #f1f5f9' },
    formContainer: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    verifiedHeader: { textAlign: 'center' },
    verifiedBadge: { background: '#f0fdf4', color: '#16a34a', padding: '0.4rem 0.75rem', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', border: '1px solid #dcfce7', marginBottom: '1rem' },
    cardTitle: { fontSize: '1.5rem', fontWeight: 900, color: '#1e293b', margin: 0 },
    cardSub: { fontSize: '0.85rem', color: '#64748b', margin: '0.2rem 0 0' },
    fieldSection: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    fieldSectionTitle: { fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.25rem' },
    scrollArea: { maxHeight: '420px', overflowY: 'auto', paddingRight: '0.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' },
    completeBtn: { background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', padding: '1.25rem', borderRadius: '16px', border: 'none', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(16,185,129,0.2)' },
    infoAlert: { background: '#eff6ff', border: '1px solid #dbeafe', padding: '1.25rem', borderRadius: '16px', display: 'flex', gap: '1rem', alignItems: 'center' },
    eyeBtn: { background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' },
    header: { textAlign: 'center', marginBottom: '2.5rem' },
    logoBox: { width: '56px', height: '56px', background: 'linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 8px 16px rgba(16,185,129,0.2)' },
    title: { fontSize: '1.75rem', fontWeight: 900, color: '#1e293b', margin: 0 },
    subtitle: { fontSize: '0.9rem', color: '#64748b', marginTop: '0.5rem' },
    primaryBtn: { background: '#1e293b', color: 'white', padding: '1.1rem', borderRadius: '16px', border: 'none', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' },
    backBtn: { background: 'none', border: 'none', color: '#64748b', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', display: 'center', gap: '0.4rem', marginBottom: '1.5rem' },
    roleGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
    roleCard: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '20px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s shadow 0.2s' },
    roleIcon: { fontSize: '1.5rem' },
    roleTitle: { fontSize: '1rem', fontWeight: 800, color: '#1e293b', margin: 0 },
    roleDesc: { fontSize: '0.75rem', color: '#64748b', margin: 0 },
    inputWrapper: { display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f1f5f9', padding: '0.8rem 1rem', borderRadius: '14px', border: '1px solid #e2e8f0', transition: 'all 0.2s' },
    input: { border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '0.95rem', color: '#1e293b' },
    label: { fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginLeft: '0.2rem' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
    row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
    errorBox: { background: '#fef2f2', color: '#dc2626', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 600, border: '1px solid #fee2e2' },
    biometricToggle: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#64748b', cursor: 'pointer' },
    footerLink: { marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#64748b' }
};
