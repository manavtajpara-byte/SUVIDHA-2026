'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Camera, Scan, FileText, CheckCircle, Info, RefreshCw } from 'lucide-react';

export default function AIVision() {
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState<null | any>(null);
    const [progress, setProgress] = useState(0);

    const handleScan = () => {
        setIsScanning(true);
        setResult(null);
        let p = 0;
        const interval = setInterval(() => {
            p += 5;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setIsScanning(false);
                setResult({
                    type: 'Document Analysis',
                    title: 'Aadhaar Card (E-Copy)',
                    status: 'Verified (L6 Trust)',
                    confidence: '99.8%',
                    details: 'Name: Citizen One | UID: XXXX-XXXX-2245. Document is authentic and correctly formatted.'
                });
            }
        }, 150);
    };

    return (
        <div style={styles.container}>
            <div style={styles.viewfinder}>
                <div style={styles.cameraMock}>
                    {isScanning && <div style={styles.scanLine}></div>}
                    <Camera size={64} color="rgba(255,255,255,0.3)" />
                </div>
                {!isScanning && !result && (
                    <button onClick={handleScan} style={styles.scanBtn}>
                        <Scan size={20} /> Initialize Hyper-Vision
                    </button>
                )}
            </div>

            {isScanning && (
                <div style={styles.analyzing}>
                    <RefreshCw className="spin" size={24} color="#6366f1" />
                    <p>AI Gemini-3 Neural Analysis: {progress}%</p>
                    <style jsx>{`
                        .spin { animation: spin 1s linear infinite; }
                        @keyframes spin { 100% { transform: rotate(360deg); } }
                    `}</style>
                </div>
            )}

            {result && (
                <div style={styles.resultCard}>
                    <div style={styles.resultHeader}>
                        <FileText size={24} color="#6366f1" />
                        <h3>{result.title}</h3>
                        <span style={styles.confidenceBadge}>{result.confidence} Match</span>
                    </div>
                    <p style={styles.resultBody}>{result.details}</p>
                    <div style={styles.statusRow}>
                        <CheckCircle size={16} color="#16a34a" /> {result.status}
                    </div>
                    <button onClick={() => setResult(null)} style={styles.resetBtn}>Scan New Item</button>
                </div>
            )}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { width: '100%', maxWidth: '500px', margin: '1rem auto' },
    viewfinder: {
        height: '300px',
        background: '#1e293b',
        borderRadius: '24px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '4px solid #334155'
    },
    cameraMock: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
    scanLine: {
        position: 'absolute',
        width: '100%',
        height: '2px',
        background: '#6366f1',
        boxShadow: '0 0 15px #6366f1',
        animation: 'scan 2s infinite linear'
    },
    scanBtn: {
        position: 'absolute',
        bottom: '2rem',
        background: '#6366f1',
        color: 'white',
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '50px',
        fontWeight: 'bold',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    analyzing: { textAlign: 'center', marginTop: '1.5rem', color: '#6366f1', fontWeight: 'bold' },
    resultCard: {
        marginTop: '1.5rem',
        background: '#f8fafc',
        padding: '1.5rem',
        borderRadius: '20px',
        border: '1px solid #e2e8f0',
        animation: 'fadeIn 0.3s ease-out'
    },
    resultHeader: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' },
    confidenceBadge: { marginLeft: 'auto', background: '#e0e7ff', color: '#6366f1', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' },
    resultBody: { fontSize: '0.95rem', color: '#475569', lineHeight: '1.5', marginBottom: '1rem' },
    statusRow: { display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a', fontWeight: 'bold', fontSize: '0.85rem' },
    resetBtn: { marginTop: '1.5rem', width: '100%', padding: '0.75rem', background: 'none', border: '1px solid #cbd5e1', borderRadius: '10px', color: '#64748b', cursor: 'pointer' }
};
