'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import BigButton from '@/components/BigButton';
import { Zap, Flame, Building2, Search, Smartphone, Wheat, Home as HomeIcon, Bus, Heart, AlertCircle, ShieldCheck, ShoppingBag, Video, Leaf, Sparkles } from 'lucide-react';
import Link from 'next/link';
import NearbyFacilities from '@/components/NearbyFacilities';
import QRConnect from '@/components/QRConnect';

import TopStrip from '@/components/TopStrip';
import StudentDashboard from '@/components/dashboards/StudentDashboard';
import YouthDashboard from '@/components/dashboards/YouthDashboard';
import GovtDashboard from '@/components/dashboards/GovtDashboard';

export default function Home() {
  const { language, searchQuery } = useAppState();
  const t = translations[language] || translations.en;

  const sectors = [
    {
      label: t.electricity,
      description: "Bill Pay, New Connection",
      icon: <Zap size={80} />,
      color: 'var(--electricity)',
      link: '/electricity'
    },
    {
      label: t.gas,
      description: "Book Cylinder, Status",
      icon: <Flame size={80} />,
      color: 'var(--gas)',
      link: '/gas'
    },
    {
      label: t.municipal,
      description: "Water Tax, Birth Cert",
      icon: <Building2 size={80} />,
      color: 'var(--municipal)',
      link: '/municipal'
    },
    {
      label: t.rationCard,
      description: "Apply, Download",
      icon: <Wheat size={80} />,
      color: 'var(--ration)',
      link: '/ration-card'
    },
    {
      label: t.propertyTax,
      description: "Pay Tax, Assessment",
      icon: <HomeIcon size={80} />,
      color: 'var(--property-tax)',
      link: '/property-tax'
    },
    {
      label: t.transport,
      description: "Bus Pass, Metro",
      icon: <Bus size={80} />,
      color: 'var(--transport)',
      link: '/transport'
    },
    {
      label: t.healthcare,
      description: "Vaccines, Health Card",
      icon: <Heart size={80} />,
      color: 'var(--healthcare)',
      link: '/healthcare'
    },
    {
      label: t.emergency,
      description: "Police, Fire, Ambulance",
      icon: <AlertCircle size={80} />,
      color: 'var(--emergency)',
      link: '/emergency'
    },
    {
      label: "Transparency",
      description: "Blockchain Trust Ledger",
      icon: <ShieldCheck size={80} />,
      color: '#16a34a',
      link: '/transparency'
    },
    {
      label: "Gram Bazaar",
      description: "Village Marketplace",
      icon: <ShoppingBag size={80} />,
      color: '#ea580c',
      link: '/gram-bazaar'
    },
    {
      label: "Tele-Health",
      description: "Video Consultation",
      icon: <Video size={80} />,
      color: '#2563eb',
      link: '/tele-health'
    },
    {
      label: "Agri-Tech",
      description: "Drones & Soil Health",
      icon: <Leaf size={80} />,
      color: '#059669',
      link: '/agri-tech'
    },
    {
      label: "Future Vision",
      description: "Vision 2030 Hub",
      icon: <Sparkles size={80} />,
      color: '#7c3aed',
      link: '/vision'
    }
  ];

  const filteredSectors = sectors.filter(s =>
    s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <TopStrip />
      {/* Header is global in layout, but TopStrip is per page if not in layout. Putting it here for now. */}

      <main style={styles.mainContent}>
        {/* Role Specific Dashboards */}
        {useAppState().user?.role === 'student' && <StudentDashboard />}
        {useAppState().user?.role === 'youth' && <YouthDashboard />}
        {useAppState().user?.role === 'government' && <GovtDashboard />}

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={styles.sectionTitle}>Essential Services / आवश्यक सेवाएँ</h2>
          {/* Simple Marquee for 'Village News' */}
          <div style={{ background: '#fffff0', border: '1px solid #eee', padding: '0.5rem', marginBottom: '1rem', color: '#d32f2f', fontWeight: 500 }}>
            📢 New: Apply for PM Kisan Samman Nidhi directly from Kiosk!
          </div>
        </div>

        <div style={styles.grid}>
          {filteredSectors.length > 0 ? (
            filteredSectors.map((sector) => (
              <Link key={sector.label} href={sector.link} style={{ textDecoration: 'none' }}>
                <BigButton
                  label={sector.label}
                  description={sector.description}
                  icon={sector.icon}
                  color={sector.color}
                  onClick={() => { }}
                />
              </Link>
            ))
          ) : (
            <div style={styles.noResults}>
              <h3>No services found matching "{searchQuery}"</h3>
            </div>
          )}
        </div>

        <NearbyFacilities />
      </main>

      <QRConnect />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f9f9f9',
  },
  mainContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
    width: '100%',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    color: '#333',
    borderLeft: '5px solid var(--primary)',
    paddingLeft: '1rem',
    marginBottom: '1.5rem',
    fontWeight: 700,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem',
  },
  footer: {
    marginTop: 'auto',
    backgroundColor: '#eee',
    padding: '2rem',
    borderTop: '1px solid #ddd',
  },
  noResults: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    border: '1px solid #ddd',
    color: '#666',
  }
};
