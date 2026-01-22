export default function Loading() {
    return (
        <div style={styles.container}>
            <div className="loader-chakra" style={styles.spinner}></div>
            <p style={styles.text}>Loading Services... / लोड हो रहा है...</p>

            <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .loader-chakra {
          animation: spin 1s linear infinite;
        }
      `}</style>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
    },
    spinner: {
        width: '60px',
        height: '60px',
        border: '6px solid #e5e7eb',
        borderTop: '6px solid var(--primary)',
        borderRadius: '50%',
    },
    text: {
        color: '#6b7280',
        fontWeight: 500,
        fontSize: '1.1rem',
    }
};
