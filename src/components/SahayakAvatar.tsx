'use client';

import React, { useEffect, useState } from 'react';

export default function SahayakAvatar({ isSpeaking = false }: { isSpeaking?: boolean }) {
    const [blink, setBlink] = useState(false);

    useEffect(() => {
        // Random blinking logic
        const interval = setInterval(() => {
            setBlink(true);
            setTimeout(() => setBlink(false), 200);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ ...styles.container, filter: isSpeaking ? 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.4))' : 'none' }}>
            <div style={styles.head}>
                <div style={styles.hair}></div>
                <div style={styles.face}>
                    <div style={styles.eyesContainer}>
                        <div style={{ ...styles.eye, height: blink ? '2px' : '15px' }}>
                            <div style={styles.pupil}></div>
                        </div>
                        <div style={{ ...styles.eye, height: blink ? '2px' : '15px' }}>
                            <div style={styles.pupil}></div>
                        </div>
                    </div>
                    {/* Mouth Animation based on speaking prop */}
                    <div style={{
                        ...styles.mouth,
                        animation: isSpeaking ? 'speak 0.4s infinite alternate' : 'none',
                        height: isSpeaking ? '20px' : '10px'
                    }}></div>
                </div>
                {isSpeaking && <div style={styles.spectralAura}></div>}
            </div>
            <div style={styles.shoulders}></div>

            <style jsx>{`
                @keyframes speak {
                    0% { height: 5px; width: 30px; border-radius: 10px; }
                    100% { height: 25px; width: 35px; border-radius: 50%; }
                }
                @keyframes auraPulse {
                    0% { transform: scale(1); opacity: 0.3; }
                    50% { transform: scale(1.5); opacity: 0.1; }
                    100% { transform: scale(1); opacity: 0.3; }
                }
            `}</style>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        position: 'fixed',
        bottom: '120px',
        right: '25px',
        width: '100px',
        height: '120px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 4000,
        pointerEvents: 'none',
    },
    head: {
        width: '70px',
        height: '80px',
        backgroundColor: '#f5d0b0', // Skin tone
        borderRadius: '30px',
        position: 'relative',
        zIndex: 2,
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hair: {
        position: 'absolute',
        top: '-10px',
        width: '80px',
        height: '40px',
        backgroundColor: '#1a1a1a',
        borderRadius: '40px 40px 0 0',
        zIndex: 3,
    },
    face: {
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
    },
    eyesContainer: {
        display: 'flex',
        gap: '20px',
    },
    eye: {
        width: '15px',
        backgroundColor: 'white',
        borderRadius: '50%',
        overflow: 'hidden',
        position: 'relative',
        transition: 'height 0.1s',
    },
    pupil: {
        width: '8px',
        height: '8px',
        backgroundColor: 'black',
        borderRadius: '50%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    mouth: {
        width: '30px',
        height: '10px',
        backgroundColor: '#d64848',
        borderRadius: '10px',
        transition: 'all 0.2s',
    },
    shoulders: {
        width: '90px',
        height: '40px',
        backgroundColor: '#1e3a8a', // Official Blue Shirt
        borderRadius: '40px 40px 0 0',
        marginTop: '-10px',
        zIndex: 1,
    },
    spectralAura: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '30px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
        animation: 'auraPulse 2s infinite ease-in-out',
        zIndex: -1
    }
};
