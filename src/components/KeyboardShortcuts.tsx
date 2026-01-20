'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Search, Home, Keyboard } from 'lucide-react';

export default function KeyboardShortcuts() {
    const [showHelp, setShowHelp] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Show shortcuts help with '?'
            if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                setShowHelp(true);
                return;
            }

            // Close modals with Escape
            if (e.key === 'Escape') {
                setShowHelp(false);
                // Trigger close on any open modals
                const closeButtons = document.querySelectorAll('[aria-label="Close"]');
                if (closeButtons.length > 0) {
                    (closeButtons[0] as HTMLElement).click();
                }
                return;
            }

            // Focus search with '/'
            if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                const searchInput = document.querySelector('input[type="text"][placeholder*="Search"]') as HTMLInputElement;
                if (searchInput) {
                    searchInput.focus();
                }
                return;
            }

            // Go to home with 'h'
            if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
                const activeElement = document.activeElement;
                if (activeElement?.tagName !== 'INPUT' && activeElement?.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                    router.push('/');
                }
                return;
            }

            // Command palette with Ctrl+K or Cmd+K
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                // Focus search as command palette
                const searchInput = document.querySelector('input[type="text"][placeholder*="Search"]') as HTMLInputElement;
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                }
                return;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [router]);

    if (!showHelp) {
        return (
            <button
                onClick={() => setShowHelp(true)}
                style={styles.helpButton}
                title="Keyboard Shortcuts (?)"
            >
                <Keyboard size={20} />
            </button>
        );
    }

    return (
        <div style={styles.overlay} onClick={() => setShowHelp(false)}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setShowHelp(false)} style={styles.closeBtn}>
                    <X size={24} />
                </button>

                <h2 style={styles.title}>Keyboard Shortcuts</h2>
                <p style={styles.subtitle}>Navigate faster with these shortcuts</p>

                <div style={styles.shortcuts}>
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>Navigation</h3>
                        <div style={styles.shortcut}>
                            <kbd style={styles.key}>H</kbd>
                            <span style={styles.description}>Go to Home</span>
                        </div>
                        <div style={styles.shortcut}>
                            <kbd style={styles.key}>/</kbd>
                            <span style={styles.description}>Focus Search</span>
                        </div>
                        <div style={styles.shortcut}>
                            <div style={styles.keyCombo}>
                                <kbd style={styles.key}>Ctrl</kbd>
                                <span>+</span>
                                <kbd style={styles.key}>K</kbd>
                            </div>
                            <span style={styles.description}>Command Palette</span>
                        </div>
                    </div>

                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>General</h3>
                        <div style={styles.shortcut}>
                            <kbd style={styles.key}>Esc</kbd>
                            <span style={styles.description}>Close Modal</span>
                        </div>
                        <div style={styles.shortcut}>
                            <kbd style={styles.key}>?</kbd>
                            <span style={styles.description}>Show This Help</span>
                        </div>
                    </div>
                </div>

                <div style={styles.footer}>
                    <p>Press <kbd style={styles.key}>?</kbd> anytime to see this help</p>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    helpButton: {
        position: 'fixed',
        bottom: '6rem',
        right: '2rem',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: '#f1f5f9',
        border: '2px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        zIndex: 998,
        color: '#64748b',
        transition: 'all 0.2s',
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10002,
        backdropFilter: 'blur(4px)',
    },
    modal: {
        background: 'white',
        borderRadius: '2rem',
        padding: '2.5rem',
        maxWidth: '550px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto',
        position: 'relative',
        boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
    },
    closeBtn: {
        position: 'absolute',
        top: '1.5rem',
        right: '1.5rem',
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
    title: {
        fontSize: '2rem',
        fontWeight: 900,
        margin: '0 0 0.5rem 0',
        color: '#1e293b',
    },
    subtitle: {
        fontSize: '1rem',
        color: '#64748b',
        margin: '0 0 2rem 0',
    },
    shortcuts: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    sectionTitle: {
        fontSize: '0.9rem',
        fontWeight: 700,
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        margin: '0 0 0.5rem 0',
    },
    shortcut: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1rem',
        background: '#f8fafc',
        borderRadius: '12px',
    },
    key: {
        display: 'inline-block',
        padding: '0.4rem 0.75rem',
        background: 'white',
        border: '2px solid #e2e8f0',
        borderRadius: '6px',
        fontSize: '0.9rem',
        fontWeight: 700,
        fontFamily: 'monospace',
        color: '#1e293b',
        boxShadow: '0 2px 0 #cbd5e1',
    },
    keyCombo: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    description: {
        fontSize: '1rem',
        fontWeight: 600,
        color: '#475569',
    },
    footer: {
        marginTop: '2rem',
        paddingTop: '1.5rem',
        borderTop: '2px solid #f1f5f9',
        textAlign: 'center',
        fontSize: '0.9rem',
        color: '#94a3b8',
    }
};
