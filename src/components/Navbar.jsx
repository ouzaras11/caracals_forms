export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <img src="/caracals_logo.jpeg" alt="Caracals" style={styles.logo} />
        <span style={styles.brandText}>IZTECH CARACALS</span>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 32px',
    background: 'rgba(10,10,10,0.95)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid #1a1a1a',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logo: {
    height: '38px',
    width: '38px',
    objectFit: 'contain',
    borderRadius: '2px',
  },
  brandText: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontWeight: 400,
    fontSize: '1.4rem',
    letterSpacing: '0.15em',
    color: '#e0e0e0',
  },
}
