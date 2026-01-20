'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';

export default function Breadcrumbs() {
    const pathname = usePathname();
    const { language } = useAppState();
    const t = translations[language] || translations.en;

    // Generate breadcrumb items from pathname
    const pathSegments = pathname.split('/').filter(segment => segment);

    // Map route segments to readable names
    const getSegmentName = (segment: string): string => {
        const segmentMap: Record<string, string> = {
            'electricity': t.electricity,
            'gas': t.gas,
            'municipal': t.municipal,
            'ration-card': t.rationCard,
            'property-tax': t.propertyTax,
            'transport': t.transport,
            'healthcare': t.healthcare,
            'emergency': t.emergency,
            'education': t.education,
            'employment': t.employment,
            'track': t.track,
            'login': t.login,
        };

        return segmentMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    };

    // Don't show breadcrumbs on homepage
    if (pathname === '/') return null;

    return (
        <nav style={styles.container} aria-label="Breadcrumb">
            <ol style={styles.list}>
                {/* Home link */}
                <li style={styles.item}>
                    <Link href="/" style={styles.link}>
                        <Home size={16} />
                        <span>{t.home}</span>
                    </Link>
                </li>

                {/* Dynamic path segments */}
                {pathSegments.map((segment, index) => {
                    const href = '/' + pathSegments.slice(0, index + 1).join('/');
                    const isLast = index === pathSegments.length - 1;

                    return (
                        <React.Fragment key={href}>
                            <li style={styles.separator}>
                                <ChevronRight size={16} />
                            </li>
                            <li style={styles.item}>
                                {isLast ? (
                                    <span style={styles.current}>{getSegmentName(segment)}</span>
                                ) : (
                                    <Link href={href} style={styles.link}>
                                        {getSegmentName(segment)}
                                    </Link>
                                )}
                            </li>
                        </React.Fragment>
                    );
                })}
            </ol>
        </nav>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        padding: '1rem 0',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    list: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    item: {
        display: 'flex',
        alignItems: 'center',
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.4rem 0.75rem',
        borderRadius: '8px',
        textDecoration: 'none',
        color: '#64748b',
        fontSize: '0.9rem',
        fontWeight: 600,
        transition: 'all 0.2s',
        background: 'transparent',
    },
    current: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.4rem 0.75rem',
        borderRadius: '8px',
        color: 'var(--primary)',
        fontSize: '0.9rem',
        fontWeight: 700,
        background: 'rgba(139, 92, 246, 0.1)',
    },
    separator: {
        display: 'flex',
        alignItems: 'center',
        color: '#cbd5e1',
    }
};
