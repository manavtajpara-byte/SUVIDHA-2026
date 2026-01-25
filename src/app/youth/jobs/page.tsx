'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { ArrowLeft, Briefcase, MapPin, CheckCircle2, LayoutDashboard, Rocket, Star, History } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AethelLayout from '@/components/AethelLayout';

export default function JobsPage() {
    const { addToast } = useAppState();
    const router = useRouter();
    const [search, setSearch] = React.useState('');
    const [type, setType] = React.useState('all');

    const sidebarLinks = [
        { label: 'Youth Portal', icon: <LayoutDashboard size={20} />, href: '/' },
        { label: 'Jobs & Careers', icon: <Briefcase size={20} />, href: '/youth/jobs', active: true },
        { label: 'Skill Training', icon: <Rocket size={20} />, href: '/youth/skills' },
        { label: 'Applications', icon: <History size={20} />, href: '/transactions' },
    ];

    const jobs = [
        { name: 'Data Entry Operator', company: 'District Court', type: 'full-time', typeLabel: 'Full Time', salary: '₹ 15k - 20k', desc: 'Requires typing speed of 40 WPM and basic computer knowledge.' },
        { name: 'Delivery Partner', company: 'E-Kart Logistics', type: 'flexible', typeLabel: 'Flexible', salary: '₹ 25k++', desc: 'Valid Driving License required. Bike provided by company.' },
        { name: 'Field Technician', company: 'Solar Solutions', type: 'contract', typeLabel: 'Contract', salary: '₹ 18k', desc: 'Installation and maintenance of solar panels in village area.' },
    ];

    const filteredJobs = jobs.filter(j => {
        const matchesSearch = j.name.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase());
        const matchesType = type === 'all' || j.type === type;
        return matchesSearch && matchesType;
    });

    const handleApply = (job: string) => {
        addToast({ message: `Application sent for ${job}!`, type: 'success' });
    };

    return (
        <AethelLayout
            title="Jobs & Employment"
            themeColor="#7c3aed"
            themeSoft="#f5f3ff"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <button onClick={() => router.back()} style={styles.backBtn}>
                        <ArrowLeft size={32} />
                    </button>
                    <h2 style={styles.title}>Future Navigator 🚀</h2>
                </div>

                <div style={styles.card}>
                    <div style={styles.intro}>
                        <div style={styles.introIcon}><Briefcase size={40} color="white" /></div>
                        <p style={styles.desc}>Sovereign AI matching for verified local job opportunities.</p>
                    </div>

                    <div style={styles.searchBar}>
                        <input
                            type="text"
                            placeholder="Search keywords, companies..."
                            style={styles.input}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <select style={styles.select} onChange={(e) => setType(e.target.value)}>
                            <option value="all">All Engagements</option>
                            <option value="full-time">Full-Time (Direct)</option>
                            <option value="flexible">Gig/Flexible</option>
                            <option value="contract">Public Contract</option>
                        </select>
                    </div>

                    <div style={styles.grid}>
                        {filteredJobs.map((job) => (
                            <div key={job.name} style={styles.jobCard}>
                                <div style={styles.jobHeader}>
                                    <h3 style={styles.jobTitle}>{job.name}</h3>
                                    <span style={styles.salary}>{job.salary}</span>
                                </div>
                                <div style={styles.meta}>
                                    <span style={styles.tag}><MapPin size={14} /> {job.company}</span>
                                    <span style={styles.tag}>{job.typeLabel}</span>
                                </div>
                                <p style={{ marginBottom: '1rem', color: '#64748b', fontSize: '0.9rem' }}>{job.desc}</p>
                                <button onClick={() => handleApply(job.name)} style={styles.applyBtn}>Quick Connect & Share KYC</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AethelLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' },
    header: { display: 'flex', alignItems: 'center', gap: '1rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' },
    title: { fontSize: '2rem', fontWeight: 900, margin: 0 },
    card: { backgroundColor: 'white', padding: '2rem', borderRadius: '2rem', boxShadow: 'var(--card-shadow)', minHeight: '400px' },
    intro: { textAlign: 'center', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
    introIcon: { width: '80px', height: '80px', background: '#7c3aed', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(124, 58, 237, 0.2)' },
    desc: { color: '#64748b', fontSize: '1rem', maxWidth: '500px' },
    grid: { display: 'grid', gap: '1rem' },
    jobCard: { border: '1px solid #f1f5f9', borderRadius: '20px', padding: '1.5rem', background: 'white' },
    jobHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' },
    jobTitle: { margin: 0, fontWeight: 800, fontSize: '1.1rem', color: '#1e293b' },
    salary: { fontWeight: 'bold', color: '#059669', background: '#ecfdf5', padding: '0.3rem 0.75rem', borderRadius: '8px', fontSize: '0.8rem' },
    meta: { display: 'flex', gap: '1rem', marginBottom: '1rem' },
    tag: { fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 },
    applyBtn: { width: '100%', padding: '0.9rem', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s' },
    searchBar: { display: 'flex', gap: '0.75rem', marginBottom: '2rem' },
    input: { flex: 1, padding: '0.9rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: 600 },
    select: { padding: '0.9rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', fontWeight: 600 }
};
