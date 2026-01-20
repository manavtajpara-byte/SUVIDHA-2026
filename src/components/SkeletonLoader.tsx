'use client';

import React from 'react';

interface SkeletonLoaderProps {
    type?: 'card' | 'form' | 'list' | 'text';
    count?: number;
}

export default function SkeletonLoader({ type = 'card', count = 1 }: SkeletonLoaderProps) {
    const renderSkeleton = () => {
        switch (type) {
            case 'card':
                return <CardSkeleton />;
            case 'form':
                return <FormSkeleton />;
            case 'list':
                return <ListSkeleton />;
            case 'text':
                return <TextSkeleton />;
            default:
                return <CardSkeleton />;
        }
    };

    return (
        <div style={styles.container}>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index}>{renderSkeleton()}</div>
            ))}
        </div>
    );
}

function CardSkeleton() {
    return (
        <div style={styles.card} className="skeleton-shimmer">
            <div style={styles.cardIcon}></div>
            <div style={styles.cardContent}>
                <div style={{ ...styles.line, width: '70%', height: '24px' }}></div>
                <div style={{ ...styles.line, width: '50%', height: '16px', marginTop: '0.5rem' }}></div>
            </div>
        </div>
    );
}

function FormSkeleton() {
    return (
        <div style={styles.form}>
            <div style={{ ...styles.line, width: '40%', height: '20px', marginBottom: '0.5rem' }}></div>
            <div style={{ ...styles.line, width: '100%', height: '48px', marginBottom: '1.5rem' }}></div>
            <div style={{ ...styles.line, width: '40%', height: '20px', marginBottom: '0.5rem' }}></div>
            <div style={{ ...styles.line, width: '100%', height: '48px', marginBottom: '1.5rem' }}></div>
            <div style={{ ...styles.line, width: '30%', height: '44px', marginTop: '2rem' }}></div>
        </div>
    );
}

function ListSkeleton() {
    return (
        <div style={styles.list}>
            {[1, 2, 3, 4].map((i) => (
                <div key={i} style={styles.listItem}>
                    <div style={{ ...styles.line, width: '80%', height: '18px' }}></div>
                    <div style={{ ...styles.line, width: '60%', height: '14px', marginTop: '0.5rem' }}></div>
                </div>
            ))}
        </div>
    );
}

function TextSkeleton() {
    return (
        <div style={styles.text}>
            <div style={{ ...styles.line, width: '100%', height: '16px' }}></div>
            <div style={{ ...styles.line, width: '95%', height: '16px', marginTop: '0.5rem' }}></div>
            <div style={{ ...styles.line, width: '85%', height: '16px', marginTop: '0.5rem' }}></div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    },
    card: {
        display: 'flex',
        gap: '1.5rem',
        padding: '2rem',
        background: '#f8fafc',
        borderRadius: '1.5rem',
        border: '1px solid #f1f5f9',
    },
    cardIcon: {
        width: '80px',
        height: '80px',
        borderRadius: '16px',
        background: '#e2e8f0',
        flexShrink: 0,
    },
    cardContent: {
        flex: 1,
    },
    form: {
        padding: '2rem',
        background: 'white',
        borderRadius: '1.5rem',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    listItem: {
        padding: '1.5rem',
        background: '#f8fafc',
        borderRadius: '12px',
    },
    text: {
        padding: '1rem 0',
    },
    line: {
        background: '#e2e8f0',
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden',
    }
};
