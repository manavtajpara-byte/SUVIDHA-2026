'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Camera, RefreshCw, CheckCircle, AlertTriangle, UserCheck } from 'lucide-react';
import Webcam from 'react-webcam';

// Aadhaar Face RD Simulation
// In a real implementation, this would connect to the UIDAI RD Service App

interface FaceLivenessDetectorProps {
    onVerify: (success: boolean) => void;
}

export default function FaceLivenessDetector({ onVerify }: FaceLivenessDetectorProps) {
    const webcamRef = useRef<Webcam>(null);
    const [status, setStatus] = useState<'idle' | 'scanning' | 'blink_detected' | 'verified' | 'failed'>('idle');
    const [progress, setProgress] = useState(0);
    const [instruction, setInstruction] = useState("Position your face in the oval");

    const startScan = () => {
        setStatus('scanning');
        setInstruction("Look straight at the camera");
        setProgress(0);

        // Simulation Step 1: Detect Face
        setTimeout(() => {
            setProgress(30);
            setInstruction("Blink your eyes now");

            // Simulation Step 2: Detect Blink (Liveness)
            setTimeout(() => {
                setStatus('blink_detected');
                setProgress(70);
                setInstruction("Verifying with Aadhaar UIDAI...");

                // Simulation Step 3: Match with Server
                setTimeout(() => {
                    const success = Math.random() > 0.1; // 90% success rate
                    if (success) {
                        setStatus('verified');
                        setProgress(100);
                        onVerify(true);
                    } else {
                        setStatus('failed');
                        setInstruction("Face match failed. Try again.");
                        onVerify(false);
                    }
                }, 1500);

            }, 2000);
        }, 1500);
    };

    return (
        <div style={styles.container}>
            <div style={styles.camWrapper}>
                {status === 'idle' || status === 'failed' ? (
                    <div style={styles.placeholder}>
                        <UserCheck size={64} color="#94a3b8" />
                        <p>Aadhaar Face Authenticator</p>
                        <button onClick={startScan} style={styles.startBtn}>
                            <Camera size={20} /> Start Face Scan
                        </button>
                    </div>
                ) : (
                    <>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            style={styles.webcam}
                            mirrored
                        />
                        <div style={styles.overlay}>
                            <div style={styles.ovalFrame} className={status === 'blink_detected' ? 'pulse-green' : ''}></div>
                        </div>
                    </>
                )}
            </div>

            <div style={styles.statusPanel}>
                <div style={styles.progressBar}>
                    <div style={{ ...styles.progressFill, width: `${progress}%`, backgroundColor: status === 'failed' ? '#ef4444' : '#10b981' }}></div>
                </div>

                <div style={styles.instructionFlex}>
                    {status === 'scanning' && <RefreshCw className="spin" size={20} color="#3b82f6" />}
                    {status === 'verified' && <CheckCircle size={24} color="#10b981" />}
                    {status === 'failed' && <AlertTriangle size={24} color="#ef4444" />}

                    <span style={styles.instructionText}>
                        {status === 'verified' ? "Identity Verified Successfully" : instruction}
                    </span>
                </div>
            </div>

            <style jsx>{`
                .spin { animation: spin 2s linear infinite; }
                @keyframes spin { 100% { transform: rotate(360deg); } }
                .pulse-green { animation: pulse 1s infinite; border-color: #10b981 !important; box-shadow: 0 0 20px #10b981; }
                @keyframes pulse { 0% { transform: translate(-50%, -50%) scale(1); } 50% { transform: translate(-50%, -50%) scale(1.05); } 100% { transform: translate(-50%, -50%) scale(1); } }
            `}</style>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
        padding: '1rem',
        background: '#f8fafc',
        borderRadius: '1rem',
        border: '1px solid #e2e8f0',
    },
    camWrapper: {
        width: '100%',
        maxWidth: '320px',
        height: '240px',
        background: '#0f172a',
        borderRadius: '1rem',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholder: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        color: '#94a3b8',
    },
    webcam: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
    },
    ovalFrame: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '160px',
        height: '200px',
        border: '3px dashed rgba(255,255,255,0.7)',
        borderRadius: '50%',
        boxShadow: '0 0 0 9999px rgba(0,0,0,0.7)',
    },
    startBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        background: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '2rem',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    statusPanel: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
    },
    progressBar: {
        width: '100%',
        height: '6px',
        background: '#e2e8f0',
        borderRadius: '3px',
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        transition: 'width 0.5s ease',
    },
    instructionFlex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        minHeight: '24px',
    },
    instructionText: {
        fontSize: '0.95rem',
        fontWeight: 600,
        color: '#334155',
        textAlign: 'center',
    }
};
