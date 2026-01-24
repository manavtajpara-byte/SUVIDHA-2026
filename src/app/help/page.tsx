'use client';

import React from 'react';
import AethelLayout from '@/components/AethelLayout';
import { HelpCircle, Search, MessageSquare, Phone, FileText, ChevronRight, Sparkles } from 'lucide-react';

export default function HelpPage() {
    const sidebarLinks = [
        { label: 'Knowledge Base', icon: <HelpCircle size={20} />, href: '/help', active: true },
        { label: 'Contact Us', icon: <MessageSquare size={20} />, href: '/help/contact' },
    ];

    const faqs = [
        { q: 'How do I update my Aadhaar?', a: 'You can update your Aadhaar details via the Profile section using DigiLocker verification.' },
        { q: 'Where can I find my ration card?', a: 'Download your e-Ration card from the Ration Card sector hub.' },
        { q: 'How to pay electricity bills?', a: 'Navigate to Utilities > Electricity and use the Quick Pay feature.' },
    ];

    return (
        <AethelLayout
            title="Support Center"
            themeColor="#64748b"
            themeSoft="#f1f5f9"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.container}>
                <div style={styles.hero}>
                    <h1 style={styles.title}>How can we help?</h1>
                    <div style={styles.searchContainer}>
                        <Search size={24} color="#94a3b8" />
                        <input type="text" placeholder="Search for answers..." style={styles.searchInput} />
                    </div>
                </div>

                <div style={styles.grid}>
                    <div style={styles.card}>
                        <h2 style={styles.sectionTitle}>Frequently Asked / अक्सर पूछे जाने वाले</h2>
                        <div style={styles.faqList}>
                            {faqs.map((faq, i) => (
                                <div key={i} style={styles.faqItem}>
                                    <h4 style={styles.faqQ}>{faq.q}</h4>
                                    <p style={styles.faqA}>{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={styles.sidePanel}>
                        <div style={styles.contactCard}>
                            <h3 style={styles.cardTitle}>Emergency Contact</h3>
                            <div style={styles.contactItem}><Phone size={18} /> 1906 (Gas Leak)</div>
                            <div style={styles.contactItem}><Phone size={18} /> 101 (Fire)</div>
                            <div style={styles.contactItem}><Phone size={18} /> 100 (Police)</div>
                        </div>

                        <div style={styles.guideCard}>
                            <Sparkles size={32} color="white" />
                            <h3 style={{ margin: 0, color: 'white' }}>Smart Assist</h3>
                            <p style={{ margin: 0, color: 'white', opacity: 0.8, fontSize: '0.85rem' }}>Talk to Suvidha AI for voice-guided support.</p>
                            <button style={styles.guideBtn}>Open Assistant</button>
                        </div>
                    </div>
                </div>
            </div>
        </AethelLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { display: 'flex', flexDirection: 'column', gap: '3rem' },
    hero: { textAlign: 'center', background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', padding: '4rem 2rem', borderRadius: '32px', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' },
    title: { fontSize: '2.5rem', fontWeight: 800, margin: 0 },
    searchContainer: { background: 'white', padding: '1rem 1.5rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', maxWidth: '600px', border: 'none' },
    searchInput: { border: 'none', background: 'none', outline: 'none', fontSize: '1.1rem', width: '100%', color: '#1e293b' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem' },
    card: { background: 'white', padding: '2.5rem', borderRadius: '32px', border: '1px solid #f1f5f9' },
    sectionTitle: { fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', marginBottom: '2rem' },
    faqList: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    faqItem: { borderBottom: '1px solid #f1f5f9', paddingBottom: '1.5rem' },
    faqQ: { fontSize: '1rem', fontWeight: 700, color: '#1e293b', margin: 0 },
    faqA: { fontSize: '0.9rem', color: '#64748b', marginTop: '0.5rem', lineHeight: 1.6 },
    sidePanel: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    contactCard: { background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '1rem' },
    cardTitle: { fontSize: '1rem', fontWeight: 800, color: '#1e293b', margin: 0 },
    contactItem: { display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#e11d48', fontWeight: 700, fontSize: '0.9rem' },
    guideCard: { background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'white' },
    guideBtn: { background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '0.8rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }
};
