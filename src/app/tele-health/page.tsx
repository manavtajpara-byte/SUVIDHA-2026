'use client';

import React, { useState } from 'react';
import { Video, Mic, PhoneOff, FileText } from 'lucide-react';

export default function TeleHealthPage() {
    const [inCall, setInCall] = useState(false);

    return (
        <div style={styles.container}>
            <div style={styles.grid}>
                {/* Video Area */}
                <div style={styles.videoCard}>
                    {inCall ? (
                        <div style={styles.activeVideo}>
                            <div style={styles.remoteVideo}>
                                <div style={styles.doctorBadge}>Dr. Anjali Sharma (MBBS)</div>
                                <div style={styles.placeholderFace}>👩‍⚕️</div>
                            </div>
                            <div style={styles.localVideo}>
                                <div style={styles.selfBadge}>You</div>
                            </div>
                            <div style={styles.controls}>
                                <button style={styles.controlBtn}><Mic size={20} /></button>
                                <button style={styles.controlBtn}><Video size={20} /></button>
                                <button
                                    onClick={() => setInCall(false)}
                                    style={{ ...styles.controlBtn, backgroundColor: '#ef4444', color: 'white' }}
                                >
                                    <PhoneOff size={20} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div style={styles.waitingRoom}>
                            <h2>eSanjeevani OPD</h2>
                            <p>Consult expert doctors from top goverment hospitals.</p>
                            <button
                                onClick={() => setInCall(true)}
                                style={styles.connectBtn}
                            >
                                <Video size={24} /> Start Video Consultation
                            </button>
                            <p style={styles.waitText}>Estimated Wait Time: 2 mins</p>
                        </div>
                    )}
                </div>

                {/* Prescription Area */}
                <div style={styles.sidebar}>
                    <div style={styles.card}>
                        <h3><FileText size={20} /> Your Prescriptions</h3>
                        <div style={styles.prescriptionList}>
                            <div style={styles.prescriptionItem}>
                                <div style={styles.date}>Today</div>
                                <div style={styles.meds}>Paracetamol 500mg, Cetirizine</div>
                                <div style={styles.doc}>Dr. Anjali Sharma</div>
                            </div>
                            <div style={styles.prescriptionItem}>
                                <div style={styles.date}>12 Jan 2026</div>
                                <div style={styles.meds}>Multivitamins</div>
                                <div style={styles.doc}>Dr. R.K. Gupta</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        height: 'calc(100vh - 100px)',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem',
        height: '100%',
    },
    videoCard: {
        backgroundColor: '#1e293b',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
    },
    waitingRoom: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        gap: '1.5rem',
    },
    connectBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem 3rem',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        backgroundColor: '#22c55e',
        color: 'white',
        border: 'none',
        borderRadius: '50px',
        cursor: 'pointer',
        boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)',
    },
    activeVideo: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#0f172a',
    },
    remoteVideo: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderFace: {
        fontSize: '10rem',
    },
    doctorBadge: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        backgroundColor: 'rgba(0,0,0,0.6)',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        backdropFilter: 'blur(4px)',
    },
    localVideo: {
        position: 'absolute',
        bottom: '100px',
        right: '20px',
        width: '200px',
        height: '150px',
        backgroundColor: '#334155',
        borderRadius: '10px',
        border: '2px solid rgba(255,255,255,0.2)',
    },
    selfBadge: {
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        color: 'white',
        fontSize: '0.8rem',
    },
    controls: {
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '1rem',
    },
    controlBtn: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(10px)',
        border: 'none',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
    },
    card: {
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '15px',
        height: '100%',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    prescriptionList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginTop: '1.5rem',
    },
    prescriptionItem: {
        padding: '1rem',
        backgroundColor: '#f8fafc',
        borderRadius: '10px',
        borderLeft: '4px solid #3b82f6',
    },
    date: {
        fontSize: '0.8rem',
        color: '#64748b',
    },
    meds: {
        fontWeight: 'bold',
        color: '#1e293b',
        margin: '0.5rem 0',
    },
    doc: {
        fontSize: '0.9rem',
        color: '#334155',
    }
};
