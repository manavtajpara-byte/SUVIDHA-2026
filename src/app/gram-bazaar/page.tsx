'use client';

import React from 'react';
import { ShoppingBag, Camera, Tag } from 'lucide-react';
import Image from 'next/image';

const PRODUCTS = [
    { id: 1, name: 'Madhubani Painting', price: '₹1,200', seller: 'Priya Arts', image: 'https://placehold.co/400x300/orange/white?text=Art' },
    { id: 2, name: 'Organic Wild Honey', price: '₹450', seller: 'Tribal Co-op', image: 'https://placehold.co/400x300/yellow/black?text=Honey' },
    { id: 3, name: 'Handloom Saree', price: '₹2,500', seller: 'Weavers Guild', image: 'https://placehold.co/400x300/purple/white?text=Saree' },
    { id: 4, name: 'Bamboo Basket Set', price: '₹800', seller: 'Green Crafts', image: 'https://placehold.co/400x300/green/white?text=Bamboo' },
    { id: 5, name: 'Terracotta Pots', price: '₹300', seller: 'Potters Wheel', image: 'https://placehold.co/400x300/brown/white?text=Pots' },
    { id: 6, name: 'Pickle Jar (1kg)', price: '₹250', seller: 'Grandma Recipes', image: 'https://placehold.co/400x300/red/white?text=Pickle' },
];

export default function GramBazaarPage() {
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
                            {/* In production would use real images */}
                            <span style={{ opacity: 0.5 }}>Product Image</span>
                        </div>
                        <div style={styles.cardContent}>
                            <h3 style={styles.productName}>{product.name}</h3>
                            <p style={styles.seller}>By {product.seller}</p>
                            <div style={styles.priceRow}>
                                <span style={styles.price}>{product.price}</span>
                                <button style={styles.buyBtn}>Buy Now</button>
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
    }
};
