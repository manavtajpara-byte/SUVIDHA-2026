'use client';

import React from 'react';
import { ArrowLeft, Brain } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AIVision from '@/components/AIVision';

export default function AIVisionPage() {
    const router = useRouter();

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <div>
                    <h1 style={styles.title}>AI Hyper-Vision Scanner</h1>
                    <p style={styles.subtitle}>Evolved Gemini-3 Multimodal Analysis</p>
                </div>
            </div>

            <div style={styles.content}>
                <div style={styles.infoBox}>
                    <Brain size={32} color="#6366f1" />
                    <p>Place documents, crops, or hardware components in front of the kiosk camera for high-speed neural analysis.</p>
                </div>

                <AIVision />
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' },
    header: { display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#1e293b' },
    title: { fontSize: '2.5rem', fontWeight: 900, margin: 0 },
    subtitle: { color: '#64748b' },
    content: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    infoBox: { background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1.5rem' }
};
