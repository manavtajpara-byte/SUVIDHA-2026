'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCcw, Smartphone, QrCode, CheckCircle2 } from 'lucide-react';

export function KioskCamera({ onCapture }: { onCapture: (img: string) => void }) {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function startCamera() {
            try {
                const s = await navigator.mediaDevices.getUserMedia({ video: true });
                setStream(s);
                if (videoRef.current) videoRef.current.srcObject = s;
            } catch (e) {
                setError("Camera not found. Using fallback mock.");
            }
        }
        startCamera();
        return () => stream?.getTracks().forEach(t => t.stop());
    }, []);

    const capture = () => {
        onCapture("mock-captured-image-data");
    };

    return (
        <div style={styles.cameraContainer}>
            {error ? (
                <div style={styles.cameraFallback}>
                    <Camera size={60} opacity={0.3} />
                    <p>{error}</p>
                    <button onClick={capture} style={styles.captureBtn}>Simulate Capture</button>
                </div>
            ) : (
                <div style={styles.videoWrapper}>
                    <video ref={videoRef} autoPlay playsInline style={styles.video} />
                    <div style={styles.overlay}>Hold document in front of camera</div>
                    <button onClick={capture} style={styles.captureBtn}>Take Photo</button>
                </div>
            )}
        </div>
    );
}

export function QRHandshake({ onComplete }: { onComplete: () => void }) {
    return (
        <div style={styles.qrContainer}>
            <div style={styles.qrInfo}>
                <Smartphone size={40} color="var(--primary)" />
                <p>Scan with your phone to upload documents</p>
            </div>
            <div style={styles.qrPlaceholder}>
                <QrCode size={180} />
            </div>
            <p style={styles.qrSub}>This will open a secure link on your mobile device</p>
            <button onClick={onComplete} style={styles.mockCompleteBtn}>Simulate Upload from Phone</button>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    cameraContainer: {
        width: '100%',
        backgroundColor: '#000',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        position: 'relative',
        aspectRatio: '4/3',
    },
    cameraFallback: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        gap: '1rem',
    },
    videoWrapper: {
        height: '100%',
        position: 'relative',
    },
    video: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    overlay: {
        position: 'absolute',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '2rem',
    },
    captureBtn: {
        position: 'absolute',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '1rem 2rem',
        borderRadius: '2rem',
        border: 'none',
        backgroundColor: 'var(--primary)',
        color: 'white',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    qrContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        padding: '2rem',
        backgroundColor: '#f1f5f9',
        borderRadius: '1.5rem',
        textAlign: 'center',
    },
    qrInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        fontSize: '1.1rem',
        fontWeight: 'bold',
    },
    qrPlaceholder: {
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '1rem',
        boxShadow: 'var(--card-shadow)',
    },
    qrSub: {
        fontSize: '0.9rem',
        opacity: 0.7,
    },
    mockCompleteBtn: {
        padding: '0.75rem 1.5rem',
        borderRadius: '0.75rem',
        border: '2px dashed var(--primary)',
        background: 'none',
        color: 'var(--primary)',
        fontWeight: 'bold',
        cursor: 'pointer',
    }
};
