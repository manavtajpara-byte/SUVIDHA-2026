'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { ArrowLeft, Briefcase, MapPin, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function JobsPage() {
    const { addToast } = useAppState();
    const router = useRouter();
    const [search, setSearch] = React.useState('');
    const [type, setType] = React.useState('all');

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
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h2 style={styles.title}>Job Finder 🚀</h2>
            </div>

            <div style={styles.card}>
                <div style={styles.intro}>
                    <Briefcase size={64} color="#7c3aed" />
                    <p style={styles.desc}>Verified local jobs matching your skill set.</p>
                </div>

                <div style={styles.searchBar}>
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        style={styles.input}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select style={styles.select} onChange={(e) => setType(e.target.value)}>
                        <option value="all">All Types</option>
                        <option value="full-time">Full Time</option>
                        <option value="flexible">Flexible</option>
                        <option value="contract">Contract</option>
                    </select>
                </div>

                <div style={styles.grid}>
                    {filteredJobs.map((job) => (
                        <div key={job.name} style={styles.jobCard}>
                            <div style={styles.jobHeader}>
                                <h3>{job.name}</h3>
                                <span style={styles.salary}>{job.salary}</span>
                            </div>
                            <div style={styles.meta}>
                                <span style={styles.tag}><MapPin size={14} /> {job.company}</span>
                                <span style={styles.tag}>{job.typeLabel}</span>
                            </div>
                            <p style={{ marginBottom: '1rem', color: '#64748b' }}>{job.desc}</p>
                            <button onClick={() => handleApply(job.name)} style={styles.applyBtn}>Easy Apply</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' },
    header: { display: 'flex', alignItems: 'center', gap: '1rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' },
    title: { fontSize: '2rem', fontWeight: 900, margin: 0 },
    card: { backgroundColor: 'white', padding: '2rem', borderRadius: '2rem', boxShadow: 'var(--card-shadow)', minHeight: '400px' },
    intro: { textAlign: 'center', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
    desc: { color: '#64748b', fontSize: '1.2rem', maxWidth: '500px' },
    grid: { display: 'grid', gap: '1.5rem' },
    jobCard: { border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', background: '#f8fafc' },
    jobHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' },
    salary: { fontWeight: 'bold', color: '#16a34a', background: '#dcfce7', padding: '0.2rem 0.6rem', borderRadius: '8px' },
    meta: { display: 'flex', gap: '1rem', marginBottom: '1rem' },
    tag: { fontSize: '0.9rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem' },
    applyBtn: { width: '100%', padding: '0.8rem', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' },
    searchBar: { display: 'flex', gap: '1rem', marginBottom: '1.5rem' },
    input: { flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0' },
    select: { padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0' }
};
