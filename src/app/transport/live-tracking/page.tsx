'use client';

import React, { useState, useEffect } from 'react';
import { Bus, MapPin, Clock, ArrowLeft, Bell, Navigation } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LiveTrackingPage() {
    const router = useRouter();
    const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
    const [busProgress, setBusProgress] = useState(0);

    const routes = [
        { id: '101', name: 'Village Central to District HQ', status: 'On Time', stops: 5 },
        { id: '102', name: 'Industrial Zone Shuttle', status: 'Delayed (5 min)', stops: 8 },
        { id: '103', name: 'Hospital Loop Express', status: 'On Time', stops: 4 },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setBusProgress((prev) => (prev >= 100 ? 0 : prev + 1));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={32} />
                </button>
                <h1 style={styles.title}>Live Mobility Status 🚌</h1>
            </div>

            <div style={styles.layout}>
                <div style={styles.sidebar}>
                    <h2 style={styles.sectionTitle}>Select Route</h2>
                    <div style={styles.routeList}>
                        {routes.map(route => (
                            <div
                                key={route.id}
                                style={{
                                    ...styles.routeCard,
                                    borderLeft: `5px solid ${selectedRoute === route.id ? '#9333ea' : '#e2e8f0'}`,
                                    backgroundColor: selectedRoute === route.id ? '#f3e8ff' : 'white'
                                }}
                                onClick={() => setSelectedRoute(route.id)}
                            >
                                <div style={styles.routeHeader}>
                                    <span style={styles.routeId}>#{route.id}</span>
                                    <span style={{
                                        ...styles.status,
                                        color: route.status.includes('Delayed') ? '#dc2626' : '#16a34a'
                                    }}>
                                        {route.status}
                                    </span>
                                </div>
                                <h3 style={styles.routeName}>{route.name}</h3>
                                <div style={styles.routeMeta}>
                                    <span><MapPin size={14} /> {route.stops} Stops remaining</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={styles.main}>
                    <div style={styles.mapCanvas}>
                        {/* Mock Map View */}
                        <div style={styles.mapGrid}>
                            <div style={styles.roadHorizontal}></div>
                            <div style={styles.roadVertical}></div>

                            {/* Bus Icon Moving */}
                            <div style={{
                                ...styles.busMarker,
                                left: `${busProgress}%`,
                                top: '45%'
                            }}>
                                <Bus size={24} color="white" />
                                <div style={styles.busPulse}></div>
                            </div>

                            {/* Destination Marker */}
                            <div style={{ ...styles.stopMarker, left: '95%', top: '45%' }}>
                                <MapPin size={24} color="#dc2626" />
                            </div>

                            <div style={styles.mapLabel}>District Hub (Destination)</div>
                            <div style={styles.villageLabel}>Gram Panchayat (Origin)</div>
                        </div>

                        <div style={styles.mapControls}>
                            <button style={styles.controlBtn}><Navigation size={20} /> Center Map</button>
                            <button style={styles.controlBtn}><Bell size={20} /> Notify Me</button>
                        </div>
                    </div>

                    {selectedRoute && (
                        <div style={styles.etaCard}>
                            <Clock size={48} color="#9333ea" />
                            <div>
                                <h3 style={styles.etaTitle}>Estimated Arrival</h3>
                                <p style={styles.etaValue}>12 Minutes</p>
                                <p style={styles.etaSub}>Next Stop: Sub-District Hospital</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    header: { display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#9333ea' },
    title: { fontSize: '2.5rem', fontWeight: 900, margin: 0, color: '#1e293b' },
    layout: { display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2rem' },
    sidebar: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    sectionTitle: { fontSize: '1.2rem', fontWeight: 700, margin: 0 },
    routeList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    routeCard: { padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'all 0.2s' },
    routeHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' },
    routeId: { fontWeight: 'bold', color: '#64748b' },
    status: { fontSize: '0.85rem', fontWeight: 'bold' },
    routeName: { fontSize: '1.1rem', margin: '0 0 0.5rem 0' },
    routeMeta: { fontSize: '0.9rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem' },
    main: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    mapCanvas: { height: '500px', borderRadius: '24px', background: '#e2e8f0', position: 'relative', overflow: 'hidden', border: '8px solid white', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' },
    mapGrid: { position: 'absolute', inset: 0, background: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' },
    roadHorizontal: { position: 'absolute', height: '40px', width: '100%', background: '#94a3b8', top: '45%' },
    roadVertical: { position: 'absolute', width: '40px', height: '100%', background: '#94a3b8', left: '10%' },
    busMarker: { position: 'absolute', background: '#9333ea', borderRadius: '50%', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, transition: 'left 0.5s linear' },
    busPulse: { position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid #9333ea', animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' },
    stopMarker: { position: 'absolute', zIndex: 5 },
    mapLabel: { position: 'absolute', bottom: '2rem', right: '2rem', background: 'white', padding: '0.5rem 1rem', borderRadius: '50px', fontWeight: 'bold', fontSize: '0.8rem' },
    villageLabel: { position: 'absolute', top: '2rem', left: '2rem', background: 'white', padding: '0.5rem 1rem', borderRadius: '50px', fontWeight: 'bold', fontSize: '0.8rem' },
    mapControls: { position: 'absolute', bottom: '1.5rem', left: '1.5rem', display: 'flex', gap: '1rem' },
    controlBtn: { padding: '0.75rem 1.25rem', borderRadius: '12px', background: 'white', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' },
    etaCard: { background: 'white', padding: '2rem', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
    etaTitle: { margin: 0, fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' },
    etaValue: { margin: '0.25rem 0', fontSize: '2.5rem', fontWeight: 900, color: '#1e293b' },
    etaSub: { margin: 0, color: '#16a34a', fontWeight: 'bold' }
};
