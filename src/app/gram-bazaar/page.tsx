'use client';

import React, { useState } from 'react';
import { useAppState } from '@/context/StateContext';
import { translations } from '@/constants/translations';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Camera, Tag, CheckCircle, Printer, X, ArrowLeft, Image as ImageIcon, Plus, LayoutDashboard, History, Search, ChevronRight, Store, Package, Heart, Filter, MapPin } from 'lucide-react';
import AethelLayout from '@/components/AethelLayout';
import ReceiptComponent from '@/components/Receipt';

const PRODUCTS = [
    { id: 1, name: 'Madhubani Painting', price: 1200, seller: 'Priya Arts', tag: 'Handmade' },
    { id: 2, name: 'Organic Wild Honey', price: 450, seller: 'Tribal Co-op', tag: 'Natural' },
    { id: 3, name: 'Handloom Saree', price: 2500, seller: 'Weavers Guild', tag: 'Craft' },
    { id: 4, name: 'Bamboo Basket Set', price: 800, seller: 'Green Crafts', tag: 'Handmade' },
    { id: 5, name: 'Terracotta Pots', price: 300, seller: 'Potters Wheel', tag: 'Natural' },
    { id: 6, name: 'Pickle Jar (1kg)', price: 250, seller: 'Grandma Recipes', tag: 'Natural' },
];

export default function GramBazaarPage() {
    const { language, addToast } = useAppState();
    const t = translations[language] || translations.en;
    const router = useRouter();
    const [view, setView] = useState<'list' | 'sell' | 'processing' | 'success-buy' | 'success-sell'>('list');
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [showReceipt, setShowReceipt] = useState(false);

    const sidebarLinks = [
        { label: 'Village Market', icon: <Store size={20} />, href: '/gram-bazaar', active: true },
        { label: 'Seller Hub', icon: <Package size={20} />, href: '/gram-bazaar/seller' },
        { label: 'My Orders', icon: <History size={20} />, href: '/transactions' },
    ];

    const topStats = [
        { label: 'Total Sellers', value: '42', sub: 'in your Gram', color: 'var(--theme-terra)' },
        { label: 'Top Product', value: 'Wild Honey', sub: '50+ Sold today', color: '#16a34a' },
        { label: 'Delivery Node', value: 'Kiosk 4', sub: 'Sector 12', color: 'var(--theme-azure)' }
    ];

    const handleBuy = (product: any) => {
        setSelectedProduct(product);
        setView('processing');
        setTimeout(() => setView('success-buy'), 2000);
    };

    if (view === 'processing') {
        return (
            <div style={styles.loadingOverlay}>
                <div style={styles.pulseIcon}><ShoppingBag size={48} color="white" /></div>
                <h2 style={{ color: 'white' }}>{selectedProduct ? `Securing ${selectedProduct.name}...` : 'Syncing Hub...'}</h2>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>Connecting to Decentralized Village Ledger</p>
            </div>
        );
    }

    return (
        <AethelLayout
            title="Gram Bazaar"
            themeColor="var(--theme-terra)"
            themeSoft="var(--theme-terra-soft)"
            sidebarLinks={sidebarLinks}
        >
            <div style={styles.contentGrid}>
                {/* Stats Row */}
                <div style={styles.statsRow}>
                    {topStats.map((stat, i) => (
                        <div key={i} style={styles.statCard}>
                            <p style={styles.statLabel}>{stat.label}</p>
                            <h3 style={{ ...styles.statValue, color: stat.color }}>{stat.value}</h3>
                            <p style={styles.statSub}>{stat.sub}</p>
                        </div>
                    ))}
                </div>

                <div style={styles.mainLayout}>
                    <div style={styles.marketSection}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>Handcrafted Marketplace</h2>
                            <div style={styles.searchRow}>
                                <div style={styles.searchBox}><Search size={18} /><input placeholder="Search products..." style={styles.searchInput} /></div>
                                <button style={styles.filterBtn}><Filter size={18} /> Filters</button>
                            </div>
                        </div>

                        <div style={styles.productGrid}>
                            {PRODUCTS.map(product => (
                                <div key={product.id} style={styles.productCard}>
                                    <div style={styles.productImage}>
                                        <div style={styles.productTag}>{product.tag}</div>
                                        <Tag size={40} color="var(--theme-terra-soft)" />
                                    </div>
                                    <div style={styles.productInfo}>
                                        <h3 style={styles.productName}>{product.name}</h3>
                                        <div style={styles.sellerRow}><MapPin size={12} /> {product.seller}</div>
                                        <div style={styles.priceRow}>
                                            <span style={styles.price}>₹{product.price}</span>
                                            <button onClick={() => router.push('/gram-bazaar/checkout')} style={styles.buyBtn}>Add to Bag</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={styles.sidePanel}>
                        <div style={styles.vocalCard}>
                            <Heart size={32} color="white" />
                            <h4 style={{ color: 'white', margin: '0.5rem 0 0.25rem' }}>Vocal for Local</h4>
                            <p style={{ color: 'white', opacity: 0.9, fontSize: '0.8rem', margin: 0 }}>Supporting local artisans directly. 100% of proceeds go to the creator.</p>
                        </div>

                        <div style={styles.sellShortcut}>
                            <h4 style={{ margin: '0 0 1rem', fontSize: '0.9rem', color: '#1e293b' }}>Your Listings</h4>
                            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 1.25rem' }}>You have 2 items live in the bazaar.</p>
                            <button onClick={() => router.push('/gram-bazaar/seller')} style={styles.primaryActionBtn}>Go to Seller Studio</button>
                        </div>
                    </div>
                </div>
            </div>

            {view === 'success-buy' && (
                <div style={styles.modalOverlay}>
                    <div style={styles.successCard}>
                        <CheckCircle size={64} color="#16a34a" />
                        <h2 style={styles.cardTitle}>Order Placed!</h2>
                        <p style={styles.cardSub}>Pickup code: GB-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                        <div style={styles.billBox}>
                            <div style={styles.billRow}><span>Total</span><strong>₹{selectedProduct?.price}</strong></div>
                            <div style={styles.billRow}><span>Status</span><strong style={{ color: '#16a34a' }}>Paid (UPI)</strong></div>
                        </div>
                        <button onClick={() => setView('list')} style={styles.primaryActionBtn}>Continue Shopping</button>
                    </div>
                </div>
            )}
        </AethelLayout>
    );
}

const styles: Record<string, React.CSSProperties> = {
    contentGrid: { display: 'flex', flexDirection: 'column', gap: '2.5rem' },
    statsRow: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' },
    statCard: { background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    statLabel: { fontSize: '0.85rem', fontWeight: 600, color: '#64748b', margin: 0 },
    statValue: { fontSize: '1.5rem', fontWeight: 800, margin: 0 },
    statSub: { fontSize: '0.75rem', color: '#94a3b8', margin: 0 },
    mainLayout: { display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem' },
    marketSection: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    sectionTitle: { fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', margin: 0 },
    searchRow: { display: 'flex', gap: '0.75rem' },
    searchBox: { display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f8fafc', padding: '0.6rem 1.25rem', borderRadius: '16px', border: '1px solid #e1e5e8' },
    searchInput: { border: 'none', background: 'none', outline: 'none', color: '#1e293b', fontSize: '0.9rem', width: '150px' },
    filterBtn: { background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer' },
    productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' },
    productCard: { background: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column' },
    productImage: { height: '180px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' },
    productTag: { position: 'absolute', top: '1rem', left: '1rem', background: 'white', padding: '0.25rem 0.6rem', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 800, color: '#64748b', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
    productInfo: { padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    productName: { margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#1e293b' },
    sellerRow: { display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#94a3b8' },
    priceRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' },
    price: { fontSize: '1.25rem', fontWeight: 900, color: 'var(--theme-terra)' },
    buyBtn: { background: '#1e293b', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' },
    sidePanel: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    vocalCard: { background: 'linear-gradient(135deg, #78350f 0%, #451a03 100%)', borderRadius: '24px', padding: '2rem' },
    sellShortcut: { background: 'white', border: '1px solid #f1f5f9', borderRadius: '24px', padding: '1.5rem' },
    primaryActionBtn: { background: 'var(--theme-terra)', color: 'white', border: 'none', width: '100%', padding: '0.8rem', borderRadius: '14px', fontWeight: 800, cursor: 'pointer' },
    loadingOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', textAlign: 'center' },
    pulseIcon: { animation: 'pulse 2s infinite' },
    modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    successCard: { background: 'white', padding: '3rem', borderRadius: '32px', width: '100%', maxWidth: '440px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    cardTitle: { margin: 0, fontSize: '1.5rem', fontWeight: 900, color: '#1e293b' },
    cardSub: { fontSize: '0.9rem', color: '#64748b', margin: 0 },
    billBox: { background: '#f8fafc', padding: '1.25rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    billRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }
};
