'use client';

import React, { useState } from 'react';
import { ShoppingBag, Camera, Tag, CheckCircle, Printer, X, ArrowLeft, Image as ImageIcon, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Receipt from '@/components/Receipt';

const PRODUCTS = [
    { id: 1, name: 'Madhubani Painting', price: 1200, seller: 'Priya Arts' },
    { id: 2, name: 'Organic Wild Honey', price: 450, seller: 'Tribal Co-op' },
    { id: 3, name: 'Handloom Saree', price: 2500, seller: 'Weavers Guild' },
    { id: 4, name: 'Bamboo Basket Set', price: 800, seller: 'Green Crafts' },
    { id: 5, name: 'Terracotta Pots', price: 300, seller: 'Potters Wheel' },
    { id: 6, name: 'Pickle Jar (1kg)', price: 250, seller: 'Grandma Recipes' },
];

export default function GramBazaarPage() {
    const router = useRouter();
    const [view, setView] = useState<'list' | 'sell' | 'processing' | 'success-buy' | 'success-sell'>('list');
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [showReceipt, setShowReceipt] = useState(false);

    const handleBuy = (product: any) => {
        setSelectedProduct(product);
        setView('processing');
        setTimeout(() => {
            setView('success-buy');
        }, 2000);
    };

    const handleSellSubmit = () => {
        setView('processing');
        setTimeout(() => {
            setView('success-sell');
        }, 2000);
    };

    if (view === 'processing') {
        return (
            <div style={styles.loadingOverlay}>
                <div className="spinner" />
                <h2 style={{ color: 'white' }}>{selectedProduct ? `Processing Payment for ${selectedProduct.name}...` : 'Listing Your Product...'}</h2>
                <p style={{ color: '#cbd5e1' }}>{selectedProduct ? 'Connecting to BharatQR Gateway' : 'Syncing with Gram Panchayat Node'}</p>
                <style jsx>{`
                    .spinner { border: 4px solid rgba(255,255,255,0.1); border-top: 4px solid white; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; }
                    @keyframes spin { 100% { transform: rotate(360deg); } }
                `}</style>
            </div>
        );
    }

    if (view === 'success-buy') {
        return (
            <div style={styles.container}>
                <div style={styles.receiptCard}>
                    <CheckCircle size={64} color="#16a34a" />
                    <h2 style={{ margin: '1rem 0' }}>Order Placed Successfully!</h2>
                    <div style={styles.receiptLine}><span>Transaction ID:</span> <span>#GB-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span></div>
                    <div style={styles.receiptLine}><span>Product:</span> <span>{selectedProduct?.name}</span></div>
                    <div style={styles.receiptLine}><span>Seller:</span> <span>{selectedProduct?.seller}</span></div>
                    <div style={styles.receiptLine}><span>Amount Paid:</span> <span style={{ fontWeight: 'bold', color: '#ea580c' }}>₹{selectedProduct?.price}</span></div>
                    <div style={styles.receiptLine}><span>Delivery:</span> <span>To SUVIDHA Kiosk (within 3 days)</span></div>

                    <button onClick={() => setShowReceipt(true)} style={styles.doneBtn}>
                        <Printer size={18} /> View Digital Receipt
                    </button>
                    <button onClick={() => setView('list')} style={styles.backBtn}>Return to Bazaar</button>
                </div>

                {showReceipt && (
                    <Receipt
                        type="Gram Bazaar Purchase"
                        transactionId={`GB-ORD-${Date.now()}`}
                        amount={selectedProduct?.price}
                        customerName="Citizen Buyer"
                        details={{
                            'Product': selectedProduct?.name,
                            'Seller': selectedProduct?.seller,
                            'Kiosk Node': 'GB-KN-4421',
                            'Delivery Type': 'Kiosk Pickup'
                        }}
                        onClose={() => setShowReceipt(false)}
                    />
                )}
            </div>
        );
    }

    if (view === 'success-sell') {
        return (
            <div style={styles.container}>
                <div style={styles.receiptCard}>
                    <CheckCircle size={64} color="#ea580c" />
                    <h2 style={{ margin: '1rem 0' }}>Product Listed!</h2>
                    <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Your product is now live on the global SUVIDHA marketplace.</p>
                    <div style={styles.receiptLine}><span>Listing ID:</span> <span>#GB-LIST-{Math.random().toString(16).substr(2, 6).toUpperCase()}</span></div>
                    <div style={styles.receiptLine}><span>Verification:</span> <span style={{ color: '#16a34a' }}>AI Approved</span></div>

                    <button onClick={() => setView('list')} style={styles.doneBtn}>
                        Continue Listing Items
                    </button>
                    <button onClick={() => router.push('/')} style={styles.backBtn}>Back to Home</button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => view === 'sell' ? setView('list') : router.back()} style={styles.headerBackBtn}>
                    <ArrowLeft size={32} />
                </button>
                <ShoppingBag size={48} color="#ea580c" />
                <div>
                    <h1 style={styles.title}>Gram Bazaar</h1>
                    <p style={styles.subtitle}>Direct from Village to World | Vocal for Local</p>
                </div>
            </div>

            {view === 'list' ? (
                <>
                    <div style={styles.actions}>
                        <button onClick={() => setView('sell')} style={styles.sellBtn}>
                            <Plus size={20} /> Sell Your Product
                        </button>
                    </div>

                    <div style={styles.grid}>
                        {PRODUCTS.map(product => (
                            <div key={product.id} style={styles.card}>
                                <div style={styles.imagePlaceholder}>
                                    <Tag size={40} color="#cbd5e1" />
                                </div>
                                <div style={styles.cardContent}>
                                    <h3 style={styles.productName}>{product.name}</h3>
                                    <p style={styles.seller}>By {product.seller}</p>
                                    <div style={styles.priceRow}>
                                        <span style={styles.price}>₹{product.price}</span>
                                        <button
                                            onClick={() => handleBuy(product)}
                                            style={styles.buyBtn}
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div style={styles.sellFormCard}>
                    <div style={styles.sellHeader}>
                        <Camera size={60} color="#ea580c" />
                        <h3>List New Product</h3>
                    </div>

                    <div style={styles.cameraSim}>
                        <ImageIcon size={48} color="#94a3b8" />
                        <p>Camera Simulation Active</p>
                        <button style={styles.captureBtnSim}>Capture Product Photo</button>
                    </div>

                    <div style={styles.formFields}>
                        <div style={styles.field}>
                            <label style={styles.label}>Product Name</label>
                            <input placeholder="Ex: Hand-woven Shawl" style={styles.input} readOnly value="Assam Silk Scarf" />
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>Price (₹)</label>
                            <input style={styles.input} readOnly value="1450" />
                        </div>
                    </div>

                    <button onClick={handleSellSubmit} style={styles.listBtn}>
                        List on SUVIDHA Network
                    </button>
                </div>
            )}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
    header: {
        display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem',
        backgroundColor: 'white', padding: '2rem', borderRadius: '15px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', borderLeft: '6px solid #ea580c',
    },
    headerBackBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#ea580c', padding: '0.5rem' },
    title: { fontSize: '2rem', fontWeight: 'bold', color: '#1e293b', margin: 0 },
    subtitle: { color: '#64748b', marginTop: '0.5rem' },
    actions: { display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' },
    sellBtn: {
        display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem',
        backgroundColor: '#ea580c', color: 'white', border: 'none', borderRadius: '10px',
        fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(234, 88, 12, 0.3)',
    },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' },
    card: { backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column' },
    imagePlaceholder: { height: '200px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    cardContent: { padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' },
    productName: { margin: '0 0 0.5rem 0', color: '#1e293b' },
    seller: { color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' },
    priceRow: { marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    price: { fontSize: '1.4rem', fontWeight: 'bold', color: '#ea580c' },
    buyBtn: { padding: '0.5rem 1rem', backgroundColor: '#1e293b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    loadingOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.9)', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' },
    receiptCard: { backgroundColor: 'white', padding: '3rem', borderRadius: '20px', maxWidth: '500px', margin: '2rem auto', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' },
    receiptLine: { display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px dashed #e2e8f0', color: '#475569' },
    doneBtn: { marginTop: '2rem', width: '100%', padding: '1rem', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' },
    backBtn: { marginTop: '1rem', width: '100%', padding: '1rem', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' },
    sellFormCard: { backgroundColor: 'white', padding: '3rem', borderRadius: '2rem', boxShadow: 'var(--card-shadow)', maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' },
    sellHeader: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
    cameraSim: { height: '300px', background: '#f8fafc', border: '3px dashed #cbd5e1', borderRadius: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' },
    captureBtnSim: { padding: '0.75rem 1.5rem', borderRadius: '50px', background: 'white', border: '2px solid #ea580c', color: '#ea580c', fontWeight: 'bold', cursor: 'pointer' },
    formFields: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    field: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    label: { fontWeight: 'bold', color: '#475569' },
    input: { padding: '1rem', fontSize: '1.2rem', borderRadius: '0.5rem', border: '2px solid #e2e8f0', background: '#f8fafc' },
    listBtn: { padding: '1.5rem', background: '#ea580c', color: 'white', border: 'none', borderRadius: '1rem', fontSize: '1.3rem', fontWeight: 'bold', cursor: 'pointer' }
};
