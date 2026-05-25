import { useState } from 'react'
import { supabase } from '../lib/supabase'

const KATEGORILER = ['Şikayet', 'Öneri', 'Diğer']

export default function FeedbackForm() {
  const [kategori, setKategori] = useState('')
  const [mesaj, setMesaj] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!kategori) { setError('Lütfen bir kategori seçin.'); return }
    if (!mesaj.trim()) { setError('Lütfen mesajınızı yazın.'); return }

    if (!supabase) { setError('Supabase bağlantısı henüz yapılandırılmadı.'); return }

    setLoading(true)
    const { error: err } = await supabase
      .from('feedback_submissions')
      .insert([{ kategori: kategori.toLowerCase(), mesaj: mesaj.trim() }])
    setLoading(false)

    if (err) { setError('Bir hata oluştu, tekrar deneyin.'); return }
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="page">
        <div className="card">
          <div className="success-box">
            <div className="success-icon">✅</div>
            <h2>Mesajın İletildi!</h2>
            <p>Geri bildirimin anonim olarak kaydedildi. Teşekkürler!</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div style={{ maxWidth: '520px', width: '100%' }}>
        <div style={{ marginBottom: '36px', animation: 'slideUp 0.4s ease' }}>
          <span style={eyebrow}>Anonim</span>
          <h2 style={{ fontSize: '2.8rem', color: '#e0e0e0', letterSpacing: '4px', marginBottom: 0 }}>
            Feedback Kutusu
          </h2>
          <div style={{ width: '40px', height: '3px', background: '#CC2222', marginTop: '12px' }} />
        </div>

        <div className="card" style={{ maxWidth: 'none', animationDelay: '0.1s', animationFillMode: 'both' }}>
          <p className="subtitle">Mesajınız anonim olarak iletilecektir, gönül rahatlığıyla doldurabilirsiniz.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="kategori">Kategori</label>
              <select id="kategori" value={kategori} onChange={e => setKategori(e.target.value)}>
                <option value="">Seçiniz...</option>
                {KATEGORILER.map(k => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="mesaj">Mesajın</label>
              <textarea id="mesaj" name="mesaj"
                placeholder="Düşüncelerini buraya yaz..."
                value={mesaj}
                onChange={e => setMesaj(e.target.value)}
              />
            </div>

            {error && <p className="error-msg">{error}</p>}

            <button className="btn btn-primary" type="submit" disabled={loading}
              style={{ marginTop: '8px' }}>
              {loading ? 'Gönderiliyor...' : 'Gönder'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

const eyebrow = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontSize: '11px',
  letterSpacing: '4px',
  color: '#CC2222',
  fontWeight: 600,
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '8px',
}
