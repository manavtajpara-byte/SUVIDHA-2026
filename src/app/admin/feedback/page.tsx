'use client';

import React, { useState } from 'react';
import { Search, Filter, MessageSquare, ThumbsUp, ThumbsDown, Minus, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const mockFeedback = [
    { id: 1, user: "Amit Sharma", service: "Electricity Bill", date: "2026-01-20", message: "Seamless payment experience! Receipt generation was instant.", sentiment: "positive", status: "resolved" },
    { id: 2, user: "Priya Singh", service: "Gas Booking", date: "2026-01-20", message: "The server was slow during booking. Please improve speed.", sentiment: "negative", status: "pending" },
    { id: 3, user: "Rahul Vermeer", service: "Birth Certificate", date: "2026-01-19", message: "Process is good but the form is too long.", sentiment: "neutral", status: "reviewed" },
    { id: 4, user: "Sneha Gupta", service: "Property Tax", date: "2026-01-19", message: "Why is there no UPI option directly on the home page?", sentiment: "negative", status: "pending" },
    { id: 5, user: "Vikram Malhotra", service: "General", date: "2026-01-18", message: "Great initiative by the government. Very helpful kiosk.", sentiment: "positive", status: "resolved" },
];

export default function FeedbackPage() {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const getSentimentIcon = (sentiment: string) => {
        switch (sentiment) {
            case 'positive': return <ThumbsUp size={16} color="#10b981" />;
            case 'negative': return <ThumbsDown size={16} color="#ef4444" />;
            default: return <Minus size={16} color="#f59e0b" />;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'resolved':
                return <span style={{ ...styles.badge, background: '#dcfce7', color: '#15803d' }}><CheckCircle size={12} /> Resolved</span>;
            case 'pending':
                return <span style={{ ...styles.badge, background: '#fee2e2', color: '#b91c1c' }}><AlertCircle size={12} /> Pending</span>;
            default:
                return <span style={{ ...styles.badge, background: '#fef3c7', color: '#b45309' }}><Clock size={12} /> Reviewed</span>;
        }
    };

    const filteredFeedback = mockFeedback.filter(item => {
        const matchesFilter = filter === 'all' || item.sentiment === filter || item.status === filter;
        const matchesSearch = item.message.toLowerCase().includes(searchTerm.toLowerCase()) || item.user.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div>
                    <h1 style={styles.title}>Citizen Feedback</h1>
                    <p style={styles.subtitle}>Monitor public sentiment and resolve grievances.</p>
                </div>
                <div style={styles.actions}>
                    <div style={styles.searchBox}>
                        <Search size={18} color="#64748b" />
                        <input
                            type="text"
                            placeholder="Search feedback..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                </div>
            </header>

            {/* AI Insight Card */}
            <div style={styles.aiCard}>
                <div style={styles.aiHeader}>
                    <div style={styles.aiIconBox}><MessageSquare size={24} color="white" /></div>
                    <div>
                        <h3 style={styles.aiTitle}>AI Sentiment Analysis</h3>
                        <p style={styles.aiSubtitle}>Based on last 30 days of data</p>
                    </div>
                </div>
                <div style={styles.sentimentGrid}>
                    <div style={styles.sentimentItem}>
                        <span style={styles.sentimentLabel}>Positive</span>
                        <div style={styles.barContainer}><div style={{ ...styles.bar, width: '65%', background: '#10b981' }}></div></div>
                        <span style={styles.sentimentValue}>65%</span>
                    </div>
                    <div style={styles.sentimentItem}>
                        <span style={styles.sentimentLabel}>Neutral</span>
                        <div style={styles.barContainer}><div style={{ ...styles.bar, width: '25%', background: '#f59e0b' }}></div></div>
                        <span style={styles.sentimentValue}>25%</span>
                    </div>
                    <div style={styles.sentimentItem}>
                        <span style={styles.sentimentLabel}>Negative</span>
                        <div style={styles.barContainer}><div style={{ ...styles.bar, width: '10%', background: '#ef4444' }}></div></div>
                        <span style={styles.sentimentValue}>10%</span>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div style={styles.tabs}>
                {['all', 'positive', 'negative', 'pending', 'resolved'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        style={{
                            ...styles.tab,
                            background: filter === tab ? '#1e293b' : 'white',
                            color: filter === tab ? 'white' : '#64748b',
                            borderColor: filter === tab ? '#1e293b' : '#e2e8f0'
                        }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Feedback List */}
            <div style={styles.list}>
                {filteredFeedback.map(item => (
                    <div key={item.id} style={styles.card}>
                        <div style={styles.cardHeader}>
                            <div style={styles.userInfo}>
                                <div style={styles.avatar}>{item.user.charAt(0)}</div>
                                <div>
                                    <h4 style={styles.userName}>{item.user}</h4>
                                    <span style={styles.serviceTag}>{item.service}</span>
                                </div>
                            </div>
                            <div style={styles.meta}>
                                <span style={styles.date}>{item.date}</span>
                                {getStatusBadge(item.status)}
                            </div>
                        </div>
                        <p style={styles.message}>"{item.message}"</p>
                        <hr style={styles.divider} />
                        <div style={styles.cardFooter}>
                            <div style={styles.sentimentBadge}>
                                {getSentimentIcon(item.sentiment)}
                                <span style={{ textTransform: 'capitalize' }}>{item.sentiment} Sentiment</span>
                            </div>
                            <button style={styles.actionBtn}>Resolve</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
    },
    title: {
        fontSize: '1.8rem',
        fontWeight: 800,
        color: '#1e293b',
        margin: 0,
    },
    subtitle: {
        color: '#64748b',
        marginTop: '0.25rem',
    },
    actions: {
        display: 'flex',
        gap: '1rem',
    },
    searchBox: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    searchInput: {
        padding: '0.75rem 1rem 0.75rem 2.5rem',
        borderRadius: '1rem',
        border: '1px solid #e2e8f0',
        width: '240px',
        outline: 'none',
    },
    aiCard: {
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '1.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        alignItems: 'center',
        boxShadow: '0 10px 30px rgba(30, 41, 59, 0.2)',
    },
    aiHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
    },
    aiIconBox: {
        width: '60px',
        height: '60px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    aiTitle: {
        fontSize: '1.5rem',
        fontWeight: 700,
        margin: 0,
    },
    aiSubtitle: {
        opacity: 0.7,
        margin: 0,
    },
    sentimentGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        width: '100%',
    },
    sentimentItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        fontSize: '0.9rem',
        fontWeight: 600,
    },
    sentimentLabel: {
        width: '70px',
    },
    barContainer: {
        flex: 1,
        background: 'rgba(255,255,255,0.1)',
        height: '8px',
        borderRadius: '4px',
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        borderRadius: '4px',
    },
    sentimentValue: {
        width: '40px',
        textAlign: 'right',
    },
    tabs: {
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.5rem',
    },
    tab: {
        padding: '0.5rem 1.25rem',
        borderRadius: '2rem',
        border: '1px solid',
        fontSize: '0.9rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    list: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
    },
    card: {
        background: 'white',
        borderRadius: '1.5rem',
        padding: '1.5rem',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem',
    },
    userInfo: {
        display: 'flex',
        gap: '1rem',
    },
    avatar: {
        width: '42px',
        height: '42px',
        background: '#f1f5f9',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        color: '#64748b',
    },
    userName: {
        margin: 0,
        fontSize: '1rem',
        fontWeight: 700,
        color: '#1e293b',
    },
    serviceTag: {
        fontSize: '0.8rem',
        color: '#64748b',
    },
    meta: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.5rem',
    },
    date: {
        fontSize: '0.75rem',
        color: '#94a3b8',
    },
    badge: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        padding: '0.25rem 0.5rem',
        borderRadius: '6px',
        fontSize: '0.75rem',
        fontWeight: 700,
        textTransform: 'uppercase',
    },
    message: {
        margin: '0 0 1.5rem 0',
        color: '#334155',
        lineHeight: 1.5,
    },
    divider: {
        border: 'none',
        borderTop: '1px solid #f1f5f9',
        margin: 'auto 0 1rem 0',
    },
    cardFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sentimentBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.85rem',
        color: '#475569',
        fontWeight: 600,
    },
    actionBtn: {
        background: 'transparent',
        border: 'none',
        color: 'var(--primary)',
        fontWeight: 700,
        cursor: 'pointer',
    }
};
