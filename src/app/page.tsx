'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import BigButton from '@/components/BigButton';
import { Zap, Flame, Building2, Search, Smartphone, Wheat, Home as HomeIcon, Bus, Heart, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { language } = useAppState();
  const t = translations[language];

  const sectors = [
    {
      label: t.electricity,
      icon: <Zap size={70} />,
      color: 'var(--electricity)',
      link: '/electricity'
    },
    {
      label: t.gas,
      icon: <Flame size={70} />,
      color: 'var(--gas)',
      link: '/gas'
    },
    {
      label: t.municipal,
      icon: <Building2 size={70} />,
      color: 'var(--municipal)',
      link: '/municipal'
    },
    {
      label: t.rationCard,
      icon: <Wheat size={70} />,
      color: '#16a34a',
      link: '/ration-card'
    },
    {
      label: t.propertyTax,
      icon: <HomeIcon size={70} />,
      color: '#dc2626',
      link: '/property-tax'
    },
    {
      label: t.transport,
      icon: <Bus size={70} />,
      color: '#9333ea',
      link: '/transport'
    },
    {
      label: t.healthcare,
      icon: <Heart size={70} />,
      color: '#ec4899',
      link: '/healthcare'
    },
    {
      label: t.emergency,
      icon: <AlertCircle size={70} />,
      color: '#ef4444',
      link: '/emergency'
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.welcomeSection} className="animate-in">
        <div style={styles.welcomeBadge}>✨ Government Services Portal</div>
        <h2 style={styles.welcomeTitle} className="animate-gradient-text">Welcome to SUVIDHA</h2>
        <p style={styles.welcomeSub}>Your one-stop solution for all government services</p>
        <div style={styles.decorativeLine}></div>
      </div>

      <div style={styles.grid}>
        {sectors.map((sector, index) => (
          <div key={sector.label} style={{ animationDelay: `${index * 0.1}s` }} className="animate-in">
            <Link href={sector.link} style={{ textDecoration: 'none' }}>
              <BigButton
                label={sector.label}
                icon={sector.icon}
                color={sector.color}
                onClick={() => { }}
              />
            </Link>
          </div>
        ))}
      </div>

      <div style={styles.footerActions} className="animate-in">
        <Link href="/track" style={styles.secondaryAction}>
          <div style={styles.actionIcon}>
            <Search size={32} />
          </div>
          <span>{t.track}</span>
        </Link>
        <Link href="/login" style={styles.secondaryAction}>
          <div style={styles.actionIcon}>
            <Smartphone size={32} />
          </div>
          <span>{t.login}</span>
        </Link>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '2rem',
    maxWidth: '1600px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
    minHeight: 'calc(100vh - 120px)',
  },
  welcomeSection: {
    textAlign: 'center',
    padding: '2rem 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  welcomeBadge: {
    display: 'inline-block',
    margin: '0 auto',
    padding: '0.5rem 1.5rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '2rem',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  },
  welcomeTitle: {
    fontSize: '4.5rem',
    fontWeight: 900,
    margin: 0,
    letterSpacing: '-2px',
    lineHeight: 1.1,
  },
  welcomeSub: {
    fontSize: '1.4rem',
    opacity: 0.8,
    margin: 0,
    fontWeight: 500,
  },
  decorativeLine: {
    width: '100px',
    height: '4px',
    background: 'linear-gradient(90deg, transparent, #667eea, transparent)',
    margin: '1rem auto 0',
    borderRadius: '2px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  footerActions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '1rem',
  },
  secondaryAction: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    textDecoration: 'none',
    color: 'var(--foreground)',
    fontWeight: 'bold',
    fontSize: '1.25rem',
    padding: '2rem 3rem',
    borderRadius: '1.5rem',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    boxShadow: 'var(--card-shadow)',
    transition: 'all 0.3s ease',
    border: '2px solid transparent',
  },
  actionIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
  }
};
