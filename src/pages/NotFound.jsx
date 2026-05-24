export default function NotFound() {
  return (
    <div style={styles.wrap}>
      <span style={styles.code}>404</span>
      <div style={styles.line} />
      <p style={styles.msg}>Bu sayfa mevcut değil.</p>
    </div>
  )
}

const styles = {
  wrap: {
    minHeight: 'calc(100vh - 64px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
  },
  code: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '8rem',
    color: '#CC2222',
    letterSpacing: '8px',
    lineHeight: 1,
  },
  line: {
    width: '40px',
    height: '3px',
    background: '#CC2222',
  },
  msg: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: '1rem',
    color: '#555',
    letterSpacing: '3px',
    textTransform: 'uppercase',
  },
}
