'use client';

import React, { useState } from 'react';
import AethelLayout from '@/components/AethelLayout';
import { useAppState } from '@/context/StateContext';
import {
    Store, Package, History, Search, ChevronRight,
    Heart, Filter, MapPin, TrendingUp, Truck,
    BarChart3, Plus, Tag, ShoppingBag, ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GramBazaarPage() {
    const { addToast } = useAppState();
    const router = useRouter();
    const [activeView, setActiveView] = useState<'market' | 'insights' | 'seller'>('market');

    const sidebarLinks = [
        { label: 'Village Market', icon: <Store size={20} />, href: '/gram-bazaar', active: activeView === 'market' },
        { label: 'Seller Studio', icon: <Package size={20} />, href: '/gram-bazaar/seller', active: activeView === 'seller' },
        { label: 'Market Insights', icon: <TrendingUp size={20} />, href: '/gram-bazaar/insights', active: activeView === 'insights' },
    ];

    const marketStats = [
        { label: 'Gram Demand', value: 'High', sub: 'Handicrafts surging', color: '#16a34a' },
        { label: 'Top Category', value: 'Organic', sub: '12 new listings', color: 'var(--theme-terra)' },
        { label: 'Avg lead time', value: '2 Days', sub: 'Kiosk Node 4', color: 'var(--theme-azure)' }
    ];

    const products = [
        { id: 1, name: 'Madhubani Painting', price: 1200, seller: 'Priya Arts', tag: 'Handmade' },
        { id: 2, name: 'Organic Wild Honey', price: 450, seller: 'Tribal Co-op', tag: 'Natural' },
        { id: 3, name: 'Handloom Saree', price: 2500, seller: 'Weavers Guild', tag: 'Craft' },
        { id: 4, name: 'Bamboo Basket Set', price: 800, seller: 'Green Crafts', tag: 'Handmade' }
    ];

    const predictions = [
        { crop: 'Wild Honey', current: '₹ 450/kg', trend: '+12%', color: '#10b981', message: 'Demand rising due to festive season.' },
        { crop: 'Handloom Cotton', current: '₹ 800/mtr', trend: '-2%', color: '#ef4444', message: 'Supply stable. Prices expected to hold.' },
        { crop: 'Bamboo Crafts', current: '₹ 200/unit', trend: '+5%', color: '#10b981', message: 'New export orders boosting value.' }
    ];

    return (
        <AethelLayout
            title="Gram Bazaar 3.0"
            themeColor="var(--theme-terra)"
            themeSoft="var(--theme-terra-soft)"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.container}>
                {/* Horizontal Nav */}
                <div style={styles.tabBar}>
                    <button onClick={() => setActiveView('market')} style={{ ...styles.tabBtn, borderBottom: activeView === 'market' ? '3px solid var(--theme-terra)' : 'none' }}>Marketplace</button>
                    <button onClick={() => setActiveView('insights')} style={{ ...styles.tabBtn, borderBottom: activeView === 'insights' ? '3px solid var(--theme-terra)' : 'none' }}>Price Insights</button>
                    <button onClick={() => setActiveView('seller')} style={{ ...styles.tabBtn, borderBottom: activeView === 'seller' ? '3px solid var(--theme-terra)' : 'none' }}>Seller Studio</button>
                </div>

                {activeView === 'market' && (
                    <div style={styles.viewContainer}>
                        <div style={styles.statsRow}>
                            {marketStats.map((s, i) => (
                                <div key={i} style={styles.statCard}>
                                    <p style={styles.statLabel}>{s.label}</p>
                                    <h3 style={{ ...styles.statValue, color: s.color }}>{s.value}</h3>
                                    <p style={styles.statSub}>{s.sub}</p>
                                </div>
                            ))}
                        </div>

                        <div style={styles.marketSplit}>
                            <div style={styles.productSection}>
                                <div style={styles.sectionHeader}>
                                    <h3 style={styles.sectionTitle}>Sovereign Handcrafted Goods</h3>
                                    <div style={styles.searchBox}><Search size={18} /><input placeholder="Search bazaar..." style={styles.searchInput} /></div>
                                </div>
                                <div style={styles.grid}>
                                    {products.map(p => (
                                        <div key={p.id} style={styles.productCard}>
                                            <div style={styles.productImg}><Tag size={32} color="#cbd5e1" /></div>
                                            <div style={styles.productBody}>
                                                <h4 style={styles.pName}>{p.name}</h4>
                                                <p style={styles.pSeller}><MapPin size={12} /> {p.seller}</p>
                                                <div style={styles.pFooter}>
                                                    <span style={styles.pPrice}>₹{p.price}</span>
                                                    <button style={styles.buyBtn} onClick={() => addToast({ message: "Added to Bag", type: 'success' })}>Add</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={styles.sideCol}>
                                <div style={styles.trackingCard}>
                                    <div style={styles.cardHeader}>
                                        <Truck size={24} color="var(--theme-terra)" />
                                        <h4 style={{ margin: 0, fontWeight: 800 }}>Live Shipments</h4>
                                    </div>
                                    <div style={styles.trackItem}>
                                        <p style={styles.trackCode}>#GB-9921A</p>
                                        <p style={styles.trackStatus}>Arriving at Kiosk 4 tomorrow</p>
                                        <div style={styles.trackLine}><div style={{ width: '80%', height: '100%', background: 'var(--theme-terra)' }}></div></div>
                                    </div>
                                </div>
                                <div style={styles.vocalCard}>
                                    <Heart size={32} />
                                    <h4 style={{ margin: '0.5rem 0' }}>Vocal for Local</h4>
                                    <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9 }}>100% of profit goes directly to village artisans.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeView === 'insights' && (
                    <div style={styles.viewContainer}>
                        <div style={styles.headerBox}>
                            <TrendingUp size={48} color="var(--theme-terra)" />
                            <h2 style={styles.viewTitle}>AI Market Predictions</h2>
                            <p style={styles.viewSub}>Predictive analysis for local village produce based on regional demand.</p>
                        </div>
                        <div style={styles.insightGrid}>
                            {predictions.map((p, i) => (
                                <div key={i} style={styles.insightCard}>
                                    <div style={styles.insightHeader}>
                                        <h4 style={styles.insCrop}>{p.crop}</h4>
                                        <span style={{ ...styles.insTrend, color: p.color }}>{p.trend}</span>
                                    </div>
                                    <p style={styles.insPrice}>{p.current}</p>
                                    <p style={styles.insMsg}>{p.message}</p>
                                    <div style={styles.insChart}><BarChart3 size={32} color="#e2e8f0" /></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeView === 'seller' && (
                    <div style={styles.viewContainer}>
                        <div style={styles.sellerHeader}>
                            <div style={styles.headerInfo}>
                                <h2 style={styles.viewTitle}>Artisan Studio</h2>
                                <p style={styles.viewSub}>Manage your inventory and track village payouts.</p>
                            </div>
                            <button style={styles.addButton}><Plus size={20} /> List New Product</button>
                        </div>
                        <div style={styles.sellerStats}>
                            <div style={styles.sellStat}>
                                <span>Monthly Sales</span>
                                <h4>₹ 12,450</h4>
                            </div>
                            <div style={styles.sellStat}>
                                <span>Active Orders</span>
                                <h4>03</h4>
                            </div>
                            <div style={styles.sellStat}>
                                <span>Customer Rating</span>
                                <h4>4.9 ★</h4>
                            </div>
                        </div>
                        <div style={styles.inventory}>
                            <h3 style={styles.sectionTitle}>Active Inventory</h3>
                            {[1, 2].map(i => (
                                <div key={i} style={styles.invItem}>
                                    <div style={styles.invImg}><Package size={24} /></div>
                                    <div style={styles.invInfo}>
                                        <h4 style={styles.invName}>Rosewood Carving #{i}</h4>
                                        <p style={styles.invStock}>12 units in stock</p>
                                    </div>
                                    <div style={styles.invPrice}>₹ 3,500</div>
                                    <button style={styles.editBtn}>Edit</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AethelLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    tabBar: { display: 'flex', gap: '2.5rem', borderBottom: '1px solid #e2e8f0' },
    tabBtn: { padding: '1rem', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer', color: '#64748b' },
    viewContainer: { display: 'flex', flexDirection: 'column', gap: '2.5rem' },
    statsRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' },
    statCard: { background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #f1f5f9' },
    statLabel: { margin: 0, fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' },
    statValue: { margin: '0.5rem 0 0.25rem', fontSize: '1.75rem', fontWeight: 900 },
    statSub: { margin: 0, fontSize: '0.8rem', color: '#64748b' },
    marketSplit: { display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem' },
    productSection: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    sectionTitle: { fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', margin: 0 },
    searchBox: { display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'white', padding: '0.6rem 1rem', borderRadius: '14px', border: '1px solid #e2e8f0' },
    searchInput: { border: 'none', background: 'none', outline: 'none', fontSize: '0.9rem' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' },
    productCard: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '24px', overflow: 'hidden' },
    productImg: { height: '140px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    productBody: { padding: '1.25rem' },
    pName: { margin: 0, fontSize: '1rem', fontWeight: 800, color: '#1e293b' },
    pSeller: { margin: '0.25rem 0 0.75rem', fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' },
    pFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    pPrice: { fontSize: '1.2rem', fontWeight: 900, color: 'var(--theme-terra)' },
    buyBtn: { background: '#1e293b', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' },
    sideCol: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    trackingCard: { background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #f1f5f9' },
    cardHeader: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' },
    trackItem: { background: '#f8fafc', padding: '1rem', borderRadius: '16px' },
    trackCode: { margin: 0, fontSize: '0.75rem', fontWeight: 800, color: 'var(--theme-terra)' },
    trackStatus: { margin: '0.25rem 0 0.75rem', fontSize: '0.85rem', color: '#64748b' },
    trackLine: { height: '6px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' },
    vocalCard: { background: 'linear-gradient(135deg, #78350f 0%, #451a03 100%)', borderRadius: '24px', padding: '1.5rem', color: 'white' },
    headerBox: { textAlign: 'center', margin: '2rem 0' },
    viewTitle: { fontSize: '2rem', fontWeight: 900, color: '#1e293b', margin: '1rem 0 0' },
    viewSub: { color: '#64748b', margin: '0.5rem 0 0' },
    insightGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' },
    insightCard: { background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #f1f5f9', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    insightHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    insCrop: { margin: 0, fontSize: '1.1rem', fontWeight: 800 },
    insTrend: { fontSize: '0.85rem', fontWeight: 800 },
    insPrice: { margin: 0, fontSize: '1.5rem', fontWeight: 900, color: '#1e293b' },
    insMsg: { margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 },
    insChart: { marginTop: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '16px', display: 'flex', justifyContent: 'center' },
    sellerHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' },
    headerInfo: { textAlign: 'left' },
    addButton: { background: 'var(--theme-terra)', color: 'white', border: 'none', padding: '1rem 1.5rem', borderRadius: '16px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' },
    sellerStats: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' },
    sellStat: { background: '#f8fafc', padding: '2rem', borderRadius: '24px', textAlign: 'center' },
    inventory: { marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    invItem: { background: 'white', padding: '1.25rem 2rem', borderRadius: '24px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '1.5rem' },
    invImg: { width: '56px', height: '56px', borderRadius: '14px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' },
    invInfo: { flex: 1, textAlign: 'left' },
    invName: { margin: 0, fontSize: '1.1rem', fontWeight: 800 },
    invStock: { margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#94a3b8' },
    invPrice: { fontSize: '1.2rem', fontWeight: 900 },
    editBtn: { background: 'none', border: '1px solid #e2e8f0', padding: '0.6rem 1.25rem', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }
};
