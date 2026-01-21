'use client';

import React from 'react';
import { Locate, Droplets, ThermometerSun, Leaf } from 'lucide-react';

export default function AgriTechPage() {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <Leaf size={48} color="#16a34a" />
                <div>
                    <h1 style={styles.title}>Kisan Agri-Tech Connect</h1>
                    <p style={styles.subtitle}>Smart Technology for Modern Farming</p>
                </div>
            </div>

            <div style={styles.grid}>
                {/* Soil Health Card */}
                <div style={styles.card}>
                    <h2><ThermometerSun /> Soil Health Card</h2>
                    <div style={styles.soilStats}>
                        <div style={styles.statBox}>
                            <span style={styles.label}>Nitrogen (N)</span>
                            <div style={styles.phBar}><div style={{ width: '60%', background: '#f59e0b', height: '100%' }}></div></div>
                            <span style={styles.val}>Medium</span>
                        </div>
                        <div style={styles.statBox}>
                            <span style={styles.label}>Phosphorus (P)</span>
                            <div style={styles.phBar}><div style={{ width: '30%', background: '#ef4444', height: '100%' }}></div></div>
                            <span style={styles.val}>Low</span>
                        </div>
                        <div style={styles.statBox}>
                            <span style={styles.label}>Potassium (K)</span>
                            <div style={styles.phBar}><div style={{ width: '80%', background: '#22c55e', height: '100%' }}></div></div>
                            <span style={styles.val}>High</span>
                        </div>
                    </div>
                    <div style={styles.recBox}>
                        <h4>Recommendation:</h4>
                        <p>Add 50kg/acre DAP fertilizer specifically for Wheat crop cycle.</p>
                    </div>
                </div>

                {/* Drone Service */}
                <div style={styles.card}>
                    <h2><Locate /> Drone Services</h2>
                    <p>Book a Kisan Drone for aerial spraying or crop survey.</p>

                    <div style={styles.droneOptions}>
                        <div style={styles.droneOption}>
                            <h3>Nano-Urea Spraying</h3>
                            <p>₹400 / acre</p>
                            <button style={styles.bookBtn}>Book Now</button>
                        </div>
                        <div style={styles.droneOption}>
                            <h3>Crop Health Survey</h3>
                            <p>₹250 / acre</p>
                            <button style={styles.bookBtn}>Book Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        marginBottom: '2rem',
    },
    title: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#1e293b',
        margin: 0,
    },
    subtitle: { color: '#64748b' },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem',
    },
    card: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '20px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
    },
    soilStats: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        margin: '2rem 0',
    },
    statBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    label: { width: '100px', fontWeight: 600 },
    phBar: {
        flex: 1,
        height: '10px',
        backgroundColor: '#f1f5f9',
        borderRadius: '10px',
        overflow: 'hidden',
    },
    val: { width: '60px', textAlign: 'right', fontSize: '0.9rem', color: '#64748b' },
    recBox: {
        backgroundColor: '#ecfccb',
        padding: '1rem',
        borderRadius: '10px',
        border: '1px solid #84cc16',
        color: '#365314',
    },
    droneOptions: {
        display: 'grid',
        gap: '1rem',
        marginTop: '1.5rem',
    },
    droneOption: {
        border: '1px solid #e2e8f0',
        padding: '1.5rem',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bookBtn: {
        padding: '0.5rem 1.5rem',
        backgroundColor: '#16a34a',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    }
};
