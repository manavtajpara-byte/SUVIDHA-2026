'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import BigButton from '@/components/BigButton';
import { Zap, Flame, Building2, Search, Smartphone, Wheat, Home as HomeIcon, Heart, AlertCircle, ShieldCheck, ShoppingBag, Video, Leaf, Sparkles, Scale, Globe, CreditCard, Droplets, BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import NearbyFacilities from '@/components/NearbyFacilities';
import QRConnect from '@/components/QRConnect';

import TopStrip from '@/components/TopStrip';
import StudentDashboard from '@/components/dashboards/StudentDashboard';
import YouthDashboard from '@/components/dashboards/YouthDashboard';
import GovtDashboard from '@/components/dashboards/GovtDashboard';
import CitizenDashboard from '@/components/dashboards/CitizenDashboard';
import AethelLayout from '@/components/AethelLayout';

export default function Home() {
  const { language, searchQuery, user } = useAppState();
  const t = translations[language] || translations.en;

  const sidebarLinks = [
    { label: 'Dashboard', icon: <HomeIcon size={20} />, href: '/' },
    { label: 'Services', icon: <Building2 size={20} />, href: '/services' },
    { label: 'Transactions', icon: <CreditCard size={20} />, href: '/transactions' },
    { label: 'Support', icon: <AlertCircle size={20} />, href: '/help' },
  ];

  const sectors = [
    {
      label: t.electricity,
      description: "Bill Pay, New Connection",
      icon: <Zap size={32} />,
      color: 'var(--theme-amber)',
      link: '/electricity'
    },
    {
      label: t.gas,
      description: "Book Cylinder, Status",
      icon: <Flame size={32} />,
      color: 'var(--theme-azure)',
      link: '/gas'
    },
    {
      label: t.municipal,
      description: "Water Tax, Birth Cert",
      icon: <Droplets size={32} />,
      color: 'var(--theme-ocean)',
      link: '/municipal'
    },
    {
      label: t.rationCard,
      description: "Apply, Download",
      icon: <Wheat size={32} />,
      color: 'var(--theme-terra)',
      link: '/ration-card'
    },
    {
      label: "Healthcare",
      description: "Vaccines, Health Card",
      icon: <Heart size={32} />,
      color: 'var(--theme-ruby)',
      link: '/healthcare'
    },
    {
      label: "Education Hub",
      description: "Learning & Skills",
      icon: <BookOpen size={32} />,
      color: 'var(--theme-amethyst)',
      link: '/training'
    },
    {
      label: "Future Vision",
      description: "Vision 2030 Hub",
      icon: <Sparkles size={32} />,
      color: 'var(--theme-indigo)',
      link: '/vision'
    }
  ];

  const filteredSectors = sectors.filter(s =>
    s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AethelLayout
      title="Dashboard Overview"
      themeColor="var(--theme-azure)"
      themeSoft="var(--theme-azure-soft)"
      sidebarLinks={sidebarLinks}
    >
      <div style={styles.dashboardHeader}>
        <div style={styles.bannerCard}>
          <div style={styles.bannerText}>
            <div style={styles.launchBadge}>🚀 SOVEREIGN LAUNCH v1.0.0</div>
            <h2 style={styles.bannerTitle}>Good morning, {user?.name.split(' ')[0] || 'Citizen'}!</h2>
            <p style={styles.bannerSub}>Welcome to the national deployment of SUVIDHA 2026. All systems optimized.</p>
          </div>
          <div style={styles.bannerIcon}>✨</div>
        </div>

        <div style={styles.statsRow}>
          <div style={styles.statMini}>
            <p style={styles.statLabel}>Active Subscriptions</p>
            <h3 style={styles.statValue}>04</h3>
          </div>
          <div style={styles.statMini}>
            <p style={styles.statLabel}>Total Saved</p>
            <h3 style={styles.statValue}>₹ 12,450</h3>
          </div>
        </div>
      </div>

      {/* User Dashboards */}
      <section style={{ marginBottom: '3rem' }}>
        {user?.role === 'student' && <StudentDashboard />}
        {user?.role === 'youth' && <YouthDashboard />}
        {user?.role === 'government' && <GovtDashboard />}
        {user?.role === 'citizen' && <CitizenDashboard />}
      </section>

      <section>
        <h2 style={styles.sectionTitle}>Essential Services / आवश्यक सेवाएँ</h2>
        <div style={styles.sectorGrid}>
          {filteredSectors.map((sector, idx) => (
            <Link key={idx} href={sector.link} style={styles.sectorLink}>
              <div style={styles.sectorCard}>
                <div style={{ ...styles.sectorIconBox, background: sector.color + '20', color: sector.color }}>
                  {sector.icon}
                </div>
                <div style={styles.sectorContent}>
                  <h3 style={styles.sectorLabel}>{sector.label}</h3>
                  <p style={styles.sectorDesc}>{sector.description}</p>
                </div>
                <ChevronRight size={20} color="#94a3b8" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <NearbyFacilities />
      <QRConnect />
    </AethelLayout>
  );
}

const styles: Record<string, React.CSSProperties> = {
  dashboardHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr 340px',
    gap: '1.5rem',
    marginBottom: '2.5rem'
  },
  bannerCard: {
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    borderRadius: '32px',
    padding: '2.5rem',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  bannerTitle: { fontSize: '2rem', fontWeight: 700, margin: 0 },
  bannerSub: { fontSize: '1rem', opacity: 0.8, margin: '0.5rem 0 0 0' },
  bannerIcon: { fontSize: '4rem', opacity: 0.2 },
  statsRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  statMini: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '24px',
    border: '1px solid #f1f5f9'
  },
  statLabel: { margin: 0, fontSize: '0.85rem', color: '#64748b', fontWeight: 600 },
  statValue: { margin: '0.25rem 0 0 0', fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 800,
    color: '#1e293b',
    marginBottom: '1.5rem'
  },
  sectorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem'
  },
  sectorLink: { textDecoration: 'none' },
  sectorCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '24px',
    border: '1px solid #f1f5f9',
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    transition: 'all 0.2s',
    cursor: 'pointer'
  },
  sectorIconBox: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectorContent: { flex: 1 },
  sectorLabel: { margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#1e293b' },
  sectorDesc: { margin: 0, fontSize: '0.85rem', color: '#64748b' },
  launchBadge: {
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    padding: '0.4rem 0.8rem',
    borderRadius: '10px',
    fontSize: '0.7rem',
    fontWeight: 900,
    width: 'fit-content',
    marginBottom: '1rem',
    border: '1px solid rgba(255,255,255,0.2)',
    letterSpacing: '0.05em'
  }
};
