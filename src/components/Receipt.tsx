'use client';

import React from 'react';
import { useAppState } from '@/context/StateContext';
import { ShieldCheck, Printer, Download, Share2, X, Landmark } from 'lucide-react';

interface ReceiptProps {
    type: string;
    transactionId: string;
    amount?: number;
    customerName: string;
    details: Record<string, string | number>;
    onClose: () => void;
    autoPrint?: boolean; // New prop to trigger print immediately
}

export default function Receipt({ type, transactionId, amount, customerName, details, onClose, autoPrint = false }: ReceiptProps) {
    const { addToast } = useAppState();

    React.useEffect(() => {
        if (autoPrint) {
            setTimeout(() => window.print(), 500); // Small delay to ensure render
        }
    }, [autoPrint]);

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const content = document.getElementById('receipt-content')?.innerText || '';
        const file = new Blob([`GOVERNMENT OF INDIA - OFFICIAL RECEIPT\n\n${content}\n\nThis is a digital document verified by SUVIDHA.`], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `Receipt-${transactionId}.txt`;
        document.body.appendChild(element);
        element.click();
    };

    const handleShare = () => {
        addToast({ message: `Receipt link sent to ${customerName}'s mobile`, type: 'success' });
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal} className="receipt-modal">
                <div id="receipt-content" style={styles.receiptContainer} className="printable-area">
                    {/* ... content ... */}
                    {/* (I need to preserve the content structure here, so I will target the logic/css first) */}
                    {/* Official Gov Header */}
                    <div style={styles.govHeader}>
                        <Landmark size={40} color="#1e3a8a" />
                        <div style={styles.govHeaderText}>
                            <h3 style={styles.hindiText}>भारत सरकार</h3>
                            <h3 style={styles.englishText}>GOVERNMENT OF INDIA</h3>
                            <p style={styles.deptSub}>डिजिटल इंडिया पोर्टल | SUVIDHA KIOSK</p>
                        </div>
                        <div style={styles.indiaFlag}>
                            <div style={{ ...styles.flagStrip, backgroundColor: '#FF9933' }} />
                            <div style={{ ...styles.flagStrip, backgroundColor: '#FFFFFF' }}>
                                <div style={styles.ashokaChakra} />
                            </div>
                            <div style={{ ...styles.flagStrip, backgroundColor: '#138808' }} />
                        </div>
                    </div>

                    <div style={styles.titleBar}>
                        <h2 style={styles.receiptTitle}>आधिकारिक भुगतान रसीद / OFFICIAL PAYMENT RECEIPT</h2>
                    </div>

                    <div style={styles.mainInfo}>
                        <div style={styles.infoRow}>
                            <div style={styles.infoBox}>
                                <label style={styles.metaLabel}>Receipt Number / रसीद संख्या</label>
                                <span style={styles.metaValue}>{transactionId}</span>
                            </div>
                            <div style={styles.infoBox}>
                                <label style={styles.metaLabel}>Date of Issue / जारी करने की तिथि</label>
                                <span style={styles.metaValue}>{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                            </div>
                        </div>

                        <div style={styles.divider} />

                        <div style={styles.detailsSection}>
                            <div style={styles.field}>
                                <span style={styles.key}>Customer Name / उपभोक्ता का नाम:</span>
                                <span style={styles.val}>{customerName}</span>
                            </div>
                            <div style={styles.field}>
                                <span style={styles.key}>Service Type / सेवा का प्रकार:</span>
                                <span style={styles.val}>{type.toUpperCase()}</span>
                            </div>

                            {Object.entries(details).map(([key, value]) => (
                                <div key={key} style={styles.field}>
                                    <span style={styles.key}>{key}:</span>
                                    <span style={styles.val}>{value}</span>
                                </div>
                            ))}
                        </div>

                        {amount && (
                            <div style={styles.amountSection}>
                                <div style={styles.amountBox}>
                                    <label>Total Amount Paid / कुल भुगतान:</label>
                                    <h4 style={styles.amountText}>₹ {amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h4>
                                </div>
                                <div style={styles.statusBox}>
                                    <ShieldCheck size={24} color="#059669" />
                                    <span style={styles.statusText}>VERIFIED</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div style={styles.footerGov}>
                        <p style={styles.footerNote}>This is a system-generated electronic receipt issued by the SUVIDHA Common Service Center. No signature is required.</p>
                        <p style={styles.footerUrl}>Verify at: https://suvidha.gov.in/verify/{transactionId}</p>
                    </div>
                </div>

                <div style={styles.actions} className="no-print">
                    <button onClick={handlePrint} style={{ ...styles.btnAction, ...styles.btnPrintPrimary }} title="Print Receipt">
                        <Printer size={20} />
                        <span>Print Receipt</span>
                    </button>
                    <button onClick={handleDownload} style={styles.btnAction} title="Download PDF">
                        <Download size={20} />
                        <span>Download</span>
                    </button>
                    <button onClick={handleShare} style={styles.btnAction} title="Share Receipt">
                        <Share2 size={20} />
                        <span>Share</span>
                    </button>
                    <button onClick={onClose} style={styles.btnClose} title="Close">
                        <X size={20} />
                        <span>Close</span>
                    </button>
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .printable-area, .printable-area * {
                        visibility: visible;
                    }
                    .printable-area {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        margin: 0;
                        padding: 0;
                        box-shadow: none !important;
                    }
                    .no-print { display: none !important; }
                    /* Ensure background graphics print */
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                }
            `}</style>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 5000, padding: '1rem'
    },
    modal: {
        backgroundColor: 'white', borderRadius: '1.5rem',
        width: '95%', maxWidth: '600px',
        maxHeight: '90vh', // Prevent overflow off screen
        overflow: 'hidden', boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)',
        display: 'flex', flexDirection: 'column'
    },
    receiptContainer: {
        padding: '2rem', backgroundColor: '#fff',
        fontFamily: '"Times New Roman", Times, serif', color: '#1a1a1a',
        overflowY: 'auto', // Enable internal scrolling
        flex: 1, // Take available space
    },
    govHeader: {
        display: 'flex', alignItems: 'center', gap: '1.5rem',
        marginBottom: '2rem', borderBottom: '2px solid #1e3a8a',
        paddingBottom: '1rem'
    },
    govHeaderText: { flex: 1 },
    hindiText: { margin: 0, fontSize: '1.4rem', fontWeight: 900, color: '#1e3a8a' },
    englishText: { margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#1e3a8a', letterSpacing: '1px' },
    deptSub: { margin: '4px 0 0', fontSize: '0.8rem', fontWeight: 700, color: '#475569' },
    indiaFlag: { display: 'flex', flexDirection: 'column', width: '60px', height: '40px', border: '1px solid #ddd' },
    flagStrip: { flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    ashokaChakra: {
        width: '10px', height: '10px', borderRadius: '50%', border: '1px solid #000080',
        position: 'relative'
    },
    titleBar: {
        textAlign: 'center', backgroundColor: '#f1f5f9',
        padding: '0.5rem', margin: '1rem 0 2rem'
    },
    receiptTitle: { margin: 0, fontSize: '0.9rem', fontWeight: 800, color: '#334155' },
    mainInfo: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    infoRow: { display: 'flex', gap: '2rem' },
    infoBox: { flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' },
    metaLabel: { fontSize: '0.75rem', fontWeight: 700, opacity: 0.6, textTransform: 'uppercase' },
    metaValue: { fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.5px' },
    divider: { borderBottom: '1px solid #e2e8f0' },
    detailsSection: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    field: { display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem' },
    key: { fontWeight: 600, color: '#64748b' },
    val: { fontWeight: 700, color: '#1e293b' },
    amountSection: {
        marginTop: '1rem', padding: '1.5rem',
        backgroundColor: '#f8fafc', borderRadius: '1rem',
        borderLeft: '5px solid #1e3a8a',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    },
    amountBox: { display: 'flex', flexDirection: 'column', gap: '4px' },
    amountText: { margin: 0, fontSize: '2.2rem', fontWeight: 900, color: '#1e3a8a' },
    statusBox: { display: 'flex', alignItems: 'center', gap: '6px' },
    statusText: { fontSize: '0.9rem', fontWeight: 900, color: '#059669' },
    footerGov: { marginTop: '3rem', textAlign: 'center', borderTop: '1px solid #e5e7eb', paddingTop: '1rem' },
    footerNote: { fontSize: '0.7rem', opacity: 0.6, margin: '0 0 10px' },
    footerUrl: { fontSize: '0.7rem', fontWeight: 700, color: '#3b82f6', margin: 0 },
    actions: {
        padding: '1rem', backgroundColor: '#f8fafc',
        display: 'flex', gap: '0.5rem', justifyContent: 'center',
        borderTop: '1px solid #e2e8f0',
        flexWrap: 'wrap', // Allow wrapping on small screens
        flexShrink: 0, // Prevent shrinking
    },
    btnAction: {
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.75rem 1.5rem', borderRadius: '0.75rem',
        border: '1px solid #e2e8f0', backgroundColor: 'white',
        fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s'
    },
    btnPrintPrimary: {
        backgroundColor: 'var(--primary)',
        color: 'white',
        border: 'none',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        transform: 'scale(1.05)',
    },
    btnClose: {
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.75rem 1.5rem', borderRadius: '0.75rem',
        border: 'none', backgroundColor: '#ef4444', color: 'white',
        fontWeight: 700, cursor: 'pointer'
    }
};
