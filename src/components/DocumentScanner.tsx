'use client';

import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, Check, X, ShieldCheck } from 'lucide-react';

interface DocumentScannerProps {
    onCapture: (imageSrc: string) => void;
    onClose: () => void;
}

export default function DocumentScanner({ onCapture, onClose }: DocumentScannerProps) {
    const webcamRef = useRef<Webcam>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const image = webcamRef.current.getScreenshot();
            setImgSrc(image);
        }
    }, [webcamRef]);

    const retake = () => {
        setImgSrc(null);
    };

    const confirm = () => {
        if (imgSrc) {
            setProcessing(true);
            // Simulate AI enhancement
            setTimeout(() => {
                onCapture(imgSrc);
                setProcessing(false);
            }, 1500);
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Scan Document</h2>
                    <button onClick={onClose} style={styles.closeBtn}><X size={24} /></button>
                </div>

                <div style={styles.cameraBox}>
                    {processing ? (
                        <div style={styles.processing}>
                            <ShieldCheck size={48} color="var(--primary)" className="pulse" />
                            <p>Enhancing Image & Verifying...</p>
                        </div>
                    ) : imgSrc ? (
                        <img src={imgSrc} alt="Scanned" style={styles.preview} />
                    ) : (
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width="100%"
                            videoConstraints={{ facingMode: "environment" }}
                            style={styles.webcam}
                        />
                    )}
                </div>

                <div style={styles.controls}>
                    {imgSrc ? (
                        <>
                            <button onClick={retake} style={styles.secondaryBtn} disabled={processing}>
                                <RefreshCw size={20} /> Retake
                            </button>
                            <button onClick={confirm} style={styles.primaryBtn} disabled={processing}>
                                <Check size={20} /> {processing ? 'Processing...' : 'Save Document'}
                            </button>
                        </>
                    ) : (
                        <button onClick={capture} style={styles.captureBtn}>
                            <Camera size={32} />
                        </button>
                    )}
                </div>
            </div>
            <style jsx>{`
                .pulse { animation: pulse 1.5s infinite; }
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.7; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
    },
    container: {
        background: 'white',
        width: '100%',
        maxWidth: '500px',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },
    header: {
        padding: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #e2e8f0',
    },
    title: {
        margin: 0,
        fontSize: '1.25rem',
        fontWeight: 700,
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#64748b',
    },
    cameraBox: {
        background: 'black',
        height: '400px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    webcam: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    preview: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
    processing: {
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
    },
    controls: {
        padding: '1.5rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        background: '#f8fafc',
    },
    captureBtn: {
        width: '72px',
        height: '72px',
        borderRadius: '50%',
        background: 'var(--primary)',
        color: 'white',
        border: '4px solid rgba(255,255,255,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.1s',
    },
    primaryBtn: {
        flex: 1,
        background: 'var(--primary)',
        color: 'white',
        border: 'none',
        padding: '1rem',
        borderRadius: '0.75rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
    },
    secondaryBtn: {
        flex: 1,
        background: 'white',
        color: '#1e293b',
        border: '1px solid #cbd5e1',
        padding: '1rem',
        borderRadius: '0.75rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
    },
};
