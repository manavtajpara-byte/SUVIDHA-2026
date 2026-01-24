'use client';

import React, { useEffect, useState } from 'react';
import { useAppState } from '@/context/StateContext';
import useVoiceNavigation from '@/hooks/useVoiceNavigation';
import { Mic, X, Volume2 } from 'lucide-react';

interface VoiceAssistantProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function VoiceAssistant({ isOpen, onClose }: VoiceAssistantProps) {
    const { language } = useAppState();
    const {
        isListening,
        isSpeaking,
        transcript,
        feedback,
        startListening,
        stopListening,
        speak
    } = useVoiceNavigation();

    // EQ Bar Animation Mock
    const [eqBars, setEqBars] = useState([40, 60, 30, 80, 50]);
    useEffect(() => {
        if (isListening) {
            const int = setInterval(() => {
                setEqBars(prev => prev.map(() => Math.floor(Math.random() * 80) + 20));
            }, 100);
            return () => clearInterval(int);
        }
    }, [isListening]);

    // Auto-start listening when opened
    useEffect(() => {
        if (isOpen) {
            startListening();
            speak("How can I help you?", "en-US");
        } else {
            stopListening();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.container}>
                <button onClick={onClose} style={styles.closeBtn}>
                    <X size={24} />
                </button>

                <div style={styles.visualizer}>
                    {isListening && (
                        <div style={styles.eqContainer}>
                            {eqBars.map((h, i) => (
                                <div key={i} style={{ ...styles.eqBar, height: `${h}%` }}></div>
                            ))}
                        </div>
                    )}
                    <div style={{
                        ...styles.micCircle,
                        transform: isListening ? 'scale(1.2)' : 'scale(1)',
                        boxShadow: isListening ? '0 0 40px rgba(239, 68, 68, 0.4)' : 'none',
                        backgroundColor: isListening ? '#ef4444' : (isSpeaking ? '#3b82f6' : '#94a3b8')
                    }}>
                        {isSpeaking ? <Volume2 size={40} color="white" /> : <Mic size={40} color="white" />}
                    </div>
                </div>

                <div style={styles.content}>
                    <h2 style={styles.statusText}>
                        {isListening ? "Listening..." : (isSpeaking ? "Speaking..." : "Ready")}
                    </h2>

                    {transcript && (
                        <p style={styles.transcript}>
                            "{transcript}"
                        </p>
                    )}

                    {feedback && (
                        <p style={styles.feedback}>
                            <span style={styles.aiLabel}>AI:</span> {feedback}
                        </p>
                    )}
                </div>

                <div style={styles.controls}>
                    <button
                        onClick={isListening ? stopListening : startListening}
                        style={styles.actionBtn}
                    >
                        {isListening ? "Stop" : "Tap to Speak"}
                    </button>
                </div>
            </div>
            <style jsx>{`
                @keyframes ripple {
                    0% { transform: scale(1); opacity: 0.6; }
                    100% { transform: scale(3); opacity: 0; }
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
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.2s ease-out',
    },
    container: {
        width: '90%',
        maxWidth: '400px',
        backgroundColor: 'white',
        borderRadius: '24px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
    },
    closeBtn: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        background: '#f1f5f9',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: '#64748b',
    },
    visualizer: {
        position: 'relative',
        marginBottom: '2rem',
        marginTop: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    eqContainer: { position: 'absolute', display: 'flex', gap: '4px', alignItems: 'center', height: '100px', zIndex: 1 },
    eqBar: { width: '4px', background: '#ef4444', borderRadius: '4px', transition: 'height 0.1s ease-in-out' },
    micCircle: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        zIndex: 2,
    },
    ripple: {
        position: 'absolute',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: 'rgba(239, 68, 68, 0.4)',
        animation: 'ripple 1.5s infinite ease-out',
        zIndex: 1,
    },
    content: {
        textAlign: 'center',
        marginBottom: '2rem',
        width: '100%',
        minHeight: '100px',
    },
    statusText: {
        fontSize: '1.5rem',
        fontWeight: 700,
        marginBottom: '1rem',
        color: '#1e293b',
    },
    transcript: {
        fontSize: '1.1rem',
        color: '#475569',
        marginBottom: '0.5rem',
        fontStyle: 'italic',
    },
    feedback: {
        fontSize: '1rem',
        color: '#059669',
        fontWeight: 600,
        backgroundColor: '#ecfdf5',
        padding: '0.5rem 1rem',
        borderRadius: '12px',
        display: 'inline-block',
    },
    aiLabel: {
        color: '#059669',
        fontWeight: 800,
        marginRight: '0.5rem',
    },
    controls: {
        width: '100%',
    },
    actionBtn: {
        width: '100%',
        padding: '1rem',
        backgroundColor: '#0f172a',
        color: 'white',
        border: 'none',
        borderRadius: '16px',
        fontSize: '1.1rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'opacity 0.2s',
    }
};
