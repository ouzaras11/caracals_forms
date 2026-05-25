import { useState } from 'react'
import { supabase } from '../lib/supabase'

const INITIAL = {
  ad_soyad: '',
  telefon: '',
  ogrenci_no: '',
  boy: '',
  kilo: '',
  sinif_bolum: '',
}

function validateTelefon(val) {
  if (!val) return ''
  if (!/^\d+$/.test(val)) return 'Yalnızca rakam giriniz.'
  if (val.startsWith('0')) return '0 ile başlayamaz.'
  if (val.length > 10) return 'Telefon numarası 10 haneli olmalıdır.'
  return ''
}

function validateOgrenciNo(val) {
  if (!val) return ''
  if (!/^\d+$/.test(val)) return 'Yalnızca rakam giriniz.'
  if (val.length > 9) return 'Öğrenci numarası 9 haneli olmalıdır.'
  return ''
}

export default function TryoutForm() {
  const [form, setForm] = useState(INITIAL)
  const [fieldErrors, setFieldErrors] = useState({ telefon: '', ogrenci_no: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (name === 'telefon') setFieldErrors(prev => ({ ...prev, telefon: validateTelefon(value) }))
    if (name === 'ogrenci_no') setFieldErrors(prev => ({ ...prev, ogrenci_no: validateOgrenciNo(value) }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const empty = Object.values(form).some(v => !v.trim())
    if (empty) { setError('Lütfen tüm alanları doldurun.'); return }

    if (form.ad_soyad.trim().length > 50) { setError('Ad soyad en fazla 50 karakter olabilir.'); return }

    if (fieldErrors.telefon || fieldErrors.ogrenci_no) { setError('Lütfen hatalı alanları düzeltin.'); return }

    if (!supabase) { setError('Supabase bağlantısı henüz yapılandırılmadı.'); return }

    setLoading(true)
    const { error: err } = await supabase
      .from('tryout_submissions')
      .insert([form])
    setLoading(false)

    if (err) { setError('Bir hata oluştu, tekrar deneyin.'); return }
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="page">
        <div className="card">
          <div className="success-box">
            <div className="success-icon">🏈</div>
            <h2>Başvurun Alındı!</h2>
            <p>İletişim için Whatsapp grubunu takipte kal.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div style={{ maxWidth: '520px', width: '100%' }}>
        <div style={{ marginBottom: '36px', animation: 'slideUp 0.4s ease' }}>
          <span style={eyebrow}>IZTECH CARACALS / 2026</span>
          <h2 style={{ fontSize: '2.8rem', color: '#e0e0e0', letterSpacing: '4px', marginBottom: 0 }}>
            Freshman Formu
          </h2>
          <div style={{ width: '40px', height: '3px', background: '#CC2222', marginTop: '12px' }} />
        </div>

        <div className="card" style={{ maxWidth: 'none', animationDelay: '0.1s', animationFillMode: 'both' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="ad_soyad">Ad Soyad</label>
              <input id="ad_soyad" name="ad_soyad" type="text"
                placeholder="Adınız ve soyadınız" value={form.ad_soyad} onChange={handleChange} maxLength={50} />
            </div>

            <div className="form-group">
              <label htmlFor="telefon">Telefon Numarası</label>
              <input id="telefon" name="telefon" type="tel"
                placeholder="5XX XXX XX XX" value={form.telefon} onChange={handleChange} inputMode="numeric" />
              {fieldErrors.telefon && <p style={inlineError}>{fieldErrors.telefon}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="ogrenci_no">Öğrenci Numarası</label>
              <input id="ogrenci_no" name="ogrenci_no" type="text"
                placeholder="Öğrenci numaranız" value={form.ogrenci_no} onChange={handleChange} inputMode="numeric" />
              {fieldErrors.ogrenci_no && <p style={inlineError}>{fieldErrors.ogrenci_no}</p>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label htmlFor="boy">Boy (cm)</label>
                <input id="boy" name="boy" type="number"
                  placeholder="Örn: 180" value={form.boy} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="kilo">Kilo (kg)</label>
                <input id="kilo" name="kilo" type="number"
                  placeholder="Örn: 85" value={form.kilo} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="sinif_bolum">Sınıf ve Bölüm</label>
              <input id="sinif_bolum" name="sinif_bolum" type="text"
                placeholder="Örn: 2. sınıf - Bilgisayar Mühendisliği"
                value={form.sinif_bolum} onChange={handleChange} />
            </div>

            {error && <p className="error-msg">{error}</p>}

            <button className="btn btn-primary" type="submit" disabled={loading}
              style={{ marginTop: '8px' }}>
              {loading ? 'Kaydediliyor...' : 'Yanıtı Kaydet'}
            </button>
          </form>
        </div>

        <p style={{ color: '#333', fontSize: '12px', fontFamily: "'Barlow', sans-serif", marginTop: '20px', textAlign: 'center', letterSpacing: '1px' }}>
          Tüm alanlar zorunludur
        </p>
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

const inlineError = {
  color: '#CC2222',
  fontSize: '0.8rem',
  fontFamily: "'Barlow Condensed', sans-serif",
  marginTop: '4px',
  letterSpacing: '0.5px',
}
