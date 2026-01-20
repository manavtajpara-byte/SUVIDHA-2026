// Example usage of PrintReceipt component

import PrintReceipt from '@/components/PrintReceipt';

// For VIEW mode (just display the receipt)
<PrintReceipt
    mode="view"
    receiptData={{
        transactionId: "TXN123456789",
        service: "Electricity Bill Payment",
        amount: "1,250.00",
        date: "20 Jan 2026, 09:45 PM",
        consumerNumber: "ELEC-2024-001234",
        status: "Success"
    }}
    onClose={() => setShowReceipt(false)}
/>

// For PRINT mode (with print and download options)
<PrintReceipt
    mode="print"
    receiptData={{
        transactionId: "TXN123456789",
        service: "Electricity Bill Payment",
        amount: "1,250.00",
        date: "20 Jan 2026, 09:45 PM",
        consumerNumber: "ELEC-2024-001234",
        status: "Success"
    }}
    onClose={() => setShowReceipt(false)}
/>
