'use client';

import React from 'react';
import { Printer, Download, X } from 'lucide-react';

interface PrintReceiptProps {
    receiptData: {
        transactionId: string;
        service: string;
        amount: string;
        date: string;
        consumerNumber?: string;
        status: string;
    };
    mode?: 'view' | 'print';
    onClose: () => void;
}

export default function PrintReceipt({ receiptData, mode = 'view', onClose }: PrintReceiptProps) {
    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        // Generate PDF download (simplified version)
        const printContent = document.getElementById('print-receipt-content');
        if (printContent) {
            const printWindow = window.open('', '', 'height=600,width=800');
            if (printWindow) {
                printWindow.document.write('<html><head><title>Receipt</title>');
                printWindow.document.write('<style>body{font-family:Arial;padding:20px;}</style>');
                printWindow.document.write('</head><body>');
                printWindow.document.write(printContent.innerHTML);
                printWindow.document.write('</body></html>');
                printWindow.document.close();
                printWindow.print();
            }
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <button onClick={onClose} style={styles.closeBtn}>
                    <X size={24} />
                </button>

                <div id="print-receipt-content" style={styles.receipt}>
                    {/* Header */}
                    <div style={styles.header}>
                        <div style={styles.emblem}>🇮🇳</div>
                        <h1 style={styles.title}>Government of India</h1>
                        <h2 style={styles.subtitle}>SUVIDHA Kiosk Services</h2>
                        <p style={styles.tagline}>Digital India Initiative</p>
                    </div>

                    {/* Receipt Details */}
                    <div style={styles.details}>
                        <div style={styles.row}>
                            <span style={styles.label}>Transaction ID:</span>
                            <span style={styles.value}>{receiptData.transactionId}</span>
                        </div>
                        <div style={styles.row}>
                            <span style={styles.label}>Service:</span>
                            <span style={styles.value}>{receiptData.service}</span>
                        </div>
                        {receiptData.consumerNumber && (
                            <div style={styles.row}>
                                <span style={styles.label}>Consumer Number:</span>
                                <span style={styles.value}>{receiptData.consumerNumber}</span>
                            </div>
                        )}
                        <div style={styles.row}>
                            <span style={styles.label}>Amount:</span>
                            <span style={styles.value}>₹{receiptData.amount}</span>
                        </div>
                        <div style={styles.row}>
                            <span style={styles.label}>Date & Time:</span>
                            <span style={styles.value}>{receiptData.date}</span>
                        </div>
                        <div style={styles.row}>
                            <span style={styles.label}>Status:</span>
                            <span style={{ ...styles.value, color: '#10b981', fontWeight: 700 }}>
                                {receiptData.status}
                            </span>
                        </div>
                    </div>

                    {/* QR Code Placeholder */}
                    <div style={styles.qrSection}>
                        <div style={styles.qrCode}>
                            <div style={styles.qrPattern}></div>
                        </div>
                        <p style={styles.qrText}>Scan for digital copy</p>
                    </div>

                    {/* Footer */}
                    <div style={styles.footer}>
                        <p>This is a computer-generated receipt and does not require a signature.</p>
                        <p>For queries, visit www.suvidha.gov.in or call 1800-XXX-XXXX</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={styles.actions} className="no-print">
                    {mode === 'view' ? (
                        <>
                            <button onClick={onClose} style={styles.closeActionBtn}>
                                Close
                            </button>
                            <button onClick={handlePrint} style={styles.printBtn}>
                                <Printer size={20} />
                                Print Receipt
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={handlePrint} style={styles.printBtn}>
                                <Printer size={20} />
                                Print Receipt
                            </button>
                            <button onClick={handleDownload} style={styles.downloadBtn}>
                                <Download size={20} />
                                Download PDF
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
    },
    modal: {
        background: 'white',
        borderRadius: '1.5rem',
        padding: '2rem',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative',
    },
    closeBtn: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        background: '#f1f5f9',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 1,
    },
    receipt: {
        padding: '2rem',
        background: 'white',
    },
    header: {
        textAlign: 'center',
        borderBottom: '3px solid #1e293b',
        paddingBottom: '1.5rem',
        marginBottom: '2rem',
    },
    emblem: {
        fontSize: '3rem',
        marginBottom: '0.5rem',
    },
    title: {
        fontSize: '1.8rem',
        fontWeight: 900,
        margin: '0 0 0.5rem 0',
        color: '#1e293b',
    },
    subtitle: {
        fontSize: '1.2rem',
        fontWeight: 700,
        margin: '0 0 0.25rem 0',
        color: 'var(--primary)',
    },
    tagline: {
        fontSize: '0.9rem',
        color: '#64748b',
        margin: 0,
    },
    details: {
        marginBottom: '2rem',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.75rem 0',
        borderBottom: '1px solid #f1f5f9',
    },
    label: {
        fontWeight: 600,
        color: '#64748b',
    },
    value: {
        fontWeight: 700,
        color: '#1e293b',
    },
    qrSection: {
        textAlign: 'center',
        margin: '2rem 0',
    },
    qrCode: {
        width: '120px',
        height: '120px',
        margin: '0 auto 1rem auto',
        background: '#f8fafc',
        border: '2px solid #e2e8f0',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    qrPattern: {
        width: '100%',
        height: '100%',
        background: 'repeating-linear-gradient(45deg, #e2e8f0 0px, #e2e8f0 5px, #f8fafc 5px, #f8fafc 10px)',
    },
    qrText: {
        fontSize: '0.85rem',
        color: '#64748b',
        margin: 0,
    },
    footer: {
        textAlign: 'center',
        paddingTop: '1.5rem',
        borderTop: '2px solid #f1f5f9',
        fontSize: '0.8rem',
        color: '#94a3b8',
    },
    actions: {
        display: 'flex',
        gap: '1rem',
        marginTop: '2rem',
    },
    printBtn: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '1rem',
        background: 'var(--primary)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1rem',
        fontWeight: 700,
        cursor: 'pointer',
    },
    downloadBtn: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '1rem',
        background: '#f1f5f9',
        color: '#1e293b',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1rem',
        fontWeight: 700,
        cursor: 'pointer',
    },
    closeActionBtn: {
        flex: 1,
        padding: '1rem',
        background: '#f1f5f9',
        color: '#64748b',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1rem',
        fontWeight: 700,
        cursor: 'pointer',
    }
};
