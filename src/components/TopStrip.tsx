'use client';

import React from 'react';

export default function TopStrip() {
    return (
        <div style={styles.strip}>
            <div style={styles.container}>
                <div style={styles.left}>
                    <span style={styles.govText}>GOVERNMENT OF INDIA</span>
                    <span style={styles.divider}>|</span>
                    <span style={styles.govText}>MINISTRY OF CITIZEN SERVICES</span>
                </div>
                <div style={styles.right}>
                    <button style={styles.linkButton}>Skip to Main Content</button>
                    <span style={styles.divider}>|</span>
                    <button style={styles.linkButton}>Screen Reader Access</button>
                    <span style={styles.divider}>|</span>
                    <div style={styles.fontControls}>
                        <button style={styles.fontBtn}>A-</button>
                        <button style={styles.fontBtn}>A</button>
                        <button style={styles.fontBtn}>A+</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    strip: {
        backgroundColor: '#2d2d2d',
        color: '#ffffff',
        fontSize: '0.8rem',
        padding: '0.5rem 0',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    left: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    right: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    govText: {
        fontWeight: 600,
        letterSpacing: '0.05em',
    },
    divider: {
        color: '#666',
    },
    linkButton: {
        background: 'none',
        border: 'none',
        color: '#ccc',
        cursor: 'pointer',
        fontSize: 'inherit',
        textDecoration: 'none',
    },
    fontControls: {
        display: 'flex',
        alignItems: 'center',
        background: '#444',
        borderRadius: '4px',
    },
    fontBtn: {
        background: 'none',
        border: 'none',
        color: 'white',
        padding: '2px 8px',
        cursor: 'pointer',
        borderRight: '1px solid #555',
    }
};
