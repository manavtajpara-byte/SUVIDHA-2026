'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Construction } from 'lucide-react';

export default function PlaceholderPage() {
    const router = useRouter();
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '2rem', padding: '2rem', textAlign: 'center' }}>
            <button onClick={() => router.back()} style={{ position: 'absolute', top: '2rem', left: '2rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                <ArrowLeft size={32} />
            </button>
            <Construction size={100} color="var(--primary)" />
            <h1>Under Construction</h1>
            <p>This service is coming soon.</p>
        </div>
    );
}
