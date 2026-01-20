'use client';

import React from 'react';
import { Mic, MicOff, X } from 'lucide-react';
import useVoiceNavigation from '@/hooks/useVoiceNavigation';

export default function VoiceAssistant() {
    const { isListening, startListening, transcript, feedback } = useVoiceNavigation();

    return (
        <>
            {/* Floating Mic Trigger */}
            <button
                onClick={startListening}
                style={styles.micButton}
                aria-label="Activate Voice Commands"
                className="mic-pulse"
                title="Speak Commands"
            >
                <Mic color="white" size={28} />
            </button>

            {/* Overlay when Active */}
            {isListening && (
                <div style={styles.overlay}>
                    <div style={styles.dialog}>
                        <div style={styles.waveContainer}>
                            <div className="voice-wave"></div>
                            <div className="voice-wave delay-1"></div>
                            <div className="voice-wave delay-2"></div>
                            <Mic size={50} color="#8b5cf6" style={{ zIndex: 2, position: 'relative' }} />
                        </div>
                        <h2 style={styles.text}>{feedback}</h2>
                        {transcript && <p style={styles.subtext}>detected: {transcript}</p>}
                    </div>
                </div>
            )}

            <style jsx global>{`
                .mic-pulse {
                    animation: pulse-mic 2s infinite;
                }
                @keyframes pulse-mic {
                    0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7); }
                    70% { box-shadow: 0 0 0 15px rgba(139, 92, 246, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
                }
                .voice-wave {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 2px solid #8b5cf6;
                    opacity: 0;
                    animation: wave 1.5s infinite;
                }
                .delay-1 { animation-delay: 0.5s; }
                .delay-2 { animation-delay: 1s; }
                @keyframes wave {
                    0% { transform: scale(1); opacity: 0.8; }
                    100% { transform: scale(2); opacity: 0; }
                }
            `}</style>
        </>
    );
}

const styles: Record<string, React.CSSProperties> = {
    micButton: {
        position: 'fixed',
        bottom: '100px', // Above chatbot
        right: '20px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#8b5cf6',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        zIndex: 9999,
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(5px)',
    },
    dialog: {
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        minWidth: '300px',
    },
    waveContainer: {
        position: 'relative',
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#1e293b',
        margin: 0,
    },
    subtext: {
        fontSize: '1rem',
        color: '#64748b',
        margin: 0,
    }
};
