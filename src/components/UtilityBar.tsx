'use client';

import React, { useState, useEffect } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { Cloud, Clock, Newspaper } from 'lucide-react';

export default function UtilityBar() {
    const { language } = useAppState();
    const t = (translations[language] || translations.en) as any;
    const [time, setTime] = useState(new Date());
    const [weather, setWeather] = useState({ temp: '24°C', condition: 'Sunny' });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Mock weather update
    useEffect(() => {
        const conditions = ['Sunny', 'Cloudy', 'Partly Cloudy', 'Clear Sky'];
        const interval = setInterval(() => {
            const randomTemp = Math.floor(Math.random() * (32 - 18) + 18);
            const randomCond = conditions[Math.floor(Math.random() * conditions.length)];
            setWeather({ temp: `${randomTemp}°C`, condition: randomCond });
        }, 600000); // Every 10 mins
        return () => clearInterval(interval);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString(language === 'en' ? 'en-US' : language, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString(language === 'en' ? 'en-US' : language, {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        });
    };

    return (
        <div style={styles.bar}>
            <div style={styles.container}>
                <div style={styles.item}>
                    <Clock size={16} />
                    <span style={styles.text}>
                        {mounted ? `${formatDate(time)} | ${formatTime(time)}` : 'Loading...'}
                    </span>
                </div>

                <div style={styles.item}>
                    <Cloud size={16} />
                    <span style={styles.text}>{t.weather}: {weather.temp} ({weather.condition})</span>
                </div>

                <div style={styles.newsSection}>
                    <Newspaper size={16} style={{ color: 'var(--primary)' }} />
                    <div style={styles.marquee}>
                        <p style={styles.newsText}>
                            {t.news}: • New E-Shram portal updates for 2026 • Emergency helpline 112 is now active in all sectors • PM-Kisan 19th installment tracker updated • Weather alert: Mild showers expected in coastal regions
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    bar: {
        background: '#1e293b',
        color: 'white',
        padding: '0.5rem 0',
        fontSize: '0.85rem',
        fontWeight: 600,
        zIndex: 1001,
        borderBottom: '1px solid rgba(255,255,255,0.1)',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        whiteSpace: 'nowrap',
    },
    text: {
        opacity: 0.9,
    },
    newsSection: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        background: 'rgba(255,255,255,0.05)',
        padding: '0.25rem 1rem',
        borderRadius: '50px',
        overflow: 'hidden',
    },
    marquee: {
        flex: 1,
        overflow: 'hidden',
        position: 'relative',
    },
    newsText: {
        margin: 0,
        whiteSpace: 'nowrap',
        display: 'inline-block',
        animation: 'marquee 30s linear infinite',
    }
};
