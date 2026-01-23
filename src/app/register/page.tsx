'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { useRouter } from 'next/navigation';
import { ShieldCheck, User, Lock, Phone, ArrowRight, Eye, EyeOff, CheckCircle, Building2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import FaceLivenessDetector from '@/components/FaceLivenessDetector';

export default function RegisterPage() {
    const { setIsLoggedIn, setUser } = useAppState();
    const router = useRouter();

    const [role, setRole] = useState<'student' | 'youth' | 'government' | 'citizen' | null>(null);
    const [showScanner, setShowScanner] = useState(false);

    const [name, setName] = useState('');
    const [aadhaar, setAadhaar] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Role Specific States
    // Student
    const [institution, setInstitution] = useState('');
    const [studentId, setStudentId] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [interests, setInterests] = useState('');

    // Youth
    const [qualification, setQualification] = useState('');
    const [skills, setSkills] = useState('');
    const [employment, setEmployment] = useState('unemployed');

    // Govt
    const [department, setDepartment] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [designation, setDesignation] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'verified' | 'failed'>('idle');

    const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void, maxLen: number) => {
        const val = e.target.value;
        if (/^\d*$/.test(val) && val.length <= maxLen) {
            setter(val);
            // Reset verification if aadhaar changes
            if (maxLen === 12) setVerificationStatus('idle');
        }
    };

    const verifyWithDigiLocker = () => {
        if (aadhaar.length !== 12) {
            setError("Please enter valid 12-digit Aadhaar before verifying.");
            return;
        }
        setVerificationStatus('verifying');
        setError('');

        // Simulation
        setTimeout(() => {
            // Mock: If Aadhaar ends with '0000', it fails. Else success.
            if (aadhaar.endsWith('0000')) {
                setVerificationStatus('failed');
                setError("DigiLocker: Aadhaar not found or invalid.");
            } else {
                setVerificationStatus('verified');
                // Auto-fill name simulation if empty
                if (!name) setName("Simulated Citizen User");
            }
        }, 2000);
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (mobile.length !== 10) return setError("Mobile Number must be exactly 10 digits");
        if (aadhaar.length !== 12) return setError("Aadhaar Number must be exactly 12 digits");

        if (verificationStatus !== 'verified') {
            return setError("Please verify your Aadhaar with DigiLocker first.");
        }

        if (password.length < 4) return setError("Password must be at least 4 chars");
        if (password !== confirmPassword) return setError("Passwords do not match");

        setLoading(true);
        setTimeout(() => {
            // Save user credentials (simulated DB)
            const details = role === 'student' ? { institution, id: studentId, class: studentClass, interests: interests.split(',') }
                : role === 'youth' ? { qualification, skills: skills.split(','), employment }
                    : role === 'government' ? { department, id: employeeId, designation }
                        : {};

            const userData = { name, mobile, aadhaar, password, isDigiLockerVerified: true, role, details };
            localStorage.setItem(`user_${mobile}`, JSON.stringify(userData));

            // Auto-login
            localStorage.setItem('suvidha_session_user', JSON.stringify({ name, mobile, role, details }));
            setUser({ name, mobile, role: role || 'citizen', details });
            setIsLoggedIn(true);
            setLoading(false);
            router.push('/');
        }, 1500);
    };

    // ... inside return ...

    <div style={styles.inputGroup}>
        <label style={styles.label}>Aadhaar Number</label>
        <div style={styles.inputWrapper}>
            <ShieldCheck size={20} color={verificationStatus === 'verified' ? "#10b981" : "#64748b"} />
            <input
                type="text"
                placeholder="12-digit Aadhaar"
                style={styles.input}
                value={aadhaar}
                onChange={e => handleNumericInput(e, setAadhaar, 12)}
                required
                disabled={verificationStatus === 'verifying' || verificationStatus === 'verified'}
            />
            {verificationStatus === 'verified' && <CheckCircle size={20} color="#10b981" />}
        </div>

        {verificationStatus !== 'verified' && (
            <button
                type="button"
                onClick={verifyWithDigiLocker}
                style={styles.verifyBtn}
                disabled={verificationStatus === 'verifying' || aadhaar.length !== 12}
            >
                {verificationStatus === 'verifying' ? 'Fetching DigiLocker Data...' : 'Verify Identity'}
            </button>
        )}
        {verificationStatus === 'failed' && <span style={{ color: '#dc2626', fontSize: '0.8rem' }}>Verification Failed. Try again.</span>}
        {verificationStatus === 'verified' && <span style={{ color: '#10b981', fontSize: '0.8rem' }}>✅ Verified via DigiLocker API</span>}
    </div>

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

                        {!role ? (
                            // STEP 1: ROLE SELECTION
                            <div className="animate-fade-in">
                                <div style={styles.formHeader}>
                                    <h2 style={styles.formTitle}>Select Your Role</h2>
                                    <p style={styles.formSub}>Choose how you want to join Suvidha</p>
                                </div>
                                <div style={styles.roleGrid}>
                                    <button onClick={() => setRole('student')} style={styles.roleCard}>
                                        <div style={styles.roleIcon} className="bg-blue-100 text-blue-600">🎓</div>
                                        <div>
                                            <h3 style={styles.roleTitle}>Student</h3>
                                            <p style={styles.roleDesc}>Scholarships, Exams & Learning</p>
                                        </div>
                                    </button>

                                    <button onClick={() => setRole('youth')} style={styles.roleCard}>
                                        <div style={styles.roleIcon} className="bg-purple-100 text-purple-600">🚀</div>
                                        <div>
                                            <h3 style={styles.roleTitle}>Youth</h3>
                                            <p style={styles.roleDesc}>Jobs, Skilling & Career</p>
                                        </div>
                                    </button>

                                    <button onClick={() => setRole('government')} style={styles.roleCard}>
                                        <div style={styles.roleIcon} className="bg-orange-100 text-orange-600">🏛️</div>
                                        <div>
                                            <h3 style={styles.roleTitle}>Govt Official</h3>
                                            <p style={styles.roleDesc}>Admin & Management</p>
                                        </div>
                                    </button>

                                    <button onClick={() => setRole('citizen')} style={styles.roleCard}>
                                        <div style={styles.roleIcon} className="bg-green-100 text-green-600">🏠</div>
                                        <div>
                                            <h3 style={styles.roleTitle}>Citizen</h3>
                                            <p style={styles.roleDesc}>General Services Access</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // STEP 2: REGISTRATION FORM
                            <div className="animate-fade-in">
                                <button onClick={() => setRole(null)} style={styles.backLink}>← Back to Roles</button>
                                <div style={styles.formHeader}>
                                    <h2 style={styles.formTitle}>
                                        {role === 'student' && '🎓 Student Registration'}
                                        {role === 'youth' && '🚀 Youth Registration'}
                                        {role === 'government' && '🏛️ Official Registration'}
                                        {role === 'citizen' && '🏠 Citizen Registration'}
                                    </h2>
                                    <p style={styles.formSub}>Verify your identity to proceed</p>
                                </div>

                                <form onSubmit={handleRegister} style={styles.form}>
                                    {error && <div style={styles.errorBanner}>{error}</div>}

                                    {/* AADHAAR SECTION */}
                                    <div style={styles.inputGroup}>
                                        <label style={styles.label}>Aadhaar Number</label>
                                        <div style={styles.inputWrapper}>
                                            <ShieldCheck size={20} color={verificationStatus === 'verified' ? "#10b981" : "#64748b"} />
                                            <input
                                                type="text"
                                                placeholder="12-digit Aadhaar"
                                                style={styles.input}
                                                value={aadhaar}
                                                onChange={e => handleNumericInput(e, setAadhaar, 12)}
                                                required
                                                disabled={verificationStatus === 'verifying' || verificationStatus === 'verified'}
                                            />
                                            {verificationStatus === 'verified' && <CheckCircle size={20} color="#10b981" />}
                                        </div>

                                        {/* Verify Options */}
                                        {verificationStatus !== 'verified' && (
                                            <div style={styles.verifyOptions}>
                                                {!showScanner ? (
                                                    <>
                                                        <button
                                                            type="button"
                                                            onClick={verifyWithDigiLocker}
                                                            style={styles.verifyBtn}
                                                            disabled={aadhaar.length !== 12}
                                                        >
                                                            Verify via OTP
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowScanner(true)}
                                                            style={{ ...styles.verifyBtn, background: '#e0e7ff', color: '#4338ca', borderColor: '#c7d2fe' }}
                                                            disabled={aadhaar.length !== 12}
                                                        >
                                                            Verify via Face RD 📸
                                                        </button>
                                                    </>
                                                ) : (
                                                    <div style={{ marginTop: '1rem' }}>
                                                        <FaceLivenessDetector onVerify={(success) => {
                                                            if (success) {
                                                                setVerificationStatus('verified');
                                                                setName('Aadhaar User (Verified)');
                                                                setShowScanner(false);
                                                            }
                                                        }} />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowScanner(false)}
                                                            style={{ marginTop: '0.5rem', width: '100%', padding: '0.5rem', border: 'none', background: 'none', color: '#64748b', cursor: 'pointer' }}
                                                        >
                                                            Cancel Face Scan
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        {verificationStatus === 'verified' && <span style={{ color: '#10b981', fontSize: '0.8rem' }}>✅ Verified via UIDAI Face RD</span>}
                                    </div>

                                    {/* Additional Fields appear only after Verification usually, but for demo we keep them visible */}
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
                                                readOnly={verificationStatus === 'verified'} // Lock name after verification
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
                                                onChange={e => handleNumericInput(e, setMobile, 10)}
                                                maxLength={10}
                                                required
                                            />
                                        </div>
                                    </div>


                                    {/* ROLE SPECIFIC FIELDS */}
                                    {role === 'student' && (
                                        <>
                                            <div style={styles.inputGroup}>
                                                <label style={styles.label}>Institution Name</label>
                                                <div style={styles.inputWrapper}>
                                                    <Building2 size={20} color="#64748b" />
                                                    <input type="text" placeholder="School / College Name" style={styles.input} value={institution} onChange={e => setInstitution(e.target.value)} required />
                                                </div>
                                            </div>
                                            <div style={styles.row}>
                                                <div style={styles.inputGroup}>
                                                    <label style={styles.label}>Student ID / Roll No</label>
                                                    <div style={styles.inputWrapper}>
                                                        <input type="text" placeholder="ID Number" style={styles.input} value={studentId} onChange={e => setStudentId(e.target.value)} required />
                                                    </div>
                                                </div>
                                                <div style={styles.inputGroup}>
                                                    <label style={styles.label}>Class / Course</label>
                                                    <div style={styles.inputWrapper}>
                                                        <input type="text" placeholder="Ex: Class 10 / B.Tech" style={styles.input} value={studentClass} onChange={e => setStudentClass(e.target.value)} required />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {role === 'youth' && (
                                        <>
                                            <div style={styles.inputGroup}>
                                                <label style={styles.label}>Highest Qualification</label>
                                                <div style={styles.inputWrapper}>
                                                    <input type="text" placeholder="Ex: Graduate, 12th Pass" style={styles.input} value={qualification} onChange={e => setQualification(e.target.value)} required />
                                                </div>
                                            </div>
                                            <div style={styles.inputGroup}>
                                                <label style={styles.label}>Key Skills</label>
                                                <div style={styles.inputWrapper}>
                                                    <input type="text" placeholder="Ex: Coding, Driving, Plumbing" style={styles.input} value={skills} onChange={e => setSkills(e.target.value)} required />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {role === 'government' && (
                                        <>
                                            <div style={styles.inputGroup}>
                                                <label style={styles.label}>Department Name</label>
                                                <div style={styles.inputWrapper}>
                                                    <Building2 size={20} color="#64748b" />
                                                    <input type="text" placeholder="Ministry / Dept Name" style={styles.input} value={department} onChange={e => setDepartment(e.target.value)} required />
                                                </div>
                                            </div>
                                            <div style={styles.row}>
                                                <div style={styles.inputGroup}>
                                                    <label style={styles.label}>Employee ID</label>
                                                    <div style={styles.inputWrapper}>
                                                        <input type="text" placeholder="Govt ID Number" style={styles.input} value={employeeId} onChange={e => setEmployeeId(e.target.value)} required />
                                                    </div>
                                                </div>
                                                <div style={styles.inputGroup}>
                                                    <label style={styles.label}>Designation</label>
                                                    <div style={styles.inputWrapper}>
                                                        <input type="text" placeholder="Ex: Clerk, Officer" style={styles.input} value={designation} onChange={e => setDesignation(e.target.value)} required />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

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
                        )}
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
    },
    verifyBtn: {
        marginTop: '0.5rem',
        padding: '0.5rem',
        fontSize: '0.85rem',
        backgroundColor: '#eff6ff',
        color: '#2563eb',
        border: '1px solid #bfdbfe',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 600,
        flex: 1,
        textAlign: 'center',
    },
    verifyOptions: {
        display: 'flex',
        gap: '0.5rem',
        marginTop: '0.5rem',
        flexDirection: 'column',
    },
    roleGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
    },
    roleCard: {
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'all 0.2s',
        alignItems: 'flex-start',
    },
    roleIcon: {
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
        fontSize: '1.2rem',
        background: '#e0f2fe',
    },
    roleTitle: {
        fontSize: '1rem',
        fontWeight: 700,
        color: '#1e293b',
        marginBottom: '0.1rem',
    },
    roleDesc: {
        fontSize: '0.75rem',
        color: '#64748b',
    },
    backLink: {
        background: 'none',
        border: 'none',
        color: '#64748b',
        fontSize: '0.9rem',
        cursor: 'pointer',
        marginBottom: '1rem',
        padding: 0,
        textAlign: 'left',
    }
};
