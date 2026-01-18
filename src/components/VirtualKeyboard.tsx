'use client';

import React, { useState } from 'react';
import { X, Delete, ArrowUp } from 'lucide-react';

interface VirtualKeyboardProps {
    onInput: (char: string) => void;
    onDelete: () => void;
    onClose: () => void;
}

export default function VirtualKeyboard({ onInput, onDelete, onClose }: VirtualKeyboardProps) {
    const [shift, setShift] = useState(false);

    const keys = [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
        ['SPACE']
    ];

    return (
        <div style={styles.container}>
            <button onClick={onClose} style={styles.closeBtn}><X size={32} /></button>
            <div style={styles.board}>
                {keys.map((row, i) => (
                    <div key={i} style={styles.row}>
                        {i === 3 && (
                            <button
                                onClick={() => setShift(!shift)}
                                style={{ ...styles.key, ...styles.specialKey, backgroundColor: shift ? 'var(--primary)' : 'white', color: shift ? 'white' : 'black' }}
                            >
                                <ArrowUp size={24} />
                            </button>
                        )}
                        {row.map(k => (
                            <button
                                key={k}
                                onClick={() => onInput(k === 'SPACE' ? ' ' : (shift ? k.toUpperCase() : k))}
                                style={{ ...styles.key, flex: k === 'SPACE' ? 4 : 1 }}
                            >
                                {k === 'SPACE' ? 'Space' : (shift ? k.toUpperCase() : k)}
                            </button>
                        ))}
                        {i === 3 && (
                            <button onClick={onDelete} style={{ ...styles.key, ...styles.specialKey }}>
                                <Delete size={24} />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#cbd5e1',
        padding: '1rem',
        boxShadow: '0 -10px 30px rgba(0,0,0,0.3)',
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    closeBtn: {
        alignSelf: 'flex-end',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#475569',
    },
    board: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        maxWidth: '1000px',
        margin: '0 auto',
        width: '100%',
    },
    row: {
        display: 'flex',
        gap: '0.5rem',
        justifyContent: 'center',
    },
    key: {
        height: '70px',
        padding: '0 1rem',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        borderRadius: '10px',
        border: 'none',
        backgroundColor: 'white',
        cursor: 'pointer',
        boxShadow: '0 2px 0 #94a3b8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    specialKey: {
        backgroundColor: '#94a3b8',
        color: 'white',
    }
};
