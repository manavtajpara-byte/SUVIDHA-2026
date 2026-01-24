'use client';

import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, CheckCircle, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Success

    const handlePlaceOrder = () => {
        setStep(3);
    };

    if (step === 3) {
        return (
            <div style={styles.container}>
                <div style={styles.successCard}>
                    <CheckCircle size={80} color="#16a34a" />
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Order Placed!</h2>
                    <p style={{ color: '#64748b', marginBottom: '2rem' }}>Estimated Delivery: 3-5 Business Days</p>

                    <div style={styles.trackingBox}>
                        <h3>Tracking ID: #GB-2026-X99</h3>
                        <div style={styles.timeline}>
                            <div style={styles.timelineItemActive}>Placed</div>
                            <div style={styles.line}></div>
                            <div style={styles.timelineItem}>Shipped</div>
                            <div style={styles.line}></div>
                            <div style={styles.timelineItem}>Delivered</div>
                        </div>
                    </div>

                    <button onClick={() => router.push('/gram-bazaar')} style={styles.homeBtn}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button onClick={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={24} />
                </button>
                <h1 style={styles.title}>Checkout</h1>
            </div>

            <div style={styles.grid}>
                <div style={styles.leftCol}>
                    {/* Address Section */}
                    <div style={styles.card}>
                        <h3 style={styles.sectionTitle}><MapPin size={20} /> Shipping Address</h3>
                        <textarea
                            style={styles.textarea}
                            defaultValue="Village Post Office, Sector 4, \nDist: Varanasi, UP - 221001"
                        />
                    </div>

                    {/* Payment Section */}
                    <div style={styles.card}>
                        <h3 style={styles.sectionTitle}><CreditCard size={20} /> Payment Method</h3>
                        <div style={styles.paymentOptions}>
                            <label style={styles.radioLabel}>
                                <input type="radio" name="payment" defaultChecked />
                                <span>Cash on Delivery (COD)</span>
                            </label>
                            <label style={styles.radioLabel}>
                                <input type="radio" name="payment" />
                                <span>UPI / QR Code</span>
                            </label>
                            <label style={styles.radioLabel}>
                                <input type="radio" name="payment" />
                                <span>Net Banking</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div style={styles.rightCol}>
                    {/* Order Summary */}
                    <div style={styles.summaryCard}>
                        <h3>Order Summary</h3>
                        <div style={styles.summaryRow}>
                            <span>Subtotal (2 Items)</span>
                            <span>₹ 1,650</span>
                        </div>
                        <div style={styles.summaryRow}>
                            <span>Delivery Fee</span>
                            <span>₹ 40</span>
                        </div>
                        <div style={styles.divider}></div>
                        <div style={styles.totalRow}>
                            <span>Total</span>
                            <span>₹ 1,690</span>
                        </div>
                        <button onClick={handlePlaceOrder} style={styles.payBtn}>
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: { padding: '2rem', maxWidth: '1000px', margin: '0 auto' },
    header: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' },
    backBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' },
    title: { margin: 0, fontSize: '2rem', color: '#1e293b' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' },
    leftCol: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    card: { background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
    sectionTitle: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0, marginBottom: '1rem' },
    textarea: { width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', minHeight: '100px', fontSize: '1rem' },
    paymentOptions: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    radioLabel: { display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer' },
    summaryCard: { background: 'white', padding: '1.5rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', height: 'fit-content' },
    summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', color: '#64748b' },
    divider: { height: '1px', background: '#e2e8f0', margin: '1rem 0' },
    totalRow: { display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1.5rem' },
    payBtn: { width: '100%', padding: '1rem', background: '#ea580c', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' },
    successCard: { textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '2rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', maxWidth: '600px', margin: '2rem auto' },
    trackingBox: { background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', margin: '2rem 0' },
    timeline: { display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1rem', gap: '0.5rem' },
    timelineItemActive: { fontWeight: 'bold', color: '#16a34a' },
    timelineItem: { color: '#cbd5e1' },
    line: { flex: 1, height: '2px', background: '#e2e8f0', maxWidth: '50px' },
    homeBtn: { padding: '1rem 2rem', background: '#1e293b', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }
};
