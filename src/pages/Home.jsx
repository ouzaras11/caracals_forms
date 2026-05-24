import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={styles.hero}>
      <div style={styles.content}>
        <img src="/caracals_logo.jpeg" alt="IZTECH Caracals" style={styles.logo} />
        <h1 style={styles.title}>IZTECH CARACALS</h1>
        <p style={styles.subtitle}>İzmir Yüksek Teknoloji Enstitüsü Amerikan Futbolu</p>
        <div style={styles.buttons}>
          <Link to="/tryout" style={styles.btnPrimary}>
            Seçme Formu
          </Link>
          <Link to="/feedback" style={styles.btnSecondary}>
            Öneri Kutusu
          </Link>
        </div>
      </div>
    </div>
  )
}

const styles = {
  hero: {
    minHeight: 'calc(100vh - 64px)',
    background: 'linear-gradient(160deg, #141414 0%, #3a0d0d 50%, #7A1A1A 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: '16px',
  },
  logo: {
    width: '160px',
    height: '160px',
    objectFit: 'contain',
    borderRadius: '12px',
    boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
    marginBottom: '8px',
  },
  title: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: 'clamp(2.4rem, 6vw, 4rem)',
    fontWeight: 700,
    letterSpacing: '0.12em',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: '1.1rem',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: '0.04em',
    marginBottom: '16px',
  },
  buttons: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '8px',
  },
  btnPrimary: {
    fontFamily: "'Oswald', sans-serif",
    fontWeight: 600,
    fontSize: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    textDecoration: 'none',
    padding: '14px 36px',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #CC2222, #ff4444)',
    color: '#ffffff',
    boxShadow: '0 4px 20px rgba(204,34,34,0.45)',
    transition: 'transform 0.15s, box-shadow 0.15s',
  },
  btnSecondary: {
    fontFamily: "'Oswald', sans-serif",
    fontWeight: 600,
    fontSize: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    textDecoration: 'none',
    padding: '14px 36px',
    borderRadius: '8px',
    background: 'transparent',
    color: '#ffffff',
    border: '2px solid rgba(255,255,255,0.5)',
    transition: 'transform 0.15s, border-color 0.15s',
  },
}
