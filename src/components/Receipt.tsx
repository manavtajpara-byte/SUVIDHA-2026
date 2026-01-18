'use client';

import React, { useRef } from 'react';
import { X, Printer, Download, Share2 } from 'lucide-react';

interface ReceiptProps {
    type: string;
    transactionId: string;
    amount?: number;
    customerName: string;
    customerMobile?: string;
    details: Record<string, string>;
    onClose: () => void;
}

export default function Receipt({ type, transactionId, amount, customerName, customerMobile, details, onClose }: ReceiptProps) {
    const receiptRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow && receiptRef.current) {
            printWindow.document.write(`
        <html>
          <head>
            <title>e-Receipt - ${transactionId}</title>
            <style>
              body { font-family: 'Times New Roman', Times, serif; padding: 20px; background: white; }
              .receipt-container { border: 2px solid #000; padding: 2px; max-width: 800px; margin: 0 auto; position: relative; }
              .inner-border { border: 1px solid #000; padding: 20px; min-height: 800px; position: relative; }
              .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
              .emblem { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
              .govt-title { font-size: 18px; text-transform: uppercase; font-weight: bold; margin-bottom: 5px; }
              .dept-title { font-size: 14px; font-weight: bold; margin-bottom: 15px; }
              .receipt-title { font-size: 16px; font-weight: bold; text-decoration: underline; margin-bottom: 20px; text-align: center; }
              .row { display: flex; margin-bottom: 10px; border-bottom: 1px dotted #ccc; padding-bottom: 5px; }
              .label { flex: 1; font-weight: bold; font-size: 14px; }
              .value { flex: 2; font-size: 14px; }
              .amount-box { margin-top: 30px; border: 1px solid #000; padding: 10px; text-align: center; font-weight: bold; font-size: 18px; background: #f0f0f0; }
              .footer { margin-top: 50px; text-align: center; font-size: 12px; }
              .watermark { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 100px; color: rgba(0,0,0,0.03); z-index: -1; font-weight: bold; white-space: nowrap; }
              .barcode-sim { text-align: center; margin-top: 20px; font-family: 'Courier New', monospace; letter-spacing: 5px; }
              .stamp-box { display: flex; justify-content: space-between; margin-top: 60px; padding: 0 40px; }
              .stamp { text-align: center; }
              .disclaimer { font-size: 10px; margin-top: 20px; text-align: center; font-style: italic; }
              @media print { .no-print { display: none; } }
            </style>
          </head>
          <body>
            ${receiptRef.current.innerHTML}
            <script>
              window.onload = () => { window.print(); setTimeout(() => window.close(), 100); };
            </script>
          </body>
        </html>
      `);
            printWindow.document.close();
        }
    };

    const getDepartment = () => {
        switch (type) {
            case 'electricity': return 'DEPARTMENT OF ENERGY';
            case 'gas': return 'MINISTRY OF PETROLEUM & NATURAL GAS';
            case 'municipal': return 'MUNICIPAL CORPORATION';
            case 'ration': return 'DEPT. OF FOOD & PUBLIC DISTRIBUTION';
            case 'property-tax': return 'REVENUE DEPARTMENT';
            default: return 'GOVERNMENT SERVICES DEPARTMENT';
        }
    };

    const grn = `GRN${Math.floor(Math.random() * 10000000000)}`;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <button onClick={onClose} style={styles.closeBtn} className="no-print">
                    <X size={24} color="#000" />
                </button>

                <div ref={receiptRef} style={{ background: 'white', color: 'black' }}>
                    <div className="receipt-container" style={{ border: '2px solid #000', padding: '2px' }}>
                        <div className="inner-border" style={{ border: '1px solid #000', padding: '25px', position: 'relative' }}>

                            <div className="watermark" style={{
                                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-45deg)',
                                fontSize: '80px', color: 'rgba(0,0,0,0.04)', fontWeight: 'bold', zIndex: 0, pointerEvents: 'none'
                            }}>
                                GOVT OF INDIA
                            </div>

                            {/* Header */}
                            <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '15px', marginBottom: '20px' }}>
                                <div style={{ fontSize: '32px', marginBottom: '5px' }}>🏛️</div>
                                <div style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }}>Government of India</div>
                                <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>{getDepartment()}</div>
                                <div style={{ fontSize: '12px' }}>Official E-Receipt / Challan</div>
                            </div>

                            {/* Transaction Info */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '12px' }}>
                                <div>
                                    <strong>GRN No:</strong> {grn}<br />
                                    <strong>Date:</strong> {new Date().toLocaleDateString('en-IN')}<br />
                                    <strong>Time:</strong> {new Date().toLocaleTimeString('en-IN')}
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <strong>Receipt No:</strong> {transactionId}<br />
                                    <strong>Place:</strong> SUVIDHA KIOSK #402<br />
                                    <strong>Mode:</strong> ONLINE/KIOSK
                                </div>
                            </div>

                            <div style={{ textAlign: 'center', fontSize: '16px', fontWeight: 'bold', textDecoration: 'underline', marginBottom: '25px' }}>
                                PAYMENT ACKNOWLEDGEMENT
                            </div>

                            {/* Details Table */}
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '14px' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ccc', fontWeight: 'bold', width: '40%' }}>Payee Name</td>
                                        <td style={{ padding: '8px', border: '1px solid #ccc' }}>{customerName}</td>
                                    </tr>
                                    {customerMobile && (
                                        <tr>
                                            <td style={{ padding: '8px', border: '1px solid #ccc', fontWeight: 'bold' }}>Mobile Number</td>
                                            <td style={{ padding: '8px', border: '1px solid #ccc' }}>{customerMobile}</td>
                                        </tr>
                                    )}
                                    {Object.entries(details).map(([key, value]) => (
                                        <tr key={key}>
                                            <td style={{ padding: '8px', border: '1px solid #ccc', fontWeight: 'bold' }}>{key}</td>
                                            <td style={{ padding: '8px', border: '1px solid #ccc' }}>{value}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ccc', fontWeight: 'bold' }}>Purpose</td>
                                        <td style={{ padding: '8px', border: '1px solid #ccc' }}>Bill Payment / Service Charge</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Amount Box */}
                            {amount && (
                                <div style={{
                                    marginTop: '10px',
                                    border: '2px solid #000',
                                    padding: '15px',
                                    textAlign: 'center',
                                    background: '#f8f8f8'
                                }}>
                                    <div style={{ fontSize: '14px', marginBottom: '5px' }}>Total Amount Paid</div>
                                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>₹ {amount.toFixed(2)}</div>
                                    <div style={{ fontSize: '12px', fontStyle: 'italic', marginTop: '5px' }}>
                                        (Rupees {amount} Only)
                                    </div>
                                </div>
                            )}

                            {/* Signatures */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '60px', padding: '0 20px' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ borderBottom: '1px solid #000', width: '150px', marginBottom: '5px' }}></div>
                                    <div style={{ fontSize: '12px', fontWeight: 'bold' }}>Payer Signature</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: '80px', height: '80px', border: '2px solid #065f46', borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto',
                                        color: '#065f46', fontWeight: 'bold', fontSize: '12px', transform: 'rotate(-5deg)'
                                    }}>
                                        <div style={{ textAlign: 'center' }}>
                                            PAID<br />
                                            <span style={{ fontSize: '10px' }}>SUVIDHA</span>
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '12px', fontWeight: 'bold' }}>Authorized Signatory</div>
                                </div>
                            </div>

                            {/* Barcode Mock */}
                            <div style={{ textAlign: 'center', marginTop: '40px', fontFamily: 'monospace', letterSpacing: '4px', fontSize: '16px' }}>
                                ||| || ||| || |||| ||| || |||
                                <div style={{ fontSize: '10px', letterSpacing: '1px', marginTop: '5px' }}>{transactionId}</div>
                            </div>

                            {/* Disclaimer */}
                            <div style={{ fontSize: '10px', textAlign: 'center', marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
                                This is a computer generated receipt. Signature is not mandatory for online verification.<br />
                                For verification, visit https://suvidha.gov.in/verify with GRN No: {grn}
                            </div>

                        </div>
                    </div>
                </div>

                <div style={styles.actions} className="no-print">
                    <button onClick={handlePrint} style={styles.actionBtn}>
                        <Printer size={20} /> Convert to PDF / Print
                    </button>
                    <button onClick={() => { }} style={{ ...styles.actionBtn, background: 'none', border: '1px solid #ccc', color: '#666' }}>
                        <Share2 size={20} /> SMS
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 9999,
        padding: '20px'
    },
    modal: {
        backgroundColor: '#333',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '95vh',
        overflowY: 'auto',
        position: 'relative'
    },
    closeBtn: {
        position: 'absolute', top: '10px', right: '10px',
        backgroundColor: 'white',
        borderRadius: '50%',
        border: 'none',
        width: '30px', height: '30px',
        cursor: 'pointer',
        zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    actions: {
        display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px'
    },
    actionBtn: {
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#2563eb',
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold'
    }
};
