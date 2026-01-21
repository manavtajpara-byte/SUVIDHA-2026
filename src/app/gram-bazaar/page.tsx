'use client';

import React from 'react';
import { ShoppingBag, Camera, Tag, CheckCircle, Printer, X } from 'lucide-react';
import Image from 'next/image';

const PRODUCTS = [
    { id: 1, name: 'Madhubani Painting', price: 1200, seller: 'Priya Arts' },
    { id: 2, name: 'Organic Wild Honey', price: 450, seller: 'Tribal Co-op' },
    { id: 3, name: 'Handloom Saree', price: 2500, seller: 'Weavers Guild' },
    { id: 4, name: 'Bamboo Basket Set', price: 800, seller: 'Green Crafts' },
    { id: 5, name: 'Terracotta Pots', price: 300, seller: 'Potters Wheel' },
    { id: 6, name: 'Pickle Jar (1kg)', price: 250, seller: 'Grandma Recipes' },
];

export default function GramBazaarPage() {
    const [status, setStatus] = React.useState<'idle' | 'processing' | 'success'>('idle');
    const [selectedProduct, setSelectedProduct] = React.useState<any>(null);

    const handleBuy = (product: any) => {
        setSelectedProduct(product);
        setStatus('processing');
        // Simulate Payment
        setTimeout(() => {
            setStatus('success');
        }, 2000);
    };

    if (status === 'processing') {
        return (
            <div style={styles.loadingOverlay}>
                <div className="spinner"></div>
                <h2 style={{ color: 'white' }}>Processing Payment for {selectedProduct?.name}...</h2>
                <p style={{ color: '#cbd5e1' }}>Connecting to BharatQR Gateway</p>
                <style jsx>{`
                    .spinner { border: 4px solid rgba(255,255,255,0.1); border-top: 4px solid white; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; }
                    @keyframes spin { 100% { transform: rotate(360deg); } }
                `}</style>
            </div>
        );
    }

    if (status === 'success') {
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

                    <button onClick={() => setStatus('idle')} style={styles.doneBtn}>
                        <Printer size={18} /> Print Receipt & Return
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <ShoppingBag size={48} color="#ea580c" />
                <div>
                    <h1 style={styles.title}>Gram Bazaar</h1>
                    <p style={styles.subtitle}>Direct from Village to World | Vocal for Local</p>
                </div>
            </div>

            <div style={styles.actions}>
                <button style={styles.sellBtn}>
                    <Camera size={20} /> Sell Your Product
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
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        marginBottom: '2rem',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        borderLeft: '6px solid #ea580c',
    },
    title: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#1e293b',
        margin: 0,
    },
    subtitle: {
        color: '#64748b',
        marginTop: '0.5rem',
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '2rem',
    },
    sellBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '1rem 2rem',
        backgroundColor: '#ea580c', // Orange
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(234, 88, 12, 0.3)',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s',
        display: 'flex',
        flexDirection: 'column',
    },
    imagePlaceholder: {
        height: '200px',
        backgroundColor: '#f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#94a3b8',
        fontWeight: 600,
    },
    cardContent: {
        padding: '1.5rem',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    productName: {
        margin: '0 0 0.5rem 0',
        color: '#1e293b',
    },
    seller: {
        color: '#64748b',
        fontSize: '0.9rem',
        marginBottom: '1rem',
    },
    priceRow: {
        marginTop: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: '1.4rem',
        fontWeight: 'bold',
        color: '#ea580c',
    },
    buyBtn: {
        padding: '0.5rem 1rem',
        backgroundColor: '#1e293b',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    loadingOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
    },
    receiptCard: {
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '20px',
        maxWidth: '500px',
        margin: '2rem auto',
        textAlign: 'center',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    },
    receiptLine: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.75rem 0',
        borderBottom: '1px dashed #e2e8f0',
        color: '#475569',
    },
    doneBtn: {
        marginTop: '2rem',
        width: '100%',
        padding: '1rem',
        backgroundColor: '#16a34a',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
    }
};
