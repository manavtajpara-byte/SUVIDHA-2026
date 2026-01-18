'use client';

import React from 'react';

interface BigButtonProps {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    color?: string;
    description?: string; // Added description for better UX
}

export default function BigButton({ label, icon, onClick, color = 'var(--primary)', description }: BigButtonProps) {
    return (
        <button
            onClick={onClick}
            style={{
                ...styles.button,
                background: `linear-gradient(135deg, ${color} 0%, ${adjustColor(color, -20)} 100%)`,
                boxShadow: `0 10px 20px -5px ${color}80`,
            }}
            className="big-btn"
        >
            <div style={styles.iconWrapper} className="icon-bounce">
                {icon}
            </div>
            <div style={styles.content}>
                <span style={styles.label}>{label}</span>
                {description && <span style={styles.description}>{description}</span>}
            </div>

            {/* Decorative shine effect */}
            <div style={styles.shine} />

            <style jsx>{`
                .big-btn {
                    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s;
                }
                .big-btn:hover {
                    transform: translateY(-8px) scale(1.02);
                    filter: brightness(1.1);
                }
                .big-btn:hover .icon-bounce {
                    transform: scale(1.1) rotate(5deg);
                }
                .icon-bounce {
                    transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
            `}</style>
        </button>
    );
}

// Helper to darken/lighten color
function adjustColor(color: string, amount: number) {
    return color; // Placeholder, for production use a real color library or CSS variable logic
}

const styles: Record<string, React.CSSProperties> = {
    button: {
        width: '100%',
        minHeight: '280px',
        border: 'none',
        borderRadius: '30px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        color: 'white',
        padding: '30px',
        position: 'relative',
        overflow: 'hidden',
    },
    iconWrapper: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: '25px',
        borderRadius: '50%',
        backdropFilter: 'blur(5px)',
        boxShadow: 'inset 0 0 20px rgba(255,255,255,0.3)',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
        zIndex: 2,
    },
    label: {
        fontSize: '1.8rem',
        fontWeight: 800,
        textShadow: '0 2px 4px rgba(0,0,0,0.2)',
        textAlign: 'center',
    },
    description: {
        fontSize: '1rem',
        opacity: 0.9,
        fontWeight: 500,
        textAlign: 'center',
    },
    shine: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(45deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 60%)',
        zIndex: 1,
        pointerEvents: 'none',
    }
};
