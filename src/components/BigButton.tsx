'use client';

import React, { useState } from 'react';

interface BigButtonProps {
    label: string;
    icon: React.ReactNode;
    color: string;
    onClick: () => void;
}

export default function BigButton({ label, icon, color, onClick }: BigButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                ...styles.button,
                background: isHovered
                    ? `rgba(255, 255, 255, 0.95)`
                    : 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderColor: isHovered ? color : 'rgba(255,255,255,0.8)',
                transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: isHovered
                    ? `0 20px 40px -5px ${color}40, 0 10px 20px -5px ${color}20`
                    : '0 10px 15px -3px rgba(0,0,0,0.1)',
            }}
            className="animate-float"
        >
            <div style={{
                ...styles.iconWrapper,
                color: isHovered ? '#fff' : color,
                background: isHovered ? `linear-gradient(135deg, ${color}, ${color}dd)` : `${color}15`,
                padding: '1.5rem',
                borderRadius: '50%',
                transform: isHovered ? 'rotate(5deg) scale(1.1)' : 'rotate(0deg) scale(1)',
                boxShadow: isHovered ? `0 10px 20px -5px ${color}60` : 'none',
            }}>
                {icon}
            </div>
            <span style={{
                ...styles.label,
                background: isHovered
                    ? `linear-gradient(135deg, ${color}, ${color})`
                    : 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
            }}>{label}</span>
            {isHovered && (
                <div style={{
                    ...styles.shine,
                    background: `linear-gradient(90deg, transparent, ${color}20, transparent)`,
                }} />
            )}
        </button>
    );
}

const styles: Record<string, React.CSSProperties> = {
    button: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        padding: '3rem 2rem',
        border: '4px solid',
        borderRadius: '2rem',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        minHeight: '280px',
        width: '100%',
        overflow: 'hidden',
    },
    iconWrapper: {
        fontSize: '4rem',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
    },
    label: {
        fontSize: '1.8rem',
        fontWeight: 900,
        textAlign: 'center',
        lineHeight: 1.2,
        background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    },
    shine: {
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        animation: 'shimmer 1.5s infinite',
        pointerEvents: 'none',
    }
};
