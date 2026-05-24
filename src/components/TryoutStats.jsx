import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'

const RED_DARK = '#CC2222'
const RED = '#e02828'
const PALETTE = ['#CC2222', '#e05555', '#ff8080', '#a82828', '#b83030', '#7A1A1A', '#ff6060', '#f04040']

function bucketHeight(data) {
  const ranges = [
    { label: '<170', min: 0, max: 170 },
    { label: '170–175', min: 170, max: 175 },
    { label: '175–180', min: 175, max: 180 },
    { label: '180–185', min: 180, max: 185 },
    { label: '185–190', min: 185, max: 190 },
    { label: '>190', min: 190, max: 999 },
  ]
  return ranges.map(r => ({
    label: r.label,
    count: data.filter(d => {
      const v = parseInt(d.boy)
      return v >= r.min && v < r.max
    }).length,
  })).filter(r => r.count > 0)
}

function bucketWeight(data) {
  const ranges = [
    { label: '<70', min: 0, max: 70 },
    { label: '70–80', min: 70, max: 80 },
    { label: '80–90', min: 80, max: 90 },
    { label: '90–100', min: 90, max: 100 },
    { label: '>100', min: 100, max: 999 },
  ]
  return ranges.map(r => ({
    label: r.label,
    count: data.filter(d => {
      const v = parseInt(d.kilo)
      return v >= r.min && v < r.max
    }).length,
  })).filter(r => r.count > 0)
}

function extractYear(sinif_bolum) {
  const s = (sinif_bolum || '').toLowerCase()
  if (s.includes('hazırlık') || s.includes('hazirlik') || s.includes('prep')) return 'Hazırlık'
  if (s.includes('1.') || s.startsWith('1 ') || s.includes('1. sınıf') || s.includes('birinci')) return '1. Sınıf'
  if (s.includes('2.') || s.startsWith('2 ') || s.includes('2. sınıf') || s.includes('ikinci')) return '2. Sınıf'
  if (s.includes('3.') || s.startsWith('3 ') || s.includes('3. sınıf') || s.includes('üçüncü')) return '3. Sınıf'
  if (s.includes('4.') || s.startsWith('4 ') || s.includes('4. sınıf') || s.includes('dördüncü')) return '4. Sınıf'
  return 'Diğer'
}

function bucketClass(data) {
  const ORDER = ['Hazırlık', '1. Sınıf', '2. Sınıf', '3. Sınıf', '4. Sınıf', 'Diğer']
  const counts = {}
  data.forEach(d => {
    const key = extractYear(d.sinif_bolum)
    counts[key] = (counts[key] || 0) + 1
  })
  return ORDER.filter(k => counts[k]).map(k => ({ label: k, count: counts[k] }))
}

function StatCard({ title, children }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>{title}</h3>
      {children}
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={styles.tooltip}>
      <p style={styles.tooltipLabel}>{label}</p>
      <p style={styles.tooltipVal}>{payload[0].value} kişi</p>
    </div>
  )
}

export default function TryoutStats({ data }) {
  if (!data?.length) return null

  const heights = bucketHeight(data)
  const weights = bucketWeight(data)
  const classes = bucketClass(data)

  return (
    <div style={styles.wrapper}>
      <div style={styles.summaryRow}>
        <div style={styles.summaryCard}>
          <span style={styles.summaryNum}>{data.length}</span>
          <span style={styles.summaryLabel}>Toplam Başvuru</span>
        </div>
      </div>

      <div style={styles.chartsRow}>
        <StatCard title="Boy Dağılımı (cm)">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={heights} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <XAxis dataKey="label" tick={tickStyle} />
              <YAxis tick={tickStyle} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill={RED_DARK} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </StatCard>

        <StatCard title="Kilo Dağılımı (kg)">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weights} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <XAxis dataKey="label" tick={tickStyle} />
              <YAxis tick={tickStyle} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill={RED} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </StatCard>

        <StatCard title="Sınıf / Bölüm">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart margin={{ top: 16, right: 24, bottom: 0, left: 24 }}>
              <Pie
                data={classes}
                dataKey="count"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={true}
              >
                {classes.map((_, i) => (
                  <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                ))}
              </Pie>
              <Legend
                formatter={(value) => (
                  <span style={{ fontSize: '0.75rem', fontFamily: 'Barlow Condensed', color: '#888' }}>{value}</span>
                )}
              />
              <Tooltip formatter={(v) => `${v} kişi`} />
            </PieChart>
          </ResponsiveContainer>
        </StatCard>
      </div>
    </div>
  )
}

const tickStyle = { fontSize: 11, fontFamily: 'Barlow Condensed', fill: '#888' }

const styles = {
  wrapper: { marginBottom: '32px' },
  summaryRow: {
    display: 'flex',
    marginBottom: '16px',
  },
  summaryCard: {
    background: '#1a1a1a',
    border: '1px solid #333',
    borderLeft: '4px solid #CC2222',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  summaryNum: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '2rem',
    fontWeight: 400,
    color: '#e0e0e0',
    letterSpacing: '4px',
  },
  summaryLabel: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: '0.75rem',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '3px',
  },
  chartsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '12px',
  },
  card: {
    background: '#0a0a0a',
    border: '1px solid #1a1a1a',
    borderLeft: '3px solid #CC2222',
    padding: '16px',
  },
  cardTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '0.9rem',
    letterSpacing: '3px',
    color: '#CC2222',
    marginBottom: '8px',
  },
  tooltip: {
    background: '#111',
    border: '1px solid #222',
    borderRadius: '4px',
    padding: '8px 12px',
  },
  tooltipLabel: {
    fontFamily: "'Barlow Condensed', sans-serif",
    color: '#888',
    fontSize: '0.8rem',
    margin: 0,
    letterSpacing: '1px',
  },
  tooltipVal: {
    fontFamily: "'Bebas Neue', sans-serif",
    color: '#e0e0e0',
    fontSize: '1.1rem',
    margin: 0,
    letterSpacing: '2px',
  },
}
