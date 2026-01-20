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
                borderBottom: `4px solid ${color}`, // Add color accent line like gov cards
            }}
            className="big-btn"
        >
            <div style={{ ...styles.iconWrapper }} className="icon-wrapper">
                {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { color: color }) : icon}
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
        minHeight: '200px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        backgroundColor: 'white',
        padding: '24px',
        position: 'relative',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    iconWrapper: {
        padding: '16px',
        backgroundColor: '#f5f9ff',
        borderRadius: '50%',
        color: 'var(--primary)',
        marginBottom: '4px',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        zIndex: 2,
    },
    label: {
        fontSize: '1.25rem',
        fontWeight: 700,
        color: 'var(--primary)',
        textAlign: 'center',
    },
    description: {
        fontSize: '0.9rem',
        color: '#666',
        fontWeight: 400,
        textAlign: 'center',
    },
    shine: {
        display: 'none',
    }
};
