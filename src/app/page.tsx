'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import BigButton from '@/components/BigButton';
import { Zap, Flame, Building2, Search, Smartphone, Wheat, Home as HomeIcon, Bus, Heart, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import NearbyFacilities from '@/components/NearbyFacilities';
import QRConnect from '@/components/QRConnect';

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
    }
  ];

  const filteredSectors = sectors.filter(s =>
    s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.heroContent} className="animate-float">
          <h1 style={styles.heroTitle}>Welcome to <span style={styles.brandText}>SUVIDHA</span></h1>
          <p style={styles.heroSub}>Access all government services in one touch</p>
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
            <Search size={48} style={{ opacity: 0.3 }} />
            <h3>No services found matching "{searchQuery}"</h3>
            <p>Try searching for different keywords like 'electricity' or 'tax'</p>
          </div>
        )}
      </div>

      {!searchQuery && <NearbyFacilities />}

      <div style={styles.footer}>
        <Link href="/track" style={styles.footerCard}>
          <div style={styles.footerIcon}><Search size={32} /></div>
          <div>
            <h3 style={styles.footerTitle}>{t.track}</h3>
            <p style={styles.footerSub}>Check application status</p>
          </div>
        </Link>
        <Link href="/login" style={styles.footerCard}>
          <div style={styles.footerIcon}><Smartphone size={32} /></div>
          <div>
            <h3 style={styles.footerTitle}>{t.login}</h3>
            <p style={styles.footerSub}>Official login portal</p>
          </div>
        </Link>
      </div>

      <QRConnect />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
  },
  hero: {
    textAlign: 'center',
    padding: '3rem 1rem',
    background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.1) 0%, rgba(255,255,255,0) 100%)',
    borderRadius: '3rem',
    marginBottom: '1rem',
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: 900,
    margin: '0 0 1rem 0',
    color: 'var(--foreground)',
    letterSpacing: '-1px',
  },
  brandText: {
    background: 'linear-gradient(135deg, var(--primary) 0%, #ec4899 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSub: {
    fontSize: '1.5rem',
    opacity: 0.7,
    margin: 0,
    maxWidth: '600px',
    marginInline: 'auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.5rem',
    padding: '0 0.5rem',
  },
  footer: {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 'auto',
    paddingBottom: '2rem',
  },
  footerCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    padding: '1.5rem 2.5rem',
    background: 'white',
    borderRadius: '20px',
    textDecoration: 'none',
    color: 'var(--foreground)',
    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s',
    minWidth: '300px',
  },
  footerIcon: {
    backgroundColor: '#f3f4f6',
    padding: '12px',
    borderRadius: '12px',
    color: 'var(--primary)',
  },
  footerTitle: {
    fontSize: '1.4rem',
    fontWeight: 800,
    margin: 0,
  },
  footerSub: {
    fontSize: '1rem',
    opacity: 0.6,
    margin: 0,
  },
  noResults: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '4rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    opacity: 0.8,
  }
};
