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
        <div
            onClick={onClick}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
            role="button"
            tabIndex={0}
            style={{
                ...styles.button,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
            }}
            className="big-btn glass-effect"
        >
            <div style={{ ...styles.iconWrapper, background: `linear-gradient(135deg, ${color} 0%, ${color}aa 100%)` }} className="icon-bounce">
                {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { color: 'white' }) : icon}
            </div>
            <div style={styles.content}>
                <span style={styles.label}>{label}</span>
                {description && <span style={styles.description}>{description}</span>}
            </div>

            {/* Decorative shine effect */}
            <div style={styles.shine} />

            <style jsx>{`
                .big-btn {
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .big-btn:hover {
                    transform: translateY(-8px) scale(1.02);
                    background: rgba(255, 255, 255, 0.15) !important;
                    border: 1px solid rgba(255, 255, 255, 0.3) !important;
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2) !important;
                }
                .big-btn:hover .icon-bounce {
                    transform: scale(1.1) rotate(5deg);
                }
                .icon-bounce {
                    transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
            `}</style>
        </div>
    );
}

// Helper to darken/lighten color
function adjustColor(color: string, amount: number) {
    return color; // Placeholder, for production use a real color library or CSS variable logic
}

const styles: Record<string, React.CSSProperties> = {
    button: {
        width: '100%',
        minHeight: '220px',
        border: 'none',
        borderRadius: '30px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '15px',
        color: 'white',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
    },
    iconWrapper: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: '20px',
        borderRadius: '50%',
        backdropFilter: 'blur(5px)',
        boxShadow: 'inset 0 0 20px rgba(255,255,255,0.3)',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        zIndex: 2,
    },
    label: {
        fontSize: '1.5rem',
        fontWeight: 800,
        textShadow: '0 2px 4px rgba(0,0,0,0.2)',
        textAlign: 'center',
    },
    description: {
        fontSize: '0.9rem',
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
