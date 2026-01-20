'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer style={styles.footer}>
            <div style={styles.content}>
                <div style={styles.section}>
                    <h3 style={styles.heading}>SUVIDHA KIOSK</h3>
                    <p style={styles.text}>
                        A Digital India Initiative. Providing seamless government services to every citizen,
                        bridging the gap between the administration and the people.
                    </p>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.heading}>Quick Links</h3>
                    <div style={styles.links}>
                        <Link href="/" style={styles.link}>Home</Link>
                        <Link href="/admin/login" style={styles.link}>Official Login</Link>
                        <Link href="/about" style={styles.link}>About Us</Link>
                        <Link href="/terms" style={styles.link}>Terms & Conditions</Link>
                    </div>
                </div>

                <div style={styles.section}>
                    <h3 style={styles.heading}>Contact</h3>
                    <p style={styles.text}>Helpline: 1800-111-222</p>
                    <p style={styles.text}>Email: help@suvidha.gov.in</p>
                    <p style={styles.text}>Ministry of Electronics & IT</p>
                </div>
            </div>

            <div style={styles.bottomBar}>
                <p style={styles.copy}>
                    © 2026 SUVIDHA Portal. All Rights Reserved. | Government of India
                </p>
                <div style={styles.badges}>
                    <span style={styles.badge}>Digital India</span>
                    <span style={styles.badge}>MyGov</span>
                    <span style={styles.badge}>NIC</span>
                </div>
            </div>
        </footer>
    );
}

const styles: Record<string, React.CSSProperties> = {
    footer: {
        backgroundColor: '#1e293b',
        color: '#f8fafc',
        padding: '3rem 1rem 1rem',
        marginTop: 'auto',
    },
    content: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    heading: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#fcb900', // Saffron highlight
        marginBottom: '0.5rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    text: {
        fontSize: '0.95rem',
        lineHeight: '1.6',
        opacity: 0.8,
    },
    links: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    link: {
        color: '#f8fafc',
        textDecoration: 'none',
        fontSize: '0.95rem',
        opacity: 0.8,
        transition: 'opacity 0.2s',
    },
    bottomBar: {
        maxWidth: '1200px',
        margin: '0 auto',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: '1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
    },
    copy: {
        fontSize: '0.85rem',
        opacity: 0.6,
    },
    badges: {
        display: 'flex',
        gap: '1rem',
    },
    badge: {
        fontSize: '0.8rem',
        fontWeight: 'bold',
        padding: '0.2rem 0.5rem',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '4px',
        color: '#cbd5e1',
    }
};
